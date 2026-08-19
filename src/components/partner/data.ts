import {
  BarChart3,
  Briefcase,
  Building2,
  Code2,
  CreditCard,
  GraduationCap,
  Link2,
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
import { TIERS } from '../Pricing'

/**
 * Цены берём из src/components/Pricing.tsx — там единственный источник правды
 * по тарифной сетке (его же проверяет scripts/check-kb.mjs против api/_kb.js).
 * Никаких «19 / 49 / 199» руками на этой странице.
 */
const priceOf = (name: string) => Number(TIERS.find((t) => t.name === name)?.priceMonthly ?? 0)

export const PRICE_BASE = priceOf('Habibi')
export const PRICE_PRO = priceOf('Habibi Pro')
export const PRICE_PREMIUM = priceOf('Habibi Premium')

/** Ставки партнёрской комиссии и порог перехода на повышенную. */
export const RATE_LOW = 0.2
export const RATE_HIGH = 0.3
export const RATE_THRESHOLD = 11

/** €1 234,56 — как в копирайте: запятая в дробной части, пробел в тысячах. */
export function formatMoney(value: number): string {
  const hasCents = Math.round(value * 100) % 100 !== 0
  return `€${value.toLocaleString('ru-RU', {
    minimumFractionDigits: hasCents ? 2 : 0,
    maximumFractionDigits: 2,
  })}`
}

/* ─────────────────────────── 02. Как работает ─────────────────────────── */

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
    title: 'Зарегистрируйся',
    text: 'Создай бесплатный партнёрский аккаунт Habibi. После регистрации ты получишь персональную реферальную ссылку.',
    code: 'habibi-erp.com/ref/yourname',
  },
  {
    num: '02',
    title: 'Рекомендуй Habibi',
    text: 'Отправляй свою ссылку предпринимателям и компаниям, которым Habibi может помочь автоматизировать бизнес.',
    chips: [
      'Telegram',
      'Instagram',
      'YouTube',
      'TikTok',
      'Свой сайт',
      'Бизнес-сообщества',
      'Личные сообщения',
      'Консультации',
      'Клиенты и партнёры',
    ],
  },
  {
    num: '03',
    title: 'Клиент регистрируется',
    text: 'Клиент переходит по твоей ссылке и регистрируется в Habibi. Он получает возможность протестировать систему.',
    note: '14 дней бесплатно, без привязки банковской карты',
  },
  {
    num: '04',
    title: 'Клиент выбирает тариф',
    text: 'Когда клиент готов использовать Habibi в своём бизнесе, он выбирает подходящий тариф.',
    list: [
      `Habibi — ${formatMoney(PRICE_BASE)}/месяц`,
      `Habibi Pro — ${formatMoney(PRICE_PRO)}/месяц`,
      `Habibi Premium — ${formatMoney(PRICE_PREMIUM)}/месяц`,
      'Habibi Exclusive — индивидуально после аудита',
    ],
  },
  {
    num: '05',
    title: 'Ты получаешь комиссию',
    text: 'Когда привлечённый тобой клиент оплачивает подписку, ты получаешь партнёрское вознаграждение.',
    note: 'Не разовая выплата, а процент с подписки регулярно — в течение партнёрского периода',
  },
]

/* ─────────────────────────── 03. Ставки ─────────────────────────── */

export interface CommissionLevel {
  rate: string
  clients: string
  text: string
  top?: boolean
}

export const COMMISSION_LEVELS: CommissionLevel[] = [
  {
    rate: '20%',
    clients: '1–10 активных платящих клиентов',
    text: 'от оплаченной подписки каждого привлечённого клиента.',
  },
  {
    rate: '30%',
    clients: '11 и более активных платящих клиентов',
    text: 'от оплаченной подписки каждого привлечённого клиента.',
    top: true,
  },
]

