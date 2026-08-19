import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Lock, Mail } from 'lucide-react'
import { getSupabase, supabaseConfigured } from '../../../lib/supabase'
import { card } from '../ui'
import { CabinetShell, Field, FormError, NotConfigured, SubmitButton, TextInput, usePageMeta } from './CabinetShell'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

type Mode = 'login' | 'forgot' | 'recovery'

export default function LoginPage() {
  usePageMeta('Вход в партнёрский кабинет — Habibi')
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
      <CabinetShell tag="Вход" narrow>
        <NotConfigured />
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
          setError(
            /confirm/i.test(err.message)
              ? 'Email ещё не подтверждён — проверьте почту.'
              : 'Неверный email или пароль.',
          )
          return
        }
        navigate('/ru/partners/dashboard')
      } else if (mode === 'forgot') {
        if (!EMAIL_RE.test(email)) return
        const { error: err } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/ru/partners/login`,
        })
        if (err) {
          setError('Не удалось отправить письмо. Попробуйте ещё раз.')
          return
        }
        setNotice('Письмо со ссылкой для сброса пароля отправлено — проверьте почту.')
      } else {
        if (password.length < 8) {
          setError('Пароль должен быть не короче 8 символов.')
          return
        }
        const { error: err } = await supabase.auth.updateUser({ password })
        if (err) {
          setError('Не удалось сменить пароль. Запросите сброс ещё раз.')
          return
        }
        navigate('/ru/partners/dashboard')
      }
    } catch {
      setError('Что-то пошло не так. Попробуйте ещё раз.')
    } finally {
      setSending(false)
    }
  }

  return (
    <CabinetShell tag="Личный кабинет" narrow>
      <h1 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
        {mode === 'recovery' ? 'Новый пароль' : 'Вход в кабинет'}
      </h1>
      <p className="mt-3 text-sm leading-relaxed text-white/60">
        {mode === 'recovery'
          ? 'Придумайте новый пароль для входа в партнёрский кабинет.'
          : 'Статистика переходов, клиенты и доход — в твоём партнёрском кабинете.'}
      </p>

      <form onSubmit={handleSubmit} className={card('plain', 'mt-8')}>
        {mode !== 'recovery' && (
          <Field label="Email" required>
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
          <Field label={mode === 'recovery' ? 'Новый пароль' : 'Пароль'} required>
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
            ? 'Секунду…'
            : mode === 'login'
              ? 'Войти'
              : mode === 'forgot'
                ? 'Сбросить пароль'
                : 'Сохранить пароль'}
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
          Забыли пароль?
        </button>
      )}
      {mode === 'forgot' && (
        <button
          type="button"
          onClick={() => setMode('login')}
          className="mx-auto mt-5 block text-center text-sm text-white/50 transition-colors hover:text-white"
        >
          ← Назад ко входу
        </button>
      )}

      <p className="mt-6 text-center text-sm text-white/50">
        Ещё нет аккаунта?{' '}
        <Link to="/ru/partners/register" className="text-white underline-offset-4 hover:underline">
          Стать партнёром
        </Link>
      </p>
    </CabinetShell>
  )
}
