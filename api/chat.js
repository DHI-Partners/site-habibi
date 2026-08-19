// Vercel serverless function: ИИ-консультант сайта.
// Принимает историю диалога, отдаёт ответ модели потоком (SSE).
//
// Требуется переменная окружения (Vercel → Settings → Environment Variables):
//   ANTHROPIC_API_KEY — ключ из console.anthropic.com
//
// Локально: `npx vercel dev`. Обычный `npm run dev` поднимает только Vite,
// который не обслуживает /api/* — запрос уйдёт в SPA-fallback и вернёт HTML.

import Anthropic from '@anthropic-ai/sdk'
import { KB, SYSTEM_RULES, MODULE_TITLES } from './_kb.js'

export const config = { maxDuration: 60 }

const MODEL = 'claude-sonnet-5'
const MAX_TOKENS = 2048
const EFFORT = 'low'

// Лимиты запроса. Эндпоинт публичный, каждый вызов стоит денег.
const MAX_MESSAGE_CHARS = 1000
const MAX_HISTORY_MESSAGES = 24
const MAX_HISTORY_CHARS = 12000
const MAX_BODY_BYTES = 20 * 1024

// Частота с одного IP.
const RATE_PER_MINUTE = 12
const RATE_PER_HOUR = 60

const LANGS = { ru: 'русский', en: 'английский', ar: 'арабский' }

const ALLOWED_HOSTS = [
  'habibi-erp.com',
  'www.habibi-erp.com',
  'site-habibi.vercel.app',
]

/** Ленивая инициализация: клиент переиспользуется тёплыми вызовами. */
let client

/** ip → массив меток времени. Живёт в памяти инстанса, сбрасывается на холодном старте. */
const hits = new Map()

function clientIp(req) {
  const raw =
    req.headers['x-vercel-forwarded-for'] ||
    req.headers['x-forwarded-for'] ||
    req.headers['x-real-ip'] ||
    ''
  return String(raw).split(',')[0].trim() || 'unknown'
}

/** @returns {null | { retryAfter: number }} */
function rateLimit(ip) {
  const now = Date.now()
  const hour = 60 * 60 * 1000

  // Подчищаем «протухшие» записи, чтобы Map не рос бесконечно.
  if (hits.size > 5000) {
    for (const [key, times] of hits) {
      if (!times.length || now - times[times.length - 1] > hour) hits.delete(key)
    }
  }

  const times = (hits.get(ip) || []).filter((t) => now - t < hour)
  const lastMinute = times.filter((t) => now - t < 60_000)

  if (lastMinute.length >= RATE_PER_MINUTE) {
    hits.set(ip, times)
    return { retryAfter: 60 }
  }
  if (times.length >= RATE_PER_HOUR) {
    hits.set(ip, times)
    return { retryAfter: 600 }
  }

  times.push(now)
  hits.set(ip, times)
  return null
}

function originAllowed(req) {
  const origin = req.headers.origin
  if (!origin) return true // прямой вызов без Origin (curl, health-check) — пропускаем
  let host
  try {
    host = new URL(origin).hostname
  } catch {
    return false
  }
  if (host === 'localhost' || host === '127.0.0.1') return true
  if (host.endsWith('.vercel.app')) return true
  return ALLOWED_HOSTS.includes(host)
}

/**
 * Валидация тела запроса.
 * @returns {{ error: string } | { lang: string, moduleSlug: string|null, messages: Array }}
 */
