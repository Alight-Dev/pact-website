import { useEffect, useRef } from 'react'

const STEPS = [
  {
    num: '01',
    icon: '👥',
    title: 'Create Your Team',
    desc: 'Form a team of 3–5 people. Share an invite link via iMessage or WhatsApp. Each member gets assigned a shield fragment.',
  },
  {
    num: '02',
    icon: '🎯',
    title: 'Forge the Pact',
    desc: 'Admin defines the daily goal, deadline, and which apps to restrict. All members tap Forge Pact to activate the agreement.',
  },
  {
    num: '03',
    icon: '📸',
    title: 'Submit Live Proof',
    desc: 'Open the live camera — no gallery uploads allowed. Capture and submit photo proof of your completed task to the team feed.',
  },
  {
    num: '04',
    icon: '🔓',
    title: 'Get Approved & Unlock',
    desc: 'Teammates vote to approve your submission. Majority approval instantly unlocks your restricted apps for the rest of the day.',
  },
]

export default function HowItWorks() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const nodes = el.querySelectorAll('.reveal')
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => e.target.classList.toggle('visible', e.isIntersecting)),
      { threshold: 0.1 }
    )
    nodes.forEach(n => observer.observe(n))
    return () => observer.disconnect()
  }, [])

  return (
    <section className="section" id="how-it-works" ref={ref}>
      <div className="container">
        <div className="hiw__header">
          <p className="hiw__eyebrow reveal">The Daily Ritual</p>
          <h2 className="hiw__title reveal reveal-delay-1">How It Works</h2>
        </div>
        <div className="hiw__steps">
          {STEPS.map((step, i) => (
            <div
              key={step.num}
              className={`hiw__step reveal reveal-delay-${i + 1}`}
            >
              <div className="hiw__step-num">{step.num}</div>
              <div className="hiw__step-icon">{step.icon}</div>
              <h3 className="hiw__step-title">{step.title}</h3>
              <p className="hiw__step-desc">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
