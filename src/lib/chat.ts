/**
 * Общая механика ИИ-чата: типы и разбор SSE-потока от /api/chat.
 * Слой нейтральный — без текстов и без привязки к языку.
 */

export type ChatRole = 'user' | 'assistant'

export interface ChatMessage {
  role: ChatRole
  content: string
}

export type ChatLang = 'ru' | 'en' | 'ar'

/** Коды ошибок, приходящие с сервера либо возникающие на клиенте. */
export type ChatErrorCode =
  | 'rate_limited'
  | 'message_too_long'
  | 'history_too_long'
  | 'upstream_rate_limited'
  | 'upstream_error'
  | 'network'
  | 'refusal'
  | 'unknown'

/** Максимум сообщений, отправляемых на сервер (там лимит 24). */
export const HISTORY_LIMIT = 20

/** Максимальная длина одного сообщения (совпадает с серверным лимитом). */
export const MESSAGE_LIMIT = 1000

const KNOWN_ERRORS: ChatErrorCode[] = [
  'rate_limited',
  'message_too_long',
  'history_too_long',
  'upstream_rate_limited',
  'upstream_error',
  'network',
  'refusal',
]

function toErrorCode(value: unknown): ChatErrorCode {
  return KNOWN_ERRORS.includes(value as ChatErrorCode) ? (value as ChatErrorCode) : 'unknown'
}

export interface StreamChatOptions {
  lang: ChatLang
  moduleSlug?: string
  messages: ChatMessage[]
  signal: AbortSignal
  /** Вызывается на каждый кусочек текста. */
  onDelta: (text: string) => void
  /** Модель сочла уместным переход к живому менеджеру. */
  onContact: () => void
}

/**
 * Отправляет диалог и разбирает ответ построчно.
 * Возвращает код ошибки либо null, если ответ получен целиком.
 *
 * EventSource здесь не годится: он умеет только GET, а нам нужен POST с телом.
 */
export async function streamChat({
  lang,
  moduleSlug,
  messages,
  signal,
  onDelta,
  onContact,
}: StreamChatOptions): Promise<ChatErrorCode | null> {
  let res: Response
  try {
    res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        lang,
        module: moduleSlug ?? null,
        messages: messages.slice(-HISTORY_LIMIT),
      }),
      signal,
    })
  } catch {
    return signal.aborted ? null : 'network'
  }

  if (!res.ok || !res.body) {
    if (res.status === 429) return 'rate_limited'
    const data = await res.json().catch(() => null)
    return toErrorCode(data?.error)
  }

  const reader = res.body.getReader()
  const decoder = new TextDecoder()
  let buffer = ''
  let failure: ChatErrorCode | null = null

  try {
    for (;;) {
      const { done, value } = await reader.read()
      if (done) break
      buffer += decoder.decode(value, { stream: true })

      let split: number
      while ((split = buffer.indexOf('\n\n')) !== -1) {
        const frame = buffer.slice(0, split)
        buffer = buffer.slice(split + 2)
        if (!frame || frame.startsWith(':')) continue // heartbeat

        const event = /^event: (.+)$/m.exec(frame)?.[1]
        const raw = /^data: (.+)$/m.exec(frame)?.[1]
        if (!event || !raw) continue

        let data: { text?: string; code?: string }
        try {
          data = JSON.parse(raw)
        } catch {
          continue
        }

        if (event === 'delta' && typeof data.text === 'string') onDelta(data.text)
        else if (event === 'contact') onContact()
        else if (event === 'error') failure = toErrorCode(data.code)
      }
    }
  } catch {
    if (signal.aborted) return null
    return 'network'
  }

  return failure
}
