import { useEffect, useMemo, useRef, useState } from 'react'
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Briefcase,
  Check,
  Code,
  CreditCard,
  Globe,
  GraduationCap,
  Instagram,
  Link2,
  Megaphone,
  MessageCircle,
  Send,
  Settings,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
  Wallet,
  X,
  Youtube,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { ContactProvider, useContact } from '../ContactProvider'
import Footer from '../Footer'
import { Reveal } from '../Reveal'

/* ──────────────────────────────────────────────────────────────
   Мелкие помощники
   ────────────────────────────────────────────────────────────── */

/**
 * Печатает текст по буквам. В макете первая часть заголовка была чёрной, но там фон светлый —
 * на нашем тёмном фоне она бы пропала, поэтому выделяем её акцентным фиолетовым.
 */
function Typewriter({ text, headLen, speed = 32 }: { text: string; headLen: number; speed?: number }) {
  const [shown, setShown] = useState(0)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      setShown(text.length)
      return
    }
    let i = 0
    let timer = 0
    const start = window.setTimeout(function tick() {
      i += 1
      setShown(i)
      if (i < text.length) timer = window.setTimeout(tick, speed)
    }, 400)
    return () => {
      window.clearTimeout(start)
      window.clearTimeout(timer)
    }
  }, [text, speed])

  const done = shown >= text.length
  return (
    <span>
      <span className="text-[#a068ff]">{text.slice(0, Math.min(shown, headLen))}</span>
      <span className="text-white">{text.slice(headLen, shown)}</span>
      {!done && <span className="pp-caret text-[#a068ff]">|</span>}
    </span>
  )
}

/** Считает от нуля до target за duration мс, запускается при появлении в зоне видимости. */
function useCountUp(target: number, duration = 1600, delay = 400) {
  const [value, setValue] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      setValue(target)
      return
    }
    // На таймере, а не на requestAnimationFrame: в фоновой вкладке rAF замораживается,
    // и счётчик навсегда застывал бы на нуле.
    let timer = 0
    const run = () => {
      const t0 = performance.now()
      timer = window.setInterval(() => {
        const p = Math.min(1, (performance.now() - t0) / duration)
        // easeOutCubic
        setValue(Math.round(target * (1 - Math.pow(1 - p, 3))))
        if (p >= 1) window.clearInterval(timer)
      }, 30)
    }
    let startTimer = 0
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started.current) {
          started.current = true
          startTimer = window.setTimeout(run, delay)
          io.disconnect()
        }
      },
      { threshold: 0.3 },
    )
    io.observe(el)
    return () => {
      io.disconnect()
      window.clearTimeout(startTimer)
      window.clearInterval(timer)
    }
  }, [target, duration, delay])

  return { value, ref }
}

const eur = (n: number) =>
  n.toLocaleString('ru-RU', { minimumFractionDigits: n % 1 ? 2 : 0, maximumFractionDigits: 2 })

/* ──────────────────────────────────────────────────────────────
   Кнопки в стиле макета
   ────────────────────────────────────────────────────────────── */

function PartnerButton({
  children,
  onClick,
  size = 'md',
  fillFrom = 'left',
}: {
  children: React.ReactNode
  onClick?: () => void
  size?: 'sm' | 'md'
  fillFrom?: 'left' | 'right'
}) {
  return (
    <span className="pp-border-wrap">
      <button
        type="button"
        onClick={onClick}
        className={`pp-fill ${fillFrom === 'right' ? 'pp-fill-right' : ''} inline-flex items-center gap-2 rounded-full bg-[#060218] font-medium text-white transition-transform active:scale-[0.98] ${
          size === 'sm' ? 'px-[26px] py-3 text-[15px]' : 'px-7 py-3.5 text-base'
        }`}
      >
        {children}
      </button>
    </span>
  )
}

/* ──────────────────────────────────────────────────────────────
   Орбиты в герое
   ────────────────────────────────────────────────────────────── */

interface Bubble {
  orbit: 1 | 2 | 3 | 4
  angle: number
  label: string
  Icon?: LucideIcon
  size: number
  glow: string
  delay: number
}

const RADIUS: Record<number, number> = { 1: 177, 2: 251, 3: 325, 4: 399 }

