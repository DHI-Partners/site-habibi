import { MessageCircle } from 'lucide-react'
import { buildWhatsAppLink } from './ContactProvider'

/** Floating button for direct contact via WhatsApp (bottom-right in LTR). */
export default function WhatsAppButton({ message }: { message?: string }) {
  const href = buildWhatsAppLink(message ?? 'Hi 👋 I’d like to learn more about Habibi.')

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="group fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full bg-emerald-500 py-3.5 pe-4 ps-3.5 text-white shadow-[0_10px_30px_-6px_rgba(16,185,129,0.6)] transition-all duration-300 hover:scale-105 hover:bg-emerald-400 active:scale-95 sm:bottom-6 sm:right-6"
    >
      <MessageCircle size={22} className="shrink-0" />
      <span className="hidden text-sm font-semibold sm:inline">Chat on WhatsApp</span>
    </a>
  )
}