function validate(body) {
  if (!body || typeof body !== 'object') return { error: 'bad_request' }

  const lang = body.lang
  if (!LANGS[lang]) return { error: 'bad_lang' }

  // Модуль принимаем ТОЛЬКО как известный slug: свободный текст с клиента,
  // попадающий в системный блок, — это вектор prompt-инъекции.
  const slug = body.module
  const moduleSlug = slug && MODULE_TITLES[lang][slug] ? slug : null

  // Тип страницы — тоже строгий список, а не свободный текст с клиента.
  const page = body.page === 'partner' ? 'partner' : null

  const messages = body.messages
  if (!Array.isArray(messages) || messages.length === 0) return { error: 'bad_messages' }
  if (messages.length > MAX_HISTORY_MESSAGES) return { error: 'history_too_long' }

  let total = 0
  for (const m of messages) {
    if (!m || (m.role !== 'user' && m.role !== 'assistant')) return { error: 'bad_messages' }
    if (typeof m.content !== 'string' || !m.content.trim()) return { error: 'bad_messages' }
    if (m.content.length > MAX_MESSAGE_CHARS) return { error: 'message_too_long' }
    total += m.content.length
  }
  if (total > MAX_HISTORY_CHARS) return { error: 'history_too_long' }
  if (messages[0].role !== 'user') return { error: 'bad_messages' }

  return {
    lang,
    moduleSlug,
    page,
    messages: messages.map((m) => ({ role: m.role, content: m.content })),
  }
}

/**
 * Меняющаяся от запроса к запросу часть системного промпта.
 * Идёт ОТДЕЛЬНЫМ блоком после брейкпоинта кеша — иначе кеш промахивается
 * на каждом запросе и стоимость вырастает в разы.
 */
function pageContext(lang, moduleSlug, page) {
  const currency = lang === 'ar' ? 'долларах США' : 'евро'
  let where = ''
  if (page === 'partner') {
    where =
      ' Посетитель открыл страницу партнёрской программы — скорее всего это будущий партнёр, а не покупатель. Веди разговор по правилам для будущего партнёра.'
  } else if (moduleSlug) {
    where = ` Посетитель открыл страницу модуля «${MODULE_TITLES[lang][moduleSlug]}» — учитывай это, если вопрос без явного контекста.`
  }
  return `Язык страницы: ${LANGS[lang]}. Цены этому посетителю называй в ${currency}.${where}`
}

