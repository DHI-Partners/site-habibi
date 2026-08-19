import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const SLUG_RE = /^[a-z0-9-]{3,30}$/

/**
 * /ref/<slug> — вход по партнёрской ссылке: запоминаем партнёра, фиксируем
 * переход и сразу показываем лендинг. Заявка с любой формы после этого будет
 * привязана к партнёру (см. ContactModal).
 */
export default function RefRedirect() {
  const { slug: raw } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const slug = (raw ?? '').toLowerCase()
    if (SLUG_RE.test(slug)) {
      let counted = false
      try {
        localStorage.setItem('habibi_ref', slug)
        // Один переход за сессию вкладки (и защита от двойного эффекта StrictMode).
        counted = sessionStorage.getItem('habibi_ref_counted') === slug
        sessionStorage.setItem('habibi_ref_counted', slug)
      } catch {
        /* приватный режим без storage — просто не атрибутируем */
      }
      if (!counted) {
        // Не ждём ответа: keepalive доносит запрос даже после навигации.
        fetch('/api/track', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          keepalive: true,
          body: JSON.stringify({ type: 'click', slug, referrer: document.referrer }),
        }).catch(() => {})
      }
    }
    navigate('/ru', { replace: true })
  }, [raw, navigate])

  return <div className="min-h-screen w-full bg-black" />
}
