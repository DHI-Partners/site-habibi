import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, Check, RotateCcw, Sparkles } from 'lucide-react'
import { LiquidButton } from '../ui/liquid-glass-button'
import { useContact } from './ContactProvider'

/* ──────────────────────────────────────────────────────────────
   بيانات الاختبار
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
    title: 'ما مجال عمل شركتك؟',
    hint: 'اختر الخيار المناسب',
    options: [
      { id: 'services', emoji: '🏢', label: 'الخدمات' },
      { id: 'retail', emoji: '🛍️', label: 'تجارة التجزئة' },
      { id: 'wholesale', emoji: '📦', label: 'تجارة الجملة' },
      { id: 'manufacturing', emoji: '🏭', label: 'التصنيع' },
      { id: 'service', emoji: '🛠️', label: 'الصيانة والخدمات الفنية' },
      { id: 'construction', emoji: '🏗️', label: 'المقاولات والبناء' },
      { id: 'it', emoji: '💻', label: 'تقنية المعلومات / الديجيتال' },
      { id: 'other', emoji: '📋', label: 'مجال آخر' },
    ],
  },
  {
    key: 'problems',
    multi: true,
    title: 'ما أكبر مشكلة تواجه أعمالك الآن؟',
    hint: 'يمكنك اختيار أكثر من إجابة',
    options: [
      { id: 'leads', emoji: '🔴', label: 'نفقد الطلبات والعملاء' },
      { id: 'sales', emoji: '🔴', label: 'يصعب التحكم في المبيعات' },
      { id: 'money', emoji: '🔴', label: 'لا نفهم الأرباح وحركة الأموال' },
      { id: 'stock', emoji: '🔴', label: 'لا نعرف أرصدة المخزون بدقة' },
      { id: 'purchase', emoji: '🔴', label: 'يصعب التحكم في المشتريات والموردين' },
      { id: 'production', emoji: '🔴', label: 'يصعب تخطيط الإنتاج ومتابعته' },
      { id: 'hr', emoji: '🔴', label: 'يصعب إدارة الموظفين والرواتب' },
      { id: 'projects', emoji: '🔴', label: 'المهام والمشاريع مبعثرة بين الأنظمة' },
      { id: 'service', emoji: '🔴', label: 'يصعب متابعة الخدمة وطلبات العملاء' },
      { id: 'many', emoji: '🔴', label: 'برامج كثيرة غير مترابطة' },
    ],
  },
  {
    key: 'team',
    multi: false,
    title: 'كم عدد الأشخاص الذين سيستخدمون Habibi؟',
    options: [
      { id: 'solo', emoji: '👤', label: 'أنا فقط' },
      { id: 'small', emoji: '👥', label: 'من 2 إلى 5 أشخاص' },
      { id: 'big', emoji: '🏢', label: 'أكثر من 5 أشخاص' },
    ],
  },
  {
    key: 'complexity',
    multi: false,
    title: 'ما مدى تعقيد عملياتك التشغيلية؟',
    hint: 'كم مجالاً تريد جمعه في نظام واحد',
    options: [
      { id: 'basic', emoji: '🟢', label: 'المهام الأساسية فقط', desc: 'العملاء، المبيعات، المهام، المالية' },
      { id: 'several', emoji: '🔵', label: 'عدة عمليات', desc: 'المبيعات + المشتريات + المخزون + المالية' },
      { id: 'complex', emoji: '🟣', label: 'أعمال معقّدة', desc: 'المبيعات، المشتريات، المخزون، الإنتاج، الموارد البشرية، المالية، الخدمة' },
    ],
  },
  {
    key: 'support',
    multi: false,
    title: 'ما مستوى الدعم الذي تحتاجه؟',
    options: [
      { id: 'self', emoji: '🟢', label: 'سأُعدّه وأتعلّمه بنفسي' },
      { id: 'standard', emoji: '🔵', label: 'الدعم القياسي يكفي' },
      { id: 'expert', emoji: '🟣', label: 'أحتاج مساعدة في التنفيذ' },
      { id: 'manager', emoji: '👑', label: 'أحتاج مدير حساب مخصّص' },
    ],
  },
]

/** الصفحة العربية تعرض باقتين فقط (انظر Pricing) — لا توجد باقة مجانية. */
type Tier = 'pro' | 'premium'

const TIERS_INFO: Record<
  Tier,
  { name: string; tagline: string; price: string; period: string; features: string[] }
> = {
  pro: {
    name: 'Habibi Pro',
    tagline: 'النظام كاملاً مع التكاملات والمرافقة',
    price: '$290',
    period: '/شهريًا',
    features: [
      'جميع وحدات النظام العشر',
      'عدد غير محدود من المستخدمين',
      'التكاملات الأساسية',
      'التحليلات المتقدّمة',
      'صلاحيات وصول مرنة',
      'الدعم الفني ذو الأولوية',
    ],
  },
  premium: {
    name: 'Habibi Premium',
    tagline: 'حلّ فردي تُحدَّد تكلفته بعد تدقيق أعمالك',
    price: 'بعد التدقيق',
    period: '',
    features: [
      'كل ما في باقة «Habibi Pro»',
      'تدقيق وتحسين العمليات التشغيلية',
      'إعداد مخصّص يناسب أعمالك',
      'وحدات وتكاملات مخصّصة',
      'مدير حساب مخصّص',
      'التنفيذ وتدريب الفريق',
      'اتفاقية مستوى خدمة (SLA) ودعم 24/7',
    ],
  },
}

