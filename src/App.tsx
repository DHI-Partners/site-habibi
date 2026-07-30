import Hero from './components/Hero'
import Benefits from './components/Benefits'
import Modules from './components/Modules'
import Pricing from './components/Pricing'
import Closing from './components/Closing'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen w-full bg-black font-geist text-white">
      <Hero />
      <Benefits />
      <Modules />
      <Pricing />
      <Closing />
      <Footer />
    </div>
  )
}
