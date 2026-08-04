import { useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowLeft,
  Satellite,
  FileText,
  PieChart,
  Coins,
  Server,
  Megaphone,
  Scale,
  Users,
  Code2,
} from 'lucide-react'
import LogisticsHero from './LogisticsHero'
import LogisticsCargoBackground from './LogisticsCargoBackground'
import LogisticsRequestModal from './LogisticsRequestModal'

const TEAL = 'text-[#0E3A44]'

/* ─────────────────────────  Контент  ───────────────────────── */

const MARKET = [
  { label: 'TAM', value: '$12B+', desc: 'Общий объём рынка B2B-логистики и автопарков СНГ.' },
  { label: 'SAM', value: '$1.2B', desc: 'Рынок автоматизации и ERP для коммерческих автопарков.' },
  { label: 'SOM', value: '$15M', desc: 'Достижимо: малые и средние ТК (3–50 машин) за 3 года.' },
]

const MODULES = [
  {
    icon: Satellite,
    title: 'GPS & Telematics',
    body: 'Прямой интеграционный шлюз с датчиками уровня топлива (ДУТ) и трекерами.',
  },
  {
    icon: FileText,
    title: 'TMS & Docs',
    body: 'Автоматическая генерация путевых листов, CMR и таможенных документов.',
  },
  {
    icon: PieChart,
    title: 'Financial P&L',
    body: 'Сквозная аналитика чистой прибыли каждого рейса, машины и водителя.',
  },
  {
    icon: Coins,
    title: 'Мультивалютный учёт',
    body: 'Автоматический пересчёт валют для трансграничных перевозок в СНГ.',
  },
]

const METRICS = [
  ['ARPU (средний чек)', '$250 / мес', 'SaaS-подписка (€49/€199) + внедрение/онбординг'],
  ['LTV (ценность клиента)', '$9,000', 'На 36 месяцев работы (Churn < 5% в год)'],
  ['CAC (стоимость привлечения)', '$1,640', 'Маркетинг + выездной онбординг + монтаж GPS'],
  ['LTV / CAC', '5.5x', 'Высокая эффективность B2B SaaS (бенчмарк > 3.0x)'],
  ['Payback Period', '6.5 мес', 'Полная окупаемость привлечения 1 автопарка'],
]

const FORECAST = [
  { value: '$15,050', label: 'MRR на 12-й месяц' },
  { value: '$180,600', label: 'ARR (run rate M12)' },
  { value: '70', label: 'платящих автопарков / ТК' },
  { value: 'Месяц 10', label: 'точка безубыточности' },
  { value: '15 мес', label: 'runway (остаток $115,800+)' },
]

const USE_OF_FUNDS = [
  {
    pct: 45,
    amount: '$90,000',
    icon: Code2,
    title: 'R&D и разработка',
    body: 'Усиление команды: Lead Dev, Back/Front, Telematics Engineer, QA.',
  },
  {
    pct: 20,
    amount: '$40,000',
    icon: Users,
    title: 'Sales & Customer Success',
    body: 'Выездные специалисты по GPS-онбордингу и команда B2B-продаж.',
  },
  {
    pct: 14,
    amount: '$28,000',
    icon: Megaphone,
    title: 'B2B Маркетинг & LeadGen',
    body: 'Прямые продажи в автопарки, профильные логистические форумы СНГ.',
  },
  {
    pct: 8,
    amount: '$16,000',
    icon: Scale,
    title: 'Legal & Structure',
    body: 'Оформление раунда (SAFE / Convertible Note), международное право.',
  },
  {
    pct: 7,
    amount: '$14,000',
    icon: Server,
    title: 'Инфраструктура',
    body: 'Облачные серверы для высоконагруженного шлюза GPS-данных и картографии.',
  },
  {
    pct: 6,
    amount: '$12,000',
    icon: PieChart,
    title: 'Operations',
    body: 'Бухгалтерия, налоговый и финансовый учёт.',
  },
]

/* ─────────────────────────  Вспомогательные  ───────────────────────── */

function Kicker({ children }: { children: ReactNode }) {
  return (
    <span className="text-xs font-semibold uppercase tracking-[0.28em] text-[#0E3A44]/50">
      {children}
    </span>
  )
}

function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <h2 className={`mt-3 max-w-3xl font-display text-3xl font-bold tracking-tight md:text-[42px] md:leading-[1.05] ${TEAL}`}>
      {children}
    </h2>
  )
}

/** Ключевая фраза с золотым маркером-подсветкой (как выделение маркером). */
function Mark({ children }: { children: ReactNode }) {
  return (
    <span
      className="px-0.5 font-bold text-[#0E3A44]"
      style={{
        background:
          'linear-gradient(transparent 58%, rgba(255,198,26,0.55) 58%, rgba(255,198,26,0.55) 92%, transparent 92%)',
      }}
    >
      {children}
    </span>
  )
}

