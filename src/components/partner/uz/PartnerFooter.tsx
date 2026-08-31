import { useNavigate } from 'react-router-dom'
import { LiquidButton } from '../../ui/liquid-glass-button'

// Ссылки абсолютные: со страницы /uz/partners хэш-якоря лендинга работают
// только вместе с путём — доскроллом занимается HashScroll в App.tsx.
const FOOTER_LINKS = [
  { label: 'Imkoniyatlar', href: '/uz#vozmozhnosti' },
  { label: 'Modullar', href: '/uz#moduli' },
  { label: 'Tariflar', href: '/uz#tarify' },
  { label: 'Sohalar', href: '/uz#biznes' },
  { label: 'FAQ', href: '/uz#faq' },
  { label: 'Konsalting', href: '/uz/consulting' },
]

export default function PartnerFooter() {
  const navigate = useNavigate()

  return (
    <footer className="bg-black px-6 py-14 md:px-12 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <a href="/uz" className="text-lg font-semibold tracking-tight text-white">
              Habibi
            </a>
            <p className="mt-3 text-sm leading-relaxed text-white/50">
              Hamkorlik dasturi: Habibini biznesga tavsiya qiling va olib kelgan mijozlaringiz
              toʻlagan har bir obunadan 30% gacha daromad oling.
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
              onClick={() => navigate('/uz/partners/register')}
              className="w-fit rounded-full text-white"
            >
              Hamkor boʻlish
            </LiquidButton>
            <a
              href="/uz/partners/login"
              className="text-sm text-white/60 transition-colors hover:text-white"
            >
              Kabinetga kirish
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
            © 2026 Habibi. Barcha huquqlar himoyalangan.
            <a
              href="/uz/privacy"
              className="text-white/55 underline-offset-4 transition-colors hover:text-white hover:underline"
            >
              Maxfiylik siyosati
            </a>
            <a
              href="/uz/terms"
              className="text-white/55 underline-offset-4 transition-colors hover:text-white hover:underline"
            >
              Foydalanish shartlari
            </a>
          </span>
          <span>Habibi texnologiyani yaratadi. Siz tavsiyalarni yaratasiz.</span>
        </div>
      </div>
    </footer>
  )
}
