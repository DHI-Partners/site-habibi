import { formatMoney as formatMoneyRu } from '../data'
import { formatMoney as formatMoneyEn } from '../en/data'
import { plural } from '../ui'
import type { ReferralStatus } from './lib'

/**
 * Локализация кабинета: одна логика страниц, два словаря строк.
 * (Маркетинговые страницы дублируются подеревьям — но кабинет
 * это приложение, и вторую копию логики поддерживать дороже.)
 */
export type CabinetLocale = 'ru' | 'en'

export interface CabinetPaths {
  home: string
  register: string
  login: string
  dashboard: string
}

export const CABINET_PATHS: Record<CabinetLocale, CabinetPaths> = {
  ru: {
    home: '/ru/partners',
    register: '/ru/partners/register',
    login: '/ru/partners/login',
    dashboard: '/ru/partners/dashboard',
  },
  en: {
    home: '/partners',
    register: '/partners/register',
    login: '/partners/login',
    dashboard: '/partners/dashboard',
  },
}

export const STATUS_LABELS: Record<CabinetLocale, Record<ReferralStatus, string>> = {
  ru: { lead: 'Заявка', trial: 'Демо-период', paying: 'Платит', churned: 'Ушёл' },
  en: { lead: 'Lead', trial: 'Free trial', paying: 'Paying', churned: 'Churned' },
}

export function cabinetMoney(locale: CabinetLocale, value: number): string {
  return locale === 'en' ? formatMoneyEn(value) : formatMoneyRu(value)
}

