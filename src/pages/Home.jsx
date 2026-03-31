import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import HowItWorks from '../components/HowItWorks'
import Contact from '../components/Contact'
import Footer from '../components/Footer'

export default function Home() {
  const { hash } = useLocation()

  useEffect(() => {
    if (!hash) return
    const id = hash.replace('#', '')
    requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    })
  }, [hash])

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <HowItWorks />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