/* ─────────────────────────── 04. Расчёты ─────────────────────────── */

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
    title: '5 клиентов на Habibi Pro',
    rows: [
      `5 × ${formatMoney(PRICE_PRO)} = ${formatMoney(5 * PRICE_PRO)} ежемесячной выручки`,
      'Твоя комиссия — 20%',
    ],
    result: `${formatMoney(5 * PRICE_PRO * RATE_LOW)}`,
    caption: 'в месяц',
  },
  {
    title: '10 клиентов на Habibi Pro',
    rows: [
      `10 × ${formatMoney(PRICE_PRO)} = ${formatMoney(10 * PRICE_PRO)} ежемесячной выручки`,
      'Твоя комиссия — 20%',
    ],
    result: `${formatMoney(10 * PRICE_PRO * RATE_LOW)}`,
    caption: 'в месяц',
  },
  {
    title: '11 клиентов — переход на 30%',
    rows: [
      'Ещё один клиент — и ты на уровне 30%',
      `11 × ${formatMoney(PRICE_PRO)} × 30%`,
    ],
    result: `${formatMoney(11 * PRICE_PRO * RATE_HIGH)}`,
    caption: 'в месяц',
    highlight: true,
  },
  {
    title: '8 × Pro и 3 × Premium',
    rows: [
      `8 × ${formatMoney(PRICE_PRO)} = ${formatMoney(8 * PRICE_PRO)}`,
      `3 × ${formatMoney(PRICE_PREMIUM)} = ${formatMoney(3 * PRICE_PREMIUM)}`,
      `Выручка клиентов — ${formatMoney(8 * PRICE_PRO + 3 * PRICE_PREMIUM)} в месяц, комиссия 30%`,
    ],
    result: `${formatMoney((8 * PRICE_PRO + 3 * PRICE_PREMIUM) * RATE_HIGH)}`,
    caption: `в месяц — почти ${formatMoney(
      Math.round((8 * PRICE_PRO + 3 * PRICE_PREMIUM) * RATE_HIGH * 12),
    )} партнёрского дохода в год`,
    highlight: true,
  },
]

/* ─────────────────────────── 05. Exclusive ─────────────────────────── */

export const EXCLUSIVE_FEATURES: string[] = [
  'Аудит бизнес-процессов',
  'Оптимизация процессов',
  'Индивидуальная настройка',
  'Кастомная конфигурация системы',
  'Внедрение отдельных модулей',
  'Кастомные модули',
  'Индивидуальные интеграции',
  'Выделенный менеджер',
  'Обучение команды',
  'SLA',
  'Круглосуточная поддержка',
]

/* ─────────────────────────── 06. Возможности партнёра ─────────────────────────── */

export interface IconCard {
  icon: LucideIcon
  title: string
  text: string
}

export const OPPORTUNITIES: IconCard[] = [
  {
    icon: Share2,
    title: 'Рекомендуй',
    text: 'Приводи клиентов и получай процент от их подписок.',
  },
  {
    icon: MessageCircle,
    title: 'Консультируй',
    text: 'Помогай предпринимателям определить, какие процессы им необходимо автоматизировать.',
  },
  {
    icon: Wrench,
    title: 'Внедряй',
    text: 'Помогай компаниям настроить Habibi под их бизнес.',
  },
  {
    icon: GraduationCap,
    title: 'Обучай',
    text: 'Проводи обучение сотрудников работе с системой.',
  },
  {
    icon: TrendingUp,
    title: 'Развивай',
    text: 'Создавай собственную клиентскую базу и долгосрочный recurring-доход.',
  },
]

/* ─────────────────────────── 07. Для кого ─────────────────────────── */

export interface Audience {
  icon: LucideIcon
  title: string
  question: string
  text: string
}

export const AUDIENCES: Audience[] = [
  {
    icon: Briefcase,
    title: 'Предприниматели',
    question: 'Ты знаком с другими владельцами бизнеса?',
    text: 'Рекомендуй им Habibi и получай доход.',
  },
  {
    icon: Megaphone,
    title: 'Маркетологи',
    question: 'Ты уже работаешь с бизнесом?',
    text: 'Добавь Habibi в свой набор инструментов и предлагай клиентам автоматизацию бизнес-процессов.',
  },
  {
    icon: Building2,
    title: 'Бизнес-консультанты',
    question: 'Ты помогаешь компаниям оптимизировать бизнес?',
    text: 'Habibi может стать технологической основой твоих решений.',
  },
  {
    icon: Code2,
    title: 'IT-специалисты',
    question: 'Ты занимаешься автоматизацией, CRM или интеграциями?',
    text: 'Ты можешь не только приводить клиентов, но и зарабатывать на внедрении.',
  },
  {
    icon: Mic,
    title: 'Блогеры и создатели контента',
    question: 'У тебя есть аудитория предпринимателей?',
    text: 'Расскажи о Habibi и монетизируй свои рекомендации.',
  },
  {
    icon: Send,
    title: 'Владельцы Telegram-каналов',
    question: 'У тебя есть бизнес-аудитория?',
    text: 'Дай ей полезный инструмент и получай комиссию за клиентов.',
  },
  {
    icon: Users,
    title: 'Просто активные пользователи',
    question: 'Не маркетолог, не айтишник, не блогер?',
    text: 'Если ты знаешь предпринимателей, которым Habibi может быть полезен, ты уже можешь стать партнёром.',
  },
]

