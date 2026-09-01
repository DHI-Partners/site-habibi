import HlsVideo from '../HlsVideo'
import { PricingGlass, type TierType } from '../en/ui/pricing-glass'
import { useContact } from './ContactProvider'

const VIDEO_URL =
  'https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8'

/** Arabic copy mirrors the EN tariff structure and commercial terms. */
const TIERS: TierType[] = [
  {
    name: 'Habibi',
    priceMonthly: '19',
    priceSemiAnnual: '17',
    priceAnnual: '13',
    description: 'باقة بداية للفرق الصغيرة.',
    features: [
      'العملاء والمبيعات',
      'العمل والمهام',
      'العملاء من الموقع الإلكتروني',
      'المال تحت السيطرة',
      'حتى 10 مستخدمين',
      'حتى تكاملين',
      'مساحة تخزين 100 ميجابايت',
      'قاعدة المعرفة',
    ],
  },
  {
    name: 'Habibi Pro',
    priceMonthly: '49',
    priceSemiAnnual: '44',
    priceAnnual: '34',
    description: 'للفرق التي تحتاج إلى التكاملات.',
    isPopular: true,
    features: [
      'جميع الوحدات العشر',
      'وكلاء الذكاء الاصطناعي',
      'حتى 50 مستخدمًا',
      'حتى 5 تكاملات',
      'مساحة تخزين 500 ميجابايت',
      'دعم أساسي',
    ],
    excludedFeatures: ['إعداد حل مخصص'],
  },
  {
    name: 'Habibi Premium',
    priceMonthly: '199',
    priceSemiAnnual: '179',
    priceAnnual: '139',
    description: 'للشركات التي تحتاج إلى التكاملات والدعم.',
    features: [
      'كل ما في Habibi Pro',
      'ساعتان لإعداد حل مخصص',
      'حتى 100 مستخدم',
      'مساحة تخزين 1 جيجابايت',
      'تهيئة مخصصة',
      'دعم بأولوية',
      'تحليلات متقدمة',
      'صلاحيات وصول مرنة',
    ],
  },
  {
    name: 'Habibi Exclusive',
    priceMonthly: '',
    priceSemiAnnual: '',
    priceAnnual: '',
    priceLabel: 'بعد التدقيق',
    isExclusive: true,
    noTrial: true,
    description: 'حل مصمم خصيصًا لك. يُحدد السعر بعد تدقيق أعمالك.',
    ctaLabel: 'اطلب عرض سعر',
    features: [
      'كل ما في Habibi Premium',
      'تدقيق وتحسين عمليات الأعمال',
      'إعداد مخصص لأعمالك',
      'إطلاق وحدات مخصصة (CRM، الإنتاج…) — رسوم لمرة واحدة تبدأ من €500',
      'وحدات وتكاملات مخصصة',
      'مدير مخصص',
      'تهيئة وتدريب الفريق',
      'اتفاقية مستوى خدمة ودعم على مدار الساعة',
    ],
  },
]

export default function Pricing() {
  const { open } = useContact()

  return (
    <section
      id="tarify"
      dir="rtl"
      className="relative overflow-hidden bg-black px-6 py-24 md:px-12 md:py-32 lg:px-16"
    >
      <HlsVideo src={VIDEO_URL} className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-black/35" />
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/10 to-black" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <PricingGlass
          title="اختر باقتك"
          description="اختر الباقة المناسبة وانمُ مع Habibi. التوفير أكبر مع الدفع السنوي."
          tiers={TIERS}
          ctaLabel="ابدأ الآن"
          currency="€"
          trialBadge="14 يومًا مجانًا — وصول تجريبي كامل إلى جميع الإمكانيات"
          trialNote="أول 14 يومًا مجانًا، دون بطاقة بنكية"
          billingLabels={{
            monthly: 'شهريًا',
            semiAnnual: 'كل 6 أشهر',
            annual: 'سنويًا',
            save: 'وفّر',
            saveForSixMonths: 'لمدة 6 أشهر',
            saveForYear: 'للسنة',
            perMonth: 'شهريًا',
            popular: 'الأكثر شيوعًا',
            exclusive: 'حصري',
          }}
          onGetStarted={(tier) => open(tier.name)}
        />
      </div>
    </section>
  )
}
