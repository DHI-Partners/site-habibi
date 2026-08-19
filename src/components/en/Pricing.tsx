import HlsVideo from '../HlsVideo'
import { PricingGlass, type TierType } from './ui/pricing-glass'
import { useContact } from './ContactProvider'

const VIDEO_URL =
  'https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8'

/** Source of truth for EN plans — also used by the partner page (components/partner/en). */
export const TIERS: TierType[] = [
  {
    name: 'Habibi',
    priceMonthly: '19',
    priceSemiAnnual: '17',
    priceAnnual: '13',
    description: 'A starter plan for small teams.',
    features: [
      'CRM & sales',
      'Projects & tasks',
      'Website & leads',
      'Finance',
      'Up to 10 users',
      'Up to 2 integrations',
      '100 MB storage',
      'Knowledge base',
    ],
  },
  {
    name: 'Habibi Pro',
    priceMonthly: '49',
    priceSemiAnnual: '44',
    priceAnnual: '34',
    description: 'For teams that need integrations.',
    isPopular: true,
    features: [
      'All 10 modules',
      'AI agents',
      'Up to 50 users',
      'Up to 5 integrations',
      '500 MB storage',
      'Basic support',
    ],
    excludedFeatures: ['Custom solution setup'],
  },
  {
    name: 'Habibi Premium',
    priceMonthly: '199',
    priceSemiAnnual: '179',
    priceAnnual: '139',
    description: 'For companies that need integrations and support.',
    features: [
      'Everything in Habibi Pro',
      '2 hours of custom solution setup',
      'Up to 100 users',
      '1 GB storage',
      'Dedicated onboarding',
      'Priority support',
      'Advanced analytics',
      'Flexible access rights',
    ],
  },
  {
    name: 'Habibi Exclusive',
    priceMonthly: '',
    priceSemiAnnual: '',
    priceAnnual: '',
    priceLabel: 'After audit',
    isExclusive: true,
    noTrial: true,
    description: 'A tailored solution. Pricing is calculated after an audit of your business.',
    ctaLabel: 'Request a quote',
    features: [
      'Everything in Habibi Premium',
      'Audit and optimization of business processes',
      'Custom setup for your business',
      'Custom module rollout (CRM, Manufacturing…) — one-time fee from €500',
      'Custom modules and integrations',
      'Dedicated manager',
      'Onboarding and team training',
      'SLA and 24/7 support',
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
      {/* Background video (HLS) */}
      <HlsVideo src={VIDEO_URL} className="absolute inset-0 h-full w-full object-cover" />

      {/* Dimming; edges fade to black for a seamless join */}
      <div className="absolute inset-0 bg-black/35" />
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/10 to-black" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <PricingGlass
          title="Choose your plan"
          description="Choose the plan that fits and grow with Habibi. Annual billing saves you more."
          tiers={TIERS}
          ctaLabel="Get started"
          currency="€"
          trialBadge="14 days free — full demo access to every feature"
          trialNote="First 14 days free, no card required"
          onGetStarted={(tier) => open(tier.name)}
        />
      </div>
    </section>
  )
}
