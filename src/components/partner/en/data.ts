import {
  BarChart3,
  Briefcase,
  Building2,
  Code2,
  CreditCard,
  GraduationCap,
  Megaphone,
  MessageCircle,
  Mic,
  MousePointerClick,
  Percent,
  Send,
  Share2,
  Sparkles,
  TrendingUp,
  Users,
  UserPlus,
  Wallet,
  Wrench,
  type LucideIcon,
} from 'lucide-react'
import { TIERS } from '../../en/Pricing'

/**
 * Prices come from src/components/en/Pricing.tsx — the single source of truth for
 * the plan grid (also checked by scripts/check-kb.mjs against api/_kb.js).
 * Never hardcode 19 / 49 / 199 on this page.
 */
const priceOf = (name: string) => Number(TIERS.find((t) => t.name === name)?.priceMonthly ?? 0)

export const PRICE_BASE = priceOf('Habibi')
export const PRICE_PRO = priceOf('Habibi Pro')
export const PRICE_PREMIUM = priceOf('Habibi Premium')

/** Commission rates and the threshold for the higher one. */
export const RATE_LOW = 0.2
export const RATE_HIGH = 0.3
export const RATE_THRESHOLD = 11

/** €1,234.56 — English formatting. */
export function formatMoney(value: number): string {
  const hasCents = Math.round(value * 100) % 100 !== 0
  return `€${value.toLocaleString('en-US', {
    minimumFractionDigits: hasCents ? 2 : 0,
    maximumFractionDigits: 2,
  })}`
}

/* ─────────────────────────── How it works ─────────────────────────── */

export interface Step {
  num: string
  title: string
  text: string
  code?: string
  chips?: string[]
  list?: string[]
  note?: string
}

export const STEPS: Step[] = [
  {
    num: '01',
    title: 'Sign up',
    text: 'Create a free Habibi partner account. Once you register, you get your personal referral link.',
    code: 'habibi-erp.com/ref/yourname',
  },
  {
    num: '02',
    title: 'Recommend Habibi',
    text: 'Share your link with entrepreneurs and companies Habibi can help automate their business.',
    chips: [
      'Telegram',
      'Instagram',
      'YouTube',
      'TikTok',
      'Your website',
      'Business communities',
      'Direct messages',
      'Consulting calls',
      'Clients and partners',
    ],
  },
  {
    num: '03',
    title: 'The client signs up',
    text: 'They follow your link, register with Habibi and get to try the system out.',
    note: '14 days free, no credit card required',
  },
  {
    num: '04',
    title: 'The client picks a plan',
    text: 'Once they are ready to run their business on Habibi, they choose the plan that fits.',
    list: [
      `Habibi — ${formatMoney(PRICE_BASE)}/month`,
      `Habibi Pro — ${formatMoney(PRICE_PRO)}/month`,
      `Habibi Premium — ${formatMoney(PRICE_PREMIUM)}/month`,
      'Habibi Exclusive — custom pricing after an audit',
    ],
  },
  {
    num: '05',
    title: 'You earn commission',
    text: 'Every time a client you referred pays for their subscription, you get your partner reward.',
    note: 'Not a one-off bonus — a recurring share of every payment for the whole partner period',
  },
]

/* ─────────────────────────── Commission ─────────────────────────── */

export interface CommissionLevel {
  rate: string
  clients: string
  text: string
  top?: boolean
}

export const COMMISSION_LEVELS: CommissionLevel[] = [
  {
    rate: '20%',
    clients: '1–10 active paying clients',
    text: 'of every paid subscription from the clients you bring in.',
  },
  {
    rate: '30%',
    clients: '11 and more active paying clients',
    text: 'of every paid subscription from the clients you bring in.',
    top: true,
  },
]

/* ─────────────────────────── Earnings ─────────────────────────── */

export interface TierEarning {
  name: string
  price: number
}

export const TIER_EARNINGS: TierEarning[] = [
  { name: 'Habibi', price: PRICE_BASE },
  { name: 'Habibi Pro', price: PRICE_PRO },
  { name: 'Habibi Premium', price: PRICE_PREMIUM },
]

export interface Example {
  title: string
  rows: string[]
  result: string
  caption: string
  highlight?: boolean
}

