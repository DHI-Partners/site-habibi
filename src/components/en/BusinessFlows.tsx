import { Fragment, useState } from 'react'
import {
  // Tab (business type) icons
  ShoppingCart,
  Utensils,
  Wrench,
  Hotel,
  Building2,
  // Block icons (hospitality)
  Globe,
  BedDouble,
  KeyRound,
  SprayCan,
  ConciergeBell,
  // Block icons (real estate)
  MapPin,
  FileText,
  Landmark,
  // Flow block icons
  PhoneCall,
  Users,
  Headphones,
  ListChecks,
  Warehouse,
  Route,
  Truck,
  CheckCircle2,
  CreditCard,
  Wallet,
  BarChart3,
  Shield,
  Smartphone,
  ChefHat,
  PackageCheck,
  Bike,
  MessageSquare,
  CalendarCheck,
  ClipboardList,
  HardHat,
  ClipboardCheck,
  Repeat,
  // "Chaos" + utility icons
  MessageCircle,
  Table2,
  NotebookPen,
  Calculator,
  Phone,
  Instagram,
  Files,
  Boxes,
  Unlink,
  TrendingDown,
  ChevronRight,
  ChevronDown,
  ArrowDown,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Reveal } from '../Reveal'
import Starfield from '../Starfield'

/* ─── Scattered tools "the way it is now" ─── */

interface Tool {
  icon: LucideIcon
  label: string
  rot: number
}

const CHAOS: Tool[] = [
  { icon: MessageCircle, label: 'Leads in WhatsApp', rot: -3 },
  { icon: Table2, label: 'Inventory in Excel', rot: 2 },
  { icon: NotebookPen, label: 'Finances in a notebook', rot: -1.5 },
  { icon: Instagram, label: 'Orders in Instagram Direct', rot: 2.5 },
  { icon: Phone, label: 'Untracked calls', rot: -2 },
  { icon: Boxes, label: 'Stock counted by eye', rot: 1.5 },
  { icon: Files, label: 'Contracts in folders', rot: -2.5 },
  { icon: Calculator, label: 'Profit on a calculator', rot: 3 },
]

/* ─── What the chaos costs (average estimates for SMBs) ─── */

interface Stat {
  value: string
  label: string
}

const STATS: Stat[] = [
  { value: 'up to 20%', label: 'of profit lost to errors and manual bookkeeping' },
  { value: '~30%', label: 'of leads go unanswered or get lost' },
  { value: '×2', label: 'longer to process each order' },
  { value: 'up to 15%', label: 'of goods — mis-sorting and write-offs' },
]

/* ─── Process flows by business type (Doctor Ali style) ─── */

interface Block {
  icon: LucideIcon
  title: string
  points: string[]
}

interface Group {
  label: string
  blocks: Block[]
}

interface Flow {
  key: string
  label: string
  icon: LucideIcon
  groups: Group[]
}

