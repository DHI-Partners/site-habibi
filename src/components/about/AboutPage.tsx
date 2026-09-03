import { useEffect } from 'react'
import { ArrowLeft } from 'lucide-react'
import { Reveal } from '../Reveal'
import DigitalHeart from '../DigitalHeart'
import { CARD, SectionTag } from '../partner/ui'
import TeamAvatar from '../consulting/TeamAvatar'
import { LiquidButton } from '../ui/liquid-glass-button'
import { useContact } from '../ContactProvider'
import { RU_TEAM } from './data'
import AiChatWidget from '../AiChatWidget'

const FOOTER_LINKS = [
  { label: 'Возможности', href: '/ru#vozmozhnosti' },
  { label: 'Модули', href: '/ru#moduli' },
  { label: 'Тарифы', href: '/ru#tarify' },
  { label: 'Партнёрам', href: '/ru/partners' },
  { label: 'Инвесторам', href: '/investors' },
]

/**
 * Страница «О нас» (/ru/about) — команда Habibi.
 * Вёрстка повторяет стиль страницы Habibi Consulting: тот же тёмный фон,
 * SectionTag, CARD и TeamAvatar, чтобы страница ощущалась частью одного сайта.
 */
export default function AboutPage() {
  const { open } = useContact()

  useEffect(() => {
    const html = document.documentElement
    const prevLang = html.getAttribute('lang') ?? 'en'
    html.setAttribute('lang', 'ru')
    document.title = 'О нас — команда Habibi'
    window.scrollTo(0, 0)
    return () => {
      html.setAttribute('lang', prevLang)
      document.title = 'Habibi — the digital ecosystem for your business'
    }
  }, [])

  return (
    <div dir="ltr" className="min-h-screen w-full bg-black font-geist text-white">
      {/* Шапка */}
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 pt-8 md:px-12">
        <a
          href="/ru"
          className="inline-flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-white"
        >
          <ArrowLeft size={16} />
          На главную
        </a>
        <span className="flex items-center gap-2 text-lg font-semibold tracking-tight text-white">
          Habibi
          <DigitalHeart className="heart-beat h-[13px] w-auto text-emerald-400" />
        </span>
      </header>

      {/* Заголовок */}
      <section className="mx-auto max-w-6xl px-6 pb-10 pt-14 md:px-12 md:pt-20">
        <Reveal>
          <SectionTag divider={false}>О нас</SectionTag>
          <h1 className="max-w-3xl text-3xl font-medium leading-[1.1] tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
            Команда, которая строит Habibi
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">
            Habibi делает небольшая команда с опытом в бизнесе, ИТ-архитектуре и продуктовой
            разработке — от автоматизации собственных компаний до сложных корпоративных систем.
          </p>
        </Reveal>
      </section>

      {/* Команда */}
      <section className="mx-auto max-w-6xl px-6 py-10 md:px-12 md:py-16">
        <div className="grid gap-5 md:grid-cols-2">
          {RU_TEAM.map((member, i) => (
            <Reveal key={member.name} delay={(i % 2) * 0.08}>
              {member.placeholder ? (
                <div className="flex h-full flex-col items-start gap-5 rounded-2xl border border-dashed border-white/15 bg-white/[0.02] p-6 sm:flex-row">
                  <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl border border-dashed border-white/15 text-2xl text-white/25 sm:h-28 sm:w-28">
                    +
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white/70">{member.name}</h3>
                    <p className="mt-1 text-sm text-white/40">{member.role}</p>
                  </div>
                </div>
              ) : (
                <div className={`${CARD} h-full`}>
                  <div className="flex flex-col gap-5 sm:flex-row">
                    <TeamAvatar
                      src={member.photo}
                      initials={member.initials ?? ''}
                      alt={member.name}
                    />
                    <div className="min-w-0">
                      <h3 className="text-xl font-medium">{member.name}</h3>
                      <p className="mt-1 text-sm font-medium text-emerald-300">{member.role}</p>
                      {member.bio?.map((paragraph) => (
                        <p
                          key={paragraph}
                          className="mt-3 text-sm leading-relaxed text-white/65 md:text-[15px]"
                        >
                          {paragraph}
                        </p>
                      ))}
                      {member.facts && member.facts.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {member.facts.map((fact) => (
                            <span
                              key={fact}
                              className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs text-white/70"
                            >
                              {fact}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-6 py-16 md:px-12 md:py-20">
        <Reveal>
          <div className={`${CARD} flex flex-col gap-5 md:flex-row md:items-center md:justify-between`}>
            <div>
              <h2 className="text-xl font-medium tracking-tight sm:text-2xl">
                Хотите обсудить свой бизнес с командой?
              </h2>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/65 md:text-[15px]">
                Расскажите, что нужно автоматизировать — подберём подходящий формат работы.
              </p>
            </div>
            <LiquidButton
              size="lg"
              onClick={() => open('Habibi')}
              className="w-fit shrink-0 rounded-full text-white"
            >
              Связаться с нами
            </LiquidButton>
          </div>
        </Reveal>
      </section>

      {/* Подвал */}
      <footer className="border-t border-white/10 bg-black px-6 py-14 md:px-12 lg:px-16">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <a
              href="/ru"
              className="flex items-center gap-2 text-lg font-semibold tracking-tight text-white"
            >
              Habibi
              <DigitalHeart className="h-[13px] w-auto text-emerald-400" />
            </a>
            <p className="mt-3 text-sm leading-relaxed text-white/50">
              Цифровая экосистема для вашего бизнеса. Больше контроля, меньше рутины, рост
              показателей.
            </p>
          </div>
          <nav className="flex flex-col gap-3">
            {FOOTER_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-white/60 transition-colors hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </footer>

      <AiChatWidget />
    </div>
  )
}