const BIZ_LABEL: Record<string, string> = {
  services: 'مجال الخدمات',
  retail: 'تجارة التجزئة',
  wholesale: 'تجارة الجملة',
  manufacturing: 'التصنيع',
  service: 'الصيانة والخدمات الفنية',
  construction: 'المقاولات والبناء',
  it: 'تقنية المعلومات',
  other: 'مجالك',
}

const MOD: Record<string, string> = {
  crm: 'العملاء والمبيعات',
  purchase: 'المشتريات',
  stock: 'المخزون',
  production: 'الإنتاج',
  finance: 'المال تحت السيطرة',
  hr: 'فريقي',
  projects: 'العمل والمهام',
  service: 'العملاء بعد البيع',
  pos: 'نقاط البيع (POS)',
  site: 'العملاء من الإنترنت',
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
  leads: 'إيقاف فقدان الطلبات والعملاء',
  sales: 'التحكم في المبيعات في كل مرحلة',
  money: 'صورة لحظية للأموال والأرباح',
  stock: 'أرصدة مخزون دقيقة',
  purchase: 'التحكم في المشتريات والموردين',
  production: 'تخطيط الإنتاج ومتابعته',
  hr: 'سجلات الموظفين والرواتب',
  projects: 'المهام والمشاريع في مكان واحد',
  service: 'التحكم في الخدمة وطلبات العملاء',
  many: 'نظام واحد بدل البرامج المبعثرة',
}

interface Answers {
  biz: string | null
  problems: string[]
  team: string | null
  complexity: string | null
  support: string | null
}

const EMPTY: Answers = { biz: null, problems: [], team: null, complexity: null, support: null }

/** تشغيل الاختبار من خارجه مع معرفة المجال (detail.biz — معرّف خيار السؤال الأول). */
export const QUIZ_START_EVENT = 'habibi:start-quiz'

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260319_055001_8e16d972-3b2b-441c-86ad-2901a54682f9.mp4'

/* ──────────────────────────────────────────────────────────────
   منطق التوصية وخريطة الأعمال
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
  // مدير الحساب المخصّص يعني باقة Premium دائماً
  if (a.support === 'manager') score = 2

  return score >= 2 ? 'premium' : 'pro'
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
   المكوّن
   ────────────────────────────────────────────────────────────── */

