import { useEffect, useRef } from 'react'

const PERMS = [
  {
    icon: '📷',
    name: 'Camera',
    api: 'NSCameraUsageDescription',
    desc: 'Pact requires camera access exclusively for live task verification. Users must capture real-time photo proof of their completed goal — no file picker or gallery access is used.',
    reason: 'Why required: Ensures accountability by preventing pre-taken or fabricated proof. The live camera enforces authentic, in-the-moment submission that teammates can trust.',
  },
  {
    icon: '🔒',
    name: 'Screen Time',
    api: 'FamilyControls · ManagedSettings · DeviceActivity',
    desc: 'Pact uses Apple\'s Screen Time framework to restrict user-selected apps each morning until their daily goal is approved by teammates. App blocking is controlled entirely by the user.',
    reason: 'Why required: Core app functionality. Users voluntarily configure which apps are locked. Restrictions apply only to the individual\'s own device and are fully user-initiated.',
  },
  {
    icon: '🔔',
    name: 'Push Notifications',
    api: 'UserNotifications · Firebase Cloud Messaging',
    desc: 'Notifications inform users when a teammate submits proof needing approval, when their own submission is approved or rejected, and when team streak milestones are reached.',
    reason: 'Why required: The peer-approval loop is time-sensitive. Timely notifications ensure teammates can vote before fallback auto-approval triggers, keeping the system fair and responsive.',
  },
  {
    icon: '🌐',
    name: 'Network Access',
    api: 'Firebase Firestore · Firebase Storage',
    desc: 'Pact connects to Firebase to sync team data, store submitted proof photos securely, and deliver real-time feed updates and approval votes between teammates.',
    reason: 'Why required: All core features — team management, proof submission, live voting, and shield progression — depend on real-time data sync via a secure cloud backend.',
  },
]

export default function Permissions() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const nodes = el.querySelectorAll('.reveal')
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => e.target.classList.toggle('visible', e.isIntersecting)),
      { threshold: 0.08 }
    )
    nodes.forEach(n => observer.observe(n))
    return () => observer.disconnect()
  }, [])

  return (
    <section className="section section--grey" id="permissions" ref={ref}>
      <div className="container">
        <div className="perms__header">
          <p className="perms__eyebrow reveal">App Store Review</p>
          <h2 className="perms__title reveal reveal-delay-1">Permission Usage</h2>
          <p className="perms__subtitle reveal reveal-delay-2">
            Every permission Pact requests is essential to its core functionality.
            No data is collected beyond what is needed to operate the team accountability loop.
          </p>
        </div>
        <div className="perms__grid">
          {PERMS.map((p, i) => (
            <div key={p.name} className={`perms__card reveal reveal-delay-${i + 1}`}>
              <div className="perms__card-top">
                <div className="perms__icon">{p.icon}</div>
                <div>
                  <div className="perms__card-name">{p.name}</div>
                  <span className="perms__card-api">{p.api}</span>
                </div>
              </div>
              <p className="perms__card-desc">{p.desc}</p>
              <div className="perms__card-reason">
                <strong>⚡</strong>
                {p.reason}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
