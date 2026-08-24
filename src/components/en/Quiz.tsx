import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, Check, RotateCcw, Sparkles } from 'lucide-react'
import { LiquidButton } from '../ui/liquid-glass-button'
import { useContact } from './ContactProvider'

/* ──────────────────────────────────────────────────────────────
   Quiz data
   ────────────────────────────────────────────────────────────── */

type AnswerKey = 'biz' | 'problems' | 'team' | 'complexity' | 'support'

interface Option {
  id: string
  emoji: string
  label: string
  desc?: string
}

interface Question {
  key: AnswerKey
  multi: boolean
  title: string
  hint?: string
  options: Option[]
}

const QUESTIONS: Question[] = [
  {
    key: 'biz',
    multi: false,
    title: 'What does your business do?',
    hint: 'Choose the option that fits',
    options: [
      { id: 'services', emoji: '🏢', label: 'Services' },
      { id: 'retail', emoji: '🛍️', label: 'Retail' },
      { id: 'wholesale', emoji: '📦', label: 'Wholesale' },
      { id: 'manufacturing', emoji: '🏭', label: 'Manufacturing' },
      { id: 'service', emoji: '🛠️', label: 'Repair & maintenance' },
      { id: 'construction', emoji: '🏗️', label: 'Construction' },
      { id: 'it', emoji: '💻', label: 'IT / Digital' },
      { id: 'other', emoji: '📋', label: 'Other' },
    ],
  },
  {
    key: 'problems',
    multi: true,
    title: 'What is your main business problem right now?',
    hint: 'You can select several options',
    options: [
      { id: 'leads', emoji: '🔴', label: 'We lose leads and customers' },
      { id: 'sales', emoji: '🔴', label: 'Hard to keep sales under control' },
      { id: 'money', emoji: '🔴', label: "We don't understand profit and cash flow" },
      { id: 'stock', emoji: '🔴', label: "We don't know exact stock levels" },
      { id: 'purchase', emoji: '🔴', label: 'Hard to control purchasing and suppliers' },
      { id: 'production', emoji: '🔴', label: 'Manufacturing is hard to plan and control' },
      { id: 'hr', emoji: '🔴', label: 'Hard to manage staff and payroll' },
      { id: 'projects', emoji: '🔴', label: 'Tasks and projects are scattered across systems' },
      { id: 'service', emoji: '🔴', label: 'Hard to keep service and tickets under control' },
      { id: 'many', emoji: '🔴', label: 'Too many disconnected apps' },
    ],
  },
  {
    key: 'team',
    multi: false,
    title: 'How many people will use Habibi?',
    options: [
      { id: 'solo', emoji: '👤', label: 'Just me' },
      { id: 'small', emoji: '👥', label: '2–5 people' },
      { id: 'big', emoji: '🏢', label: 'More than 5 people' },
    ],
  },
  {
    key: 'complexity',
    multi: false,
    title: 'How complex are your business processes?',
    hint: 'How many areas you need to bring into one system',
    options: [
      { id: 'basic', emoji: '🟢', label: 'Just the basics', desc: 'Customers, sales, tasks, finance' },
      { id: 'several', emoji: '🔵', label: 'Several processes', desc: 'Sales + purchasing + inventory + finance' },
      { id: 'complex', emoji: '🟣', label: 'Complex business', desc: 'Sales, purchasing, inventory, manufacturing, HR, finance, service' },
    ],
  },
  {
    key: 'support',
    multi: false,
    title: 'What level of support do you need?',
    options: [
      { id: 'self', emoji: '🟢', label: "I'll set it up and learn on my own" },
      { id: 'standard', emoji: '🔵', label: 'Standard support is enough' },
      { id: 'expert', emoji: '🟣', label: 'I need help with onboarding' },
      { id: 'manager', emoji: '👑', label: 'I need a dedicated manager' },
    ],
  },
]

type Tier = 'habibi' | 'plus' | 'premium'

const TIERS_INFO: Record<
  Tier,
  { name: string; tagline: string; price: string; period: string; features: string[] }
