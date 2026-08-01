import type { ReactNode } from 'react'

interface GlassCardProps {
  children: ReactNode
  className?: string
}

/** Стеклянная карточка (liquid-glass + белая рамка/20) для блоков дека. */
export default function GlassCard({ children, className = '' }: GlassCardProps) {
  return (
    <div
      className={`liquid-glass rounded-xl border border-white/20 ${className}`}
    >
      {children}
    </div>
  )
}
