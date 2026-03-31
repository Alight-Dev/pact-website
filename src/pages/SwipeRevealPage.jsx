import { useEffect, useState, useCallback, useRef } from 'react';
import SwipeStack from '../components/SwipeStack';
import EmailForm from '../components/EmailForm';
import HowItWorks from '../components/HowItWorks';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import './SwipeRevealPage.css';

const PARTICLES = Array.from({ length: 16 }, (_, i) => ({
  angle: (360 / 16) * i + Math.random() * 15,
  dist: 80 + Math.random() * 140,
  size: 3 + Math.random() * 4,
  delay: Math.random() * 0.3,
  color: ['#6366f1', '#a5b4fc', '#8b5cf6', '#c4b5fd', '#818cf8'][Math.floor(Math.random() * 5)],
}));

export default function SwipeRevealPage() {
  const [phase, setPhase] = useState('swiping');
  const [revealed, setRevealed] = useState(false);
  const pageRef = useRef(null);
  const hasCompletedRef = useRef(false);

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

  /* Scroll reveal for .reveal elements */
  useEffect(() => {
    const root = pageRef.current;
    if (!root) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          obs.unobserve(e.target);
        }
      }),
      { threshold: 0.04, rootMargin: '0px 0px -6% 0px' }
    );
    root.querySelectorAll('.reveal').forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  /* Scroll progress bar */
  useEffect(() => {
    const root = pageRef.current;
    if (!root) return;
    const onScroll = () => {
      const max = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      root.style.setProperty('--sr-scroll-progress', Math.min(window.scrollY / max, 1).toFixed(4));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Below-fold block entrance */
  useEffect(() => {
    const root = pageRef.current;
    if (!root) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          obs.unobserve(entry.target);
        }
      }),
      { threshold: 0.08, rootMargin: '0px 0px -2% 0px' }
    );
    root.querySelectorAll('.sr-below-block').forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const handleComplete = useCallback(() => {
    if (hasCompletedRef.current) return;
    hasCompletedRef.current = true;
    setPhase('transitioning');
    setTimeout(() => {
      setPhase('revealed');
      setTimeout(() => setRevealed(true), 400);
    }, 500);
  }, []);

  return (
    <div className="sr" ref={pageRef}>
      <div className="sr-bg">
        <div className="sr-glow sr-glow--1" />
        <div className="sr-glow sr-glow--2" />
      </div>

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

      {/* Hero — full viewport, swipe cards on top, reveal underneath */}
      <section className="sr-hero">
        <div className={`sr-reveal${revealed ? ' sr-reveal--active' : ''}`}>
          <div className="sr-reveal__glow" />
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

          <h1 className="sr-reveal__title">
            Do it or<br /><span>lose your apps.</span>
          </h1>
          <p className="sr-reveal__subtitle">
            Your group locks your most distracting apps until everyone proves they&apos;ve done the work. No excuses — your crew sees everything.
          </p>

          <div className="sr-reveal__group">
            <div className="sr-reveal__avatars">
              {[['AJ','#6366f1'],['MK','#0f766e'],['SR','#b45309'],['JP','#be123c'],['TW','#7c3aed']].map(([init, bg]) => (
                <div key={init} className="sr-reveal__av" style={{ background: bg }}>{init}</div>
              ))}
            </div>
            <p className="sr-reveal__group-text"><strong>Join 900+ people</strong> holding each other accountable</p>
          </div>

          <div className="sr-reveal__form">
            <EmailForm id="swipe-reveal" />
          </div>
        </div>

        {/* Swipe overlay */}
        <div className={`sr-swipe-phase${phase !== 'swiping' ? ' sr-swipe-phase--exit' : ''}`}>
          <SwipeStack onComplete={handleComplete} />
        </div>
      </section>

      {/* Below-fold — always in DOM, always scrollable */}
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
    </div>
  );
}
