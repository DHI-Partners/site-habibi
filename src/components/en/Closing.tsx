import { ArrowRight } from 'lucide-react'
import { Reveal } from '../Reveal'
import { LiquidButton } from '../ui/liquid-glass-button'
import { useContact } from './ContactProvider'

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260424_064411_9e9d7f84-9277-41f4-ab10-59172d89e6be.mp4'

export default function Closing() {
  const { open } = useContact()

  return (
    <section className="relative overflow-hidden bg-black px-6 py-24 md:px-12 md:py-32 lg:px-16">
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

      {/* Dimming (a bit denser); edges fade to black for a seamless join */}
      <div className="absolute inset-0 bg-black/60" />
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/35 to-black" />

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <Reveal>
          <h2 className="text-3xl font-medium leading-[1.15] tracking-tight text-white sm:text-4xl md:text-5xl">
            Habibi is one system instead of ten scattered tools
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/60 md:text-lg">
            Sales sees inventory, inventory sees purchasing, and you see the whole business at once.
            Start with the free plan and grow with Habibi.
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <LiquidButton
            size="xl"
            onClick={() => open('Habibi')}
            className="mt-9 rounded-full text-white"
          >
            Start with the free plan
            <ArrowRight size={18} />
          </LiquidButton>
        </Reveal>
      </div>
    </section>
  )
}
