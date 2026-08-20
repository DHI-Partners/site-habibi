import Navbar from './Navbar'
import HeroAskBar from '../chat/HeroAskBar'

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_204221_5339e40b-e73d-4ab0-9c65-79c18c66fd50.mp4'

const ASK_LABELS = {
  placeholder: 'Ask about Habibi…',
  sendLabel: 'Ask',
  hint: 'Answered by the Habibi AI assistant — right away, no waiting',
  prompts: [
    'How do I automate stock tracking?',
    'How do I stop losing WhatsApp leads?',
    'How much does Habibi cost?',
    'How do I see profit in real time?',
  ],
}

export default function Hero() {
  return (
    <section id="top" className="relative h-screen w-full overflow-hidden bg-black">
      {/* Background video */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        style={{ objectPosition: '70% center' }}
        autoPlay
        muted
        loop
        playsInline
      >
        <source src={VIDEO_URL} type="video/mp4" />
      </video>

      {/* Dimming for text readability; the bottom fades to black for a seamless join */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black" />

      {/* Navigation over the video */}
      <Navbar />

      {/* Hero content */}
      <div className="relative z-10 flex h-[calc(100vh-80px)] flex-col justify-between px-6 pb-10 pt-12 sm:pb-12 sm:pt-16 md:px-12 md:pb-16 md:pt-20 lg:px-16">
        {/* Top block */}
        <div className="max-w-3xl">
          <h1 className="text-3xl font-medium leading-[1.1] tracking-tight text-white [animation:fadeSlideUp_0.8s_ease_0.2s_both] sm:text-4xl md:text-5xl lg:text-6xl">
            Run your entire business
            <br />
            in one place
          </h1>
        </div>

        {/* Bottom block */}
        <div>
          <p className="mb-3 max-w-sm text-sm leading-relaxed text-white/70 [animation:fadeSlideUp_0.8s_ease_0.7s_both] sm:max-w-xl sm:text-base md:text-lg">
            Habibi brings customers, sales, finance, inventory, people, projects and every other
            process together in one system.
          </p>
          <p className="mb-5 max-w-sm text-sm font-medium leading-relaxed text-white/85 [animation:fadeSlideUp_0.8s_ease_0.8s_both] sm:mb-6 sm:max-w-xl sm:text-base md:text-lg">
            Less Excel, WhatsApp and scattered tools. More control over your business.
          </p>
          <div className="[animation:fadeSlideUp_0.8s_ease_0.9s_both]">
            <HeroAskBar labels={ASK_LABELS} lang="en" dir="ltr" />
          </div>

        </div>
      </div>
    </section>
  )
}
