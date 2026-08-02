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

interface Meteor {
  x: number
  y: number
  vx: number
  vy: number
  len: number
  life: number
  maxLife: number
}

/**
 * Звёздное небо на canvas для контентных секций дека «Туризм»: мерцающие
 * звёзды + периодические «падающие звёзды» (метеоры с хвостом).
 * Прозрачный (фон-градиент секции просвечивает), pointer-events-none,
 * уважает prefers-reduced-motion, ставит анимацию на паузу вне вьюпорта.
 */
export default function SereneStarfield({ className = '' }: { className?: string }) {
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

    // Детерминированный ГПСЧ для стабильного поля звёзд.
    let seed = 7331 >>> 0
    const rng = () => {
      seed = (seed + 0x6d2b79f5) | 0
      let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296
    }

    let W = 0
    let H = 0
    let stars: Star[] = []
    const meteors: Meteor[] = []

    const build = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1)
      W = wrap.clientWidth || 1
      H = wrap.clientHeight || 1
      canvas.width = Math.max(1, Math.round(W * dpr))
      canvas.height = Math.max(1, Math.round(H * dpr))
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      seed = 7331 >>> 0
      const count = Math.min(460, Math.round((W * H) / 5200))
      stars = Array.from({ length: count }, () => {
        const big = rng() > 0.93
        return {
          x: rng() * W,
          y: rng() * H,
          r: big ? 1.2 + rng() * 1.2 : 0.4 + rng() * 1,
          a: 0.2 + rng() * 0.7,
          sp: 0.4 + rng() * 1.8,
          ph: rng() * Math.PI * 2,
          big,
        }
      })
    }

    const spawnMeteor = () => {
      // Стартуем сверху, летим по диагонали вниз-влево (классическая падающая).
      const startX = W * (0.3 + Math.random() * 0.75)
      const startY = -20 - Math.random() * H * 0.15
      const speed = 6 + Math.random() * 5
      const angle = (Math.PI / 180) * (115 + Math.random() * 25) // ~вниз-влево
      meteors.push({
        x: startX,
        y: startY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        len: 90 + Math.random() * 120,
        life: 0,
        maxLife: 90 + Math.random() * 60,
      })
    }

    build()
    const ro =
      typeof ResizeObserver !== 'undefined' ? new ResizeObserver(build) : null
    ro?.observe(wrap)

    let last = 0
    let sinceMeteor = 0
    let nextMeteorIn = 700

    const draw = (nowMs: number) => {
      const t = nowMs * 0.001
      const dt = last ? Math.min(50, nowMs - last) : 16
      last = nowMs
      ctx.clearRect(0, 0, W, H)

      // Мерцающие звёзды.
      for (const s of stars) {
        const twinkle = reduce ? 1 : 0.35 + 0.65 * (0.5 + 0.5 * Math.sin(t * s.sp + s.ph))
        const alpha = s.a * twinkle
        if (s.big && !reduce) {
          const g = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.r * 4)
          g.addColorStop(0, `rgba(255,255,255,${(alpha * 0.5).toFixed(3)})`)
          g.addColorStop(1, 'rgba(255,255,255,0)')
          ctx.fillStyle = g
          ctx.beginPath()
          ctx.arc(s.x, s.y, s.r * 4, 0, Math.PI * 2)
          ctx.fill()
        }
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${alpha.toFixed(3)})`
        ctx.fill()
      }

      // Падающие звёзды.
      if (!reduce) {
        sinceMeteor += dt
        if (sinceMeteor >= nextMeteorIn) {
          sinceMeteor = 0
          nextMeteorIn = 1400 + Math.random() * 2600
          spawnMeteor()
        }
        for (let i = meteors.length - 1; i >= 0; i--) {
          const m = meteors[i]
          m.x += m.vx
          m.y += m.vy
          m.life += 1
          const fade =
            Math.min(1, m.life / 8) * Math.max(0, 1 - m.life / m.maxLife)
          const nrm = Math.hypot(m.vx, m.vy) || 1
          const tailX = m.x - (m.vx / nrm) * m.len
          const tailY = m.y - (m.vy / nrm) * m.len
          const grad = ctx.createLinearGradient(m.x, m.y, tailX, tailY)
          grad.addColorStop(0, `rgba(255,255,255,${(0.9 * fade).toFixed(3)})`)
          grad.addColorStop(0.4, `rgba(190,215,255,${(0.35 * fade).toFixed(3)})`)
          grad.addColorStop(1, 'rgba(255,255,255,0)')
          ctx.strokeStyle = grad
          ctx.lineWidth = 1.6
          ctx.lineCap = 'round'
          ctx.beginPath()
          ctx.moveTo(m.x, m.y)
          ctx.lineTo(tailX, tailY)
          ctx.stroke()
          // Яркая «голова».
          ctx.beginPath()
          ctx.arc(m.x, m.y, 1.6, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(255,255,255,${fade.toFixed(3)})`
          ctx.fill()
          if (m.life > m.maxLife || m.y > H + 40 || m.x < -60) meteors.splice(i, 1)
        }
      }
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
      last = 0
      raf = requestAnimationFrame(loop)
    }
    const stop = () => {
      running = false
      if (raf) cancelAnimationFrame(raf)
      raf = 0
    }

    // Анимируем только когда небо в зоне видимости.
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
