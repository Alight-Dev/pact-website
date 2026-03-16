import { useEffect, useRef } from 'react'
import GemHex from './GemHex'

export default function Hero() {
  const contentRef = useRef(null)

  useEffect(() => {
    const el = contentRef.current
    if (!el) return
    const children = el.querySelectorAll('.reveal')
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => e.target.classList.toggle('visible', e.isIntersecting)),
      { threshold: 0.1 }
    )
    children.forEach(c => observer.observe(c))
    return () => observer.disconnect()
  }, [])

  return (
    <section className="hero" id="hero">
      {/* Left: content */}
      <div className="hero__content" ref={contentRef}>
        <p className="hero__eyebrow reveal">iOS App · Social Accountability</p>

        <h1 className="hero__title reveal reveal-delay-1">PACT</h1>

        <p className="hero__tagline reveal reveal-delay-2">
          Earn Your Screen Time.<br />Forge Your Shield.
        </p>

        <p className="hero__desc reveal reveal-delay-3">
          Pact locks distracting apps each morning until your team completes agreed-upon
          real-world goals together. Submit live photo proof, get peer approval, and unlock
          your day. Your team forges — or fractures — together.
        </p>

        <div className="hero__badge reveal reveal-delay-4">
          <span className="hero__badge-dot" />
          Coming to the App Store
        </div>
      </div>

      {/* Right: dark shield panel */}
      <div className="hero__panel">
        <div className="hero__shield-wrap">
          <GemHex tier="bronze" size={200} glow />
        </div>
        <div className="hero__shield-label">
          <span className="hero__shield-label-tier">BRONZE TIER</span>
          <span className="hero__shield-label-streak">Shield starts here — your team forges it higher</span>
        </div>
      </div>
    </section>
  )
}
