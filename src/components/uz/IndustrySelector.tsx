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
  /** id варианта первого вопроса квиза — квиз откроется сразу на втором вопросе. */
  quizBiz?: string
  cta?: string
}

const INDUSTRIES: Industry[] = [
  {
    key: 'shop',
    quizBiz: 'retail',
    Icon: Store,
    label: 'Chakana doʻkon',
    headline: 'Savdo, qoldiqlar, xaridlar va foyda — nazorat ostida.',
    text: 'Habibi savdo, ombor, xaridlar, mijozlar, xodimlar va moliyani boshqarishga yordam beradi. Bitta doʻkon uchun ham, butun tarmoq uchun ham ishlaydi.',
  },
  {
    key: 'restaurant',
    quizBiz: 'services',
    Icon: UtensilsCrossed,
    label: 'Restoran yoki kafe',
    headline: 'Muassasangizni yuritish uchun kerak boʻlgan hamma narsa — bir joyda.',
    text: 'Har bir filial boʻyicha savdo, masalliqlar, ombor, xaridlar, xodimlar, xarajatlar va foydani kuzatib boring.',
  },
  {
    key: 'construction',
    quizBiz: 'construction',
    Icon: HardHat,
    label: 'Qurilish kompaniyasi',
    headline: 'Birinchi mijozdan loyihani topshirishgacha — hammasi nazorat ostida.',
    text: 'Har bir obyekt boʻyicha loyihalar, vazifalar, materiallar, xaridlar, xodimlar, xarajatlar va foydani boshqaring.',
  },
  {
    key: 'realestate',
    quizBiz: 'services',
    Icon: Building2,
    label: 'Koʻchmas mulk',
    headline: 'Mijozlar, obyektlar, bitimlar va komissiyalar — yagona tizimda.',
    text: 'Xaridorlar, ijarachilar, obyektlar, koʻriklar, shartnomalar, hujjatlar va har bir bitimning moliyaviy natijasini kuzatib boring.',
  },
  {
    key: 'hotel',
    quizBiz: 'services',
    Icon: BedDouble,
    label: 'Mehmonxona',
    headline: 'Mehmonlar va bronlarni tartibsizliksiz boshqaring.',
    text: 'Habibi bronlar, xonalar, mehmonlar, xodimlar, qoʻshimcha xizmatlar, xaridlar va moliyani birlashtiradi.',
  },
  {
    key: 'tourism',
    quizBiz: 'services',
    Icon: Plane,
    label: 'Sayohat kompaniyasi',
    headline: 'Mijoz soʻrovidan tur yakunigacha — hammasi bitta tizimda.',
    text: 'Turlar, Umra va Haj, hujjatlar, toʻlovlar, transferlar, mijozlar va xodimlarni boshqaring.',
  },
  {
    key: 'logistics',
    quizBiz: 'services',
    Icon: Truck,
    label: 'Logistika kompaniyasi',
    headline: 'Buyurtmalar, haydovchilar, marshrutlar va xarajatlar — doim nazorat ostida.',
    text: 'Har bir reys boʻyicha yuklar, mijozlar, transport, yetkazib berishlar, vazifalar va foydani kuzatib boring.',
  },
  {
    key: 'manufacturing',
    quizBiz: 'manufacturing',
    Icon: Factory,
    label: 'Ishlab chiqarish',
    headline: 'Xomashyodan tayyor mahsulotgacha — toʻliq nazorat.',
    text: 'Ishlab chiqarishni rejalashtiring, xomashyo, ombor, tannarx, savdo va moliyani boshqaring.',
  },
  {
    key: 'services',
    quizBiz: 'it',
    Icon: Code,
    label: 'Xizmatlar yoki IT-kompaniya',
    headline: 'Mijozlar, loyihalar, vazifalar va toʻlovlar — bir joyda.',
    text: 'Habibi agentliklar, konsalting, yuridik firmalar, IT-jamoalar va xizmat sotadigan har qanday kompaniya uchun juda mos.',
  },
  {
    key: 'education',
    quizBiz: 'services',
    Icon: GraduationCap,
    label: 'Taʼlim biznesi',
    headline: 'Oʻquvchilar, jadvallar, xodimlar va toʻlovlar — cheksiz jadvallarsiz.',
    text: 'Oʻquv markazi, til maktabi, onlayn kurslar yoki akademiyani bitta tizimdan boshqaring.',
  },
  {
    key: 'other',
    Icon: Sparkles,
    label: 'Oʻz sohangizni topmadingizmi?',
    headline: 'Habibi har qanday kichik va oʻrta biznesga oson moslashadi.',
    text: 'Kompaniyangiz nima bilan shugʻullanishini ayting — siz uchun tayyor yechimni koʻrsatamiz.',
    cta: 'Biznesingiz haqida gapirib bering',
  },
]

export default function IndustrySelector() {
  const [active, setActive] = useState(0)
  const { open } = useContact()
  const industry = INDUSTRIES[active]

  // Квиз сам скроллит к себе при смене шага — достаточно диспатчить событие.
  const startQuiz = (biz: string) => {
    window.dispatchEvent(new CustomEvent(QUIZ_START_EVENT, { detail: { biz } }))
  }

  return (
    <section
      id="biznes"
      className="relative overflow-hidden bg-black px-6 py-24 md:px-12 md:py-32 lg:px-16"
    >
      {/* Фоновое видео */}
      <video
        className="absolute inset-0 h-full w-full object-cover object-center"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src={VIDEO_URL} type="video/mp4" />
      </video>
      {/* Затемнение — текст и чипы читаются поверх видео */}
      <div className="pointer-events-none absolute inset-0 bg-black/45" />
      {/* Края уходят в чёрный для бесшовного стыка с соседними секциями */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black via-black/15 to-black" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <Reveal>
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-white/40">
            Habibi biznesingiz uchun
          </p>
          <h2 className="max-w-3xl text-2xl font-medium leading-tight tracking-tight text-white sm:text-3xl md:text-4xl">
            Qanday biznes yuritasiz?
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/60 md:text-lg">
            Habibi turli biznes turlari uchun tayyor yechimlarga ega. Oʻzingiznikini tanlang —
            va kundalik boshqaruvni qanday osonlashtirish mumkinligini koʻring.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div role="tablist" aria-label="Sohalar" className="mt-10 flex flex-wrap gap-2.5">
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

          {/* Перемонтирование по key повторяет fadeSlideUp при переключении */}
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
                  {industry.cta ?? 'Biznesingizda sinab koʻring'}
                </LiquidButton>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
