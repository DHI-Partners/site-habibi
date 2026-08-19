import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronDown, ChevronUp, Plus, RefreshCw } from 'lucide-react'
import { supabaseConfigured } from '../../../lib/supabase'
import { formatMoney } from '../data'
import { card } from '../ui'
import { CabinetShell, NotConfigured, usePageMeta } from './CabinetShell'
import {
  STATUS_META,
  TARIFF_META,
  formatDate,
  type Payout,
  type PartnerStats,
  type Referral,
  type ReferralStatus,
  type Tariff,
} from './lib'
import { useAuth } from './useAuth'

const STATUS_OPTIONS: ReferralStatus[] = ['lead', 'trial', 'paying', 'churned']
const TARIFF_OPTIONS: Tariff[] = ['', 'base', 'pro', 'premium', 'exclusive']

const INPUT =
  'rounded-lg border border-white/15 bg-black/60 px-2.5 py-1.5 text-xs text-white focus:border-white/40 focus:outline-none'

export default function AdminPage() {
  usePageMeta('Админка партнёрской программы — Habibi')
  const navigate = useNavigate()
  const { session, loading: authLoading } = useAuth()

  const [partners, setPartners] = useState<PartnerStats[]>([])
  const [state, setState] = useState<'loading' | 'ok' | 'forbidden' | 'error'>('loading')
  const [openId, setOpenId] = useState<string | null>(null)

  const api = useCallback(
    async (action: string, params: Record<string, unknown> = {}) => {
      const res = await fetch('/api/admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.access_token ?? ''}`,
        },
        body: JSON.stringify({ action, ...params }),
      })
      if (res.status === 403) throw new Error('forbidden')
      if (!res.ok) throw new Error('server')
      return res.json()
    },
    [session],
  )

  const loadList = useCallback(async () => {
    try {
      const data = await api('list')
      setPartners(data.partners || [])
      setState('ok')
    } catch (e) {
      setState((e as Error).message === 'forbidden' ? 'forbidden' : 'error')
    }
  }, [api])

  useEffect(() => {
    if (authLoading) return
    if (!session) {
      navigate('/ru/partners/login')
      return
    }
    loadList()
  }, [authLoading, session, navigate, loadList])

  if (!supabaseConfigured()) {
    return (
      <CabinetShell tag="Админка" narrow>
        <NotConfigured />
      </CabinetShell>
    )
  }

  return (
    <CabinetShell tag="Админка" showSignOut>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-3xl font-semibold tracking-tight text-white">Партнёры</h1>
        <button
          type="button"
          onClick={() => {
            setState('loading')
            loadList()
          }}
          className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm text-white/70 transition-colors hover:border-white/40 hover:text-white"
        >
          <RefreshCw size={14} />
          Обновить
        </button>
      </div>

      {state === 'loading' && <p className="mt-6 text-sm text-white/50">Загружаем…</p>}
      {state === 'forbidden' && (
        <p className="mt-6 text-sm text-red-400">
          Нет доступа: этот email не входит в PARTNER_ADMIN_EMAILS.
        </p>
      )}
      {state === 'error' && (
        <p className="mt-6 text-sm text-red-400">Не удалось загрузить. Попробуйте обновить.</p>
      )}

      {state === 'ok' && partners.length === 0 && (
        <p className="mt-6 text-sm text-white/50">Партнёров пока нет.</p>
      )}

      {state === 'ok' && (
        <div className="mt-6 flex flex-col gap-3">
          {partners.map((p) => (
            <PartnerRow
              key={p.id}
              partner={p}
              open={openId === p.id}
              onToggle={() => setOpenId(openId === p.id ? null : p.id)}
              api={api}
              onChanged={loadList}
            />
          ))}
        </div>
      )}
    </CabinetShell>
  )
}

/* ─────────────────────────── Карточка партнёра ─────────────────────────── */

