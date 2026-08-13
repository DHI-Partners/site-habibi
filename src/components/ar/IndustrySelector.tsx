import { useState } from 'react'
import {
  Store,
  UtensilsCrossed,
  HardHat,
  Building2,
  BedDouble,
  Plane,
  Truck,
  Factory,
  Code,
  GraduationCap,
  Sparkles,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Reveal } from '../Reveal'
import { LiquidButton } from '../ui/liquid-glass-button'
import { useContact } from './ContactProvider'
import { QUIZ_START_EVENT } from './Quiz'

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260619_191346_9d19d66e-86a4-47f7-8dc6-712c1788c3b2.mp4'

interface Industry {
  key: string
  Icon: LucideIcon
  label: string
  headline: string
  text: string
  /** معرّف خيار السؤال الأول في الاختبار — عندها يبدأ الاختبار من السؤال الثاني. */
  quizBiz?: string
  cta?: string
}

const INDUSTRIES: Industry[] = [
  {
    key: 'shop',
    quizBiz: 'retail',
    Icon: Store,
    label: 'متجر',
    headline: 'المبيعات والمخزون والمشتريات والأرباح — تحت السيطرة.',
    text: 'يساعدك Habibi على إدارة المبيعات والمخزون والمشتريات والعملاء والموظفين والمالية. مناسب لمتجر واحد أو لسلسلة متاجر.',
  },
  {
    key: 'restaurant',
    quizBiz: 'services',
    Icon: UtensilsCrossed,
    label: 'مطعم أو مقهى',
    headline: 'كل ما تحتاجه لإدارة منشأتك — في مكان واحد.',
    text: 'تحكّم في المبيعات والمواد والمخزون والمشتريات والموظفين والمصاريف وأرباح كل فرع.',
  },
  {
    key: 'construction',
    quizBiz: 'construction',
    Icon: HardHat,
    label: 'شركة مقاولات',
    headline: 'من أول عميل حتى تسليم المشروع — كل شيء تحت السيطرة.',
    text: 'أدر المشاريع والمهام والمواد والمشتريات والموظفين والمصاريف والأرباح لكل موقع.',
  },
  {
    key: 'realestate',
    quizBiz: 'services',
    Icon: Building2,
    label: 'عقارات',
    headline: 'العملاء والعقارات والصفقات والعمولات — في نظام واحد.',
    text: 'تابع المشترين والمستأجرين والعقارات والمعاينات والعقود والمستندات والنتيجة المالية لكل صفقة.',
  },
  {
    key: 'hotel',
    quizBiz: 'services',
    Icon: BedDouble,
    label: 'فندق',
    headline: 'أدر الضيوف والحجوزات دون فوضى.',
    text: 'يجمع Habibi الحجوزات والغرف والضيوف والموظفين والخدمات الإضافية والمشتريات والمالية.',
  },
  {
    key: 'tourism',
    quizBiz: 'services',
    Icon: Plane,
    label: 'سياحة وعمرة وحج',
    headline: 'من طلب العميل حتى نهاية الرحلة — كل شيء في نظام واحد.',
    text: 'أدر رحلات العمرة والحج والجولات السياحية والمستندات والمدفوعات والنقل والعملاء والموظفين.',
  },
  {
    key: 'logistics',
    quizBiz: 'services',
    Icon: Truck,
    label: 'شركة لوجستية',
    headline: 'الطلبات والسائقون والمسارات والمصاريف — دائماً تحت السيطرة.',
    text: 'تابع الشحنات والعملاء والمركبات والتوصيل والمهام وأرباح كل رحلة.',
  },
  {
    key: 'manufacturing',
    quizBiz: 'manufacturing',
    Icon: Factory,
    label: 'مصنع',
    headline: 'من شراء المواد الخام حتى المنتج النهائي — تحكّم كامل.',
    text: 'خطّط الإنتاج وأدر المواد الخام والمخزون والتكلفة والمبيعات والمالية.',
  },
  {
    key: 'services',
    quizBiz: 'it',
    Icon: Code,
    label: 'شركة خدمات أو تقنية',
    headline: 'العملاء والمشاريع والمهام والمدفوعات — في مكان واحد.',
    text: 'يناسب Habibi الوكالات والاستشارات والمكاتب القانونية وفرق التقنية وأي شركة تبيع خدمات.',
  },
  {
    key: 'education',
    quizBiz: 'services',
    Icon: GraduationCap,
    label: 'نشاط تعليمي',
    headline: 'الطلاب والجداول والموظفون والمدفوعات — بلا جداول متناثرة.',
    text: 'أدر مركز تدريب أو مدرسة لغات أو دورات عبر الإنترنت أو أكاديمية من نظام واحد.',
  },
  {
    key: 'other',
    Icon: Sparkles,
    label: 'لم تجد مجالك؟',
    headline: 'يتكيّف Habibi بسهولة مع أي نشاط صغير أو متوسط.',
    text: 'أخبرنا بما تعمل به شركتك — وسنعرض لك حلاً جاهزاً مصمماً لك بالضبط.',
    cta: 'أخبرنا عن نشاطك',
  },
]