const FLOWS: Flow[] = [
  {
    key: 'trade',
    label: 'Retail & delivery',
    icon: ShoppingCart,
    groups: [
      {
        label: 'Order & processing',
        blocks: [
          { icon: PhoneCall, title: 'Order channels', points: ['Call & website', 'Telegram, Instagram', 'Ads', 'Repeat order'] },
          { icon: Users, title: 'CRM: lead & customer', points: ['Auto-created lead', 'Customer lookup', 'Search by phone', 'History & debts'] },
          { icon: Headphones, title: 'Call center', points: ['Product selection', 'Address & time', 'Payment method', 'Confirmation'] },
          { icon: ListChecks, title: 'Order statuses', points: ['New, confirmed', 'Picked in warehouse', 'With courier', 'Delivered'] },
        ],
      },
      {
        label: 'Warehouse & delivery',
        blocks: [
          { icon: Warehouse, title: 'Warehouse / WMS', points: ['Receiving & picking', 'QR verification', 'Packing', 'Accurate stock'] },
          { icon: Route, title: 'Dispatcher & route', points: ['Assign to courier', 'Group by area', 'Optimal route', 'Load control'] },
          { icon: Truck, title: 'Courier', points: ['Orders for the day', 'Navigation & GPS', 'Photo & signature', 'Offline mode'] },
          { icon: CheckCircle2, title: 'Delivery result', points: ['Delivered / returned', 'Customer rating', 'Payment received', 'Order completed'] },
        ],
      },
      {
        label: 'Money & control',
        blocks: [
          { icon: CreditCard, title: 'Payments', points: ['Cash, card', 'Click / Payme', 'Split payment', 'Refunds'] },
          { icon: Wallet, title: 'Finance', points: ['Revenue & expenses', 'Cost of goods', 'Net profit', 'Receivables'] },
          { icon: BarChart3, title: 'Analytics & KPIs', points: ['Daily sales', 'Staff KPIs', 'Top products', 'Reports'] },
          { icon: Shield, title: 'Integrations & security', points: ['Bitrix24, 1C', 'SMS service', 'Access rights', '2FA & audit log'] },
        ],
      },
    ],
  },
  {
    key: 'food',
    label: 'Restaurant / food delivery',
    icon: Utensils,
    groups: [
      {
        label: 'Order',
        blocks: [
          { icon: Smartphone, title: 'Order channels', points: ['Website & app', 'Phone call', 'Aggregators', 'Dine-in table'] },
          { icon: Users, title: 'Intake in CRM', points: ['Create order', 'Customer & history', 'Loyalty points', 'Comments'] },
          { icon: Utensils, title: 'Menu & items', points: ['Items & modifiers', 'Stop list', 'Cost price', 'Dish notes'] },
          { icon: ListChecks, title: 'Statuses', points: ['Accepted', 'Cooking', 'Packed', 'On the way / delivered'] },
        ],
      },
      {
        label: 'Kitchen & delivery',
        blocks: [
          { icon: ChefHat, title: 'Kitchen', points: ['Tickets by station', 'Dish status', 'Time control', 'Order queue'] },
          { icon: PackageCheck, title: 'Assembly', points: ['Picking', 'Packing', 'Item check', 'Ready for pickup'] },
          { icon: Bike, title: 'Courier & route', points: ['Assign to courier', 'GPS route', 'Status to customer', 'Delivery time'] },
          { icon: CheckCircle2, title: 'Result', points: ['Delivered', 'Rating', 'Return / complaint', 'Order completed'] },
        ],
      },
      {
        label: 'Money & control',
        blocks: [
          { icon: CreditCard, title: 'Payments', points: ['Online & card', 'Cash', 'Tips', 'Refund'] },
          { icon: Wallet, title: 'Finance', points: ['Revenue', 'Food cost', 'Dish cost', 'Profit'] },
          { icon: BarChart3, title: 'Analytics & KPIs', points: ['Top dishes', 'Average check', 'Shift KPIs', 'Reports'] },
          { icon: Shield, title: 'POS & integrations', points: ['Website & aggregators', 'POS / fiscal', 'SMS', 'Food inventory'] },
        ],
      },
    ],
  },
  {
    key: 'services',
    label: 'Services',
    icon: Wrench,
    groups: [
      {
        label: 'Request',
        blocks: [
          { icon: MessageSquare, title: 'Request channels', points: ['Website & call', 'Messengers', 'Ads', 'Returning customer'] },
          { icon: Users, title: 'CRM', points: ['Auto lead', 'Customer lookup', 'Request history', 'Lead source'] },
          { icon: CalendarCheck, title: 'Booking', points: ['Online calendar', 'Choose specialist', 'Free slot', 'Reminder'] },
          { icon: ListChecks, title: 'Statuses', points: ['New', 'Confirmed', 'In progress', 'Completed'] },
        ],
      },
      {
        label: 'Execution',
        blocks: [
          { icon: ClipboardList, title: 'Work order', points: ['Tasks & stages', 'Materials', 'Checklist', 'Assignee'] },
          { icon: HardHat, title: 'Specialist / crew', points: ['Schedule', 'Mobile app', 'Status', 'Work photos'] },
          { icon: Wrench, title: 'Delivery', points: ['Work stages', 'Quality control', 'Time tracking', 'Extra work'] },
          { icon: ClipboardCheck, title: 'Handover', points: ['Result photos', 'Customer signature', 'Warranty', 'Completion act'] },
        ],
      },
      {
        label: 'Money & control',
        blocks: [
          { icon: CreditCard, title: 'Payments', points: ['Card & cash', 'Installments', 'Prepayment', 'Receipt'] },
          { icon: Wallet, title: 'Finance', points: ['Revenue', 'Specialist payroll', 'Consumables', 'Profit'] },
          { icon: BarChart3, title: 'Analytics & KPIs', points: ['Requests & conversion', 'Specialist KPIs', 'Reviews', 'Reports'] },
          { icon: Repeat, title: 'Loyalty & security', points: ['Reminders', 'Repeat visit', 'SMS', 'Access rights'] },
        ],
      },
    ],
  },
  {
    key: 'hotel',
    label: 'Hospitality',
    icon: Hotel,
    groups: [
      {
        label: 'Booking & check-in',
        blocks: [
          { icon: Globe, title: 'Booking channels', points: ['Website & phone', 'Booking, Expedia', 'Messengers', 'Returning guests'] },
          { icon: Users, title: 'CRM & reservation', points: ['Create reservation', 'Guest profile', 'Visit history', 'Prepayment'] },
          { icon: BedDouble, title: 'Rates & rooms', points: ['Room types', 'Availability', 'Dynamic rates', 'Add-on services'] },
          { icon: KeyRound, title: 'Check-in / check-out', points: ['Online check-in', 'Key issue', 'Deposit', 'Early / late checkout'] },
        ],
      },
      {
        label: 'Stay & service',
        blocks: [
          { icon: Hotel, title: 'Room management', points: ['Occupancy grid', 'Room statuses', 'Room moves', 'Extensions'] },
          { icon: SprayCan, title: 'Housekeeping', points: ['Cleaning schedule', 'Room status', 'Checklist', 'Minibar'] },
          { icon: ConciergeBell, title: 'Guest services', points: ['Room service', 'Spa & restaurant', 'Transfer', 'Requests & complaints'] },
          { icon: Wrench, title: 'Maintenance', points: ['Repair requests', 'Inventory', 'Assignee', 'Deadline control'] },
        ],
      },
      {
        label: 'Money & control',
        blocks: [
          { icon: CreditCard, title: 'Payments & guest folio', points: ['Card & cash', 'Online payment', 'Single folio', 'Refunds'] },
          { icon: Wallet, title: 'Finance', points: ['Revenue by room', 'ADR & RevPAR', 'Expenses', 'Profit'] },
          { icon: BarChart3, title: 'Analytics & KPIs', points: ['Occupancy', 'Booking sources', 'Staff KPIs', 'Reports'] },
          { icon: Shield, title: 'Integrations & security', points: ['Booking / Expedia', 'Online POS', 'Locks & Wi-Fi', 'Access rights'] },
        ],
      },
    ],
  },
  {
    key: 'realty',
    label: 'Real estate',
    icon: Building2,
    groups: [
      {
        label: 'Lead & matching',
        blocks: [
          { icon: Globe, title: 'Lead channels', points: ['Website & call', 'Listing portals', 'Ads', 'Referrals'] },
          { icon: Users, title: 'CRM: lead', points: ['Auto-created lead', 'Qualification', 'Lead source', 'Contact history'] },
          { icon: Building2, title: 'Property database', points: ['Property catalog', 'Photos & floor plans', 'Price & status', 'Owner'] },
          { icon: MapPin, title: 'Matching & viewing', points: ['Match to request', 'Book a viewing', 'Viewing route', 'Feedback'] },
        ],
      },
      {
        label: 'Deal & documents',
        blocks: [
          { icon: ListChecks, title: 'Deal pipeline', points: ['Deal stages', 'Property reservation', 'Price negotiation', 'Probability'] },
          { icon: FileText, title: 'Documents & contract', points: ['Contract & addenda', 'Legal due diligence', 'E-signature', 'Templates'] },
          { icon: Landmark, title: 'Mortgage / installments', points: ['Bank applications', 'Approval', 'Down payment', 'Payment schedule'] },
          { icon: KeyRound, title: 'Closing & handover', points: ['Registration', 'Handover act', 'Key handover', 'Move-in'] },
        ],
      },
      {
        label: 'Money & control',
        blocks: [
          { icon: CreditCard, title: 'Payments & settlements', points: ['Payment & commission', 'Bank transfer & escrow', 'Refunds', 'Income schedule'] },
          { icon: Wallet, title: 'Finance', points: ['Revenue & commissions', 'Ad spend', 'Profit per deal', 'Receivables'] },
          { icon: BarChart3, title: 'Analytics & KPIs', points: ['Pipeline & conversion', 'Agent KPIs', 'Lead sources', 'Reports'] },
          { icon: Shield, title: 'Integrations & security', points: ['Listing portals', 'Banks & land registry', 'SMS', 'Access rights'] },
        ],
      },
    ],
  },
]

