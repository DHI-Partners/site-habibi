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
import { TIERS } from '../../uz/Pricing'

/**
 * Narxlar src/components/uz/Pricing.tsx dan olinadi — tariflar setkasi uchun yagona
 * haqiqat manbasi (uni scripts/check-kb.mjs api/_kb.js bilan ham sverka qiladi).
 * Bu sahifada 19 / 49 / 199 ni hech qachon qoʻlda yozmang.
 */
const priceOf = (name: string) => Number(TIERS.find((t) => t.name === name)?.priceMonthly ?? 0)

export const PRICE_BASE = priceOf('Habibi')
export const PRICE_PRO = priceOf('Habibi Pro')
export const PRICE_PREMIUM = priceOf('Habibi Premium')

/** Komissiya stavkalari va yuqori stavkaga oʻtish chegarasi. */
export const RATE_LOW = 0.2
export const RATE_HIGH = 0.3
export const RATE_THRESHOLD = 11

/** €1 234,56 — oʻzbekcha formatlash. */
export function formatMoney(value: number): string {
  const hasCents = Math.round(value * 100) % 100 !== 0
  return `€${value.toLocaleString('ru-RU', {
    minimumFractionDigits: hasCents ? 2 : 0,
    maximumFractionDigits: 2,
  })}`
}

/* ─────────────────────────── Qanday ishlaydi ─────────────────────────── */

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
    title: 'Roʻyxatdan oʻting',
    text: 'Bepul Habibi hamkor hisobini yarating. Roʻyxatdan oʻtganingizdan soʻng shaxsiy referal havolangizni olasiz.',
    code: 'habibi-erp.com/ref/yourname',
  },
  {
    num: '02',
    title: 'Habibini tavsiya qiling',
    text: 'Havolangizni Habibi biznesini avtomatlashtirishga yordam bera oladigan tadbirkorlar va kompaniyalar bilan ulashing.',
    chips: [
      'Telegram',
      'Instagram',
      'YouTube',
      'TikTok',
      'Oʻz saytingiz',
      'Biznes hamjamiyatlar',
      'Shaxsiy xabarlar',
      'Konsalting uchrashuvlari',
      'Mijozlar va hamkorlar',
    ],
  },
  {
    num: '03',
    title: 'Mijoz roʻyxatdan oʻtadi',
    text: 'U havolangiz orqali oʻtadi, Habibiʼda roʻyxatdan oʻtadi va tizimni sinab koʻradi.',
    note: '14 kun bepul, karta talab qilinmaydi',
  },
  {
    num: '04',
    title: 'Mijoz tarifni tanlaydi',
    text: 'Biznesini Habibiʼda yuritishga tayyor boʻlgach, u oʻziga mos tarifni tanlaydi.',
    list: [
      `Habibi — ${formatMoney(PRICE_BASE)}/oyiga`,
      `Habibi Pro — ${formatMoney(PRICE_PRO)}/oyiga`,
      `Habibi Premium — ${formatMoney(PRICE_PREMIUM)}/oyiga`,
      'Habibi Exclusive — audit asosida individual narx',
    ],
  },
  {
    num: '05',
    title: 'Siz komissiya olasiz',
    text: 'Siz olib kelgan mijoz obunasi uchun toʻlov qilgan har safar siz hamkorlik mukofotingizni olasiz.',
    note: 'Bu bir martalik bonus emas — butun hamkorlik davri davomida har bir toʻlovdan takrorlanuvchi ulush',
  },
]

/* ─────────────────────────── Komissiya ─────────────────────────── */

export interface CommissionLevel {
  rate: string
  clients: string
  text: string
  top?: boolean
}

export const COMMISSION_LEVELS: CommissionLevel[] = [
  {
    rate: '20%',
    clients: '1–10 ta faol toʻlovchi mijoz',
    text: 'siz olib kelgan mijozlarning har bir pullik obunasidan.',
  },
  {
    rate: '30%',
    clients: '11 va undan koʻp faol toʻlovchi mijoz',
    text: 'siz olib kelgan mijozlarning har bir pullik obunasidan.',
    top: true,
  },
]