> = {
  habibi: {
    name: 'Habibi',
    tagline: 'Start managing your business',
    price: '€0',
    period: '',
    features: [
      'Customers & sales',
      'Work & tasks',
      'Customers from the web',
      'Money under control',
      'Up to 2 users',
      'Up to 2 integrations',
    ],
  },
  plus: {
    name: 'Habibi Pro',
    tagline: 'Bring your business into one system',
    price: '€49',
    period: '/ mo',
    features: [
      'All 10 modules',
      'Up to 5 users',
      'Up to 5 integrations',
      'Basic support',
    ],
  },
  premium: {
    name: 'Habibi Premium',
    tagline: 'Scale your business with expert support',
    price: '€199',
    period: '/ mo',
    features: [
      'All 10 modules',
      'Unlimited users',
      'Dedicated onboarding',
      'Priority support',
      'Advanced analytics',
    ],
  },
}

const BIZ_LABEL: Record<string, string> = {
  services: 'services',
  retail: 'retail',
  wholesale: 'wholesale',
  manufacturing: 'manufacturing',
  service: 'repair & maintenance',
  construction: 'construction',
  it: 'IT / Digital',
  other: 'your field',
}

const MOD: Record<string, string> = {
  crm: 'Customers & sales',
  purchase: 'Purchases',
  stock: 'Products & stock',
  production: 'Manufacturing',
  finance: 'Money under control',
  hr: 'My team',
  projects: 'Work & tasks',
  service: 'Customers after the sale',
  pos: 'Retail (POS)',
  site: 'Customers from the web',
}

const PROBLEM_MOD: Record<string, string[]> = {
  leads: ['crm', 'site'],
  sales: ['crm'],
  money: ['finance'],
  stock: ['stock'],
  purchase: ['purchase'],
  production: ['production'],
  hr: ['hr'],
  projects: ['projects'],
  service: ['service'],
  many: [],
}

const BIZ_MOD: Record<string, string[]> = {
  services: ['crm', 'projects', 'finance', 'hr'],
  retail: ['pos', 'stock', 'purchase', 'finance', 'crm'],
  wholesale: ['stock', 'purchase', 'finance', 'crm'],
  manufacturing: ['production', 'stock', 'purchase', 'finance', 'crm'],
  service: ['crm', 'service', 'stock'],
  construction: ['projects', 'purchase', 'finance', 'hr', 'stock'],
  it: ['crm', 'projects', 'finance', 'service'],
  other: ['crm', 'finance', 'projects'],
}

const PROBLEM_TASK: Record<string, string> = {
  leads: 'Stop losing leads and customers',
  sales: 'Control sales at every stage',
  money: 'A live picture of money and profit',
  stock: 'Accurate stock levels',
  purchase: 'Control over purchasing and suppliers',
  production: 'Planning and control of manufacturing',
  hr: 'Staff records and payroll',
  projects: 'Tasks and projects in one place',
  service: 'Control over service and customer tickets',
  many: 'One system instead of scattered apps',
}

interface Answers {
  biz: string | null
  problems: string[]
  team: string | null
  complexity: string | null
  support: string | null
}

const EMPTY: Answers = { biz: null, problems: [], team: null, complexity: null, support: null }

/** External quiz start with a known industry (detail.biz — option id of the first question). */
export const QUIZ_START_EVENT = 'habibi:start-quiz'

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260319_055001_8e16d972-3b2b-441c-86ad-2901a54682f9.mp4'

/* ──────────────────────────────────────────────────────────────
   Recommendation logic and business map
   ────────────────────────────────────────────────────────────── */

function recommend(a: Answers): Tier {
  const teamW = a.team === 'big' ? 2 : a.team === 'small' ? 1 : 0
  const cplW = a.complexity === 'complex' ? 2 : a.complexity === 'several' ? 1 : 0
  const supW = a.support === 'manager' || a.support === 'expert' ? 2 : a.support === 'standard' ? 1 : 0

  let score = Math.max(teamW, cplW, supW)

  const heavyBiz = ['manufacturing', 'construction', 'wholesale'].includes(a.biz || '')
  if (heavyBiz) score = Math.max(score, 1)
  if (a.problems.includes('production')) score = Math.max(score, 1)
  if (a.problems.length >= 5 || a.problems.includes('many')) score = Math.max(score, 1)
  // A dedicated manager always means Premium
  if (a.support === 'manager') score = 2

  return score >= 2 ? 'premium' : score === 1 ? 'plus' : 'habibi'
}

