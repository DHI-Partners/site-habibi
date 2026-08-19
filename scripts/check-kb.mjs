// Сверяет цены в базе знаний ИИ-чата с секцией тарифов на сайте.
//
// Цены живут в нескольких местах, и расхождение здесь означает, что бот
// называет клиентам неверную цену. Скрипт вызывается из `npm run build`.

import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const read = (p) => readFileSync(join(root, p), 'utf8')

const kb = read('api/_kb.js')

/** Достаёт значения указанного поля из файла тарифов. */
function prices(file, field) {
  return [...read(file).matchAll(new RegExp(`${field}: '(\\d+)'`, 'g'))].map((m) => m[1])
}

const checks = []

// Евро: помесячная, полугодовая и годовая цена из русской секции тарифов.
for (const field of ['priceMonthly', 'priceSemiAnnual', 'priceAnnual']) {
  for (const value of prices('src/components/Pricing.tsx', field)) {
    if (value !== '0') checks.push({ value, what: `${field} ${value} €`, src: 'Pricing.tsx' })
  }
}

// Доллары: арабская версия.
for (const value of prices('src/components/ar/Pricing.tsx', 'price')) {
  checks.push({ value, what: `цена ${value} $`, src: 'ar/Pricing.tsx' })
}

// Партнёрская программа: ставки и порог тоже продублированы в базе знаний.
{
  const partner = read('src/components/partner/data.ts')
  const num = (name) => new RegExp(`${name} = ([\\d.]+)`).exec(partner)?.[1]
  const low = num('RATE_LOW')
  const high = num('RATE_HIGH')
  const threshold = num('RATE_THRESHOLD')
  if (low) checks.push({ value: `${Math.round(+low * 100)} %`, what: `ставка ${Math.round(+low * 100)} %`, src: 'partner/data.ts' })
  if (high) checks.push({ value: `${Math.round(+high * 100)} %`, what: `ставка ${Math.round(+high * 100)} %`, src: 'partner/data.ts' })
  if (threshold) checks.push({ value: threshold, what: `порог ${threshold} клиентов`, src: 'partner/data.ts' })
}

const missing = checks.filter(({ value }) => !kb.includes(String(value)))

if (missing.length) {
  console.error('\napi/_kb.js разошёлся с тарифами на сайте — бот будет называть неверные цены.')
  console.error('Не найдено в базе знаний:')
  for (const m of missing) console.error(`  • ${m.what}  (источник: ${m.src})`)
  console.error('\nОбнови api/_kb.js и KB_VERSION.\n')
  process.exit(1)
}

console.log(`check-kb: ок, все ${checks.length} цен(ы) из тарифов есть в базе знаний`)
