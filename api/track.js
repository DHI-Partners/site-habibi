// Vercel serverless function: учёт партнёрской атрибуции.
//
//   POST { type: 'click', slug, referrer? }            — переход по /ref/<slug>
//   POST { type: 'lead',  slug, name, contact, email } — заявка с формы, привязанная к партнёру
//
// Пишет в Supabase сервисным ключом — у клиентов сайта прав на запись нет.
//
// Переменные окружения (Vercel → Settings → Environment Variables):
//   VITE_SUPABASE_URL          — https://<project>.supabase.co (общая с фронтендом)
//   SUPABASE_SERVICE_ROLE_KEY  — сервисный ключ (Settings → API, держать в секрете)

import { createClient } from '@supabase/supabase-js'

// Лимиты: эндпоинт публичный. Переходы — обычный трафик, поэтому щедрее, чем у чата.
const RATE_PER_MINUTE = 30
const RATE_PER_HOUR = 300

const MAX_FIELD_CHARS = 200

const ALLOWED_HOSTS = [
  'habibi-erp.com',
  'www.habibi-erp.com',
  'site-habibi.vercel.app',
]

const SLUG_RE = /^[a-z0-9-]{3,30}$/

/** Ленивая инициализация: клиент переиспользуется тёплыми вызовами. */
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

/** ip → массив меток времени. Живёт в памяти инстанса, сбрасывается на холодном старте. */
const hits = new Map()

function clientIp(req) {
  const raw =
    req.headers['x-vercel-forwarded-for'] ||
    req.headers['x-forwarded-for'] ||
    req.headers['x-real-ip'] ||
    ''
  return String(raw).split(',')[0].trim() || 'unknown'
}

function rateLimited(ip) {
  const now = Date.now()
  const hour = 60 * 60 * 1000

  if (hits.size > 5000) {
    for (const [key, times] of hits) {
      if (!times.length || now - times[times.length - 1] > hour) hits.delete(key)
    }
  }

  const times = (hits.get(ip) || []).filter((t) => now - t < hour)
  const lastMinute = times.filter((t) => now - t < 60_000)
  if (lastMinute.length >= RATE_PER_MINUTE || times.length >= RATE_PER_HOUR) {
    hits.set(ip, times)
    return true
  }
  times.push(now)
  hits.set(ip, times)
  return false
}

function originAllowed(req) {
  const origin = req.headers.origin
  if (!origin) return true // прямой вызов без Origin (curl, health-check) — пропускаем
  let host
  try {
    host = new URL(origin).hostname
  } catch {
    return false
  }
  if (host === 'localhost' || host === '127.0.0.1') return true
  if (host.endsWith('.vercel.app')) return true
  return ALLOWED_HOSTS.includes(host)
}

const clip = (v) => String(v ?? '').slice(0, MAX_FIELD_CHARS).trim()

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'method_not_allowed' })
    return
  }
  if (!originAllowed(req)) {
    res.status(403).json({ error: 'forbidden' })
    return
  }
  if (rateLimited(clientIp(req))) {
    res.status(429).json({ error: 'rate_limited' })
    return
  }

  const client = db()
  if (!client) {
    res.status(500).json({ error: 'not_configured' })
    return
  }

  const body = req.body && typeof req.body === 'object' ? req.body : {}
  const type = body.type
  const slug = clip(body.slug).toLowerCase()

  if ((type !== 'click' && type !== 'lead') || !SLUG_RE.test(slug)) {
    res.status(400).json({ error: 'bad_request' })
    return
  }

  // Неизвестный slug не отличаем от известного в ответе — чтобы нельзя было
  // перебором выяснять занятые имена партнёров.
  const { data: partner } = await client
    .from('partners')
    .select('id')
    .eq('slug', slug)
    .maybeSingle()

  if (partner) {
    if (type === 'click') {
      await client.from('ref_clicks').insert({
        partner_id: partner.id,
        referrer: clip(body.referrer),
      })
    } else {
      const channel = body.channel === 'telegram' ? 'Telegram' : 'WhatsApp'
      const contactParts = [
        body.contact ? `${channel}: ${clip(body.contact)}` : '',
        clip(body.email),
      ].filter(Boolean)
      await client.from('referrals').insert({
        partner_id: partner.id,
        name: clip(body.name),
        contact: contactParts.join(' · '),
        status: 'lead',
      })
    }
  }

  res.status(200).json({ ok: true })
}
