import { useEffect, useRef } from 'react'

interface NoteStyle {
  glyph: string
  code: string
  /** Базовый цвет купюры (приглушённый — фон остаётся чёрным и премиальным). */
  rgb: [number, number, number]
}

/** Валюты мира — от доллара до евро. */
const CURRENCIES: NoteStyle[] = [
  { glyph: '$', code: 'USD', rgb: [86, 132, 96] },
  { glyph: '€', code: 'EUR', rgb: [78, 108, 158] },
  { glyph: '£', code: 'GBP', rgb: [124, 92, 146] },
  { glyph: '¥', code: 'JPY', rgb: [72, 132, 132] },
  { glyph: '₣', code: 'CHF', rgb: [156, 92, 78] },
  { glyph: 'د.إ', code: 'AED', rgb: [132, 124, 74] },
  { glyph: '﷼', code: 'SAR', rgb: [138, 106, 70] },
  { glyph: '₸', code: 'KZT', rgb: [72, 118, 142] },
]

interface Note {
  sprite: HTMLCanvasElement
  x: number
  y: number
  scale: number
  vy: number
  sway: number
  swaySp: number
  rot: number
  rotSp: number
  alpha: number
}

interface BanknotesProps {
  className?: string
  seed?: number
  density?: number
}

/** Размер спрайта купюры в «дизайнерских» пикселях. */
const NOTE_W = 300
const NOTE_H = 138

/**
 * Фон из купюр мировых валют: стилизованные банкноты медленно падают,
 * покачиваясь и слегка вращаясь. Рисуются процедурно (гильош, медальон,
 * номинал) — без внешних картинок и без воспроизведения реальных банкнот.
 *
 * Каждая купюра рендерится в спрайт один раз, в кадре — только drawImage
 * с трансформацией, поэтому фон дешёвый даже на слабых машинах.
 */
