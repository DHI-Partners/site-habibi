import {
  PRICE_BASE,
  PRICE_PREMIUM,
  PRICE_PRO,
  RATE_HIGH,
  RATE_LOW,
  RATE_THRESHOLD,
} from '../data'

/* ─────────────────────────── Типы (зеркалят supabase/schema.sql) ─────────────────────────── */

export type ReferralStatus = 'lead' | 'trial' | 'paying' | 'churned'
export type Tariff = '' | 'base' | 'pro' | 'premium' | 'exclusive'

export interface Partner {
  id: string
  user_id: string
  slug: string
  name: string
  contact_channel: '' | 'whatsapp' | 'telegram'
  contact_value: string
  created_at: string
}

/** Строка view partner_stats: партнёр + готовые счётчики. */
export interface PartnerStats extends Partner {
  clicks: number
  regs: number
  trials: number
  paying: number
  /** Только в админке (подмешивается из auth). */
  email?: string
}

export interface Referral {
  id: number
  partner_id: string
  name: string
  contact: string
  status: ReferralStatus
  tariff: Tariff
  monthly_price: number
  started_paying_at: string | null
  churned_at: string | null
  created_at: string
}

export interface Payout {
  id: number
  partner_id: string
  amount: number
  status: 'pending' | 'paid'
  created_at: string
  paid_at: string | null
}

/* ─────────────────────────── Справочники ─────────────────────────── */

export const TARIFF_META: Record<Tariff, { label: string; price: number }> = {
  '': { label: '—', price: 0 },
  base: { label: 'Habibi', price: PRICE_BASE },
  pro: { label: 'Habibi Pro', price: PRICE_PRO },
  premium: { label: 'Habibi Premium', price: PRICE_PREMIUM },
  exclusive: { label: 'Habibi Exclusive', price: 0 },
}

export const STATUS_META: Record<ReferralStatus, { label: string; className: string }> = {
  lead: { label: 'Заявка', className: 'border-white/20 bg-white/5 text-white/70' },
  trial: { label: 'Демо-период', className: 'border-sky-400/40 bg-sky-400/10 text-sky-300' },
  paying: { label: 'Платит', className: 'border-emerald-400/40 bg-emerald-400/10 text-emerald-300' },
  churned: { label: 'Ушёл', className: 'border-white/15 bg-white/[0.03] text-white/40' },
}

/** Цена подписки клиента: заданная админом или базовая цена тарифа. */
export function referralPrice(r: Referral): number {
  return r.monthly_price > 0 ? Number(r.monthly_price) : TARIFF_META[r.tariff]?.price ?? 0
}

/* ─────────────────────────── Расчёт дохода ─────────────────────────── */

export interface Earnings {
  payingCount: number
  rate: number
  /** Текущий доход в месяц (run rate). */
  monthly: number
  /** Начислено за всё время (ориентировочно, по полным месяцам подписки). */
  accrued: number
  /** Выплачено (payouts со статусом paid). */
  paidOut: number
  /** Заявлено к выплате, но ещё не выплачено. */
  pendingOut: number
  /** Доступно к выплате: начислено − выплачено − в обработке. */
  available: number
}

const MONTH_MS = 30.44 * 24 * 60 * 60 * 1000

/** Сколько месячных платежей прошло: первый — сразу, дальше раз в месяц. */
function paymentsCount(startIso: string, endIso: string | null): number {
  const start = new Date(startIso).getTime()
  const end = endIso ? new Date(endIso).getTime() : Date.now()
  if (!Number.isFinite(start) || end < start) return 0
  return 1 + Math.floor((end - start) / MONTH_MS)
}

/**
 * Та же логика ставок, что и в калькуляторе на странице (EarningsCalculator):
 * с {RATE_THRESHOLD} платящих клиентов ставка {RATE_HIGH} на всю активную базу.
 * Расчёт ориентировочный — фактическая комиссия начисляется с оплаченных подписок.
 */
export function computeEarnings(referrals: Referral[], payouts: Payout[]): Earnings {
  const paying = referrals.filter((r) => r.status === 'paying')
  const rate = paying.length >= RATE_THRESHOLD ? RATE_HIGH : RATE_LOW

  const monthly = paying.reduce((sum, r) => sum + referralPrice(r) * rate, 0)

  const accrued = referrals.reduce((sum, r) => {
    if (!r.started_paying_at) return sum
    const end = r.status === 'churned' ? r.churned_at : null
    return sum + paymentsCount(r.started_paying_at, end) * referralPrice(r) * rate
  }, 0)

  const paidOut = payouts
    .filter((p) => p.status === 'paid')
    .reduce((sum, p) => sum + Number(p.amount), 0)
  const pendingOut = payouts
    .filter((p) => p.status === 'pending')
    .reduce((sum, p) => sum + Number(p.amount), 0)

  return {
    payingCount: paying.length,
    rate,
    monthly,
    accrued,
    paidOut,
    pendingOut,
    available: Math.max(0, accrued - paidOut - pendingOut),
  }
}

/* ─────────────────────────── Утилиты ─────────────────────────── */

export const SLUG_RE = /^[a-z0-9-]{3,30}$/

const TRANSLIT: Record<string, string> = {
  а: 'a', б: 'b', в: 'v', г: 'g', д: 'd', е: 'e', ё: 'e', ж: 'zh', з: 'z', и: 'i',
  й: 'y', к: 'k', л: 'l', м: 'm', н: 'n', о: 'o', п: 'p', р: 'r', с: 's', т: 't',
  у: 'u', ф: 'f', х: 'h', ц: 'ts', ч: 'ch', ш: 'sh', щ: 'sch', ъ: '', ы: 'y',
  ь: '', э: 'e', ю: 'yu', я: 'ya',
}

/** «Ильгиз Ахметов» → «ilgiz-ahmetov»: подсказка slug из имени. */
export function suggestSlug(name: string): string {
  return name
    .toLowerCase()
    .split('')
    .map((ch) => TRANSLIT[ch] ?? ch)
    .join('')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 30)
}

export function refLink(slug: string): string {
  return `habibi-erp.com/ref/${slug}`
}

export function formatDate(iso: string | null): string {
  if (!iso) return '—'
  const d = new Date(iso)
  return Number.isFinite(d.getTime())
    ? d.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short', year: 'numeric' })
    : '—'
}
