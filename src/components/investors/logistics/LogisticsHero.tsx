import { motion } from 'framer-motion'
import { FileText, FileSpreadsheet } from 'lucide-react'

const YELLOW = '#FFC61A'
const TEAL = '#0E3A44'

/** Едущий грузовик (SVG): крутятся колёса, кузов слегка покачивается. */
function Truck() {
  const wheel = (cx: number) => (
    <g style={{ transformOrigin: `${cx}px 116px`, animation: 'logiWheel 0.7s linear infinite' }}>
      <circle cx={cx} cy={116} r={17} fill="#1f2937" />
      <circle cx={cx} cy={116} r={7.5} fill="#cbd5e1" />
      <line x1={cx} y1={104} x2={cx} y2={128} stroke="#94a3b8" strokeWidth={2.5} />
      <line x1={cx - 12} y1={116} x2={cx + 12} y2={116} stroke="#94a3b8" strokeWidth={2.5} />
    </g>
  )
  return (
    <svg viewBox="0 0 260 140" className="h-auto w-full max-w-[300px]">
      <ellipse cx={130} cy={132} rx={122} ry={7} fill="rgba(0,0,0,0.18)" />
      {/* Кузов + кабина покачиваются */}
      <g style={{ animation: 'logiBob 1.6s ease-in-out infinite' }}>
        {/* Прицеп */}
        <rect x={8} y={34} width={150} height={76} rx={7} fill="#ffffff" stroke={TEAL} strokeWidth={3} />
        <rect x={8} y={34} width={150} height={15} rx={7} fill={YELLOW} />
        <text x={83} y={84} textAnchor="middle" fontSize={20} fontWeight={800} fill={TEAL} fontFamily="Inter, sans-serif" letterSpacing={1}>
          HABIBI
        </text>
        {/* Кабина */}
        <path d="M162 55 h34 a6 6 0 0 1 6 6 v14 l22 6 a6 6 0 0 1 4 6 v17 a6 6 0 0 1 -6 6 h-60 a6 6 0 0 1 -6 -6 V61 a6 6 0 0 1 6 -6 z" fill={YELLOW} stroke={TEAL} strokeWidth={3} />
        {/* Лобовое стекло */}
        <path d="M200 63 l18 5 a4 4 0 0 1 3 4 v8 h-21 z" fill="#bfe3ea" stroke={TEAL} strokeWidth={2} />
        {/* Фара */}
        <rect x={226} y={92} width={7} height={9} rx={2} fill="#fff7d6" stroke={TEAL} strokeWidth={1.5} />
      </g>
      {wheel(52)}
      {wheel(104)}
      {wheel(210)}
    </svg>
  )
}

/** Дотовая «карта» с маршрутами и движущимися по ним транспортом. */
function RouteMap() {
  return (
    <svg viewBox="0 0 420 300" className="h-auto w-full">
      {/* Дотовый фон-«континенты» */}
      <defs>
        <pattern id="dots" width="11" height="11" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.6" fill={TEAL} opacity="0.28" />
        </pattern>
        <path id="r1" d="M60 210 C 150 120, 250 250, 360 140" fill="none" />
        <path id="r2" d="M70 120 C 170 70, 250 180, 370 90" fill="none" />
      </defs>
      <rect x="0" y="0" width="420" height="300" fill="url(#dots)" />

      {/* Маршруты (текущий поток пунктира) */}
      {['r1', 'r2'].map((id) => (
        <use
          key={id}
          href={`#${id}`}
          stroke={YELLOW}
          strokeWidth={3}
          strokeLinecap="round"
          strokeDasharray="2 10"
          style={{ animation: 'logiRouteFlow 1.4s linear infinite' }}
        />
      ))}

      {/* Пульсирующие узлы */}
      {[
        [60, 210],
        [360, 140],
        [70, 120],
        [370, 90],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={5} fill={YELLOW} style={{ transformOrigin: `${x}px ${y}px`, animation: `logiPulse 2.4s ease-in-out ${i * 0.4}s infinite` }} />
      ))}

      {/* Транспорт, едущий по маршрутам */}
      <g>
        <circle r="15" fill="#fff" stroke={TEAL} strokeWidth="2">
          <animateMotion dur="6s" repeatCount="indefinite" rotate="0">
            <mpath href="#r1" />
          </animateMotion>
        </circle>
        <text fontSize="15" textAnchor="middle" dy="5">
          🚚
          <animateMotion dur="6s" repeatCount="indefinite" rotate="0">
            <mpath href="#r1" />
          </animateMotion>
        </text>
      </g>
      <g>
        <circle r="15" fill="#fff" stroke={TEAL} strokeWidth="2">
          <animateMotion dur="7.5s" repeatCount="indefinite" rotate="0">
            <mpath href="#r2" />
          </animateMotion>
        </circle>
        <text fontSize="15" textAnchor="middle" dy="5">
          ✈️
          <animateMotion dur="7.5s" repeatCount="indefinite" rotate="0">
            <mpath href="#r2" />
          </animateMotion>
        </text>
      </g>
    </svg>
  )
}

