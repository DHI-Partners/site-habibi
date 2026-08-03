import { useEffect, useRef } from 'react'

interface Pill {
  x: number
  y: number
  size: number
  speed: number
  angle: number
  spin: number
  type: 'capsule' | 'tablet'
  a: string
  b: string
  alpha: number
}

// Медицинская палитра (мягкая, под светлый фон).
const CAPSULES: [string, string][] = [
  ['#f87171', '#fbbf24'],
  ['#60a5fa', '#a78bfa'],
  ['#34d399', '#22d3ee'],
  ['#fb7185', '#f9a8d4'],
  ['#818cf8', '#c4b5fd'],
  ['#f472b6', '#fdba74'],
]
const TABLETS = ['#93c5fd', '#6ee7b7', '#fca5a5', '#fcd34d', '#d8b4fe', '#7dd3fc']

function roundRectPath(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.arcTo(x + w, y, x + w, y + h, r)
  ctx.arcTo(x + w, y + h, x, y + h, r)
  ctx.arcTo(x, y + h, x, y, r)
  ctx.arcTo(x, y, x + w, y, r)
  ctx.closePath()
}

/**
 * Фон с падающими таблетками и капсулами для контентных секций дека
 * «Медицина». Двухцветные капсулы и круглые таблетки медленно падают вниз,
 * покачиваясь. Canvas, прозрачный (светлый фон секции просвечивает),
 * pointer-events-none, пауза вне вьюпорта, уважает prefers-reduced-motion.
 */
export default function MedicalPillsBackground({ className = '' }: { className?: string }) {
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

    let seed = 90210 >>> 0
    const rng = () => {
      seed = (seed + 0x6d2b79f5) | 0
      let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296
    }

    let W = 0
    let H = 0
    let pills: Pill[] = []

    const makePill = (atTop: boolean): Pill => {
      const type: Pill['type'] = rng() > 0.42 ? 'capsule' : 'tablet'
      const [a, b] =
        type === 'capsule'
          ? CAPSULES[Math.floor(rng() * CAPSULES.length)]
          : [TABLETS[Math.floor(rng() * TABLETS.length)], '']
      return {
        x: rng() * W,
        y: atTop ? -20 - rng() * H * 0.5 : rng() * H,
        size: (type === 'capsule' ? 22 : 12) + rng() * (type === 'capsule' ? 20 : 9),
        speed: 18 + rng() * 34,
        angle: rng() * Math.PI * 2,
        spin: (rng() - 0.5) * 0.9,
        type,
        a,
        b,
        alpha: 0.35 + rng() * 0.3,
      }
    }

    const build = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1)
      W = wrap.clientWidth || 1
      H = wrap.clientHeight || 1
      canvas.width = Math.max(1, Math.round(W * dpr))
      canvas.height = Math.max(1, Math.round(H * dpr))
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      seed = 90210 >>> 0
      const count = Math.min(70, Math.max(24, Math.round((W * H) / 60000)))
      pills = Array.from({ length: count }, () => makePill(false))
    }

    const drawCapsule = (p: Pill) => {
      const L = p.size
      const w = L * 0.46
      const r = w / 2
      ctx.save()
      ctx.translate(p.x, p.y)
      ctx.rotate(p.angle)
      ctx.globalAlpha = p.alpha
      // цельная капсула цветом b
      roundRectPath(ctx, -L / 2, -w / 2, L, w, r)
      ctx.fillStyle = p.b
      ctx.fill()
      // левая половина цветом a
      ctx.save()
      ctx.beginPath()
      ctx.rect(-L / 2, -w / 2, L / 2, w)
      ctx.clip()
      roundRectPath(ctx, -L / 2, -w / 2, L, w, r)
      ctx.fillStyle = p.a
      ctx.fill()
      ctx.restore()
      // блик
      ctx.globalAlpha = p.alpha * 0.5
      ctx.strokeStyle = 'rgba(255,255,255,0.7)'
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(-L / 2 + r, -w / 2 + 1.5)
      ctx.lineTo(L / 2 - r, -w / 2 + 1.5)
      ctx.stroke()
      ctx.restore()
    }

    const drawTablet = (p: Pill) => {
      const R = p.size
      ctx.save()
      ctx.translate(p.x, p.y)
      ctx.rotate(p.angle)
      ctx.globalAlpha = p.alpha
      ctx.beginPath()
      ctx.arc(0, 0, R, 0, Math.PI * 2)
      ctx.fillStyle = p.a
      ctx.fill()
      // разделительная риска
      ctx.strokeStyle = 'rgba(15,23,42,0.18)'
      ctx.lineWidth = Math.max(1, R * 0.12)
      ctx.beginPath()
      ctx.moveTo(-R * 0.72, 0)
      ctx.lineTo(R * 0.72, 0)
      ctx.stroke()
      // ободок
      ctx.strokeStyle = 'rgba(255,255,255,0.45)'
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.arc(0, 0, R * 0.9, 0, Math.PI * 2)
      ctx.stroke()
      ctx.restore()
    }

    build()
    const ro =
      typeof ResizeObserver !== 'undefined' ? new ResizeObserver(build) : null
    ro?.observe(wrap)

    let last = 0
    const draw = (nowMs: number) => {
      const dt = last ? Math.min(50, nowMs - last) / 1000 : 0.016
      last = nowMs
      ctx.clearRect(0, 0, W, H)
      for (const p of pills) {
        if (!reduce) {
          p.y += p.speed * dt
          p.angle += p.spin * dt
          if (p.y - p.size > H) {
            p.y = -p.size - Math.random() * 40
            p.x = Math.random() * W
          }
        }
        if (p.type === 'capsule') drawCapsule(p)
        else drawTablet(p)
      }
    }

    // Начальный кадр сразу на монтировании — пилюли видны, даже пока
    // requestAnimationFrame не запущен (вкладка неактивна / до пересечения).
    draw(0)

    let raf = 0
    let running = false
    const loop = (now: number) => {
      draw(now)
      raf = requestAnimationFrame(loop)
    }
    const start = () => {
      if (running || reduce) return
      running = true
      last = 0
      raf = requestAnimationFrame(loop)
    }
    const stop = () => {
      running = false
      if (raf) cancelAnimationFrame(raf)
      raf = 0
    }

    const io =
      typeof IntersectionObserver !== 'undefined'
        ? new IntersectionObserver(
            ([e]) => {
              if (e.isIntersecting) start()
              else stop()
            },
            { threshold: 0 },
          )
        : null
    if (io) io.observe(wrap)
    if (reduce) draw(0)
    else if (!io) start()

    return () => {
      stop()
      ro?.disconnect()
      io?.disconnect()
    }
  }, [])

  return (
    <div ref={wrapRef} className={className} aria-hidden="true">
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  )
}