export default function Banknotes({ className = '', seed = 7, density = 1 }: BanknotesProps) {
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

    let s = (seed * 2654435761) >>> 0
    const rng = () => {
      s = (s + 0x6d2b79f5) | 0
      let t = Math.imul(s ^ (s >>> 15), 1 | s)
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296
    }

    const dpr = Math.min(2, window.devicePixelRatio || 1)

    /** Гильош — розетка-спирограф, как защитный узор на банкноте. */
    const guilloche = (
      g: CanvasRenderingContext2D,
      cx: number,
      cy: number,
      R: number,
      r: number,
      k: number,
    ) => {
      g.beginPath()
      const steps = 420
      for (let i = 0; i <= steps; i++) {
        const t = (i / steps) * Math.PI * 2
        const rad = R + r * Math.cos(k * t)
        const x = cx + rad * Math.cos(t)
        const y = cy + rad * Math.sin(t) * 0.62
        if (i === 0) g.moveTo(x, y)
        else g.lineTo(x, y)
      }
      g.stroke()
    }

    /** Один спрайт купюры. */
    const renderNote = (cur: NoteStyle): HTMLCanvasElement => {
      const c = document.createElement('canvas')
      c.width = Math.round(NOTE_W * dpr)
      c.height = Math.round(NOTE_H * dpr)
      const g = c.getContext('2d')
      if (!g) return c
      g.setTransform(dpr, 0, 0, dpr, 0, 0)

      const [r0, g0, b0] = cur.rgb
      const base = (a: number) => `rgba(${r0},${g0},${b0},${a})`
      const gold = (a: number) => `rgba(226,190,116,${a})`
      const R = 10

      const roundRect = (x: number, y: number, w: number, h: number, rad: number) => {
        g.beginPath()
        g.moveTo(x + rad, y)
        g.arcTo(x + w, y, x + w, y + h, rad)
        g.arcTo(x + w, y + h, x, y + h, rad)
        g.arcTo(x, y + h, x, y, rad)
        g.arcTo(x, y, x + w, y, rad)
        g.closePath()
      }

      // Бумага: диагональный градиент от цвета валюты к почти чёрному
      const paper = g.createLinearGradient(0, 0, NOTE_W, NOTE_H)
      paper.addColorStop(0, base(0.72))
      paper.addColorStop(0.5, base(0.42))
      paper.addColorStop(1, 'rgba(10,10,12,0.6)')
      roundRect(0, 0, NOTE_W, NOTE_H, R)
      g.fillStyle = paper
      g.fill()

      // Рамка: двойная линия «под золото»
      g.strokeStyle = gold(0.5)
      g.lineWidth = 1.4
      roundRect(7, 7, NOTE_W - 14, NOTE_H - 14, R - 3)
      g.stroke()
      g.strokeStyle = gold(0.22)
      g.lineWidth = 0.8
      roundRect(13, 13, NOTE_W - 26, NOTE_H - 26, R - 5)
      g.stroke()

      // Гильош — вложенные розетки + микроштрихи
      g.save()
      roundRect(13, 13, NOTE_W - 26, NOTE_H - 26, R - 5)
      g.clip()
      g.lineWidth = 0.55
      g.strokeStyle = gold(0.3)
      guilloche(g, NOTE_W * 0.68, NOTE_H / 2, 42, 15, 7)
      g.strokeStyle = gold(0.2)
      guilloche(g, NOTE_W * 0.68, NOTE_H / 2, 30, 11, 5)
      g.strokeStyle = 'rgba(255,255,255,0.12)'
      guilloche(g, NOTE_W * 0.28, NOTE_H / 2, 34, 12, 6)

      g.strokeStyle = 'rgba(255,255,255,0.09)'
      g.lineWidth = 0.5
      for (let i = 0; i < 4; i++) {
        const y = 30 + i * 26
        g.beginPath()
        g.moveTo(24, y)
        g.lineTo(NOTE_W - 24, y + 3)
        g.stroke()
      }
      g.restore()

      // Медальон-«портрет»: овал со штриховкой
      g.save()
      g.beginPath()
      g.ellipse(NOTE_W * 0.28, NOTE_H / 2, 30, 40, 0, 0, Math.PI * 2)
      g.clip()
      g.fillStyle = base(0.5)
      g.fillRect(NOTE_W * 0.28 - 32, NOTE_H / 2 - 42, 64, 84)
      g.strokeStyle = 'rgba(255,255,255,0.16)'
      g.lineWidth = 0.7
      for (let i = -10; i < 14; i++) {
        g.beginPath()
        g.moveTo(NOTE_W * 0.28 - 34, NOTE_H / 2 - 42 + i * 7)
        g.lineTo(NOTE_W * 0.28 + 34, NOTE_H / 2 - 42 + i * 7 + 12)
        g.stroke()
      }
      g.restore()
      g.strokeStyle = gold(0.45)
      g.lineWidth = 1
      g.beginPath()
      g.ellipse(NOTE_W * 0.28, NOTE_H / 2, 30, 40, 0, 0, Math.PI * 2)
      g.stroke()

      // Номинал и код валюты
      g.fillStyle = gold(0.85)
      g.font = '700 46px Geist, Inter, system-ui, sans-serif'
      g.textAlign = 'center'
      g.textBaseline = 'middle'
      g.fillText(cur.glyph, NOTE_W * 0.68, NOTE_H / 2 + 2)

      g.font = '600 11px Geist, Inter, system-ui, sans-serif'
      g.fillStyle = gold(0.6)
      g.textAlign = 'left'
      g.fillText(cur.code, 24, 26)
      g.textAlign = 'right'
      g.fillText(cur.code, NOTE_W - 24, NOTE_H - 24)

      // Блик через всю купюру
      const sheen = g.createLinearGradient(0, 0, NOTE_W, NOTE_H)
      sheen.addColorStop(0, 'rgba(255,255,255,0)')
      sheen.addColorStop(0.45, 'rgba(255,255,255,0.09)')
      sheen.addColorStop(0.6, 'rgba(255,255,255,0)')
      roundRect(0, 0, NOTE_W, NOTE_H, R)
      g.fillStyle = sheen
      g.fill()

      return c
    }

    const sprites = CURRENCIES.map(renderNote)

    let W = 0
    let H = 0
    let notes: Note[] = []

    const build = () => {
      W = wrap.clientWidth || 1
      H = wrap.clientHeight || 1
      canvas.width = Math.max(1, Math.round(W * dpr))
      canvas.height = Math.max(1, Math.round(H * dpr))
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      s = (seed * 2654435761) >>> 0
      const count = Math.max(6, Math.min(18, Math.round(((W * H) / 88000) * density)))
      // На узких экранах купюры мельче — иначе одна перекрывает пол-экрана.
      const sizeK = Math.max(0.5, Math.min(1, W / 1000))
      notes = Array.from({ length: count }, (_, i) => {
        // Глубина: дальние купюры мельче, бледнее и медленнее.
        const depth = rng()
        return {
          sprite: sprites[(i + Math.floor(rng() * sprites.length)) % sprites.length],
          x: rng() * W,
          y: rng() * (H + NOTE_H * 2),
          scale: (0.5 + depth * 0.85) * sizeK,
          vy: 8 + depth * 20,
          sway: 10 + rng() * 30,
          swaySp: 0.1 + rng() * 0.22,
          rot: (rng() - 0.5) * 0.9,
          rotSp: (rng() - 0.5) * 0.16,
          alpha: 0.16 + depth * 0.34,
        }
      })
    }

    build()
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(build) : null
    ro?.observe(wrap)

    const draw = (t: number) => {
      ctx.clearRect(0, 0, W, H)
      const span = H + NOTE_H * 2
      for (const n of notes) {
        const y = ((n.y + t * n.vy) % span) - NOTE_H
        const x = n.x + Math.sin(t * n.swaySp + n.rot) * n.sway
        const w = NOTE_W * n.scale
        const h = NOTE_H * n.scale
        ctx.save()
        ctx.translate(x, y)
        ctx.rotate(n.rot + Math.sin(t * n.swaySp * 0.6 + n.rot) * 0.12 + t * n.rotSp * 0.1)
        ctx.globalAlpha = n.alpha
        ctx.drawImage(n.sprite, -w / 2, -h / 2, w, h)
        ctx.restore()
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

    const io =
      typeof IntersectionObserver !== 'undefined'
        ? new IntersectionObserver(([e]) => (e.isIntersecting ? start() : stop()), {
            rootMargin: '120px',
          })
        : null

    if (reduce) draw(0)
    else if (io) io.observe(wrap)
    else start()

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
