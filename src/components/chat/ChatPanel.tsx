import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Mic, MessageCircle, RotateCcw, Send, Sparkles, Square, X } from 'lucide-react'
import { useChat } from '../../hooks/useChat'
import { useSpeechInput } from '../../hooks/useSpeechInput'
import { MESSAGE_LIMIT, type ChatErrorCode, type ChatLang, type ChatPage } from '../../lib/chat'

export interface ChatLabels {
  title: string
  subtitle: string
  greeting: string
  suggestions: string[]
  placeholder: string
  sendLabel: string
  closeLabel: string
  resetLabel: string
  contactCta: string
  whatsappLabel: string
  disclaimer: string
  errors: Record<ChatErrorCode, string>
  retryLabel: string
  micLabel: string
  micStopLabel: string
  micListening: string
  micDenied: string
  micFailed: string
  micHint: string
  micDone: string
  micCancel: string
}

export interface ChatPanelProps {
  lang: ChatLang
  labels: ChatLabels
  side: 'right' | 'left'
  dir: 'ltr' | 'rtl'
  /** 'font-geist' для ru/en, 'font-arabic' для арабской версии. */
  fontClass: string
  whatsappUrl: string
  moduleSlug?: string
  page?: ChatPage
  /** Вопрос из поля на первом экране — отправляется сразу при открытии. */
  initialQuestion?: string | null
  onQuestionSent?: () => void
  onClose: () => void
  /** Открывает существующую форму заявки сайта. */
  onRequestContact: () => void
}

