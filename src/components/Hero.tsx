import { ArrowRight } from 'lucide-react'
import Navbar from './Navbar'
import { LiquidButton } from './ui/liquid-glass-button'
import { scrollToId } from '@/lib/utils'

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_204221_5339e40b-e73d-4ab0-9c65-79c18c66fd50.mp4'

export default function Hero() {
  return (
    <section id="top" className="relative h-screen w-full overflow-hidden bg-black">
      {/* Фоновое видео */}
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

      {/* Затемнение для читаемости текста; низ уходит в чёрный для бесшовного стыка */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black" />

      {/* Навигация поверх видео */}
      <Navbar />

      {/* Контент героя */}
      <div className="relative z-10 flex h-[calc(100vh-80px)] flex-col justify-between px-6 pb-10 pt-12 sm:pb-12 sm:pt-16 md:px-12 md:pb-16 md:pt-20 lg:px-16">
        {/* Верхний блок */}
        <div className="max-w-3xl">
          <h1 className="text-3xl font-medium leading-[1.1] tracking-tight text-white [animation:fadeSlideUp_0.8s_ease_0.2s_both] sm:text-4xl md:text-5xl lg:text-6xl">
            Больше контроля.
            <br />
            Больше времени
            <br />
            на развитие.
          </h1>
        </div>

        {/* Нижний блок */}
        <div>
          <p className="mb-5 max-w-sm text-sm leading-relaxed text-white/70 [animation:fadeSlideUp_0.8s_ease_0.7s_both] sm:mb-6 sm:max-w-xl sm:text-base md:text-lg">
            Когда весь бизнес виден в одной системе, управлять становится проще. Вы замечаете рост
            продаж раньше, видите узкие места до того, как они станут проблемой, и принимаете решения
            на основе цифр, а не ощущений.
          </p>
          <div className="flex flex-wrap items-center gap-3 [animation:fadeSlideUp_0.8s_ease_0.9s_both]">
            <LiquidButton
              size="lg"
              onClick={() => scrollToId('tarify')}
              className="rounded-full text-white"
            >
              Начать бесплатно
              <ArrowRight size={16} />
            </LiquidButton>
            <LiquidButton
              size="lg"
              onClick={() => scrollToId('vozmozhnosti')}
              className="rounded-full text-white"
            >
              Смотреть возможности
            </LiquidButton>
          </div>
        </div>
      </div>
    </section>
  )
}
