import { Suspense, lazy, useEffect } from 'react'
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
import AiChatWidget from './components/AiChatWidget'
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
import PartnerPage from './components/partner/PartnerPage'
import ConsultingPage from './components/consulting/ConsultingPage'
import { RU_CONSULTING } from './components/consulting/ru'
import { EN_CONSULTING } from './components/consulting/en'
import { AR_CONSULTING } from './components/consulting/ar'
import LegalPage from './components/legal/LegalPage'
import { RU_PRIVACY } from './components/legal/privacy.ru'
import { EN_PRIVACY } from './components/legal/privacy.en'
import { AR_PRIVACY } from './components/legal/privacy.ar'
import { RU_TERMS } from './components/legal/terms.ru'
import { EN_TERMS } from './components/legal/terms.en'
import { AR_TERMS } from './components/legal/terms.ar'
import EnPartnerPage from './components/partner/en/EnPartnerPage'
import RefRedirect from './components/partner/RefRedirect'

// Кабинет партнёра грузим отдельным чанком: лендингу Supabase не нужен.
const RegisterPage = lazy(() => import('./components/partner/cabinet/RegisterPage'))
const LoginPage = lazy(() => import('./components/partner/cabinet/LoginPage'))
const DashboardPage = lazy(() => import('./components/partner/cabinet/DashboardPage'))
const AdminPage = lazy(() => import('./components/partner/cabinet/AdminPage'))

/** Чёрный экран на время догрузки чанка кабинета — без белой вспышки. */
function Lazy({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<div className="min-h-screen w-full bg-black" />}>{children}</Suspense>
}

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
        <AiChatWidget hideLauncherWhile="top" />
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
      {/* Партнёрская программа (RU). /partner — короткая ссылка на неё же. */}
      <Route path="/ru/partners" element={<PartnerPage />} />
      {/* Консалтинг — индивидуальное внедрение */}
      <Route path="/ru/consulting" element={<ConsultingPage content={RU_CONSULTING} />} />
      <Route path="/consulting" element={<ConsultingPage content={EN_CONSULTING} />} />
      <Route path="/ar/consulting" element={<ConsultingPage content={AR_CONSULTING} />} />
      <Route path="/en/consulting" element={<Navigate to="/consulting" replace />} />
      {/* Политика конфиденциальности */}
      <Route path="/ru/privacy" element={<LegalPage content={RU_PRIVACY} />} />
      <Route path="/privacy" element={<LegalPage content={EN_PRIVACY} />} />
      <Route path="/ar/privacy" element={<LegalPage content={AR_PRIVACY} />} />
      <Route path="/en/privacy" element={<Navigate to="/privacy" replace />} />
      {/* Пользовательское соглашение */}
      <Route path="/ru/terms" element={<LegalPage content={RU_TERMS} />} />
      <Route path="/terms" element={<LegalPage content={EN_TERMS} />} />
      <Route path="/ar/terms" element={<LegalPage content={AR_TERMS} />} />
      <Route path="/en/terms" element={<Navigate to="/terms" replace />} />
      {/* Личный кабинет партнёра + вход по реферальной ссылке */}
      <Route path="/ref/:slug" element={<RefRedirect />} />
      <Route path="/ru/partners/register" element={<Lazy><RegisterPage /></Lazy>} />
      <Route path="/ru/partners/login" element={<Lazy><LoginPage /></Lazy>} />
      <Route path="/ru/partners/dashboard" element={<Lazy><DashboardPage /></Lazy>} />
      <Route path="/ru/partners/admin" element={<Lazy><AdminPage /></Lazy>} />
      {/* Английская версия кабинета — при английской партнёрской странице /partners */}
      <Route path="/partners/register" element={<Lazy><RegisterPage locale="en" /></Lazy>} />
      <Route path="/partners/login" element={<Lazy><LoginPage locale="en" /></Lazy>} />
      <Route path="/partners/dashboard" element={<Lazy><DashboardPage locale="en" /></Lazy>} />
      <Route path="/partners/admin" element={<Lazy><AdminPage locale="en" /></Lazy>} />
      <Route path="/partner" element={<Navigate to="/ru/partners" replace />} />
      <Route path="/partners" element={<EnPartnerPage />} />
      <Route path="/en/partners" element={<Navigate to="/partners" replace />} />
      {/* Неизвестный адрес — на главную, а не пустая страница. */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
    </>
  )
}
