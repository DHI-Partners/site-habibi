import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Check, Copy, Link2, User } from 'lucide-react'
import { getSupabase, supabaseConfigured } from '../../../lib/supabase'
import { DASHBOARD_METRICS as METRICS_RU, RATE_THRESHOLD } from '../data'
import { DASHBOARD_METRICS as METRICS_EN } from '../en/data'
import { card } from '../ui'
import {
  CabinetShell,
  Field,
  FormError,
  NotConfigured,
  SubmitButton,
  TextInput,
  usePageMeta,
} from './CabinetShell'
import {
  CABINET_PATHS,
  STATUS_LABELS,
  STRINGS,
  cabinetDate,
  cabinetMoney,
  clientsLeftLine,
  type CabinetLocale,
} from './i18n'
import {
  SLUG_RE,
  STATUS_META,
  TARIFF_META,
  computeEarnings,
  refLink,
  suggestSlug,
  type Payout,
  type PartnerStats,
  type Referral,
  type Tariff,
} from './lib'
import { useAuth } from './useAuth'

export default function DashboardPage({ locale = 'ru' }: { locale?: CabinetLocale }) {
  const t = STRINGS[locale].dashboard
  const paths = CABINET_PATHS[locale]
  usePageMeta(t.pageTitle, locale)
  const navigate = useNavigate()
  const { session, loading: authLoading } = useAuth()

  const [partner, setPartner] = useState<PartnerStats | null>(null)
  const [referrals, setReferrals] = useState<Referral[]>([])
  const [payouts, setPayouts] = useState<Payout[]>([])
  const [loading, setLoading] = useState(true)
  const [noProfile, setNoProfile] = useState(false)

  const load = useCallback(async (userId: string) => {
    const supabase = getSupabase()
    const { data: stats } = await supabase
      .from('partner_stats')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle()
    if (!stats) {
      setNoProfile(true)
      setLoading(false)
      return
    }
    setNoProfile(false)
    setPartner(stats as PartnerStats)
    const [refs, pays] = await Promise.all([
      supabase
        .from('referrals')
        .select('*')
        .eq('partner_id', stats.id)
        .order('created_at', { ascending: false }),
      supabase
        .from('payouts')
        .select('*')
        .eq('partner_id', stats.id)
        .order('created_at', { ascending: false }),
    ])
    setReferrals((refs.data as Referral[]) || [])
    setPayouts((pays.data as Payout[]) || [])
    setLoading(false)
  }, [])

  useEffect(() => {
    if (authLoading) return
    if (!session) {
      navigate(paths.login)
      return
    }
    load(session.user.id)
  }, [authLoading, session, navigate, load, paths.login])

  if (!supabaseConfigured()) {
    return (
      <CabinetShell tag={t.tag} narrow locale={locale}>
        <NotConfigured locale={locale} />
      </CabinetShell>
    )
  }

  if (authLoading || (loading && !noProfile)) {
    return (
      <CabinetShell tag={t.tag} showSignOut locale={locale}>
        <p className="text-sm text-white/50">{t.loading}</p>
      </CabinetShell>
    )
  }

  if (noProfile && session) {
    return (
      <CompleteProfile
        locale={locale}
        userId={session.user.id}
        defaultName={String(session.user.user_metadata?.name ?? '')}
        onDone={() => {
          setLoading(true)
          load(session.user.id)
        }}
      />
    )
  }

  if (!partner) return null

  const e = computeEarnings(referrals, payouts)
  const left = Math.max(0, RATE_THRESHOLD - e.payingCount)
  const progress = Math.min(100, (e.payingCount / RATE_THRESHOLD) * 100)
  const top = e.payingCount >= RATE_THRESHOLD
  const money = (v: number) => cabinetMoney(locale, v)

  // Разбивка «Тарифы» по активной базе: 2 × Pro · 1 × Premium
  const tariffBreakdown = Object.entries(
    referrals
      .filter((r) => r.status === 'paying' && r.tariff)
      .reduce<Record<string, number>>((acc, r) => {
        acc[r.tariff] = (acc[r.tariff] || 0) + 1
        return acc
      }, {}),
  )
    .map(([tf, n]) => `${n} × ${TARIFF_META[tf as Tariff].label.replace('Habibi ', '')}`)
    .join(' · ')

  const metrics = locale === 'en' ? METRICS_EN : METRICS_RU
  // Значения в том же порядке, что и DASHBOARD_METRICS (ru и en совпадают).
  const values: { value: string; sub?: string }[] = [
    { value: String(partner.clicks) },
    { value: String(partner.regs) },
    { value: String(partner.trials) },
    { value: String(e.payingCount) },
    { value: tariffBreakdown || '—' },
    { value: `${Math.round(e.rate * 100)}%` },
    { value: money(e.accrued), sub: t.perMonthNow(money(e.monthly)) },
    { value: money(e.available) },
  ]

  return (
    <CabinetShell tag={t.tag} showSignOut locale={locale}>
      <h1 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
        {t.hi(partner.name ? partner.name.split(' ')[0] : '')}
      </h1>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/60">{t.lead}</p>

      {/* Реферальная ссылка */}
      <div className={card('emerald', 'mt-8 md:!p-7')}>
        <div className="flex items-center gap-2 text-sm font-medium text-emerald-300">
          <Link2 size={16} />
          {t.linkTitle}
        </div>
        <CopyLink slug={partner.slug} copyLabel={t.copy} copiedLabel={t.copied} />
        <p className="mt-3 text-xs leading-relaxed text-white/45">{t.linkHint}</p>
      </div>

      {/* Метрики */}
      <div className="mt-4 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {metrics.map((m, i) => (
          <div key={m.title} className={card('plain', 'h-full !p-5')}>
            <m.icon size={20} className="text-emerald-400" />
            <h3 className="mt-3.5 text-sm font-medium text-white/70">{m.title}</h3>
            <p className="mt-1.5 break-words text-xl font-semibold text-white md:text-2xl">
              {values[i]?.value ?? '—'}
            </p>
            {values[i]?.sub && <p className="mt-1 text-xs text-white/45">{values[i].sub}</p>}
          </div>
        ))}
      </div>

      {/* Прогресс до 30% */}
      <div className={card('plain', 'mt-4 md:!p-7')}>
        <div className="mb-2 flex flex-wrap items-center justify-between gap-2 text-sm">
          <span className="font-medium text-white">{t.clientsOf(e.payingCount, RATE_THRESHOLD)}</span>
          <span className={top ? 'font-medium text-emerald-300' : 'text-white/50'}>
            {top ? t.topRate : clientsLeftLine(locale, left)}
          </span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              top ? 'bg-emerald-400' : 'bg-white/45'
            }`}
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="mt-3 text-xs leading-relaxed text-white/40">{t.disclaimer}</p>
      </div>

      {/* Клиенты */}
      <h2 className="mt-12 text-xl font-medium tracking-tight text-white">{t.clientsTitle}</h2>
      {referrals.length === 0 ? (
        <p className="mt-3 text-sm text-white/50">{t.clientsEmpty}</p>
      ) : (
        <div className={card('plain', 'mt-4 overflow-x-auto !p-0')}>
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 text-xs uppercase tracking-wider text-white/40">
                <th className="px-5 py-3.5 font-medium">{t.thClient}</th>
                <th className="px-5 py-3.5 font-medium">{t.thStatus}</th>
                <th className="px-5 py-3.5 font-medium">{t.thTariff}</th>
                <th className="px-5 py-3.5 font-medium">{t.thDate}</th>
              </tr>
            </thead>
            <tbody>
              {referrals.map((r) => (
                <tr key={r.id} className="border-b border-white/5 last:border-0">
                  <td className="px-5 py-3.5 text-white">{r.name || t.unnamed}</td>
                  <td className="px-5 py-3.5">
                    <span
                      className={`inline-block whitespace-nowrap rounded-full border px-3 py-1 text-xs ${STATUS_META[r.status].className}`}
                    >
                      {STATUS_LABELS[locale][r.status]}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-white/70">
                    {r.tariff ? TARIFF_META[r.tariff].label : '—'}
                  </td>
                  <td className="px-5 py-3.5 text-white/50">{cabinetDate(locale, r.created_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Выплаты */}
      <h2 className="mt-12 text-xl font-medium tracking-tight text-white">{t.payoutsTitle}</h2>
      {payouts.length === 0 ? (
        <p className="mt-3 text-sm text-white/50">{t.payoutsEmpty}</p>
      ) : (
        <div className="mt-4 flex flex-col gap-2.5">
          {payouts.map((p) => (
            <div
              key={p.id}
              className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3.5 text-sm"
            >
              <span className="font-medium text-white">{money(Number(p.amount))}</span>
              <span className={p.status === 'paid' ? 'text-emerald-300' : 'text-amber-200'}>
                {p.status === 'paid' ? t.paidOn(cabinetDate(locale, p.paid_at)) : t.pending}
              </span>
            </div>
          ))}
        </div>
      )}
    </CabinetShell>
  )
}

/* ─────────────────────────── Копирование ссылки ─────────────────────────── */

function CopyLink({
  slug,
  copyLabel,
  copiedLabel,
}: {
  slug: string
  copyLabel: string
  copiedLabel: string
}) {
  const [copied, setCopied] = useState(false)
  const link = refLink(slug)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(`https://${link}`)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      /* буфер обмена недоступен — ссылку можно выделить вручную */
    }
  }

  return (
    <div className="mt-3 flex flex-wrap items-center gap-3">
      <code className="select-all rounded-xl border border-white/15 bg-black/40 px-4 py-2.5 text-sm text-emerald-200">
        {link}
      </code>
      <button
        type="button"
        onClick={copy}
        className="inline-flex items-center gap-2 rounded-full border border-white/25 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:border-white/50"
      >
        {copied ? <Check size={15} className="text-emerald-400" /> : <Copy size={15} />}
        {copied ? copiedLabel : copyLabel}
      </button>
    </div>
  )
}

