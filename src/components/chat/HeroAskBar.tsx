import { useState } from 'react'
import { ArrowUp, Sparkles } from 'lucide-react'
import { askAssistant } from '../../lib/chat'
import { track } from '../../lib/track'

export interface HeroAskLabels {
  placeholder: string
  sendLabel: string
  /** Подпись под полем — объясняет, кто ответит. */
  hint: string
}

export interface HeroAskBarProps {
  labels: HeroAskLabels
  lang: string
  dir?: 'ltr' | 'rtl'
}

/**
 * Поле вопроса на первом экране — главный вход в разговор с консультантом.
 * Отправляет вопрос тому же чату, что и кнопка в углу: askAssistant()
 * поднимает панель и сразу шлёт текст.
 */
export default function HeroAskBar({ labels, lang, dir = 'ltr' }: HeroAskBarProps) {
  const [value, setValue] = useState('')

  const submit = () => {
    const text = value.trim()
    if (!text) return
    track('hero_ask', { lang })
    askAssistant(text)
    setValue('')
  }

  return (
    <div dir={dir} className="w-full max-w-2xl">
      <div className="group flex items-center gap-2 rounded-full border border-white/20 bg-black/40 py-2 ps-4 pe-2 shadow-[0_8px_40px_rgba(0,0,0,0.45)] backdrop-blur-xl transition-colors focus-within:border-white/40 sm:gap-3 sm:py-2.5 sm:ps-5">
        <Sparkles size={18} strokeWidth={2} className="hidden shrink-0 text-emerald-300 sm:block" />
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
          placeholder={labels.placeholder}
          aria-label={labels.placeholder}
          className="min-w-0 flex-1 bg-transparent py-2 text-base text-white outline-none placeholder:text-white/45 sm:text-lg"
        />
        <button
          type="button"
          onClick={submit}
          disabled={!value.trim()}
          aria-label={labels.sendLabel}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-black transition-all hover:scale-105 active:scale-95 disabled:cursor-not-allowed disabled:bg-white/15 disabled:text-white/40 disabled:hover:scale-100"
        >
          <ArrowUp size={20} strokeWidth={2.4} />
        </button>
      </div>
      <p className="mt-2 ps-1 text-xs text-white/45">{labels.hint}</p>
    </div>
  )
}
