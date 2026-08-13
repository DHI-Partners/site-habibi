import { MessageCircle } from 'lucide-react'
import { buildWhatsAppLink } from './ContactProvider'

/** زرّ عائم للتواصل المباشر عبر واتساب (أسفل يسار الشاشة في وضع RTL). */
export default function WhatsAppButton({ message }: { message?: string }) {
  const href = buildWhatsAppLink(message ?? 'مرحبًا 👋 أرغب بمعرفة المزيد عن Habibi.')

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="تواصل عبر واتساب"
      className="group fixed bottom-5 left-5 z-40 flex items-center gap-2 rounded-full bg-emerald-500 py-3.5 pe-4 ps-3.5 text-white shadow-[0_10px_30px_-6px_rgba(16,185,129,0.6)] transition-all duration-300 hover:scale-105 hover:bg-emerald-400 active:scale-95 sm:bottom-6 sm:left-6"
    >
      <MessageCircle size={22} className="shrink-0" />
      <span className="hidden text-sm font-semibold sm:inline">تواصل عبر واتساب</span>
    </a>
  )
}
