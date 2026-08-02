import { useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, ChevronDown } from 'lucide-react'
import KaabaTawaf from './serene/KaabaTawaf'
import SereneStarfield from './serene/SereneStarfield'
import RequestMaterialsModal from './serene/RequestMaterialsModal'

/* ─────────────────────────  Контент  ───────────────────────── */

const PROBLEMS = [
  {
    title: 'Ручной учёт и путаница в списках паломников',
    body: 'Разрозненные Excel и бумага: ошибки при бронировании отелей Мекки и Медины, путаница в паспортах, визах и групповых трансферах.',
  },
  {
    title: 'Кассовые разрывы и валютные потери',
    body: 'Оплаты за отели, транспорт и визы — в SAR/USD, приём от паломников — в местных валютах. Без сквозного учёта теряется 8–12% прибыли на курсах и комиссиях.',
  },
  {
    title: 'Потеря контроля Ground Handling',
    body: 'В Саудовской Аравии гиды и логисты теряют оперативный контроль: сложно отслеживать расселение, SIM-карты, питание и трансферы в реальном времени.',
  },
]

const BENEFITS = [
  {
    metric: '×4',
    title: 'Быстрее оформление групп',
    body: 'Сканирование паспортов, генерация списков для визовых систем и групповое бронирование отелей за минуты.',
  },
  {
    metric: '8–12%',
    title: 'Защита от валютных рисков',
    body: 'Сквозной мультивалютный учёт предотвращает кассовые разрывы и фиксирует маржу с каждой поездки.',
  },
  {
    metric: '24/7',
    title: 'Контроль логистики',
    body: 'Модуль координации гидов и групп в Мекке и Медине: расселение и трансферы паломников без сбоев.',
  },
]

const STATS = [
  { value: '$180M', label: 'SAM — рынок ПО и цифровизации паломнических туроператоров в СНГ' },
  { value: '~$250', label: 'ARPU в месяц (подписка + интеграция $2–5k)' },
  { value: '5.5x', label: 'LTV / CAC при оттоке Churn < 5%' },
]

const TARIFFS = [
  { name: 'Free', price: '€0', note: 'мелкие турагентства и суб-агенты' },
  { name: 'Habibi+', price: '€49', note: 'средние туроператоры' },
  { name: 'Premium', price: '€199', note: 'крупные туроператоры' },
]

const GOALS = [
  { value: '60+', label: 'туроператоров и центров' },
  { value: '$15k+', label: 'MRR (≈ $180k ARR)' },
  { value: '12 мес', label: 'до безубыточности' },
]

const USE_OF_FUNDS = [
  {
    pct: 68,
    amount: '$102,000',
    title: 'ФОТ команды',
    body: 'R&D ($60k): модуль пакетов «Умра/Хадж», списки паломников, мультивалютный модуль (USD/SAR/местные), мобильное приложение для гидов. B2B Sales & Success ($30k). Операционный ФОТ ($12k).',
  },
  {
    pct: 14,
    amount: '$21,000',
    title: 'Маркетинг и B2B LeadGen',
    body: 'Outbound по базе туроператоров СНГ, туристические и религиозные выставки/форумы, интернет-реклама на бесплатный тариф.',
  },
  {
    pct: 10,
    amount: '$15,000',
    title: 'Юр. сопровождение и резерв',
    body: 'SAFE / Convertible Note, B2B-контракты под законодательство стран СНГ, операционный резерв.',
  },
  {
    pct: 8,
    amount: '$12,000',
    title: 'Инфраструктура и серверы',
    body: 'Облачные серверы для безопасного хранения данных паломников (паспорта, визы), защита информации, ПО разработки.',
  },
]

/* ─────────────────────────  Вспомогательные  ───────────────────────── */

function Kicker({ children }: { children: ReactNode }) {
  return (
    <span className="text-xs font-medium uppercase tracking-[0.3em] text-white/45">{children}</span>
  )
}

