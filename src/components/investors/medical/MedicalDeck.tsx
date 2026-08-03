import { useEffect, useRef, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronRight, ArrowLeft } from 'lucide-react'
import Marquee from './Marquee'
import MedicalRequestModal from './MedicalRequestModal'

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260505_101331_74f9b798-3f00-4e86-8a01-377aa16ffeaa.mp4'

/* ─────────────────────────  Контент  ───────────────────────── */

const PROBLEMS = [
  {
    title: 'Разрозненность программ',
    body: 'Регистратура, склад, врачи и бухгалтерия — в разных сервисах и Excel. Собственник не видит единой картины бизнеса.',
  },
  {
    title: 'Утечка медикаментов',
    body: 'До 15% расходных материалов и препаратов теряются при некорректном списании.',
  },
  {
    title: 'Потеря пациентов',
    body: 'Без CRM-удержания пациенты не возвращаются на повторные приёмы и плановые осмотры.',
  },
]

const BENEFITS = [
  {
    metric: 'до 15%',
    title: 'Защита прибыли на складе',
    body: 'Автосписание медикаментов по технологическим картам процедур исключает перерасход и мелкое хищение.',
  },
  {
    metric: '+25%',
    title: 'Рост повторных визитов',
    body: 'Автоматические сценарии коммуникации с пациентами о повторных приёмах и результатах анализов.',
  },
  {
    metric: '1–2 дня',
    title: 'Запуск без ИТ-специалиста',
    body: 'Современный облачный интерфейс не требует штатного ИТ и долгих месяцев обучения врачей.',
  },
]

const STATS = [
  { value: '$150M', label: 'SAM — рынок ПО для коммерческих клиник и диагностических центров СНГ' },
  { value: '~$250', label: 'ARPU в месяц (подписка + внедрение $2–5k)' },
  { value: '5.5x', label: 'LTV / CAC при оттоке Churn < 5%' },
]

const TARIFFS = [
  { name: 'Free', price: '€0', note: 'частные кабинеты и врачи' },
  { name: 'Habibi+', price: '€49', note: 'средние медцентры' },
  { name: 'Premium', price: '€199', note: 'крупные клиники' },
]

const GOALS = [
  { value: '60+', label: 'клиник-клиентов' },
  { value: '$15k+', label: 'MRR (≈ $180k ARR)' },
  { value: '12–15 мес', label: 'до безубыточности' },
]

const USE_OF_FUNDS = [
  {
    pct: 45,
    amount: '$90,000',
    title: 'ФОТ R&D — разработка и продукт',
    body: 'Команда ($7,500/мес): Lead Developer, Middle Back/Front-End, UI/UX-дизайнер, QA. Модули ЭМК, автосписания со склада и аналитики.',
  },
  {
    pct: 20,
    amount: '$40,000',
    title: 'ФОТ Sales & Customer Success',
    body: 'Руководитель B2B-продаж + специалист по выездному внедрению и обучению персонала клиник в СНГ.',
  },
  {
    pct: 14,
    amount: '$28,000',
    title: 'Маркетинг и B2B LeadGen',
    body: 'Прямые B2B-продажи по базе клиник, медицинские форумы и выставки СНГ, таргетированная реклама.',
  },
  {
    pct: 8,
    amount: '$16,000',
    title: 'Юр. сопровождение и резерв',
    body: 'SAFE / Convertible Note, юридическая защита медицинских данных пациентов, операционный резерв.',
  },
  {
    pct: 7,
    amount: '$14,000',
    title: 'Инфраструктура и защищённые серверы',
    body: 'Защищённые облачные серверы с шифрованием данных пациентов по требованиям законодательств стран СНГ.',
  },
  {
    pct: 6,
    amount: '$12,000',
    title: 'ФОТ операционный',
    body: 'Аутсорсинг бухгалтерии и административное сопровождение.',
  },
]

/* ─────────────────────────  Вспомогательные  ───────────────────────── */

function Kicker({ children }: { children: ReactNode }) {
  return (
    <span className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">
      {children}
    </span>
  )
}

function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <h2 className="mt-3 max-w-3xl font-display text-3xl font-medium tracking-tight text-[#0a1b33] md:text-[44px] md:leading-[1.05]">
      {children}
    </h2>
  )
}

function Card({ children }: { children: ReactNode }) {
  return (
    <div className="h-full rounded-3xl border border-slate-200/60 bg-white p-6 shadow-[0_12px_40px_-24px_rgba(0,0,0,0.12)] md:p-7">
      {children}
    </div>
  )
}