/* ─────────────────────────── 09. Кабинет ─────────────────────────── */

export const DASHBOARD_METRICS: IconCard[] = [
  { icon: MousePointerClick, title: 'Переходы', text: 'Сколько людей перешло по твоей ссылке.' },
  { icon: UserPlus, title: 'Регистрации', text: 'Сколько пользователей создали аккаунт.' },
  { icon: Sparkles, title: 'Демо-период', text: 'Сколько клиентов сейчас на 14-дневном бесплатном доступе.' },
  { icon: CreditCard, title: 'Платящие клиенты', text: 'Сколько клиентов перешло на платную подписку.' },
  { icon: BarChart3, title: 'Тарифы', text: 'Какие тарифы используют твои клиенты — от Habibi до Exclusive.' },
  { icon: Percent, title: 'Твой процент', text: 'Текущая ставка — 20% или 30%.' },
  { icon: TrendingUp, title: 'Доход', text: 'Сколько ты заработал за всё время.' },
  { icon: Wallet, title: 'Доступно к выплате', text: 'Какая сумма уже доступна для получения.' },
]

/* ─────────────────────────── 10. Почему выгодно ─────────────────────────── */

export const GROWTH_STEPS = [
  { label: 'Сегодня', clients: 3 },
  { label: 'Через несколько месяцев', clients: 15 },
  { label: 'Потом', clients: 30 },
  { label: 'А затем', clients: 50 },
]

/* ─────────────────────────── 13. Три стороны ─────────────────────────── */

export const WIN_SIDES: IconCard[] = [
  {
    icon: Building2,
    title: 'Клиент',
    text: 'Получает систему для управления и автоматизации бизнеса.',
  },
  { icon: Wallet, title: 'Партнёр', text: 'Получает дополнительный recurring-доход.' },
  {
    icon: Sparkles,
    title: 'Habibi',
    text: 'Получает новых клиентов и растёт вместе с партнёрским сообществом.',
  },
]

/* ─────────────────────────── 14. Условия ─────────────────────────── */

export interface Condition {
  title: string
  text: string
}

export const CONDITIONS: Condition[] = [
  {
    title: 'Комиссия',
    text: '1–10 активных платящих клиентов — 20%. 11+ активных платящих клиентов — 30%. После достижения 11 клиентов ставка 30% применяется ко **всей активной клиентской базе** партнёра.',
  },
  {
    title: 'Бесплатный демо-период (14 дней)',
    text: 'Клиент может протестировать Habibi 14 дней без банковской карты. Регистрация и демо-период комиссию не создают — она начисляется после первой оплаты подписки. У тарифа Habibi Exclusive демо-периода нет.',
  },
  {
    title: 'Платная подписка',
    text: 'Комиссия начисляется только с фактически оплаченной клиентом подписки.',
  },
  {
    title: 'Возврат платежа',
    text: 'При возврате клиенту денежных средств соответствующая комиссия корректируется.',
  },
  {
    title: 'Атрибуция',
    text: 'Клиент должен зарегистрироваться через персональную партнёрскую ссылку.',
  },
  {
    title: 'Один клиент — один партнёр',
    text: 'Каждый клиент закрепляется только за одним партнёром согласно правилам атрибуции.',
  },
  {
    title: 'Выплаты',
    text: 'Комиссия становится доступной после завершения периода проверки платежа. Рекомендуемый минимальный порог выплаты — **€50**.',
  },
  {
    title: 'Habibi Exclusive',
    text: 'Размер и условия комиссии определяются индивидуально — в зависимости от стоимости и структуры проекта.',
  },
  {
    title: 'Запрещённые методы',
    text: 'Нельзя использовать спам, вводящую в заблуждение рекламу, фальшивые обещания или выдавать себя за официального сотрудника Habibi без отдельного соглашения.',
  },
]

/* ─────────────────────────── 15. Финальная цепочка ─────────────────────────── */

export const FINAL_CHAIN: string[] = [
  'Зарегистрируйся',
  'Получи персональную ссылку',
  'Рекомендуй Habibi',
  'Приводи клиентов',
  'Получай 20%',
  'Достигни 11 клиентов',
  'Получай 30%',
]

/** Иконка для блока с реферальной ссылкой. */
export const LinkIcon = Link2

/** Единый текст заявки для всех CTA страницы — чтобы партнёрские лиды были видны в почте. */
export const PARTNER_FORM = {
  label: 'Партнёрская программа',
  options: {
    subject: 'Заявка в партнёрскую программу Habibi',
    heading: 'Заявка в партнёрскую программу. Заполните контакты — и мы свяжемся с вами.',
  },
}
