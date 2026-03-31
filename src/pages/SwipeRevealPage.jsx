import { useEffect, useState, useCallback, useRef } from 'react';
import SwipeStack from '../components/SwipeStack';
import EmailForm from '../components/EmailForm';
import HowItWorks from '../components/HowItWorks';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
// Note: GemHex removed — using logo-color.png instead
import './SwipeRevealPage.css';

/* ── Particle burst data ── */
const PARTICLES = Array.from({ length: 16 }, (_, i) => ({
  angle: (360 / 16) * i + Math.random() * 15,
  dist: 80 + Math.random() * 140,
  size: 3 + Math.random() * 4,
  delay: Math.random() * 0.3,
  color: ['#6366f1', '#a5b4fc', '#8b5cf6', '#c4b5fd', '#818cf8'][Math.floor(Math.random() * 5)],
}));

export default function SwipeRevealPage() {
  const [phase, setPhase] = useState('swiping'); // 'swiping' | 'transitioning' | 'revealed'
  const [showContent, setShowContent] = useState(false);
  const pageRef = useRef(null);
  const hasCompletedRef = useRef(false);

  /* Body styles while mounted */
  useEffect(() => {
    const prev = {
      bg: document.body.style.background,
      color: document.body.style.color,
      ox: document.body.style.overflowX,
    };
    document.body.style.background = '#08080f';
    document.body.style.color = '#ffffff';
    document.body.style.overflowX = 'hidden';
    return () => {
      document.body.style.background = prev.bg;
      document.body.style.color = prev.color;
      document.body.style.overflowX = prev.ox;
    };
  }, []);

  /* Lock scroll during swiping phase */
  useEffect(() => {
    if (phase !== 'revealed') {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [phase]);

  /* Scroll reveal for below-fold content */
  useEffect(() => {
    if (!showContent) return;
    const els = pageRef.current?.querySelectorAll('.reveal');
    if (!els) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.target.classList.toggle('visible', e.isIntersecting)),
      { threshold: 0.04, rootMargin: '0px 0px -6% 0px' }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [showContent]);

  /* Scroll-driven page polish: progress + parallax intensity */
  useEffect(() => {
    const root = pageRef.current;
    if (!root) return;

    const onScroll = () => {
      const max = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      const progress = Math.min(window.scrollY / max, 1);
      const heroProgress = Math.min(window.scrollY / (window.innerHeight * 1.25), 1);
      root.style.setProperty('--sr-scroll-progress', progress.toFixed(4));
      root.style.setProperty('--sr-hero-progress', heroProgress.toFixed(4));
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  /* Staggered section entrances for below-fold blocks */
  useEffect(() => {
    if (!showContent) return;
    const root = pageRef.current;
    if (!root) return;

    const blocks = root.querySelectorAll('.sr-below-block');
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -2% 0px' }
    );

    blocks.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [showContent]);

  const handleComplete = useCallback(() => {
    if (hasCompletedRef.current) return;
    hasCompletedRef.current = true;
    setPhase('transitioning');
    setTimeout(() => {
      setPhase('revealed');
      setTimeout(() => {
        setShowContent(true);
      }, 900);
    }, 600);
  }, []);

  return (
    <div className="sr" ref={pageRef}>
      {/* Background glows */}
      <div className="sr-bg">
        <div className="sr-glow sr-glow--1" />
        <div className="sr-glow sr-glow--2" />
      </div>

      {/* Nav */}
      <nav className="sr-nav">
        <div className="sr-nav__inner">
          <a href="/" className="sr-nav__logo">
            <img src="/logo.png" alt="Pact" />
            Pact
          </a>
          <span className="sr-nav__pill">iOS · Coming Soon</span>
        </div>
        <div className="sr-scroll-progress" aria-hidden="true" />
      </nav>

      {/* ── Layered container: reveal BEHIND, cards ON TOP ── */}
      <div className="sr-stage">

        {/* BACK LAYER: Reveal content (always rendered, hidden behind cards) */}
        <div className={`sr-reveal${phase === 'revealed' ? ' sr-reveal--active' : ''}`}>
          {/* Radial glow burst */}
          <div className="sr-reveal__glow" />

          {/* Particle burst */}
          <div className="sr-reveal__particles">
            {PARTICLES.map((p, i) => (
              <div
                key={i}
                className="sr-particle"
                style={{
                  '--p-angle': `${p.angle}deg`,
                  '--p-dist': `${p.dist}px`,
                  '--p-size': `${p.size}px`,
                  '--p-delay': `${p.delay}s`,
                  '--p-color': p.color,
                }}
              />
            ))}
          </div>

          {/* Text */}
          <h1 className="sr-reveal__title">
            Do it or<br /><span>lose your apps.</span>
          </h1>
          <p className="sr-reveal__subtitle">
            Your group locks your most distracting apps until everyone proves they&apos;ve done the work. No excuses — your crew sees everything.
          </p>

          {/* Group tag */}
          <div className="sr-reveal__group">
            <div className="sr-reveal__avatars">
              {[['AJ','#6366f1'],['MK','#0f766e'],['SR','#b45309'],['JP','#be123c'],['TW','#7c3aed']].map(([init, bg]) => (
                <div key={init} className="sr-reveal__av" style={{ background: bg }}>{init}</div>
              ))}
            </div>
            <p className="sr-reveal__group-text"><strong>Join 900+ people</strong> holding each other accountable</p>
          </div>

          {/* Email form */}
          <div className="sr-reveal__form">
            <EmailForm id="swipe-reveal" />
          </div>
        </div>

        {/* FRONT LAYER: Swipe cards overlay */}
        <div className={`sr-swipe-phase${phase !== 'swiping' ? ' sr-swipe-phase--exit' : ''}`}>
          <SwipeStack onComplete={handleComplete} />
        </div>

      </div>

      {/* Below-fold content (after reveal) */}
      {showContent && (
        <div className="sr-below">
          <div className="sr-below-block sr-below-block--1">
            <HowItWorks />
          </div>
          <div className="sr-below-block sr-below-block--2">
            <Contact />
          </div>
          <div className="sr-below-block sr-below-block--3">
            <Footer />
          </div>
        </div>
      )}
    </div>
  );
}
