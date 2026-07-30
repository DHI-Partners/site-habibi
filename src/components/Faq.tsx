import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { useContact } from './ContactProvider'

interface FaqItem {
  q: string
  a: string
}

// Временные вопросы — заменим на присланные позже.
const FAQ: FaqItem[] = [
  {
    q: 'Чем Habibi отличается от обычной CRM?',
    a: 'Habibi — это не просто CRM, а единая ERP-экосистема: продажи, закупки, склад, производство, финансы, HR и сервис работают в одной системе, а не в разных программах.',
  },
  {
    q: 'Нужно ли что-то устанавливать?',
    a: 'Нет, Habibi работает в браузере. Доступ к системе — с компьютера, планшета или телефона, откуда угодно, где есть интернет.',
  },
  {
    q: 'Можно ли начать бесплатно?',
    a: 'Да, тариф Habibi бесплатный и подходит для знакомства с системой. Когда бизнес будет готов к расширению, можно перейти на Habibi+ или Premium.',
  },
  {
    q: 'Сколько сотрудников можно подключить?',
    a: 'На бесплатном тарифе — до 2 пользователей, на Habibi+ — до 5, на Habibi Premium — без ограничений по количеству пользователей.',
  },
  {
    q: 'Помогаете ли с внедрением?',
    a: 'На тарифе Premium доступно персональное сопровождение и приоритетная поддержка — специалисты помогут настроить систему под ваши процессы и внедрить её в работу.',
  },
]

export default function Faq() {
  const { open } = useContact()
  const [activeIndex, setActiveIndex] = useState<number | null>(0)

  const toggle = (i: number) => setActiveIndex((prev) => (prev === i ? null : i))

  return (
    <section
      id="faq"
      className="relative overflow-hidden bg-black px-6 py-24 md:px-12 md:py-32 lg:px-16"
    >
      {/* Мягкое свечение + края в чёрный для бесшовного стыка */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.03] blur-[130px]" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="mb-12">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-white/40">FAQ</p>
          <h2 className="max-w-2xl text-2xl font-medium leading-tight tracking-tight text-white sm:text-3xl md:text-4xl">
            Часто задаваемые вопросы
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1.4fr] lg:items-stretch">
          {/* Анимированный градиентный CTA */}
          <div
            className="c5-animated-gradient flex flex-col items-center justify-center rounded-[24px] px-8 py-14 text-center text-white"
            style={{ boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)' }}
          >
            <h3
              className="mb-3 font-medium leading-[1.1]"
              style={{ fontSize: '2.4rem', letterSpacing: '-0.03em' }}
            >
              Остались
              <br />
              вопросы?
            </h3>
            <p className="mb-7 max-w-xs text-sm font-normal opacity-90">
              Напишите нам — ответим и поможем подобрать тариф под ваш бизнес.
            </p>
            <button
              type="button"
              onClick={() => open('Habibi')}
              className="cursor-pointer rounded-xl border-none bg-neutral-900 px-8 py-3.5 text-sm font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5"
              style={{ boxShadow: '0 10px 20px rgba(0,0,0,0.35)' }}
            >
              Оставить заявку
            </button>
          </div>

          {/* Аккордеон */}
          <div className="flex flex-col justify-center gap-3">
            {FAQ.map((item, i) => {
              const active = activeIndex === i
              return (
                <div
                  key={i}
                  role="button"
                  tabIndex={0}
                  onClick={() => toggle(i)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      toggle(i)
                    }
                  }}
                  className={`cursor-pointer rounded-2xl border p-5 outline-none backdrop-blur-md transition-all duration-200 focus-visible:ring-2 focus-visible:ring-white/30 ${
                    active
                      ? 'border-white/25 bg-white/[0.06]'
                      : 'border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.05]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-sm font-medium text-white sm:text-base">{item.q}</span>
                    {active ? (
                      <ChevronUp size={20} className="shrink-0 text-white/60" />
                    ) : (
                      <ChevronDown size={20} className="shrink-0 text-white/45" />
                    )}
                  </div>
                  {active && (
                    <p className="mt-3 text-sm leading-relaxed text-white/60">{item.a}</p>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
