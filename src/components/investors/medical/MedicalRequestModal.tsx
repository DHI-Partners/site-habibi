import { useEffect, useState } from 'react'
import { X, Check, Mail, User } from 'lucide-react'

interface MedicalRequestModalProps {
  open: boolean
  onClose: () => void
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const WEB3FORMS_ACCESS_KEY = '686dfc9a-134b-42f6-b0ee-8cc7f9451edb'

/**
 * Светлая модалка «Запросить материалы» для дека «Медицина». Собирает
 * Имя + Email и отправляет заявку в Web3Forms (финмодель/бизнес-план/
 * презентация высылаются на email вручную).
 */
export default function MedicalRequestModal({ open, onClose }: MedicalRequestModalProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [sending, setSending] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!open) return
    setName('')
    setEmail('')
    setSending(false)
    setDone(false)
    setError(false)
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [open, onClose])

  if (!open) return null

  const valid = name.trim().length > 1 && EMAIL_RE.test(email)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!valid || sending) return
    setSending(true)
    setError(false)
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: 'Запрос материалов Habibi Medical — новый лид',
          from_name: 'Habibi — инвест-дек (Медицина)',
          Имя: name,
          email,
          Запрос: 'Финмодель, бизнес-план и презентация',
          Источник: 'Дек «Медицина» (/investors/medical)',
        }),
      })
      const data = await res.json()
      if (data.success) setDone(true)
      else setError(true)
    } catch {
      setError(true)
    } finally {
      setSending(false)
    }
  }

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 font-inter backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md rounded-3xl border border-slate-200/70 bg-white p-7 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.15)] sm:p-8"
      >
        <button
          type="button"
          aria-label="Закрыть"
          onClick={onClose}
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-400 transition-colors hover:border-slate-300 hover:text-slate-700"
        >
          <X size={18} />
        </button>

        {!done ? (
          <form onSubmit={handleSubmit}>
            <h3 className="font-display text-2xl font-medium tracking-tight text-[#0a1b33]">
              Запросить материалы
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-500">
              Оставьте имя и email — вышлем финмодель в Excel, бизнес-план и презентацию
              Habibi&nbsp;Medical.
            </p>

            <label className="mt-6 block">
              <span className="mb-1.5 block text-sm font-medium text-slate-600">
                Имя <span className="text-rose-500">*</span>
              </span>
              <div className="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-slate-50 px-3.5 focus-within:border-slate-400">
                <User size={16} className="shrink-0 text-slate-400" />
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Как к вам обращаться"
                  className="w-full bg-transparent py-3 text-sm text-[#0a1b33] placeholder:text-slate-400 focus:outline-none"
                />
              </div>
            </label>

            <label className="mt-4 block">
              <span className="mb-1.5 block text-sm font-medium text-slate-600">
                Email <span className="text-rose-500">*</span>
              </span>
              <div className="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-slate-50 px-3.5 focus-within:border-slate-400">
                <Mail size={16} className="shrink-0 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@clinic.com"
                  className="w-full bg-transparent py-3 text-sm text-[#0a1b33] placeholder:text-slate-400 focus:outline-none"
                />
              </div>
            </label>

            <button
              type="submit"
              disabled={!valid || sending}
              className={`mt-7 w-full rounded-full py-3.5 text-sm font-semibold transition-all duration-200 ${
                valid && !sending
                  ? 'bg-[#0a152d] text-white hover:scale-[1.02]'
                  : 'cursor-not-allowed bg-slate-200 text-slate-400'
              }`}
            >
              {sending ? 'Отправляем…' : 'Запросить материалы'}
            </button>
            {error && (
              <p className="mt-3 text-center text-xs text-rose-500">
                Не удалось отправить. Проверьте соединение и попробуйте ещё раз.
              </p>
            )}
            <p className="mt-3 text-center text-xs text-slate-400">
              Нажимая кнопку, вы соглашаетесь на обработку контактных данных.
            </p>
          </form>
        ) : (
          <div className="py-4 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#0a152d] text-white">
              <Check size={32} strokeWidth={3} />
            </div>
            <h3 className="mt-5 font-display text-2xl font-medium tracking-tight text-[#0a1b33]">
              Заявка принята
            </h3>
            <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-slate-500">
              Спасибо! Вышлем финмодель, бизнес-план и презентацию на ваш email в ближайшее время.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-7 w-full rounded-full bg-[#0a152d] py-3.5 text-sm font-semibold text-white transition-transform hover:scale-[1.02]"
            >
              Готово
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
