import { useEffect, useRef } from 'react'

interface Particle {
  /** 0 — монета, 1 — символ валюты. */
  kind: 0 | 1
  glyph: string
  x: number
  /** Стартовая позиция по вертикали (в «виртуальных» пикселях цикла). */
  y: number
  size: number
  /** Скорость падения, px/с. */
  vy: number
  /** Амплитуда и частота бокового покачивания. */
  sway: number
  swaySp: number
  /** Фаза вращения и её скорость. */
  spin: number
  spinSp: number
  tilt: number
  alpha: number
}

interface GoldRainProps {
  className?: string
  /** Разный узор для разных секций. */
  seed?: number
  /** Множитель плотности (1 — базовая). */
  density?: number
}

const GLYPHS = ['€', '$', '€', '$', '€']

/**
 * Золотой дождь: падающие монеты и символы валют на canvas.
 * Прозрачный фон, pointer-events-none, уважает prefers-reduced-motion.
 * Анимация идёт только пока секция видна на экране (IntersectionObserver),
 * иначе десяток таких фонов молотил бы rAF одновременно.
 */
export default function GoldRain({ className = '', seed = 1, density = 1 }: GoldRainProps) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const wrap = wrapRef.current
    const canvas = canvasRef.current
    if (!wrap || !canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // Детерминированный ГПСЧ — узор стабилен между рендерами.
    let s = (seed * 2654435761) >>> 0
    const rng = () => {
      s = (s + 0x6d2b79f5) | 0
      let t = Math.imul(s ^ (s >>> 15), 1 | s)
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296
    }

    let W = 0
    let H = 0
    let items: Particle[] = []

    const build = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1)
      W = wrap.clientWidth || 1
      H = wrap.clientHeight || 1
      canvas.width = Math.max(1, Math.round(W * dpr))
      canvas.height = Math.max(1, Math.round(H * dpr))
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      s = (seed * 2654435761) >>> 0
      const count = Math.max(
        14,
        Math.min(70, Math.round(((W * H) / 13000) * density)),
      )
      items = Array.from({ length: count }, () => {
        // Дальний план — мельче, прозрачнее и медленнее (лёгкий параллакс).
        const depth = rng()
        const size = 7 + depth * 16
        return {
          kind: rng() > 0.55 ? 1 : 0,
          glyph: GLYPHS[Math.floor(rng() * GLYPHS.length)],
          x: rng() * W,
          y: rng() * (H + 240),
          size,
          vy: 22 + depth * 58,
          sway: 6 + rng() * 22,
          swaySp: 0.25 + rng() * 0.5,
          spin: rng() * Math.PI * 2,
          spinSp: 0.5 + rng() * 1.4,
          tilt: (rng() - 0.5) * 0.6,
          alpha: 0.22 + depth * 0.42,
        }
      })
    }

    build()
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(build) : null
    ro?.observe(wrap)

    /** Монета: золотой диск, сплющенный по фазе вращения, с бликом и ободком. */
    const drawCoin = (p: Particle, x: number, y: number, spin: number) => {
      const r = p.size / 2
      // cos фазы → монета «поворачивается» ребром к зрителю
      const squash = Math.abs(Math.cos(spin))
      const rx = Math.max(0.8, r * squash)

      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(p.tilt)

      const g = ctx.createLinearGradient(0, -r, 0, r)
      g.addColorStop(0, 'rgba(255,238,170,1)')
      g.addColorStop(0.45, 'rgba(240,196,90,1)')
      g.addColorStop(1, 'rgba(176,124,32,1)')
      ctx.globalAlpha = p.alpha
      ctx.fillStyle = g
      ctx.beginPath()
      ctx.ellipse(0, 0, rx, r, 0, 0, Math.PI * 2)
      ctx.fill()

      // Ободок
      ctx.globalAlpha = p.alpha * 0.85
      ctx.strokeStyle = 'rgba(255,228,150,0.9)'
      ctx.lineWidth = Math.max(0.6, r * 0.12)
      ctx.beginPath()
      ctx.ellipse(0, 0, rx * 0.82, r * 0.82, 0, 0, Math.PI * 2)
      ctx.stroke()

      // Блик — только когда монета развёрнута к зрителю
      if (squash > 0.35) {
        ctx.globalAlpha = p.alpha * 0.5 * squash
        ctx.fillStyle = 'rgba(255,255,235,1)'
        ctx.beginPath()
        ctx.ellipse(-rx * 0.3, -r * 0.35, rx * 0.26, r * 0.2, -0.5, 0, Math.PI * 2)
        ctx.fill()
      }

      ctx.restore()
    }

    /** Символ валюты — тем же золотом, слегка вращается. */
    const drawGlyph = (p: Particle, x: number, y: number, spin: number) => {
      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(p.tilt + Math.sin(spin) * 0.25)
      ctx.globalAlpha = p.alpha
      ctx.font = `600 ${p.size.toFixed(1)}px Geist, Inter, system-ui, sans-serif`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'

      const g = ctx.createLinearGradient(0, -p.size / 2, 0, p.size / 2)
      g.addColorStop(0, 'rgba(255,240,185,1)')
      g.addColorStop(1, 'rgba(198,146,46,1)')
      ctx.fillStyle = g
      ctx.fillText(p.glyph, 0, 0)
      ctx.restore()
    }

    const draw = (t: number) => {
      ctx.clearRect(0, 0, W, H)
      const span = H + 240
      for (const p of items) {
        // Позиция считается от времени, а не накоплением — не «уплывает» при лагах.
        const y = ((p.y + t * p.vy) % span) - 120
        const x = p.x + Math.sin(t * p.swaySp + p.spin) * p.sway
        const spin = p.spin + t * p.spinSp
        if (p.kind === 0) drawCoin(p, x, y, spin)
        else drawGlyph(p, x, y, spin)
      }
    }

    let raf = 0
    let running = false
    const loop = (now: number) => {
      draw(now * 0.001)
      raf = requestAnimationFrame(loop)
    }
    const start = () => {
      if (running || reduce) return
      running = true
      raf = requestAnimationFrame(loop)
    }
    const stop = () => {
      if (!running) return
      running = false
      cancelAnimationFrame(raf)
      raf = 0
    }

    // Считаем кадры только когда секция в зоне видимости.
    const io =
      typeof IntersectionObserver !== 'undefined'
        ? new IntersectionObserver(
            ([entry]) => (entry.isIntersecting ? start() : stop()),
            { rootMargin: '120px' },
          )
        : null

    if (reduce) {
      draw(0)
    } else if (io) {
      io.observe(wrap)
    } else {
      start()
    }

    return () => {
      stop()
      io?.disconnect()
      ro?.disconnect()
    }
  }, [seed, density])

  return (
    <div ref={wrapRef} className={className} aria-hidden="true">
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  )
}
