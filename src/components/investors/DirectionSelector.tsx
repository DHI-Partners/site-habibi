import { Link } from 'react-router-dom'
import { Building2, Plane, ArrowUpRight, Sparkles } from 'lucide-react'
import SereneBackground from './serene/SereneBackground'

interface Direction {
  to: string
  icon: typeof Building2
  title: string
  subtitle: string
  desc: string
}

const DIRECTIONS: Direction[] = [
  {
    to: '/investors/real-estate',
    icon: Building2,
    title: 'Недвижимость',
    subtitle: 'Habibi PropTech',
    desc: 'ERP для застройщиков, девелоперов, агентств и управляющих компаний.',
  },
  {
    to: '/investors/tourism',
    icon: Plane,
    title: 'Туризм',
    subtitle: 'Habibi Hajj & Umrah',
    desc: 'ERP для туроператоров и паломнических центров — Хадж и Умра в СНГ.',
  },
]

/** Страница-селектор направлений инвестиций (Serene-стиль), маршрут /investors. */
export default function DirectionSelector() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#0a0608] font-inter text-white">
      <SereneBackground overlayClassName="bg-black/45" />

      {/* Навбар */}
      <nav className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-6 py-5 md:px-12">
        <span className="font-dancing text-2xl text-white md:text-3xl">Habibi</span>
        <Link
          to="/"
          className="rounded-full bg-white px-6 py-2.5 text-sm font-medium tracking-wide text-black transition-all duration-300 hover:bg-white/90"
        >
          На сайт
        </Link>
      </nav>

      {/* Контент */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-28 text-center">
        <span className="mb-5 text-xs uppercase tracking-[0.35em] text-white/50">
          Инвесторам
        </span>
        <h1 className="text-glow font-instrument text-4xl leading-[1.05] tracking-tight text-white md:text-6xl lg:text-7xl">
          Выберите направление
        </h1>
        <p className="mt-5 max-w-xl text-sm text-white/70 md:mt-6 md:text-base">
          Habibi — экосистема специализированных ERP-продуктов. Каждое направление —
          отдельное инвестиционное предложение.
        </p>

        {/* Карточки направлений */}
        <div className="mt-12 grid w-full max-w-4xl gap-5 sm:grid-cols-2">
          {DIRECTIONS.map((d) => {
            const Icon = d.icon
            return (
              <Link
                key={d.to}
                to={d.to}
                className="serene-glass group flex flex-col rounded-3xl p-7 text-left transition-all duration-300 hover:-translate-y-1 hover:button-glow"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/15 bg-white/5">
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <ArrowUpRight className="h-5 w-5 text-white/40 transition-all duration-300 group-hover:text-white" />
                </div>
                <h2 className="mt-6 font-instrument text-3xl text-white">{d.title}</h2>
                <span className="mt-1 text-xs uppercase tracking-[0.2em] text-white/45">
                  {d.subtitle}
                </span>
                <p className="mt-3 text-sm leading-relaxed text-white/60">{d.desc}</p>
              </Link>
            )
          })}
        </div>

        {/* Будущие направления */}
        <div className="mt-6 flex items-center gap-2 text-xs text-white/40">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Скоро — новые направления</span>
        </div>
      </div>
    </div>
  )
}
