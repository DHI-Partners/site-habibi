import { ContactProvider } from './components/ContactProvider'
import Hero from './components/Hero'
import Benefits from './components/Benefits'
import Modules from './components/Modules'
import Quiz from './components/Quiz'
import Pricing from './components/Pricing'
import Faq from './components/Faq'
import Closing from './components/Closing'
import Footer from './components/Footer'

export default function App() {
  return (
    <ContactProvider>
      <div className="min-h-screen w-full bg-black font-geist text-white">
        <Hero />
        <Benefits />
        <Modules />
        <Quiz />
        <Pricing />
        <Faq />
        <Closing />
        <Footer />
      </div>
    </ContactProvider>
  )
}
