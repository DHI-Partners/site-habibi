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
  /** Option id of the quiz's first question — the quiz then opens on question two. */
  quizBiz?: string
  cta?: string
}

const INDUSTRIES: Industry[] = [
  {
    key: 'shop',
    quizBiz: 'retail',
    Icon: Store,
    label: 'Retail store',
    headline: 'Sales, stock, purchasing and profit — under control.',
    text: 'Habibi helps you manage sales, inventory, purchasing, customers, staff and finances. Works for a single store or a whole chain.',
  },
  {
    key: 'restaurant',
    quizBiz: 'services',
    Icon: UtensilsCrossed,
    label: 'Restaurant or café',
    headline: 'Everything you need to run your venue — in one place.',
    text: 'Keep track of sales, ingredients, inventory, purchasing, staff, expenses and profit for every branch.',
  },
  {
    key: 'construction',
    quizBiz: 'construction',
    Icon: HardHat,
    label: 'Construction company',
    headline: 'From the first client to project handover — all under control.',
    text: 'Manage projects, tasks, materials, purchasing, staff, expenses and profit for every site.',
  },
  {
    key: 'realestate',
    quizBiz: 'services',
    Icon: Building2,
    label: 'Real estate',
    headline: 'Clients, properties, deals and commissions — in one system.',
    text: 'Track buyers, tenants, properties, viewings, contracts, documents and the financial result of every deal.',
  },
  {
    key: 'hotel',
    quizBiz: 'services',
    Icon: BedDouble,
    label: 'Hotel',
    headline: 'Manage guests and bookings without the chaos.',
    text: 'Habibi brings together bookings, rooms, guests, staff, extra services, purchasing and finances.',
  },
  {
    key: 'tourism',
    quizBiz: 'services',
    Icon: Plane,
    label: 'Travel company',
    headline: 'From the client’s request to the end of the tour — all in one system.',
    text: 'Manage tours, Umrah and Hajj, documents, payments, transfers, clients and staff.',
  },
  {
    key: 'logistics',
    quizBiz: 'services',
    Icon: Truck,
    label: 'Logistics company',
    headline: 'Orders, drivers, routes and expenses — always under control.',
    text: 'Track shipments, clients, vehicles, deliveries, tasks and profit for every trip.',
  },
  {
    key: 'manufacturing',
    quizBiz: 'manufacturing',
    Icon: Factory,
    label: 'Manufacturing',
    headline: 'From raw materials to finished goods — full control.',
    text: 'Plan production and manage raw materials, inventory, cost of goods, sales and finances.',
  },
  {
    key: 'services',
    quizBiz: 'it',
    Icon: Code,
    label: 'Services or IT company',
    headline: 'Clients, projects, tasks and payments — in one place.',
    text: 'Habibi is a perfect fit for agencies, consulting, law firms, IT teams and any company that sells services.',
  },
  {
    key: 'education',
    quizBiz: 'services',
    Icon: GraduationCap,
    label: 'Education business',
    headline: 'Students, schedules, staff and payments — without endless spreadsheets.',
    text: 'Run a learning centre, language school, online courses or an academy from one system.',
  },
  {
    key: 'other',
    Icon: Sparkles,
    label: 'Didn’t find your industry?',
    headline: 'Habibi easily adapts to any small or medium business.',
    text: 'Tell us what your company does — and we’ll show you a ready-made solution built for you.',
    cta: 'Tell us about your business',
  },
]

export default function IndustrySelector() {
  const [active, setActive] = useState(0)
  const { open } = useContact()
  const industry = INDUSTRIES[active]

  // The quiz scrolls to itself when the step changes, so dispatching the event is enough.
  const startQuiz = (biz: string) => {
    window.dispatchEvent(new CustomEvent(QUIZ_START_EVENT, { detail: { biz } }))
  }

  return (
    <section
      id="biznes"
      className="relative overflow-hidden bg-black px-6 py-24 md:px-12 md:py-32 lg:px-16"
    >
      {/* Background video */}
      <video
        className="absolute inset-0 h-full w-full object-cover object-center"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src={VIDEO_URL} type="video/mp4" />
      </video>
      {/* Dimming so the copy and chips stay readable over the video */}
      <div className="pointer-events-none absolute inset-0 bg-black/45" />
      {/* Edges fade to black for a seamless join with the neighbouring sections */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black via-black/15 to-black" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <Reveal>
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-white/40">
            Habibi for your business
          </p>
          <h2 className="max-w-3xl text-2xl font-medium leading-tight tracking-tight text-white sm:text-3xl md:text-4xl">
            What do you do?
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/60 md:text-lg">
            Habibi has solutions for different kinds of business. Pick yours — and see how to make
            its day-to-day management easier.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div role="tablist" aria-label="Industries" className="mt-10 flex flex-wrap gap-2.5">
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

          {/* Remount by key replays fadeSlideUp on switch */}
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
                  {industry.cta ?? 'Try it for your business'}
                </LiquidButton>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
