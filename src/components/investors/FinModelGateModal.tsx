import { useEffect, useState } from 'react'
import { X, Check, Mail, User, Download } from 'lucide-react'
import { FIN_MODEL_URL } from './constants'

interface FinModelGateModalProps {
  open: boolean
  onClose: () => void
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Тот же ключ Web3Forms, что и у контактной формы — лиды уходят на
// привязанную почту.
const WEB3FORMS_ACCESS_KEY = '686dfc9a-134b-42f6-b0ee-8cc7f9451edb'

const FILE_NAME = 'Habibi_PropTech_Financial_Model.xlsx'

/** Программно инициирует скачивание файла финмодели. */
function triggerDownload() {
  const a = document.createElement('a')
  a.href = FIN_MODEL_URL
  a.download = FILE_NAME
  document.body.appendChild(a)
  a.click()
  a.remove()
}

/**
 * Модалка-«шлюз»: перед скачиванием финмодели просит Имя и Email.
 * После отправки лид уходит в Web3Forms и сразу стартует скачивание.
 */
export default function FinModelGateModal({ open, onClose }: FinModelGateModalProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [sending, setSending] = useState(false)
  const [done, setDone] = useState(false)

  // Сброс при открытии + Esc + блокировка прокрутки фона.
  useEffect(() => {
    if (!open) return
    setName('')
    setEmail('')
    setSending(false)
    setDone(false)

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
    // Отправляем лид, но не блокируем скачивание, если отправка не удалась.
    try {
      await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: 'Скачивание финмодели Habibi — новый лид',
          from_name: 'Habibi — инвест-дек',
          Имя: name,
          email,
          Источник: 'Кнопка «Скачать фин модель» (/investors)',
        }),
      })
    } catch {
      // тихо игнорируем — скачивание всё равно даём
    }
    setSending(false)
    setDone(true)
    triggerDownload()
  }

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md [animation:fadeSlideUp_0.25s_ease_both]"
      role="dialog"
      aria-modal="true"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/15 bg-[#0a0a0a]/90 p-7 shadow-2xl backdrop-blur-xl sm:p-8"
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
          /* ─── Форма ─── */
          <form onSubmit={handleSubmit}>
            <h3 className="text-2xl font-semibold tracking-tight text-white">
              Скачать финансовую модель
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-white/55">
              Оставьте имя и email — и мы откроем доступ к финмодели Habibi PropTech.
            </p>

            {/* Имя */}
            <label className="mt-6 block">
              <span className="mb-1.5 block text-sm font-medium text-white/70">
                Имя <span className="text-red-400">*</span>
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

            {/* Email */}
            <label className="mt-4 block">
              <span className="mb-1.5 block text-sm font-medium text-white/70">
                Email <span className="text-red-400">*</span>
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
              className={`mt-7 flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-semibold transition-all duration-200 ${
                valid && !sending
                  ? 'bg-white text-black hover:scale-[1.02]'
                  : 'cursor-not-allowed bg-white/15 text-white/40'
              }`}
            >
              <Download size={16} />
              {sending ? 'Готовим файл…' : 'Скачать фин модель'}
            </button>
            <p className="mt-3 text-center text-xs text-white/35">
              Нажимая кнопку, вы соглашаетесь на обработку контактных данных.
            </p>
          </form>
        ) : (
          /* ─── Скачивание началось ─── */
          <div className="py-4 text-center [animation:fadeSlideUp_0.4s_ease_both]">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white text-black">
              <Check size={32} strokeWidth={3} />
            </div>
            <h3 className="mt-5 text-2xl font-semibold tracking-tight text-white">
              Скачивание началось
            </h3>
            <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-white/60">
              Спасибо! Если загрузка не началась автоматически —{' '}
              <a href={FIN_MODEL_URL} download={FILE_NAME} className="text-white underline">
                скачайте вручную
              </a>
              .
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-7 w-full rounded-xl bg-white py-3.5 text-sm font-semibold text-black transition-transform hover:scale-[1.02]"
            >
              Готово
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
