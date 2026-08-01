import { useEffect, useState, type ReactNode, type CSSProperties } from 'react'

interface FadeInProps {
  children: ReactNode
  /** Задержка перед началом проявления, мс. */
  delay?: number
  /** Длительность перехода прозрачности, мс. */
  duration?: number
  className?: string
  style?: CSSProperties
}

/**
 * Обёртка, которая проявляет содержимое (opacity 0 → 1) через `delay` мс.
 * Используется для последовательного появления блоков слайда (стиль VEX).
 */
export default function FadeIn({
  children,
  delay = 0,
  duration = 1000,
  className = '',
  style,
}: FadeInProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay)
    return () => clearTimeout(t)
  }, [delay])

  return (
    <div
      className={`transition-opacity ${className}`}
      style={{
        ...style,
        opacity: visible ? 1 : 0,
        transitionDuration: `${duration}ms`,
      }}
    >
      {children}
    </div>
  )
}
