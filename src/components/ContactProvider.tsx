import { createContext, useCallback, useContext, useState, type ReactNode } from 'react'
import ContactModal from './ContactModal'

/** Необязательные переопределения текстов — например, для партнёрской программы. */
export interface ContactOptions {
  /** Тема письма вместо шаблона «Новая заявка с сайта Habibi — тариф …». */
  subject?: string
  /** Подзаголовок формы вместо «Тариф X. Заполните контакты — и мы свяжемся с вами.». */
  heading?: string
}

interface ContactCtx {
  /** Открыть форму заявки. Можно передать название тарифа для шапки формы. */
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
