import { useEffect, useRef, useState, useCallback } from 'react';
import './WaitlistPage.css';

/* ── Email validation ── */
function validate(email) {
  const v = email.trim();
  if (!v)               return { ok: false, msg: 'Enter your email to continue.' };
  if (!v.includes('@')) return { ok: false, msg: 'Needs an @ symbol — e.g. you@gmail.com' };
  const [, domain] = v.split('@');
  if (!domain || !domain.includes('.')) return { ok: false, msg: 'Needs a domain — e.g. .com or .io' };
  if (domain.split('.').pop().length < 2) return { ok: false, msg: 'Check that domain ending.' };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return { ok: false, msg: "That doesn't look right." };
  return { ok: true, msg: 'Looks good!' };
}

/* ── Counter animation ── */
function runCounter(el) {
  const target = +el.dataset.count;
  const suffix = el.dataset.suffix || '';
  const dur = 1200;
  const t0 = performance.now();
  (function tick(now) {
    const p = Math.min((now - t0) / dur, 1);
    const ease = 1 - Math.pow(2, -10 * p);
    el.textContent = Math.floor(ease * target) + suffix;
    if (p < 1) requestAnimationFrame(tick);
  })(t0);
}

/* ── Form component ── */
function EmailForm({ id }) {
  const [email, setEmail]       = useState('');
  const [result, setResult]     = useState(null);   // null | { ok, msg }
  const [loading, setLoading]   = useState(false);
  const [success, setSuccess]   = useState(false);
  const [shake, setShake]       = useState(false);
  const timerRef = useRef(null);

  const handleChange = (e) => {
    const val = e.target.value;
    setEmail(val);
    clearTimeout(timerRef.current);
    if (!val) { setResult(null); return; }
    timerRef.current = setTimeout(() => setResult(validate(val)), 400);
  };

  const handleBlur = () => {
    if (email) setResult(validate(email));
  };

  const handleSubmit = useCallback(() => {
    const res = validate(email);
    setResult(res);
    if (!res.ok) {
      setShake(true);
      setTimeout(() => setShake(false), 400);
      return;
    }
    setLoading(true);
    // TODO: replace with Firestore write once Firebase is connected
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 800);
  }, [email]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSubmit();
  };

  if (success) {
    return (
      <div className="form-success show" role="status">
        <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <circle cx="10" cy="10" r="8.5" stroke="#a5b4fc" strokeWidth="1.4"/>
          <path d="M6.5 10.5l2.5 2.5 4.5-5" stroke="#a5b4fc" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        You&apos;re on the list — we&apos;ll reach out when we launch.
      </div>
    );
  }

  const iconColor = result ? (result.ok ? '#86efac' : '#f87171') : undefined;
  const iconPath  = result ? (result.ok ? 'M6.5 10.5l2.5 2.5 4.5-5' : 'M7 7l6 6M13 7l-6 6') : undefined;

  return (
    <div className="form-shell" id={`fs-${id}`}>
      <div className={`form-pill${shake ? ' f-error' : ''}`}>
        <input
          type="email"
          value={email}
          placeholder="your@email.com"
          autoComplete="email"
          aria-label="Email address"
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
        />
        {result && (
          <svg className="v-icon show" viewBox="0 0 20 20" fill="none" aria-hidden="true"
               style={{ color: iconColor }}>
            <circle cx="10" cy="10" r="8.5" stroke="currentColor" strokeWidth="1.4"/>
            <path d={iconPath} stroke="currentColor" strokeWidth="1.6"
                  strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
        <button
          className={`btn-cta${loading ? ' loading' : ''}`}
          onClick={handleSubmit}
          disabled={loading}
          aria-label="Join the waitlist"
        >
          <span className="btn-label">Get early access</span>
          <span className="btn-spin" aria-hidden="true" />
        </button>
      </div>
      {result && (
        <p className={`form-msg ${result.ok ? 'ok' : 'err'}`} aria-live="polite">
          {result.ok ? `✓ ${result.msg}` : result.msg}
        </p>
      )}
      <p className="form-note">No spam. One email when we launch.</p>
    </div>
  );
}

/* ── Lock icon SVG ── */
function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="#f87171" strokeWidth="1.8"
         strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
      <path d="M7 11V7a5 5 0 0110 0v4"/>
    </svg>
  );
}

