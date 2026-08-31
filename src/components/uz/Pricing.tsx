import HlsVideo from '../HlsVideo'
import { PricingGlass, type TierType } from './ui/pricing-glass'
import { useContact } from './ContactProvider'

const VIDEO_URL =
  'https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8'

/**
 * Курс для показа цен в сумах. Счёт выставляется в евро — это ориентировочный
 * пересчёт для посетителя. Курс ЦБ РУз на 21.08.2026 — 13 843 сум/€; берём с
 * небольшим запасом на колебания. Обновляй при заметном изменении курса.
 */
const EUR_TO_UZS = 13_900

/** Шаг округления суммы в сумах — цены выглядят прайс-листом, а не результатом конвертации. */
const UZS_ROUND = 10_000

/** Источник правды по тарифам узбекской версии (цены = RU/EN, евро). */
export const TIERS: TierType[] = [
  {
    name: 'Habibi',
    priceMonthly: '19',
    priceSemiAnnual: '17',
    priceAnnual: '13',
    description: 'Kichik jamoalar uchun boshlangʻich tarif.',
    features: [
      'Mijozlar va savdo',
      'Ishlar va vazifalar',
      'Saytdan kelgan mijozlar',
      'Pul nazorat ostida',
      '10 tagacha foydalanuvchi',
      '2 tagacha integratsiya',
      '100 MB xotira',
      'Bilimlar bazasi',
    ],
  },
  {
    name: 'Habibi Pro',
    priceMonthly: '49',
    priceSemiAnnual: '44',
    priceAnnual: '34',
    description: 'Integratsiyalar kerak boʻlgan jamoalar uchun.',
    isPopular: true,
    features: [
      'Barcha 10 modul',
      'AI-agentlar',
      '50 tagacha foydalanuvchi',
      '5 tagacha integratsiya',
      '500 MB xotira',
      'Bazaviy texnik yordam',
    ],
    excludedFeatures: ['Individual yechim sozlash'],
  },
  {
    name: 'Habibi Premium',
    priceMonthly: '199',
    priceSemiAnnual: '179',
    priceAnnual: '139',
    description: 'Integratsiya va kengaytirilgan yordam kerak boʻlgan kompaniyalar uchun.',
    features: [
      'Habibi Proʼdagi hamma narsa',
      '2 soatlik individual yechim sozlash',
      '100 tagacha foydalanuvchi',
      '1 GB xotira',
      'Shaxsiy onboarding',
      'Ustuvor yordam',
      'Kengaytirilgan analitika',
      'Moslashuvchan kirish huquqlari',
    ],
  },
  {
    name: 'Habibi Exclusive',
    priceMonthly: '',
    priceSemiAnnual: '',
    priceAnnual: '',
    priceLabel: 'Auditdan soʻng',
    isExclusive: true,
    noTrial: true,
    description: 'Maxsus yechim. Narx biznesingiz auditidan soʻng hisoblanadi.',
    ctaLabel: 'Narxni soʻrash',
    features: [
      'Habibi Premiumʼdagi hamma narsa',
      'Biznes-jarayonlar auditi va optimallashtirish',
      'Biznesingiz uchun individual sozlash',
      'Individual modul joriy etish (CRM, Ishlab chiqarish…) — bir martalik toʻlov, minimal {{500}}',
      'Individual modullar va integratsiyalar',
      'Shaxsiy menejer',
      'Onboarding va jamoani oʻqitish',
      'SLA va 24/7 yordam',
    ],
  },
]

export default function Pricing() {
  const { open } = useContact()

  return (
    <section
      id="tarify"
      className="relative overflow-hidden bg-black px-6 py-24 md:px-12 md:py-32 lg:px-16"
    >
      {/* Фоновое видео (HLS) */}
      <HlsVideo src={VIDEO_URL} className="absolute inset-0 h-full w-full object-cover" />

      {/* Затемнение; края уходят в чёрный для бесшовного стыка */}
      <div className="absolute inset-0 bg-black/35" />
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/10 to-black" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <PricingGlass
          title="Tarifingizni tanlang"
          description="Mos tarifni tanlang va Habibi bilan birga oʻsing. Yillik toʻlov koʻproq tejaydi."
          tiers={TIERS}
          ctaLabel="Boshlash"
          currency="€"
          currencyLabel="EUR"
          altCurrency={{
            label: 'soʻm',
            suffix: 'soʻm',
            rate: EUR_TO_UZS,
            round: UZS_ROUND,
            note: `Soʻmdagi narxlar taxminiy — 1 € ≈ ${EUR_TO_UZS.toLocaleString('ru-RU').replace(/ /g, ' ')} soʻm kursi boʻyicha hisoblangan. Hisob-kitob evroda yuritiladi, aniq summani menejer tasdiqlaydi.`,
          }}
          trialBadge="14 kun bepul — barcha imkoniyatlarga toʻliq demo-kirish"
          trialNote="Dastlabki 14 kun bepul, karta talab qilinmaydi"
          onGetStarted={(tier) => open(tier.name)}
        />
      </div>
    </section>
  )
}