export function cabinetDate(locale: CabinetLocale, iso: string | null): string {
  if (!iso) return '—'
  const d = new Date(iso)
  if (!Number.isFinite(d.getTime())) return '—'
  return d.toLocaleDateString(locale === 'en' ? 'en-US' : 'ru-RU', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

/** «Ещё N клиентов до ставки 30%» / "N more clients to the 30% rate". */
export function clientsLeftLine(locale: CabinetLocale, left: number): string {
  if (locale === 'en') return `${left} more ${left === 1 ? 'client' : 'clients'} to the 30% rate`
  return `Ещё ${left} ${plural(left, 'клиент', 'клиента', 'клиентов')} до ставки 30%`
}

export const STRINGS = {
  ru: {
    htmlLang: 'ru',
    shell: {
      signOut: 'Выйти',
      notConfigured:
        'Кабинет ещё не подключён: добавьте переменные окружения VITE_SUPABASE_URL и VITE_SUPABASE_ANON_KEY, затем пересоберите сайт.',
    },
    register: {
      pageTitle: 'Регистрация партнёра — Habibi',
      tag: 'Регистрация партнёра',
      h1: 'Создай партнёрский аккаунт',
      lead: 'Бесплатно. Сразу после регистрации ты получишь персональную реферальную ссылку и доступ к кабинету со статистикой.',
      name: 'Имя',
      namePlaceholder: 'Как к вам обращаться',
      email: 'Email',
      password: 'Пароль',
      passwordHint: 'Минимум 8 символов.',
      slug: 'Имя для ссылки',
      slugYourLink: 'Твоя ссылка:',
      slugRules: 'Латиница, цифры и дефис, от 3 до 30 символов.',
      contact: 'Как с тобой связаться',
      contactHint: 'Необязательно — для вопросов по выплатам.',
      whatsappPlaceholder: '+966 5X XXX XXXX',
      telegramPlaceholder: '@username',
      submit: 'Создать кабинет',
      submitting: 'Создаём…',
      consent: 'Нажимая кнопку, вы соглашаетесь с условиями партнёрской программы.',
      confirmTitle: 'Подтвердите email',
      confirmText: (email: string) =>
        `Мы отправили письмо на ${email}. Перейдите по ссылке из письма, затем войдите в кабинет.`,
      confirmLogin: 'Войти',
      haveAccount: 'Уже есть аккаунт?',
      signIn: 'Войти',
      errSlugTaken: 'Эта ссылка уже занята — выберите другое имя для ссылки.',
      errEmailExists: 'Такой email уже зарегистрирован — попробуйте войти.',
      errSignUp: 'Не удалось создать аккаунт. Проверьте данные и попробуйте ещё раз.',
      errGeneric: 'Что-то пошло не так. Попробуйте ещё раз.',
    },
    login: {
      pageTitle: 'Вход в партнёрский кабинет — Habibi',
      tag: 'Личный кабинет',
      h1Login: 'Вход в кабинет',
      h1Recovery: 'Новый пароль',
      leadLogin: 'Статистика переходов, клиенты и доход — в твоём партнёрском кабинете.',
      leadRecovery: 'Придумайте новый пароль для входа в партнёрский кабинет.',
      email: 'Email',
      password: 'Пароль',
      newPassword: 'Новый пароль',
      submitLogin: 'Войти',
      submitForgot: 'Сбросить пароль',
      submitRecovery: 'Сохранить пароль',
      submitting: 'Секунду…',
      errNotConfirmed: 'Email ещё не подтверждён — проверьте почту.',
      errBadCreds: 'Неверный email или пароль.',
      errResetFail: 'Не удалось отправить письмо. Попробуйте ещё раз.',
      errShortPassword: 'Пароль должен быть не короче 8 символов.',
      errUpdateFail: 'Не удалось сменить пароль. Запросите сброс ещё раз.',
      errGeneric: 'Что-то пошло не так. Попробуйте ещё раз.',
      resetSent: 'Письмо со ссылкой для сброса пароля отправлено — проверьте почту.',
      forgot: 'Забыли пароль?',
      backToLogin: '← Назад ко входу',
      noAccount: 'Ещё нет аккаунта?',
      becomePartner: 'Стать партнёром',
    },
    dashboard: {
      pageTitle: 'Партнёрский кабинет — Habibi',
      tag: 'Личный кабинет',
      hi: (name: string) => `Привет${name ? `, ${name}` : ''}!`,
      lead: 'Вся статистика в одном месте — от переходов по ссылке до суммы, доступной к выплате.',
      loading: 'Загружаем кабинет…',
      linkTitle: 'Твоя персональная ссылка',
      linkHint:
        'Отправляй её потенциальным клиентам: система фиксирует переход и закрепляет клиента за тобой автоматически.',
      copy: 'Скопировать',
      copied: 'Скопировано',
      perMonthNow: (money: string) => `${money} в месяц сейчас`,
      clientsOf: (n: number, threshold: number) => `${n} / ${threshold} клиентов`,
      topRate: '30% на всю активную базу',
      disclaimer: 'Расчёт ориентировочный: комиссия начисляется с фактически оплаченных подписок.',
      clientsTitle: 'Твои клиенты',
      clientsEmpty: 'Пока никого — поделись своей ссылкой, и первые заявки появятся здесь.',
      thClient: 'Клиент',
      thStatus: 'Статус',
      thTariff: 'Тариф',
      thDate: 'Появился',
      unnamed: 'Без имени',
      payoutsTitle: 'Выплаты',
      payoutsEmpty:
        'Выплат ещё не было. Рекомендуемый минимальный порог выплаты — €50; по вопросам выплат мы свяжемся с тобой сами или напиши нам.',
      paidOn: (date: string) => `Выплачено ${date}`,
      pending: 'В обработке',
      profileTag: 'Ещё один шаг',
      profileH1: 'Придумай свою ссылку',
      profileLead: 'Аккаунт создан. Осталось выбрать имя для персональной реферальной ссылки.',
      profileSubmit: 'Получить ссылку',
      profileSubmitting: 'Сохраняем…',
      errSlugTaken: 'Эта ссылка уже занята — выберите другое имя.',
      errSave: 'Не удалось сохранить. Попробуйте ещё раз.',
    },
  },
  en: {
    htmlLang: 'en',
    shell: {
      signOut: 'Sign out',
      notConfigured:
        'The dashboard is not connected yet: add the VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY environment variables, then rebuild the site.',
    },
    register: {
      pageTitle: 'Partner sign-up — Habibi',
      tag: 'Partner sign-up',
      h1: 'Create your partner account',
      lead: 'Free. Right after signing up you get a personal referral link and a dashboard with your stats.',
      name: 'Name',
      namePlaceholder: 'What should we call you',
      email: 'Email',
      password: 'Password',
      passwordHint: 'At least 8 characters.',
      slug: 'Link name',
      slugYourLink: 'Your link:',
      slugRules: 'Lowercase letters, digits and dashes, 3–30 characters.',
      contact: 'How can we reach you',
      contactHint: 'Optional — for payout questions.',
      whatsappPlaceholder: '+966 5X XXX XXXX',
      telegramPlaceholder: '@username',
      submit: 'Create my dashboard',
      submitting: 'Creating…',
      consent: 'By clicking the button you agree to the partner program terms.',
      confirmTitle: 'Confirm your email',
      confirmText: (email: string) =>
        `We sent an email to ${email}. Follow the link in it, then sign in to your dashboard.`,
      confirmLogin: 'Sign in',
      haveAccount: 'Already have an account?',
      signIn: 'Sign in',
      errSlugTaken: 'This link is already taken — pick another name.',
      errEmailExists: 'This email is already registered — try signing in.',
      errSignUp: 'Could not create the account. Check the details and try again.',
      errGeneric: 'Something went wrong. Please try again.',
    },
    login: {
      pageTitle: 'Partner dashboard sign-in — Habibi',
      tag: 'Partner dashboard',
      h1Login: 'Sign in',
      h1Recovery: 'New password',
      leadLogin: 'Link clicks, clients and earnings — all in your partner dashboard.',
      leadRecovery: 'Set a new password for your partner dashboard.',
      email: 'Email',
      password: 'Password',
      newPassword: 'New password',
      submitLogin: 'Sign in',
      submitForgot: 'Reset password',
      submitRecovery: 'Save password',
      submitting: 'One moment…',
      errNotConfirmed: 'Email is not confirmed yet — check your inbox.',
      errBadCreds: 'Wrong email or password.',
      errResetFail: 'Could not send the email. Please try again.',
      errShortPassword: 'The password must be at least 8 characters.',
      errUpdateFail: 'Could not change the password. Request a reset again.',
      errGeneric: 'Something went wrong. Please try again.',
      resetSent: 'A password reset link is on its way — check your inbox.',
      forgot: 'Forgot your password?',
      backToLogin: '← Back to sign in',
      noAccount: 'No account yet?',
      becomePartner: 'Become a partner',
    },
    dashboard: {
      pageTitle: 'Partner dashboard — Habibi',
      tag: 'Partner dashboard',
      hi: (name: string) => `Hi${name ? `, ${name}` : ''}!`,
      lead: 'All your stats in one place — from link clicks to the amount available for payout.',
      loading: 'Loading your dashboard…',
      linkTitle: 'Your personal link',
      linkHint:
        'Share it with potential clients: the system records the click and attributes the client to you automatically.',
      copy: 'Copy',
      copied: 'Copied',
      perMonthNow: (money: string) => `${money} per month right now`,
      clientsOf: (n: number, threshold: number) => `${n} / ${threshold} clients`,
      topRate: '30% on your entire active base',
      disclaimer: 'Estimates only: commission is accrued from subscriptions your clients actually pay for.',
      clientsTitle: 'Your clients',
      clientsEmpty: 'No one yet — share your link and the first sign-ups will appear here.',
      thClient: 'Client',
      thStatus: 'Status',
      thTariff: 'Plan',
      thDate: 'Joined',
      unnamed: 'Unnamed',
      payoutsTitle: 'Payouts',
      payoutsEmpty:
        'No payouts yet. The recommended minimum payout is €50; we will reach out about payouts, or message us any time.',
      paidOn: (date: string) => `Paid ${date}`,
      pending: 'Processing',
      profileTag: 'One more step',
      profileH1: 'Pick your link name',
      profileLead: 'Your account is ready. Now choose a name for your personal referral link.',
      profileSubmit: 'Get my link',
      profileSubmitting: 'Saving…',
      errSlugTaken: 'This link is already taken — pick another name.',
      errSave: 'Could not save. Please try again.',
    },
  },
} as const
