import type { ComponentType } from 'react'

/** Контент страницы Habibi Consulting для одного языка. */
export interface ConsultingContent {
  /** Язык документа и направление текста. */
  lang: 'ru' | 'en' | 'ar' | 'uz'
  dir: 'ltr' | 'rtl'
  /** Адрес главной страницы этого языка — для ссылок «на главную» и подвала. */
  home: string
  /** <title> вкладки. */
  docTitle: string
  /** Подписи разделов (SectionTag) и заголовки. */
  ui: {
    backHome: string
    heroTag: string
    heroTitle: string
    heroLead: string
    heroAccent: string
    heroCta: string
    differenceTag: string
    differenceTitle: string
    audienceTag: string
    audienceTitle: string
    includedTag: string
    includedTitle: string
    stepsTag: string
    stepsTitle: string
    tariffTag: string
    tariffName: string
    tariffNote: string
    tariffText: string
    teamTag: string
    teamTitle: string
    formTag: string
    formTitle: string
    formLead: string
    footerText: string
    footerReply: string
  }
  /** «Кто этим занимается» — спикеры. Пустая карточка = место под будущего спикера. */
  team: TeamMember[]
  difference: { title: string; text: string; tone: 'plain' | 'emerald' }[]
  audience: { icon: string; text: string }[]
  included: { title: string; text: string }[]
  steps: string[]
  footerLinks: { label: string; href: string }[]
  /** Локализованные подписи формы. */
  form: ConsultingFormLabels
  /** Виджет ИИ-чата нужного языка. */
  Chat: ComponentType
}

export interface TeamMember {
  /** Место под будущего спикера — карточка-заглушка. */
  placeholder?: boolean
  name: string
  role: string
  /** Инициалы — пока фото не загружено. */
  initials?: string
  /** Путь к фото в public/, например '/team/ilgiz.jpg'. */
  photo?: string
  /** Абзацы биографии. */
  bio?: string[]
  /** Короткие подписи-факты под биографией. */
  facts?: string[]
}

export interface ConsultingFormLabels {
  name: string
  namePlaceholder: string
  contact: string
  contactPlaceholder: string
  email: string
  emailPlaceholder: string
  submit: string
  sending: string
  underButton: string
  /** Строка согласия под кнопкой: текст + подписи ссылок на документы. */
  consent: { before: string; privacy: string; middle: string; terms: string; after: string }
  privacyHref: string
  termsHref: string
  successTitle: string
  successText: string
  error: string
  /** Тема письма заявки. */
  subject: string
  fields: { name: string; label: string; hint?: string; type: 'text' | 'textarea'; required: boolean }[]
}