export const EXAMPLES: Example[] = [
  {
    title: '5 clients on Habibi Pro',
    rows: [
      `5 × ${formatMoney(PRICE_PRO)} = ${formatMoney(5 * PRICE_PRO)} in monthly revenue`,
      'Your commission — 20%',
    ],
    result: `${formatMoney(5 * PRICE_PRO * RATE_LOW)}`,
    caption: 'per month',
  },
  {
    title: '10 clients on Habibi Pro',
    rows: [
      `10 × ${formatMoney(PRICE_PRO)} = ${formatMoney(10 * PRICE_PRO)} in monthly revenue`,
      'Your commission — 20%',
    ],
    result: `${formatMoney(10 * PRICE_PRO * RATE_LOW)}`,
    caption: 'per month',
  },
  {
    title: '11 clients — you move to 30%',
    rows: ['One more client and you reach the higher tier', `11 × ${formatMoney(PRICE_PRO)} × 30%`],
    result: `${formatMoney(11 * PRICE_PRO * RATE_HIGH)}`,
    caption: 'per month',
    highlight: true,
  },
  {
    title: '8 × Pro and 3 × Premium',
    rows: [
      `8 × ${formatMoney(PRICE_PRO)} = ${formatMoney(8 * PRICE_PRO)}`,
      `3 × ${formatMoney(PRICE_PREMIUM)} = ${formatMoney(3 * PRICE_PREMIUM)}`,
      `${formatMoney(8 * PRICE_PRO + 3 * PRICE_PREMIUM)} of client revenue per month, 30% commission`,
    ],
    result: `${formatMoney((8 * PRICE_PRO + 3 * PRICE_PREMIUM) * RATE_HIGH)}`,
    caption: `per month — almost ${formatMoney(
      Math.round((8 * PRICE_PRO + 3 * PRICE_PREMIUM) * RATE_HIGH * 12),
    )} of partner income a year`,
    highlight: true,
  },
]

/* ─────────────────────────── Exclusive ─────────────────────────── */

export const EXCLUSIVE_FEATURES: string[] = [
  'Business process audit',
  'Process optimisation',
  'Tailored configuration',
  'Custom system setup',
  'Rollout of specific modules',
  'Custom modules',
  'Bespoke integrations',
  'Dedicated manager',
  'Team training',
  'SLA',
  'Round-the-clock support',
]

/* ─────────────────────────── What you can do ─────────────────────────── */

export interface IconCard {
  icon: LucideIcon
  title: string
  text: string
}

export const OPPORTUNITIES: IconCard[] = [
  {
    icon: Share2,
    title: 'Recommend',
    text: 'Bring clients in and earn a share of their subscriptions.',
  },
  {
    icon: MessageCircle,
    title: 'Consult',
    text: 'Help entrepreneurs work out which processes they need to automate first.',
  },
  {
    icon: Wrench,
    title: 'Implement',
    text: 'Help companies configure Habibi around the way they actually work.',
  },
  {
    icon: GraduationCap,
    title: 'Train',
    text: 'Run training sessions for their teams.',
  },
  {
    icon: TrendingUp,
    title: 'Grow',
    text: 'Build your own client base and a long-term recurring income.',
  },
]

/* ─────────────────────────── Who it is for ─────────────────────────── */

export interface Audience {
  icon: LucideIcon
  title: string
  question: string
  text: string
}

export const AUDIENCES: Audience[] = [
  {
    icon: Briefcase,
    title: 'Entrepreneurs',
    question: 'Do you know other business owners?',
    text: 'Recommend Habibi to them and earn from it.',
  },
  {
    icon: Megaphone,
    title: 'Marketers',
    question: 'Already working with businesses?',
    text: 'Add Habibi to your toolkit and offer clients real process automation.',
  },
  {
    icon: Building2,
    title: 'Business consultants',
    question: 'Do you help companies optimise how they operate?',
    text: 'Habibi can become the technology layer behind your solutions.',
  },
  {
    icon: Code2,
    title: 'IT specialists',
    question: 'Do you work on automation, CRM or integrations?',
    text: 'You can earn on implementation as well as on referrals.',
  },
  {
    icon: Mic,
    title: 'Bloggers and creators',
    question: 'Is your audience made of entrepreneurs?',
    text: 'Tell them about Habibi and monetise your recommendations.',
  },
  {
    icon: Send,
    title: 'Telegram channel owners',
    question: 'Do you have a business audience?',
    text: 'Give them a genuinely useful tool and earn commission on every client.',
  },
  {
    icon: Users,
    title: 'Simply active users',
    question: 'Not a marketer, developer or blogger?',
    text: 'If you know entrepreneurs Habibi could help, you can already be a partner.',
  },
]