/* ─────────────── Дозаполнение профиля (аккаунт есть, строки partners нет) ─────────────── */

function CompleteProfile({
  locale,
  userId,
  defaultName,
  onDone,
}: {
  locale: CabinetLocale
  userId: string
  defaultName: string
  onDone: () => void
}) {
  const t = STRINGS[locale].dashboard
  const tr = STRINGS[locale].register
  const [name, setName] = useState(defaultName)
  const [slug, setSlug] = useState('')
  const [slugTouched, setSlugTouched] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')

  const autoSlug = slugTouched ? slug : suggestSlug(name)
  const valid = name.trim().length > 1 && SLUG_RE.test(autoSlug)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!valid || sending) return
    setSending(true)
    setError('')
    const supabase = getSupabase()
    const { error: err } = await supabase.from('partners').insert({
      user_id: userId,
      slug: autoSlug,
      name: name.trim(),
    })
    setSending(false)
    if (err) {
      setError(err.code === '23505' ? t.errSlugTaken : t.errSave)
      return
    }
    onDone()
  }

  return (
    <CabinetShell tag={t.profileTag} narrow showSignOut locale={locale}>
      <h1 className="text-3xl font-semibold tracking-tight text-white">{t.profileH1}</h1>
      <p className="mt-3 text-sm leading-relaxed text-white/60">{t.profileLead}</p>
      <form onSubmit={handleSubmit} className={card('plain', 'mt-8')}>
        <Field label={tr.name} required>
          <TextInput
            icon={<User size={16} />}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={tr.namePlaceholder}
          />
        </Field>
        <Field
          label={tr.slug}
          required
          hint={SLUG_RE.test(autoSlug) ? `${tr.slugYourLink} ${refLink(autoSlug)}` : tr.slugRules}
        >
          <TextInput
            icon={<Link2 size={16} />}
            value={autoSlug}
            onChange={(e) => {
              setSlugTouched(true)
              setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))
            }}
            placeholder="yourname"
          />
        </Field>
        <SubmitButton disabled={!valid || sending}>
          {sending ? t.profileSubmitting : t.profileSubmit}
        </SubmitButton>
        <FormError>{error}</FormError>
      </form>
    </CabinetShell>
  )
}
