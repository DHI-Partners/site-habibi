import { LiquidButton } from '../ui/liquid-glass-button'
import { useContact } from './ContactProvider'

const FOOTER_LINKS = [
  { label: 'الإمكانيات', href: '#vozmozhnosti' },
  { label: 'الوحدات', href: '#moduli' },
  { label: 'الأسعار', href: '#tarify' },
  { label: 'القطاعات', href: '#biznes' },
  { label: 'الأسئلة', href: '#faq' },
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
              منظومة رقمية متكاملة لأعمالك. تحكّم أكبر، وروتين أقل، ونمو في المؤشرات.
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
              ابدأ الآن
            </LiquidButton>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
            © 2026 Habibi. جميع الحقوق محفوظة.
            <a href="/ar/privacy" className="text-white/55 underline-offset-4 transition-colors hover:text-white hover:underline">
              سياسة الخصوصية
            </a>
            <a href="/ar/terms" className="text-white/55 underline-offset-4 transition-colors hover:text-white hover:underline">
              شروط الاستخدام
            </a>
          </span>
          <span>نظام واحد بدل عشر أدوات متفرّقة.</span>
        </div>
      </div>
    </footer>
  )
}