/* ─────────────────────────── Daromad ─────────────────────────── */

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
    title: 'Habibi Pro tarifida 5 ta mijoz',
    rows: [
      `5 × ${formatMoney(PRICE_PRO)} = oyiga ${formatMoney(5 * PRICE_PRO)} tushum`,
      'Sizning komissiyangiz — 20%',
    ],
    result: `${formatMoney(5 * PRICE_PRO * RATE_LOW)}`,
    caption: 'oyiga',
  },
  {
    title: 'Habibi Pro tarifida 10 ta mijoz',
    rows: [
      `10 × ${formatMoney(PRICE_PRO)} = oyiga ${formatMoney(10 * PRICE_PRO)} tushum`,
      'Sizning komissiyangiz — 20%',
    ],
    result: `${formatMoney(10 * PRICE_PRO * RATE_LOW)}`,
    caption: 'oyiga',
  },
  {
    title: '11 ta mijoz — siz 30% ga oʻtasiz',
    rows: [
      'Yana bitta mijoz — va siz yuqori bosqichga chiqasiz',
      `11 × ${formatMoney(PRICE_PRO)} × 30%`,
    ],
    result: `${formatMoney(11 * PRICE_PRO * RATE_HIGH)}`,
    caption: 'oyiga',
    highlight: true,
  },
  {
    title: '8 × Pro va 3 × Premium',
    rows: [
      `8 × ${formatMoney(PRICE_PRO)} = ${formatMoney(8 * PRICE_PRO)}`,
      `3 × ${formatMoney(PRICE_PREMIUM)} = ${formatMoney(3 * PRICE_PREMIUM)}`,
      `Oyiga ${formatMoney(8 * PRICE_PRO + 3 * PRICE_PREMIUM)} mijozlar tushumi, 30% komissiya`,
    ],
    result: `${formatMoney((8 * PRICE_PRO + 3 * PRICE_PREMIUM) * RATE_HIGH)}`,
    caption: `oyiga — bu yiliga deyarli ${formatMoney(
      Math.round((8 * PRICE_PRO + 3 * PRICE_PREMIUM) * RATE_HIGH * 12),
    )} hamkorlik daromadi`,
    highlight: true,
  },
]

/* ─────────────────────────── Exclusive ─────────────────────────── */

export const EXCLUSIVE_FEATURES: string[] = [
  'Biznes-jarayonlar auditi',
  'Jarayonlarni optimallashtirish',
  'Moslashtirilgan sozlash',
  'Tizimni individual joriy etish',
  'Alohida modullarni ishga tushirish',
  'Buyurtma asosidagi modullar',
  'Individual integratsiyalar',
  'Shaxsiy menejer',
  'Jamoani oʻqitish',
  'SLA',
  'Kunu tun qoʻllab-quvvatlash',
]

/* ─────────────────────────── Nima qila olasiz ─────────────────────────── */

export interface IconCard {
  icon: LucideIcon
  title: string
  text: string
}

export const OPPORTUNITIES: IconCard[] = [
  {
    icon: Share2,
    title: 'Tavsiya qiling',
    text: 'Mijozlarni olib keling va ularning obunalaridan ulush oling.',
  },
  {
    icon: MessageCircle,
    title: 'Maslahat bering',
    text: 'Tadbirkorlarga avvalo qaysi jarayonlarni avtomatlashtirish kerakligini aniqlashga yordam bering.',
  },
  {
    icon: Wrench,
    title: 'Joriy eting',
    text: 'Kompaniyalarga Habibini oʻz ish uslubiga moslab sozlashga yordam bering.',
  },
  {
    icon: GraduationCap,
    title: 'Oʻrgating',
    text: 'Ularning jamoalari uchun oʻquv mashgʻulotlari oʻtkazing.',
  },
  {
    icon: TrendingUp,
    title: 'Oʻsing',
    text: 'Oʻz mijozlar bazangizni va uzoq muddatli takrorlanuvchi daromadingizni shakllantiring.',
  },
]

