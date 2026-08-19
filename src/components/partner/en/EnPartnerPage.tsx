import { useEffect, type ReactNode } from 'react'
import { ArrowLeft, ArrowRight, Check, Sparkles, TrendingUp } from 'lucide-react'
import { ContactProvider, useContact } from '../../en/ContactProvider'
import { Reveal } from '../../Reveal'
import { LiquidButton } from '../../ui/liquid-glass-button'
import DigitalHeart from '../../DigitalHeart'
import { TIERS } from '../../en/Pricing'
import EarningsCalculator from './EarningsCalculator'
import Banknotes from '../Banknotes'
import GoldRain from '../GoldRain'
import PartnerFooter from './PartnerFooter'
import AiChatWidget from '../../en/AiChatWidget'
import {
  AUDIENCES,
  COMMISSION_LEVELS,
  CONDITIONS,
  DASHBOARD_METRICS,
  EXAMPLES,
  EXCLUSIVE_FEATURES,
  FINAL_CHAIN,
  GROWTH_STEPS,
  OPPORTUNITIES,
  PARTNER_FORM,
  PRICE_PRO,
  RATE_HIGH,
  RATE_LOW,
  RATE_THRESHOLD,
  STEPS,
  TIER_EARNINGS,
  WIN_SIDES,
  formatMoney,
} from './data'

// Same background videos already used on the landing page — no new assets.
// (The hero uses no video: its background is the banknote field, see Banknotes.)
const EARNINGS_VIDEO =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_204221_5339e40b-e73d-4ab0-9c65-79c18c66fd50.mp4'
const CLOSING_VIDEO =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260424_064411_9e9d7f84-9277-41f4-ab10-59172d89e6be.mp4'

/* ─────────────────────────── Primitives ─────────────────────────── */

/** Minimal **bold** rendering inside a paragraph (same as Faq.tsx). */
function renderRich(text: string) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith('**') && part.endsWith('**') ? (
      <strong key={i} className="font-semibold text-white/90">
        {part.slice(2, -2)}
      </strong>
    ) : (
      part
    ),
  )
}

/**
 * Section marker: a full-width rule with the label sitting under it.
 * Reads as "a new section starts here" before you even read the heading.
 * Deliberately unnumbered — numbers would clash with the 01–05 step cards.
 */
function SectionTag({
  children,
  divider = true,
}: {
  children: string
  /** Divider rule above the label (not needed in the hero). */
  divider?: boolean
}) {
  return (
    <div className="mb-5">
      {divider && (
        <div className="mb-6 flex items-center gap-3">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.95)]" />
          <span className="h-px flex-1 bg-gradient-to-r from-emerald-400/55 via-white/15 to-transparent" />
        </div>
      )}
      <span className="inline-flex items-center gap-2.5 rounded-full border border-emerald-400/35 bg-emerald-400/[0.1] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-sm">
        {children}
      </span>
    </div>
  )
}

function Pill({ children }: { children: ReactNode }) {
  return (
    <span className="whitespace-nowrap rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm text-white/85">
      {children}
    </span>
  )
}

function Section({
  id,
  children,
  className = '',
  seed = 1,
}: {
  id?: string
  children: ReactNode
  className?: string
  /** Gold-rain pattern — unique per section. */
  seed?: number
}) {
  return (
    <section
      id={id}
      className={`relative overflow-hidden bg-black px-6 py-20 md:px-12 md:py-28 lg:px-16 ${className}`}
    >
      {/* Gold rain — background for the sections without video */}
      <GoldRain className="pointer-events-none absolute inset-0" seed={seed} />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />

      <div className="relative z-10 mx-auto max-w-6xl">{children}</div>
    </section>
  )
}

