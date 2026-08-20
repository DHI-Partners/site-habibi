import { useEffect, useState } from 'react'
import { ArrowUp, Sparkles } from 'lucide-react'
import { askAssistant } from '../../lib/chat'
import { track } from '../../lib/track'

export interface HeroAskLabels {
  placeholder: string
  sendLabel: string
  /** Подпись под полем — объясняет, кто ответит. */
  hint: string
  /** Вопросы, которые поле «печатает» само, привлекая внимание. */
  prompts: string[]
}

export interface HeroAskBarProps {
  labels: HeroAskLabels
  lang: string
  dir?: 'ltr' | 'rtl'
}

/** Тайминги автопечати, мс. */
const TYPE_MS = 55
const ERASE_MS = 24
const HOLD_FULL_MS = 2300
const HOLD_EMPTY_MS = 500

/**
 * Печатает вопросы по кругу как на печатной машинке.
 * При prefers-reduced-motion анимации нет — показывается первый вопрос.
 */
function useTypewriter(prompts: string[]): string {
  const [text, setText] = useState('')

  useEffect(() => {
    if (!prompts.length) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setText(prompts[0])
      return
    }

    let index = 0
    let pos = 0
    let erasing = false
    let timer = 0

    const tick = () => {
      const current = prompts[index]
      if (!erasing) {
        pos++
        setText(current.slice(0, pos))
        if (pos >= current.length) {
          erasing = true
          timer = window.setTimeout(tick, HOLD_FULL_MS)
          return
        }
        timer = window.setTimeout(tick, TYPE_MS)
      } else {
        pos--
        setText(current.slice(0, pos))
        if (pos <= 0) {
          erasing = false
          index = (index + 1) % prompts.length
          timer = window.setTimeout(tick, HOLD_EMPTY_MS)
          return
        }
        timer = window.setTimeout(tick, ERASE_MS)
      }
    }

    timer = window.setTimeout(tick, HOLD_EMPTY_MS)
    return () => window.clearTimeout(timer)
  }, [prompts])

  return text
}

/**
 * Поле вопроса на первом экране — главный вход в разговор с консультантом.
 * Отправляет вопрос тому же чату, что и кнопка в углу: askAssistant()
 * поднимает панель и сразу шлёт текст.
 */
export default function HeroAskBar({ labels, lang, dir = 'ltr' }: HeroAskBarProps) {
  const [value, setValue] = useState('')
  const typed = useTypewriter(labels.prompts)

  const submit = () => {
    const text = value.trim()
    if (!text) return
    track('hero_ask', { lang })
    askAssistant(text)
    setValue('')
  }

  // Пока поле пустое, в нём «печатается» вопрос с кареткой; ввод его скрывает.
  const placeholder = value ? '' : typed ? `${typed}|` : labels.placeholder

  return (
    <div dir={dir} className="w-full max-w-2xl">
      <div className="group relative flex items-center gap-2 rounded-full border border-white/30 bg-black/45 py-3 ps-5 pe-2 shadow-[0_10px_50px_rgba(0,0,0,0.55),0_0_60px_rgba(52,211,153,0.12)] backdrop-blur-xl transition-all duration-300 focus-within:border-white/60 focus-within:shadow-[0_10px_50px_rgba(0,0,0,0.55),0_0_80px_rgba(52,211,153,0.22)] sm:gap-3 sm:py-3.5 sm:ps-6">
        <Sparkles size={20} strokeWidth={2} className="shrink-0 text-emerald-300" />
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault()
              submit()
            }
          }}
          placeholder={placeholder}
          aria-label={labels.placeholder}
          className="min-w-0 flex-1 bg-transparent py-2 text-base text-white outline-none placeholder:text-white/60 sm:text-xl"
        />
        <button
          type="button"
          onClick={submit}
          disabled={!value.trim()}
          aria-label={labels.sendLabel}
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-black transition-all hover:scale-105 active:scale-95 disabled:cursor-not-allowed disabled:bg-white/15 disabled:text-white/40 disabled:hover:scale-100"
        >
          <ArrowUp size={22} strokeWidth={2.4} />
        </button>
      </div>
      <p className="mt-2.5 ps-1 text-xs text-white/50 sm:text-sm">{labels.hint}</p>
    </div>
  )
}
