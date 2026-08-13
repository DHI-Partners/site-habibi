import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

export type ArTheme = 'dark' | 'light'

const ThemeContext = createContext<{ theme: ArTheme; toggle: () => void }>({
  theme: 'dark',
  toggle: () => {},
})

export const useArTheme = () => useContext(ThemeContext)

function getSystemTheme(): ArTheme {
  return typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}

export function ArThemeProvider({ children }: { children: ReactNode }) {
  // القيمة الأولية: اختيار المستخدم المحفوظ إن وُجد، وإلا وضع الجهاز.
  const [theme, setTheme] = useState<ArTheme>(() => {
    if (typeof window === 'undefined') return 'dark'
    const saved = localStorage.getItem('ar-theme')
    return saved === 'light' || saved === 'dark' ? saved : getSystemTheme()
  })

  // نتابع تغيّر وضع الجهاز حيًّا — ما دام المستخدم لم يختر يدويًا.
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = () => {
      if (!localStorage.getItem('ar-theme')) setTheme(getSystemTheme())
    }
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  // نطبّق colorScheme على <html> (لا يحفظ الاختيار).
  useEffect(() => {
    document.documentElement.style.colorScheme = theme
    return () => {
      document.documentElement.style.colorScheme = ''
    }
  }, [theme])

  // الضغط على الزر اختيار صريح — يُحفظ ويتجاوز وضع الجهاز.
  const toggle = () =>
    setTheme((t) => {
      const next = t === 'dark' ? 'light' : 'dark'
      localStorage.setItem('ar-theme', next)
      return next
    })

  return <ThemeContext.Provider value={{ theme, toggle }}>{children}</ThemeContext.Provider>
}
