import { useEffect, useMemo, useState } from 'react'
import { X, Check, Mail, User, MessageCircle, Send } from 'lucide-react'
import { LiquidButton } from '../ui/liquid-glass-button'

type Channel = 'whatsapp' | 'telegram'

interface ContactModalProps {
  open: boolean
  onClose: () => void
  /** Name of the selected plan — shown in the form header. */
  tierName?: string | null
  /** Custom email subject (defaults to "New request from the Habibi site — plan …"). */
  subject?: string
  /** Custom form subtitle (defaults to "Plan X. Leave your contacts…"). */
  heading?: string
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Public Web3Forms key (submissions go to the linked mailbox).
const WEB3FORMS_ACCESS_KEY = '686dfc9a-134b-42f6-b0ee-8cc7f9451edb'

export default function ContactModal({
  open,
  onClose,
  tierName,
  subject,
  heading,
}: ContactModalProps) {
  const [name, setName] = useState('')
  const [channel, setChannel] = useState<Channel | null>(null)
  const [contact, setContact] = useState('')
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState(false)

  // Reset the form on every open + Esc + lock background scroll.
  useEffect(() => {
    if (!open) return
    setName('')
    setChannel(null)
    setContact('')
    setEmail('')
    setSubmitted(false)
    setSending(false)
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

  const valid =
    name.trim().length > 1 && channel !== null && contact.trim().length > 2 && EMAIL_RE.test(email)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!valid || sending) return
    setSending(true)
    setError(false)
    const channelLabel = channel === 'telegram' ? 'Telegram' : 'WhatsApp'
    // Lead arrived via a partner link? Attribute it to the partner.
    let refSlug = ''
    try {
      refSlug = localStorage.getItem('habibi_ref') ?? ''
    } catch {
      /* localStorage недоступен */
    }
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: subject ?? `New request from the Habibi site — plan ${tierName || '—'}`,
          from_name: 'Habibi — website',
          Name: name,
          Plan: tierName || '—',
          Channel: channelLabel,
          [channelLabel]: contact,
          email, // client email → Reply-To
          ...(refSlug ? { 'Partner': refSlug } : {}),
        }),
      })
      const data = await res.json()
      if (data.success) {
        setSubmitted(true)
        if (refSlug) {
          fetch('/api/track', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            keepalive: true,
            body: JSON.stringify({
              type: 'lead',
              slug: refSlug,
              name,
              channel,
              contact,
              email,
            }),
          }).catch(() => {})
        }
      } else {
        setError(true)
      }
    } catch {
      setError(true)
    } finally {
      setSending(false)
    }
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
          aria-label="Close"
          onClick={onClose}
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition-colors hover:border-white/25 hover:text-white"
        >
          <X size={18} />
        </button>

        {!submitted ? (
          /* ─── Form ─── */
          <form onSubmit={handleSubmit}>
            <h3 className="text-2xl font-semibold tracking-tight text-white">Request a demo</h3>
            <p className="mt-2 text-sm leading-relaxed text-white/55">
              {heading ? (
                heading
              ) : tierName ? (
                <>
                  Plan{' '}
                  <span className="font-medium text-white">{tierName}</span>. Leave your contacts —
                  and we'll get in touch.
                </>
              ) : (
                "Leave your contacts — and we'll get in touch."
              )}
            </p>

            {/* Name */}
            <label className="mt-6 block">
              <span className="mb-1.5 block text-sm font-medium text-white/70">
                Name <span className="text-red-400">*</span>
              </span>
              <div className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.04] px-3.5 focus-within:border-white/30">
                <User size={16} className="shrink-0 text-white/40" />
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="How should we call you"
                  className="w-full bg-transparent py-3 text-sm text-white placeholder:text-white/30 focus:outline-none"
                />
              </div>
            </label>

            {/* Contact channel */}
            <div className="mt-4">
              <span className="mb-1.5 block text-sm font-medium text-white/70">
                How should we reach you? <span className="text-red-400">*</span>
              </span>
              <div className="grid grid-cols-2 gap-2.5">
                <ChannelButton
                  active={channel === 'whatsapp'}
                  onClick={() => setChannel('whatsapp')}
                  icon={<MessageCircle size={17} />}
                  label="WhatsApp"
                  accent="#22c55e"
                />
                <ChannelButton
                  active={channel === 'telegram'}
                  onClick={() => setChannel('telegram')}
                  icon={<Send size={16} />}
                  label="Telegram"
                  accent="#3b82f6"
                />
              </div>
            </div>

            {/* Contact for the selected channel */}
            <label className="mt-4 block">
              <span className="mb-1.5 block text-sm font-medium text-white/70">
                {channel === 'telegram' ? 'Telegram username' : 'WhatsApp number'}{' '}
                <span className="text-red-400">*</span>
              </span>
              <input
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder={channel === 'telegram' ? '@username' : '+1 555 123 4567'}
                inputMode={channel === 'telegram' ? 'text' : 'tel'}
                className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-3 text-sm text-white placeholder:text-white/30 focus:border-white/30 focus:outline-none"
              />
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
              className={`mt-7 w-full rounded-xl py-3.5 text-sm font-semibold transition-all duration-200 ${
                valid && !sending
                  ? 'bg-white text-black hover:scale-[1.02]'
                  : 'cursor-not-allowed bg-white/15 text-white/40'
              }`}
            >
              {sending ? 'Sending…' : 'Send request'}
            </button>
            {error && (
              <p className="mt-3 text-center text-xs text-red-400">
                Couldn't send. Check your connection and try again.
              </p>
            )}
            <p className="mt-3 text-center text-xs text-white/35">
              By clicking the button, you agree to the processing of your contact data.
            </p>
          </form>
        ) : (
          /* ─── Success ─── */
          <div className="py-4 text-center [animation:fadeSlideUp_0.4s_ease_both]">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white text-black">
              <Check size={32} strokeWidth={3} />
            </div>
            <h3 className="mt-5 text-2xl font-semibold tracking-tight text-white">Request received!</h3>
            <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-white/60">
              Thank you! We've got your request and will get in touch shortly
              {channel === 'telegram' ? ' on Telegram' : channel === 'whatsapp' ? ' on WhatsApp' : ''}.
            </p>
            <LiquidButton
              size="lg"
              onClick={onClose}
              className="mt-7 w-full justify-center rounded-full text-white"
            >
              Great
            </LiquidButton>
          </div>
        )}
      </div>

      {submitted && <Balloons />}
    </div>
  )
}

