import { LiquidButton } from '../../ui/liquid-glass-button'
import { useContact } from '../../en/ContactProvider'
import { PARTNER_FORM } from './data'

// Absolute links: from /partners the landing anchors only work together with the
// path — HashScroll in App.tsx takes care of the scrolling.
const FOOTER_LINKS = [
  { label: 'Features', href: '/#vozmozhnosti' },
  { label: 'Modules', href: '/#moduli' },
  { label: 'Pricing', href: '/#tarify' },
  { label: 'Industries', href: '/#biznes' },
  { label: 'FAQ', href: '/#faq' },
]

export default function PartnerFooter() {
  const { open } = useContact()

  return (
    <footer className="bg-black px-6 py-14 md:px-12 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <a href="/" className="text-lg font-semibold tracking-tight text-white">
              Habibi
            </a>
            <p className="mt-3 text-sm leading-relaxed text-white/50">
              Partner programme: recommend Habibi to businesses and earn up to 30% of every paid
              subscription from the clients you bring in.
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
              Become a partner
            </LiquidButton>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 Habibi. All rights reserved.</span>
          <span>Habibi builds the technology. You build the recommendations.</span>
        </div>
      </div>
    </footer>
  )
}
