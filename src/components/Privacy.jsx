import { useEffect, useRef } from 'react'

const PILLS = [
  { icon: '🔐', text: 'End-to-end team isolation', sub: 'Your data is only visible to your team' },
  { icon: '🗑️', text: 'Photos deleted after review', sub: 'Not stored permanently or indexed' },
  { icon: '🚫', text: 'No third-party data sharing', sub: 'We do not sell or share user data' },
  { icon: '📵', text: 'No gallery access', sub: 'Live camera only — no browsing your photos' },
]

export default function Privacy() {
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
    <section className="section" id="privacy" ref={ref}>
      <div className="container">
        <div className="privacy__inner">
          <div>
            <p className="privacy__label reveal">Privacy & Data</p>
            <h2 className="privacy__title reveal reveal-delay-1">
              Your data stays<br />within your team.
            </h2>
            <p className="privacy__body reveal reveal-delay-2">
              Pact is built around trust within small, self-selected teams. We collect only
              what is necessary to operate the accountability loop — nothing more.
            </p>
            <ul className="privacy__list reveal reveal-delay-3">
              <li>Live proof photos are uploaded to Firebase Storage, visible only to your team members, and deleted after the daily approval window closes.</li>
              <li>App blocking settings are stored locally on your device via Apple's ManagedSettings framework. Pact cannot access the content of restricted apps.</li>
              <li>No advertising, no analytics beyond crash reporting, and no sale of personal data — ever.</li>
              <li>You may leave a team or delete your account at any time. All associated data is permanently removed.</li>
            </ul>
          </div>

          <div className="privacy__visual reveal reveal-delay-2">
            {PILLS.map((pill) => (
              <div key={pill.text} className="privacy__pill">
                <span className="privacy__pill-icon">{pill.icon}</span>
                <div>
                  <div className="privacy__pill-text">{pill.text}</div>
                  <div className="privacy__pill-sub">{pill.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
