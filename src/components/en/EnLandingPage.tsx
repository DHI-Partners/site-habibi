import { useEffect } from 'react'
import { ContactProvider } from './ContactProvider'
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
import AiChatWidget from './AiChatWidget'

export default function EnLandingPage() {
  useEffect(() => {
    const html = document.documentElement
    const prevDir = html.getAttribute('dir') ?? 'ltr'
    const prevLang = html.getAttribute('lang') ?? 'ru'
    html.setAttribute('dir', 'ltr')
    html.setAttribute('lang', 'en')
    return () => {
      html.setAttribute('dir', prevDir)
      html.setAttribute('lang', prevLang)
    }
  }, [])

  return (
    <ContactProvider>
      <div className="min-h-screen w-full bg-black font-geist text-white">
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
        <AiChatWidget />
      </div>
    </ContactProvider>
  )
}
