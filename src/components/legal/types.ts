import type { ComponentType } from 'react'

/** Контент правовой страницы (политика конфиденциальности) для одного языка. */
export interface LegalContent {
  lang: 'ru' | 'en' | 'ar' | 'uz'
  dir: 'ltr' | 'rtl'
  /** Адрес главной страницы этого языка. */
  home: string
  docTitle: string
  backHome: string
  title: string
  /** Дата последнего обновления — показывается под заголовком. */
  updatedLabel: string
  updated: string
  /** Вводный абзац. */
  intro: string
  sections: LegalSection[]
  /** Подвал: ссылки на разделы сайта. */
  footerLinks: { label: string; href: string }[]
  footerText: string
  Chat: ComponentType
}

export interface LegalSection {
  title: string
  /** Абзацы текста. */
  body?: string[]
  /** Маркированный список. */
  bullets?: string[]
  /** Таблица «что собираем — зачем — сколько храним». */
  table?: { head: string[]; rows: string[][] }
  /** Выделенная врезка в конце раздела. */
  note?: string
}
