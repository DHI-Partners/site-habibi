import { useState } from 'react'
import { Check, Loader2 } from 'lucide-react'
import { LiquidButton } from '../ui/liquid-glass-button'
import type { ConsultingFormLabels } from './types'

// Тот же ключ Web3Forms, что и у остальных форм сайта — заявки идут на общую почту.
const WEB3FORMS_ACCESS_KEY = '686dfc9a-134b-42f6-b0ee-8cc7f9451edb'
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const INPUT =
  'w-full rounded-xl border border-white/12 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition-colors focus:border-emerald-400/60 focus:bg-white/[0.06]'

/** Анкета «Расскажите о своём бизнесе» — заявка на консалтинг (любой язык). */
export default function ConsultingForm({ labels }: { labels: ConsultingFormLabels }) {
  const [values, setValues] = useState<Record<string, string>>({})
  const [name, setName] = useState('')
  const [contact, setContact] = useState('')
  const [email, setEmail] = useState('')
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState(false)

  const set = (key: string, value: string) => setValues((v) => ({ ...v, [key]: value }))

  const requiredFilled = labels.fields
    .filter((f) => f.required)
    .every((f) => (values[f.name] ?? '').trim().length > 1)
  const valid =
    name.trim().length > 1 && contact.trim().length > 4 && EMAIL_RE.test(email) && requiredFilled

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!valid || sending) return
    setSending(true)
    setError(false)
    try {
      const payload: Record<string, string> = {
        access_key: WEB3FORMS_ACCESS_KEY,
        subject: labels.subject,
        from_name: 'Habibi — консалтинг',
        [labels.name]: name,
        [labels.contact]: contact,
        email,
      }
      for (const f of labels.fields) {
        const v = (values[f.name] ?? '').trim()
        if (v) payload[f.label] = v
      }
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (data.success) setSent(true)
      else setError(true)
    } catch {
      setError(true)
    } finally {
      setSending(false)
    }
  }

  if (sent) {
    return (
      <div className="rounded-2xl border border-emerald-400/30 bg-emerald-400/[0.08] p-8 text-center">
        <span className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-400 text-black">
          <Check size={24} strokeWidth={2.5} />
        </span>
        <h3 className="text-xl font-medium text-white">{labels.successTitle}</h3>
        <p className="mt-2 text-sm leading-relaxed text-white/70">{labels.successText}</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-sm text-white/70">{labels.name} *</span>
          <input
            className={INPUT}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={labels.namePlaceholder}
          />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm text-white/70">{labels.contact} *</span>
          <input
            className={INPUT}
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            placeholder={labels.contactPlaceholder}
          />
        </label>
      </div>

      <label className="block">
        <span className="mb-2 block text-sm text-white/70">{labels.email} *</span>
        <input
          className={INPUT}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={labels.emailPlaceholder}
        />
      </label>

      {labels.fields.map((f) => (
        <label key={f.name} className="block">
          <span className="mb-2 block text-sm text-white/70">
            {f.label}
            {f.required && ' *'}
          </span>
          {f.type === 'textarea' ? (
            <textarea
              rows={3}
              className={`${INPUT} resize-y`}
              value={values[f.name] ?? ''}
              onChange={(e) => set(f.name, e.target.value)}
              placeholder={f.hint ?? ''}
            />
          ) : (
            <input
              className={INPUT}
              value={values[f.name] ?? ''}
              onChange={(e) => set(f.name, e.target.value)}
              placeholder={f.hint ?? ''}
            />
          )}
        </label>
      ))}

      {error && (
        <p className="rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          {labels.error}
        </p>
      )}

      <div className="flex flex-col items-start gap-3 pt-2">
        <LiquidButton
          size="lg"
          type="submit"
          disabled={!valid || sending}
          className={`rounded-full text-white ${!valid || sending ? 'opacity-50' : ''}`}
        >
          {sending ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              {labels.sending}
            </>
          ) : (
            labels.submit
          )}
        </LiquidButton>
        <p className="text-sm text-white/50">{labels.underButton}</p>
        <p className="text-xs leading-relaxed text-white/35">
          {labels.consent.before}
          <a
            href={labels.privacyHref}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/55 underline underline-offset-2 transition-colors hover:text-white"
          >
            {labels.consent.privacy}
          </a>
          {labels.consent.middle}
          <a
            href={labels.termsHref}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/55 underline underline-offset-2 transition-colors hover:text-white"
          >
            {labels.consent.terms}
          </a>
          {labels.consent.after}
        </p>
      </div>
    </form>
  )
}
