import { useEffect, useRef, useState } from 'react'
import { ChevronDown } from 'lucide-react'

/** Переключатель языков сайта: кнопка с текущим флагом + выпадающий список остальных.
    Английская версия — корень сайта. */

const LANGS = [
  { code: 'en', flag: '🇬🇧', label: 'EN', name: 'English', href: '/' },
  { code: 'ru', flag: '🇷🇺', label: 'RU', name: 'Русский', href: '/ru' },
  { code: 'ar', flag: '🇸🇦', label: 'AR', name: 'العربية', href: '/ar' },
] as const

export type LangCode = (typeof LANGS)[number]['code']

interface LangSwitcherProps {
  current: LangCode
  /** Край экрана, к которому прижат список (по умолчанию правый — для навбаров LTR). */
  align?: 'left' | 'right'
  /** 'inline' — все языки сразу, простыми ссылками (для мобильного меню); 'dropdown' — выпадающий список. */
  variant?: 'dropdown' | 'inline'
}

export default function LangSwitcher({
  current,
  align = 'right',
  variant = 'dropdown',
}: LangSwitcherProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  // Закрытие по клику вне списка и по Esc.
  useEffect(() => {
    if (!open) return
    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onPointerDown)
    document.addEventListener('touchstart', onPointerDown)
    window.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('touchstart', onPointerDown)
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  const active = LANGS.find((lang) => lang.code === current) ?? LANGS[0]

  // Мобильное меню: три языка одним рядом, прямыми ссылками — без выпадающего списка.
  if (variant === 'inline') {
    return (
      <div
        dir="ltr"
        className="flex items-center gap-1 rounded-full border border-white/10 bg-black/30 p-1 backdrop-blur-md"
      >
        {LANGS.map((lang) => {
          const isActive = lang.code === current
          return (
            <a
              key={lang.code}
              href={isActive ? undefined : lang.href}
              aria-current={isActive ? 'page' : undefined}
              className={`flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-semibold ${
                isActive ? 'bg-white text-black' : 'text-white/70 active:bg-white/10'
              }`}
            >
              <span className="text-base leading-none">{lang.flag}</span>
              {lang.label}
            </a>
          )
        })}
      </div>
    )
  }

  return (
    <div ref={ref} dir="ltr" className="relative">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 rounded-full border border-white/10 bg-black/30 px-3.5 py-2 text-xs font-semibold text-white backdrop-blur-md transition-colors hover:border-white/25 hover:bg-white/10"
      >
        <span className="text-sm leading-none">{active.flag}</span>
        {active.label}
        <ChevronDown
          size={14}
          className={`text-white/60 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div
          role="listbox"
          className={`absolute top-full z-50 mt-2 min-w-[9.5rem] overflow-hidden rounded-2xl border border-white/12 bg-black/90 p-1.5 shadow-2xl backdrop-blur-xl [animation:fadeSlideUp_0.18s_ease_both] ${
            align === 'right' ? 'right-0' : 'left-0'
          }`}
        >
          {LANGS.map((lang) => {
            const isActive = lang.code === current
            return (
              <a
                key={lang.code}
                href={isActive ? undefined : lang.href}
                role="option"
                aria-selected={isActive}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-white/10 text-white'
                    : 'cursor-pointer text-white/70 hover:bg-white/10 hover:text-white'
                }`}
              >
                <span className="text-base leading-none">{lang.flag}</span>
                {lang.name}
                {isActive && <span className="ms-auto h-1.5 w-1.5 rounded-full bg-emerald-400" />}
              </a>
            )
          })}
        </div>
      )}
    </div>
  )
}
