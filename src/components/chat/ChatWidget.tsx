import { Suspense, lazy, useState } from 'react'
import ChatLauncher from './ChatLauncher'
import type { ChatLabels } from './ChatPanel'
import type { ChatLang } from '../../lib/chat'

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
  onRequestContact,
}: ChatWidgetProps) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <ChatLauncher
        open={open}
        onToggle={() => setOpen((v) => !v)}
        side={side}
        openLabel={openLabel}
        closeLabel={labels.closeLabel}
      />
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
            onClose={() => setOpen(false)}
            onRequestContact={onRequestContact}
          />
        </Suspense>
      )}
    </>
  )
}
