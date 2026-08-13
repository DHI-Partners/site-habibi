import { createContext, useCallback, useContext, useState, type ReactNode } from 'react'
import ContactModal from './ContactModal'

/** WhatsApp number for direct contact (wa.me format — no "+" and no spaces). */
export const WHATSAPP_NUMBER = '77081888099'

/** Builds a WhatsApp link with a pre-filled message. */
export function buildWhatsAppLink(text: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`
}

interface ContactCtx {
  /** Open the contact form. Pass a plan name to show it in the form header. */
  open: (tierName?: string) => void
}

const Ctx = createContext<ContactCtx>({ open: () => {} })

export function useContact() {
  return useContext(Ctx)
}

export function ContactProvider({ children }: { children: ReactNode }) {
  const [tier, setTier] = useState<string | null>(null)
  const [isOpen, setIsOpen] = useState(false)

  const open = useCallback((tierName?: string) => {
    setTier(tierName ?? null)
    setIsOpen(true)
  }, [])

  const close = useCallback(() => setIsOpen(false), [])

  return (
    <Ctx.Provider value={{ open }}>
      {children}
      <ContactModal open={isOpen} tierName={tier} onClose={close} />
    </Ctx.Provider>
  )
}
