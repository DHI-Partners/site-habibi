import { LiquidButton } from '../ui/liquid-glass-button'
import { useContact } from '../ContactProvider'
import { PARTNER_FORM } from './data'

// Ссылки абсолютные: со страницы /ru/partners хэш-якоря главной работают
// только вместе с путём — доскроллом занимается HashScroll в App.tsx.
const FOOTER_LINKS = [
  { label: 'Возможности', href: '/ru#vozmozhnosti' },
  { label: 'Модули', href: '/ru#moduli' },
  { label: 'Тарифы', href: '/ru#tarify' },
  { label: 'Отрасли', href: '/ru#biznes' },
  { label: 'Вопросы', href: '/ru#faq' },
  { label: 'Инвесторам', href: '/investors' },
]

export default function PartnerFooter() {
  const { open } = useContact()

  return (
    <footer className="bg-black px-6 py-14 md:px-12 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <a href="/ru" className="text-lg font-semibold tracking-tight text-white">
              Habibi
            </a>
            <p className="mt-3 text-sm leading-relaxed text-white/50">
              Партнёрская программа: рекомендуй Habibi бизнесу и получай до 30% с оплаченных
              подписок привлечённых клиентов.
            </p>
          </div>

          <nav className="flex flex-col gap-3">
            {FOOTER_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-white/60 transition-colors hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex flex-col gap-3">
            <LiquidButton
              size="sm"
              onClick={() => open(PARTNER_FORM.label, PARTNER_FORM.options)}
              className="w-fit rounded-full text-white"
            >
              Стать партнёром
            </LiquidButton>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 Habibi. Все права защищены.</span>
          <span>Habibi создаёт технологию. Ты создаёшь рекомендации.</span>
        </div>
      </div>
    </footer>
  )
}
