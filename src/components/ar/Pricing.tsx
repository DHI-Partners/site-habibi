import React from 'react'
import { motion, useMotionValue, useMotionTemplate, type Variants } from 'framer-motion'
import { Check } from 'lucide-react'
import HlsVideo from '../HlsVideo'
import { useContact } from './ContactProvider'

const VIDEO_URL = 'https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8'

const NOISE_PATTERN =
  'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")'

interface Tier {
  name: string
  price?: string
  currency?: string
  priceLabel?: string
  badge?: string
  description: string
  features: string[]
  ctaLabel: string
  isPopular?: boolean
  isExclusive?: boolean
}

const TIERS: Tier[] = [
  {
    name: 'Habibi Pro',
    price: '290',
    currency: '$',
    badge: 'الأكثر شيوعًا',
    isPopular: true,
    description: 'لفِرق العمل التي تريد النظام كاملاً مع التكاملات والمرافقة.',
    features: [
      'جميع وحدات النظام العشر',
      'عدد غير محدود من المستخدمين',
      'التكاملات الأساسية',
      'مساحة تخزين 1 جيجابايت',
      'التحليلات المتقدّمة',
      'صلاحيات وصول مرنة',
      'الدعم الفني ذو الأولوية',
      'المرافقة الشخصية',
    ],
    ctaLabel: 'ابدأ الآن',
  },
  {
    name: 'Habibi Premium',
    priceLabel: 'بعد التدقيق',
    badge: 'مخصّص',
    isExclusive: true,
    description: 'حلّ فردي — تُحدَّد التكلفة بعد تدقيق أعمالك.',
    features: [
      'كل ما في باقة «Habibi Pro»',
      'تدقيق وتحسين العمليات التشغيلية',
      'إعداد مخصّص يناسب أعمالك',
      'تنفيذ وحدة مخصّصة (CRM، الإنتاج…) — ابتداءً من 300$',
      'وحدات وتكاملات مخصّصة',
      'مدير حساب مخصّص',
      'التنفيذ وتدريب الفريق',
      'اتفاقية مستوى خدمة (SLA) ودعم 24/7',
    ],
    ctaLabel: 'اطلب عرضًا',
  },
]

const legoVariant: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.8 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 350, damping: 25 } },
}