const BUBBLES: Bubble[] = [
  { orbit: 1, angle: 270, label: '20%', size: 58, glow: '160,104,255', delay: 0.6 },
  { orbit: 2, angle: 60, label: 'Telegram', Icon: Send, size: 58, glow: '96,165,250', delay: 0.8 },
  { orbit: 2, angle: 180, label: '€49', size: 78, glow: '244,114,182', delay: 1.0 },
  { orbit: 2, angle: 300, label: 'Instagram', Icon: Instagram, size: 58, glow: '160,104,255', delay: 1.2 },
  { orbit: 3, angle: 130, label: '30%', size: 88, glow: '250,204,21', delay: 1.4 },
  { orbit: 4, angle: 30, label: 'YouTube', Icon: Youtube, size: 58, glow: '248,113,113', delay: 1.6 },
  { orbit: 4, angle: 95, label: 'Сайт', Icon: Globe, size: 78, glow: '251,146,60', delay: 1.8 },
  // левее-выше уходить нельзя: там заголовок героя
  { orbit: 4, angle: 150, label: 'Сообщества', Icon: Users, size: 78, glow: '244,114,182', delay: 2.0 },
  { orbit: 4, angle: 320, label: '€199', size: 58, glow: '160,104,255', delay: 2.2 },
]

