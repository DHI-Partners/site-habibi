import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, Check, RotateCcw, Sparkles } from 'lucide-react'
import { LiquidButton } from '../ui/liquid-glass-button'
import { useContact } from './ContactProvider'

/* ──────────────────────────────────────────────────────────────
   Данные квиза
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
    title: 'Biznesingiz nima bilan shugʻullanadi?',
    hint: 'Mos variantni tanlang',
    options: [
      { id: 'services', emoji: '🏢', label: 'Xizmatlar' },
      { id: 'retail', emoji: '🛍️', label: 'Chakana savdo' },
      { id: 'wholesale', emoji: '📦', label: 'Ulgurji savdo' },
      { id: 'manufacturing', emoji: '🏭', label: 'Ishlab chiqarish' },
      { id: 'service', emoji: '🛠️', label: 'Taʼmirlash va servis' },
      { id: 'construction', emoji: '🏗️', label: 'Qurilish' },
      { id: 'it', emoji: '💻', label: 'IT / Digital' },
      { id: 'other', emoji: '📋', label: 'Boshqa' },
    ],
  },
  {
    key: 'problems',
    multi: true,
    title: 'Hozir biznesdagi asosiy muammo nima?',
    hint: 'Bir nechta variantni tanlash mumkin',
    options: [
      { id: 'leads', emoji: '🔴', label: 'Lidlar va mijozlarni yoʻqotamiz' },
      { id: 'sales', emoji: '🔴', label: 'Savdoni nazoratda tutish qiyin' },
      { id: 'money', emoji: '🔴', label: 'Foyda va pul oqimini tushunmayapmiz' },
      { id: 'stock', emoji: '🔴', label: 'Aniq ombor qoldiqlarini bilmaymiz' },
      { id: 'purchase', emoji: '🔴', label: 'Xaridlar va yetkazib beruvchilarni nazorat qilish qiyin' },
      { id: 'production', emoji: '🔴', label: 'Ishlab chiqarishni rejalashtirish va nazorat qilish qiyin' },
      { id: 'hr', emoji: '🔴', label: 'Xodimlar va oylikni boshqarish qiyin' },
      { id: 'projects', emoji: '🔴', label: 'Vazifalar va loyihalar turli tizimlarga sochilib ketgan' },
      { id: 'service', emoji: '🔴', label: 'Servis va murojaatlarni nazoratda tutish qiyin' },
      { id: 'many', emoji: '🔴', label: 'Bir-biriga bogʻlanmagan dasturlar juda koʻp' },
    ],
  },
  {
    key: 'team',
    multi: false,
    title: 'Habibiʼdan nechta odam foydalanadi?',
    options: [
      { id: 'solo', emoji: '👤', label: 'Faqat men' },
      { id: 'small', emoji: '👥', label: '2–5 kishi' },
      { id: 'big', emoji: '🏢', label: '5 kishidan koʻp' },
    ],
  },
  {
    key: 'complexity',
    multi: false,
    title: 'Biznes jarayonlaringiz qanchalik murakkab?',
    hint: 'Qancha yoʻnalishni yagona tizimga jamlash kerak',
    options: [
      { id: 'basic', emoji: '🟢', label: 'Faqat asosiylari', desc: 'Mijozlar, savdo, vazifalar, moliya' },
      { id: 'several', emoji: '🔵', label: 'Bir nechta jarayon', desc: 'Savdo + xaridlar + ombor + moliya' },
      { id: 'complex', emoji: '🟣', label: 'Murakkab biznes', desc: 'Savdo, xaridlar, ombor, ishlab chiqarish, HR, moliya, servis' },
    ],
  },
  {
    key: 'support',
    multi: false,
    title: 'Qanday darajadagi yordam kerak?',
    options: [
      { id: 'self', emoji: '🟢', label: 'Oʻzim sozlab, oʻzim oʻrganaman' },
      { id: 'standard', emoji: '🔵', label: 'Standart yordam yetarli' },
      { id: 'expert', emoji: '🟣', label: 'Joriy etishda yordam kerak' },
      { id: 'manager', emoji: '👑', label: 'Shaxsiy menejer kerak' },
    ],
  },
]

type Tier = 'habibi' | 'plus' | 'premium'

// Актуальная сетка 2026-08-18: бесплатного тарифа нет, есть демо 14 дней.
const TIERS_INFO: Record<
  Tier,
  { name: string; tagline: string; price: string; period: string; features: string[] }
> = {
  habibi: {
    name: 'Habibi',
    tagline: 'Biznesni boshqarishni boshlang',
    price: '€19',
    period: '/ oy',
    features: [
      'Mijozlar va savdo',
      'Ishlar va vazifalar',
      'Saytdan kelgan mijozlar',
      'Pul nazorat ostida',
      '10 tagacha foydalanuvchi',
      '2 tagacha integratsiya',
    ],
  },
  plus: {
    name: 'Habibi Pro',
    tagline: 'Biznesni yagona tizimga birlashtiring',
    price: '€49',
    period: '/ oy',
    features: [
      'Barcha 10 modul',
      'AI-agentlar',
      '50 tagacha foydalanuvchi',
      '5 tagacha integratsiya',
      'Bazaviy texnik yordam',
    ],
  },
  premium: {
    name: 'Habibi Premium',
    tagline: 'Biznesni ekspertlar yordamida kengaytiring',
    price: '€199',
    period: '/ oy',
    features: [
      'Barcha 10 modul',
      '100 tagacha foydalanuvchi',
      'Shaxsiy onboarding',
      'Ustuvor yordam',
      'Kengaytirilgan analitika',
    ],
  },
}

const BIZ_LABEL: Record<string, string> = {
  services: 'xizmatlar',
  retail: 'chakana savdo',
  wholesale: 'ulgurji savdo',
  manufacturing: 'ishlab chiqarish',
  service: 'taʼmirlash va servis',
  construction: 'qurilish',
  it: 'IT / Digital',
  other: 'oʻz sohangiz',
}

const MOD: Record<string, string> = {
  crm: 'Mijozlar va savdo',
  purchase: 'Xaridlar',
  stock: 'Mahsulotlar va qoldiqlar',
  production: 'Ishlab chiqarish',
  finance: 'Pul nazorat ostida',
  hr: 'Mening jamoam',
  projects: 'Ishlar va vazifalar',
  service: 'Sotuvdan keyingi mijozlar',
  pos: 'Chakana savdo (POS)',
  site: 'Saytdan kelgan mijozlar',
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
  leads: 'Lidlar va mijozlarni yoʻqotmaslik',
  sales: 'Savdoni har bosqichda nazorat qilish',
  money: 'Pul va foydaning jonli manzarasi',
  stock: 'Aniq ombor qoldiqlari',
  purchase: 'Xaridlar va yetkazib beruvchilar nazorati',
  production: 'Ishlab chiqarishni rejalashtirish va nazorat',
  hr: 'Xodimlar hisobi va oylik',
  projects: 'Vazifalar va loyihalar bir joyda',
  service: 'Servis va mijoz murojaatlari nazorati',
  many: 'Tarqoq dasturlar oʻrniga yagona tizim',
}

interface Answers {
  biz: string | null
  problems: string[]
  team: string | null
  complexity: string | null
  support: string | null
}

const EMPTY: Answers = { biz: null, problems: [], team: null, complexity: null, support: null }

/** Внешний запуск квиза с известной отраслью (detail.biz — id варианта первого вопроса). */
export const QUIZ_START_EVENT = 'habibi:start-quiz'

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260319_055001_8e16d972-3b2b-441c-86ad-2901a54682f9.mp4'

