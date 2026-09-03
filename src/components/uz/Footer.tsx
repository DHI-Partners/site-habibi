import { LiquidButton } from '../ui/liquid-glass-button'
import { useContact } from './ContactProvider'

const FOOTER_LINKS = [
  { label: 'Imkoniyatlar', href: '#vozmozhnosti' },
  { label: 'Modullar', href: '#moduli' },
  { label: 'Tariflar', href: '#tarify' },
  { label: 'Sohalar', href: '#biznes' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Hamkorlar', href: '/uz/partners' },
  { label: 'Biz haqimizda', href: '/uz/about' },
]

export default function Footer() {
  const { open } = useContact()

  return (
    <footer id="kontakty" className="bg-black px-6 py-14 md:px-12 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <span className="text-lg font-semibold tracking-tight text-white">Habibi</span>
            <p className="mt-3 text-sm leading-relaxed text-white/50">
              Biznesingiz uchun raqamli ekotizim. Koʻproq nazorat, kamroq qoʻl mehnati,
              oʻlchanadigan oʻsish.
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
              onClick={() => open('Habibi')}
              className="w-fit rounded-full text-white"
            >
              Bepul boshlang
            </LiquidButton>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
            © 2026 Habibi. Barcha huquqlar himoyalangan.
            <a href="/uz/privacy" className="text-white/55 underline-offset-4 transition-colors hover:text-white hover:underline">
              Maxfiylik siyosati
            </a>
            <a href="/uz/terms" className="text-white/55 underline-offset-4 transition-colors hover:text-white hover:underline">
              Foydalanish shartlari
            </a>
          </span>
          <span>Oʻnta tarqoq dastur oʻrniga yagona tizim.</span>
        </div>
      </div>
    </footer>
  )
}