function sse(res, event, data) {
  res.write(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`)
}

/** Маркер, которым модель помечает уместность перехода к менеджеру. Посетителю не показывается. */
const CONTACT_MARKER = '[[contact]]'

/**
 * Чистит поток от маркера и Markdown-звёздочек, не ломая потоковую выдачу.
 *
 * Маркер и `**` могут прийти разорванными между соседними чанками, поэтому
 * хвост длиной с маркер придерживается до следующего чанка: к моменту, когда
 * текст уходит клиенту, любая такая последовательность уже собрана целиком.
 */
function createTextFilter(onText, onContact) {
  // Придерживаем с запасом: маркер идёт отдельной строкой, и переводы строки
  // перед ним должны остаться в буфере, иначе уйдут клиенту пустой строкой.
  const HOLD = CONTACT_MARKER.length + 8
  let pending = ''
  let contactSeen = false

  const clean = () => {
    let i
    while ((i = pending.indexOf(CONTACT_MARKER)) !== -1) {
      pending = pending.slice(0, i) + pending.slice(i + CONTACT_MARKER.length)
      if (!contactSeen) {
        contactSeen = true
        onContact()
      }
    }
    // Подстраховка к правилу в промпте: модель изредка всё же выделяет
    // названия тарифов, а панель показывает разметку буквально.
    pending = pending.replace(/\*\*/g, '')
  }

  return {
    push(chunk) {
      pending += chunk
      clean()
      const keep = Math.min(pending.length, HOLD)
      const out = pending.slice(0, pending.length - keep)
      pending = pending.slice(pending.length - keep)
      if (out) onText(out)
    },
    end() {
      clean()
      const out = pending.replace(/\s+$/, '')
      pending = ''
      if (out) onText(out)
    },
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ ok: false, error: 'method_not_allowed' })
    return
  }
  if (!process.env.ANTHROPIC_API_KEY) {
    res.status(500).json({ ok: false, error: 'not_configured' })
    return
  }
  if (!originAllowed(req)) {
    res.status(403).json({ ok: false, error: 'forbidden_origin' })
    return
  }

  let body = req.body
  if (typeof body === 'string') {
    if (Buffer.byteLength(body, 'utf8') > MAX_BODY_BYTES) {
      res.status(413).json({ ok: false, error: 'payload_too_large' })
      return
    }
    try {
      body = JSON.parse(body)
    } catch {
      body = null
    }
  }

  const limited = rateLimit(clientIp(req))
  if (limited) {
    res.setHeader('Retry-After', String(limited.retryAfter))
    res.status(429).json({ ok: false, error: 'rate_limited' })
    return
  }

  const parsed = validate(body)
  if (parsed.error) {
    res.status(400).json({ ok: false, error: parsed.error })
    return
  }
  const { lang, moduleSlug, page, messages } = parsed

  // Дальше отвечаем потоком: статус уже отправлен, поэтому все последующие
  // ошибки уходят внутрь потока событием `error`, а не HTTP-статусом.
  res.writeHead(200, {
    'Content-Type': 'text/event-stream; charset=utf-8',
    'Cache-Control': 'no-cache, no-transform',
    Connection: 'keep-alive',
    'X-Accel-Buffering': 'no',
  })
  res.flushHeaders?.()

  client ??= new Anthropic()

  const heartbeat = setInterval(() => res.write(': ping\n\n'), 15_000)
  const abort = new AbortController()
  // Посетитель закрыл вкладку — прекращаем генерацию, чтобы не платить за остаток.
  req.on('close', () => abort.abort())

  try {
    const stream = client.messages.stream(
      {
        model: MODEL,
        max_tokens: MAX_TOKENS,
        output_config: { effort: EFFORT },
        // thinking не указываем: на Sonnet 5 адаптивное мышление включено по умолчанию.
        system: [
          // Единственный брейкпоинт кеша. Выше него ничего меняющегося.
          {
            type: 'text',
            text: `${SYSTEM_RULES}\n\n${KB}`,
            cache_control: { type: 'ephemeral' },
          },
          { type: 'text', text: pageContext(lang, moduleSlug, page) },
        ],
        messages,
      },
      { signal: abort.signal },
    )

    const filter = createTextFilter(
      (text) => sse(res, 'delta', { text }),
      () => sse(res, 'contact', { suggested: true }),
    )

    for await (const event of stream) {
      if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
        filter.push(event.delta.text)
      }
    }
    filter.end()

    const final = await stream.finalMessage()
    if (final.stop_reason === 'refusal') sse(res, 'error', { code: 'refusal' })
    else sse(res, 'done', { stop: final.stop_reason })

    // Диагностика кеша: cache_read должен быть > 0 начиная со второго хода.
    console.log(
      '[chat]',
      JSON.stringify({
        lang,
        module: moduleSlug,
        page,
        turns: messages.length,
        cache_write: final.usage.cache_creation_input_tokens,
        cache_read: final.usage.cache_read_input_tokens,
        input: final.usage.input_tokens,
        output: final.usage.output_tokens,
      }),
    )
  } catch (err) {
    if (abort.signal.aborted) {
      // Клиент ушёл — писать в закрытый поток нечего.
      clearInterval(heartbeat)
      res.end()
      return
    }
    // APIConnectionError — подкласс APIError, поэтому проверяется раньше.
    const code =
      err instanceof Anthropic.RateLimitError
        ? 'upstream_rate_limited'
        : err instanceof Anthropic.APIConnectionError
          ? 'network'
          : err instanceof Anthropic.APIError
            ? 'upstream_error'
            : 'exception'
    console.error('[chat]', code, err?.status ?? '', err?.message ?? err)
    sse(res, 'error', { code })
  } finally {
    clearInterval(heartbeat)
    res.end()
  }
}