/* ── Main page ── */
export default function WaitlistPage() {
  const spbRef  = useRef(null);
  const g1Ref   = useRef(null);
  const g2Ref   = useRef(null);

  /* Body background while mounted */
  useEffect(() => {
    const prev = { bg: document.body.style.background, color: document.body.style.color, ox: document.body.style.overflowX };
    document.body.style.background  = '#08080f';
    document.body.style.color       = '#ffffff';
    document.body.style.overflowX   = 'hidden';
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.body.style.background  = prev.bg;
      document.body.style.color       = prev.color;
      document.body.style.overflowX   = prev.ox;
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);

  /* Scroll progress + parallax */
  useEffect(() => {
    const onScroll = () => {
      const pct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight) * 100;
      if (spbRef.current) spbRef.current.style.width = pct + '%';
      if (g1Ref.current)  g1Ref.current.style.transform  = `translateX(-50%) translateY(${window.scrollY * 0.15}px)`;
      if (g2Ref.current)  g2Ref.current.style.transform  = `translateY(${-window.scrollY * 0.08}px)`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Scroll reveal */
  useEffect(() => {
    const els = document.querySelectorAll('.wl .rv');
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target); } });
    }, { threshold: 0.08, rootMargin: '0px 0px -32px 0px' });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  /* Counter animation */
  useEffect(() => {
    const cells = document.querySelectorAll('.wl .stat-cell');
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.querySelectorAll('[data-count]').forEach(runCounter);
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.4 });
    cells.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const MARQUEE_ITEMS = [
    'Forge a Pact', 'Submit Live Proof', 'Your Group Votes',
    'Apps Unlocked', 'Real Consequences', 'Build Together', 'Stay Accountable',
  ];

  return (
    <div className="wl" style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", WebkitFontSmoothing: 'antialiased' }}>

      {/* Scroll progress */}
      <div id="spb" ref={spbRef} style={{ position:'fixed', top:0, left:0, height:'2px', width:'0%', background:'#6366f1', zIndex:9999, transition:'width 0.08s linear' }} />

      {/* Glow canvas */}
      <div className="bg-canvas">
        <div className="glow glow-1" ref={g1Ref} />
        <div className="glow glow-2" ref={g2Ref} />
      </div>

      {/* Nav */}
      <nav>
        <div className="nav-inner">
          <a href="/" className="nav-logo">
            <img src="/logo.png" alt="Pact" />
            Pact
          </a>
          <span className="nav-pill">iOS · Coming Soon</span>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero wrap">
        <div className="hero-badge rv">
          <span className="badge-dot" />
          Now accepting early access
        </div>
        <h1 className="hero-hed rv rv-d1">
          Do it or<br /><span>lose your apps.</span>
        </h1>
        <p className="hero-sub rv rv-d2">
          Your group locks your most distracting apps until everyone proves they&apos;ve done the work. No excuses — your crew sees everything.
        </p>
        <div className="hero-group-tag rv rv-d3">
          <div className="group-avatars">
            {[['AJ','#6366f1'],['MK','#0f766e'],['SR','#b45309'],['JP','#be123c'],['TW','#7c3aed']].map(([init, bg]) => (
              <div key={init} className="group-av" style={{ background: bg }}>{init}</div>
            ))}
          </div>
          <p className="group-tag-text"><strong>Join 900+ people</strong> holding each other accountable</p>
        </div>
        <div className="rv rv-d4" style={{ width:'100%', maxWidth:'460px' }}>
          <EmailForm id="hero" />
        </div>
      </section>

      {/* Marquee */}
      <div className="marquee-wrap" aria-hidden="true">
        <div className="marquee-track">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span key={i} className="m-item">{item}<span className="m-dot" /></span>
          ))}
        </div>
      </div>

      {/* Apps on the line */}
      <section className="apps-section wrap">
        <div className="rv">
          <span className="section-label">What&apos;s on the line</span>
          <h2 className="section-hed">Your favourite<br />distractions — cancelled.</h2>
          <p className="section-sub" style={{ marginTop: '10px' }}>Miss a day? Your group keeps you locked out until you prove you&apos;re back on track.</p>
        </div>
        <div className="apps-grid">
          {[
            { name: 'Instagram', desc: 'Infinite scroll',       bg: 'linear-gradient(135deg,#833ab4,#fd1d1d,#f77737)', icon: <svg viewBox="0 0 24 24" fill="none"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="white" strokeWidth="1.8" fill="none"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" fill="none" stroke="white" strokeWidth="1.8"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke="white" strokeWidth="2" strokeLinecap="round"/></svg> },
            { name: 'TikTok',    desc: 'Short-form rabbit hole', bg: '#010101',                                         icon: <svg viewBox="0 0 24 24" fill="white"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.75a4.85 4.85 0 01-1.01-.06z"/></svg> },
            { name: 'YouTube',   desc: 'Endless autoplay',       bg: '#ff0000',                                         icon: <svg viewBox="0 0 24 24" fill="white"><path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#ff0000"/></svg> },
            { name: 'X / Twitter', desc: 'Doomscrolling',        bg: '#000',                                            icon: <svg viewBox="0 0 24 24" fill="white"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L2.25 2.25H8.08l4.26 5.632zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> },
            { name: 'Reddit',    desc: 'Forum rabbit hole',       bg: '#ff4500',                                         icon: <svg viewBox="0 0 24 24" fill="white"><circle cx="12" cy="12" r="10"/><path d="M20 12a2 2 0 00-3.37-1.46A9.78 9.78 0 0012.1 9.1a.39.39 0 00-.46.31l-.66 4.14a6.78 6.78 0 01-3.23-.79 2 2 0 10-2.13 3.35A3.81 3.81 0 006 16.5c0 2.21 2.69 4 6 4s6-1.79 6-4a3.81 3.81 0 00-.38-.75A2 2 0 0020 12zm-8 4.5c-1.14 0-2-.45-2-1s.86-1 2-1 2 .45 2 1-.86 1-2 1z" fill="#ff4500"/></svg> },
            { name: 'Snapchat',  desc: "Streaks & stories",      bg: '#fffc00',                                         icon: <svg viewBox="0 0 24 24" fill="#000"><path d="M12.166.006C9.65.006 7.4.97 5.85 3.09c-1.007 1.38-1.49 3.13-1.49 5.26v.98c-.53.2-1.06.23-1.54.14-.96-.18-1.49.45-1.26 1.29.13.49.61.83 1.1.96.2.05.57.08 1.04.29.36.16.69.45.97.9.5.81 1.83 2.21 4.3 2.59.06.01.1.06.1.12-.01.07-.08.14-.17.2-.58.4-1.67.62-3.25.65-.54.01-.95.4-.94.93.01.47.3.85.73.97C6.3 18.56 7.4 19.1 8 19.95c.1.14.06.33-.08.42-.21.13-.43.26-.62.38-.71.45-1.04.84-1.04 1.2 0 .44.44.79 1.06.79.3 0 .61-.08.92-.23.6-.3 1.2-.46 1.78-.46.63 0 1.26.19 1.88.57.62.38 1.28.56 1.96.56.64 0 1.26-.17 1.85-.51.61-.36 1.2-.54 1.77-.54.59 0 1.18.16 1.74.47.31.16.63.24.93.24.62 0 1.06-.35 1.06-.79 0-.36-.33-.75-1.04-1.2-.19-.12-.41-.25-.62-.38-.14-.09-.18-.28-.08-.42.6-.85 1.7-1.39 2.62-1.62.43-.12.72-.5.73-.97.01-.53-.4-.92-.94-.93-1.58-.03-2.67-.25-3.25-.65-.09-.06-.16-.13-.17-.2 0-.06.04-.11.1-.12 2.47-.38 3.8-1.78 4.3-2.59.28-.45.61-.74.97-.9.47-.21.84-.24 1.04-.29.49-.13.97-.47 1.1-.96.23-.84-.3-1.47-1.26-1.29-.48.09-1.01.06-1.54-.14v-.98c0-2.13-.483-3.88-1.49-5.26C16.6.97 14.35.006 12.166.006z"/></svg> },
          ].map(({ name, desc, bg, icon }, i) => (
            <div key={name} className={`app-card rv rv-d${(i % 6) + 1}`}>
              <div className="app-icon" style={{ background: bg }}>{icon}</div>
              <div className="app-info">
                <div className="app-name">{name}</div>
                <div className="app-desc">{desc}</div>
              </div>
              <div className="app-lock"><LockIcon /></div>
            </div>
          ))}
        </div>
        <p className="apps-note rv">Your group decides which apps are blocked. <span>Any app. Your rules.</span></p>
      </section>

      {/* Group section */}
      <div className="group-section">
        <div className="group-inner rv">
          <div className="group-text">
            <span className="section-label">The group effect</span>
            <h2 className="section-hed" style={{ marginBottom:'16px' }}>
              Works because<br />
              <span style={{ color:'var(--wl-violet-soft)' }}>your people<br />are watching.</span>
            </h2>
            <p className="group-body">
              Solo willpower has a 100% failure rate. Pact makes accountability social — your teammates see your proof, vote on it, and keep each other honest. When your crew is counting on you, you show up differently.<br /><br />
              Build streaks together. Celebrate together. And when someone slips — everyone knows.
            </p>
          </div>
          <div className="group-visual">
            {[
              { init:'AJ', bg:'#6366f1', name:'Alex J.',    status:'Morning workout · Approved by team', badge:'gv-done',    label:'✓ Done'  },
              { init:'MK', bg:'#0f766e', name:'Maya K.',    status:'Read 30 min · Proof submitted',      badge:'gv-vote',    label:'Voting'  },
              { init:'SR', bg:'#b45309', name:'Sam R.',     status:'No proof today — apps locked',       badge:'gv-pending', label:'Locked'  },
              { init:'JP', bg:'#be123c', name:'Jordan P.',  status:'Cold shower · Streak: 14 days',      badge:'gv-done',    label:'✓ Done'  },
            ].map(({ init, bg, name, status, badge, label }) => (
              <div key={init} className="gv-member">
                <div className="gv-av" style={{ background: bg }}>{init}</div>
                <div className="gv-info">
                  <div className="gv-name">{name}</div>
                  <div className="gv-status">{status}</div>
                </div>
                <span className={`gv-badge ${badge}`}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How it works */}
      <section className="section wrap">
        <div className="rv">
          <span className="section-label">How it works</span>
          <h2 className="section-hed">Three steps.<br />Real stakes.</h2>
        </div>
        <div className="steps-grid">
          <div className="step-card rv rv-d1">
            <p className="step-n">01 —</p>
            <div className="step-icon">
              <img src="/logo-color.png" alt="Pact" className="step-icon-logo" />
            </div>
            <h3 className="step-title">Forge a Pact</h3>
            <p className="step-desc">Your group picks daily goals together and agrees on which apps get locked. Everyone commits — the pact is sealed.</p>
          </div>
          <div className="step-card rv rv-d2">
            <p className="step-n">02 —</p>
            <div className="step-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="5" width="18" height="14" rx="2"/>
                <circle cx="12" cy="12" r="3.5"/>
                <path d="M9 5V4a1 1 0 011-1h4a1 1 0 011 1v1"/>
              </svg>
            </div>
            <h3 className="step-title">Submit your proof</h3>
            <p className="step-desc">No screenshots, no gallery picks. You take a live photo to prove you did the work. Your group sees it in real time.</p>
          </div>
          <div className="step-card rv rv-d3">
            <p className="step-n">03 —</p>
            <div className="step-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 00-3-3.87"/>
                <path d="M16 3.13a4 4 0 010 7.75"/>
              </svg>
            </div>
            <h3 className="step-title">Your group votes</h3>
            <p className="step-desc">Majority rules. Your apps unlock only when your group approves. Fail the vote — stay locked until tomorrow.</p>
          </div>
        </div>
      </section>

      {/* Phone previews */}
      <section className="section wrap" style={{ paddingTop: 0 }}>
        <div className="rv">
          <span className="section-label">The app</span>
          <h2 className="section-hed">Built for the<br />serious ones.</h2>
        </div>
        <div className="phones-wrap">
          {/* Phone 1 — Home */}
          <div className="phone-wrap rv">
            <div className="phone raised">
              <div className="phone-notch" />
              <svg width="0" height="0">
                <defs>
                  <linearGradient id="rg" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#a5b4fc"/>
                    <stop offset="100%" stopColor="#6366f1"/>
                  </linearGradient>
                </defs>
              </svg>
              <div className="ph-home">
                <div className="ph-hi">Good morning, <strong>Alex</strong></div>
                <div className="ph-ring-wrap">
                  <div className="ph-ring">
                    <svg viewBox="0 0 100 100">
                      <circle className="ph-ring-bg" cx="50" cy="50" r="42"/>
                      <circle className="ph-ring-fill" cx="50" cy="50" r="42"/>
                    </svg>
                    <div className="ph-ring-c">
                      <span className="ph-ring-pct">72%</span>
                      <span className="ph-ring-lbl">Today</span>
                    </div>
                  </div>
                </div>
                <div className="ph-avs">
                  {[['AJ','#6366f1'],['MK','#0f766e'],['SR','#b45309'],['JP','#be123c']].map(([i,bg]) => (
                    <div key={i} className="ph-av" style={{ background: bg }}>{i}</div>
                  ))}
                  <span className="ph-av-lbl">4 members</span>
                </div>
                <div className="ph-row">
                  <div className="ph-row-ic" style={{ background:'rgba(99,102,241,0.18)', color:'#a5b4fc' }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 8h1a4 4 0 010 8h-1"/><path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z"/>
                      <line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/>
                    </svg>
                  </div>
                  <div className="ph-row-t">
                    <div className="ph-row-name">Morning workout</div>
                    <div className="ph-row-meta">Approved by 3 members</div>
                  </div>
                  <span className="ph-b b-done">Done</span>
                </div>
                <div className="ph-row">
                  <div className="ph-row-ic" style={{ background:'rgba(251,191,36,0.12)', color:'#fde68a' }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/>
                    </svg>
                  </div>
                  <div className="ph-row-t">
                    <div className="ph-row-name">Read 30 min</div>
                    <div className="ph-row-meta">Awaiting your proof</div>
                  </div>
                  <span className="ph-b b-pend">Pending</span>
                </div>
                <div className="ph-btn">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="12" cy="12" r="3.5"/>
                  </svg>
                  Submit Proof
                </div>
              </div>
            </div>
            <p className="phone-lbl">Home</p>
          </div>

          {/* Phone 2 — Voting */}
          <div className="phone-wrap rv rv-d2">
            <div className="phone">
              <div className="phone-notch" />
              <div className="ph-vote">
                <div>
                  <div className="ph-vote-hd">Team Votes</div>
                  <div className="ph-vote-sub">1 submission needs your vote</div>
                </div>
                <div className="ph-card">
                  <div className="ph-card-img">
                    <svg viewBox="0 0 24 24" fill="none" stroke="rgba(165,180,252,0.4)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                    </svg>
                    <span className="ph-card-caption">Proof photo</span>
                  </div>
                  <div className="ph-card-meta">
                    <div className="ph-meta-av">MK</div>
                    <div>
                      <div className="ph-meta-name">Maya K.</div>
                      <div className="ph-meta-time">Morning run · 2 min ago</div>
                    </div>
                  </div>
                </div>
                <div className="ph-bar">
                  <div className="ph-bar-track"><div className="ph-bar-fill" /></div>
                  <span className="ph-bar-lbl">2/3 approved</span>
                </div>
                <div className="ph-actions">
                  <div className="ph-act-btn act-deny">✕ Deny</div>
                  <div className="ph-act-btn act-ok">✓ Approve</div>
                </div>
              </div>
            </div>
            <p className="phone-lbl">Voting</p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <div className="stats-section">
        <div className="stats-grid">
          {[
            { count:94, suffix:'%', label:'Daily completion rate in beta testing' },
            { count:7,  suffix:'-day', label:'Average streak held at launch' },
            { count:3,  suffix:'×', label:'More likely to follow through with a group' },
          ].map(({ count, suffix, label }, i) => (
            <div key={i} className={`stat-cell rv${i > 0 ? ` rv-d${i}` : ''}`}>
              <div className="stat-n">
                <span data-count={count} data-suffix={suffix}>0{suffix}</span>
              </div>
              <div className="stat-lbl">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <section className="cta-section wrap">
        <img src="/logo-color.png" alt="Pact" className="cta-logo rv" />
        <h2 className="cta-hed rv rv-d1">Stop going it<br /><span>alone.</span></h2>
        <p className="cta-sub rv rv-d2">Get your crew together. Set the rules. Lock the apps. The people around you are the system.</p>
        <p className="cta-count rv rv-d3">Join <strong>900+</strong> people already signed up</p>
        <div className="rv rv-d4" style={{ width:'100%', maxWidth:'460px' }}>
          <EmailForm id="cta" />
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="foot-inner">
          <a href="/" className="foot-logo">
            <img src="/logo.png" alt="" aria-hidden="true" />
            Pact
          </a>
          <div className="socials">
            <a href="#" className="s-link" aria-label="X / Twitter">
              <svg viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L2.25 2.25H8.08l4.26 5.632zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
            <a href="#" className="s-link" aria-label="Instagram">
              <svg viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            </a>
            <a href="#" className="s-link" aria-label="Discord">
              <svg viewBox="0 0 24 24"><path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>
            </a>
          </div>
          <p className="foot-copy">© 2026 Pact. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
