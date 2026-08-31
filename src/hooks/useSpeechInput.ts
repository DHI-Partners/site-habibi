import { useCallback, useEffect, useRef, useState } from 'react'
import type { ChatLang } from '../lib/chat'

/**
 * Диктовка через встроенное в браузер распознавание речи.
 *
 * Claude не принимает аудио — только текст, поэтому речь превращается в текст
 * на стороне браузера, и никакой сторонний сервис в цепочке не появляется.
 * Работает в Chrome, Edge и Safari (включая iOS); в Firefox API отсутствует,
 * и кнопка микрофона просто не показывается.
 */

/** Минимальные типы: в lib.dom этого API ещё нет. */
interface SpeechRecognitionAlternative {
  transcript: string
}
interface SpeechRecognitionResult {
  isFinal: boolean
  0: SpeechRecognitionAlternative
}
interface SpeechRecognitionEventLike extends Event {
  resultIndex: number
  results: { length: number; [i: number]: SpeechRecognitionResult }
}
interface SpeechRecognitionErrorEventLike extends Event {
  error: string
}
interface SpeechRecognitionLike extends EventTarget {
  lang: string
  continuous: boolean
  interimResults: boolean
  start: () => void
  stop: () => void
  abort: () => void
  onresult: ((e: SpeechRecognitionEventLike) => void) | null
  onerror: ((e: SpeechRecognitionErrorEventLike) => void) | null
  onend: (() => void) | null
}
type SpeechRecognitionCtor = new () => SpeechRecognitionLike

/** Код диктовки на язык распознавания. */
const RECOGNITION_LANG: Record<ChatLang, string> = {
  ru: 'ru-RU',
  en: 'en-US',
  ar: 'ar-SA',
  uz: 'uz-UZ',
}

/** Страховка от бесконечной записи, если посетитель забыл выключить микрофон. */
const MAX_LISTENING_MS = 60_000

function getCtor(): SpeechRecognitionCtor | null {
  if (typeof window === 'undefined') return null
  const w = window as unknown as {
    SpeechRecognition?: SpeechRecognitionCtor
    webkitSpeechRecognition?: SpeechRecognitionCtor
  }
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null
}

export type SpeechError = 'denied' | 'failed'

export interface UseSpeechInputOptions {
  lang: ChatLang
  /** Готовый кусок распознанного текста — дописывается в поле ввода. */
  onFinal: (text: string) => void
}

export interface UseSpeechInputResult {
  /** API есть в этом браузере — только тогда показываем кнопку микрофона. */
  supported: boolean
  listening: boolean
  /** Ещё не финальный текст: показываем в поле, пока человек говорит. */
  interim: string
  error: SpeechError | null
  toggle: () => void
  stop: () => void
}

export function useSpeechInput({ lang, onFinal }: UseSpeechInputOptions): UseSpeechInputResult {
  const [supported] = useState(() => getCtor() !== null)
  const [listening, setListening] = useState(false)
  const [interim, setInterim] = useState('')
  const [error, setError] = useState<SpeechError | null>(null)

  const recRef = useRef<SpeechRecognitionLike | null>(null)
  const timerRef = useRef<number | null>(null)
  // Держим колбэк в ref, чтобы пересоздание не рвало активное распознавание.
  const onFinalRef = useRef(onFinal)
  onFinalRef.current = onFinal

  const cleanup = useCallback(() => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current)
      timerRef.current = null
    }
    setListening(false)
    setInterim('')
  }, [])

  const stop = useCallback(() => {
    recRef.current?.stop()
    cleanup()
  }, [cleanup])

  // Микрофон не должен остаться включённым после закрытия панели.
  useEffect(
    () => () => {
      recRef.current?.abort()
      if (timerRef.current !== null) window.clearTimeout(timerRef.current)
    },
    [],
  )

  const start = useCallback(() => {
    const Ctor = getCtor()
    if (!Ctor) return

    setError(null)
    const rec = new Ctor()
    rec.lang = RECOGNITION_LANG[lang]
    rec.continuous = true
    rec.interimResults = true

    rec.onresult = (e) => {
      let pending = ''
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const result = e.results[i]
        const text = result[0].transcript
        if (result.isFinal) onFinalRef.current(text)
        else pending += text
      }
      setInterim(pending)
    }

    rec.onerror = (e) => {
      // Тишина — не ошибка: человек мог просто задуматься.
      if (e.error === 'no-speech' || e.error === 'aborted') return
      setError(e.error === 'not-allowed' || e.error === 'service-not-allowed' ? 'denied' : 'failed')
      cleanup()
    }

    rec.onend = () => cleanup()

    try {
      rec.start()
    } catch {
      setError('failed')
      return
    }

    recRef.current = rec
    setListening(true)
    timerRef.current = window.setTimeout(() => stop(), MAX_LISTENING_MS)
  }, [lang, cleanup, stop])

  const toggle = useCallback(() => {
    if (listening) stop()
    else start()
  }, [listening, start, stop])

  return { supported, listening, interim, error, toggle, stop }
}