function ChannelButton({
  active,
  onClick,
  icon,
  label,
  accent,
}: {
  active: boolean
  onClick: () => void
  icon: React.ReactNode
  label: string
  accent: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center justify-center gap-2 rounded-xl border py-3 text-sm font-medium transition-all duration-200 ${
        active
          ? 'border-white/40 bg-white/[0.12] text-white'
          : 'border-white/10 bg-white/[0.04] text-white/60 hover:border-white/20 hover:text-white'
      }`}
      style={active ? { color: '#fff', borderColor: accent, boxShadow: `0 0 20px ${accent}33` } : undefined}
    >
      <span style={{ color: active ? accent : undefined }}>{icon}</span>
      {label}
    </button>
  )
}

/* ─── Balloons ─── */

const BALLOON_COLORS = [
  '#f472b6',
  '#60a5fa',
  '#34d399',
  '#fbbf24',
  '#a78bfa',
  '#f87171',
  '#22d3ee',
  '#fb923c',
]

function Balloons() {
  const balloons = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => {
        const w = 26 + Math.round(Math.random() * 22)
        return {
          id: i,
          left: Math.round(Math.random() * 100),
          color: BALLOON_COLORS[i % BALLOON_COLORS.length],
          w,
          rise: 7 + Math.random() * 4,
          delay: Math.random() * 1.8,
          sway: 1.8 + Math.random() * 1.8,
        }
      }),
    [],
  )

  return (
    <div className="pointer-events-none fixed inset-0 z-[60] overflow-hidden">
      {balloons.map((b) => (
        <div
          key={b.id}
          className="balloon-rise absolute"
          style={{
            left: `${b.left}%`,
            animationDuration: `${b.rise}s`,
            animationDelay: `${b.delay}s`,
          }}
        >
          <div className="balloon-sway" style={{ animationDuration: `${b.sway}s` }}>
            <span
              className="balloon-body block"
              style={{ ['--c' as string]: b.color, width: `${b.w}px`, height: `${Math.round(b.w * 1.2)}px` }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}