function Orbits() {
  const { value, ref } = useCountUp(30, 1800, 900)

  return (
    <div className="relative mx-auto h-[720px] w-[720px] shrink-0 scale-[0.42] sm:scale-[0.55] md:scale-[0.7] lg:scale-[0.85] xl:scale-100">
      {/* Кольца */}
      <div className="pp-orbit pp-spin-back h-[353px] w-[353px]" style={{ ['--dur' as string]: '30s' }} />
      <div className="pp-orbit pp-spin h-[501px] w-[501px]" style={{ ['--dur' as string]: '40s' }} />
      <div className="pp-orbit pp-spin h-[649px] w-[649px]" style={{ ['--dur' as string]: '50s' }} />
      <div className="pp-orbit pp-spin-back h-[797px] w-[797px]" style={{ ['--dur' as string]: '60s' }} />

      {/* Центр: максимальная комиссия */}
      <div className="absolute left-1/2 top-1/2 flex h-[353px] w-[353px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full bg-[radial-gradient(circle,rgba(160,104,255,0.16),transparent_70%)] text-center">
        <span ref={ref} className="font-urbanist text-[64px] font-medium leading-none text-white">
          {value}%
        </span>
        <span className="mt-2 font-urbanist text-base font-semibold text-white/60">
          максимальная комиссия
        </span>
      </div>

      {/* Пузыри на орбитах */}
      {/* Позиция задаётся внешним слоем, а появление — внутренним:
          иначе keyframes с transform затирают раскладку по орбите. */}
      {BUBBLES.map((b) => (
        <div
          key={`${b.orbit}-${b.angle}`}
          className="absolute left-1/2 top-1/2 h-0 w-0"
          style={{
            transform: `rotate(${b.angle}deg) translate(${RADIUS[b.orbit]}px) rotate(${-b.angle}deg)`,
          }}
        >
          <div
            className="pp-pop flex flex-col items-center justify-center rounded-full border border-white/15 bg-[#0d0720]/90 text-center backdrop-blur-sm"
            style={{
              width: b.size,
              height: b.size,
              // центрируем отступами, а не transform — его занимает анимация появления
              marginLeft: -b.size / 2,
              marginTop: -b.size / 2,
              animationDelay: `${b.delay}s`,
              boxShadow: `0 0 28px rgba(${b.glow},0.45), inset 0 1px 0 rgba(255,255,255,0.12)`,
            }}
          >
            {b.Icon ? (
              <b.Icon size={b.size > 70 ? 26 : 20} className="text-white" strokeWidth={1.75} />
            ) : (
              <span className="font-urbanist text-lg font-semibold text-white">{b.label}</span>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

/* ──────────────────────────────────────────────────────────────
   Бегущая строка каналов
   ────────────────────────────────────────────────────────────── */

const CHANNELS: { label: string; Icon: LucideIcon }[] = [
  { label: 'Telegram', Icon: Send },
  { label: 'Instagram', Icon: Instagram },
  { label: 'YouTube', Icon: Youtube },
  { label: 'TikTok', Icon: MessageCircle },
  { label: 'Свой сайт', Icon: Globe },
  { label: 'Бизнес-сообщества', Icon: Users },
]

function ChannelTicker() {
  const row = [...CHANNELS, ...CHANNELS, ...CHANNELS, ...CHANNELS]
  return (
    <div className="pp-ticker-mask overflow-hidden">
      <div className="pp-ticker flex w-max items-center gap-16">
        {row.map((c, i) => (
          <span
            key={`${c.label}-${i}`}
            className="flex items-center gap-3 whitespace-nowrap text-white/45"
          >
            <c.Icon size={22} strokeWidth={1.75} />
            <span className="text-[15px] font-medium">{c.label}</span>
          </span>
        ))}
      </div>
    </div>
  )
}

/* ──────────────────────────────────────────────────────────────
   Калькулятор дохода
   ────────────────────────────────────────────────────────────── */

const PLANS = [
  { id: 'plus', label: 'Habibi Plus', price: 49 },
  { id: 'premium', label: 'Habibi Premium', price: 199 },
] as const

function Calculator() {
  const [clients, setClients] = useState(11)
  const [planId, setPlanId] = useState<(typeof PLANS)[number]['id']>('plus')

  const plan = PLANS.find((p) => p.id === planId)!
  const rate = clients >= 11 ? 0.3 : 0.2
  const monthly = useMemo(() => clients * plan.price * rate, [clients, plan.price, rate])
  const toNextLevel = clients >= 11 ? 0 : 11 - clients

  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-md sm:p-8 md:p-10">
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        <div>
          <label className="mb-3 flex items-baseline justify-between text-sm text-white/60">
            <span>Платящих клиентов</span>
            <span className="font-urbanist text-2xl font-semibold text-white">{clients}</span>
          </label>
          <input
            type="range"
            min={1}
            max={100}
            value={clients}
            onChange={(e) => setClients(Number(e.target.value))}
            className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-white/15 accent-[#a068ff]"
            aria-label="Количество платящих клиентов"
          />
          <div className="mt-2 flex justify-between text-xs text-white/35">
            <span>1</span>
            <span>100</span>
          </div>

          <div className="mt-7 flex flex-wrap gap-2.5">
            {PLANS.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setPlanId(p.id)}
                className={`rounded-full border px-4 py-2.5 text-sm font-medium transition-colors ${
                  p.id === planId
                    ? 'border-[#a068ff] bg-[#a068ff]/15 text-white'
                    : 'border-white/12 text-white/55 hover:border-white/30 hover:text-white'
                }`}
              >
                {p.label} — €{p.price}/мес
              </button>
            ))}
          </div>

          <p className="mt-6 text-sm leading-relaxed text-white/45">
            Комиссия начисляется ежемесячно, пока клиент продолжает оплачивать подписку.
          </p>
        </div>

        <div className="flex flex-col justify-center rounded-2xl border border-white/10 bg-[#0d0720]/60 p-6 sm:p-8">
          <div className="flex items-center gap-2 text-sm text-white/50">
            <span
              className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                rate === 0.3 ? 'bg-[#a068ff] text-white' : 'bg-white/10 text-white/70'
              }`}
            >
              уровень {rate * 100}%
            </span>
            {toNextLevel > 0 && <span>ещё {toNextLevel} до уровня 30%</span>}
          </div>

          <div className="mt-4">
            <span className="font-urbanist text-5xl font-semibold leading-none text-white sm:text-6xl">
              €{eur(monthly)}
            </span>
            <span className="ml-2 text-white/50">в месяц</span>
          </div>

          <div className="mt-6 space-y-2 border-t border-white/10 pt-6 text-sm text-white/60">
            <div className="flex justify-between">
              <span>За год</span>
              <span className="font-medium text-white">€{eur(monthly * 12)}</span>
            </div>
            <div className="flex justify-between">
              <span>С одного клиента</span>
              <span className="font-medium text-white">€{eur(plan.price * rate)} / мес</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ──────────────────────────────────────────────────────────────
   Данные секций
   ────────────────────────────────────────────────────────────── */

const STEPS = [
  {
    title: 'Зарегистрируйся',
    text: 'Создай бесплатный партнёрский аккаунт и получи персональную ссылку, кабинет и статистику: переходы, регистрации, платящие клиенты, комиссия.',
  },
  {
    title: 'Поделись ссылкой',
    text: 'Разместите её в Telegram, Instagram, YouTube, TikTok, на своём сайте или отправь предпринимателю напрямую. Каждый клиент по твоей ссылке закрепляется за тобой.',
  },
  {
    title: 'Клиент начинает работать',
    text: 'Он знакомится с системой и может стартовать с бесплатного тарифа. Техподдержка и счета — на нас, тебе этим заниматься не нужно.',
  },
  {
    title: 'Клиент оплачивает подписку',
    text: 'С этого момента ты получаешь процент с каждой его оплаты — и не один раз, а пока он остаётся с Habibi.',
  },
]

const AUDIENCE: { title: string; text: string; Icon: LucideIcon }[] = [
  { title: 'Предпринимателям', text: 'Общаешься с другими владельцами бизнеса — рекомендуй Habibi и получай доход с каждой компании.', Icon: Briefcase },
  { title: 'Маркетологам', text: 'Уже работаешь с бизнесом и помогаешь компаниям расти? Добавь Habibi в свой набор инструментов.', Icon: Megaphone },
  { title: 'Бизнес-консультантам', text: 'Помогаешь выстраивать процессы — Habibi может стать частью твоего решения.', Icon: TrendingUp },
  { title: 'IT-специалистам', text: 'Настраиваешь CRM и автоматизацию? Зарабатывай не только на рекомендации, но и на внедрении.', Icon: Code },
  { title: 'Блогерам и авторам', text: 'Есть аудитория предпринимателей — расскажи ей о Habibi и получай комиссию с пришедших клиентов.', Icon: Youtube },
  { title: 'Владельцам каналов', text: 'Сделай специальное предложение для подписчиков и монетизируй рекомендации.', Icon: Send },
  { title: 'Активным пользователям', text: 'Не обязательно быть маркетологом. Знаешь предпринимателей, которым Habibi полезен, — ты уже партнёр.', Icon: Sparkles },
]

const DASHBOARD: { title: string; text: string; Icon: LucideIcon }[] = [
  { title: 'Переходы', text: 'Сколько людей перешло по твоей ссылке.', Icon: Link2 },
  { title: 'Регистрации', text: 'Сколько пользователей завели аккаунт.', Icon: Users },
  { title: 'Активные клиенты', text: 'Кто продолжает пользоваться системой.', Icon: BarChart3 },
  { title: 'Платящие клиенты', text: 'Кто перешёл на платный тариф.', Icon: CreditCard },
  { title: 'Текущий уровень', text: 'Твоя ставка: 20% или 30%.', Icon: BadgeCheck },
  { title: 'Комиссия и выплаты', text: 'Сколько заработано, выплачено и доступно к выводу.', Icon: Wallet },
]

const SERVICES: { title: string; text: string; Icon: LucideIcon }[] = [
  { title: 'Настройка Habibi', text: 'Помощь компании с первоначальной настройкой системы.', Icon: Settings },
  { title: 'Миграция данных', text: 'Перенос данных клиента из других систем.', Icon: Link2 },
  { title: 'Настройка CRM', text: 'Воронки, поля, процессы и автоматизации.', Icon: Code },
  { title: 'Обучение сотрудников', text: 'Тренинг для команды клиента.', Icon: GraduationCap },
  { title: 'Консультации', text: 'Помощь бизнесу в цифровизации процессов.', Icon: MessageCircle },
]

const RULES = [
  'Комиссия начисляется только за оплаченные подписки: регистрация и бесплатный тариф права на выплату не дают.',
  'Комиссия считается от фактически полученной Habibi оплаты. Если платёж возвращён клиенту, комиссия не выплачивается или корректируется.',
  'Один клиент закрепляется только за одним партнёром — это исключает споры при привлечении одного клиента несколькими партнёрами.',
  'Запрещён спам: массовые рассылки партнёрских ссылок и введение людей в заблуждение.',
  'Запрещена ложная реклама: нельзя обещать функции, цены или условия, которых нет в официальном предложении Habibi.',
  'Запрещено выдавать себя за Habibi: партнёр — независимый рекомендатель, а не сотрудник компании.',
  'При выявлении мошенничества Habibi вправе остановить начисление комиссий.',
]

const NOT_NEEDED = [
  'покупать товар',
  'хранить его',
  'заниматься доставкой',
  'открывать офис',
  'нанимать сотрудников',
  'заниматься техподдержкой Habibi',
]

/* ──────────────────────────────────────────────────────────────
   Страница
   ────────────────────────────────────────────────────────────── */

function SectionTag({ children }: { children: string }) {
  return (
    <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#a068ff]/30 bg-[#a068ff]/10 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-[#c9a6ff]">
      <span className="h-1.5 w-1.5 rounded-full bg-[#a068ff]" />
      {children}
    </p>
  )
}

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-urbanist text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl">
      {children}
    </h2>
  )
}

function PartnerPageContent() {
  const { open } = useContact()
  const join = () => open('Партнёрская программа Habibi')

  useEffect(() => {
    const html = document.documentElement
    const prevLang = html.getAttribute('lang') ?? 'en'
    html.setAttribute('lang', 'ru')
    document.title = 'Партнёрская программа — Habibi'
    window.scrollTo(0, 0)
    return () => {
      html.setAttribute('lang', prevLang)
      document.title = 'Habibi'
    }
  }, [])

  return (
    <div className="min-h-screen w-full bg-[#060218] font-geist text-white">
      {/* Фоновое свечение */}
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(70%_50%_at_15%_0%,rgba(160,104,255,0.18),transparent_60%),radial-gradient(60%_45%_at_85%_10%,rgba(160,104,255,0.10),transparent_65%)]" />

      <div className="relative z-10">
        {/* Шапка */}
        <header className="mx-auto flex max-w-[1920px] items-center justify-between px-6 py-6 md:px-16">
          <div className="flex items-center gap-10">
            <a href="/ru" className="flex flex-col leading-none">
              <span className="text-2xl font-semibold tracking-tight text-white">Habibi</span>
              <span className="mt-1.5 text-[10px] font-medium uppercase tracking-[0.16em] text-[#a068ff]">
                Partner
              </span>
            </a>
            <nav className="hidden items-center gap-8 md:flex">
              {[
                { label: 'Как это работает', href: '#kak' },
                { label: 'Комиссия', href: '#komissiya' },
                { label: 'Кому подходит', href: '#komu' },
                { label: 'Правила', href: '#pravila' },
              ].map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="text-[15px] text-white/70 transition-colors hover:text-white"
                >
                  {l.label}
                </a>
              ))}
            </nav>
          </div>
          <PartnerButton size="sm" onClick={join}>
            Стать партнёром
          </PartnerButton>
        </header>

        {/* Герой */}
        <section className="mx-auto flex max-w-[1920px] flex-col items-center gap-10 overflow-hidden px-6 pb-10 pt-10 md:px-16 lg:flex-row lg:items-start lg:justify-between lg:gap-6">
          <div className="w-full max-w-[620px] pt-4 [animation:fadeSlideUp_1s_cubic-bezier(0.22,1,0.36,1)_both]">
            <SectionTag>Habibi Partner</SectionTag>
            <h1 className="font-urbanist text-[34px] font-semibold leading-[1.08] tracking-tight sm:text-5xl md:text-[56px] lg:text-[64px]">
              <Typewriter
                text="Зарабатывай вместе с Habibi — рекомендуй систему и получай процент с каждой оплаты"
                headLen={30}
              />
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/60 md:text-lg">
              Есть знакомые предприниматели? Аудитория в Telegram, Instagram или YouTube? Работаешь
              с маркетингом, консалтингом или IT? Получи персональную ссылку и превращай
              рекомендации в постоянный доход.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4 [animation:fadeSlideUp_0.8s_ease_3.2s_both]">
              <PartnerButton onClick={join} fillFrom="right">
                Стать партнёром
                <ArrowRight size={18} />
              </PartnerButton>
              <a
                href="#skolko"
                className="text-[15px] text-white/60 underline-offset-4 transition-colors hover:text-white hover:underline"
              >
                Посчитать доход
              </a>
            </div>
          </div>

          <div className="w-full max-w-[720px] [animation:fadeSlideUp_1.2s_cubic-bezier(0.22,1,0.36,1)_0.3s_both] lg:w-auto">
            <div className="mx-auto flex h-[320px] items-center justify-center sm:h-[420px] md:h-[560px] lg:h-[660px] xl:h-[740px]">
              <Orbits />
            </div>
          </div>
        </section>

        {/* Каналы */}
        <section className="mx-auto max-w-[1920px] px-6 py-8 md:px-16 [animation:fadeSlideUp_0.8s_ease_0.6s_both]">
          <ChannelTicker />
        </section>

        {/* Как это работает */}
        <section id="kak" className="mx-auto max-w-6xl px-6 py-20 md:px-12 md:py-28">
          <Reveal>
            <SectionTag>Как это работает</SectionTag>
            <H2>Всё максимально просто</H2>
          </Reveal>
          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {STEPS.map((s, i) => (
              <Reveal key={s.title} delay={(i % 2) * 0.08}>
                <div className="h-full rounded-3xl border border-white/10 bg-white/[0.04] p-7 transition-colors hover:border-[#a068ff]/40">
                  <span className="font-urbanist text-5xl font-semibold text-[#a068ff]/70">
                    {i + 1}
                  </span>
                  <h3 className="mt-4 text-xl font-medium text-white">{s.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/60">{s.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Комиссия и уровни */}
        <section id="komissiya" className="mx-auto max-w-6xl px-6 py-20 md:px-12 md:py-28">
          <Reveal>
            <SectionTag>Комиссия</SectionTag>
            <H2>Твоя комиссия растёт вместе с тобой</H2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/60 md:text-lg">
              Мы платим не за регистрацию, а за реальных клиентов, которые пользуются системой.
              Поэтому комиссия — recurring: привёл клиента один раз и получаешь доход с его подписки
              регулярно.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {[
              { level: '20%', range: '1–10 платящих клиентов', note: 'Стартовый уровень — начинается с первого оплаченного клиента.' },
              { level: '30%', range: '11+ платящих клиентов', note: 'Максимальный уровень: ставка растёт сразу для всей твоей базы.' },
            ].map((t, i) => (
              <Reveal key={t.level} delay={i * 0.08}>
                <div
                  className={`h-full rounded-3xl border p-8 ${
                    i === 1
                      ? 'border-[#a068ff]/50 bg-[#a068ff]/10'
                      : 'border-white/10 bg-white/[0.04]'
                  }`}
                >
                  <span className="font-urbanist text-6xl font-semibold text-white">{t.level}</span>
                  <p className="mt-3 text-base font-medium text-white/80">{t.range}</p>
                  <p className="mt-2 text-sm leading-relaxed text-white/55">{t.note}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Калькулятор */}
        <section id="skolko" className="mx-auto max-w-6xl px-6 py-20 md:px-12 md:py-28">
          <Reveal>
            <SectionTag>Сколько можно заработать</SectionTag>
            <H2>Посчитай свой доход</H2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/60 md:text-lg">
              Подвигай ползунок и выбери тариф — расчёт учитывает переход на уровень 30% после
              одиннадцатого платящего клиента.
            </p>
          </Reveal>
          <div className="mt-12">
            <Reveal delay={0.1}>
              <Calculator />
            </Reveal>
          </div>
        </section>

        {/* Что не нужно делать */}
        <section className="mx-auto max-w-6xl px-6 py-20 md:px-12 md:py-28">
          <Reveal>
            <SectionTag>Мы платим за результат</SectionTag>
            <H2>Тебе не нужно ничего из этого</H2>
          </Reveal>
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {NOT_NEEDED.map((n, i) => (
              <Reveal key={n} delay={(i % 3) * 0.06}>
                <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4">
                  <X size={18} className="shrink-0 text-white/30" />
                  <span className="text-sm text-white/60">{n}</span>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.1}>
            <p className="mt-8 text-base leading-relaxed text-white/70 md:text-lg">
              Ты рекомендуешь продукт — <span className="text-white">Habibi занимается остальным</span>.
            </p>
          </Reveal>
        </section>

        {/* Кому подходит */}
        <section id="komu" className="mx-auto max-w-6xl px-6 py-20 md:px-12 md:py-28">
          <Reveal>
            <SectionTag>Кому подходит</SectionTag>
            <H2>Партнёром может стать почти каждый</H2>
          </Reveal>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {AUDIENCE.map((a, i) => (
              <Reveal key={a.title} delay={(i % 3) * 0.06}>
                <div className="h-full rounded-3xl border border-white/10 bg-white/[0.04] p-6 transition-colors hover:border-[#a068ff]/40">
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-[#a068ff]/30 bg-[#a068ff]/10 text-[#c9a6ff]">
                    <a.Icon size={20} strokeWidth={1.75} />
                  </div>
                  <h3 className="mb-2 text-lg font-medium text-white">{a.title}</h3>
                  <p className="text-sm leading-relaxed text-white/60">{a.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Ссылка и кабинет */}
        <section className="mx-auto max-w-6xl px-6 py-20 md:px-12 md:py-28">
          <Reveal>
            <SectionTag>Личный кабинет</SectionTag>
            <H2>Персональная ссылка и прозрачная статистика</H2>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="mt-10 flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/[0.04] p-7 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-white/50">Твоя ссылка выглядит так</p>
                <p className="mt-2 font-urbanist text-xl font-semibold text-white sm:text-2xl">
                  habibi-erp.com/ref/<span className="text-[#a068ff]">ilgiz</span>
                </p>
              </div>
              <p className="max-w-sm text-sm leading-relaxed text-white/55">
                Переход по ссылке → регистрация → клиент автоматически закрепляется за твоим
                аккаунтом. Без таблиц, ручных подсчётов и сообщений менеджеру.
              </p>
            </div>
          </Reveal>

          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {DASHBOARD.map((d, i) => (
              <Reveal key={d.title} delay={(i % 3) * 0.06}>
                <div className="h-full rounded-3xl border border-white/10 bg-white/[0.04] p-6">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white/80">
                    <d.Icon size={18} strokeWidth={1.75} />
                  </div>
                  <h3 className="mb-1.5 text-base font-medium text-white">{d.title}</h3>
                  <p className="text-sm leading-relaxed text-white/55">{d.text}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Прогресс до следующего уровня */}
          <Reveal delay={0.1}>
            <div className="mt-4 rounded-3xl border border-[#a068ff]/30 bg-[#a068ff]/[0.08] p-7">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="text-sm text-white/60">Следующий уровень всегда рядом</p>
                  <p className="mt-2 font-urbanist text-4xl font-semibold text-white">8 / 11</p>
                </div>
                <p className="text-sm text-white/70">
                  Ещё <span className="font-medium text-white">3 клиента</span> — и комиссия вырастет
                  до 30%
                </p>
              </div>
              <div className="mt-5 h-2 w-full overflow-hidden rounded-full bg-white/10">
                <div className="h-full w-[72%] rounded-full bg-[#a068ff]" />
              </div>
            </div>
          </Reveal>
        </section>

        {/* Услуги */}
        <section className="mx-auto max-w-6xl px-6 py-20 md:px-12 md:py-28">
          <Reveal>
            <SectionTag>Второй источник дохода</SectionTag>
            <H2>Зарабатывай ещё и на услугах</H2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/60 md:text-lg">
              Habibi — полноценная ERP-система, поэтому опытные партнёры могут дополнительно
              зарабатывать на внедрении: комиссия Habibi плюс собственные услуги.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s, i) => (
              <Reveal key={s.title} delay={(i % 3) * 0.06}>
                <div className="h-full rounded-3xl border border-white/10 bg-white/[0.04] p-6">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg border border-[#a068ff]/30 bg-[#a068ff]/10 text-[#c9a6ff]">
                    <s.Icon size={18} strokeWidth={1.75} />
                  </div>
                  <h3 className="mb-1.5 text-base font-medium text-white">{s.title}</h3>
                  <p className="text-sm leading-relaxed text-white/55">{s.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Выигрывают трое */}
        <section className="mx-auto max-w-6xl px-6 py-20 md:px-12 md:py-28">
          <Reveal>
            <SectionTag>Честная модель</SectionTag>
            <H2>Выигрывают все три стороны</H2>
          </Reveal>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {[
              { title: 'Клиент', text: 'Получает единое цифровое пространство: CRM и продажи, задачи, финансы, закупки, склад, производство, HR, сервис, POS, сайт и приложения.' },
              { title: 'Партнёр', text: 'Получает дополнительный источник дохода за рекомендацию продукта, который действительно помогает бизнесу.' },
              { title: 'Habibi', text: 'Получает нового пользователя и растёт вместе с партнёрами.' },
            ].map((w, i) => (
              <Reveal key={w.title} delay={i * 0.08}>
                <div className="h-full rounded-3xl border border-white/10 bg-white/[0.04] p-7">
                  <h3 className="font-urbanist text-2xl font-semibold text-white">{w.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/60">{w.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Правила и выплаты */}
        <section id="pravila" className="mx-auto max-w-6xl px-6 py-20 md:px-12 md:py-28">
          <Reveal>
            <SectionTag>Прозрачные условия</SectionTag>
            <H2>Правила программы и выплаты</H2>
          </Reveal>

          <div className="mt-12 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
            <div className="space-y-3">
              {RULES.map((r, i) => (
                <Reveal key={r} delay={(i % 4) * 0.05}>
                  <div className="flex gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#a068ff]/15 text-xs font-semibold text-[#c9a6ff]">
                      {i + 1}
                    </span>
                    <p className="text-sm leading-relaxed text-white/65">{r}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.1}>
              <div className="h-full rounded-3xl border border-white/10 bg-white/[0.04] p-7">
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-[#a068ff]/30 bg-[#a068ff]/10 text-[#c9a6ff]">
                  <ShieldCheck size={20} strokeWidth={1.75} />
                </div>
                <h3 className="text-xl font-medium text-white">Когда приходит комиссия</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/60">
                  Клиент оплатил → комиссия появилась в кабинете → прошёл период проверки → сумма
                  доступна к выводу.
                </p>
                <dl className="mt-6 space-y-3 border-t border-white/10 pt-6 text-sm">
                  {[
                    ['Минимальная выплата', '€50'],
                    ['Периодичность', '1 раз в месяц'],
                    ['Период проверки', '30 дней'],
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between gap-4">
                      <dt className="text-white/55">{k}</dt>
                      <dd className="font-medium text-white">{v}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-5 text-xs leading-relaxed text-white/40">
                  Период проверки защищает программу от возвратов и мошеннических регистраций — это
                  обычная практика SaaS-партнёрок.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Начать сегодня */}
        <section className="mx-auto max-w-6xl px-6 py-20 md:px-12 md:py-28">
          <Reveal>
            <SectionTag>Начать можно сегодня</SectionTag>
            <H2>Пять шагов до первой комиссии</H2>
          </Reveal>
          <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {[
              'Зарегистрируй партнёрский аккаунт',
              'Получи персональную ссылку',
              'Расскажи о Habibi предпринимателям',
              'Следи за результатами в кабинете',
              'Получай комиссию с оплат',
            ].map((s, i) => (
              <Reveal key={s} delay={i * 0.06}>
                <div className="h-full rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#a068ff] text-xs font-semibold text-white">
                    {i + 1}
                  </span>
                  <p className="mt-4 text-sm leading-relaxed text-white/70">{s}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Финальный призыв */}
        <section className="mx-auto max-w-6xl px-6 pb-24 pt-10 md:px-12 md:pb-32">
          <Reveal>
            <div className="relative overflow-hidden rounded-[32px] border border-[#a068ff]/30 bg-[radial-gradient(80%_120%_at_50%_0%,rgba(160,104,255,0.22),transparent_70%)] px-6 py-16 text-center md:px-16 md:py-20">
              <h2 className="mx-auto max-w-3xl font-urbanist text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl">
                Твой бизнес. Твоя аудитория. Твой дополнительный доход.
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/65 md:text-lg">
                Habibi создаёт технологию, ты создаёшь рекомендации. Вместе мы создаём новые
                возможности.
              </p>
              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <PartnerButton onClick={join} fillFrom="right">
                  Стать партнёром
                  <ArrowRight size={18} />
                </PartnerButton>
              </div>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-white/50">
                {['Бесплатное участие', 'Комиссия до 30%', 'Выплаты каждый месяц'].map((f) => (
                  <span key={f} className="flex items-center gap-2">
                    <Check size={15} className="text-[#a068ff]" strokeWidth={3} />
                    {f}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </section>

        <Footer />
      </div>
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
