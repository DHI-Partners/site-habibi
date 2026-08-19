import { useEffect, type ReactNode } from 'react'
import { ArrowLeft, ArrowRight, Check, Sparkles, TrendingUp } from 'lucide-react'
import { ContactProvider, useContact } from '../ContactProvider'
import { Reveal } from '../Reveal'
import { LiquidButton } from '../ui/liquid-glass-button'
import DigitalHeart from '../DigitalHeart'
import { TIERS } from '../Pricing'
import EarningsCalculator from './EarningsCalculator'
import Banknotes from './Banknotes'
import GoldRain from './GoldRain'
import PartnerFooter from './PartnerFooter'
import AiChatWidget from '../AiChatWidget'
import {
  AUDIENCES,
  COMMISSION_LEVELS,
  CONDITIONS,
  DASHBOARD_METRICS,
  EXAMPLES,
  EXCLUSIVE_FEATURES,
  FINAL_CHAIN,
  GROWTH_STEPS,
  OPPORTUNITIES,
  PARTNER_FORM,
  PRICE_PRO,
  RATE_HIGH,
  RATE_LOW,
  RATE_THRESHOLD,
  STEPS,
  TIER_EARNINGS,
  WIN_SIDES,
  formatMoney,
} from './data'

// Те же фоновые видео, что уже используются на лендинге, — новых ассетов не тянем.
// (Герой видео не использует: там фон из купюр, см. Banknotes.)
const EARNINGS_VIDEO =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_204221_5339e40b-e73d-4ab0-9c65-79c18c66fd50.mp4'
const CLOSING_VIDEO =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260424_064411_9e9d7f84-9277-41f4-ab10-59172d89e6be.mp4'

/* ─────────────────────────── Примитивы ─────────────────────────── */

/** Простой рендер **жирного** внутри абзаца (как в Faq.tsx). */
function renderRich(text: string) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith('**') && part.endsWith('**') ? (
      <strong key={i} className="font-semibold text-white/90">
        {part.slice(2, -2)}
      </strong>
    ) : (
      part
    ),
  )
}

/**
 * Маркер раздела: линия во всю ширину + подпись на ней.
 * Читается как «здесь начинается новый раздел» ещё до чтения заголовка.
 * Номер раздела намеренно не ставим — он бы спорил с нумерацией шагов 01–05.
 */
function SectionTag({
  children,
  divider = true,
}: {
  children: string
  /** Линия-разделитель над подписью (в герое не нужна). */
  divider?: boolean
}) {
  return (
    <div className="mb-5">
      {divider && (
        <div className="mb-6 flex items-center gap-3">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.95)]" />
          <span className="h-px flex-1 bg-gradient-to-r from-emerald-400/55 via-white/15 to-transparent" />
        </div>
      )}
      <span className="inline-flex items-center gap-2.5 rounded-full border border-emerald-400/35 bg-emerald-400/[0.1] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-sm">
        {children}
      </span>
    </div>
  )
}

function Pill({ children }: { children: ReactNode }) {
  return (
    <span className="whitespace-nowrap rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm text-white/85">
      {children}
    </span>
  )
}

function Section({
  id,
  children,
  className = '',
  seed = 1,
}: {
  id?: string
  children: ReactNode
  className?: string
  /** Узор золотого дождя — свой у каждой секции. */
  seed?: number
}) {
  return (
    <section
      id={id}
      className={`relative overflow-hidden bg-black px-6 py-20 md:px-12 md:py-28 lg:px-16 ${className}`}
    >
      {/* Золотой дождь — фон секций без видео */}
      <GoldRain className="pointer-events-none absolute inset-0" seed={seed} />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />

      <div className="relative z-10 mx-auto max-w-6xl">{children}</div>
    </section>
  )
}