/* ─────────────────────────── Dashboard ─────────────────────────── */

export const DASHBOARD_METRICS: IconCard[] = [
  { icon: MousePointerClick, title: 'Clicks', text: 'How many people followed your link.' },
  { icon: UserPlus, title: 'Sign-ups', text: 'How many of them created an account.' },
  { icon: Sparkles, title: 'Free trial', text: 'How many clients are on the 14-day free trial right now.' },
  { icon: CreditCard, title: 'Paying clients', text: 'How many moved to a paid subscription.' },
  { icon: BarChart3, title: 'Plans', text: 'Which plans your clients are on — from Habibi to Exclusive.' },
  { icon: Percent, title: 'Your rate', text: 'Your current commission — 20% or 30%.' },
  { icon: TrendingUp, title: 'Earnings', text: 'How much you have earned in total.' },
  { icon: Wallet, title: 'Available to withdraw', text: 'How much is already cleared for payout.' },
]

/* ─────────────────────────── Growth ─────────────────────────── */

export const GROWTH_STEPS = [
  { label: 'Today', clients: 3 },
  { label: 'In a few months', clients: 15 },
  { label: 'Then', clients: 30 },
  { label: 'And after that', clients: 50 },
]

/* ─────────────────────────── Three sides win ─────────────────────────── */

export const WIN_SIDES: IconCard[] = [
  {
    icon: Building2,
    title: 'The client',
    text: 'Gets a system to run and automate their business.',
  },
  { icon: Wallet, title: 'The partner', text: 'Gets an extra stream of recurring income.' },
  {
    icon: Sparkles,
    title: 'Habibi',
    text: 'Gets new clients and grows together with its partner community.',
  },
]

/* ─────────────────────────── Terms ─────────────────────────── */

export interface Condition {
  title: string
  text: string
}

export const CONDITIONS: Condition[] = [
  {
    title: 'Commission',
    text: '1–10 active paying clients — 20%. 11+ active paying clients — 30%. Once you reach 11 clients, the 30% rate applies to **your entire active client base**.',
  },
  {
    title: 'Free trial (14 days)',
    text: 'Clients can try Habibi for 14 days without a credit card. Sign-ups and trials earn no commission — it starts with the first paid subscription. Habibi Exclusive has no trial period.',
  },
  {
    title: 'Paid subscription',
    text: 'Commission is earned only on subscriptions the client has actually paid for.',
  },
  {
    title: 'Refunds',
    text: 'If a client is refunded, the corresponding commission is adjusted accordingly.',
  },
  {
    title: 'Attribution',
    text: 'The client has to sign up through your personal partner link.',
  },
  {
    title: 'One client — one partner',
    text: 'Every client is attributed to a single partner under the attribution rules.',
  },
  {
    title: 'Payouts',
    text: 'Commission becomes available once the payment clears the verification period. Recommended minimum payout threshold — **€50**.',
  },
  {
    title: 'Habibi Exclusive',
    text: 'Commission size and terms are agreed individually, based on the scope and structure of the project.',
  },
  {
    title: 'What is not allowed',
    text: 'No spam, no misleading advertising, no false promises, and no presenting yourself as an official Habibi representative without a separate agreement.',
  },
]

/* ─────────────────────────── Final chain ─────────────────────────── */

export const FINAL_CHAIN: string[] = [
  'Sign up',
  'Get your personal link',
  'Recommend Habibi',
  'Bring clients in',
  'Earn 20%',
  'Reach 11 clients',
  'Earn 30%',
]

/** One contact copy for every CTA on the page — so partner leads stand out in the inbox. */
export const PARTNER_FORM = {
  label: 'Partner programme',
  options: {
    subject: 'Habibi partner programme application',
    heading: "Partner programme application. Leave your contacts — and we'll get in touch.",
  },
}