export default function Quiz() {
  // step: 0 — المقدّمة، 1..5 — الأسئلة، 6 — النتيجة
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Answers>(EMPTY)
  const sectionRef = useRef<HTMLElement>(null)
  const firstRender = useRef(true)

  // ننتقل فوراً إلى بداية القسم كي يظهر السؤال الجديد في الأعلى (مهم على الجوال).
  // نحسب الموضع يدوياً: scrollIntoView يتجاوز القسم في هذه الصفحة الطويلة.
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

  // التشغيل من قسم «ما مجال عملك؟»: المجال مُختار سلفاً، لذا نبدأ من السؤال الثاني.
  useEffect(() => {
    const onStart = (e: Event) => {
      const biz = (e as CustomEvent<{ biz?: string }>).detail?.biz ?? null
      setAnswers({ ...EMPTY, biz })
      setStep(biz ? 2 : 1)
      // القسم بعيد في الأسفل وارتفاع الصفحة فوقه ما زال يتغيّر (فيديو، صور)،
      // لذا نصحّح الموضع مرة أخرى. نمرّر هنا أيضاً وليس في تأثير [step] فقط:
      // التشغيل المتكرّر بالخطوة نفسها لا يعيد تنفيذه.
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
      // انتقال تلقائي بعد وقفة قصيرة كي يظهر الاختيار
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
      {/* فيديو الخلفية */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src={VIDEO_URL} type="video/mp4" />
      </video>
      {/* تعتيم متوازن */}
      <div className="pointer-events-none absolute inset-0 bg-black/40" />
      {/* الأطراف تتلاشى إلى الأسود لوصل سلس */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black via-black/15 to-black" />

      <div className="relative z-10 mx-auto max-w-3xl">
        {/* ── المقدّمة ── */}
        {step === 0 && (
          <div key="intro" className="text-center [animation:fadeSlideUp_0.6s_ease_both]">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-white/60">
              <Sparkles size={13} /> اختر باقتك
            </p>
            <h2 className="mx-auto max-w-2xl text-3xl font-medium leading-tight tracking-tight text-white sm:text-4xl md:text-5xl">
              أي باقة Habibi تناسب أعمالك؟
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/60 md:text-lg">
              أجب عن 5 أسئلة — وسنقترح الباقة المناسبة ونوضّح أي إمكانيات Habibi ستفيد أعمالك
              تحديداً.
            </p>
            <p className="mt-3 text-sm text-white/40">يستغرق الأمر أقل من دقيقة.</p>
            <div className="mt-9 flex justify-center">
              <LiquidButton size="lg" onClick={() => setStep(1)} className="rounded-full text-white">
                اعرف الآن
                <ArrowLeft size={16} />
              </LiquidButton>
            </div>
          </div>
        )}

        {/* ── الأسئلة ── */}
        {q && (
          <div key={step} className="[animation:fadeSlideUp_0.45s_ease_both]">
            {/* التقدّم */}
            <div className="mb-8">
              <div className="mb-3 flex items-center justify-between text-xs font-medium uppercase tracking-widest text-white/40">
                <span>
                  السؤال {step} من {totalQ}
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

            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {q.options.map((opt) => {
                const selected = q.multi
                  ? answers.problems.includes(opt.id)
                  : answers[q.key] === opt.id
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => selectOption(q, opt.id)}
                    className={`group flex items-start gap-3 rounded-2xl border p-4 text-start backdrop-blur-md transition-all duration-200 ${
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

            {/* التنقّل */}
            <div className="mt-8 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep((s) => s - 1)}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/10 px-4 py-2 text-sm font-medium text-white/60 transition-colors hover:border-white/25 hover:text-white"
              >
                <ArrowRight size={15} /> رجوع
              </button>

              {q.multi && (
                <LiquidButton
                  size="sm"
                  onClick={() => isAnswered(q) && setStep((s) => s + 1)}
                  className={`rounded-full text-white ${
                    isAnswered(q) ? '' : 'pointer-events-none opacity-40'
                  }`}
                >
                  التالي
                  <ArrowLeft size={15} />
                </LiquidButton>
              )}
            </div>
          </div>
        )}

        {/* ── النتيجة ── */}
        {step === totalQ + 1 && <Result answers={answers} onReset={reset} />}
      </div>
    </section>
  )
}

/* ──────────────────────────────────────────────────────────────
   شاشة النتيجة
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
        <p className="mb-3 text-sm font-medium uppercase tracking-widest text-white/40">نتيجتك</p>
        <h2 className="text-3xl font-medium leading-tight tracking-tight text-white sm:text-4xl">
          🎯 تناسب أعمالك باقة <span className="whitespace-nowrap text-white">{info.name}</span>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/60">
          أنت تعمل في {bizLabel} وتريد جمع عملياتك الأساسية في نظام واحد. {info.name} —{' '}
          {info.tagline}.
        </p>
      </div>

      <div className="mt-10 grid gap-4 lg:grid-cols-2">
        {/* الأولويات */}
        <div className="rounded-2xl border border-white/10 bg-black/30 p-6 backdrop-blur-md">
          <h3 className="mb-4 text-lg font-medium text-white">أولوياتك الآن</h3>
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
              اجمع عملياتك الأساسية في نظام واحد ونظّم أعمالك.
            </p>
          )}
        </div>

        {/* خريطة الرقمنة */}
        <div className="rounded-2xl border border-white/10 bg-black/30 p-6 backdrop-blur-md">
          <h3 className="mb-4 text-lg font-medium text-white">خريطة رقمنة أعمالك</h3>
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
            يجمع Habibi هذه العمليات في منظومة واحدة — سترى مسار البضائع والأموال في كل مرحلة.
          </p>
        </div>
      </div>

      {/* بطاقة الباقة المُوصى بها */}
      <div className="mt-4 overflow-hidden rounded-2xl border border-white/20 bg-black/40 p-7 backdrop-blur-md">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-widest text-white/40">
              الباقة المُوصى بها
            </p>
            <h3 className="mt-1 text-2xl font-semibold text-white">{info.name}</h3>
            <p className="mt-1 text-sm text-white/55">{info.tagline}</p>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-bold tracking-tight text-white" dir="ltr">
              {info.price}
            </span>
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
          <LiquidButton size="lg" onClick={() => open(info.name)} className="rounded-full text-white">
            اختر {info.name}
            <ArrowLeft size={16} />
          </LiquidButton>
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-2.5 text-sm font-medium text-white/70 transition-colors hover:border-white/30 hover:text-white"
          >
            <RotateCcw size={15} /> ابدأ من جديد
          </button>
        </div>

        {tier === 'pro' && (
          <p className="mt-5 border-t border-white/10 pt-5 text-sm leading-relaxed text-white/50">
            تحتاج حلاً مخصّصاً لأعمالك؟ باقة{' '}
            <button
              onClick={() => open('Habibi Premium')}
              className="font-medium text-white underline-offset-4 hover:underline"
            >
              Habibi Premium
            </button>{' '}
            تُبنى خصيصاً لك، وتُحدَّد تكلفتها بعد تدقيق أعمالك.
          </p>
        )}
      </div>
    </div>
  )
}
