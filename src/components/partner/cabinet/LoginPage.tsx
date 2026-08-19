import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Lock, Mail } from 'lucide-react'
import { getSupabase, supabaseConfigured } from '../../../lib/supabase'
import { card } from '../ui'
import { CabinetShell, Field, FormError, NotConfigured, SubmitButton, TextInput, usePageMeta } from './CabinetShell'
import { CABINET_PATHS, STRINGS, type CabinetLocale } from './i18n'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

type Mode = 'login' | 'forgot' | 'recovery'

export default function LoginPage({ locale = 'ru' }: { locale?: CabinetLocale }) {
  const t = STRINGS[locale].login
  const paths = CABINET_PATHS[locale]
  usePageMeta(t.pageTitle, locale)
  const navigate = useNavigate()

  const [mode, setMode] = useState<Mode>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')

  // Ссылка «сброс пароля» из письма приводит сюда с событием PASSWORD_RECOVERY.
  useEffect(() => {
    if (!supabaseConfigured()) return
    const { data: sub } = getSupabase().auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') setMode('recovery')
    })
    return () => sub.subscription.unsubscribe()
  }, [])

  if (!supabaseConfigured()) {
    return (
      <CabinetShell tag={t.tag} narrow locale={locale}>
        <NotConfigured locale={locale} />
      </CabinetShell>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (sending) return
    setSending(true)
    setError('')
    setNotice('')
    const supabase = getSupabase()
    try {
      if (mode === 'login') {
        if (!EMAIL_RE.test(email) || !password) return
        const { error: err } = await supabase.auth.signInWithPassword({ email, password })
        if (err) {
          setError(/confirm/i.test(err.message) ? t.errNotConfirmed : t.errBadCreds)
          return
        }
        navigate(paths.dashboard)
      } else if (mode === 'forgot') {
        if (!EMAIL_RE.test(email)) return
        const { error: err } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}${paths.login}`,
        })
        if (err) {
          setError(t.errResetFail)
          return
        }
        setNotice(t.resetSent)
      } else {
        if (password.length < 8) {
          setError(t.errShortPassword)
          return
        }
        const { error: err } = await supabase.auth.updateUser({ password })
        if (err) {
          setError(t.errUpdateFail)
          return
        }
        navigate(paths.dashboard)
      }
    } catch {
      setError(t.errGeneric)
    } finally {
      setSending(false)
    }
  }

  return (
    <CabinetShell tag={t.tag} narrow locale={locale}>
      <h1 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
        {mode === 'recovery' ? t.h1Recovery : t.h1Login}
      </h1>
      <p className="mt-3 text-sm leading-relaxed text-white/60">
        {mode === 'recovery' ? t.leadRecovery : t.leadLogin}
      </p>

      <form onSubmit={handleSubmit} className={card('plain', 'mt-8')}>
        {mode !== 'recovery' && (
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
        )}

        {mode !== 'forgot' && (
          <Field label={mode === 'recovery' ? t.newPassword : t.password} required>
            <TextInput
              icon={<Lock size={16} />}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete={mode === 'recovery' ? 'new-password' : 'current-password'}
            />
          </Field>
        )}

        <SubmitButton
          disabled={
            sending ||
            (mode === 'login' && (!EMAIL_RE.test(email) || !password)) ||
            (mode === 'forgot' && !EMAIL_RE.test(email)) ||
            (mode === 'recovery' && password.length < 8)
          }
        >
          {sending
            ? t.submitting
            : mode === 'login'
              ? t.submitLogin
              : mode === 'forgot'
                ? t.submitForgot
                : t.submitRecovery}
        </SubmitButton>
        <FormError>{error}</FormError>
        {notice && <p className="mt-3 text-center text-xs text-emerald-300">{notice}</p>}
      </form>

      {mode === 'login' && (
        <button
          type="button"
          onClick={() => setMode('forgot')}
          className="mx-auto mt-5 block text-center text-sm text-white/50 transition-colors hover:text-white"
        >
          {t.forgot}
        </button>
      )}
      {mode === 'forgot' && (
        <button
          type="button"
          onClick={() => setMode('login')}
          className="mx-auto mt-5 block text-center text-sm text-white/50 transition-colors hover:text-white"
        >
          {t.backToLogin}
        </button>
      )}

      <p className="mt-6 text-center text-sm text-white/50">
        {t.noAccount}{' '}
        <Link to={paths.register} className="text-white underline-offset-4 hover:underline">
          {t.becomePartner}
        </Link>
      </p>
    </CabinetShell>
  )
}
