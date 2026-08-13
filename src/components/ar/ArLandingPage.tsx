import { useEffect } from 'react'
import { ContactProvider } from './ContactProvider'
import WhatsAppButton from './WhatsAppButton'
import Hero from './Hero'
import Benefits from './Benefits'
import BusinessFlows from './BusinessFlows'
import Modules from './Modules'
import Quiz from './Quiz'
import Pricing from './Pricing'
import IndustrySelector from './IndustrySelector'
import Faq from './Faq'
import Closing from './Closing'
import Footer from './Footer'

export default function ArLandingPage() {
  useEffect(() => {
    const html = document.documentElement
    const prevDir = html.getAttribute('dir') ?? 'ltr'
    const prevLang = html.getAttribute('lang') ?? 'ru'
    html.setAttribute('dir', 'rtl')
    html.setAttribute('lang', 'ar')
    return () => {
      html.setAttribute('dir', prevDir)
      html.setAttribute('lang', prevLang)
    }
  }, [])

  return (
    <ContactProvider>
      <div dir="rtl" className="min-h-screen w-full bg-black font-arabic text-white">
        <Hero />
        <IndustrySelector />
        <Benefits />
        <BusinessFlows />
        <Modules />
        <Quiz />
        <Pricing />
        <Faq />
        <Closing />
        <Footer />
        <WhatsAppButton />
      </div>
    </ContactProvider>
  )
}
