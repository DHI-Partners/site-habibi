import type { ModulePageData } from '../types'
import { CRM } from './pages/crm'
import { PURCHASES } from './pages/purchases'
import { INVENTORY } from './pages/inventory'
import { MANUFACTURING } from './pages/manufacturing'
import { FINANCE } from './pages/finance'
import { HR } from './pages/hr'
import { PROJECTS } from './pages/projects'
import { SERVICE } from './pages/service'
import { POS } from './pages/pos'
import { WEBSITE_LEADS } from './pages/website-leads'

/* Реестр страниц модулей узбекской версии (/uz/modules/:slug).
   В отличие от EN/AR, где всё лежит одним файлом на 2500 строк, здесь
   каждый модуль — свой файл в pages/: так их проще править по одному.
   Слаги совпадают с английскими, чтобы ссылки между языками не расходились. */

export const UZ_MODULE_PAGES: Record<string, ModulePageData> = {
  crm: CRM,
  purchases: PURCHASES,
  inventory: INVENTORY,
  manufacturing: MANUFACTURING,
  finance: FINANCE,
  hr: HR,
  projects: PROJECTS,
  service: SERVICE,
  pos: POS,
  'website-leads': WEBSITE_LEADS,
}