/* ─────────────────────────── Kimlar uchun ─────────────────────────── */

export interface Audience {
  icon: LucideIcon
  title: string
  question: string
  text: string
}

export const AUDIENCES: Audience[] = [
  {
    icon: Briefcase,
    title: 'Tadbirkorlar',
    question: 'Boshqa biznes egalarini bilasizmi?',
    text: 'Ularga Habibini tavsiya qiling va shundan daromad oling.',
  },
  {
    icon: Megaphone,
    title: 'Marketologlar',
    question: 'Allaqachon biznes bilan ishlaysizmi?',
    text: 'Habibini oʻz vositalaringizga qoʻshing va mijozlarga jarayonlarning haqiqiy avtomatlashtirilishini taklif qiling.',
  },
  {
    icon: Building2,
    title: 'Biznes-konsultantlar',
    question: 'Kompaniyalarga ish jarayonlarini optimallashtirishga yordam berasizmi?',
    text: 'Habibi sizning yechimlaringiz ortidagi texnologik qatlamga aylanishi mumkin.',
  },
  {
    icon: Code2,
    title: 'IT-mutaxassislar',
    question: 'Avtomatlashtirish, CRM yoki integratsiyalar bilan ishlaysizmi?',
    text: 'Siz nafaqat tavsiyalardan, balki joriy etishdan ham daromad olishingiz mumkin.',
  },
  {
    icon: Mic,
    title: 'Blogerlar va kontent mualliflari',
    question: 'Auditoriyangiz tadbirkorlardanmi?',
    text: 'Ularga Habibi haqida aytib bering va tavsiyalaringizni monetizatsiya qiling.',
  },
  {
    icon: Send,
    title: 'Telegram-kanal egalari',
    question: 'Biznes auditoriyangiz bormi?',
    text: 'Ularga chinakam foydali vositani bering va har bir mijozdan komissiya oling.',
  },
  {
    icon: Users,
    title: 'Shunchaki faol foydalanuvchilar',
    question: 'Marketolog, dasturchi yoki bloger emasmisiz?',
    text: 'Agar Habibi yordam bera oladigan tadbirkorlarni bilsangiz, siz allaqachon hamkor boʻla olasiz.',
  },
]

/* ─────────────────────────── Boshqaruv paneli ─────────────────────────── */

export const DASHBOARD_METRICS: IconCard[] = [
  { icon: MousePointerClick, title: 'Bosishlar', text: 'Havolangiz boʻyicha qancha odam oʻtgani.' },
  { icon: UserPlus, title: 'Roʻyxatdan oʻtishlar', text: 'Ulardan qanchasi hisob yaratgani.' },
  { icon: Sparkles, title: 'Bepul sinov', text: 'Ayni paytda 14 kunlik bepul demo-davrda nechta mijoz bor.' },
  { icon: CreditCard, title: 'Toʻlovchi mijozlar', text: 'Qanchasi pullik obunaga oʻtgani.' },
  { icon: BarChart3, title: 'Tariflar', text: 'Mijozlaringiz qaysi tariflarda — Habibiʼdan Exclusiveʼgacha.' },
  { icon: Percent, title: 'Sizning stavkangiz', text: 'Joriy komissiyangiz — 20% yoki 30%.' },
  { icon: TrendingUp, title: 'Daromad', text: 'Jami qancha ishlab topganingiz.' },
  { icon: Wallet, title: 'Yechib olish mumkin', text: 'Toʻlovga allaqachon tayyor boʻlgan summa.' },
]

/* ─────────────────────────── Oʻsish ─────────────────────────── */

