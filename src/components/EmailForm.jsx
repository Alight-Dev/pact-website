import { useState, useCallback } from 'react';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';

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

/* ── Form component ── */
export default function EmailForm({ id }) {
  const [email, setEmail]       = useState('');
  const [result, setResult]     = useState(null);   // null | { ok, msg }
  const [loading, setLoading]   = useState(false);
  const [success, setSuccess]   = useState(false);
  const [shake, setShake]       = useState(false);

  const handleChange = (e) => {
    setEmail(e.target.value);
    if (result && !result.ok) setResult(null);
  };

  const handleSubmit = useCallback(async () => {
    const res = validate(email);
    setResult(res);
    if (!res.ok) {
      setShake(true);
      setTimeout(() => setShake(false), 400);
      return;
    }
    setLoading(true);
    try {
      const normalised = email.trim().toLowerCase();
      await setDoc(doc(db, 'waitlist', normalised), {
        email:     normalised,
        source:    id,
        createdAt: serverTimestamp(),
      });
      setSuccess(true);
    } catch (err) {
      console.error('Waitlist write failed:', err);
      setResult({ ok: false, msg: 'Something went wrong — please try again.' });
    } finally {
      setLoading(false);
    }
  }, [email, id]);

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
          {result.ok ? `\u2713 ${result.msg}` : result.msg}
        </p>
      )}
      <p className="form-note">No spam. One email when we launch.</p>
    </div>
  );
}
