import type { ReactNode } from 'react'

/**
 * Общие примитивы партнёрского раздела: используются и на маркетинговой
 * странице (PartnerPage), и в личном кабинете (cabinet/*), чтобы кабинет
 * выглядел продолжением страницы, а не отдельным продуктом.
 */

/** Простой рендер **жирного** внутри абзаца (как в Faq.tsx). */
export function renderRich(text: string) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith('**') && part.endsWith('**') ? (
      <strong key={i} className="font-semibold text-white/90">
        {part.slice(2, -2)}
      </strong>
    ) : (
      part
    ),
  )
}

/**
 * Маркер раздела: линия во всю ширину + подпись на ней.
 * Читается как «здесь начинается новый раздел» ещё до чтения заголовка.
 * Номер раздела намеренно не ставим — он бы спорил с нумерацией шагов 01–05.
 */
export function SectionTag({
  children,
  divider = true,
}: {
  children: string
  /** Линия-разделитель над подписью (в герое не нужна). */
  divider?: boolean
}) {
  return (
    <div className="mb-5">
      {divider && (
        <div className="mb-6 flex items-center gap-3">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.95)]" />
          <span className="h-px flex-1 bg-gradient-to-r from-emerald-400/55 via-white/15 to-transparent" />
        </div>
      )}
      <span className="inline-flex items-center gap-2.5 rounded-full border border-emerald-400/35 bg-emerald-400/[0.1] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-sm">
        {children}
      </span>
    </div>
  )
}

export function Pill({ children }: { children: ReactNode }) {
  return (
    <span className="whitespace-nowrap rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm text-white/85">
      {children}
    </span>
  )
}

/**
 * Подсветка карточек: мягкий свет сверху внутри блока + тонкая световая кромка,
 * на наведении — свечение по контуру. Три тона: нейтральный, изумрудный (акцент),
 * янтарный (премиум).
 */
export const CARD_BASE =
  'relative rounded-2xl border p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5'

export const CARD_TONES = {
  plain:
    'border-white/12 bg-gradient-to-b from-white/[0.07] via-white/[0.025] to-transparent shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] hover:border-white/25 hover:shadow-[0_18px_44px_-22px_rgba(0,0,0,0.95),0_0_32px_-14px_rgba(255,255,255,0.3),inset_0_1px_0_rgba(255,255,255,0.16)]',
  emerald:
    'border-emerald-400/30 bg-gradient-to-b from-emerald-400/[0.13] via-emerald-400/[0.04] to-transparent shadow-[inset_0_1px_0_rgba(52,211,153,0.2)] hover:border-emerald-400/50 hover:shadow-[0_18px_44px_-22px_rgba(0,0,0,0.95),0_0_36px_-12px_rgba(52,211,153,0.45),inset_0_1px_0_rgba(52,211,153,0.3)]',
  amber:
    'border-amber-300/30 bg-gradient-to-b from-amber-300/[0.12] via-amber-300/[0.04] to-transparent shadow-[inset_0_1px_0_rgba(252,211,77,0.2)] hover:border-amber-300/50 hover:shadow-[0_18px_44px_-22px_rgba(0,0,0,0.95),0_0_36px_-12px_rgba(252,211,77,0.42),inset_0_1px_0_rgba(252,211,77,0.3)]',
} as const

export function card(tone: keyof typeof CARD_TONES = 'plain', extra = '') {
  return `${CARD_BASE} ${CARD_TONES[tone]} ${extra}`.trim()
}

export const CARD = card()

/** 1 клиент / 2 клиента / 5 клиентов. */
export function plural(n: number, one: string, few: string, many: string): string {
  const mod10 = n % 10
  const mod100 = n % 100
  if (mod10 === 1 && mod100 !== 11) return one
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return few
  return many
}
