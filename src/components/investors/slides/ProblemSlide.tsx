import FadeIn from '../FadeIn'
import GlassCard from '../GlassCard'

const PROBLEMS = [
  {
    title: 'Хаос в учёте и кассовые разрывы',
    body: 'До 5–7 разрозненных программ и таблиц Excel. Сметы «плывут», а отклонения от бюджета и скрытые убытки всплывают только на финальной сдаче объектов.',
  },
  {
    title: 'Дорогие и громоздкие системы',
    body: 'Классические ERP требуют 9–12 месяцев на внедрение и миллионных бюджетов на консалтинг, оставаясь сложными для рядовых сотрудников.',
  },
  {
    title: 'Потери в управлении арендой',
    body: 'УК упускают до 10–15% дохода из-за ручного учёта договоров, несвоевременной индексации ставок, ошибок в расчёте ЖКУ и простоя площадей.',
  },
]

/** Слайд 2 — проблема рынка. */
export default function ProblemSlide() {
  return (
    <div className="flex flex-1 flex-col justify-center py-12">
      <FadeIn delay={200} duration={800}>
        <span className="text-sm font-medium uppercase tracking-widest text-gray-400">
          01 · Проблема
        </span>
        <h2
          className="mt-3 max-w-3xl text-3xl font-normal md:text-4xl lg:text-5xl"
          style={{ letterSpacing: '-0.03em' }}
        >
          Системный кризис управления в девелопменте
        </h2>
      </FadeIn>

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {PROBLEMS.map((p, i) => (
          <FadeIn key={p.title} delay={400 + i * 150} duration={800}>
            <GlassCard className="h-full p-6">
              <h3 className="mb-3 text-lg font-medium md:text-xl">{p.title}</h3>
              <p className="text-sm leading-relaxed text-gray-300">{p.body}</p>
            </GlassCard>
          </FadeIn>
        ))}
      </div>
    </div>
  )
}
