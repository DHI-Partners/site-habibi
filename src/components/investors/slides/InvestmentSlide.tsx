import FadeIn from '../FadeIn'
import GlassCard from '../GlassCard'

const GOALS = [
  { value: '60+', label: 'компаний-клиентов' },
  { value: '$15k+', label: 'MRR (≈ $180k ARR)' },
  { value: '12 мес', label: 'до безубыточности' },
]

const USE_OF_FUNDS = [
  {
    pct: 68,
    amount: '$102,000',
    title: 'ФОТ команды',
    body: 'R&D-разработка ($60k), B2B Sales & Success ($30k), операционный ФОТ — бухгалтерия и юр. администрирование ($12k).',
  },
  {
    pct: 14,
    amount: '$21,000',
    title: 'Маркетинг и B2B LeadGen',
    body: 'Прямые B2B-обращения к застройщикам СНГ, отраслевые выставки и форумы, интернет-реклама на бесплатный тариф.',
  },
  {
    pct: 10,
    amount: '$15,000',
    title: 'Юр. сопровождение и резерв',
    body: 'Сделка через SAFE / Convertible Note, типовые B2B-контракты под СНГ, операционный резерв.',
  },
  {
    pct: 8,
    amount: '$12,000',
    title: 'Инфраструктура и серверы',
    body: 'Облачные серверы под сметы и тяжёлую документацию клиентов, рабочее ПО и инструменты разработки.',
  },
]

/** Слайд 5 — инвестиционное предложение (Pre-Seed). */
export default function InvestmentSlide() {
  return (
    <div className="flex flex-1 flex-col justify-center py-12">
      <FadeIn delay={200} duration={800}>
        <span className="text-sm font-medium uppercase tracking-widest text-gray-400">
          04 · Pre-Seed Round
        </span>
        <div className="mt-3 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <h2
            className="text-3xl font-normal md:text-4xl lg:text-5xl"
            style={{ letterSpacing: '-0.03em' }}
          >
            Привлекаем{' '}
            <span className="font-light">$150,000</span> за 10% доли компании
          </h2>
          <div className="flex flex-wrap gap-6">
            {GOALS.map((g) => (
              <div key={g.label}>
                <div className="text-2xl font-light md:text-3xl">{g.value}</div>
                <div className="text-xs text-gray-400">{g.label}</div>
              </div>
            ))}
          </div>
        </div>
      </FadeIn>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {USE_OF_FUNDS.map((f, i) => (
          <FadeIn key={f.title} delay={500 + i * 120} duration={800}>
            <GlassCard className="h-full p-5">
              <div className="mb-1 flex items-baseline justify-between">
                <h3 className="text-lg font-medium">{f.title}</h3>
                <span className="text-sm text-gray-400">{f.amount}</span>
              </div>
              <div className="mb-3 flex items-center gap-3">
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/15">
                  <div
                    className="h-full rounded-full bg-white"
                    style={{ width: `${f.pct}%` }}
                  />
                </div>
                <span className="text-sm font-medium tabular-nums">{f.pct}%</span>
              </div>
              <p className="text-sm leading-relaxed text-gray-300">{f.body}</p>
            </GlassCard>
          </FadeIn>
        ))}
      </div>
    </div>
  )
}