/* Arrow between blocks in a row: down on mobile, right on desktop. */
function StepArrow() {
  return (
    <div
      className="flex shrink-0 items-center justify-center self-center py-1 lg:py-0"
      aria-hidden="true"
    >
      {/* Connecting line (desktop) */}
      <span className="hidden h-px w-3 bg-gradient-to-r from-transparent to-white/30 lg:block" />
      {/* Arrow node */}
      <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/30 bg-white/[0.12] text-white shadow-[0_0_16px_-2px_rgba(255,255,255,0.45)] backdrop-blur-sm">
        <ChevronDown size={16} strokeWidth={2.75} className="lg:hidden" />
        <ChevronRight size={16} strokeWidth={2.75} className="hidden lg:block" />
      </span>
      <span className="hidden h-px w-3 bg-gradient-to-l from-transparent to-white/30 lg:block" />
    </div>
  )
}

export default function BusinessFlows() {
  const [active, setActive] = useState(0)
  const flow = FLOWS[active]
  // Continuous block numbering 01…12 across the whole flow
  let counter = 0

  return (
    <section
      id="kak-rabotaet"
      className="relative overflow-hidden bg-black px-6 py-24 md:px-12 md:py-32 lg:px-16"
    >
      {/* Bright starry sky with shooting stars */}
      <Starfield bright shootingStars className="pointer-events-none absolute inset-0" />
      {/* Soft glow + edges fading to black for a seamless join */}
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.03] blur-[140px]" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Heading */}
        <Reveal>
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-white/40">
            How it works
          </p>
          <h2 className="max-w-3xl text-2xl font-medium leading-tight tracking-tight text-white sm:text-3xl md:text-4xl">
            From scattered tools to a single flow
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/60 md:text-lg">
            Small and mid-sized businesses live in a dozen disconnected tools: leads in messengers,
            inventory in Excel, finances in a notebook. Habibi brings the entire process into one
            system — for any kind of business.
          </p>
        </Reveal>

        {/* ── PART A: the way it is now (chaos) — highlighted red as a real problem ── */}
        <Reveal delay={0.05}>
          <div className="relative mt-14 overflow-hidden rounded-3xl border border-red-500/30 bg-red-950/[0.12] p-6 shadow-[0_0_50px_-10px_rgba(239,68,68,0.35)] backdrop-blur-md sm:p-8">
            {/* Red glow — a visual signal of the problem */}
            <div className="pointer-events-none absolute -left-12 -top-12 h-52 w-52 rounded-full bg-red-500/25 blur-[90px]" />
            <div className="pointer-events-none absolute -bottom-10 -right-8 h-44 w-44 rounded-full bg-rose-500/15 blur-[80px]" />

            <div className="relative mb-5 flex items-start gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-red-400/40 bg-red-500/15 text-red-300">
                <Unlink size={17} strokeWidth={2} />
              </span>
              <div>
                <div className="mb-1 flex flex-wrap items-center gap-2">
                  <h3 className="text-base font-semibold text-white">Sound familiar?</h3>
                  <span className="rounded-full border border-red-400/40 bg-red-500/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-red-300">
                    Problem
                  </span>
                </div>
                <p className="text-sm text-white/65">
                  Every tool stands alone — data is moved by hand, and some leads get lost.
                </p>
              </div>
            </div>

            <div className="relative flex flex-wrap items-center gap-2.5">
              {CHAOS.map((c) => (
                <span
                  key={c.label}
                  style={{ transform: `rotate(${c.rot}deg)` }}
                  className="inline-flex items-center gap-2 rounded-full border border-dashed border-red-400/35 bg-red-500/[0.07] px-3.5 py-2 text-sm text-red-50/85"
                >
                  <c.icon size={15} strokeWidth={1.75} className="text-red-300/80" />
                  {c.label}
                </span>
              ))}
            </div>

            {/* The cost of chaos — leaking profit and performance */}
            <div className="relative mt-6 border-t border-red-400/20 pt-5">
              <p className="mb-3 flex items-center gap-2 text-sm font-medium text-red-200">
                <TrendingDown size={16} strokeWidth={2} className="shrink-0" />
                The cost of chaos — profit and performance leak away
              </p>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {STATS.map((s) => (
                  <div
                    key={s.label}
                    className="rounded-xl border border-red-400/20 bg-red-500/[0.06] p-3.5"
                  >
                    <div className="text-xl font-bold text-red-300 sm:text-2xl">{s.value}</div>
                    <div className="mt-1 text-xs leading-relaxed text-white/55">{s.label}</div>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-[11px] text-white/30">
                *average loss estimates for small and mid-sized businesses
              </p>
            </div>
          </div>
        </Reveal>

        {/* ── Transition ── */}
        <Reveal delay={0.1}>
          <div className="mt-10 flex flex-col items-center text-center">
            <p className="text-base text-white/70 md:text-lg">
              With <span className="font-medium text-white">Habibi</span>, all of this becomes{' '}
              <span className="text-white">one connected flow</span>
            </p>
            <ArrowDown size={22} strokeWidth={2} className="mt-3 animate-bounce text-white/30" />
          </div>
        </Reveal>

        {/* ── PART B: tabs + detailed flow (Doctor Ali style) ── */}
        <Reveal delay={0.15}>
          {/* Business-type switcher tabs */}
          <div role="tablist" aria-label="Business types" className="mt-8 flex flex-wrap gap-2.5">
            {FLOWS.map((f, i) => {
              const isActive = i === active
              return (
                <button
                  key={f.key}
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
                  <f.icon size={16} strokeWidth={2} />
                  {f.label}
                </button>
              )
            })}
          </div>

          {/* Flow for the selected type (remount by key → re-runs fadeSlideUp) */}
          <div
            key={active}
            role="tabpanel"
            className="mt-8 rounded-3xl border border-white/10 bg-black/20 p-5 backdrop-blur-md [animation:fadeSlideUp_0.4s_ease_both] sm:p-7"
          >
            {flow.groups.map((group, gi) => (
              <div key={group.label}>
                {/* Arrow between group rows */}
                {gi > 0 && (
                  <div className="flex flex-col items-center py-2" aria-hidden="true">
                    <span className="h-4 w-px bg-white/25" />
                    <span className="my-1 flex h-9 w-9 items-center justify-center rounded-full border border-white/30 bg-white/[0.12] text-white shadow-[0_0_20px_-2px_rgba(255,255,255,0.5)] backdrop-blur-sm">
                      <ChevronDown size={20} strokeWidth={2.75} />
                    </span>
                    <span className="h-4 w-px bg-white/25" />
                  </div>
                )}

                {/* Stage row heading */}
                <div className="mb-3 flex items-center gap-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-white/70">
                    {group.label}
                  </span>
                  <span className="h-px flex-1 bg-gradient-to-r from-white/25 to-transparent" />
                </div>

                {/* Block row */}
                <div className="flex flex-col gap-2.5 lg:flex-row lg:items-stretch">
                  {group.blocks.map((b, bi) => {
                    counter += 1
                    const nn = String(counter).padStart(2, '0')
                    return (
                      <Fragment key={b.title}>
                        <div className="group flex flex-1 flex-col rounded-2xl border border-white/15 bg-gradient-to-b from-white/[0.09] to-white/[0.02] p-4 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1),0_10px_30px_-18px_rgba(0,0,0,0.9)] backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-white/35 hover:from-white/[0.14] hover:shadow-[0_0_26px_-6px_rgba(255,255,255,0.28)]">
                          <div className="mb-2.5 flex items-start gap-2">
                            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-white/25 bg-white/[0.16] text-xs font-bold text-white shadow-[0_0_12px_-4px_rgba(255,255,255,0.5)]">
                              {nn}
                            </span>
                            <b.icon
                              size={16}
                              strokeWidth={1.9}
                              className="mt-1.5 shrink-0 text-white/90"
                            />
                            <h4 className="mt-1 text-sm font-semibold leading-tight text-white">
                              {b.title}
                            </h4>
                          </div>
                          <ul className="space-y-1">
                            {b.points.map((p) => (
                              <li
                                key={p}
                                className="flex gap-1.5 text-xs leading-relaxed text-white/55"
                              >
                                <span className="mt-1 block h-1 w-1 shrink-0 rounded-full bg-white/40" />
                                {p}
                              </li>
                            ))}
                          </ul>
                        </div>
                        {bi < group.blocks.length - 1 && <StepArrow />}
                      </Fragment>
                    )
                  })}
                </div>
              </div>
            ))}

            {/* Legend — a single end-to-end flow */}
            <p className="mx-auto mt-6 max-w-3xl rounded-2xl border border-emerald-400/30 bg-emerald-400/[0.08] px-5 py-3.5 text-center text-sm font-medium leading-relaxed text-white sm:text-base">
              ⚡ All 12 blocks are linked into one end-to-end process — data passes between stages
              automatically, <span className="text-emerald-300">with no manual transfer and no losses</span>.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
