import { Suspense, lazy, useEffect, useState } from 'react'
import ChatLauncher from './ChatLauncher'
import type { ChatLabels } from './ChatPanel'
import { subscribeAsk, type ChatLang, type ChatPage } from '../../lib/chat'
import { useOnFirstScreen } from '../../hooks/useOnFirstScreen'

// Панель подтягивается только при первом открытии — на лендинге эагерно
// грузится лишь кнопка, иначе просядет скорость первой отрисовки.
const ChatPanel = lazy(() => import('./ChatPanel'))

export type { ChatLabels }

export interface ChatWidgetProps {
  lang: ChatLang
  labels: ChatLabels
  side: 'right' | 'left'
  dir: 'ltr' | 'rtl'
  fontClass: string
  whatsappUrl: string
  openLabel: string
  moduleSlug?: string
  /** Тип страницы: на партнёрской у разговора другая цель. */
  page?: ChatPage
  /**
   * id секции, пока которая видна на экране кнопку показывать не нужно.
   * На первом экране есть своё поле вопроса, и две одинаковые точки входа
   * рядом только путают.
   */
  hideLauncherWhile?: string
  /** Открывает форму заявки соответствующего языка. */
  onRequestContact: () => void
}

/** Кнопка + панель ИИ-чата. Языковые обёртки передают сюда только тексты и направление. */
export default function ChatWidget({
  lang,
  labels,
  side,
  dir,
  fontClass,
  whatsappUrl,
  openLabel,
  moduleSlug,
  page,
  hideLauncherWhile,
  onRequestContact,
}: ChatWidgetProps) {
  const [open, setOpen] = useState(false)
  // Вопрос, пришедший из поля на первом экране: панель грузится лениво,
  // поэтому текст ждёт здесь, пока она смонтируется.
  const [pendingQuestion, setPendingQuestion] = useState<string | null>(null)

  const onFirstScreen = useOnFirstScreen(hideLauncherWhile)

  useEffect(
    () =>
      subscribeAsk((question) => {
        setPendingQuestion(question)
        setOpen(true)
      }),
    [],
  )

  return (
    <>
      {(!onFirstScreen || open) && (
      <ChatLauncher
        open={open}
        onToggle={() => setOpen((v) => !v)}
        side={side}
        openLabel={openLabel}
        closeLabel={labels.closeLabel}
      />
      )}
      {open && (
        <Suspense fallback={null}>
          <ChatPanel
            lang={lang}
            labels={labels}
            side={side}
            dir={dir}
            fontClass={fontClass}
            whatsappUrl={whatsappUrl}
            moduleSlug={moduleSlug}
            page={page}
            initialQuestion={pendingQuestion}
            onQuestionSent={() => setPendingQuestion(null)}
            onClose={() => setOpen(false)}
            onRequestContact={onRequestContact}
          />
        </Suspense>
      )}
    </>
  )
}
