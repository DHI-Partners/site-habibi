import FadeIn from '../FadeIn'
import GlassCard from '../GlassCard'

const STATS = [
  { value: '$120M', label: 'SAM — рынок ПО для недвижимости в СНГ и ЦА' },
  { value: '~$250', label: 'ARPU в месяц (подписка + внедрение $2–5k)' },
  { value: '5.5x', label: 'LTV / CAC при оттоке Churn < 5%' },
]

const TARIFFS = [
  { name: 'Free', price: '€0', note: 'воронка частных маклеров' },
  { name: 'Habibi Pro', price: '€49', note: 'агентства недвижимости' },
  { name: 'Premium', price: '€199', note: 'девелоперы и УК' },
]

/** Слайд 4 — рынок, продукт и монетизация. */
export default function MarketSlide() {
  return (
    <div className="flex flex-1 flex-col justify-center py-12">
      <FadeIn delay={200} duration={800}>
        <span className="text-sm font-medium uppercase tracking-widest text-gray-400">
          03 · Рынок и монетизация
        </span>
        <h2
          className="mt-3 max-w-3xl text-3xl font-normal md:text-4xl lg:text-5xl"
          style={{ letterSpacing: '-0.03em' }}
        >
          Растущий рынок и гибридная SaaS-модель
        </h2>
      </FadeIn>

      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {STATS.map((s, i) => (
          <FadeIn key={s.label} delay={400 + i * 120} duration={800}>
            <GlassCard className="h-full p-6">
              <div
                className="mb-2 text-4xl font-light md:text-5xl"
                style={{ letterSpacing: '-0.03em' }}
              >
                {s.value}
              </div>
              <p className="text-sm leading-relaxed text-gray-300">{s.label}</p>
            </GlassCard>
          </FadeIn>
        ))}
      </div>

      <FadeIn delay={800} duration={800}>
        <GlassCard className="mt-5 p-6">
          <div className="grid gap-6 md:grid-cols-4 md:items-center">
            {TARIFFS.map((t) => (
              <div key={t.name}>
                <div className="text-sm text-gray-400">{t.name}</div>
                <div className="text-2xl font-light">
                  {t.price}
                  <span className="text-base text-gray-400"> /мес</span>
                </div>
                <div className="text-xs text-gray-400">{t.note}</div>
              </div>
            ))}
            <div className="border-white/15 md:border-l md:pl-6">
              <div className="text-2xl font-light">350–400</div>
              <p className="text-xs text-gray-400">
                платящих компаний → $1,000,000 ARR
              </p>
            </div>
          </div>
        </GlassCard>
      </FadeIn>
    </div>
  )
}
