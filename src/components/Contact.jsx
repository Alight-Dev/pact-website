import { useEffect, useRef } from 'react'

export default function Contact() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const nodes = el.querySelectorAll('.reveal')
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => e.target.classList.toggle('visible', e.isIntersecting)),
      { threshold: 0.2 }
    )
    nodes.forEach(n => observer.observe(n))
    return () => observer.disconnect()
  }, [])

  return (
    <section className="section contact" id="contact" ref={ref}>
      <div className="container contact__inner">
        <p className="contact__eyebrow reveal">Get In Touch</p>
        <h2 className="contact__title reveal reveal-delay-1">QUESTIONS?</h2>
        <p className="contact__body reveal reveal-delay-2">
          For support, App Store review inquiries, privacy questions, or press —
          reach us directly. We respond to every message.
        </p>
        <a
          href="mailto:alightpact@gmail.com"
          className="contact__link reveal reveal-delay-3"
        >
          <span className="contact__link-icon">✉️</span>
          alightpact@gmail.com
        </a>
      </div>
    </section>
  )
}