interface LogisticsHeroProps {
  onRequest: () => void
}

/** Анимированный hero логистического дека (CargoX-стиль). */
export default function LogisticsHero({ onRequest }: LogisticsHeroProps) {
  return (
    <section className="relative overflow-hidden">
      {/* Закатный градиент */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#cfe4ec] via-[#f3d9b0] to-[#f7b76b]" />
      {/* Дрейфующие грузы */}
      <div className="pointer-events-none absolute inset-0">
        <span className="absolute left-[8%] top-[18%] text-3xl opacity-70" style={{ animation: 'logiFloat 6s ease-in-out infinite' }}>📦</span>
        <span className="absolute right-[10%] top-[12%] text-2xl opacity-70" style={{ animation: 'logiFloat 7s ease-in-out 1s infinite' }}>🚢</span>
        <span className="absolute left-[46%] top-[10%] text-2xl opacity-60" style={{ animation: 'logiFloat 8s ease-in-out .5s infinite' }}>📦</span>
      </div>

      <div className="relative z-10 mx-auto grid max-w-[1400px] gap-8 px-6 pb-10 pt-24 md:grid-cols-2 md:px-12 md:pt-28">
        {/* Левая колонка — текст */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-start"
        >
          <span className="rounded-full bg-[#0E3A44] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#FFC61A]">
            Habibi Logistics
          </span>
          <h1 className="mt-5 font-display text-4xl font-bold leading-[0.95] tracking-tight text-[#0E3A44] md:text-6xl">
            За пределами
            <br />
            <span className="text-white drop-shadow-[0_2px_10px_rgba(14,58,68,0.25)]">границ и ограничений</span>
          </h1>
          <p className="mt-5 max-w-lg text-sm font-medium text-[#0E3A44]/80 md:text-base">
            B2B SaaS-экосистема цифровизации грузоперевозок и автопарков в СНГ. TMS, GPS-телематика,
            учёт топлива и P&amp;L-аналитика — в единой облачной платформе.
          </p>
          <div className="mt-5 inline-flex items-center gap-2 rounded-xl border border-[#0E3A44]/15 bg-white/70 px-4 py-2 text-sm font-semibold text-[#0E3A44] backdrop-blur">
            Pre-Seed раунд · <span className="text-[#b8860b]">$200,000</span> за 10% доли
          </div>

          <div className="mt-7 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={onRequest}
              className="inline-flex items-center gap-2 rounded-full bg-[#0E3A44] px-6 py-3.5 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-[1.03]"
            >
              <FileText className="h-4 w-4" />
              Скачать Pitch Deck
            </button>
            <button
              type="button"
              onClick={onRequest}
              className="inline-flex items-center gap-2 rounded-full bg-[#FFC61A] px-6 py-3.5 text-sm font-semibold text-[#0E3A44] shadow-lg transition-transform hover:scale-[1.03]"
            >
              <FileSpreadsheet className="h-4 w-4" />
              Financial Model (Excel)
            </button>
          </div>
        </motion.div>

        {/* Правая колонка — карта маршрутов */}
        <div className="relative flex items-center justify-center">
          <RouteMap />
        </div>
      </div>

      {/* Дорога + едущий грузовик (отдельная полоса, не перекрывает контент) */}
      <div className="relative z-10 mt-2 h-[180px]">
        {/* Грузовик на дороге */}
        <div className="pointer-events-none absolute bottom-[46px] left-6 md:left-16">
          <div className="relative">
            {/* Whoosh-линии за грузовиком */}
            <span className="absolute -left-6 top-8 h-1 w-8 rounded-full bg-white/70" style={{ animation: 'logiWhoosh 0.6s linear infinite' }} />
            <span className="absolute -left-8 top-14 h-1 w-6 rounded-full bg-white/60" style={{ animation: 'logiWhoosh 0.6s linear 0.2s infinite' }} />
            <Truck />
          </div>
        </div>
        {/* Дорога снизу */}
        <div
          className="absolute bottom-0 left-0 right-0 h-16 bg-[#0E3A44]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(90deg, transparent 0 60px, rgba(255,198,26,0.9) 60px 100px)',
            backgroundSize: '160px 4px',
            backgroundPosition: '0 50%',
            backgroundRepeat: 'repeat-x',
            animation: 'logiRoad 0.9s linear infinite',
          }}
        />
      </div>
    </section>
  )
}