function PricingCard({ tier, onGetStarted }: { tier: Tier; onGetStarted?: (t: Tier) => void }) {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 60, scale: 0.95 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { type: 'spring', stiffness: 300, damping: 24, staggerChildren: 0.1, delayChildren: 0.15 },
        },
      }}
      onMouseMove={handleMouseMove}
      className={`group relative flex w-full flex-col overflow-hidden rounded-[32px] backdrop-blur-3xl backdrop-saturate-200 backdrop-brightness-110 transition-all duration-500 ${
        tier.isExclusive
          ? 'border border-amber-400/40 bg-gradient-to-b from-[#17120a]/95 to-[#0b0b0b]/92 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.7),0_0_60px_rgba(212,175,55,0.14),inset_0_1px_1px_rgba(255,214,140,0.3)]'
          : 'border border-white/20 bg-white/1 shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),inset_0_-1px_1px_rgba(255,255,255,0.05),0_32px_64px_-12px_rgba(0,0,0,0.6),0_0_80px_rgba(255,255,255,0.05)]'
      }`}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 z-0 rounded-[32px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: useMotionTemplate`radial-gradient(600px at ${mouseX}px ${mouseY}px, rgba(255,255,255,0.15), transparent)` }}
      />

      {tier.isPopular && (
        <div
          className="pointer-events-none absolute inset-0 z-0 rounded-[32px] p-px"
          style={{
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
          }}
        >
          <div
            className="absolute -inset-full animate-[spin_4s_linear_infinite]"
            style={{ background: 'conic-gradient(from 0deg, transparent 70%, rgba(255,255,255,0.8) 100%)' }}
          />
        </div>
      )}

      {tier.isExclusive && (
        <div
          className="pointer-events-none absolute inset-0 z-0 rounded-[32px] p-px"
          style={{
            background:
              'linear-gradient(140deg, rgba(245,215,130,0.95), rgba(150,110,40,0.25) 45%, rgba(245,215,130,0.85))',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
          }}
        />
      )}

      <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.03] mix-blend-overlay" style={{ backgroundImage: NOISE_PATTERN }} />

      {tier.badge && (
        <div
          className={`absolute top-0 left-1/2 z-10 -translate-x-1/2 rounded-b-xl border-x border-b px-4 py-1 text-xs font-semibold backdrop-blur-md ${
            tier.isExclusive
              ? 'border-amber-400/30 bg-amber-400/15 tracking-wide text-amber-200 shadow-[0_4px_12px_rgba(0,0,0,0.3)]'
              : 'border-white/10 bg-white/10 text-white/90 shadow-[0_4px_12px_rgba(0,0,0,0.2)]'
          }`}
        >
          {tier.badge}
        </div>
      )}

      <div className="relative z-10 flex flex-1 flex-col p-8 md:p-10">
        <motion.h3
          variants={legoVariant}
          className={`text-xl font-semibold tracking-wide ${tier.isExclusive ? 'text-amber-100/90' : 'text-white/80'}`}
        >
          {tier.name}
        </motion.h3>

        <motion.div variants={legoVariant} className="mt-4 mb-2 flex items-baseline gap-2">
          {tier.priceLabel ? (
            <div className="flex h-[60px] items-center">
              <span
                className={`block text-[34px] font-bold leading-none tracking-tight md:text-[38px] ${
                  tier.isExclusive ? 'text-amber-200' : 'text-white'
                }`}
              >
                {tier.priceLabel}
              </span>
            </div>
          ) : (
            <>
              <div className="flex h-[60px] items-center" dir="ltr">
                <span className="text-2xl font-medium tracking-tight text-white/40">{tier.currency}</span>
                <span className="block text-[60px] font-bold leading-none tracking-tighter text-white">{tier.price}</span>
              </div>
              <span className="text-lg font-medium text-white/40">/شهريًا</span>
            </>
          )}
        </motion.div>

        <motion.p variants={legoVariant} className="mb-8 min-h-[40px] text-sm leading-relaxed text-white/40">
          {tier.description}
        </motion.p>

        <motion.div variants={legoVariant} className={`mb-8 h-px w-full ${tier.isExclusive ? 'bg-amber-400/20' : 'bg-white/10'}`} />

        <div className="mb-10 flex flex-1 flex-col gap-4">
          {tier.features.map((feat, i) => (
            <motion.div key={i} variants={legoVariant} className="flex items-start gap-3">
              <div
                className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)] ${
                  tier.isExclusive ? 'border-amber-400/30 bg-amber-400/15' : 'border-white/10 bg-white/10'
                }`}
              >
                <Check className={`h-3 w-3 ${tier.isExclusive ? 'text-amber-300' : 'text-white/90'}`} strokeWidth={3} />
              </div>
              <span className="text-[14px] font-medium leading-tight text-white/70">{feat}</span>
            </motion.div>
          ))}
        </div>

        <motion.div variants={legoVariant}>
          <button
            onClick={() => onGetStarted?.(tier)}
            className={`w-full rounded-[16px] py-4 text-[15px] font-semibold shadow-[inset_0_1px_1px_rgba(255,255,255,0.25)] transition-all duration-300 ${
              tier.isExclusive
                ? 'bg-gradient-to-r from-amber-300 to-amber-500 text-black hover:scale-[1.02] hover:from-amber-200 hover:to-amber-400'
                : 'bg-white text-black hover:scale-[1.02] hover:bg-white/90'
            }`}
          >
            {tier.ctaLabel}
          </button>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default function Pricing() {
  const { open } = useContact()

  return (
    <section id="tarify" className="relative overflow-hidden bg-black px-6 py-24 md:px-12 md:py-32 lg:px-16">
      {/* فيديو الخلفية (HLS) */}
      <HlsVideo src={VIDEO_URL} className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-black/35" />
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/10 to-black" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15 } } }}
          className="flex w-full flex-col items-center gap-16"
        >
          <div className="space-y-4 px-4 text-center">
            <motion.h2 variants={legoVariant} className="text-4xl font-bold tracking-tight text-white md:text-5xl">
              أسعار بسيطة وشفّافة
            </motion.h2>
            <motion.p variants={legoVariant} className="mx-auto max-w-2xl text-lg text-white/50 md:text-xl">
              اختر الباقة المناسبة وانمُ مع Habibi.
            </motion.p>
          </div>

          <div className="mx-auto grid w-full max-w-4xl grid-cols-1 items-stretch gap-6 md:grid-cols-2 lg:gap-8">
            {TIERS.map((tier) => (
              <PricingCard key={tier.name} tier={tier} onGetStarted={(t) => open(t.name)} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
