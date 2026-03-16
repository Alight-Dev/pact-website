import { useEffect, useRef } from 'react'
import GemHex from './GemHex'

const TIERS = [
  { key: 'bronze',   label: 'Bronze',   streak: '0–6 days',   color: '#C8762A' },
  { key: 'iron',     label: 'Iron',     streak: '7–13 days',  color: '#7A8E9C' },
  { key: 'gold',     label: 'Gold',     streak: '14–20 days', color: '#D4A800' },
  { key: 'shadow',   label: 'Shadow',   streak: '21–29 days', color: '#5A6880' },
  { key: 'crystal',  label: 'Crystal',  streak: '30–44 days', color: '#8EC8F0' },
  { key: 'emerald',  label: 'Emerald',  streak: '45–59 days', color: '#2EAA68' },
  { key: 'platinum', label: 'Platinum', streak: '60+ days',   color: '#C0D0DC' },
]

export default function ShieldTiers() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const nodes = el.querySelectorAll('.reveal')
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => e.target.classList.toggle('visible', e.isIntersecting)),
      { threshold: 0.05 }
    )
    nodes.forEach(n => observer.observe(n))
    return () => observer.disconnect()
  }, [])

  return (
    <section className="section tiers" id="shield" ref={ref}>
      <div className="container">
        <div className="tiers__header">
          <p className="tiers__eyebrow reveal">Team Progression</p>
          <h2 className="tiers__title reveal reveal-delay-1">FORGE YOUR SHIELD</h2>
          <p className="tiers__subtitle reveal reveal-delay-2">
            Every day your full team completes the goal, your shield ascends.
            Miss days and it degrades. Stay consistent and it reaches Platinum.
          </p>
        </div>

        <div className="tiers__grid">
          {TIERS.map((tier, i) => (
            <div
              key={tier.key}
              className={`tier-card reveal reveal-delay-${i + 1}`}
            >
              <div className="tier-card__hex">
                <GemHex tier={tier.key} size={80} glow />
              </div>
              <span
                className="tier-card__name"
                style={{ color: tier.color }}
              >
                {tier.label}
              </span>
              <span className="tier-card__streak">{tier.streak}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
