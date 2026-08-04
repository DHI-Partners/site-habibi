import { useEffect, useRef } from 'react'

interface Cargo {
  x: number
  y: number
  size: number
  speed: number
  angle: number
  spin: number
  type: 'box' | 'container'
  color: string
  alpha: number
}

// Картонные коробки (крафт) и контейнеры (грузовая палитра).
const BOX_COLORS = ['#cba06a', '#bd9057', '#d8b483', '#c08a4f']
const CONTAINER_COLORS = ['#FFC61A', '#0E3A44', '#c2612c', '#5f8391']

function roundRect(
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
 * Фон с падающими грузами (коробки и контейнеры) для контентных секций
 * дека «Логистика». Медленно падают вниз, покачиваясь. Canvas, прозрачный
 * (светлый фон секции просвечивает), pointer-events-none, пауза вне вьюпорта,
 * уважает prefers-reduced-motion, начальный кадр рисуется сразу.
 */
export default function LogisticsCargoBackground({ className = '' }: { className?: string }) {
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

    let seed = 424242 >>> 0
    const rng = () => {
      seed = (seed + 0x6d2b79f5) | 0
      let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296
    }

    let W = 0
    let H = 0
    let items: Cargo[] = []

    const make = (atTop: boolean): Cargo => {
      const type: Cargo['type'] = rng() > 0.42 ? 'box' : 'container'
      const color =
        type === 'box'
          ? BOX_COLORS[Math.floor(rng() * BOX_COLORS.length)]
          : CONTAINER_COLORS[Math.floor(rng() * CONTAINER_COLORS.length)]
      return {
        x: rng() * W,
        y: atTop ? -30 - rng() * H * 0.5 : rng() * H,
        size: (type === 'box' ? 18 : 30) + rng() * (type === 'box' ? 20 : 28),
        speed: 16 + rng() * 30,
        angle: rng() * Math.PI * 2,
        spin: (rng() - 0.5) * 0.7,
        type,
        color,
        alpha: 0.28 + rng() * 0.28,
      }
    }

    const build = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1)
      W = wrap.clientWidth || 1
      H = wrap.clientHeight || 1
      canvas.width = Math.max(1, Math.round(W * dpr))
      canvas.height = Math.max(1, Math.round(H * dpr))
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      seed = 424242 >>> 0
      const count = Math.min(60, Math.max(20, Math.round((W * H) / 68000)))
      items = Array.from({ length: count }, () => make(false))
    }

    const drawBox = (p: Cargo) => {
      const s = p.size
      ctx.save()
      ctx.translate(p.x, p.y)
      ctx.rotate(p.angle)
      ctx.globalAlpha = p.alpha
      roundRect(ctx, -s / 2, -s / 2, s, s, s * 0.1)
      ctx.fillStyle = p.color
      ctx.fill()
      ctx.strokeStyle = 'rgba(70,45,18,0.4)'
      ctx.lineWidth = Math.max(1, s * 0.04)
      ctx.stroke()
      // скотч по центру
      ctx.strokeStyle = 'rgba(255,255,255,0.32)'
      ctx.lineWidth = Math.max(1.5, s * 0.1)
      ctx.beginPath()
      ctx.moveTo(-s / 2, 0)
      ctx.lineTo(s / 2, 0)
      ctx.stroke()
      // шов клапанов
      ctx.strokeStyle = 'rgba(70,45,18,0.32)'
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(0, -s / 2)
      ctx.lineTo(0, 0)
      ctx.stroke()
      ctx.restore()
    }

    const drawContainer = (p: Cargo) => {
      const w = p.size
      const h = w * 0.62
      ctx.save()
      ctx.translate(p.x, p.y)
      ctx.rotate(p.angle)
      ctx.globalAlpha = p.alpha
      roundRect(ctx, -w / 2, -h / 2, w, h, h * 0.08)
      ctx.fillStyle = p.color
      ctx.fill()
      ctx.strokeStyle = 'rgba(0,0,0,0.28)'
      ctx.lineWidth = Math.max(1, w * 0.02)
      ctx.stroke()
      // гофра
      ctx.strokeStyle = 'rgba(0,0,0,0.13)'
      ctx.lineWidth = 1
      const n = 5
      for (let i = 1; i < n; i++) {
        const x = -w / 2 + (w / n) * i
        ctx.beginPath()
        ctx.moveTo(x, -h / 2 + 3)
        ctx.lineTo(x, h / 2 - 3)
        ctx.stroke()
      }
      // верх/низ рёбра
      ctx.strokeStyle = 'rgba(0,0,0,0.3)'
      ctx.lineWidth = Math.max(1.5, h * 0.09)
      ctx.beginPath()
      ctx.moveTo(-w / 2 + 2, -h / 2 + 1)
      ctx.lineTo(w / 2 - 2, -h / 2 + 1)
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(-w / 2 + 2, h / 2 - 1)
      ctx.lineTo(w / 2 - 2, h / 2 - 1)
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
      for (const p of items) {
        if (!reduce) {
          p.y += p.speed * dt
          p.angle += p.spin * dt
          if (p.y - p.size > H) {
            p.y = -p.size - Math.random() * 50
            p.x = Math.random() * W
          }
        }
        if (p.type === 'box') drawBox(p)
        else drawContainer(p)
      }
    }

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
    else if (!reduce) start()

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
