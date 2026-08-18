import { useEffect } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { ContactProvider } from './components/ContactProvider'
import Hero from './components/Hero'
import Benefits from './components/Benefits'
import BusinessFlows from './components/BusinessFlows'
import Modules from './components/Modules'
import Quiz from './components/Quiz'
import Pricing from './components/Pricing'
import IndustrySelector from './components/IndustrySelector'
import Faq from './components/Faq'
import Closing from './components/Closing'
import Footer from './components/Footer'
import MessengerWidget from './components/MessengerWidget'
import InvestorDeck from './components/investors/InvestorDeck'
import DirectionSelector from './components/investors/DirectionSelector'
import TourismDeck from './components/investors/TourismDeck'
import MedicalDeck from './components/investors/medical/MedicalDeck'
import LogisticsDeck from './components/investors/logistics/LogisticsDeck'
import ArLandingPage from './components/ar/ArLandingPage'
import EnLandingPage from './components/en/EnLandingPage'
import ModulePage from './components/modules/ModulePage'
import EnModulePage from './components/modules/en/EnModulePage'
import ArModulePage from './components/modules/ar/ArModulePage'

function LandingPage() {
  // Базовый язык документа — английский (index.html); русская версия переопределяет его на время показа.
  useEffect(() => {
    const html = document.documentElement
    const prevLang = html.getAttribute('lang') ?? 'en'
    html.setAttribute('lang', 'ru')
    document.title = 'Habibi — цифровая экосистема для вашего бизнеса'
    return () => {
      html.setAttribute('lang', prevLang)
      document.title = 'Habibi — the digital ecosystem for your business'
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
        <MessengerWidget />
      </div>
    </ContactProvider>
  )
}

/**
 * Deep-link scrolling: when the page is opened directly with a hash (e.g.
 * `/#tarify` shared or opened in a new tab) or navigated to another route + hash,
 * scroll to that section. SPA content mounts after the browser's own hash jump, so
 * we retry until the target exists, then re-align once late images shift the layout.
 */
function HashScroll() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (!hash) return
    const id = decodeURIComponent(hash.slice(1))
    if (!id) return
    if (id === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

    let cancelled = false
    let tries = 0
    const scroll = () =>
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })

    const jump = () => {
      if (cancelled) return
      const el = document.getElementById(id)
      if (el) {
        scroll()
        // Correct for layout shift as images above the section finish loading.
        window.setTimeout(() => {
          if (!cancelled) scroll()
        }, 500)
      } else if (tries++ < 40) {
        window.setTimeout(jump, 100)
      }
    }

    const t = window.setTimeout(jump, 80)
    return () => {
      cancelled = true
      window.clearTimeout(t)
    }
  }, [pathname, hash])

  return null
}

export default function App() {
  return (
    <>
      <HashScroll />
      <Routes>
      {/* Английская версия — по умолчанию (корень сайта); русская — на /ru */}
      <Route path="/" element={<EnLandingPage />} />
      <Route path="/ru" element={<LandingPage />} />
      <Route path="/ar" element={<ArLandingPage />} />
      <Route path="/en" element={<Navigate to="/" replace />} />
      <Route path="/investors" element={<DirectionSelector />} />
      <Route path="/investors/real-estate" element={<InvestorDeck />} />
      <Route path="/investors/tourism" element={<TourismDeck />} />
      <Route path="/investors/medical" element={<MedicalDeck />} />
      <Route path="/investors/logistics" element={<LogisticsDeck />} />
      <Route path="/moduli/:slug" element={<ModulePage />} />
      <Route path="/en/modules/:slug" element={<EnModulePage />} />
      <Route path="/ar/modules/:slug" element={<ArModulePage />} />
      {/* Неизвестный адрес (в т.ч. старые ссылки на /partner) — на главную, а не пустая страница. */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
    </>
  )
}
