import { createContext, useCallback, useContext, useState, type ReactNode } from 'react'
import ContactModal from './ContactModal'

/** WhatsApp number for direct contact (wa.me format — no "+" and no spaces). */
export const WHATSAPP_NUMBER = '77081888099'

/** Builds a WhatsApp link with a pre-filled message. */
export function buildWhatsAppLink(text: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`
}

/** Optional copy overrides — e.g. for the partner programme. */
export interface ContactOptions {
  /** Email subject instead of the default "New request from the Habibi site — plan …". */
  subject?: string
  /** Form subtitle instead of "Plan X. Leave your contacts…". */
  heading?: string
}

interface ContactCtx {
  /** Open the contact form. Pass a plan name to show it in the form header. */
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
