import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Check, Copy, Link2, User } from 'lucide-react'
import { getSupabase, supabaseConfigured } from '../../../lib/supabase'
import { DASHBOARD_METRICS, RATE_THRESHOLD, formatMoney } from '../data'
import { card, plural } from '../ui'
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
  SLUG_RE,
  STATUS_META,
  TARIFF_META,
  computeEarnings,
  formatDate,
  refLink,
  suggestSlug,
  type Payout,
  type PartnerStats,
  type Referral,
  type Tariff,
} from './lib'
import { useAuth } from './useAuth'

export default function DashboardPage() {
  usePageMeta('Партнёрский кабинет — Habibi')
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
      navigate('/ru/partners/login')
      return
    }
    load(session.user.id)
  }, [authLoading, session, navigate, load])

  if (!supabaseConfigured()) {
    return (
      <CabinetShell tag="Личный кабинет" narrow>
        <NotConfigured />
      </CabinetShell>
    )
  }

  if (authLoading || (loading && !noProfile)) {
    return (
      <CabinetShell tag="Личный кабинет" showSignOut>
        <p className="text-sm text-white/50">Загружаем кабинет…</p>
      </CabinetShell>
    )
  }

  if (noProfile && session) {
    return (
      <CompleteProfile
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

  // Разбивка «Тарифы» по активной базе: 2 × Pro · 1 × Premium
  const tariffBreakdown = Object.entries(
    referrals
      .filter((r) => r.status === 'paying' && r.tariff)
      .reduce<Record<string, number>>((acc, r) => {
        acc[r.tariff] = (acc[r.tariff] || 0) + 1
        return acc
      }, {}),
  )
    .map(([t, n]) => `${n} × ${TARIFF_META[t as Tariff].label.replace('Habibi ', '')}`)
    .join(' · ')

  const values: Record<string, { value: string; sub?: string }> = {
    'Переходы': { value: String(partner.clicks) },
    'Регистрации': { value: String(partner.regs) },
    'Демо-период': { value: String(partner.trials) },
    'Платящие клиенты': { value: String(e.payingCount) },
    'Тарифы': { value: tariffBreakdown || '—' },
    'Твой процент': { value: `${Math.round(e.rate * 100)}%` },
    'Доход': { value: formatMoney(e.accrued), sub: `${formatMoney(e.monthly)} в месяц сейчас` },
    'Доступно к выплате': { value: formatMoney(e.available) },
  }

  return (
    <CabinetShell tag="Личный кабинет" showSignOut>
      <h1 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
        Привет{partner.name ? `, ${partner.name.split(' ')[0]}` : ''}!
      </h1>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/60">
        Вся статистика в одном месте — от переходов по ссылке до суммы, доступной к выплате.
      </p>

      {/* Реферальная ссылка */}
      <div className={card('emerald', 'mt-8 md:!p-7')}>
        <div className="flex items-center gap-2 text-sm font-medium text-emerald-300">
          <Link2 size={16} />
          Твоя персональная ссылка
        </div>
        <CopyLink slug={partner.slug} />
        <p className="mt-3 text-xs leading-relaxed text-white/45">
          Отправляй её потенциальным клиентам: система фиксирует переход и закрепляет клиента за
          тобой автоматически.
        </p>
      </div>

      {/* Метрики */}
      <div className="mt-4 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {DASHBOARD_METRICS.map((m) => (
          <div key={m.title} className={card('plain', 'h-full !p-5')}>
            <m.icon size={20} className="text-emerald-400" />
            <h3 className="mt-3.5 text-sm font-medium text-white/70">{m.title}</h3>
            <p className="mt-1.5 break-words text-xl font-semibold text-white md:text-2xl">
              {values[m.title]?.value ?? '—'}
            </p>
            {values[m.title]?.sub && (
              <p className="mt-1 text-xs text-white/45">{values[m.title].sub}</p>
            )}
          </div>
        ))}
      </div>

      {/* Прогресс до 30% */}
      <div className={card('plain', 'mt-4 md:!p-7')}>
        <div className="mb-2 flex flex-wrap items-center justify-between gap-2 text-sm">
          <span className="font-medium text-white">
            {e.payingCount} / {RATE_THRESHOLD} клиентов
          </span>
          <span className={top ? 'font-medium text-emerald-300' : 'text-white/50'}>
            {top
              ? '30% на всю активную базу'
              : `Ещё ${left} ${plural(left, 'клиент', 'клиента', 'клиентов')} до ставки 30%`}
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
        <p className="mt-3 text-xs leading-relaxed text-white/40">
          Расчёт ориентировочный: комиссия начисляется с фактически оплаченных подписок.
        </p>
      </div>

      {/* Клиенты */}
      <h2 className="mt-12 text-xl font-medium tracking-tight text-white">Твои клиенты</h2>
      {referrals.length === 0 ? (
        <p className="mt-3 text-sm text-white/50">
          Пока никого — поделись своей ссылкой, и первые заявки появятся здесь.
        </p>
      ) : (
        <div className={card('plain', 'mt-4 overflow-x-auto !p-0')}>
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 text-xs uppercase tracking-wider text-white/40">
                <th className="px-5 py-3.5 font-medium">Клиент</th>
                <th className="px-5 py-3.5 font-medium">Статус</th>
                <th className="px-5 py-3.5 font-medium">Тариф</th>
                <th className="px-5 py-3.5 font-medium">Появился</th>
              </tr>
            </thead>
            <tbody>
              {referrals.map((r) => (
                <tr key={r.id} className="border-b border-white/5 last:border-0">
                  <td className="px-5 py-3.5 text-white">{r.name || 'Без имени'}</td>
                  <td className="px-5 py-3.5">
                    <span
                      className={`inline-block whitespace-nowrap rounded-full border px-3 py-1 text-xs ${STATUS_META[r.status].className}`}
                    >
                      {STATUS_META[r.status].label}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-white/70">
                    {r.tariff ? TARIFF_META[r.tariff].label : '—'}
                  </td>
                  <td className="px-5 py-3.5 text-white/50">{formatDate(r.created_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Выплаты */}
      <h2 className="mt-12 text-xl font-medium tracking-tight text-white">Выплаты</h2>
      {payouts.length === 0 ? (
        <p className="mt-3 text-sm text-white/50">
          Выплат ещё не было. Рекомендуемый минимальный порог выплаты — €50; по вопросам выплат мы
          свяжемся с тобой сами или напиши нам.
        </p>
      ) : (
        <div className="mt-4 flex flex-col gap-2.5">
          {payouts.map((p) => (
            <div
              key={p.id}
              className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3.5 text-sm"
            >
              <span className="font-medium text-white">{formatMoney(Number(p.amount))}</span>
              <span className={p.status === 'paid' ? 'text-emerald-300' : 'text-amber-200'}>
                {p.status === 'paid' ? `Выплачено ${formatDate(p.paid_at)}` : 'В обработке'}
              </span>
            </div>
          ))}
        </div>
      )}
    </CabinetShell>
  )
}

/* ─────────────────────────── Копирование ссылки ─────────────────────────── */

function CopyLink({ slug }: { slug: string }) {
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
        {copied ? 'Скопировано' : 'Скопировать'}
      </button>
    </div>
  )
}

/* ─────────────── Дозаполнение профиля (аккаунт есть, строки partners нет) ─────────────── */

function CompleteProfile({
  userId,
  defaultName,
  onDone,
}: {
  userId: string
  defaultName: string
  onDone: () => void
}) {
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
      setError(
        err.code === '23505'
          ? 'Эта ссылка уже занята — выберите другое имя.'
          : 'Не удалось сохранить. Попробуйте ещё раз.',
      )
      return
    }
    onDone()
  }

  return (
    <CabinetShell tag="Ещё один шаг" narrow showSignOut>
      <h1 className="text-3xl font-semibold tracking-tight text-white">Придумай свою ссылку</h1>
      <p className="mt-3 text-sm leading-relaxed text-white/60">
        Аккаунт создан. Осталось выбрать имя для персональной реферальной ссылки.
      </p>
      <form onSubmit={handleSubmit} className={card('plain', 'mt-8')}>
        <Field label="Имя" required>
          <TextInput
            icon={<User size={16} />}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Как к вам обращаться"
          />
        </Field>
        <Field
          label="Имя для ссылки"
          required
          hint={
            SLUG_RE.test(autoSlug)
              ? `Твоя ссылка: ${refLink(autoSlug)}`
              : 'Латиница, цифры и дефис, от 3 до 30 символов.'
          }
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
          {sending ? 'Сохраняем…' : 'Получить ссылку'}
        </SubmitButton>
        <FormError>{error}</FormError>
      </form>
    </CabinetShell>
  )
}
