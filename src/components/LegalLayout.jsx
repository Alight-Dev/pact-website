import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'

const DEFAULT_TITLE = 'Pact — Earn Your Screen Time. Forge Your Shield.'

export default function LegalLayout({ title, lastUpdated, children }) {
  useEffect(() => {
    document.title = `${title} — Pact`
    return () => {
      document.title = DEFAULT_TITLE
    }
  }, [title])
  return (
    <>
      <Navbar />
      <main className="legal-page">
        <div className="container legal-page__inner">
          <Link to="/" className="legal-page__back">
            ← Back to home
          </Link>
          <h1 className="legal-page__title">{title}</h1>
          <p className="legal-page__updated">Last updated: {lastUpdated}</p>
          <div className="legal-page__content">{children}</div>
        </div>
      </main>
      <Footer />
    </>
  )
}
