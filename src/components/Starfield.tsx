import { useEffect, useRef } from 'react'

interface Star {
  x: number
  y: number
  r: number
  a: number
  sp: number
  ph: number
  big: boolean
}

/**
 * Лёгкий звёздный фон на canvas: мерцающие звёзды с очень медленным дрейфом.
 * Прозрачный (фон секции просвечивает), pointer-events-none, уважает reduced-motion.
 */
export default function Starfield({ className = '' }: { className?: string }) {
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

    // Детерминированный ГПСЧ (без Math.random на модульном уровне).
    let seed = 1337 >>> 0
    const rng = () => {
      seed = (seed + 0x6d2b79f5) | 0
      let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296
    }

    let W = 0
    let H = 0
    let stars: Star[] = []

    const build = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1)
      W = wrap.clientWidth || 1
      H = wrap.clientHeight || 1
      canvas.width = Math.max(1, Math.round(W * dpr))
      canvas.height = Math.max(1, Math.round(H * dpr))
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      seed = 1337 >>> 0
      const count = Math.min(260, Math.round((W * H) / 7000))
      stars = Array.from({ length: count }, () => {
        const big = rng() > 0.94
        return {
          x: rng() * W,
          y: rng() * H,
          r: big ? 1.3 + rng() * 1.1 : 0.4 + rng() * 1,
          a: 0.25 + rng() * 0.7,
          sp: 0.4 + rng() * 1.8,
          ph: rng() * Math.PI * 2,
          big,
        }
      })
    }

    build()
    const ro =
      typeof ResizeObserver !== 'undefined' ? new ResizeObserver(build) : null
    ro?.observe(wrap)

    const draw = (nowMs: number) => {
      const t = nowMs * 0.001
      ctx.clearRect(0, 0, W, H)
      for (const s of stars) {
        const twinkle = reduce ? 1 : 0.4 + 0.6 * (0.5 + 0.5 * Math.sin(t * s.sp + s.ph))
        // очень медленный дрейф вниз (детерминированный от времени, без накопления)
        const y = reduce ? s.y : (s.y + t * 3 * (0.4 + s.sp * 0.3)) % (H + 4)
        const alpha = s.a * twinkle
        if (s.big && !reduce) {
          const g = ctx.createRadialGradient(s.x, y, 0, s.x, y, s.r * 4)
          g.addColorStop(0, `rgba(255,255,255,${(alpha * 0.5).toFixed(3)})`)
          g.addColorStop(1, 'rgba(255,255,255,0)')
          ctx.fillStyle = g
          ctx.beginPath()
          ctx.arc(s.x, y, s.r * 4, 0, Math.PI * 2)
          ctx.fill()
        }
        ctx.beginPath()
        ctx.arc(s.x, y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${alpha.toFixed(3)})`
        ctx.fill()
      }
    }

    let raf = 0
    const loop = (now: number) => {
      draw(now)
      raf = requestAnimationFrame(loop)
    }
    if (reduce) draw(0)
    else raf = requestAnimationFrame(loop)

    return () => {
      if (raf) cancelAnimationFrame(raf)
      ro?.disconnect()
    }
  }, [])

  return (
    <div ref={wrapRef} className={className} aria-hidden="true">
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  )
}