function SectionHead({
  tag,
  title,
  lead,
}: {
  tag: string
  title: string
  lead?: string
}) {
  return (
    <Reveal>
      <div className="mb-12">
        <SectionTag>{tag}</SectionTag>
        <h2 className="max-w-3xl text-2xl font-medium leading-tight tracking-tight text-white sm:text-3xl md:text-4xl">
          {title}
        </h2>
        {lead && <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/60">{lead}</p>}
      </div>
    </Reveal>
  )
}

/**
 * Подсветка карточек: мягкий свет сверху внутри блока + тонкая световая кромка,
 * на наведении — свечение по контуру. Три тона: нейтральный, изумрудный (акцент),
 * янтарный (премиум).
 */
const CARD_BASE =
  'relative rounded-2xl border p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5'

const CARD_TONES = {
  plain:
    'border-white/12 bg-gradient-to-b from-white/[0.07] via-white/[0.025] to-transparent shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] hover:border-white/25 hover:shadow-[0_18px_44px_-22px_rgba(0,0,0,0.95),0_0_32px_-14px_rgba(255,255,255,0.3),inset_0_1px_0_rgba(255,255,255,0.16)]',
  emerald:
    'border-emerald-400/30 bg-gradient-to-b from-emerald-400/[0.13] via-emerald-400/[0.04] to-transparent shadow-[inset_0_1px_0_rgba(52,211,153,0.2)] hover:border-emerald-400/50 hover:shadow-[0_18px_44px_-22px_rgba(0,0,0,0.95),0_0_36px_-12px_rgba(52,211,153,0.45),inset_0_1px_0_rgba(52,211,153,0.3)]',
  amber:
    'border-amber-300/30 bg-gradient-to-b from-amber-300/[0.12] via-amber-300/[0.04] to-transparent shadow-[inset_0_1px_0_rgba(252,211,77,0.2)] hover:border-amber-300/50 hover:shadow-[0_18px_44px_-22px_rgba(0,0,0,0.95),0_0_36px_-12px_rgba(252,211,77,0.42),inset_0_1px_0_rgba(252,211,77,0.3)]',
} as const

function card(tone: keyof typeof CARD_TONES = 'plain', extra = '') {
  return `${CARD_BASE} ${CARD_TONES[tone]} ${extra}`.trim()
}

const CARD = card()

/* ─────────────────────────── Страница ─────────────────────────── */

function PartnerPageContent() {
  const { open } = useContact()
  const apply = () => open(PARTNER_FORM.label, PARTNER_FORM.options)

  useEffect(() => {
    const html = document.documentElement
    const prevLang = html.getAttribute('lang') ?? 'en'
    html.setAttribute('lang', 'ru')
    document.title = 'Партнёрская программа Habibi — зарабатывай на рекомендациях'
    window.scrollTo(0, 0)
    return () => {
      html.setAttribute('lang', prevLang)
      document.title = 'Habibi — the digital ecosystem for your business'
    }
  }, [])

  return (
    <div className="min-h-screen w-full bg-black font-geist text-white">
      {/* ─── 01. Герой ─── */}
      <section className="relative overflow-hidden bg-black">
        {/* Фон: купюры мировых валют + мягкое золотое свечение и монеты поверх */}
        <Banknotes className="pointer-events-none absolute inset-0" seed={7} />
        <GoldRain className="pointer-events-none absolute inset-0" seed={1} density={0.5} />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(75%_55%_at_50%_35%,rgba(226,190,116,0.09),transparent_72%)]" />
        {/* Вуаль под текстом: на мобильном равномерная (текст на всю ширину),
            на десктопе уходит влево — справа купюры «дышат». */}
        <div className="pointer-events-none absolute inset-0 bg-black/45 md:hidden" />
        <div className="pointer-events-none absolute inset-0 hidden bg-gradient-to-r from-black/90 via-black/35 to-transparent md:block" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black" />

        <header className="relative z-10 mx-auto flex max-w-6xl items-center justify-between px-6 pt-8 md:px-12">
          <a
            href="/ru"
            className="inline-flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-white"
          >
            <ArrowLeft size={16} />
            На главную
          </a>
          <span className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.22em] text-white/70">
            Habibi
            <DigitalHeart className="heart-beat h-[12px] w-auto text-emerald-400" />
          </span>
        </header>

        <div className="relative z-10 mx-auto max-w-6xl px-6 pb-24 pt-16 md:px-12 md:pb-32 md:pt-24 lg:px-16">
          <SectionTag divider={false}>Партнёрская программа</SectionTag>
          <h1 className="max-w-3xl text-4xl font-semibold leading-[1.08] tracking-tight text-white [animation:fadeSlideUp_0.8s_ease_0.1s_both] sm:text-5xl md:text-6xl">
            Зарабатывай вместе с Habibi
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/70 [animation:fadeSlideUp_0.8s_ease_0.25s_both] md:text-xl">
            Рекомендуй Habibi бизнесу и получай доход с каждой оплаченной подписки.
          </p>

          <div className="mt-8 flex flex-wrap gap-2.5 [animation:fadeSlideUp_0.8s_ease_0.4s_both]">
            {[
              'Знаешь предпринимателей?',
              'Развиваешь бизнес-сообщество?',
              'Работаешь с компаниями?',
              'Ведёшь Telegram-канал или блог?',
            ].map((q) => (
              <Pill key={q}>{q}</Pill>
            ))}
          </div>

          <p className="mt-8 max-w-2xl text-base leading-relaxed text-white/85 [animation:fadeSlideUp_0.8s_ease_0.5s_both] md:text-lg">
            Получай персональную реферальную ссылку и до{' '}
            <span className="font-semibold text-emerald-300">30%</span> с оплаченных подписок
            привлечённых тобой клиентов.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3.5 [animation:fadeSlideUp_0.8s_ease_0.6s_both]">
            <LiquidButton size="xl" onClick={apply} className="rounded-full text-white">
              Стать партнёром
              <ArrowRight size={18} />
            </LiquidButton>
            <a
              href="#kak-rabotaet"
              className="rounded-full border border-white/25 px-8 py-3.5 text-base font-medium text-white transition-colors hover:border-white/50"
            >
              Как это работает
            </a>
          </div>
        </div>
      </section>

      {/* ─── 02. Как работает ─── */}
      <Section id="kak-rabotaet" seed={2}>
        <SectionHead
          tag="5 шагов"
          title="Как работает партнёрская программа"
          lead="Всё просто: регистрируешься, делишься ссылкой и получаешь процент с оплаченных подписок."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {STEPS.map((step, i) => (
            <Reveal key={step.num} delay={(i % 3) * 0.08}>
              <div className={`${CARD} h-full`}>
                <span className="text-4xl font-semibold leading-none text-white/15">
                  {step.num}
                </span>
                <h3 className="mt-4 text-lg font-medium text-white">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{step.text}</p>

                {step.code && (
                  <div className="mt-4">
                    <p className="text-xs text-white/40">Например:</p>
                    <code className="mt-1.5 inline-block rounded-lg border border-emerald-400/20 bg-emerald-400/[0.07] px-3 py-1.5 font-mono text-sm text-emerald-300">
                      {step.code}
                    </code>
                  </div>
                )}

                {step.chips && (
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {step.chips.map((chip) => (
                      <span
                        key={chip}
                        className="rounded-full border border-white/12 bg-white/5 px-2.5 py-1 text-xs text-white/65"
                      >
                        {chip}
                      </span>
                    ))}
                  </div>
                )}

                {step.list && (
                  <ul className="mt-4 space-y-1.5">
                    {step.list.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-white/70">
                        <Check size={15} className="mt-0.5 shrink-0 text-emerald-400" />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}

                {step.note && (
                  <p className="mt-4 rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-sm text-white/75">
                    {step.note}
                  </p>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ─── 03. Ставки ─── */}
      <Section id="stavki" seed={3}>
        <SectionHead
          tag="Комиссия"
          title="Чем больше клиентов — тем выше твой процент"
          lead="Мы сделали партнёрскую программу максимально простой: два уровня и понятное правило перехода."
        />
        <div className="grid gap-4 md:grid-cols-2">
          {COMMISSION_LEVELS.map((level, i) => (
            <Reveal key={level.rate} delay={i * 0.1}>
              <div
                className={card(level.top ? 'emerald' : 'plain', 'h-full !p-8')}
              >
                <p className="text-sm text-white/55">{level.clients}</p>
                <p
                  className={`mt-4 text-6xl font-semibold tracking-tighter ${
                    level.top ? 'text-emerald-300' : 'text-white'
                  }`}
                >
                  {level.rate}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-white/60">{level.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <div className={card('amber', 'mt-4 flex items-start gap-4')}>
            <TrendingUp size={22} className="mt-0.5 shrink-0 text-amber-300" />
            <div>
              <h3 className="text-lg font-medium text-white">Важное преимущество</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/65">
                Когда ты достигаешь {RATE_THRESHOLD} активных платящих клиентов, повышенная ставка
                30% применяется{' '}
                <strong className="font-semibold text-white/90">
                  ко всей твоей активной клиентской базе
                </strong>
                , а не только к 11-му клиенту. Каждый новый клиент увеличивает не только количество
                клиентов, но и доход от уже привлечённых компаний.
              </p>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* ─── 04. Сколько можно заработать ─── */}
      <section
        id="raschet"
        className="relative overflow-hidden bg-black px-6 py-20 md:px-12 md:py-28 lg:px-16"
      >
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src={EARNINGS_VIDEO} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/70" />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/50 to-black" />

        <div className="relative z-10 mx-auto max-w-6xl">
          <SectionHead
            tag="Расчёт"
            title="Сколько можно заработать?"
            lead="Посчитаем на конкретных тарифах Habibi."
          />

          {/* Комиссия по тарифам */}
          <div className="grid gap-4 md:grid-cols-3">
            {TIER_EARNINGS.map((tier, i) => (
              <Reveal key={tier.name} delay={i * 0.08}>
                <div className={`${CARD} h-full`}>
                  <h3 className="text-lg font-medium text-white">{tier.name}</h3>
                  <p className="mt-1 text-sm text-white/45">{formatMoney(tier.price)} в месяц</p>
                  <div className="mt-5 space-y-3 border-t border-white/10 pt-5">
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="text-sm text-white/55">При комиссии 20%</span>
                      <span className="text-lg font-semibold text-white">
                        {formatMoney(tier.price * RATE_LOW)}
                      </span>
                    </div>
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="text-sm text-white/55">При комиссии 30%</span>
                      <span className="text-lg font-semibold text-emerald-300">
                        {formatMoney(tier.price * RATE_HIGH)}
                      </span>
                    </div>
                  </div>
                  <p className="mt-4 text-xs text-white/40">с одного клиента в месяц</p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Интерактивный калькулятор */}
          <Reveal delay={0.1}>
            <div className="mt-10">
              <h3 className="mb-5 text-xl font-medium tracking-tight text-white">
                Посчитай свой доход
              </h3>
              <EarningsCalculator />
            </div>
          </Reveal>

          {/* Примеры */}
          <Reveal delay={0.1}>
            <h3 className="mb-5 mt-14 text-xl font-medium tracking-tight text-white">Например</h3>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2">
            {EXAMPLES.map((ex, i) => (
              <Reveal key={ex.title} delay={(i % 2) * 0.08}>
                <div
                  className={card(ex.highlight ? 'emerald' : 'plain', 'h-full')}
                >
                  <h4 className="text-base font-medium text-white">{ex.title}</h4>
                  <ul className="mt-3 space-y-1.5">
                    {ex.rows.map((row) => (
                      <li key={row} className="text-sm leading-relaxed text-white/60">
                        {row}
                      </li>
                    ))}
                  </ul>
                  <p
                    className={`mt-5 text-3xl font-semibold tracking-tight ${
                      ex.highlight ? 'text-emerald-300' : 'text-white'
                    }`}
                  >
                    {ex.result}
                  </p>
                  <p className="mt-1 text-xs text-white/45">{ex.caption}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 05. Habibi Exclusive ─── */}
      <Section seed={5}>
        <SectionHead
          tag="Крупные клиенты"
          title="Habibi Exclusive"
          lead="Для компаний, которым требуется индивидуальное решение. Стоимость определяется после аудита бизнеса — партнёр также получает комиссию с такого клиента."
        />
        <Reveal>
          <div className={card('amber', '!p-8')}>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {EXCLUSIVE_FEATURES.map((f) => (
                <div key={f} className="flex items-start gap-2.5">
                  <Check size={16} className="mt-0.5 shrink-0 text-amber-300" />
                  <span className="text-sm text-white/75">{f}</span>
                </div>
              ))}
            </div>
            <p className="mt-8 border-t border-white/10 pt-6 text-sm leading-relaxed text-white/60">
              Размер и условия комиссии по Habibi Exclusive определяются индивидуально — в
              зависимости от стоимости и структуры проекта. Это позволяет приводить не только
              небольшие компании, но и крупных корпоративных клиентов.
            </p>
          </div>
        </Reveal>
      </Section>

      {/* ─── 06. Возможности партнёра ─── */}
      <Section seed={6}>
        <SectionHead
          tag="Больше, чем рекомендации"
          title="Твои возможности не ограничиваются рекомендациями"
          lead="Habibi — это не просто SaaS-сервис, а цифровая экосистема для бизнеса. Вокруг неё можно построить собственный источник дохода."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {OPPORTUNITIES.map((item, i) => (
            <Reveal key={item.title} delay={(i % 3) * 0.08}>
              <div className={`${CARD} h-full`}>
                <item.icon size={22} className="text-emerald-400" />
                <h3 className="mt-4 text-lg font-medium text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{item.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ─── 07. Для кого ─── */}
      <Section seed={7}>
        <SectionHead
          tag="Аудитория"
          title="Для кого создана партнёрская программа?"
          lead="Тебе не нужно быть маркетологом, IT-специалистом или блогером — достаточно знать предпринимателей, которым Habibi может быть полезен."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {AUDIENCES.map((a, i) => (
            <Reveal key={a.title} delay={(i % 3) * 0.08}>
              <div className={`${CARD} h-full`}>
                <a.icon size={22} className="text-white/50" />
                <h3 className="mt-4 text-lg font-medium text-white">{a.title}</h3>
                <p className="mt-2 text-sm font-medium text-white/80">{a.question}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-white/60">{a.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ─── 08. Персональная ссылка ─── */}
      <Section seed={8}>
        <Reveal>
          <SectionTag>Атрибуция</SectionTag>
        </Reveal>
        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-center">
          <Reveal>
            <div>
              <h2 className="text-2xl font-medium leading-tight tracking-tight text-white sm:text-3xl md:text-4xl">
                Персональная реферальная ссылка
              </h2>
              <p className="mt-4 text-base leading-relaxed text-white/60">
                После регистрации ты получаешь собственную ссылку и отправляешь её потенциальному
                клиенту. Система фиксирует переход и связывает нового пользователя с твоим
                партнёрским аккаунтом.
              </p>
              <p className="mt-4 text-base leading-relaxed text-white/80">
                Тебе не нужно вручную сообщать нам: «Этот клиент пришёл от меня». Всё происходит
                автоматически.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className={CARD}>
              <p className="text-xs uppercase tracking-widest text-white/40">
                Так будет выглядеть твоя ссылка
              </p>
              <code className="mt-3 block overflow-x-auto rounded-xl border border-emerald-400/20 bg-emerald-400/[0.07] px-4 py-3 font-mono text-sm text-emerald-300">
                habibi-erp.com/ref/yourname
              </code>
              <ul className="mt-5 space-y-2.5">
                {[
                  'Клиент переходит по ссылке и регистрируется',
                  'Переход и регистрация закрепляются за твоим аккаунтом',
                  'После первой оплаты начисляется комиссия',
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2.5 text-sm text-white/65">
                    <Check size={15} className="mt-0.5 shrink-0 text-emerald-400" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ─── 09. Кабинет ─── */}
      <Section id="kabinet" seed={9}>
        <SectionHead
          tag="Личный кабинет"
          title="Твой партнёрский кабинет"
          lead="Вся статистика в одном месте — от переходов по ссылке до суммы, доступной к выплате."
        />
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {DASHBOARD_METRICS.map((m, i) => (
            <Reveal key={m.title} delay={(i % 4) * 0.06}>
              <div className={`${CARD} h-full !p-5`}>
                <m.icon size={20} className="text-emerald-400" />
                <h3 className="mt-3.5 text-base font-medium text-white">{m.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-white/55">{m.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15}>
          <div className={card('plain', 'mt-4 md:!p-8')}>
            <h3 className="text-lg font-medium text-white">Следующий уровень всегда рядом</h3>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/60">
              Кабинет показывает твой прогресс до повышенной ставки. Например:
            </p>
            <div className="mt-6 max-w-md">
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="font-medium text-white">7 / {RATE_THRESHOLD} клиентов</span>
                <span className="text-white/50">Ещё 4 клиента до 30%</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
                <div className="h-full w-[63.6%] rounded-full bg-emerald-400" />
              </div>
              <p className="mt-4 text-xs text-white/40">
                Цифры на этом экране — пример. После {RATE_THRESHOLD} активных платящих клиентов
                ставка 30% распространяется на всю активную базу.
              </p>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* ─── 10. Почему это выгодно ─── */}
      <Section seed={10}>
        <SectionHead
          tag="Recurring-доход"
          title="Почему это выгодно?"
          lead="Большинство рекомендаций заканчиваются одним действием: порекомендовал → получил фиксированный бонус → всё. Habibi работает иначе — ты создаёшь клиентскую базу, которая приносит доход регулярно."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {GROWTH_STEPS.map((s, i) => {
            const rate = s.clients >= RATE_THRESHOLD ? RATE_HIGH : RATE_LOW
            return (
              <Reveal key={s.label} delay={(i % 4) * 0.08}>
                <div className={`${CARD} h-full`}>
                  <p className="text-xs uppercase tracking-widest text-white/40">{s.label}</p>
                  <p className="mt-3 text-4xl font-semibold tracking-tight text-white">
                    {s.clients}
                    {i === GROWTH_STEPS.length - 1 && '+'}
                  </p>
                  <p className="mt-1 text-sm text-white/55">активных клиентов</p>
                  <p className="mt-5 border-t border-white/10 pt-4 text-sm text-white/70">
                    <span className="font-semibold text-emerald-300">
                      {formatMoney(s.clients * PRICE_PRO * rate)}
                    </span>{' '}
                    в месяц
                  </p>
                  <p className="mt-1 text-xs text-white/35">
                    если все на Habibi Pro, ставка {Math.round(rate * 100)}%
                  </p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </Section>

      {/* ─── 11. Ты не продаёшь ERP ─── */}
      <Section seed={11}>
        <Reveal>
          <SectionTag>Без продаж</SectionTag>
        </Reveal>
        <Reveal>
          <div className={card('plain', '!rounded-3xl !p-8 md:!p-12')}>
            <h2 className="max-w-3xl text-2xl font-medium leading-tight tracking-tight text-white sm:text-3xl md:text-4xl">
              Ты не продаёшь ERP
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/65">
              Тебе не нужно становиться профессиональным продавцом программного обеспечения. Твоя
              задача — познакомить предпринимателя с Habibi. Дальше клиент самостоятельно знакомится
              с продуктом.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-emerald-400/25 bg-emerald-400/[0.08] px-5 py-2.5 text-sm font-medium text-emerald-300">
                14 дней бесплатно
              </span>
              <span className="rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm text-white/75">
                Без банковской карты
              </span>
              <span className="rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm text-white/75">
                Подходит — клиент выбирает тариф, ты получаешь комиссию
              </span>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* ─── 12. Что получает клиент ─── */}
      <Section id="tarify-klienta" seed={12}>
        <SectionHead
          tag="Ценность для клиента"
          title="Что получает клиент?"
          lead="Партнёрская программа работает только тогда, когда рекомендация действительно полезна. Клиент получает доступ к цифровой экосистеме Habibi."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {TIERS.map((tier, i) => (
            <Reveal key={tier.name} delay={(i % 4) * 0.08}>
              <div
                className={card(tier.isExclusive ? 'amber' : 'plain', 'flex h-full flex-col')}
              >
                <h3 className="text-lg font-medium text-white">{tier.name}</h3>
                <p className="mt-3 text-3xl font-semibold tracking-tight text-white">
                  {tier.priceLabel ?? `€${tier.priceMonthly}`}
                  {!tier.priceLabel && (
                    <span className="ml-1 text-sm font-normal text-white/45">/ мес</span>
                  )}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-white/55">{tier.description}</p>
                <ul className="mt-5 space-y-2 border-t border-white/10 pt-5">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-white/65">
                      <Check
                        size={15}
                        className={`mt-0.5 shrink-0 ${
                          tier.isExclusive ? 'text-amber-300' : 'text-emerald-400'
                        }`}
                      />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.1}>
          <p className="mt-6 text-sm text-white/45">
            Первые 14 дней бесплатно, без карты. У тарифа Habibi Exclusive стоимость и условия
            рассчитываются после аудита бизнеса.
          </p>
        </Reveal>
      </Section>

      {/* ─── 13. Три стороны ─── */}
      <Section seed={13}>
        <SectionHead tag="Win-win-win" title="Три стороны выигрывают" />
        <div className="grid gap-4 md:grid-cols-3">
          {WIN_SIDES.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.08}>
              <div className={`${CARD} h-full`}>
                <s.icon size={22} className="text-emerald-400" />
                <h3 className="mt-4 text-lg font-medium text-white">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ─── 14. Условия ─── */}
      <Section id="usloviya" seed={14}>
        <SectionHead
          tag="Прозрачно"
          title="Условия партнёрской программы"
          lead="Основные правила фиксируем сразу — чтобы не было неожиданностей."
        />
        <div className="grid gap-4 md:grid-cols-2">
          {CONDITIONS.map((c, i) => (
            <Reveal key={c.title} delay={(i % 2) * 0.06}>
              <div className={`${CARD} h-full !p-5`}>
                <div className="flex items-baseline gap-3">
                  <span className="text-sm font-semibold tabular-nums text-white/25">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="text-base font-medium text-white">{c.title}</h3>
                </div>
                <p className="mt-2 pl-8 text-sm leading-relaxed text-white/60">
                  {renderRich(c.text)}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ─── 15. Финальный CTA ─── */}
      <section className="relative overflow-hidden bg-black px-6 py-24 md:px-12 md:py-32 lg:px-16">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src={CLOSING_VIDEO} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/65" />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/40 to-black" />

        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <Reveal>
            <h2 className="text-3xl font-medium leading-[1.15] tracking-tight text-white sm:text-4xl md:text-5xl">
              Начни зарабатывать вместе с Habibi
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/65 md:text-lg">
              Неважно, есть у тебя один знакомый предприниматель или 10 000 подписчиков. Если ты
              можешь познакомить бизнес с Habibi — ты можешь стать нашим партнёром.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-2.5">
              {FINAL_CHAIN.map((step, i) => (
                <span key={step} className="flex items-center gap-2.5">
                  <span
                    className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm ${
                      i === FINAL_CHAIN.length - 1
                        ? 'border-emerald-400/40 bg-emerald-400/10 font-semibold text-emerald-300'
                        : 'border-white/20 bg-white/5 text-white/85'
                    }`}
                  >
                    {step}
                  </span>
                  {i < FINAL_CHAIN.length - 1 && <span className="text-white/35">→</span>}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.3}>
            <p className="mx-auto mt-10 flex max-w-xl items-center justify-center gap-2 text-base text-white/70">
              <Sparkles size={16} className="text-emerald-400" />
              Habibi создаёт технологию. Ты создаёшь рекомендации.
            </p>
            <LiquidButton size="xl" onClick={apply} className="mt-6 rounded-full text-white">
              Стать партнёром Habibi
              <ArrowRight size={18} />
            </LiquidButton>
          </Reveal>
        </div>
      </section>

      <PartnerFooter />
      <AiChatWidget page="partner" />
    </div>
  )
}

export default function PartnerPage() {
  return (
    <ContactProvider>
      <PartnerPageContent />
    </ContactProvider>
  )
}
