// Vercel serverless function: мини-админка партнёрской программы.
//
// Все запросы: POST { action, ...params } + заголовок Authorization: Bearer <supabase access token>.
// Доступ только для email из PARTNER_ADMIN_EMAILS (через запятую).
//
// Переменные окружения:
//   VITE_SUPABASE_URL          — https://<project>.supabase.co
//   SUPABASE_SERVICE_ROLE_KEY  — сервисный ключ (обходит RLS — поэтому все проверки здесь)
//   PARTNER_ADMIN_EMAILS       — например: dosnet2200@gmail.com

import { createClient } from '@supabase/supabase-js'

const STATUSES = ['lead', 'trial', 'paying', 'churned']
const TARIFFS = ['', 'base', 'pro', 'premium', 'exclusive']

let supabase

function db() {
  if (!supabase) {
    const url = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY
    if (!url || !key) return null
    supabase = createClient(url, key, { auth: { persistSession: false } })
  }
  return supabase
}

function adminEmails() {
  return (process.env.PARTNER_ADMIN_EMAILS || '')
    .split(',')
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean)
}

/** Проверяет токен и что владелец — админ. @returns {Promise<boolean>} */
async function isAdmin(client, req) {
  const auth = String(req.headers.authorization || '')
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : ''
  if (!token) return false
  const { data, error } = await client.auth.getUser(token)
  if (error || !data?.user?.email) return false
  return adminEmails().includes(data.user.email.toLowerCase())
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'method_not_allowed' })
    return
  }
  const client = db()
  if (!client) {
    res.status(500).json({ error: 'not_configured' })
    return
  }
  if (!(await isAdmin(client, req))) {
    res.status(403).json({ error: 'forbidden' })
    return
  }

  const body = req.body && typeof req.body === 'object' ? req.body : {}

  try {
    switch (body.action) {
      /* Сводка по всем партнёрам: метрики + email из auth. */
      case 'list': {
        const [{ data: stats, error }, users] = await Promise.all([
          client.from('partner_stats').select('*').order('created_at', { ascending: true }),
          client.auth.admin.listUsers({ page: 1, perPage: 1000 }),
        ])
        if (error) throw error
        const emailByUser = new Map(
          (users.data?.users || []).map((u) => [u.id, u.email || '']),
        )
        res.status(200).json({
          partners: (stats || []).map((p) => ({ ...p, email: emailByUser.get(p.user_id) || '' })),
        })
        return
      }

      /* Клиенты и выплаты одного партнёра. */
      case 'partner': {
        const partnerId = String(body.partner_id || '')
        const [refs, pays] = await Promise.all([
          client
            .from('referrals')
            .select('*')
            .eq('partner_id', partnerId)
            .order('created_at', { ascending: false }),
          client
            .from('payouts')
            .select('*')
            .eq('partner_id', partnerId)
            .order('created_at', { ascending: false }),
        ])
        if (refs.error) throw refs.error
        if (pays.error) throw pays.error
        res.status(200).json({ referrals: refs.data || [], payouts: pays.data || [] })
        return
      }

      /* Ручное добавление клиента (пришёл мимо формы). */
      case 'add_referral': {
        const status = STATUSES.includes(body.status) ? body.status : 'lead'
        const tariff = TARIFFS.includes(body.tariff) ? body.tariff : ''
        const { error } = await client.from('referrals').insert({
          partner_id: String(body.partner_id || ''),
          name: String(body.name || '').slice(0, 200),
          contact: String(body.contact || '').slice(0, 200),
          status,
          tariff,
          monthly_price: Number(body.monthly_price) || 0,
          started_paying_at: status === 'paying' ? new Date().toISOString() : null,
        })
        if (error) throw error
        res.status(200).json({ ok: true })
        return
      }

      /* Смена статуса / тарифа / цены клиента. */
      case 'update_referral': {
        const id = Number(body.id)
        const patch = {}
        if (STATUSES.includes(body.status)) {
          patch.status = body.status
          if (body.status === 'paying') {
            patch.churned_at = null
            // started_paying_at не затираем, если уже был (возврат из churned)
            const { data: cur } = await client
              .from('referrals')
              .select('started_paying_at')
              .eq('id', id)
              .maybeSingle()
            if (!cur?.started_paying_at) patch.started_paying_at = new Date().toISOString()
          }
          if (body.status === 'churned') patch.churned_at = new Date().toISOString()
        }
        if (TARIFFS.includes(body.tariff)) patch.tariff = body.tariff
        if (body.monthly_price !== undefined) patch.monthly_price = Number(body.monthly_price) || 0
        if (body.name !== undefined) patch.name = String(body.name).slice(0, 200)
        if (body.contact !== undefined) patch.contact = String(body.contact).slice(0, 200)
        const { error } = await client.from('referrals').update(patch).eq('id', id)
        if (error) throw error
        res.status(200).json({ ok: true })
        return
      }

      case 'delete_referral': {
        const { error } = await client.from('referrals').delete().eq('id', Number(body.id))
        if (error) throw error
        res.status(200).json({ ok: true })
        return
      }

      /* Выплаты: создать (pending) и отметить оплаченной. */
      case 'add_payout': {
        const amount = Number(body.amount)
        if (!(amount > 0)) {
          res.status(400).json({ error: 'bad_amount' })
          return
        }
        const { error } = await client.from('payouts').insert({
          partner_id: String(body.partner_id || ''),
          amount,
        })
        if (error) throw error
        res.status(200).json({ ok: true })
        return
      }

      case 'mark_payout_paid': {
        const { error } = await client
          .from('payouts')
          .update({ status: 'paid', paid_at: new Date().toISOString() })
          .eq('id', Number(body.id))
        if (error) throw error
        res.status(200).json({ ok: true })
        return
      }

      case 'delete_payout': {
        const { error } = await client.from('payouts').delete().eq('id', Number(body.id))
        if (error) throw error
        res.status(200).json({ ok: true })
        return
      }

      default:
        res.status(400).json({ error: 'bad_action' })
    }
  } catch (e) {
    console.error('admin api error:', e?.message || e)
    res.status(500).json({ error: 'server_error' })
  }
}