/* ──────────────────────────────────────────────────────────────
   Логика рекомендации и карта бизнеса
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
  // Персональный менеджер — всегда Premium
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
   Компонент
   ────────────────────────────────────────────────────────────── */

export default function Quiz() {
  // step: 0 — интро, 1..5 — вопросы, 6 — результат
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Answers>(EMPTY)
  const sectionRef = useRef<HTMLElement>(null)
  const firstRender = useRef(true)

  // Мгновенный скролл к началу секции, чтобы новый вопрос был сверху (важно
  // на мобильном: иначе после «Далее» экран остаётся внизу).
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

  // Запуск из блока «Qanday biznes yuritasiz?»: отрасль уже выбрана — открываем второй вопрос.
  useEffect(() => {
    const onStart = (e: Event) => {
      const biz = (e as CustomEvent<{ biz?: string }>).detail?.biz ?? null
      setAnswers({ ...EMPTY, biz })
      setStep(biz ? 2 : 1)
      // Секция далеко внизу, страница над ней ещё «оседает» (видео, картинки) —
      // позиция корректируется вторым проходом.
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
      // авто-переход после короткой паузы, чтобы выбор был виден
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
      {/* Фоновое видео */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src={VIDEO_URL} type="video/mp4" />
      </video>
      {/* Сбалансированное затемнение */}
      <div className="pointer-events-none absolute inset-0 bg-black/40" />
      {/* Края уходят в чёрный для бесшовного стыка */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black via-black/15 to-black" />

      <div className="relative z-10 mx-auto max-w-3xl">
        {/* ── Интро ── */}
        {step === 0 && (
          <div key="intro" className="text-center [animation:fadeSlideUp_0.6s_ease_both]">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-white/60">
              <Sparkles size={13} /> Tarif tanlash
            </p>
            <h2 className="mx-auto max-w-2xl text-3xl font-medium leading-tight tracking-tight text-white sm:text-4xl md:text-5xl">
              Biznesingizga qaysi Habibi mos keladi?
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/60 md:text-lg">
              5 ta savolga javob bering — sizga mos tarifni taklif qilamiz va Habibiʼning qaysi
              imkoniyatlari aynan sizning biznesingizga yordam berishini koʻrsatamiz.
            </p>
            <p className="mt-3 text-sm text-white/40">Bir daqiqadan kam vaqt oladi.</p>
            <div className="mt-9 flex justify-center">
              <LiquidButton size="lg" onClick={() => setStep(1)} className="rounded-full text-white">
                Hoziroq bilib oling
                <ArrowRight size={16} />
              </LiquidButton>
            </div>
          </div>
        )}

        {/* ── Вопросы ── */}
        {q && (
          <div key={step} className="[animation:fadeSlideUp_0.45s_ease_both]">
            {/* Прогресс */}
            <div className="mb-8">
              <div className="mb-3 flex items-center justify-between text-xs font-medium uppercase tracking-widest text-white/40">
                <span>
                  Savol {step} / {totalQ}
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

            {/* Навигация */}
            <div className="mt-8 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep((s) => s - 1)}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/10 px-4 py-2 text-sm font-medium text-white/60 transition-colors hover:border-white/25 hover:text-white"
              >
                <ArrowLeft size={15} /> Orqaga
              </button>

              {q.multi && (
                <LiquidButton
                  size="sm"
                  onClick={() => isAnswered(q) && setStep((s) => s + 1)}
                  className={`rounded-full text-white ${
                    isAnswered(q) ? '' : 'pointer-events-none opacity-40'
                  }`}
                >
                  Keyingisi
                  <ArrowRight size={15} />
                </LiquidButton>
              )}
            </div>
          </div>
        )}

        {/* ── Результат ── */}
        {step === totalQ + 1 && <Result answers={answers} onReset={reset} />}
      </div>
    </section>
  )
}

/* ──────────────────────────────────────────────────────────────
   Экран результата
   ────────────────────────────────────────────────────────────── */

function Result({ answers, onReset }: { answers: Answers; onReset: () => void }) {
  const { open } = useContact()
  const tier = recommend(answers)
  const info = TIERS_INFO[tier]
  const map = computeMap(answers)
  const tasks = answers.problems.map((p) => PROBLEM_TASK[p]).filter(Boolean).slice(0, 5)
  const bizLabel = BIZ_LABEL[answers.biz || 'other']

  return (
    <div className="[animation:fadeSlideUp_0.55s_ease_both]">
      <div className="text-center">
        <p className="mb-3 text-sm font-medium uppercase tracking-widest text-white/40">
          Sizning natijangiz
        </p>
        <h2 className="text-3xl font-medium leading-tight tracking-tight text-white sm:text-4xl">
          🎯 Biznesingizga{' '}
          <span className="whitespace-nowrap text-white">{info.name}</span> mos keladi
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/60">
          Siz {bizLabel} sohasida ishlaysiz va asosiy jarayonlarni yagona tizimga jamlamoqchisiz.{' '}
          {info.name} — {info.tagline.toLowerCase()}.
        </p>
      </div>

      <div className="mt-10 grid gap-4 lg:grid-cols-2">
        {/* Главные приоритеты */}
        <div className="rounded-2xl border border-white/10 bg-black/30 p-6 backdrop-blur-md">
          <h3 className="mb-4 text-lg font-medium text-white">Hozirgi asosiy vazifalaringiz</h3>
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
              Biznesning asosiy jarayonlarini yagona tizimga jamlang va tartib oʻrnating.
            </p>
          )}
        </div>

        {/* Карта бизнеса */}
        <div className="rounded-2xl border border-white/10 bg-black/30 p-6 backdrop-blur-md">
          <h3 className="mb-4 text-lg font-medium text-white">
            Biznesingizni raqamlashtirish xaritasi
          </h3>
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
            Habibi bu jarayonlarni yagona ekotizimga birlashtiradi — tovar va pul yoʻlini har
            bosqichda koʻrasiz.
          </p>
        </div>
      </div>

      {/* Карточка рекомендованного тарифа */}
      <div className="mt-4 overflow-hidden rounded-2xl border border-white/20 bg-black/40 p-7 backdrop-blur-md">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-widest text-white/40">
              Tavsiya etilgan tarif
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
            {info.name} tarifini tanlash
            <ArrowRight size={16} />
          </LiquidButton>
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-2.5 text-sm font-medium text-white/70 transition-colors hover:border-white/30 hover:text-white"
          >
            <RotateCcw size={15} /> Qaytadan boshlash
          </button>
        </div>

        <p className="mt-5 border-t border-white/10 pt-5 text-sm leading-relaxed text-white/50">
          Istalgan tarifni <span className="font-medium text-white">14 kun bepul</span> sinab
          koʻrishingiz mumkin — bank kartasi talab qilinmaydi.
        </p>
      </div>
    </div>
  )
}
