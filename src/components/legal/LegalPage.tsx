import { useEffect } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Reveal } from '../Reveal'
import DigitalHeart from '../DigitalHeart'
import { CARD, card } from '../partner/ui'
import type { LegalContent } from './types'

/**
 * Правовая страница (политика конфиденциальности). Вёрстка одна на все языки,
 * различается только контентом и направлением текста.
 */
export default function LegalPage({ content }: { content: LegalContent }) {
  const { dir, lang, Chat } = content
  const rtl = dir === 'rtl'
  const BackIcon = rtl ? ArrowRight : ArrowLeft

  useEffect(() => {
    const html = document.documentElement
    const prevLang = html.getAttribute('lang') ?? 'en'
    const prevDir = html.getAttribute('dir') ?? 'ltr'
    html.setAttribute('lang', lang)
    html.setAttribute('dir', dir)
    document.title = content.docTitle
    window.scrollTo(0, 0)
    return () => {
      html.setAttribute('lang', prevLang)
      html.setAttribute('dir', prevDir)
      document.title = 'Habibi — the digital ecosystem for your business'
    }
  }, [content, lang, dir])

  return (
    <div
      dir={dir}
      className={`min-h-screen w-full bg-black text-white ${rtl ? 'font-arabic' : 'font-geist'}`}
    >
      {/* Шапка */}
      <header className="mx-auto flex max-w-4xl items-center justify-between px-6 pt-8 md:px-12">
        <a
          href={content.home}
          className="inline-flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-white"
        >
          <BackIcon size={16} />
          {content.backHome}
        </a>
        <span className="flex items-center gap-2 text-lg font-semibold tracking-tight text-white">
          Habibi
          <DigitalHeart className="heart-beat h-[13px] w-auto text-emerald-400" />
        </span>
      </header>

      {/* Заголовок */}
      <section className="mx-auto max-w-4xl px-6 pb-10 pt-14 md:px-12 md:pt-20">
        <Reveal>
          <h1 className="text-3xl font-medium leading-tight tracking-tight sm:text-4xl md:text-5xl">
            {content.title}
          </h1>
          <p className="mt-4 text-sm text-white/45">
            {content.updatedLabel}: {content.updated}
          </p>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-white/70 md:text-lg">
            {content.intro}
          </p>
        </Reveal>
      </section>

      {/* Разделы */}
      <section className="mx-auto max-w-4xl px-6 pb-16 md:px-12">
        <div className="space-y-8">
          {content.sections.map((section) => (
            <Reveal key={section.title}>
              <article className={`${CARD} scroll-mt-24`}>
                <h2 className="text-lg font-medium tracking-tight sm:text-xl">{section.title}</h2>

                {section.body?.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="mt-3 text-sm leading-relaxed text-white/65 md:text-[15px]"
                  >
                    {paragraph}
                  </p>
                ))}

                {section.bullets && (
                  <ul className="mt-4 space-y-2.5">
                    {section.bullets.map((item) => (
                      <li
                        key={item}
                        className="flex gap-3 text-sm leading-relaxed text-white/65 md:text-[15px]"
                      >
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400/80" />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}

                {section.table && (
                  <div className="mt-5 overflow-x-auto">
                    <table className="w-full min-w-[560px] border-collapse text-start">
                      <thead>
                        <tr>
                          {section.table.head.map((h) => (
                            <th
                              key={h}
                              className="border-b border-white/12 pb-3 text-start text-xs font-medium uppercase tracking-wider text-white/45"
                            >
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {section.table.rows.map((row) => (
                          <tr key={row[0]} className="align-top">
                            {row.map((cell, i) => (
                              <td
                                key={cell}
                                className={`border-b border-white/[0.07] py-3.5 pe-5 text-sm leading-relaxed ${
                                  i === 0 ? 'font-medium text-white/85' : 'text-white/60'
                                }`}
                              >
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {section.note && (
                  <div className={card('emerald', 'mt-5 p-4')}>
                    <p className="text-sm leading-relaxed text-white/85">{section.note}</p>
                  </div>
                )}
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Подвал */}
      <footer className="border-t border-white/10 bg-black px-6 py-12 md:px-12">
        <div className="mx-auto flex max-w-4xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <a
            href={content.home}
            className="flex items-center gap-2 text-lg font-semibold tracking-tight text-white"
          >
            Habibi
            <DigitalHeart className="h-[13px] w-auto text-emerald-400" />
          </a>
          <nav className="flex flex-wrap gap-x-5 gap-y-2">
            {content.footerLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-white/60 transition-colors hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <p className="text-sm text-white/45">{content.footerText}</p>
        </div>
      </footer>

      <Chat />
    </div>
  )
}
