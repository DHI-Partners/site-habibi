import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { LiquidButton } from '../ui/liquid-glass-button'
import { useContact } from './ContactProvider'
import DigitalHeart from '../DigitalHeart'
import LangSwitcher from '../LangSwitcher'

const NAV_LINKS = [
  { label: 'الإمكانيات', href: '#vozmozhnosti' },
  { label: 'الوحدات', href: '#moduli' },
  { label: 'الاختيار', href: '#podbor' },
  { label: 'الأسعار', href: '#tarify' },
  { label: 'التواصل', href: '#kontakty' },
  { label: 'الاستشارات', href: '/ar/consulting' },
]

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { open } = useContact()

  return (
    <>
      <nav className="relative z-30 flex items-center justify-between px-6 py-5 md:px-12 lg:px-16">
        {/* الشعار + روابط سطح المكتب */}
        <div className="flex items-center gap-12">
          <a href="#top" className="flex flex-col leading-none">
            <span className="flex items-center gap-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              Habibi
              <DigitalHeart className="heart-beat h-[17px] w-auto text-emerald-400 sm:h-[19px]" />
            </span>
            <span className="mt-1.5 text-[10px] font-medium uppercase tracking-[0.16em] text-white/45 sm:text-[11px]">
              منظومة رقمية متكاملة لأعمالك
            </span>
          </a>
          <div className="hidden items-center gap-2 md:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-full border border-white/10 px-4 py-2 text-sm font-medium text-white/70 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/10 hover:text-white hover:shadow-[0_0_24px_rgba(255,255,255,0.14)] active:translate-y-0 active:scale-95"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* زر سطح المكتب */}
        <div className="hidden items-center gap-3 md:flex">
          <LangSwitcher current="ar" align="left" />
          <LiquidButton size="sm" onClick={() => open('Habibi')} className="rounded-full text-white">
            ابدأ مجانًا
          </LiquidButton>
        </div>

        {/* زر القائمة للجوال */}
        <button
          type="button"
          aria-label={mobileMenuOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
          onClick={() => setMobileMenuOpen((v) => !v)}
          className="relative z-50 flex h-10 w-10 items-center justify-center text-white transition-transform active:scale-90 md:hidden"
        >
          <Menu
            size={24}
            className={`absolute transition-all duration-300 ${
              mobileMenuOpen ? 'rotate-90 scale-75 opacity-0' : 'rotate-0 scale-100 opacity-100'
            }`}
          />
          <X
            size={24}
            className={`absolute transition-all duration-300 ${
              mobileMenuOpen ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-75 opacity-0'
            }`}
          />
        </button>
      </nav>

      {/* قائمة الجوال. h-dvh (وليس h-screen) — على Android/Chrome يحسب 100vh
          الارتفاع بدون شريط العنوان. المحتوى غير موسّط عمودياً (justify-start)
          وقابل للتمرير (overflow-y-auto): عدد عناصر القائمة + مبدّل اللغة +
          زر الدعوة أكبر من الشاشة المرئية على الهاتف، وكان يتسبب في تراكب
          مبدّل اللغة مع الشعار في الأعلى. */}
      <div
        className={`absolute inset-x-0 top-0 z-20 overflow-hidden bg-black/98 backdrop-blur-xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] md:hidden ${
          mobileMenuOpen ? 'h-dvh opacity-100' : 'pointer-events-none h-0 opacity-0'
        }`}
      >
        <div
          className={`flex h-full flex-col justify-start overflow-y-auto px-8 pb-10 pt-24 transition-all delay-100 duration-500 ${
            mobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          <div className="mb-8 w-fit">
            <LangSwitcher current="ar" variant="inline" />
          </div>
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="py-3 text-3xl font-medium text-white/90 transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
          <LiquidButton
            size="xl"
            onClick={() => {
              setMobileMenuOpen(false)
              open('Habibi')
            }}
            className="mt-6 w-fit shrink-0 rounded-full text-white"
          >
            ابدأ مجانًا
          </LiquidButton>
        </div>
      </div>
    </>
  )
}