function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <h2 className="mt-3 max-w-3xl font-instrument text-3xl leading-tight text-white md:text-5xl">
      {children}
    </h2>
  )
}

function Card({ children }: { children: ReactNode }) {
  return <div className="serene-glass h-full rounded-3xl p-6 md:p-7">{children}</div>
}

/* ─────────────────────────  Дек  ───────────────────────── */

/** Serene-дек направления «Туризм» (Hajj & Umrah), маршрут /investors/tourism. */
export default function TourismDeck() {
  const [requestOpen, setRequestOpen] = useState(false)
  const openRequest = () => setRequestOpen(true)

  return (
    <div className="relative w-full overflow-x-hidden bg-[#0a0608] font-inter text-white">
      {/* Навбар */}
      <nav className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-6 py-5 md:px-12">
        <div className="flex items-center gap-3">
          <span className="font-dancing text-2xl text-white md:text-3xl">Habibi</span>
          <span className="hidden text-xs uppercase tracking-[0.2em] text-white/50 sm:inline">
            Hajj &amp; Umrah
          </span>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            to="/investors"
            className="serene-glass flex items-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-medium text-white transition-colors hover:text-white/80"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Направления</span>
          </Link>
          <button
            type="button"
            onClick={openRequest}
            className="button-glow rounded-full bg-white px-5 py-2.5 text-sm font-medium tracking-wide text-black transition-all duration-300 hover:bg-white/90 sm:px-6"
          >
            Запросить материалы
          </button>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative flex h-screen items-center justify-center overflow-hidden px-6 text-center">
        <KaabaTawaf className="absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0608]/40 via-transparent to-[#0a0608]/70" />
        <div className="relative z-10 -mt-10 flex flex-col items-center">
          <Kicker>Habibi Hajj &amp; Umrah · Pre-Seed 2026</Kicker>
          <h1 className="text-glow mt-5 max-w-4xl font-instrument text-4xl leading-[1.02] tracking-tight text-white md:text-7xl lg:text-[92px]">
            Хадж и Умра под полным контролем
          </h1>
          <p className="mt-6 max-w-xl text-sm text-white/70 md:text-base">
            ERP-платформа для туроператоров и паломнических центров СНГ. Конструктор туров,
            визы, брони и мультивалютный учёт — в одном окне.
          </p>
          <button
            type="button"
            onClick={openRequest}
            className="button-glow mt-8 rounded-full bg-white px-8 py-3.5 text-sm font-medium tracking-wide text-black transition-all duration-300 hover:bg-white/90"
          >
            Запросить материалы
          </button>
        </div>
        <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-white/50">
          <ChevronDown className="h-6 w-6 animate-bounce" />
        </div>
      </section>

      {/* ── Звёздное небо с падающими звёздами за контентными секциями ── */}
      <div className="relative bg-gradient-to-b from-[#0a1430] via-[#0a1022] to-[#0a0810]">
        <SereneStarfield className="pointer-events-none absolute inset-0" />
        <div className="relative z-10">
          {/* ── 01 · Проблема ── */}
          <section className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <Kicker>01 · Проблема</Kicker>
        <SectionTitle>Хаос в организации туров Хаджа и Умры</SectionTitle>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {PROBLEMS.map((p) => (
            <Card key={p.title}>
              <h3 className="text-lg font-medium text-white md:text-xl">{p.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/60">{p.body}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* ── 02 · Решение ── */}
      <section className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <Kicker>02 · Решение</Kicker>
        <SectionTitle>ERP-платформа Habibi</SectionTitle>
        <p className="mt-5 max-w-2xl text-base text-white/70 md:text-lg">
          Единое окно: конструктор туров, CRM, автоматический сбор документов на визы, учёт
          броней отелей и авиабилетов и мультивалютный финансовый учёт.
        </p>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {BENEFITS.map((b) => (
            <Card key={b.title}>
              <div className="text-glow font-instrument text-5xl text-white">{b.metric}</div>
              <h3 className="mt-3 text-lg font-medium text-white">{b.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/60">{b.body}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* ── 03 · Рынок ── */}
      <section className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <Kicker>03 · Рынок и монетизация</Kicker>
        <SectionTitle>Растущий рынок религиозного туризма</SectionTitle>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {STATS.map((s) => (
            <Card key={s.label}>
              <div className="text-glow font-instrument text-5xl text-white">{s.value}</div>
              <p className="mt-3 text-sm leading-relaxed text-white/60">{s.label}</p>
            </Card>
          ))}
        </div>
        <div className="serene-glass mt-5 rounded-3xl p-6 md:p-7">
          <div className="grid gap-6 md:grid-cols-4 md:items-center">
            {TARIFFS.map((t) => (
              <div key={t.name}>
                <div className="text-sm text-white/45">{t.name}</div>
                <div className="font-instrument text-3xl text-white">
                  {t.price}
                  <span className="text-base text-white/45"> /мес</span>
                </div>
                <div className="mt-1 text-xs text-white/45">{t.note}</div>
              </div>
            ))}
            <div className="md:border-l md:border-white/10 md:pl-6">
              <div className="font-instrument text-3xl text-white">350–400</div>
              <p className="mt-1 text-xs text-white/45">организаций → $1,000,000 ARR</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 04 · Pre-Seed ── */}
      <section className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <Kicker>04 · Pre-Seed Round</Kicker>
        <div className="mt-3 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <h2 className="font-instrument text-3xl text-white md:text-5xl">
            Привлекаем <span className="text-glow">$150,000</span>
          </h2>
          <div className="flex flex-wrap gap-6">
            {GOALS.map((g) => (
              <div key={g.label}>
                <div className="font-instrument text-3xl text-white">{g.value}</div>
                <div className="text-xs text-white/45">{g.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {USE_OF_FUNDS.map((f) => (
            <Card key={f.title}>
              <div className="flex items-baseline justify-between">
                <h3 className="text-lg font-medium text-white">{f.title}</h3>
                <span className="text-sm text-white/45">{f.amount}</span>
              </div>
              <div className="mb-3 mt-3 flex items-center gap-3">
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full rounded-full bg-white" style={{ width: `${f.pct}%` }} />
                </div>
                <span className="text-sm font-medium tabular-nums text-white">{f.pct}%</span>
              </div>
              <p className="text-sm leading-relaxed text-white/60">{f.body}</p>
            </Card>
          ))}
        </div>
      </section>

        </div>
      </div>

      {/* ── Closing ── */}
      <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden px-6 py-24 text-center">
        <KaabaTawaf className="absolute inset-0" />
        <div className="absolute inset-0 bg-[#0a0608]/55" />
        <div className="relative z-10 flex flex-col items-center">
          <h2 className="text-glow max-w-3xl font-instrument text-4xl leading-tight text-white md:text-6xl">
            Станьте партнёром Habibi Hajj &amp; Umrah
          </h2>
          <p className="mt-5 max-w-xl text-sm text-white/70 md:text-base">
            Запросите подробную финансовую модель в Excel, бизнес-план и презентацию проекта
            для инвесторов через форму.
          </p>
          <button
            type="button"
            onClick={openRequest}
            className="button-glow mt-8 rounded-full bg-white px-8 py-3.5 text-sm font-medium tracking-wide text-black transition-all duration-300 hover:bg-white/90"
          >
            Запросить материалы
          </button>
          <Link
            to="/investors"
            className="mt-6 text-sm text-white/50 underline-offset-4 transition-colors hover:text-white hover:underline"
          >
            ← Все направления
          </Link>
        </div>
      </section>

      <RequestMaterialsModal open={requestOpen} onClose={() => setRequestOpen(false)} />
    </div>
  )
}
