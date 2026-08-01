import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import BackgroundVideo from './BackgroundVideo'
import HeroSlide from './slides/HeroSlide'
import ProblemSlide from './slides/ProblemSlide'
import SolutionSlide from './slides/SolutionSlide'
import MarketSlide from './slides/MarketSlide'
import InvestmentSlide from './slides/InvestmentSlide'
import ClosingSlide from './slides/ClosingSlide'

/** Слайды дека. `onNext` используется только теми, где есть кнопка «дальше». */
const SLIDES: Array<(onNext: () => void) => ReactNode> = [
  (onNext) => <HeroSlide onNext={onNext} />,
  () => <ProblemSlide />,
  () => <SolutionSlide />,
  () => <MarketSlide />,
  () => <InvestmentSlide />,
  () => <ClosingSlide />,
]

const TOTAL = SLIDES.length

/** Инвестиционный дек Habibi (маршрут /investors), стиль VEX. */
export default function InvestorDeck() {
  const [current, setCurrent] = useState(0)
  const touchStartX = useRef<number | null>(null)

  const goTo = useCallback((index: number) => {
    setCurrent((prev) => {
      const next = index < 0 ? 0 : index > TOTAL - 1 ? TOTAL - 1 : index
      return next === prev ? prev : next
    })
  }, [])

  const next = useCallback(() => setCurrent((c) => Math.min(c + 1, TOTAL - 1)), [])
  const prev = useCallback(() => setCurrent((c) => Math.max(c - 1, 0)), [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'PageDown') next()
      else if (e.key === 'ArrowLeft' || e.key === 'PageUp') prev()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [next, prev])

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return
    const dx = e.changedTouches[0].clientX - touchStartX.current
    if (Math.abs(dx) > 50) (dx < 0 ? next : prev)()
    touchStartX.current = null
  }

  return (
    <div
      className="relative h-screen w-full overflow-hidden bg-black font-inter text-white"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <BackgroundVideo />

      {/* Мягкий скрим для читаемости текста: сильнее сверху/снизу (навбар,
          навигация, заголовки), слабее в центре — видео остаётся хорошо
          видно, но белый текст не «пропадает» на светлых кадрах. */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-black/55 via-black/25 to-black/65" />

      {/* Контент поверх видео. Лёгкая тень текста каскадом на все элементы —
          дополнительная страховка читаемости поверх видео. */}
      <div className="relative z-10 flex h-full flex-col px-6 pt-6 md:px-12 lg:px-16 [text-shadow:0_1px_14px_rgba(0,0,0,0.55)]">
        {/* Навбар */}
        <div className="liquid-glass flex items-center justify-between rounded-xl px-4 py-2">
          <span className="text-2xl font-semibold tracking-tight">Habibi</span>
          <div className="hidden items-center gap-8 text-sm md:flex">
            <span className="text-gray-300">PropTech</span>
            <span className="text-gray-300">Pre-Seed 2026</span>
          </div>
          <Link
            to="/"
            className="rounded-lg bg-white px-6 py-2 text-sm font-medium text-black transition-colors hover:bg-gray-100"
          >
            Написать нам
          </Link>
        </div>

        {/* Активный слайд — key ремонтирует контент, чтобы анимации играли заново.
            min-h-0 + overflow-y-auto: если слайд выше вьюпорта (маленькие экраны),
            он скроллится, а не обрезается. pb-24 — чтобы нижняя навигация не
            перекрывала контент. */}
        <div
          key={current}
          className="flex min-h-0 flex-1 flex-col overflow-y-auto pb-24 [scrollbar-width:none]"
        >
          {SLIDES[current](next)}
        </div>
      </div>

      {/* Навигация: стрелки + точки + счётчик */}
      <div className="absolute inset-x-0 bottom-5 z-20 flex items-center justify-center gap-6 px-6">
        <button
          onClick={prev}
          disabled={current === 0}
          aria-label="Назад"
          className="liquid-glass flex h-10 w-10 items-center justify-center rounded-full text-white transition-opacity disabled:opacity-30"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-2">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Слайд ${i + 1}`}
              className={`h-2 rounded-full transition-all ${
                i === current ? 'w-6 bg-white' : 'w-2 bg-white/40 hover:bg-white/70'
              }`}
            />
          ))}
        </div>

        <button
          onClick={next}
          disabled={current === TOTAL - 1}
          aria-label="Вперёд"
          className="liquid-glass flex h-10 w-10 items-center justify-center rounded-full text-white transition-opacity disabled:opacity-30"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        <span className="ml-2 hidden text-sm tabular-nums text-gray-300 sm:block">
          {current + 1} / {TOTAL}
        </span>
      </div>
    </div>
  )
}
