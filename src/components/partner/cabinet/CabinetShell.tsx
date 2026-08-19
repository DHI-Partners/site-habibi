import { useEffect, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { LogOut } from 'lucide-react'
import DigitalHeart from '../../DigitalHeart'
import GoldRain from '../GoldRain'
import { getSupabase, supabaseConfigured } from '../../../lib/supabase'
import { SectionTag } from '../ui'

/** Устанавливает язык и заголовок вкладки на время показа страницы кабинета. */
export function usePageMeta(title: string) {
  useEffect(() => {
    const html = document.documentElement
    const prevLang = html.getAttribute('lang') ?? 'en'
    html.setAttribute('lang', 'ru')
    document.title = title
    window.scrollTo(0, 0)
    return () => {
      html.setAttribute('lang', prevLang)
      document.title = 'Habibi — the digital ecosystem for your business'
    }
  }, [title])
}

/**
 * Общая обёртка страниц кабинета: чёрный фон с золотым дождём (как на
 * партнёрской странице), шапка с логотипом и — при активной сессии — выходом.
 */
export function CabinetShell({
  tag,
  children,
  narrow = false,
  showSignOut = false,
}: {
  tag: string
  children: ReactNode
  /** Узкая колонка — для форм регистрации и входа. */
  narrow?: boolean
  showSignOut?: boolean
}) {
  const signOut = async () => {
    if (supabaseConfigured()) await getSupabase().auth.signOut()
    window.location.href = '/ru/partners'
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black font-geist text-white">
      <GoldRain className="pointer-events-none absolute inset-0" seed={11} density={0.5} />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />

      <header className="relative z-10 mx-auto flex max-w-6xl items-center justify-between px-6 pt-8 md:px-12">
        <Link
          to="/ru/partners"
          className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.22em] text-white/70 transition-colors hover:text-white"
        >
          Habibi
          <DigitalHeart className="heart-beat h-[12px] w-auto text-emerald-400" />
        </Link>
        {showSignOut && (
          <button
            type="button"
            onClick={signOut}
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm text-white/70 transition-colors hover:border-white/40 hover:text-white"
          >
            <LogOut size={14} />
            Выйти
          </button>
        )}
      </header>

      <main
        className={`relative z-10 mx-auto px-6 pb-24 pt-10 md:px-12 md:pt-14 ${
          narrow ? 'max-w-lg' : 'max-w-6xl'
        }`}
      >
        <SectionTag divider={false}>{tag}</SectionTag>
        {children}
      </main>
    </div>
  )
}

/* ─────────────────────────── Поля форм (стиль ContactModal) ─────────────────────────── */

export function Field({
  label,
  required = false,
  hint,
  children,
}: {
  label: string
  required?: boolean
  hint?: string
  children: ReactNode
}) {
  return (
    <label className="mt-4 block">
      <span className="mb-1.5 block text-sm font-medium text-white/70">
        {label} {required && <span className="text-red-400">*</span>}
      </span>
      {children}
      {hint && <span className="mt-1.5 block text-xs text-white/40">{hint}</span>}
    </label>
  )
}

export function TextInput({
  icon,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { icon?: ReactNode }) {
  return (
    <div className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.04] px-3.5 focus-within:border-white/30">
      {icon && <span className="shrink-0 text-white/40">{icon}</span>}
      <input
        {...props}
        className="w-full bg-transparent py-3 text-sm text-white placeholder:text-white/30 focus:outline-none"
      />
    </div>
  )
}

export function SubmitButton({
  disabled,
  children,
}: {
  disabled?: boolean
  children: ReactNode
}) {
  return (
    <button
      type="submit"
      disabled={disabled}
      className={`mt-7 w-full rounded-xl py-3.5 text-sm font-semibold transition-all duration-200 ${
        !disabled
          ? 'bg-white text-black hover:scale-[1.02]'
          : 'cursor-not-allowed bg-white/15 text-white/40'
      }`}
    >
      {children}
    </button>
  )
}

export function FormError({ children }: { children: ReactNode }) {
  if (!children) return null
  return <p className="mt-3 text-center text-xs text-red-400">{children}</p>
}

/** Заглушка, когда Supabase не настроен (нет env-переменных). */
export function NotConfigured() {
  return (
    <div className="rounded-2xl border border-amber-300/30 bg-amber-300/[0.06] p-6 text-sm leading-relaxed text-amber-100/90">
      Кабинет ещё не подключён: добавьте переменные окружения{' '}
      <code className="text-amber-200">VITE_SUPABASE_URL</code> и{' '}
      <code className="text-amber-200">VITE_SUPABASE_ANON_KEY</code>, затем пересоберите сайт.
    </div>
  )
}
