import { useCallback, useEffect, useRef, useState } from 'react'
import {
  HISTORY_LIMIT,
  MESSAGE_LIMIT,
  streamChat,
  type ChatErrorCode,
  type ChatLang,
  type ChatMessage,
  type ChatPage,
} from '../lib/chat'

export type ChatStatus = 'idle' | 'streaming' | 'error'

export interface UseChatOptions {
  lang: ChatLang
  /** Slug модуля, если чат открыт на странице модуля. */
  moduleSlug?: string
  /** Тип страницы: на партнёрской у разговора другая цель. */
  page?: ChatPage
}

export interface UseChatResult {
  /** История без приветствия — оно рисуется отдельно и на сервер не уходит. */
  messages: ChatMessage[]
  status: ChatStatus
  errorCode: ChatErrorCode | null
  /** Модель предложила перейти к менеджеру — показываем кнопку связи. */
  contactSuggested: boolean
  send: (text: string) => void
  retry: () => void
  reset: () => void
  stop: () => void
  canSend: boolean
}

/**
 * Состояние диалога и работа с потоком ответа.
 * Диалог переживает переход между страницами через sessionStorage.
 */
export function useChat({ lang, moduleSlug, page }: UseChatOptions): UseChatResult {
  const storageKey = `habibi-chat-${lang}`

  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    if (typeof window === 'undefined') return []
    try {
      const saved = window.sessionStorage.getItem(storageKey)
      const parsed = saved ? JSON.parse(saved) : null
      return Array.isArray(parsed) ? (parsed as ChatMessage[]) : []
    } catch {
      return []
    }
  })
  const [status, setStatus] = useState<ChatStatus>('idle')
  const [errorCode, setErrorCode] = useState<ChatErrorCode | null>(null)
  const [contactSuggested, setContactSuggested] = useState(false)

  const abortRef = useRef<AbortController | null>(null)
  // Держим историю в ref, чтобы send() не пересоздавался на каждое сообщение.
  const messagesRef = useRef(messages)
  messagesRef.current = messages

  useEffect(() => {
    try {
      window.sessionStorage.setItem(storageKey, JSON.stringify(messages.slice(-HISTORY_LIMIT)))
    } catch {
      // приватный режим — переживём без сохранения
    }
  }, [messages, storageKey])

  // Обрываем запрос, если компонент размонтировали.
  useEffect(() => () => abortRef.current?.abort(), [])

  const run = useCallback(
    async (history: ChatMessage[]) => {
      abortRef.current?.abort()
      const controller = new AbortController()
      abortRef.current = controller

      setStatus('streaming')
      setErrorCode(null)
      // Сбрасываем на каждом ходу: кнопка относится к последнему ответу,
      // иначе один раз показавшись, она висела бы до конца разговора.
      setContactSuggested(false)
      // Пустой пузырь ассистента: в него будет литься текст, он же — индикатор набора.
      setMessages([...history, { role: 'assistant', content: '' }])

      const failure = await streamChat({
        lang,
        moduleSlug,
        page,
        messages: history,
        signal: controller.signal,
        onContact: () => setContactSuggested(true),
        onDelta: (text) => {
          setMessages((prev) => {
            const next = [...prev]
            const last = next[next.length - 1]
            if (last?.role === 'assistant') next[next.length - 1] = { ...last, content: last.content + text }
            return next
          })
        },
      })

      if (controller.signal.aborted) return

      if (failure) {
        setErrorCode(failure)
        setStatus('error')
        // Убираем пустой пузырь, если ответ так и не начался.
        setMessages((prev) => {
          const last = prev[prev.length - 1]
          return last?.role === 'assistant' && !last.content ? prev.slice(0, -1) : prev
        })
        return
      }

      setStatus('idle')
      // Пустой ответ без ошибки — тоже неудача, показываем её честно.
      setMessages((prev) => {
        const last = prev[prev.length - 1]
        if (last?.role === 'assistant' && !last.content.trim()) {
          setErrorCode('upstream_error')
          setStatus('error')
          return prev.slice(0, -1)
        }
        return prev
      })
    },
    [lang, moduleSlug, page],
  )

  const send = useCallback(
    (text: string) => {
      const trimmed = text.trim()
      if (!trimmed) return
      if (trimmed.length > MESSAGE_LIMIT) {
        setErrorCode('message_too_long')
        setStatus('error')
        return
      }
      const history = [...messagesRef.current, { role: 'user' as const, content: trimmed }]
      void run(history)
    },
    [run],
  )

  const retry = useCallback(() => {
    // Последнее сообщение пользователя уже в истории — просто повторяем запрос.
    const history = messagesRef.current
    if (history.length && history[history.length - 1].role === 'user') void run(history)
    else {
      setErrorCode(null)
      setStatus('idle')
    }
  }, [run])

  const stop = useCallback(() => {
    abortRef.current?.abort()
    setStatus('idle')
  }, [])

  const reset = useCallback(() => {
    abortRef.current?.abort()
    setMessages([])
    setErrorCode(null)
    setContactSuggested(false)
    setStatus('idle')
    try {
      window.sessionStorage.removeItem(storageKey)
    } catch {
      // ничего страшного
    }
  }, [storageKey])

  return {
    messages,
    status,
    errorCode,
    contactSuggested,
    send,
    retry,
    reset,
    stop,
    canSend: status !== 'streaming',
  }
}
