import { useEffect } from 'react'
import { ArrowLeft, ArrowRight, Check } from 'lucide-react'
import { LiquidButton } from '../ui/liquid-glass-button'
import { Reveal } from '../Reveal'
import DigitalHeart from '../DigitalHeart'
import { CARD, SectionTag, card } from '../partner/ui'
import { scrollToId } from '@/lib/utils'
import ConsultingForm from './ConsultingForm'
import TeamAvatar from './TeamAvatar'
import type { ConsultingContent } from './types'

const HERO_VIDEO =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_204221_5339e40b-e73d-4ab0-9c65-79c18c66fd50.mp4'

/**
 * Страница направления Habibi Consulting. Вёрстка одна на все языки —
 * различается только контентом (см. ru/en/ar data-файлы) и направлением текста.
 */
export default function ConsultingPage({ content }: { content: ConsultingContent }) {
  const { ui, dir, lang, Chat } = content
  const rtl = dir === 'rtl'
  const BackIcon = rtl ? ArrowRight : ArrowLeft
  const CtaIcon = rtl ? ArrowLeft : ArrowRight

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
      {/* ── Герой ── */}
      <section className="relative overflow-hidden">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: '70% center', ...(rtl ? { transform: 'scaleX(-1)' } : {}) }}
          autoPlay
          muted
          loop
          playsInline
        >
          <source src={HERO_VIDEO} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black" />

        <header className="relative z-10 mx-auto flex max-w-6xl items-center justify-between px-6 pt-8 md:px-12">
          <a
            href={content.home}
            className="inline-flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-white"
          >
            <BackIcon size={16} />
            {ui.backHome}
          </a>
          <span className="flex items-center gap-2 text-lg font-semibold tracking-tight text-white">
            Habibi
            <DigitalHeart className="heart-beat h-[13px] w-auto text-emerald-400" />
          </span>
        </header>

        <div className="relative z-10 mx-auto max-w-6xl px-6 pb-24 pt-16 md:px-12 md:pb-32 md:pt-24">
          <Reveal>
            <SectionTag divider={false}>{ui.heroTag}</SectionTag>
            <h1 className="max-w-3xl text-3xl font-medium leading-[1.1] tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
              {ui.heroTitle}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">
              {ui.heroLead}
            </p>
            <p className="mt-4 max-w-2xl text-base font-medium leading-relaxed text-white/90 md:text-lg">
              {ui.heroAccent}
            </p>
            <div className="mt-9">
              <LiquidButton
                size="lg"
                onClick={() => scrollToId('zayavka')}
                className="rounded-full text-white"
              >
                {ui.heroCta}
                <CtaIcon size={16} />
              </LiquidButton>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Чем отличается ── */}
      <section className="mx-auto max-w-6xl px-6 py-20 md:px-12 md:py-24">
        <Reveal>
          <SectionTag>{ui.differenceTag}</SectionTag>
          <h2 className="max-w-3xl text-2xl font-medium tracking-tight sm:text-3xl md:text-4xl">
            {ui.differenceTitle}
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {content.difference.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.08}>
              <div className={card(item.tone, 'h-full')}>
                <h3 className="mb-3 text-xl font-medium">{item.title}</h3>
                <p className="text-sm leading-relaxed text-white/65 md:text-[15px]">{item.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Кому подходит ── */}
      <section className="mx-auto max-w-6xl px-6 py-20 md:px-12 md:py-24">
        <Reveal>
          <SectionTag>{ui.audienceTag}</SectionTag>
          <h2 className="max-w-3xl text-2xl font-medium tracking-tight sm:text-3xl md:text-4xl">
            {ui.audienceTitle}
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {content.audience.map((item, i) => (
            <Reveal key={item.text} delay={(i % 2) * 0.07}>
              <div className={`${CARD} h-full`}>
                <span className="mb-4 block text-2xl">{item.icon}</span>
                <p className="text-sm leading-relaxed text-white/75">{item.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Что входит ── */}
      <section className="mx-auto max-w-6xl px-6 py-20 md:px-12 md:py-24">
        <Reveal>
          <SectionTag>{ui.includedTag}</SectionTag>
          <h2 className="max-w-3xl text-2xl font-medium tracking-tight sm:text-3xl md:text-4xl">
            {ui.includedTitle}
          </h2>
        </Reveal>
        <div className="mt-10 space-y-4">
          {content.included.map((item, i) => (
            <Reveal key={item.title} delay={0.05}>
              <div className={`${CARD} flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-6`}>
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-emerald-400/30 bg-emerald-400/[0.1] text-base font-semibold text-emerald-300">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="mb-2 text-lg font-medium">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-white/65 md:text-[15px]">{item.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Кто этим занимается ── */}
      <section className="mx-auto max-w-6xl px-6 py-20 md:px-12 md:py-24">
        <Reveal>
          <SectionTag>{ui.teamTag}</SectionTag>
          <h2 className="max-w-3xl text-2xl font-medium tracking-tight sm:text-3xl md:text-4xl">
            {ui.teamTitle}
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {content.team.map((member, i) => (
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

      {/* ── Как это устроено ── */}
      <section className="mx-auto max-w-6xl px-6 py-20 md:px-12 md:py-24">
        <Reveal>
          <SectionTag>{ui.stepsTag}</SectionTag>
          <h2 className="max-w-3xl text-2xl font-medium tracking-tight sm:text-3xl md:text-4xl">
            {ui.stepsTitle}
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {content.steps.map((step, i) => (
            <Reveal key={step} delay={(i % 5) * 0.06}>
              <div className={`${CARD} h-full`}>
                <span className="mb-3 block text-3xl font-semibold tracking-tight text-white/25">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="text-sm leading-relaxed text-white/75">{step}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Тариф ── */}
      <section className="mx-auto max-w-6xl px-6 py-20 md:px-12 md:py-24">
        <Reveal>
          <SectionTag>{ui.tariffTag}</SectionTag>
          <div className={card('amber', 'flex flex-col gap-5 md:flex-row md:items-center')}>
            <div className="shrink-0">
              <div className="text-3xl font-semibold tracking-tight text-amber-100 md:text-4xl">
                {ui.tariffName}
              </div>
              <p className="mt-1 text-sm text-amber-200/70">{ui.tariffNote}</p>
            </div>
            <p className="text-base leading-relaxed text-white/80">{ui.tariffText}</p>
          </div>
        </Reveal>
      </section>

      {/* ── Заявка ── */}
      <section id="zayavka" className="mx-auto max-w-4xl px-6 py-20 md:px-12 md:py-28">
        <Reveal>
          <SectionTag>{ui.formTag}</SectionTag>
          <h2 className="text-2xl font-medium tracking-tight sm:text-3xl md:text-4xl">
            {ui.formTitle}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/65">{ui.formLead}</p>
        </Reveal>
        <Reveal delay={0.08}>
          <div className={`${CARD} mt-10`}>
            <ConsultingForm labels={content.form} />
          </div>
        </Reveal>
      </section>

      {/* ── Подвал ── */}
      <footer className="border-t border-white/10 bg-black px-6 py-14 md:px-12 lg:px-16">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <a
              href={content.home}
              className="flex items-center gap-2 text-lg font-semibold tracking-tight text-white"
            >
              Habibi
              <DigitalHeart className="h-[13px] w-auto text-emerald-400" />
            </a>
            <p className="mt-3 text-sm leading-relaxed text-white/50">{ui.footerText}</p>
          </div>
          <nav className="flex flex-col gap-3">
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
          <div className="flex items-start gap-2 text-sm text-white/50">
            <Check size={16} className="mt-0.5 shrink-0 text-emerald-400" />
            {ui.footerReply}
          </div>
        </div>
      </footer>

      <Chat />
    </div>
  )
}
