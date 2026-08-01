import { Link } from 'react-router-dom'
import AnimatedHeading from '../AnimatedHeading'
import FadeIn from '../FadeIn'

/** Слайд 6 — финальный CTA. */
export default function ClosingSlide() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center py-24 text-center">
      <AnimatedHeading
        text={'Станьте партнёром\nERP-платформы Habibi'}
        className="text-4xl font-normal md:text-5xl lg:text-6xl xl:text-7xl"
        style={{ letterSpacing: '-0.04em' }}
      />
      <FadeIn delay={900} duration={1000}>
        <p className="mx-auto mt-5 max-w-xl text-base text-gray-300 md:text-lg">
          Присоединяйтесь к запуску PropTech-платформы для рынка недвижимости
          СНГ и Центральной Азии.
        </p>
      </FadeIn>
      <FadeIn delay={1300} duration={1000}>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            to="/"
            className="rounded-lg bg-white px-8 py-3 font-medium text-black transition-colors hover:bg-gray-100"
          >
            Написать нам
          </Link>
        </div>
      </FadeIn>
    </div>
  )
}
