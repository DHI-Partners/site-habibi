import { useEffect, useState } from 'react'
import { X, User, MessageCircle } from 'lucide-react'
import { buildWhatsAppLink } from './ContactProvider'

interface ContactModalProps {
  open: boolean
  onClose: () => void
  /** اسم الباقة المختارة — يُعرض في العنوان ويُدرج في الرسالة. */
  tierName?: string | null
}

export default function ContactModal({ open, onClose, tierName }: ContactModalProps) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')

  // إعادة ضبط الحقول عند كل فتح + إغلاق بمفتاح Esc + منع تمرير الخلفية.
  useEffect(() => {
    if (!open) return
    setName('')
    setPhone('')
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

  const valid = name.trim().length > 1 && phone.trim().length > 5

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!valid) return
    const lines = [
      'مرحبًا 👋',
      `الاسم: ${name.trim()}`,
      `رقم واتساب: ${phone.trim()}`,
      tierName ? `الباقة: ${tierName}` : '',
      'أرغب بمعرفة المزيد عن Habibi.',
    ].filter(Boolean)
    // فتح محادثة واتساب مع الرقم مع نصّ مُعبّأ مسبقًا.
    window.open(buildWhatsAppLink(lines.join('\n')), '_blank', 'noopener,noreferrer')
    onClose()
  }

  return (
    <div
      onClick={onClose}
      dir="rtl"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 font-arabic backdrop-blur-md [animation:fadeSlideUp_0.25s_ease_both]"
      role="dialog"
      aria-modal="true"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/15 bg-[#0a0a0a]/90 p-7 text-white shadow-2xl backdrop-blur-xl sm:p-8"
      >
        <button
          type="button"
          aria-label="إغلاق"
          onClick={onClose}
          className="absolute left-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition-colors hover:border-white/25 hover:text-white"
        >
          <X size={18} />
        </button>

        <form onSubmit={handleSubmit}>
          <h3 className="text-2xl font-semibold tracking-tight text-white">تواصل معنا عبر واتساب</h3>
          <p className="mt-2 text-sm leading-relaxed text-white/55">
            {tierName ? (
              <>
                الباقة <span className="font-medium text-white">{tierName}</span>. اكتب اسمك ورقمك —
                وسنكمل المحادثة على واتساب.
              </>
            ) : (
              'اكتب اسمك ورقمك — وسنكمل المحادثة على واتساب مباشرة.'
            )}
          </p>

          {/* الاسم */}
          <label className="mt-6 block">
            <span className="mb-1.5 block text-sm font-medium text-white/70">
              الاسم <span className="text-red-400">*</span>
            </span>
            <div className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.04] px-3.5 focus-within:border-white/30">
              <User size={16} className="shrink-0 text-white/40" />
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="كيف نناديك؟"
                className="w-full bg-transparent py-3 text-sm text-white placeholder:text-white/30 focus:outline-none"
              />
            </div>
          </label>

          {/* رقم واتساب */}
          <label className="mt-4 block">
            <span className="mb-1.5 block text-sm font-medium text-white/70">
              رقم واتساب <span className="text-red-400">*</span>
            </span>
            <div className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.04] px-3.5 focus-within:border-white/30">
              <MessageCircle size={16} className="shrink-0 text-emerald-400" />
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+966 5X XXX XXXX"
                inputMode="tel"
                dir="ltr"
                className="w-full bg-transparent py-3 text-right text-sm text-white placeholder:text-white/30 focus:outline-none"
              />
            </div>
          </label>

          <button
            type="submit"
            disabled={!valid}
            className={`mt-7 flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-semibold transition-all duration-200 ${
              valid
                ? 'bg-emerald-500 text-white hover:scale-[1.02] hover:bg-emerald-400'
                : 'cursor-not-allowed bg-white/15 text-white/40'
            }`}
          >
            <MessageCircle size={18} />
            المتابعة عبر واتساب
          </button>
          <p className="mt-3 text-center text-xs leading-relaxed text-white/35">
            بالضغط على الزر ستُفتح محادثة واتساب مع فريق Habibi، وأنت توافق على معالجة بيانات
            التواصل وفق 
            <a href="/ar/privacy" target="_blank" rel="noopener noreferrer" className="text-white/55 underline underline-offset-2 transition-colors hover:text-white">
              سياسة الخصوصية
            </a> 
            وتقبل 
            <a href="/ar/terms" target="_blank" rel="noopener noreferrer" className="text-white/55 underline underline-offset-2 transition-colors hover:text-white">
              شروط الاستخدام
            </a>.
          </p>
        </form>
      </div>
    </div>
  )
}