export default function IndustrySelector() {
  const [active, setActive] = useState(0)
  const { open } = useContact()
  const industry = INDUSTRIES[active]

  // الاختبار يمرّر إلى نفسه عند تغيّر الخطوة، لذا يكفي إرسال الحدث.
  const startQuiz = (biz: string) => {
    window.dispatchEvent(new CustomEvent(QUIZ_START_EVENT, { detail: { biz } }))
  }

  return (
    <section
      id="biznes"
      className="relative overflow-hidden bg-black px-6 py-24 md:px-12 md:py-32 lg:px-16"
    >
      {/* فيديو الخلفية */}
      <video
        className="absolute inset-0 h-full w-full object-cover object-center"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src={VIDEO_URL} type="video/mp4" />
      </video>
      {/* تعتيم كي يبقى النص والأزرار واضحين فوق الفيديو */}
      <div className="pointer-events-none absolute inset-0 bg-black/45" />
      {/* الأطراف تتلاشى إلى الأسود لوصل سلس مع الأقسام المجاورة */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black via-black/15 to-black" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <Reveal>
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-white/40">
            Habibi لنشاطك التجاري
          </p>
          <h2 className="max-w-3xl text-2xl font-medium leading-tight tracking-tight text-white sm:text-3xl md:text-4xl">
            ما مجال عملك؟
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/60 md:text-lg">
            لدى Habibi حلول لمختلف أنواع الأعمال. اختر مجالك — واكتشف كيف تُبسّط إدارته اليومية.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div role="tablist" aria-label="القطاعات" className="mt-10 flex flex-wrap gap-2.5">
            {INDUSTRIES.map((ind, i) => {
              const isActive = i === active
              return (
                <button
                  key={ind.key}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActive(i)}
                  className={`inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? 'border-white/40 bg-white/[0.1] text-white shadow-[0_0_22px_rgba(255,255,255,0.12)]'
                      : 'border-white/10 text-white/55 hover:border-white/25 hover:text-white'
                  }`}
                >
                  <ind.Icon size={16} strokeWidth={2} />
                  {ind.label}
                </button>
              )
            })}
          </div>

          {/* إعادة التركيب عبر key تعيد تشغيل fadeSlideUp عند التبديل */}
          <div
            key={industry.key}
            role="tabpanel"
            className="mt-8 rounded-3xl border border-white/15 bg-white/[0.07] p-6 backdrop-blur-md [animation:fadeSlideUp_0.4s_ease_both] sm:p-8 md:min-h-[220px] md:p-10"
          >
            <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between md:gap-10">
              <div className="max-w-2xl">
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white">
                  <industry.Icon size={20} strokeWidth={1.75} />
                </div>
                <h3 className="text-xl font-semibold leading-snug text-white md:text-2xl">
                  {industry.headline}
                </h3>
                <p className="mt-4 text-base leading-relaxed text-white/60 md:text-lg">
                  {industry.text}
                </p>
              </div>
              <div className="shrink-0 md:pt-16">
                <LiquidButton
                  size="lg"
                  className="rounded-full text-white"
                  onClick={() =>
                    industry.quizBiz ? startQuiz(industry.quizBiz) : open('Habibi')
                  }
                >
                  {industry.cta ?? 'جرّب Habibi لنشاطك'}
                </LiquidButton>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