function Section({ id, children }: { id?: string; children: ReactNode }) {
  return (
    <section id={id} className="mx-auto max-w-[1400px] px-6 py-20 md:px-16 md:py-28">
      {children}
    </section>
  )
}

/* ─────────────────────────  Дек  ───────────────────────── */

/** Светлый дек направления «Медицина» (Habibi Medical), маршрут /investors/medical. */
export default function MedicalDeck() {
  const [requestOpen, setRequestOpen] = useState(false)
  const openRequest = () => setRequestOpen(true)
  const videoRef = useRef<HTMLVideoElement | null>(null)

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    v.muted = true
    v.play().catch(() => {})
  }, [])

  return (
    <div className="min-h-screen w-full bg-[#f9fafb] font-inter text-[#0a1b33]">
      {/* ── Hero ── */}
      <div className="px-4 pt-4 md:px-8 md:pt-8">
        <div className="relative mx-auto flex h-[600px] w-full max-w-[1400px] flex-col overflow-hidden rounded-[48px] border border-slate-200/50 bg-white shadow-[0_40px_100px_-20px_rgba(0,0,0,0.03)]">
          {/* Видео-фон */}
          <div className="pointer-events-none absolute inset-0 z-0 select-none overflow-hidden">
            <video
              ref={videoRef}
              className="h-full w-full scale-105 object-cover transition-transform duration-1000"
              src={VIDEO_URL}
              autoPlay
              loop
              muted
              playsInline
            />
          </div>

          {/* Текст */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-20 flex flex-1 flex-col items-start px-8 pt-12 md:px-16 md:pt-16"
          >
            <Kicker>Habibi Medical · Pre-Seed 2026</Kicker>
            <h1 className="mt-4 font-display text-[42px] font-medium leading-[1.02] tracking-tight text-[#0a1b33] md:text-[56px]">
              Фундамент новой
              <br />
              цифровой медицины
            </h1>
            <p className="mt-5 max-w-lg font-inter text-[14px] leading-relaxed text-[#64748b] md:text-[15px]">
              Единая облачная ERP для клиник, медцентров и стоматологий: расписание врачей, ЭМК,
              складской учёт, медицинская CRM и финансы — в одном окне.
            </p>
            <motion.button
              type="button"
              onClick={openRequest}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="mt-8 rounded-full bg-[#0a152d] px-7 py-3 text-sm font-semibold text-white shadow-lg"
            >
              Запросить материалы
            </motion.button>
          </motion.div>

          {/* Плавающий нижний навбар */}
          <div className="absolute bottom-10 left-1/2 z-30 -translate-x-1/2">
            <motion.nav
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center rounded-full border border-slate-200/40 bg-white/90 px-1.5 py-1.5 shadow-[0_12px_40px_rgba(0,0,0,0.08)] backdrop-blur-2xl"
            >
              <Link
                to="/investors"
                aria-label="Направления"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-100 bg-white text-[#0a1b33] shadow-sm"
              >
                ✦
              </Link>
              <a
                href="#solution"
                className="px-3 text-[12px] font-semibold text-slate-500 transition-colors hover:text-[#0a1b33]"
              >
                Решение
              </a>
              <a
                href="#investment"
                className="px-3 text-[12px] font-semibold text-slate-500 transition-colors hover:text-[#0a1b33]"
              >
                Инвестиции
              </a>
              <button
                type="button"
                onClick={openRequest}
                className="ml-1 flex items-center gap-1 rounded-full border border-slate-200/60 bg-white px-5 py-2 text-[12px] font-semibold text-[#0a1b33] shadow-sm transition-all hover:border-slate-300"
              >
                Запросить материалы
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </motion.nav>
          </div>
        </div>
      </div>

      {/* ── Marquee модулей ── */}
      <div className="mx-auto max-w-[1400px] px-4 md:px-8">
        <Marquee />
      </div>

      {/* ── 01 · Проблема ── */}
      <Section>
        <Kicker>01 · Проблема</Kicker>
        <SectionTitle>Кризис управления в частной медицине СНГ</SectionTitle>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {PROBLEMS.map((p) => (
            <Card key={p.title}>
              <h3 className="text-lg font-semibold text-[#0a1b33]">{p.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-500">{p.body}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* ── 02 · Решение ── */}
      <Section id="solution">
        <Kicker>02 · Решение</Kicker>
        <SectionTitle>ERP-платформа Habibi Medical</SectionTitle>
        <p className="mt-5 max-w-2xl text-base text-slate-500 md:text-lg">
          Единое окно: расписание врачей, электронные медкарты, автоматический складской учёт,
          медицинская CRM и сквозная финансовая аналитика.
        </p>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {BENEFITS.map((b) => (
            <Card key={b.title}>
              <div className="font-display text-4xl font-medium tracking-tight text-[#0a1b33] md:text-5xl">
                {b.metric}
              </div>
              <h3 className="mt-3 text-lg font-semibold text-[#0a1b33]">{b.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">{b.body}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* ── 03 · Рынок ── */}
      <Section>
        <Kicker>03 · Рынок и монетизация</Kicker>
        <SectionTitle>Растущий рынок медицинского ПО</SectionTitle>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {STATS.map((s) => (
            <Card key={s.label}>
              <div className="font-display text-4xl font-medium tracking-tight text-[#0a1b33] md:text-5xl">
                {s.value}
              </div>
              <p className="mt-3 text-sm leading-relaxed text-slate-500">{s.label}</p>
            </Card>
          ))}
        </div>
        <div className="mt-5 rounded-3xl border border-slate-200/60 bg-white p-6 shadow-[0_12px_40px_-24px_rgba(0,0,0,0.12)] md:p-7">
          <div className="grid gap-6 md:grid-cols-4 md:items-center">
            {TARIFFS.map((t) => (
              <div key={t.name}>
                <div className="text-sm text-slate-400">{t.name}</div>
                <div className="font-display text-3xl font-medium text-[#0a1b33]">
                  {t.price}
                  <span className="text-base text-slate-400"> /мес</span>
                </div>
                <div className="mt-1 text-xs text-slate-400">{t.note}</div>
              </div>
            ))}
            <div className="md:border-l md:border-slate-200 md:pl-6">
              <div className="font-display text-3xl font-medium text-[#0a1b33]">350–400</div>
              <p className="mt-1 text-xs text-slate-400">клиник → $1,000,000 ARR</p>
            </div>
          </div>
        </div>
      </Section>

      {/* ── 04 · Pre-Seed ── */}
      <Section id="investment">
        <Kicker>04 · Pre-Seed Round</Kicker>
        <div className="mt-3 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <h2 className="font-display text-3xl font-medium tracking-tight text-[#0a1b33] md:text-[44px]">
            Привлекаем $200,000
          </h2>
          <div className="flex flex-wrap gap-6">
            {GOALS.map((g) => (
              <div key={g.label}>
                <div className="font-display text-3xl font-medium text-[#0a1b33]">{g.value}</div>
                <div className="text-xs text-slate-400">{g.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {USE_OF_FUNDS.map((f) => (
            <Card key={f.title}>
              <div className="flex items-baseline justify-between">
                <h3 className="pr-4 text-base font-semibold text-[#0a1b33]">{f.title}</h3>
                <span className="shrink-0 text-sm text-slate-400">{f.amount}</span>
              </div>
              <div className="mb-3 mt-3 flex items-center gap-3">
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full rounded-full bg-[#0a152d]" style={{ width: `${f.pct}%` }} />
                </div>
                <span className="text-sm font-semibold tabular-nums text-[#0a1b33]">{f.pct}%</span>
              </div>
              <p className="text-sm leading-relaxed text-slate-500">{f.body}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* ── Closing ── */}
      <Section>
        <div className="rounded-[40px] border border-slate-200/60 bg-white px-6 py-16 text-center shadow-[0_40px_100px_-40px_rgba(0,0,0,0.1)] md:px-16">
          <h2 className="mx-auto max-w-3xl font-display text-3xl font-medium tracking-tight text-[#0a1b33] md:text-5xl md:leading-[1.05]">
            Станьте партнёром Habibi Medical
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-sm text-slate-500 md:text-base">
            Запросите подробную финансовую модель в Excel, бизнес-план и презентацию проекта для
            инвесторов через форму.
          </p>
          <motion.button
            type="button"
            onClick={openRequest}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="mt-8 rounded-full bg-[#0a152d] px-8 py-3.5 text-sm font-semibold text-white shadow-lg"
          >
            Запросить материалы
          </motion.button>
          <div className="mt-6">
            <Link
              to="/investors"
              className="inline-flex items-center gap-1.5 text-sm text-slate-400 transition-colors hover:text-[#0a1b33]"
            >
              <ArrowLeft className="h-4 w-4" />
              Все направления
            </Link>
          </div>
        </div>
      </Section>

      <MedicalRequestModal open={requestOpen} onClose={() => setRequestOpen(false)} />
    </div>
  )
}
