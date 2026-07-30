import HlsVideo from './HlsVideo'
import { PricingGlass, type TierType } from './ui/pricing-glass'
import { scrollToId } from '@/lib/utils'

const VIDEO_URL =
  'https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8'

const TIERS: TierType[] = [
  {
    name: 'Habibi',
    priceMonthly: '0',
    priceAnnual: '0',
    description: 'Бесплатный тариф для знакомства с CRM.',
    features: ['CRM и продажи', 'До 1 рабочего пространства', 'База знаний'],
  },
  {
    name: 'Habibi +',
    priceMonthly: '49',
    priceAnnual: '39',
    description: 'Для команд, которым нужны интеграции.',
    isPopular: true,
    features: [
      'Всё из бесплатного тарифа',
      'Интеграции',
      'Несколько рабочих пространств',
      'Отчёты и аналитика',
      'Базовая поддержка',
    ],
  },
  {
    name: 'Habibi Premium',
    priceMonthly: '199',
    priceAnnual: '159',
    description: 'Для компаний с интеграциями и сопровождением.',
    features: [
      'Всё из тарифа «Habibi +»',
      'Персональное сопровождение',
      'Приоритетная поддержка',
      'Расширенная аналитика',
      'Гибкие права доступа',
    ],
  },
]

export default function Pricing() {
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

      <div className="relative z-10 mx-auto max-w-6xl">
        <PricingGlass
          title="Начните с бесплатного тарифа"
          description="Выберите подходящий план и растите вместе с Habibi. При годовой оплате — выгоднее."
          tiers={TIERS}
          ctaLabel="Начать"
          onGetStarted={() => scrollToId('kontakty')}
        />
      </div>
    </section>
  )
}
