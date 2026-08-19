import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight, AtSign, Link2, Lock, Mail, MessageCircle, Send, User } from 'lucide-react'
import { getSupabase, supabaseConfigured } from '../../../lib/supabase'
import { card } from '../ui'
import { CabinetShell, Field, FormError, NotConfigured, SubmitButton, TextInput, usePageMeta } from './CabinetShell'
import { CABINET_PATHS, STRINGS, type CabinetLocale } from './i18n'
import { SLUG_RE, refLink, suggestSlug } from './lib'
import { useAuth } from './useAuth'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

type Channel = '' | 'whatsapp' | 'telegram'

export default function RegisterPage({ locale = 'ru' }: { locale?: CabinetLocale }) {
  const t = STRINGS[locale].register
  const paths = CABINET_PATHS[locale]
  usePageMeta(t.pageTitle, locale)
  const navigate = useNavigate()
  const { session, loading } = useAuth()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [slug, setSlug] = useState('')
  const [slugTouched, setSlugTouched] = useState(false)
  const [channel, setChannel] = useState<Channel>('')
  const [contact, setContact] = useState('')
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')
  const [needsConfirm, setNeedsConfirm] = useState(false)

  // Уже вошёл — в кабинет (после успешной регистрации редиректит этот же эффект).
  useEffect(() => {
    if (!loading && session && !sending && !needsConfirm) navigate(paths.dashboard)
  }, [loading, session, sending, needsConfirm, navigate, paths.dashboard])

  if (!supabaseConfigured()) {
    return (
      <CabinetShell tag={t.tag} narrow locale={locale}>
        <NotConfigured locale={locale} />
      </CabinetShell>
    )
  }

  const autoSlug = slugTouched ? slug : suggestSlug(name)
  const valid =
    name.trim().length > 1 &&
    EMAIL_RE.test(email) &&
    password.length >= 8 &&
    SLUG_RE.test(autoSlug)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!valid || sending) return
    setSending(true)
    setError('')
    const finalSlug = autoSlug
    const supabase = getSupabase()
    try {
      // 1. Свободен ли slug (иначе аккаунт создастся, а ссылка — нет).
      const { data: taken, error: rpcError } = await supabase.rpc('slug_taken', {
        p_slug: finalSlug,
      })
      if (rpcError) throw rpcError
      if (taken) {
        setError(t.errSlugTaken)
        return
      }

      // 2. Аккаунт.
      const { data, error: signUpError } = await supabase.auth.signUp({ email, password })
      if (signUpError) {
        setError(/already registered/i.test(signUpError.message) ? t.errEmailExists : t.errSignUp)
        return
      }

      // Если в Supabase включено подтверждение почты, сессии ещё нет.
      if (!data.session) {
        setNeedsConfirm(true)
        return
      }

      // 3. Строка партнёра с персональной ссылкой.
      const { error: insertError } = await supabase.from('partners').insert({
        user_id: data.session.user.id,
        slug: finalSlug,
        name: name.trim(),
        contact_channel: channel,
        contact_value: contact.trim(),
      })
      if (insertError) {
        // Гонка за slug: аккаунт уже есть, дадим дозаполнить профиль в кабинете.
        navigate(paths.dashboard)
        return
      }

      navigate(paths.dashboard)
    } catch {
      setError(t.errGeneric)
    } finally {
      setSending(false)
    }
  }

  return (
    <CabinetShell tag={t.tag} narrow locale={locale}>
      <h1 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">{t.h1}</h1>
      <p className="mt-3 text-sm leading-relaxed text-white/60">{t.lead}</p>

      {needsConfirm ? (
        <div className={card('emerald', 'mt-8')}>
          <h2 className="text-lg font-medium text-white">{t.confirmTitle}</h2>
          <p className="mt-2 text-sm leading-relaxed text-white/60">{t.confirmText(email)}</p>
          <Link
            to={paths.login}
            className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:border-white/50"
          >
            {t.confirmLogin}
            <ArrowRight size={15} />
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className={card('plain', 'mt-8')}>
          <Field label={t.name} required>
            <TextInput
              icon={<User size={16} />}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t.namePlaceholder}
              autoComplete="name"
            />
          </Field>

          <Field label={t.email} required>
            <TextInput
              icon={<Mail size={16} />}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              autoComplete="email"
            />
          </Field>

          <Field label={t.password} required hint={t.passwordHint}>
            <TextInput
              icon={<Lock size={16} />}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete="new-password"
            />
          </Field>

          <Field
            label={t.slug}
            required
            hint={SLUG_RE.test(autoSlug) ? `${t.slugYourLink} ${refLink(autoSlug)}` : t.slugRules}
          >
            <TextInput
              icon={<Link2 size={16} />}
              value={autoSlug}
              onChange={(e) => {
                setSlugTouched(true)
                setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))
              }}
              placeholder="yourname"
              autoComplete="off"
            />
          </Field>

          <Field label={t.contact} hint={t.contactHint}>
            <div className="grid grid-cols-2 gap-2">
              <ChannelToggle
                active={channel === 'whatsapp'}
                onClick={() => setChannel(channel === 'whatsapp' ? '' : 'whatsapp')}
                icon={<MessageCircle size={15} />}
                label="WhatsApp"
                accent="#22c55e"
              />
              <ChannelToggle
                active={channel === 'telegram'}
                onClick={() => setChannel(channel === 'telegram' ? '' : 'telegram')}
                icon={<Send size={15} />}
                label="Telegram"
                accent="#3b82f6"
              />
            </div>
            {channel && (
              <div className="mt-2">
                <TextInput
                  icon={<AtSign size={16} />}
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder={channel === 'telegram' ? t.telegramPlaceholder : t.whatsappPlaceholder}
                />
              </div>
            )}
          </Field>

          <SubmitButton disabled={!valid || sending}>
            {sending ? t.submitting : t.submit}
          </SubmitButton>
          <FormError>{error}</FormError>
          <p className="mt-3 text-center text-xs text-white/35">{t.consent}</p>
        </form>
      )}

      <p className="mt-6 text-center text-sm text-white/50">
        {t.haveAccount}{' '}
        <Link to={paths.login} className="text-white underline-offset-4 hover:underline">
          {t.signIn}
        </Link>
      </p>
    </CabinetShell>
  )
}

function ChannelToggle({
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
      style={active ? { borderColor: accent, boxShadow: `0 0 20px ${accent}33` } : undefined}
    >
      <span style={{ color: active ? accent : undefined }}>{icon}</span>
      {label}
    </button>
  )
}
