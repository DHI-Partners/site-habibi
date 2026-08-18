import { MessagesSquare, X } from 'lucide-react'

export interface ChatLauncherProps {
  open: boolean
  onToggle: () => void
  /** Сторона экрана: 'right' для ru/en, 'left' для арабской версии. */
  side: 'right' | 'left'
  openLabel: string
  closeLabel: string
}

/**
 * Плавающая кнопка чата. Занимает тот угол, в котором раньше жила
 * кнопка мессенджера — WhatsApp и Telegram переехали в шапку панели.
 *
 * Анимации (msg-bob, msg-ring, msg-wiggle) уже определены в src/index.css.
 */
export default function ChatLauncher({
  open,
  onToggle,
  side,
  openLabel,
  closeLabel,
}: ChatLauncherProps) {
  const corner = side === 'right' ? 'right-5 sm:right-6' : 'left-5 sm:left-6'

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={open ? closeLabel : openLabel}
      aria-expanded={open}
      dir="ltr"
      className={`fixed bottom-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-white text-black shadow-[0_8px_30px_rgba(0,0,0,0.5)] transition-transform duration-300 hover:scale-105 active:scale-95 sm:bottom-6 ${corner} ${
        open ? '' : 'msg-bob'
      }`}
    >
      {/* Пульсирующие кольца — только пока чат закрыт, чтобы не отвлекать от диалога */}
      {!open && (
        <>
          <span className="msg-ring pointer-events-none absolute inset-0 rounded-full border border-white/40" />
          <span className="msg-ring-2 pointer-events-none absolute inset-0 rounded-full border border-white/30" />
        </>
      )}

      <MessagesSquare
        size={24}
        strokeWidth={1.9}
        className={`absolute transition-all duration-300 ${
          open ? 'scale-75 opacity-0' : 'msg-wiggle scale-100 opacity-100'
        }`}
      />
      <X
        size={24}
        strokeWidth={2}
        className={`absolute transition-all duration-300 ${
          open ? 'scale-100 opacity-100' : 'scale-75 opacity-0'
        }`}
      />
    </button>
  )
}
