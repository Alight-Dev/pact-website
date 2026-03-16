import Navbar from './components/Navbar'
import Hero from './components/Hero'
import HowItWorks from './components/HowItWorks'
import Permissions from './components/Permissions'
import ShieldTiers from './components/ShieldTiers'
import Privacy from './components/Privacy'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <HowItWorks />
        <Permissions />
        <ShieldTiers />
        <Privacy />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