function PartnerRow({
  partner,
  open,
  onToggle,
  api,
  onChanged,
}: {
  partner: PartnerStats
  open: boolean
  onToggle: () => void
  api: (action: string, params?: Record<string, unknown>) => Promise<any>
  onChanged: () => void
}) {
  const [referrals, setReferrals] = useState<Referral[]>([])
  const [payouts, setPayouts] = useState<Payout[]>([])
  const [loaded, setLoaded] = useState(false)

  const loadDetail = useCallback(async () => {
    const data = await api('partner', { partner_id: partner.id })
    setReferrals(data.referrals || [])
    setPayouts(data.payouts || [])
    setLoaded(true)
  }, [api, partner.id])

  useEffect(() => {
    if (open && !loaded) loadDetail()
  }, [open, loaded, loadDetail])

  const refresh = () => {
    loadDetail()
    onChanged()
  }

  return (
    <div className={card('plain', '!p-0')}>
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full flex-wrap items-center justify-between gap-3 px-5 py-4 text-left"
      >
        <div>
          <span className="font-medium text-white">{partner.name || partner.slug}</span>
          <span className="ml-3 text-sm text-emerald-300">/ref/{partner.slug}</span>
          {partner.email && <span className="ml-3 text-sm text-white/40">{partner.email}</span>}
        </div>
        <div className="flex items-center gap-4 text-xs text-white/50">
          <span>переходы {partner.clicks}</span>
          <span>заявки {partner.regs}</span>
          <span>демо {partner.trials}</span>
          <span className="text-emerald-300">платят {partner.paying}</span>
          {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>
      </button>

      {open && (
        <div className="border-t border-white/10 px-5 pb-5">
          {!loaded ? (
            <p className="pt-4 text-sm text-white/50">Загружаем…</p>
          ) : (
            <>
              <h3 className="pt-4 text-sm font-medium text-white/70">Клиенты</h3>
              {referrals.length === 0 && (
                <p className="mt-2 text-sm text-white/40">Клиентов пока нет.</p>
              )}
              <div className="mt-2 flex flex-col gap-2">
                {referrals.map((r) => (
                  <ReferralRow key={r.id} referral={r} api={api} onChanged={refresh} />
                ))}
              </div>
              <AddReferral partnerId={partner.id} api={api} onChanged={refresh} />

              <h3 className="mt-6 text-sm font-medium text-white/70">Выплаты</h3>
              <div className="mt-2 flex flex-col gap-2">
                {payouts.map((p) => (
                  <div
                    key={p.id}
                    className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-sm"
                  >
                    <span className="text-white">{formatMoney(Number(p.amount))}</span>
                    <span className="flex items-center gap-3">
                      <span className={p.status === 'paid' ? 'text-emerald-300' : 'text-amber-200'}>
                        {p.status === 'paid' ? `выплачено ${formatDate(p.paid_at)}` : 'в обработке'}
                      </span>
                      {p.status === 'pending' && (
                        <button
                          type="button"
                          onClick={async () => {
                            await api('mark_payout_paid', { id: p.id })
                            refresh()
                          }}
                          className="rounded-full border border-emerald-400/40 px-3 py-1 text-xs text-emerald-300 hover:bg-emerald-400/10"
                        >
                          Отметить выплаченной
                        </button>
                      )}
                    </span>
                  </div>
                ))}
              </div>
              <AddPayout partnerId={partner.id} api={api} onChanged={refresh} />
            </>
          )}
        </div>
      )}
    </div>
  )
}

/* ─────────────────────────── Строка клиента ─────────────────────────── */

function ReferralRow({
  referral,
  api,
  onChanged,
}: {
  referral: Referral
  api: (action: string, params?: Record<string, unknown>) => Promise<any>
  onChanged: () => void
}) {
  const [status, setStatus] = useState<ReferralStatus>(referral.status)
  const [tariff, setTariff] = useState<Tariff>(referral.tariff)
  const [price, setPrice] = useState(String(referral.monthly_price || ''))
  const [busy, setBusy] = useState(false)

  const dirty =
    status !== referral.status ||
    tariff !== referral.tariff ||
    (Number(price) || 0) !== Number(referral.monthly_price || 0)

  const save = async () => {
    setBusy(true)
    // Цена: своя, если введена; иначе прайс тарифа (для exclusive — вводится руками).
    const monthly = Number(price) || TARIFF_META[tariff].price
    await api('update_referral', {
      id: referral.id,
      status,
      tariff,
      monthly_price: monthly,
    })
    setBusy(false)
    onChanged()
  }

  return (
    <div className="flex flex-wrap items-center gap-2.5 rounded-lg border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-sm">
      <span className="min-w-28 font-medium text-white">{referral.name || 'Без имени'}</span>
      <span className="flex-1 truncate text-xs text-white/40">{referral.contact}</span>
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value as ReferralStatus)}
        className={INPUT}
      >
        {STATUS_OPTIONS.map((s) => (
          <option key={s} value={s}>
            {STATUS_META[s].label}
          </option>
        ))}
      </select>
      <select
        value={tariff}
        onChange={(e) => {
          const t = e.target.value as Tariff
          setTariff(t)
          setPrice(TARIFF_META[t].price ? String(TARIFF_META[t].price) : '')
        }}
        className={INPUT}
      >
        {TARIFF_OPTIONS.map((t) => (
          <option key={t} value={t}>
            {TARIFF_META[t].label}
          </option>
        ))}
      </select>
      <input
        value={price}
        onChange={(e) => setPrice(e.target.value.replace(/[^\d.]/g, ''))}
        placeholder="€/мес"
        className={`${INPUT} w-20`}
        inputMode="decimal"
      />
      <button
        type="button"
        disabled={!dirty || busy}
        onClick={save}
        className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
          dirty && !busy
            ? 'bg-white text-black hover:bg-white/85'
            : 'cursor-not-allowed bg-white/10 text-white/35'
        }`}
      >
        {busy ? '…' : 'Сохранить'}
      </button>
      <button
        type="button"
        onClick={async () => {
          if (window.confirm(`Удалить клиента «${referral.name || 'Без имени'}»?`)) {
            await api('delete_referral', { id: referral.id })
            onChanged()
          }
        }}
        className="rounded-full border border-white/15 px-3 py-1.5 text-xs text-white/40 hover:border-red-400/40 hover:text-red-300"
      >
        Удалить
      </button>
    </div>
  )
}

/* ─────────────────────────── Добавление ─────────────────────────── */

function AddReferral({
  partnerId,
  api,
  onChanged,
}: {
  partnerId: string
  api: (action: string, params?: Record<string, unknown>) => Promise<any>
  onChanged: () => void
}) {
  const [name, setName] = useState('')
  const [contact, setContact] = useState('')
  const [busy, setBusy] = useState(false)

  return (
    <div className="mt-2.5 flex flex-wrap items-center gap-2.5">
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Имя клиента"
        className={`${INPUT} flex-1 min-w-32 !py-2`}
      />
      <input
        value={contact}
        onChange={(e) => setContact(e.target.value)}
        placeholder="Контакт"
        className={`${INPUT} flex-1 min-w-32 !py-2`}
      />
      <button
        type="button"
        disabled={!name.trim() || busy}
        onClick={async () => {
          setBusy(true)
          await api('add_referral', { partner_id: partnerId, name, contact })
          setName('')
          setContact('')
          setBusy(false)
          onChanged()
        }}
        className="inline-flex items-center gap-1.5 rounded-full border border-white/20 px-3.5 py-2 text-xs text-white/70 transition-colors hover:border-white/40 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
      >
        <Plus size={13} />
        Добавить клиента
      </button>
    </div>
  )
}

function AddPayout({
  partnerId,
  api,
  onChanged,
}: {
  partnerId: string
  api: (action: string, params?: Record<string, unknown>) => Promise<any>
  onChanged: () => void
}) {
  const [amount, setAmount] = useState('')
  const [busy, setBusy] = useState(false)

  return (
    <div className="mt-2.5 flex flex-wrap items-center gap-2.5">
      <input
        value={amount}
        onChange={(e) => setAmount(e.target.value.replace(/[^\d.]/g, ''))}
        placeholder="Сумма, €"
        className={`${INPUT} w-28 !py-2`}
        inputMode="decimal"
      />
      <button
        type="button"
        disabled={!(Number(amount) > 0) || busy}
        onClick={async () => {
          setBusy(true)
          await api('add_payout', { partner_id: partnerId, amount: Number(amount) })
          setAmount('')
          setBusy(false)
          onChanged()
        }}
        className="inline-flex items-center gap-1.5 rounded-full border border-white/20 px-3.5 py-2 text-xs text-white/70 transition-colors hover:border-white/40 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
      >
        <Plus size={13} />
        Добавить выплату
      </button>
    </div>
  )
}
