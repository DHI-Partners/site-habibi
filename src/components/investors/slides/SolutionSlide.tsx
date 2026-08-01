import FadeIn from '../FadeIn'
import GlassCard from '../GlassCard'

const BENEFITS = [
  {
    metric: '×3',
    title: 'Быстрее запуск',
    body: 'Готовая отраслевая специфика — внедрение за 2–3 месяца вместо года.',
  },
  {
    metric: 'до 10%',
    title: 'Защита маржи на стройке',
    body: 'Сквозной контроль смет и актов КС-2 / КС-3 сохраняет маржинальность объектов.',
  },
  {
    metric: '+12%',
    title: 'Рост дохода (NOI)',
    body: 'Автоматизация учёта аренды, индексации и коммуникации с арендаторами.',
  },
]

/** Слайд 3 — решение (ERP-платформа Habibi). */
export default function SolutionSlide() {
  return (
    <div className="flex flex-1 flex-col justify-center py-12">
      <FadeIn delay={200} duration={800}>
        <span className="text-sm font-medium uppercase tracking-widest text-gray-400">
          02 · Решение
        </span>
        <h2
          className="mt-3 max-w-3xl text-3xl font-normal md:text-4xl lg:text-5xl"
          style={{ letterSpacing: '-0.03em' }}
        >
          ERP-платформа Habibi
        </h2>
        <p className="mt-4 max-w-2xl text-base text-gray-300 md:text-lg">
          Единое окно для застройщиков, девелоперов, агентств и УК: бронирование
          объектов, реестр аренды, бюджетирование строек и сквозной финансовый
          учёт.
        </p>
      </FadeIn>

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {BENEFITS.map((b, i) => (
          <FadeIn key={b.title} delay={500 + i * 150} duration={800}>
            <GlassCard className="h-full p-6">
              <div
                className="mb-2 text-4xl font-light md:text-5xl"
                style={{ letterSpacing: '-0.03em' }}
              >
                {b.metric}
              </div>
              <h3 className="mb-2 text-lg font-medium">{b.title}</h3>
              <p className="text-sm leading-relaxed text-gray-300">{b.body}</p>
            </GlassCard>
          </FadeIn>
        ))}
      </div>
    </div>
  )
}
