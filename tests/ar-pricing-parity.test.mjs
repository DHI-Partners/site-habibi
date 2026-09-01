import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const pricingPath = new URL('../src/components/ar/Pricing.tsx', import.meta.url)

test('Arabic pricing reuses the shared pricing component and mirrors the four English tiers', async () => {
  const source = await readFile(pricingPath, 'utf8')

  assert.match(source, /import \{ PricingGlass, type TierType \} from '\.\.\/en\/ui\/pricing-glass'/)
  assert.match(source, /name: 'Habibi'/)
  assert.match(source, /priceMonthly: '19'/)
  assert.match(source, /priceSemiAnnual: '17'/)
  assert.match(source, /priceAnnual: '13'/)
  assert.match(source, /name: 'Habibi Pro'/)
  assert.match(source, /priceMonthly: '49'/)
  assert.match(source, /priceSemiAnnual: '44'/)
  assert.match(source, /priceAnnual: '34'/)
  assert.match(source, /name: 'Habibi Premium'/)
  assert.match(source, /priceMonthly: '199'/)
  assert.match(source, /priceSemiAnnual: '179'/)
  assert.match(source, /priceAnnual: '139'/)
  assert.match(source, /name: 'Habibi Exclusive'/)
  assert.match(source, /priceLabel:/)
  assert.match(source, /currency="€"/)
  assert.match(source, /perMonth: 'شهريًا'/)
  assert.match(source, /save: 'وفّر'/)
  assert.match(source, /popular: 'الأكثر شيوعًا'/)
  assert.match(source, /exclusive: 'حصري'/)
})
