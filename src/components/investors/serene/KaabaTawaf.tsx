import { useEffect, useRef } from 'react'

/**
 * Стилизованный фон Каабы с тавафом (вид сверху): чёрная Кааба в центре
 * с золотой каймой и мягким свечением, вокруг — кольца светящихся точек
 * (паломники), медленно вращающиеся против часовой стрелки, поверх лёгкого
 * звёздного неба. Canvas, прозрачный (фон секции просвечивает),
 * pointer-events-none, пауза вне вьюпорта, уважает prefers-reduced-motion.
 */
export default function KaabaTawaf({ className = '' }: { className?: string }) {
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

    let seed = 20260 >>> 0
    const rng = () => {
      seed = (seed + 0x6d2b79f5) | 0
      let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296
    }

    let W = 0
    let H = 0
    let cx = 0
    let cy = 0
    // Кольца тавафа: радиус, число точек, угловая скорость, фазы точек.
    let rings: { r: number; n: number; speed: number; phase: number[] }[] = []
    let stars: { x: number; y: number; r: number; a: number; sp: number; ph: number }[] = []
    let kaabaSize = 44

    const build = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1)
      W = wrap.clientWidth || 1
      H = wrap.clientHeight || 1
      canvas.width = Math.max(1, Math.round(W * dpr))
      canvas.height = Math.max(1, Math.round(H * dpr))
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      cx = W / 2
      cy = H / 2
      seed = 20260 >>> 0

      kaabaSize = Math.max(34, Math.min(58, Math.min(W, H) * 0.06))
      const maxR = Math.hypot(W, H) / 2 + 40
      const inner = kaabaSize * 1.5
      rings = []
      let r = inner
      let idx = 0
      while (r < maxR) {
        const n = Math.max(6, Math.round((2 * Math.PI * r) / 24))
        // внутренние кольца вращаются чуть быстрее
        const speed = (0.05 + 0.16 / Math.sqrt(r / inner)) * (idx % 2 === 0 ? 1 : 0.85)
        const phase = Array.from({ length: n }, () => rng() * Math.PI * 2)
        rings.push({ r, n, speed, phase })
        r += 20 + rng() * 10
        idx++
      }

      const starCount = Math.min(220, Math.round((W * H) / 9000))
      stars = Array.from({ length: starCount }, () => ({
        x: rng() * W,
        y: rng() * H,
        r: rng() > 0.92 ? 1.2 + rng() * 1 : 0.4 + rng() * 0.9,
        a: 0.2 + rng() * 0.6,
        sp: 0.4 + rng() * 1.6,
        ph: rng() * Math.PI * 2,
      }))
    }

    const drawKaaba = () => {
      const s = kaabaSize
      // Свечение Матафа (мраморный пол) под Каабой.
      const floor = ctx.createRadialGradient(cx, cy, s * 0.4, cx, cy, s * 4.2)
      floor.addColorStop(0, 'rgba(226, 214, 190, 0.16)')
      floor.addColorStop(1, 'rgba(226, 214, 190, 0)')
      ctx.fillStyle = floor
      ctx.beginPath()
      ctx.arc(cx, cy, s * 4.2, 0, Math.PI * 2)
      ctx.fill()

      // Мягкое золотое свечение вокруг Каабы.
      const glow = ctx.createRadialGradient(cx, cy, s * 0.3, cx, cy, s * 1.5)
      glow.addColorStop(0, 'rgba(214, 178, 106, 0.35)')
      glow.addColorStop(1, 'rgba(214, 178, 106, 0)')
      ctx.fillStyle = glow
      ctx.beginPath()
      ctx.arc(cx, cy, s * 1.5, 0, Math.PI * 2)
      ctx.fill()

      // Тело Каабы (чёрный куб, вид сверху) с золотой каймой.
      const half = s / 2
      ctx.fillStyle = '#0b0b0d'
      ctx.strokeStyle = 'rgba(201, 162, 92, 0.9)'
      ctx.lineWidth = Math.max(1.4, s * 0.06)
      const rad = s * 0.08
      const x = cx - half
      const y = cy - half
      ctx.beginPath()
      ctx.moveTo(x + rad, y)
      ctx.arcTo(x + s, y, x + s, y + s, rad)
      ctx.arcTo(x + s, y + s, x, y + s, rad)
      ctx.arcTo(x, y + s, x, y, rad)
      ctx.arcTo(x, y, x + s, y, rad)
      ctx.closePath()
      ctx.fill()
      ctx.stroke()
    }

    build()
    const ro =
      typeof ResizeObserver !== 'undefined' ? new ResizeObserver(build) : null
    ro?.observe(wrap)

    const draw = (nowMs: number) => {
      const t = nowMs * 0.001
      ctx.clearRect(0, 0, W, H)

      // Звёзды.
      for (const s of stars) {
        const tw = reduce ? 1 : 0.35 + 0.65 * (0.5 + 0.5 * Math.sin(t * s.sp + s.ph))
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${(s.a * tw).toFixed(3)})`
        ctx.fill()
      }

      // Кольца паломников (таваф, против часовой стрелки).
      for (const ring of rings) {
        const base = reduce ? 0 : -t * ring.speed
        for (let i = 0; i < ring.n; i++) {
          const ang = base + ring.phase[i]
          const px = cx + Math.cos(ang) * ring.r
          const py = cy + Math.sin(ang) * ring.r
          if (px < -6 || px > W + 6 || py < -6 || py > H + 6) continue
          const tw = reduce ? 0.8 : 0.55 + 0.45 * (0.5 + 0.5 * Math.sin(t * 2 + ring.phase[i] * 3))
          ctx.beginPath()
          ctx.arc(px, py, 1.7, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(255,246,228,${(0.7 * tw).toFixed(3)})`
          ctx.fill()
        }
      }

      drawKaaba()
    }

    let raf = 0
    let running = false
    const loop = (now: number) => {
      draw(now)
      raf = requestAnimationFrame(loop)
    }
    const start = () => {
      if (running || reduce) return
      running = true
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