function Card({ children }: { children: ReactNode }) {
  return (
    <div className="h-full rounded-3xl border border-[#0E3A44]/10 bg-white p-6 shadow-[0_16px_40px_-24px_rgba(14,58,68,0.25)] md:p-7">
      {children}
    </div>
  )
}

function Section({ id, children }: { id?: string; children: ReactNode }) {
  return (
    <section id={id} className="mx-auto max-w-[1400px] px-6 py-20 md:px-12 md:py-24">
      {children}
    </section>
  )
}

function IconChip({ icon: Icon, delay = 0 }: { icon: typeof Satellite; delay?: number }) {
  return (
    <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FFC61A]/20 text-[#0E3A44]">
      {/* Пульсирующее кольцо-«пинг» */}
      <span
        className="absolute inset-0 rounded-2xl bg-[#FFC61A]/40"
        style={{ animation: `logiChipPulse 2.6s ease-out ${delay}s infinite` }}
      />
      <Icon
        className="relative h-5 w-5"
        style={{ animation: `logiIconFloat 3s ease-in-out ${delay}s infinite` }}
      />
    </div>
  )
}

/* ─────────────────────────  Дек  ───────────────────────── */

/** Дек направления «Логистика» (Habibi Logistics), маршрут /investors/logistics. */
export default function LogisticsDeck() {
  const [requestOpen, setRequestOpen] = useState(false)
  const openRequest = () => setRequestOpen(true)

  return (
    <div className={`min-h-screen w-full bg-[#FBF7F0] font-inter ${TEAL}`}>
      {/* Навбар */}
      <nav className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-6 py-4 md:px-12">
        <div className="flex items-center gap-3 rounded-full bg-white/80 px-4 py-2 shadow-sm backdrop-blur">
          <span className="font-geist text-lg font-semibold tracking-tight text-[#0E3A44]">Habibi</span>
          <span className="text-xs uppercase tracking-[0.15em] text-[#0E3A44]/50">Logistics</span>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            to="/investors"
            className="flex items-center gap-1.5 rounded-full bg-white/80 px-4 py-2.5 text-sm font-medium text-[#0E3A44] shadow-sm backdrop-blur transition-colors hover:bg-white"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Направления</span>
          </Link>
          <button
            type="button"
            onClick={openRequest}
            className="rounded-full bg-[#FFC61A] px-5 py-2.5 text-sm font-semibold text-[#0E3A44] shadow-sm transition-transform hover:scale-[1.03] sm:px-6"
          >
            Запросить материалы
          </button>
        </div>
      </nav>

      <LogisticsHero onRequest={openRequest} />

      {/* ── Фон с падающими грузами за секциями 01–05 ── */}
      <div className="relative">
        <LogisticsCargoBackground className="pointer-events-none absolute inset-0 z-0" />
        <div className="relative z-10">
      {/* ── 01 · Проблема и рынок ── */}
      <Section>
        <Kicker>01 · Проблема и рынок</Kicker>
        <SectionTitle>Огромный недоавтоматизированный рынок B2B-логистики СНГ</SectionTitle>
        <div className="mt-6 max-w-3xl rounded-r-xl border-l-[3px] border-[#FFC61A] bg-gradient-to-r from-[#FFC61A]/12 to-transparent py-4 pl-5 pr-4 shadow-[0_10px_30px_-20px_rgba(255,198,26,0.6)]">
          <p className="text-base leading-relaxed text-[#0E3A44]/80 md:text-lg">
            Малый и средний логистический бизнес использует 3–4 разрозненных сервиса (отдельно GPS,
            Excel, TMS), переплачивая от <Mark>$350/мес</Mark> и теряя до <Mark>20% маржи</Mark> на
            сливах топлива и простоях.
          </p>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {MARKET.map((m) => (
            <Card key={m.label}>
              <span className="text-xs font-bold uppercase tracking-widest text-[#b8860b]">{m.label}</span>
              <div className={`mt-2 font-display text-4xl font-bold tracking-tight md:text-5xl ${TEAL}`}>
                {m.value}
              </div>
              <p className="mt-3 text-sm leading-relaxed text-[#0E3A44]/60">{m.desc}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* ── 02 · Продукт ── */}
      <Section id="product">
        <Kicker>02 · Продукт и экосистема</Kicker>
        <SectionTitle>Единая операционная система для автопарков</SectionTitle>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {MODULES.map((m, i) => (
            <Card key={m.title}>
              <div className="flex items-start gap-4">
                <IconChip icon={m.icon} delay={i * 0.4} />
                <div>
                  <h3 className="text-lg font-bold text-[#0E3A44]">{m.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-[#0E3A44]/60">{m.body}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* ── 03 · Юнит-экономика ── */}
      <Section>
        <Kicker>03 · Юнит-экономика</Kicker>
        <SectionTitle>Высокий LTV и быстрая окупаемость</SectionTitle>
        <div className="mt-10 overflow-hidden rounded-3xl border border-[#0E3A44]/10 bg-white shadow-[0_16px_40px_-24px_rgba(14,58,68,0.25)]">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] text-left">
              <thead>
                <tr className="bg-[#0E3A44] text-white">
                  <th className="px-6 py-4 text-sm font-semibold">Метрика</th>
                  <th className="px-6 py-4 text-sm font-semibold">Значение</th>
                  <th className="px-6 py-4 text-sm font-semibold">Комментарий</th>
                </tr>
              </thead>
              <tbody>
                {METRICS.map(([metric, value, comment], i) => (
                  <tr key={metric} className={i % 2 ? 'bg-[#FBF7F0]' : 'bg-white'}>
                    <td className="px-6 py-4 text-sm font-medium text-[#0E3A44]">{metric}</td>
                    <td className="px-6 py-4 text-sm font-bold text-[#b8860b]">{value}</td>
                    <td className="px-6 py-4 text-sm text-[#0E3A44]/60">{comment}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Section>

      {/* ── 04 · Финансовые цели ── */}
      <Section>
        <Kicker>04 · Финансовые цели · 12 месяцев</Kicker>
        <SectionTitle>Ориентиры на средства раунда</SectionTitle>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FORECAST.map((f) => (
            <Card key={f.label}>
              <div className={`font-display text-3xl font-bold tracking-tight md:text-4xl ${TEAL}`}>
                {f.value}
              </div>
              <p className="mt-2 text-sm text-[#0E3A44]/60">{f.label}</p>
            </Card>
          ))}
          <div className="flex h-full flex-col justify-center rounded-3xl bg-[#0E3A44] p-6 text-white shadow-[0_16px_40px_-24px_rgba(14,58,68,0.4)] md:p-7">
            <div className="font-display text-3xl font-bold text-[#FFC61A] md:text-4xl">$200,000</div>
            <p className="mt-2 text-sm text-white/70">Pre-Seed раунд за 10% доли компании</p>
          </div>
        </div>
      </Section>

      {/* ── 05 · Использование инвестиций ── */}
      <Section id="funds">
        <Kicker>05 · Использование инвестиций</Kicker>
        <SectionTitle>Куда пойдут $200,000</SectionTitle>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {USE_OF_FUNDS.map((f, i) => (
            <Card key={f.title}>
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <IconChip icon={f.icon} delay={i * 0.3} />
                  <h3 className="text-base font-bold text-[#0E3A44]">{f.title}</h3>
                </div>
                <span className="shrink-0 text-sm font-semibold text-[#b8860b]">{f.amount}</span>
              </div>
              <div className="mb-3 mt-4 flex items-center gap-3">
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-[#0E3A44]/10">
                  <div className="h-full rounded-full bg-[#FFC61A]" style={{ width: `${f.pct}%` }} />
                </div>
                <span className="text-sm font-bold tabular-nums text-[#0E3A44]">{f.pct}%</span>
              </div>
              <p className="text-sm leading-relaxed text-[#0E3A44]/60">{f.body}</p>
            </Card>
          ))}
        </div>
      </Section>

        </div>
      </div>

      {/* ── 06 · CTA ── */}
      <Section>
        <div className="relative overflow-hidden rounded-[40px] bg-[#0E3A44] px-6 py-16 text-center shadow-[0_40px_100px_-40px_rgba(14,58,68,0.6)] md:px-16">
          <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-[#FFC61A]/15 blur-2xl" />
          <h2 className="relative mx-auto max-w-2xl font-display text-3xl font-bold tracking-tight text-white md:text-5xl md:leading-[1.05]">
            Готовы обсудить участие в Pre-Seed раунде?
          </h2>
          <p className="relative mx-auto mt-5 max-w-xl text-sm text-white/70 md:text-base">
            Оставьте имя и email — вышлем Pitch Deck (PDF) и подробную финансовую модель (Excel).
          </p>
          <button
            type="button"
            onClick={openRequest}
            className="relative mt-8 rounded-full bg-[#FFC61A] px-8 py-3.5 text-sm font-semibold text-[#0E3A44] shadow-lg transition-transform hover:scale-[1.04]"
          >
            Скачать фин модель
          </button>
          <div className="relative mt-6">
            <Link
              to="/investors"
              className="inline-flex items-center gap-1.5 text-sm text-white/50 transition-colors hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Все направления
            </Link>
          </div>
        </div>
      </Section>

      <LogisticsRequestModal open={requestOpen} onClose={() => setRequestOpen(false)} />
    </div>
  )
}