export default function ChatPanel({
  lang,
  labels,
  side,
  dir,
  fontClass,
  whatsappUrl,
  moduleSlug,
  page,
  initialQuestion,
  onQuestionSent,
  onClose,
  onRequestContact,
}: ChatPanelProps) {
  const { messages, status, errorCode, contactSuggested, send, retry, reset, canSend } = useChat({
    lang,
    moduleSlug,
    page,
  })
  const [draft, setDraft] = useState('')

  // Диктовка: распознанные куски дописываются в поле, отправляет человек сам.
  const speech = useSpeechInput({
    lang,
    onFinal: (text) => setDraft((d) => (d ? `${d.replace(/\s+$/, '')} ${text}` : text).slice(0, MESSAGE_LIMIT)),
  })

  // Что было в поле до диктовки — чтобы «Отменить» вернуло как было.
  const draftBeforeMic = useRef('')

  const startMic = () => {
    draftBeforeMic.current = draft
    speech.toggle()
  }
  const finishMic = () => speech.stop()
  const cancelMic = () => {
    speech.stop()
    setDraft(draftBeforeMic.current)
  }

  const listRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const stickToBottom = useRef(true)

  // Закрытие по Esc — как в остальных модалках проекта.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  // Блокируем прокрутку страницы только на мобильном, где панель занимает весь экран.
  useEffect(() => {
    if (!window.matchMedia('(max-width: 639px)').matches) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [])

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  // Вопрос, заданный на первом экране, уходит сразу — человек уже нажал «отправить».
  const sentInitial = useRef(false)
  useEffect(() => {
    if (!initialQuestion || sentInitial.current) return
    sentInitial.current = true
    stickToBottom.current = true
    send(initialQuestion)
    onQuestionSent?.()
  }, [initialQuestion, send, onQuestionSent])

  // «Залипающий» автоскролл: тянем вниз только если пользователь и так был внизу,
  // иначе человека, отлиставшего вверх почитать, дёргало бы на каждом токене.
  useLayoutEffect(() => {
    const el = listRef.current
    if (el && stickToBottom.current) el.scrollTop = el.scrollHeight
  }, [messages, status])

  const onScroll = () => {
    const el = listRef.current
    if (el) stickToBottom.current = el.scrollHeight - el.scrollTop - el.clientHeight < 80
  }

  const submit = () => {
    if (!canSend || !draft.trim()) return
    speech.stop()
    stickToBottom.current = true
    send(draft)
    setDraft('')
  }

  const ask = (text: string) => {
    if (!canSend) return
    stickToBottom.current = true
    send(text)
  }

  const last = messages[messages.length - 1]
  const awaitingFirstToken = status === 'streaming' && last?.role === 'assistant' && !last.content
  const isEmpty = messages.length === 0
  const corner = side === 'right' ? 'sm:right-6' : 'sm:left-6'

  return (
    <div
      dir={dir}
      role="dialog"
      aria-modal="false"
      aria-label={labels.title}
      className={`fixed inset-0 z-[45] flex h-[100dvh] flex-col overflow-hidden border-white/15 bg-[#0a0a0a]/95 text-white shadow-[0_20px_60px_rgba(0,0,0,0.6)] backdrop-blur-xl [animation:fadeSlideUp_0.25s_ease_both] sm:inset-auto sm:bottom-[104px] sm:h-[min(560px,70vh)] sm:w-[380px] sm:rounded-3xl sm:border ${corner} ${fontClass}`}
    >
      {/* Шапка */}
      <div className="flex shrink-0 items-center gap-3 border-b border-white/10 px-4 py-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10">
          <Sparkles size={17} strokeWidth={2} className="text-emerald-300" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="truncate text-sm font-semibold">{labels.title}</div>
          <div className="truncate text-xs text-white/45">{labels.subtitle}</div>
        </div>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={labels.whatsappLabel}
          title={labels.whatsappLabel}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white/50 transition-colors hover:bg-white/10 hover:text-[#22c55e]"
        >
          <MessageCircle size={17} strokeWidth={2} />
        </a>
        {!isEmpty && (
          <button
            type="button"
            onClick={reset}
            aria-label={labels.resetLabel}
            title={labels.resetLabel}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white/50 transition-colors hover:bg-white/10 hover:text-white"
          >
            <RotateCcw size={16} strokeWidth={2} />
          </button>
        )}
        <button
          type="button"
          onClick={onClose}
          aria-label={labels.closeLabel}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white/50 transition-colors hover:bg-white/10 hover:text-white"
        >
          <X size={18} strokeWidth={2} />
        </button>
      </div>

      {/* Лента сообщений */}
      <div ref={listRef} onScroll={onScroll} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
        {/* Приветствие живёт только на клиенте: историю, начинающуюся с ассистента, API отклонит */}
        <Bubble role="assistant">{labels.greeting}</Bubble>

        {isEmpty && (
          <div className="flex flex-wrap gap-2 pt-1">
            {labels.suggestions.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => ask(s)}
                className="rounded-full border border-white/15 bg-white/[0.04] px-3 py-1.5 text-xs text-white/75 transition-colors hover:bg-white/10 hover:text-white"
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {messages.map((m, i) =>
          m.role === 'assistant' && !m.content ? null : (
            <Bubble key={i} role={m.role}>
              {m.content}
            </Bubble>
          ),
        )}

        {awaitingFirstToken && <Typing />}

        {errorCode && (
          <div className="rounded-2xl border border-amber-400/25 bg-amber-400/10 px-3.5 py-2.5 text-xs leading-relaxed text-amber-200">
            {labels.errors[errorCode] ?? labels.errors.unknown}
            <button
              type="button"
              onClick={retry}
              className="ms-2 whitespace-nowrap font-semibold text-amber-100 underline underline-offset-2 hover:text-white"
            >
              {labels.retryLabel}
            </button>
          </div>
        )}
      </div>

      {/* Передача менеджеру — только когда агент сам счёл переход уместным */}
      {contactSuggested && status !== 'streaming' && (
        <div className="shrink-0 px-4 pb-1">
          <button
            type="button"
            onClick={onRequestContact}
            className="w-full rounded-xl border border-white/15 bg-white/[0.06] py-2 text-xs font-medium text-white/80 transition-colors hover:bg-white/12 hover:text-white"
          >
            {labels.contactCta}
          </button>
        </div>
      )}

      {/* Диктовка во весь экран: в узком поле ввода надиктованное не проверить */}
      {speech.listening && (
        <DictationView
          text={`${draft}${draft && speech.interim ? ' ' : ''}${speech.interim}`}
          labels={labels}
          onDone={finishMic}
          onCancel={cancelMic}
        />
      )}

      {/* Ввод */}
      <div className="shrink-0 border-t border-white/10 px-3 pb-3 pt-3">
        <div className="flex items-end gap-2 rounded-2xl border border-white/15 bg-white/[0.04] px-3 py-2">
          <textarea
            ref={inputRef}
            rows={1}
            // Пока человек говорит, показываем ещё не финальный текст —
            // видно, что микрофон слышит, но в draft он попадёт только готовым.
            value={speech.listening && speech.interim ? `${draft} ${speech.interim}`.trim() : draft}
            maxLength={MESSAGE_LIMIT}
            onChange={(e) => {
              setDraft(e.target.value)
              e.target.style.height = 'auto'
              e.target.style.height = `${Math.min(e.target.scrollHeight, 96)}px`
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                submit()
              }
            }}
            placeholder={speech.listening ? labels.micListening : labels.placeholder}
            className="max-h-24 flex-1 resize-none bg-transparent text-sm text-white outline-none placeholder:text-white/35"
          />

          {/* Кнопки микрофона нет там, где браузер не умеет распознавать речь */}
          {speech.supported && (
            <button
              type="button"
              onClick={speech.listening ? finishMic : startMic}
              aria-label={speech.listening ? labels.micStopLabel : labels.micLabel}
              aria-pressed={speech.listening}
              title={speech.listening ? labels.micStopLabel : labels.micLabel}
              className={`relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors ${
                speech.listening
                  ? 'bg-red-500 text-white'
                  : 'text-white/50 hover:bg-white/10 hover:text-white'
              }`}
            >
              {speech.listening && (
                <span className="absolute inset-0 animate-ping rounded-full bg-red-500/40" />
              )}
              {speech.listening ? (
                <Square size={13} strokeWidth={2.5} fill="currentColor" />
              ) : (
                <Mic size={16} strokeWidth={2} />
              )}
            </button>
          )}

          <button
            type="button"
            onClick={submit}
            disabled={!canSend || !draft.trim()}
            aria-label={labels.sendLabel}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-black transition-opacity disabled:cursor-not-allowed disabled:bg-white/15 disabled:text-white/40"
          >
            <Send size={15} strokeWidth={2.2} className={dir === 'rtl' ? 'rotate-180' : ''} />
          </button>
        </div>
        <p className="px-1 pt-2 text-[11px] leading-snug text-white/30">
          {speech.error === 'denied'
            ? labels.micDenied
            : speech.error === 'failed'
              ? labels.micFailed
              : labels.disclaimer}
        </p>
      </div>
    </div>
  )
}

/**
 * Экран диктовки. Занимает всю панель, показывает надиктованное крупно —
 * в однострочном поле ввода проверить текст перед отправкой невозможно.
 */
function DictationView({
  text,
  labels,
  onDone,
  onCancel,
}: {
  text: string
  labels: ChatLabels
  onDone: () => void
  onCancel: () => void
}) {
  const boxRef = useRef<HTMLDivElement>(null)

  // Держим низ: текст растёт по мере того, как человек говорит.
  useLayoutEffect(() => {
    const el = boxRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [text])

  return (
    <div className="absolute inset-0 z-10 flex flex-col bg-[#0a0a0a]/98 backdrop-blur-xl [animation:fadeSlideUp_0.2s_ease_both]">
      <div className="flex shrink-0 items-center gap-3 px-5 pt-5">
        <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-red-500 text-white">
          <span className="absolute inset-0 animate-ping rounded-full bg-red-500/40" />
          <Mic size={18} strokeWidth={2.2} />
        </span>
        <div className="text-sm font-semibold text-white">{labels.micListening}</div>
      </div>

      <div ref={boxRef} className="flex-1 overflow-y-auto px-5 py-5">
        {text ? (
          <p className="whitespace-pre-wrap break-words text-xl leading-relaxed text-white">
            {text}
          </p>
        ) : (
          <p className="text-base leading-relaxed text-white/35">{labels.micHint}</p>
        )}
      </div>

      <div className="flex shrink-0 gap-2 border-t border-white/10 px-4 py-4">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 rounded-xl border border-white/15 py-3 text-sm font-medium text-white/70 transition-colors hover:bg-white/10 hover:text-white"
        >
          {labels.micCancel}
        </button>
        <button
          type="button"
          onClick={onDone}
          className="flex-[2] rounded-xl bg-white py-3 text-sm font-semibold text-black transition-transform hover:scale-[1.02] active:scale-95"
        >
          {labels.micDone}
        </button>
      </div>
    </div>
  )
}

/** Пузырь сообщения. Только простой текст — содержимое приходит из публичного источника. */
function Bubble({ role, children }: { role: 'user' | 'assistant'; children: string }) {
  const mine = role === 'user'
  return (
    <div className={`flex ${mine ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[85%] whitespace-pre-wrap break-words rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
          mine
            ? 'bg-white text-black'
            : 'border border-white/10 bg-white/[0.06] text-white/90'
        }`}
      >
        {children}
      </div>
    </div>
  )
}

/**
 * Индикатор набора. Нужен обязательно: у модели включено адаптивное мышление,
 * поэтому между отправкой и первым словом проходит несколько секунд тишины.
 */
function Typing() {
  return (
    <div className="flex justify-start">
      <div className="flex items-center gap-1.5 rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3">
        {[0, 150, 300].map((delay) => (
          <span
            key={delay}
            className="h-1.5 w-1.5 animate-bounce rounded-full bg-white/50"
            style={{ animationDelay: `${delay}ms` }}
          />
        ))}
      </div>
    </div>
  )
}