function computeMap(a: Answers): { label: string; pct: number }[] {
  const scores: Record<string, number> = {}
  a.problems.forEach((p) => (PROBLEM_MOD[p] || []).forEach((m) => (scores[m] = (scores[m] || 0) + 55)))
  ;(BIZ_MOD[a.biz || ''] || []).forEach((m, i) => (scores[m] = (scores[m] || 0) + Math.max(30, 46 - i * 4)))
  if (a.problems.includes('many')) Object.keys(MOD).forEach((m) => (scores[m] = (scores[m] || 0) + 15))

  return Object.entries(scores)
    .map(([m, s]) => ({ label: MOD[m], pct: Math.min(100, s) }))
    .filter((x) => x.pct > 0)
    .sort((x, y) => y.pct - x.pct)
    .slice(0, 7)
}

/* ──────────────────────────────────────────────────────────────
   Component
   ────────────────────────────────────────────────────────────── */

export default function Quiz() {
  // step: 0 — intro, 1..5 — questions, 6 — result
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Answers>(EMPTY)
  const sectionRef = useRef<HTMLElement>(null)
  const firstRender = useRef(true)

  // Instantly scroll to the top of the section so the new question is at the top (important
  // on mobile: otherwise after "Next" the screen stays at the bottom). The position is
  // computed by hand: scrollIntoView overshoots the section on this long page.
  const scrollToQuizTop = () => {
    const el = sectionRef.current
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY
    window.scrollTo({ top, behavior: 'instant' as ScrollBehavior })
  }

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    scrollToQuizTop()
  }, [step])

  // Started from the “What do you do?” block: the industry is already picked, so open question two.
  useEffect(() => {
    const onStart = (e: Event) => {
      const biz = (e as CustomEvent<{ biz?: string }>).detail?.biz ?? null
      setAnswers({ ...EMPTY, biz })
      setStep(biz ? 2 : 1)
      // The section sits far down and the page above it is still settling (video, images),
      // so the position is corrected on a second pass. Scrolling happens here as well as in
      // the [step] effect: a repeated start on the same step would not re-run it.
      requestAnimationFrame(scrollToQuizTop)
      window.setTimeout(scrollToQuizTop, 400)
    }
    window.addEventListener(QUIZ_START_EVENT, onStart)
    return () => window.removeEventListener(QUIZ_START_EVENT, onStart)
  }, [])

  const totalQ = QUESTIONS.length
  const q = step >= 1 && step <= totalQ ? QUESTIONS[step - 1] : null

  const isAnswered = (question: Question) => {
    const v = answers[question.key]
    return question.multi ? (v as string[]).length > 0 : Boolean(v)
  }

  const selectOption = (question: Question, optId: string) => {
    if (question.multi) {
      setAnswers((a) => {
        const arr = a.problems.includes(optId)
          ? a.problems.filter((x) => x !== optId)
          : [...a.problems, optId]
        return { ...a, problems: arr }
      })
    } else {
      setAnswers((a) => ({ ...a, [question.key]: optId }))
      // auto-advance after a short pause so the selection is visible
      window.setTimeout(() => setStep((s) => Math.min(totalQ + 1, s + 1)), 280)
    }
  }

  const reset = () => {
    setAnswers(EMPTY)
    setStep(0)
  }

  return (
    <section
      id="podbor"
      ref={sectionRef}
      className="relative overflow-hidden bg-black px-6 py-24 md:px-12 md:py-32 lg:px-16"
    >
      {/* Background video */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src={VIDEO_URL} type="video/mp4" />
      </video>
      {/* Balanced dimming (not too dark, not washed out) */}
      <div className="pointer-events-none absolute inset-0 bg-black/40" />
      {/* Edges fade to black for a seamless join */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black via-black/15 to-black" />

      <div className="relative z-10 mx-auto max-w-3xl">
        {/* ── Intro ── */}
        {step === 0 && (
          <div key="intro" className="text-center [animation:fadeSlideUp_0.6s_ease_both]">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-white/60">
              <Sparkles size={13} /> Find your plan
            </p>
            <h2 className="mx-auto max-w-2xl text-3xl font-medium leading-tight tracking-tight text-white sm:text-4xl md:text-5xl">
              Which Habibi fits your business?
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/60 md:text-lg">
              Answer 5 questions — and we'll suggest a plan and show which Habibi features will help
              your business specifically.
            </p>
            <p className="mt-3 text-sm text-white/40">It takes less than a minute.</p>
            <div className="mt-9 flex justify-center">
              <LiquidButton size="lg" onClick={() => setStep(1)} className="rounded-full text-white">
                Find out now
                <ArrowRight size={16} />
              </LiquidButton>
            </div>
          </div>
        )}

        {/* ── Questions ── */}
        {q && (
          <div key={step} className="[animation:fadeSlideUp_0.45s_ease_both]">
            {/* Progress */}
            <div className="mb-8">
              <div className="mb-3 flex items-center justify-between text-xs font-medium uppercase tracking-widest text-white/40">
                <span>
                  Question {step} of {totalQ}
                </span>
                <span>{Math.round((step / totalQ) * 100)}%</span>
              </div>
              <div className="h-1 w-full overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-white transition-all duration-500 ease-out"
                  style={{ width: `${(step / totalQ) * 100}%` }}
                />
              </div>
            </div>

            <h3 className="text-2xl font-medium leading-tight tracking-tight text-white sm:text-3xl">
              {q.title}
            </h3>
            {q.hint && <p className="mt-2 text-sm text-white/50">{q.hint}</p>}

            <div className={`mt-7 grid gap-3 ${q.multi ? 'sm:grid-cols-2' : 'sm:grid-cols-2'}`}>
              {q.options.map((opt) => {
                const selected = q.multi
                  ? answers.problems.includes(opt.id)
                  : answers[q.key] === opt.id
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => selectOption(q, opt.id)}
                    className={`group flex items-start gap-3 rounded-2xl border p-4 text-left backdrop-blur-md transition-all duration-200 ${
                      selected
                        ? 'border-white/40 bg-white/[0.14] shadow-[0_0_24px_rgba(255,255,255,0.12)]'
                        : 'border-white/10 bg-black/30 hover:-translate-y-0.5 hover:border-white/25 hover:bg-black/45'
                    }`}
                  >
                    <span className="text-xl leading-none">{opt.emoji}</span>
                    <span className="flex-1">
                      <span className="block text-sm font-medium text-white">{opt.label}</span>
                      {opt.desc && (
                        <span className="mt-1 block text-xs leading-relaxed text-white/45">
                          {opt.desc}
                        </span>
                      )}
                    </span>
                    {q.multi && (
                      <span
                        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors ${
                          selected ? 'border-white bg-white text-black' : 'border-white/20'
                        }`}
                      >
                        {selected && <Check size={13} strokeWidth={3} />}
                      </span>
                    )}
                  </button>
                )
              })}
            </div>

            {/* Navigation */}
            <div className="mt-8 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep((s) => s - 1)}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/10 px-4 py-2 text-sm font-medium text-white/60 transition-colors hover:border-white/25 hover:text-white"
              >
                <ArrowLeft size={15} /> Back
              </button>

              {q.multi && (
                <LiquidButton
                  size="sm"
                  onClick={() => isAnswered(q) && setStep((s) => s + 1)}
                  className={`rounded-full text-white ${
                    isAnswered(q) ? '' : 'pointer-events-none opacity-40'
                  }`}
                >
                  Next
                  <ArrowRight size={15} />
                </LiquidButton>
              )}
            </div>
          </div>
        )}

        {/* ── Result ── */}
        {step === totalQ + 1 && <Result answers={answers} onReset={reset} />}
      </div>
    </section>
  )
}

/* ──────────────────────────────────────────────────────────────
   Result screen
   ────────────────────────────────────────────────────────────── */

function Result({ answers, onReset }: { answers: Answers; onReset: () => void }) {
  const { open } = useContact()
  const tier = recommend(answers)
  const info = TIERS_INFO[tier]
  const map = computeMap(answers)
  const tasks = answers.problems.map((p) => PROBLEM_TASK[p]).filter(Boolean).slice(0, 5)
  const bizLabel = BIZ_LABEL[answers.biz || 'other']
  const isPaid = tier !== 'habibi'

  return (
    <div className="[animation:fadeSlideUp_0.55s_ease_both]">
      <div className="text-center">
        <p className="mb-3 text-sm font-medium uppercase tracking-widest text-white/40">
          Your result
        </p>
        <h2 className="text-3xl font-medium leading-tight tracking-tight text-white sm:text-4xl">
          🎯 Your business fits{' '}
          <span className="whitespace-nowrap text-white">{info.name}</span>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/60">
          You work in {bizLabel} and want to bring your key processes into one system.{' '}
          {info.name} — {info.tagline.toLowerCase()}.
        </p>
      </div>

      <div className="mt-10 grid gap-4 lg:grid-cols-2">
        {/* Main priorities */}
        <div className="rounded-2xl border border-white/10 bg-black/30 p-6 backdrop-blur-md">
          <h3 className="mb-4 text-lg font-medium text-white">Your main priorities right now</h3>
          {tasks.length > 0 ? (
            <ul className="space-y-3">
              {tasks.map((t) => (
                <li key={t} className="flex items-start gap-3 text-sm text-white/70">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/10">
                    <Check size={12} strokeWidth={3} className="text-white/90" />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-white/50">
              Bring your key business processes into one system and get organized.
            </p>
          )}
        </div>

        {/* Business map */}
        <div className="rounded-2xl border border-white/10 bg-black/30 p-6 backdrop-blur-md">
          <h3 className="mb-4 text-lg font-medium text-white">Your business digitalization map</h3>
          <div className="space-y-3">
            {map.map((m) => (
              <div key={m.label}>
                <div className="mb-1 flex items-center justify-between text-xs">
                  <span className="text-white/70">{m.label}</span>
                  <span className="text-white/40">{m.pct}%</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-white/80 [animation:barGrow_0.9s_cubic-bezier(0.16,1,0.3,1)_both]"
                    style={{ width: `${m.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs leading-relaxed text-white/40">
            Habibi brings these processes into one ecosystem — you'll see the path of goods and money
            at every stage.
          </p>
        </div>
      </div>

      {/* Recommended plan card */}
      <div className="mt-4 overflow-hidden rounded-2xl border border-white/20 bg-black/40 p-7 backdrop-blur-md">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-widest text-white/40">
              Recommended plan
            </p>
            <h3 className="mt-1 text-2xl font-semibold text-white">{info.name}</h3>
            <p className="mt-1 text-sm text-white/55">{info.tagline}</p>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-bold tracking-tight text-white">{info.price}</span>
            {info.period && <span className="text-sm text-white/50">{info.period}</span>}
          </div>
        </div>

        <div className="mt-6 grid gap-x-6 gap-y-2 sm:grid-cols-2">
          {info.features.map((f) => (
            <div key={f} className="flex items-center gap-2.5 text-sm text-white/75">
              <Check size={16} className="shrink-0 text-white/50" strokeWidth={2.5} />
              {f}
            </div>
          ))}
        </div>

        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <LiquidButton
            size="lg"
            onClick={() => open(info.name)}
            className="rounded-full text-white"
          >
            Choose {info.name}
            <ArrowRight size={16} />
          </LiquidButton>
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-2.5 text-sm font-medium text-white/70 transition-colors hover:border-white/30 hover:text-white"
          >
            <RotateCcw size={15} /> Start over
          </button>
        </div>

        {isPaid && (
          <p className="mt-5 border-t border-white/10 pt-5 text-sm leading-relaxed text-white/50">
            You can start for free with{' '}
            <button
              onClick={() => open('Habibi')}
              className="font-medium text-white underline-offset-4 hover:underline"
            >
              Habibi
            </button>{' '}
            — when your business is ready to grow, move up to {info.name}.
          </p>
        )}
      </div>
    </div>
  )
}
