import { Routes, Route } from 'react-router-dom'
import { ContactProvider } from './components/ContactProvider'
import Hero from './components/Hero'
import Benefits from './components/Benefits'
import Modules from './components/Modules'
import Quiz from './components/Quiz'
import Pricing from './components/Pricing'
import BusinessTypes from './components/BusinessTypes'
import Faq from './components/Faq'
import Closing from './components/Closing'
import Footer from './components/Footer'
import InvestorDeck from './components/investors/InvestorDeck'
import DirectionSelector from './components/investors/DirectionSelector'
import TourismDeck from './components/investors/TourismDeck'

function LandingPage() {
  return (
    <ContactProvider>
      <div className="min-h-screen w-full bg-black font-geist text-white">
        <Hero />
        <Benefits />
        <Modules />
        <Quiz />
        <Pricing />
        <BusinessTypes />
        <Faq />
        <Closing />
        <Footer />
      </div>
    </ContactProvider>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/investors" element={<DirectionSelector />} />
      <Route path="/investors/real-estate" element={<InvestorDeck />} />
      <Route path="/investors/tourism" element={<TourismDeck />} />
    </Routes>
  )
}
