import { createContext, useCallback, useContext, useState, type ReactNode } from 'react'
import ContactModal from './ContactModal'

/** رقم واتساب للتواصل المباشر (بصيغة wa.me بدون + ولا مسافات). */
export const WHATSAPP_NUMBER = '966560547096'

/** يبني رابط واتساب مع نصّ مُعبّأ مسبقًا. */
export function buildWhatsAppLink(text: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`
}

interface ContactCtx {
  /** فتح نموذج التواصل. يمكن تمرير اسم الباقة لعرضه في العنوان. */
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