function SectionHead({
  tag,
  title,
  lead,
}: {
  tag: string
  title: string
  lead?: string
}) {
  return (
    <Reveal>
      <div className="mb-12">
        <SectionTag>{tag}</SectionTag>
        <h2 className="max-w-3xl text-2xl font-medium leading-tight tracking-tight text-white sm:text-3xl md:text-4xl">
          {title}
        </h2>
        {lead && <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/60">{lead}</p>}
      </div>
    </Reveal>
  )
}

/**
 * Card highlighting: soft light from the top inside the block plus a thin light edge,
 * with a glow on hover. Three tones: neutral, emerald (accent), amber (premium).
 */
const CARD_BASE =
  'relative rounded-2xl border p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5'

const CARD_TONES = {
  plain:
    'border-white/12 bg-gradient-to-b from-white/[0.07] via-white/[0.025] to-transparent shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] hover:border-white/25 hover:shadow-[0_18px_44px_-22px_rgba(0,0,0,0.95),0_0_32px_-14px_rgba(255,255,255,0.3),inset_0_1px_0_rgba(255,255,255,0.16)]',
  emerald:
    'border-emerald-400/30 bg-gradient-to-b from-emerald-400/[0.13] via-emerald-400/[0.04] to-transparent shadow-[inset_0_1px_0_rgba(52,211,153,0.2)] hover:border-emerald-400/50 hover:shadow-[0_18px_44px_-22px_rgba(0,0,0,0.95),0_0_36px_-12px_rgba(52,211,153,0.45),inset_0_1px_0_rgba(52,211,153,0.3)]',
  amber:
    'border-amber-300/30 bg-gradient-to-b from-amber-300/[0.12] via-amber-300/[0.04] to-transparent shadow-[inset_0_1px_0_rgba(252,211,77,0.2)] hover:border-amber-300/50 hover:shadow-[0_18px_44px_-22px_rgba(0,0,0,0.95),0_0_36px_-12px_rgba(252,211,77,0.42),inset_0_1px_0_rgba(252,211,77,0.3)]',
} as const

function card(tone: keyof typeof CARD_TONES = 'plain', extra = '') {
  return `${CARD_BASE} ${CARD_TONES[tone]} ${extra}`.trim()
}

const CARD = card()

/* ─────────────────────────── Page ─────────────────────────── */

function EnPartnerPageContent() {
  const { open } = useContact()
  const apply = () => open(PARTNER_FORM.label, PARTNER_FORM.options)

  useEffect(() => {
    const html = document.documentElement
    const prevLang = html.getAttribute('lang') ?? 'en'
    html.setAttribute('lang', 'en')
    document.title = 'Habibi Partner Programme — earn from your recommendations'
    window.scrollTo(0, 0)
    return () => {
      html.setAttribute('lang', prevLang)
      document.title = 'Habibi — the digital ecosystem for your business'
    }
  }, [])

  return (
    <div className="min-h-screen w-full bg-black font-geist text-white">
      {/* ─── 01. Hero ─── */}
      <section className="relative overflow-hidden bg-black">
        {/* Background: world banknotes plus a soft gold glow and coins on top */}
        <Banknotes className="pointer-events-none absolute inset-0" seed={7} />
        <GoldRain className="pointer-events-none absolute inset-0" seed={1} density={0.5} />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(75%_55%_at_50%_35%,rgba(226,190,116,0.09),transparent_72%)]" />
        {/* Veil under the copy: even on mobile (text spans the width),
            shifted left on desktop so the banknotes can breathe on the right. */}
        <div className="pointer-events-none absolute inset-0 bg-black/45 md:hidden" />
        <div className="pointer-events-none absolute inset-0 hidden bg-gradient-to-r from-black/90 via-black/35 to-transparent md:block" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black" />

        <header className="relative z-10 mx-auto flex max-w-6xl items-center justify-between px-6 pt-8 md:px-12">
          <a
            href="/ru"
            className="inline-flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-white"
          >
            <ArrowLeft size={16} />
            Back to home
          </a>
          <span className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.22em] text-white/70">
            Habibi
            <DigitalHeart className="heart-beat h-[12px] w-auto text-emerald-400" />
          </span>
        </header>

        <div className="relative z-10 mx-auto max-w-6xl px-6 pb-24 pt-16 md:px-12 md:pb-32 md:pt-24 lg:px-16">
          <SectionTag divider={false}>Partner programme</SectionTag>
          <h1 className="max-w-3xl text-4xl font-semibold leading-[1.08] tracking-tight text-white [animation:fadeSlideUp_0.8s_ease_0.1s_both] sm:text-5xl md:text-6xl">
            Earn together with Habibi
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/70 [animation:fadeSlideUp_0.8s_ease_0.25s_both] md:text-xl">
            Recommend Habibi to businesses and earn from every paid subscription.
          </p>

          <div className="mt-8 flex flex-wrap gap-2.5 [animation:fadeSlideUp_0.8s_ease_0.4s_both]">
            {[
              'Know some entrepreneurs?',
              'Building a business community?',
              'Working with companies?',
              'Running a Telegram channel or a blog?',
            ].map((q) => (
              <Pill key={q}>{q}</Pill>
            ))}
          </div>

          <p className="mt-8 max-w-2xl text-base leading-relaxed text-white/85 [animation:fadeSlideUp_0.8s_ease_0.5s_both] md:text-lg">
            Get your personal referral link and up to{' '}
            <span className="font-semibold text-emerald-300">30%</span> of every paid subscription
            from the clients you bring in.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3.5 [animation:fadeSlideUp_0.8s_ease_0.6s_both]">
            <LiquidButton size="xl" onClick={apply} className="rounded-full text-white">
              Become a partner
              <ArrowRight size={18} />
            </LiquidButton>
            <a
              href="#kak-rabotaet"
              className="rounded-full border border-white/25 px-8 py-3.5 text-base font-medium text-white transition-colors hover:border-white/50"
            >
              See how it works
            </a>
          </div>
        </div>
      </section>

      {/* ─── 02. How it works ─── */}
      <Section id="kak-rabotaet" seed={2}>
        <SectionHead
          tag="5 steps"
          title="How the partner programme works"
          lead="It is simple: you sign up, share your link and earn a share of every paid subscription."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {STEPS.map((step, i) => (
            <Reveal key={step.num} delay={(i % 3) * 0.08}>
              <div className={`${CARD} h-full`}>
                <span className="text-4xl font-semibold leading-none text-white/15">
                  {step.num}
                </span>
                <h3 className="mt-4 text-lg font-medium text-white">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{step.text}</p>

                {step.code && (
                  <div className="mt-4">
                    <p className="text-xs text-white/40">For example:</p>
                    <code className="mt-1.5 inline-block rounded-lg border border-emerald-400/20 bg-emerald-400/[0.07] px-3 py-1.5 font-mono text-sm text-emerald-300">
                      {step.code}
                    </code>
                  </div>
                )}

                {step.chips && (
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {step.chips.map((chip) => (
                      <span
                        key={chip}
                        className="rounded-full border border-white/12 bg-white/5 px-2.5 py-1 text-xs text-white/65"
                      >
                        {chip}
                      </span>
                    ))}
                  </div>
                )}

                {step.list && (
                  <ul className="mt-4 space-y-1.5">
                    {step.list.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-white/70">
                        <Check size={15} className="mt-0.5 shrink-0 text-emerald-400" />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}

                {step.note && (
                  <p className="mt-4 rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-sm text-white/75">
                    {step.note}
                  </p>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ─── 03. Commission rates ─── */}
      <Section id="stavki" seed={3}>
        <SectionHead
          tag="Commission"
          title="The more clients you bring, the higher your rate"
          lead="We kept the programme as simple as possible: two tiers and one clear rule for moving up."
        />
        <div className="grid gap-4 md:grid-cols-2">
          {COMMISSION_LEVELS.map((level, i) => (
            <Reveal key={level.rate} delay={i * 0.1}>
              <div
                className={card(level.top ? 'emerald' : 'plain', 'h-full !p-8')}
              >
                <p className="text-sm text-white/55">{level.clients}</p>
                <p
                  className={`mt-4 text-6xl font-semibold tracking-tighter ${
                    level.top ? 'text-emerald-300' : 'text-white'
                  }`}
                >
                  {level.rate}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-white/60">{level.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <div className={card('amber', 'mt-4 flex items-start gap-4')}>
            <TrendingUp size={22} className="mt-0.5 shrink-0 text-amber-300" />
            <div>
              <h3 className="text-lg font-medium text-white">The key advantage</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/65">
                Once you reach {RATE_THRESHOLD} active paying clients, the higher 30% rate applies{' '}
                <strong className="font-semibold text-white/90">
                  to your entire active client base
                </strong>
                , not just to the 11th client. Every new client raises not only your client count
                but also the income from the companies you referred earlier.
              </p>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* ─── 04. How much you can earn ─── */}
      <section
        id="raschet"
        className="relative overflow-hidden bg-black px-6 py-20 md:px-12 md:py-28 lg:px-16"
      >
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src={EARNINGS_VIDEO} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/70" />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/50 to-black" />

        <div className="relative z-10 mx-auto max-w-6xl">
          <SectionHead
            tag="The numbers"
            title="How much can you earn?"
            lead="Let us run the numbers on the actual Habibi plans."
          />

          {/* Commission per plan */}
          <div className="grid gap-4 md:grid-cols-3">
            {TIER_EARNINGS.map((tier, i) => (
              <Reveal key={tier.name} delay={i * 0.08}>
                <div className={`${CARD} h-full`}>
                  <h3 className="text-lg font-medium text-white">{tier.name}</h3>
                  <p className="mt-1 text-sm text-white/45">{formatMoney(tier.price)} per month</p>
                  <div className="mt-5 space-y-3 border-t border-white/10 pt-5">
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="text-sm text-white/55">At 20% commission</span>
                      <span className="text-lg font-semibold text-white">
                        {formatMoney(tier.price * RATE_LOW)}
                      </span>
                    </div>
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="text-sm text-white/55">At 30% commission</span>
                      <span className="text-lg font-semibold text-emerald-300">
                        {formatMoney(tier.price * RATE_HIGH)}
                      </span>
                    </div>
                  </div>
                  <p className="mt-4 text-xs text-white/40">per client, per month</p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Interactive calculator */}
          <Reveal delay={0.1}>
            <div className="mt-10">
              <h3 className="mb-5 text-xl font-medium tracking-tight text-white">
                Calculate your income
              </h3>
              <EarningsCalculator />
            </div>
          </Reveal>

          {/* Worked examples */}
          <Reveal delay={0.1}>
            <h3 className="mb-5 mt-14 text-xl font-medium tracking-tight text-white">For example</h3>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2">
            {EXAMPLES.map((ex, i) => (
              <Reveal key={ex.title} delay={(i % 2) * 0.08}>
                <div
                  className={card(ex.highlight ? 'emerald' : 'plain', 'h-full')}
                >
                  <h4 className="text-base font-medium text-white">{ex.title}</h4>
                  <ul className="mt-3 space-y-1.5">
                    {ex.rows.map((row) => (
                      <li key={row} className="text-sm leading-relaxed text-white/60">
                        {row}
                      </li>
                    ))}
                  </ul>
                  <p
                    className={`mt-5 text-3xl font-semibold tracking-tight ${
                      ex.highlight ? 'text-emerald-300' : 'text-white'
                    }`}
                  >
                    {ex.result}
                  </p>
                  <p className="mt-1 text-xs text-white/45">{ex.caption}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 05. Habibi Exclusive ─── */}
      <Section seed={5}>
        <SectionHead
          tag="Enterprise clients"
          title="Habibi Exclusive"
          lead="For companies that need a tailored solution. Pricing is set after a business audit — and the partner earns commission on these clients too."
        />
        <Reveal>
          <div className={card('amber', '!p-8')}>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {EXCLUSIVE_FEATURES.map((f) => (
                <div key={f} className="flex items-start gap-2.5">
                  <Check size={16} className="mt-0.5 shrink-0 text-amber-300" />
                  <span className="text-sm text-white/75">{f}</span>
                </div>
              ))}
            </div>
            <p className="mt-8 border-t border-white/10 pt-6 text-sm leading-relaxed text-white/60">
              Commission size and terms for Habibi Exclusive are agreed individually, based on the
              scope and structure of the project. That way you can bring in large corporate clients,
              not only small companies.
            </p>
          </div>
        </Reveal>
      </Section>

      {/* ─── 06. What a partner can do ─── */}
      <Section seed={6}>
        <SectionHead
          tag="More than referrals"
          title="Your options go far beyond recommending"
          lead="Habibi is not just a SaaS product — it is a digital ecosystem for business. You can build your own income stream around it."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {OPPORTUNITIES.map((item, i) => (
            <Reveal key={item.title} delay={(i % 3) * 0.08}>
              <div className={`${CARD} h-full`}>
                <item.icon size={22} className="text-emerald-400" />
                <h3 className="mt-4 text-lg font-medium text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{item.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ─── 07. Who it is for ─── */}
      <Section seed={7}>
        <SectionHead
          tag="Audience"
          title="Who is the partner programme for?"
          lead="You do not need to be a marketer, a developer or a blogger — it is enough to know entrepreneurs Habibi could help."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {AUDIENCES.map((a, i) => (
            <Reveal key={a.title} delay={(i % 3) * 0.08}>
              <div className={`${CARD} h-full`}>
                <a.icon size={22} className="text-white/50" />
                <h3 className="mt-4 text-lg font-medium text-white">{a.title}</h3>
                <p className="mt-2 text-sm font-medium text-white/80">{a.question}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-white/60">{a.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ─── 08. Referral link ─── */}
      <Section seed={8}>
        <Reveal>
          <SectionTag>Attribution</SectionTag>
        </Reveal>
        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-center">
          <Reveal>
            <div>
              <h2 className="text-2xl font-medium leading-tight tracking-tight text-white sm:text-3xl md:text-4xl">
                Your personal referral link
              </h2>
              <p className="mt-4 text-base leading-relaxed text-white/60">
                Once you sign up you get your own link and send it to a potential client. The
                system records the click and ties the new user to your partner account.
              </p>
              <p className="mt-4 text-base leading-relaxed text-white/80">
                You never have to tell us "this client came from me". It all happens automatically.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className={CARD}>
              <p className="text-xs uppercase tracking-widest text-white/40">
                This is what your link will look like
              </p>
              <code className="mt-3 block overflow-x-auto rounded-xl border border-emerald-400/20 bg-emerald-400/[0.07] px-4 py-3 font-mono text-sm text-emerald-300">
                habibi-erp.com/ref/yourname
              </code>
              <ul className="mt-5 space-y-2.5">
                {[
                  'The client follows your link and signs up',
                  'The click and the sign-up are tied to your account',
                  'Commission starts with their first payment',
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2.5 text-sm text-white/65">
                    <Check size={15} className="mt-0.5 shrink-0 text-emerald-400" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ─── 09. Dashboard ─── */}
      <Section id="kabinet" seed={9}>
        <SectionHead
          tag="Partner dashboard"
          title="Your partner dashboard"
          lead="Every number in one place — from clicks on your link to the amount cleared for payout."
        />
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {DASHBOARD_METRICS.map((m, i) => (
            <Reveal key={m.title} delay={(i % 4) * 0.06}>
              <div className={`${CARD} h-full !p-5`}>
                <m.icon size={20} className="text-emerald-400" />
                <h3 className="mt-3.5 text-base font-medium text-white">{m.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-white/55">{m.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15}>
          <div className={card('plain', 'mt-4 md:!p-8')}>
            <h3 className="text-lg font-medium text-white">The next tier is always in sight</h3>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/60">
              The dashboard shows your progress towards the higher rate. For example:
            </p>
            <div className="mt-6 max-w-md">
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="font-medium text-white">7 / {RATE_THRESHOLD} clients</span>
                <span className="text-white/50">4 more clients to reach 30%</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
                <div className="h-full w-[63.6%] rounded-full bg-emerald-400" />
              </div>
              <p className="mt-4 text-xs text-white/40">
                The numbers on this screen are an example. Past {RATE_THRESHOLD} active paying
                clients the 30% rate covers your entire active base.
              </p>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* ─── 10. Why it pays off ─── */}
      <Section seed={10}>
        <SectionHead
          tag="Recurring income"
          title="Why this pays off"
          lead="Most referral schemes end after a single action: you recommend, you get a flat bonus, done. Habibi works differently — you build a client base that keeps paying you."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {GROWTH_STEPS.map((s, i) => {
            const rate = s.clients >= RATE_THRESHOLD ? RATE_HIGH : RATE_LOW
            return (
              <Reveal key={s.label} delay={(i % 4) * 0.08}>
                <div className={`${CARD} h-full`}>
                  <p className="text-xs uppercase tracking-widest text-white/40">{s.label}</p>
                  <p className="mt-3 text-4xl font-semibold tracking-tight text-white">
                    {s.clients}
                    {i === GROWTH_STEPS.length - 1 && '+'}
                  </p>
                  <p className="mt-1 text-sm text-white/55">active clients</p>
                  <p className="mt-5 border-t border-white/10 pt-4 text-sm text-white/70">
                    <span className="font-semibold text-emerald-300">
                      {formatMoney(s.clients * PRICE_PRO * rate)}
                    </span>{' '}
                    per month
                  </p>
                  <p className="mt-1 text-xs text-white/35">
                    if they are all on Habibi Pro, at {Math.round(rate * 100)}%
                  </p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </Section>

      {/* ─── 11. You are not selling ERP ─── */}
      <Section seed={11}>
        <Reveal>
          <SectionTag>No selling</SectionTag>
        </Reveal>
        <Reveal>
          <div className={card('plain', '!rounded-3xl !p-8 md:!p-12')}>
            <h2 className="max-w-3xl text-2xl font-medium leading-tight tracking-tight text-white sm:text-3xl md:text-4xl">
              You are not selling ERP
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/65">
              You do not need to become a professional software salesperson. Your job is simply to
              introduce an entrepreneur to Habibi. From there the client explores the product on
              their own.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-emerald-400/25 bg-emerald-400/[0.08] px-5 py-2.5 text-sm font-medium text-emerald-300">
                14 days free
              </span>
              <span className="rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm text-white/75">
                No credit card
              </span>
              <span className="rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm text-white/75">
                If it fits, the client picks a plan and you earn commission
              </span>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* ─── 12. What the client gets ─── */}
      <Section id="tarify-klienta" seed={12}>
        <SectionHead
          tag="Value for the client"
          title="What does the client get?"
          lead="A partner programme only works when the recommendation is genuinely useful. Your client gets access to the whole Habibi ecosystem."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {TIERS.map((tier, i) => (
            <Reveal key={tier.name} delay={(i % 4) * 0.08}>
              <div
                className={card(tier.isExclusive ? 'amber' : 'plain', 'flex h-full flex-col')}
              >
                <h3 className="text-lg font-medium text-white">{tier.name}</h3>
                <p className="mt-3 text-3xl font-semibold tracking-tight text-white">
                  {tier.priceLabel ?? `€${tier.priceMonthly}`}
                  {!tier.priceLabel && (
                    <span className="ml-1 text-sm font-normal text-white/45">/ mo</span>
                  )}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-white/55">{tier.description}</p>
                <ul className="mt-5 space-y-2 border-t border-white/10 pt-5">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-white/65">
                      <Check
                        size={15}
                        className={`mt-0.5 shrink-0 ${
                          tier.isExclusive ? 'text-amber-300' : 'text-emerald-400'
                        }`}
                      />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.1}>
          <p className="mt-6 text-sm text-white/45">
            The first 14 days are free, no card required. Habibi Exclusive pricing and terms are
            calculated after a business audit.
          </p>
        </Reveal>
      </Section>

      {/* ─── 13. Three sides win ─── */}
      <Section seed={13}>
        <SectionHead tag="Win-win-win" title="Three sides win" />
        <div className="grid gap-4 md:grid-cols-3">
          {WIN_SIDES.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.08}>
              <div className={`${CARD} h-full`}>
                <s.icon size={22} className="text-emerald-400" />
                <h3 className="mt-4 text-lg font-medium text-white">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ─── 14. Terms ─── */}
      <Section id="usloviya" seed={14}>
        <SectionHead
          tag="Transparent"
          title="Partner programme terms"
          lead="The main rules up front — so there are no surprises later."
        />
        <div className="grid gap-4 md:grid-cols-2">
          {CONDITIONS.map((c, i) => (
            <Reveal key={c.title} delay={(i % 2) * 0.06}>
              <div className={`${CARD} h-full !p-5`}>
                <div className="flex items-baseline gap-3">
                  <span className="text-sm font-semibold tabular-nums text-white/25">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="text-base font-medium text-white">{c.title}</h3>
                </div>
                <p className="mt-2 pl-8 text-sm leading-relaxed text-white/60">
                  {renderRich(c.text)}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ─── 15. Final CTA ─── */}
      <section className="relative overflow-hidden bg-black px-6 py-24 md:px-12 md:py-32 lg:px-16">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src={CLOSING_VIDEO} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/65" />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/40 to-black" />

        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <Reveal>
            <h2 className="text-3xl font-medium leading-[1.15] tracking-tight text-white sm:text-4xl md:text-5xl">
              Start earning with Habibi
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/65 md:text-lg">
              It does not matter whether you know one entrepreneur or have 10,000 followers. If you
              can introduce a business to Habibi, you can be our partner.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-2.5">
              {FINAL_CHAIN.map((step, i) => (
                <span key={step} className="flex items-center gap-2.5">
                  <span
                    className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm ${
                      i === FINAL_CHAIN.length - 1
                        ? 'border-emerald-400/40 bg-emerald-400/10 font-semibold text-emerald-300'
                        : 'border-white/20 bg-white/5 text-white/85'
                    }`}
                  >
                    {step}
                  </span>
                  {i < FINAL_CHAIN.length - 1 && <span className="text-white/35">→</span>}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.3}>
            <p className="mx-auto mt-10 flex max-w-xl items-center justify-center gap-2 text-base text-white/70">
              <Sparkles size={16} className="text-emerald-400" />
              Habibi builds the technology. You build the recommendations.
            </p>
            <LiquidButton size="xl" onClick={apply} className="mt-6 rounded-full text-white">
              Become a Habibi partner
              <ArrowRight size={18} />
            </LiquidButton>
          </Reveal>
        </div>
      </section>

      <PartnerFooter />
      <AiChatWidget page="partner" />
    </div>
  )
}

export default function EnPartnerPage() {
  return (
    <ContactProvider>
      <EnPartnerPageContent />
    </ContactProvider>
  )
}
