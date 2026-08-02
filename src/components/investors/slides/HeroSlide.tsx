import { Link } from 'react-router-dom'
import { Download } from 'lucide-react'
import AnimatedHeading from '../AnimatedHeading'
import FadeIn from '../FadeIn'
import { useDownloadGate } from '../gateContext'

/** Слайд 1 — титульный, в стиле VEX-hero (контент прижат к низу). */
export default function HeroSlide() {
  const openGate = useDownloadGate()
  return (
    <div className="flex flex-1 flex-col justify-end pb-12 lg:pb-16">
      <div className="lg:grid lg:grid-cols-2 lg:items-end">
        {/* Левая колонка */}
        <div>
          <AnimatedHeading
            text={'Habibi PropTech.\nИнвестиционное предложение.'}
            className="mb-4 text-4xl font-normal md:text-5xl lg:text-6xl xl:text-7xl"
            style={{ letterSpacing: '-0.04em' }}
          />
          <FadeIn delay={800} duration={1000}>
            <p className="mb-5 max-w-xl text-base text-gray-300 md:text-lg">
              ERP-платформа для застройщиков, девелоперов, агентств недвижимости
              и управляющих компаний. Все процессы — от бронирования до
              финансов — в одном окне.
            </p>
          </FadeIn>
          <FadeIn delay={1200} duration={1000}>
            <div className="flex flex-wrap gap-4">
              <button
                type="button"
                onClick={openGate}
                className="flex items-center gap-2 rounded-lg bg-white px-8 py-3 font-medium text-black transition-colors hover:bg-gray-100"
              >
                <Download className="h-5 w-5" />
                Скачать фин модель
              </button>
              <Link
                to="/"
                className="liquid-glass rounded-lg border border-white/20 px-8 py-3 font-medium text-white transition-colors hover:bg-white hover:text-black"
              >
                На сайт
              </Link>
            </div>
          </FadeIn>
        </div>

        {/* Правая колонка — стеклянный тег */}
        <div className="mt-8 flex items-end justify-start lg:mt-0 lg:justify-end">
          <FadeIn delay={1400} duration={1000}>
            <div className="liquid-glass rounded-xl border border-white/20 px-6 py-3">
              <span className="text-lg font-light md:text-xl lg:text-2xl">
                Девелопмент. Аренда. Финансы.
              </span>
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  )
}
