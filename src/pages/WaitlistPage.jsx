import { useEffect, useRef } from 'react';
import EmailForm from '../components/EmailForm';
import './WaitlistPage.css';

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
            { name: 'Instagram', desc: 'Infinite scroll',       bg: '#000', iconSrc: '/logos/instagram.svg', iconScale: 1 },
            { name: 'TikTok',    desc: 'Short-form rabbit hole', bg: '#000', iconSrc: '/logos/tiktok.png', iconScale: 1.5 },
            { name: 'Reddit',    desc: 'Forum rabbit hole',      bg: '#030303', iconSrc: '/logos/reddit.png', iconScale: 1 },
            { name: 'Snapchat',  desc: "Streaks & stories",      bg: '#000', iconSrc: '/logos/snapchat.svg', iconScale: 1 },
          ].map(({ name, desc, bg, iconSrc, iconScale }, i) => (
            <div key={name} className={`app-card rv rv-d${(i % 6) + 1}`}>
              <div className="app-icon" style={{ background: bg, '--icon-scale': iconScale }}>
                <img src={iconSrc} alt="" aria-hidden="true" />
              </div>
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
              <img src="/logo.png" alt="Pact" className="step-icon-logo" />
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
                    <img src="/images/proof-morning-run.jpg" alt="Morning run proof" className="ph-card-photo" />
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
        <div className="cta-logo-shell rv" aria-hidden="true">
          <img src="/logo.png" alt="Pact" className="cta-logo" />
        </div>
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
            <a href="https://www.instagram.com/officialpactapp" className="s-link" aria-label="Instagram">
              <svg viewBox="0 0 24 24"><defs><linearGradient id="ig-footer" x1="0%" y1="100%" x2="100%" y2="0%"><stop offset="0%" stopColor="#feda75"/><stop offset="5%" stopColor="#fa7e1e"/><stop offset="45%" stopColor="#d92e7f"/><stop offset="60%" stopColor="#9b36b7"/><stop offset="90%" stopColor="#515bd4"/></linearGradient></defs><rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="url(#ig-footer)" strokeWidth="1.5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" fill="none" stroke="url(#ig-footer)" strokeWidth="1.5"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke="url(#ig-footer)" strokeWidth="2" strokeLinecap="round"/></svg>
            </a>
            <a href="https://www.tiktok.com/@officialpactapp" className="s-link" aria-label="TikTok">
              <svg viewBox="0 0 24 24" fill="white"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.75a4.85 4.85 0 01-1.01-.06z"/></svg>
            </a>
          </div>
          <p className="foot-copy">© 2026 Pact. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
