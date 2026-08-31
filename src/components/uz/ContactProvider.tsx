import { createContext, useCallback, useContext, useState, type ReactNode } from 'react'
import ContactModal from './ContactModal'

/** Номер WhatsApp для прямой связи (формат wa.me — без «+» и пробелов). */
export const WHATSAPP_NUMBER = '77081888099'

/** Ссылка на WhatsApp с заранее заполненным сообщением. */
export function buildWhatsAppLink(text: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`
}

/** Необязательные переопределения текстов формы. */
export interface ContactOptions {
  subject?: string
  heading?: string
}

interface ContactCtx {
  /** Открыть форму заявки. Название тарифа показывается в шапке формы. */
  open: (tierName?: string, options?: ContactOptions) => void
}

const Ctx = createContext<ContactCtx>({ open: () => {} })

export function useContact() {
  return useContext(Ctx)
}

export function ContactProvider({ children }: { children: ReactNode }) {
  const [tier, setTier] = useState<string | null>(null)
  const [options, setOptions] = useState<ContactOptions>({})
  const [isOpen, setIsOpen] = useState(false)

  const open = useCallback((tierName?: string, opts?: ContactOptions) => {
    setTier(tierName ?? null)
    setOptions(opts ?? {})
    setIsOpen(true)
  }, [])

  const close = useCallback(() => setIsOpen(false), [])

  return (
    <Ctx.Provider value={{ open }}>
      {children}
      <ContactModal
        open={isOpen}
        tierName={tier}
        subject={options.subject}
        heading={options.heading}
        onClose={close}
      />
    </Ctx.Provider>
  )
}