export const GROWTH_STEPS = [
  { label: 'Bugun', clients: 3 },
  { label: 'Bir necha oydan soʻng', clients: 15 },
  { label: 'Keyin', clients: 30 },
  { label: 'Undan keyin', clients: 50 },
]

/* ─────────────────────────── Uch tomon yutadi ─────────────────────────── */

export const WIN_SIDES: IconCard[] = [
  {
    icon: Building2,
    title: 'Mijoz',
    text: 'Biznesini yuritish va avtomatlashtirish uchun tizimga ega boʻladi.',
  },
  { icon: Wallet, title: 'Hamkor', text: 'Qoʻshimcha takrorlanuvchi daromad oqimiga ega boʻladi.' },
  {
    icon: Sparkles,
    title: 'Habibi',
    text: 'Yangi mijozlarni oladi va hamkorlar hamjamiyati bilan birga oʻsadi.',
  },
]

/* ─────────────────────────── Shartlar ─────────────────────────── */

export interface Condition {
  title: string
  text: string
}

export const CONDITIONS: Condition[] = [
  {
    title: 'Komissiya',
    text: '1–10 ta faol toʻlovchi mijoz — 20%. 11+ faol toʻlovchi mijoz — 30%. 11 ta mijozga yetganingizdan soʻng 30% stavka **butun faol mijozlar bazangizga** qoʻllanadi.',
  },
  {
    title: 'Bepul sinov (14 kun)',
    text: 'Mijozlar Habibini 14 kun davomida kartasiz sinab koʻrishlari mumkin. Roʻyxatdan oʻtish va demo-davr uchun komissiya berilmaydi — u birinchi pullik obunadan boshlanadi. Habibi Exclusiveʼda sinov davri yoʻq.',
  },
  {
    title: 'Pullik obuna',
    text: 'Komissiya faqat mijoz haqiqatda toʻlagan obunalar boʻyicha hisoblanadi.',
  },
  {
    title: 'Pulni qaytarish',
    text: 'Agar mijozga pul qaytarilsa, tegishli komissiya ham shunga mos ravishda tuzatiladi.',
  },
  {
    title: 'Atributsiya',
    text: 'Mijoz sizning shaxsiy hamkorlik havolangiz orqali roʻyxatdan oʻtishi kerak.',
  },
  {
    title: 'Bitta mijoz — bitta hamkor',
    text: 'Har bir mijoz atributsiya qoidalariga muvofiq faqat bitta hamkorga biriktiriladi.',
  },
  {
    title: 'Toʻlovlar',
    text: 'Komissiya toʻlov tekshiruv davridan oʻtganidan soʻng mavjud boʻladi. Toʻlov uchun tavsiya etilgan minimal chegara — **€50**.',
  },
  {
    title: 'Habibi Exclusive',
    text: 'Komissiya miqdori va shartlari loyihaning hajmi va tuzilishidan kelib chiqib individual kelishiladi.',
  },
  {
    title: 'Nimaga ruxsat berilmaydi',
    text: 'Spam, chalgʻituvchi reklama, asossiz vaʼdalar va alohida shartnomasiz oʻzini Habibining rasmiy vakili sifatida koʻrsatish mumkin emas.',
  },
]

/* ─────────────────────────── Yakuniy zanjir ─────────────────────────── */

export const FINAL_CHAIN: string[] = [
  'Roʻyxatdan oʻting',
  'Shaxsiy havolani oling',
  'Habibini tavsiya qiling',
  'Mijozlarni olib keling',
  '20% ishlab toping',
  '11 ta mijozga yeting',
  '30% ishlab toping',
]

/** Sahifadagi barcha CTA uchun yagona kontakt matni — hamkor lidlari pochtada ajralib tursin. */
export const PARTNER_FORM = {
  label: 'Hamkorlik dasturi',
  options: {
    subject: 'Habibi hamkorlik dasturiga ariza (UZ)',
    heading: 'Hamkorlik dasturiga ariza. Kontaktlaringizni qoldiring — biz siz bilan bogʻlanamiz.',
  },
}
