import { Reveal } from '../Reveal'
import {
  TransparencyIcon,
  GrowthIcon,
  LoyaltyIcon,
  FreeTimeIcon,
} from '../BenefitIcons'
import type { ComponentType } from 'react'

interface Benefit {
  Icon: ComponentType
  title: string
  text: string
}

const BENEFITS: Benefit[] = [
  {
    Icon: TransparencyIcon,
    title: 'Transparency',
    text: 'Every process, metric and team member is visible in real time, from a single screen.',
  },
  {
    Icon: GrowthIcon,
    title: 'Measurable growth',
    text: 'Fewer lost leads, faster customer handling, and higher conversion at every stage.',
  },
  {
    Icon: LoyaltyIcon,
    title: 'Customer loyalty',
    text: 'Timely reminders, service and attention to every deal build trust and bring customers back.',
  },
  {
    Icon: FreeTimeIcon,
    title: 'Free time',
    text: 'Routine gets automated, so you focus on strategy and growing the company — not fighting fires.',
  },
]

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260411_104032_69319010-2458-492b-b04d-b40a5dfa4482.mp4'

export default function Benefits() {
  return (
    <section
      id="vozmozhnosti"
      className="relative overflow-hidden bg-black px-6 py-24 md:px-12 md:py-32 lg:px-16"
    >
      {/* Background video */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src={VIDEO_URL} type="video/mp4" />
      </video>

      {/* Light dimming; the edges fade to black for a seamless join with neighbouring blocks */}
      <div className="absolute inset-0 bg-black/35" />
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/10 to-black" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <Reveal>
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-white/40">
            With Habibi you get
          </p>
          <h2 className="max-w-2xl text-2xl font-medium leading-tight tracking-tight text-white sm:text-3xl md:text-4xl">
            More control over your business and more time to grow
          </h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {BENEFITS.map((benefit, i) => (
            <Reveal key={benefit.title} delay={i * 0.08}>
              <div className="group h-full rounded-2xl border border-white/10 bg-black/40 p-6 backdrop-blur-md transition-colors hover:border-white/20 hover:bg-black/50">
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white transition-transform duration-300 group-hover:scale-105">
                  <benefit.Icon />
                </div>
                <h3 className="mb-2 text-lg font-medium text-white">{benefit.title}</h3>
                <p className="text-sm leading-relaxed text-white/60">{benefit.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <p className="mt-12 max-w-3xl text-base leading-relaxed text-white/70 md:text-lg">
            Habibi takes on the operational complexity so you can focus on what matters most —{' '}
            <span className="text-white">growing your business</span>.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
