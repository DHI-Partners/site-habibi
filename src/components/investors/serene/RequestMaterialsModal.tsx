import { useEffect, useState } from 'react'
import { X, Check, Mail, User } from 'lucide-react'

interface RequestMaterialsModalProps {
  open: boolean
  onClose: () => void
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Тот же ключ Web3Forms, что и у контактной формы — лиды на привязанную почту.
const WEB3FORMS_ACCESS_KEY = '686dfc9a-134b-42f6-b0ee-8cc7f9451edb'

/**
 * Serene-модалка «Запросить материалы» (финмодель, бизнес-план, презентация)
 * для направления «Туризм». Собирает Имя + Email и отправляет заявку в
 * Web3Forms. Файл не отдаётся — материалы высылаются вручную на email.
 */
export default function RequestMaterialsModal({ open, onClose }: RequestMaterialsModalProps) {
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
          subject: 'Запрос материалов Habibi Hajj & Umrah — новый лид',
          from_name: 'Habibi — инвест-дек (Туризм)',
          Имя: name,
          email,
          Запрос: 'Финмодель, бизнес-план и презентация',
          Источник: 'Дек «Туризм» Hajj & Umrah (/investors/tourism)',
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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 font-inter backdrop-blur-md"
      role="dialog"
      aria-modal="true"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="serene-glass relative w-full max-w-md rounded-3xl p-7 shadow-2xl sm:p-8"
        style={{ background: 'rgba(10,6,8,0.85)' }}
      >
        <button
          type="button"
          aria-label="Закрыть"
          onClick={onClose}
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition-colors hover:border-white/25 hover:text-white"
        >
          <X size={18} />
        </button>

        {!done ? (
          <form onSubmit={handleSubmit}>
            <h3 className="font-instrument text-3xl text-white">Запросить материалы</h3>
            <p className="mt-2 text-sm leading-relaxed text-white/55">
              Оставьте имя и email — вышлем финмодель в Excel, бизнес-план и презентацию
              Habibi&nbsp;Hajj&nbsp;&&nbsp;Umrah.
            </p>

            <label className="mt-6 block">
              <span className="mb-1.5 block text-sm font-medium text-white/70">
                Имя <span className="text-rose-300">*</span>
              </span>
              <div className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.04] px-3.5 focus-within:border-white/30">
                <User size={16} className="shrink-0 text-white/40" />
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Как к вам обращаться"
                  className="w-full bg-transparent py-3 text-sm text-white placeholder:text-white/30 focus:outline-none"
                />
              </div>
            </label>

            <label className="mt-4 block">
              <span className="mb-1.5 block text-sm font-medium text-white/70">
                Email <span className="text-rose-300">*</span>
              </span>
              <div className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.04] px-3.5 focus-within:border-white/30">
                <Mail size={16} className="shrink-0 text-white/40" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="w-full bg-transparent py-3 text-sm text-white placeholder:text-white/30 focus:outline-none"
                />
              </div>
            </label>

            <button
              type="submit"
              disabled={!valid || sending}
              className={`button-glow mt-7 w-full rounded-full py-3.5 text-sm font-semibold transition-all duration-200 ${
                valid && !sending
                  ? 'bg-white text-black hover:bg-white/90'
                  : 'cursor-not-allowed bg-white/15 text-white/40'
              }`}
            >
              {sending ? 'Отправляем…' : 'Запросить материалы'}
            </button>
            {error && (
              <p className="mt-3 text-center text-xs text-rose-300">
                Не удалось отправить. Проверьте соединение и попробуйте ещё раз.
              </p>
            )}
            <p className="mt-3 text-center text-xs text-white/35">
              Нажимая кнопку, вы соглашаетесь на обработку контактных данных.
            </p>
          </form>
        ) : (
          <div className="py-4 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white text-black">
              <Check size={32} strokeWidth={3} />
            </div>
            <h3 className="mt-5 font-instrument text-3xl text-white">Заявка принята</h3>
            <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-white/60">
              Спасибо! Вышлем финмодель, бизнес-план и презентацию на ваш email в ближайшее время.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="button-glow mt-7 w-full rounded-full bg-white py-3.5 text-sm font-semibold text-black transition-colors hover:bg-white/90"
            >
              Готово
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
