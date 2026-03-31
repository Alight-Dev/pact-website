import { useRef, useCallback } from 'react';

export default function SwipeCard({ activity, onSwipe, isTop, style }) {
  const cardRef = useRef(null);
  const dragState = useRef({ active: false, startX: 0, startY: 0, dx: 0 });

  const onPointerDown = useCallback((e) => {
    if (!isTop) return;
    const el = cardRef.current;
    if (!el) return;
    el.setPointerCapture(e.pointerId);
    el.style.transition = 'none';
    dragState.current = { active: true, startX: e.clientX, startY: e.clientY, dx: 0 };
  }, [isTop]);

  const onPointerMove = useCallback((e) => {
    if (!dragState.current.active) return;
    const dx = e.clientX - dragState.current.startX;
    dragState.current.dx = dx;
    const el = cardRef.current;
    if (!el) return;
    const rotate = dx * 0.06;
    el.style.transform = `translateX(${dx}px) rotate(${rotate}deg)`;

    // Update stamp opacity
    const approveStamp = el.querySelector('.sc-stamp--approve');
    const rejectStamp = el.querySelector('.sc-stamp--reject');
    if (approveStamp) approveStamp.style.opacity = Math.min(Math.max(dx / 100, 0), 1);
    if (rejectStamp) rejectStamp.style.opacity = Math.min(Math.max(-dx / 100, 0), 1);
  }, []);

  const onPointerUp = useCallback((e) => {
    if (!dragState.current.active) return;
    dragState.current.active = false;
    const el = cardRef.current;
    if (!el) return;
    el.releasePointerCapture(e.pointerId);

    const dx = dragState.current.dx;
    const threshold = window.innerWidth < 480 ? 80 : 100;

    if (Math.abs(dx) > threshold) {
      // Swipe off
      const dir = dx > 0 ? 'right' : 'left';
      const flyX = dx > 0 ? window.innerWidth : -window.innerWidth;
      el.style.transition = 'transform 0.45s cubic-bezier(0.2, 0, 0, 1), opacity 0.45s ease';
      el.style.transform = `translateX(${flyX}px) rotate(${dx > 0 ? 25 : -25}deg)`;
      el.style.opacity = '0';
      setTimeout(() => onSwipe(dir), 400);
    } else {
      // Spring back
      el.style.transition = 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
      el.style.transform = 'translateX(0) rotate(0)';
      const approveStamp = el.querySelector('.sc-stamp--approve');
      const rejectStamp = el.querySelector('.sc-stamp--reject');
      if (approveStamp) approveStamp.style.opacity = '0';
      if (rejectStamp) rejectStamp.style.opacity = '0';
    }
  }, [onSwipe]);

  const triggerSwipe = useCallback((dir) => {
    const el = cardRef.current;
    if (!el) return;
    const flyX = dir === 'right' ? window.innerWidth : -window.innerWidth;
    const stamp = el.querySelector(dir === 'right' ? '.sc-stamp--approve' : '.sc-stamp--reject');
    if (stamp) {
      stamp.style.transition = 'opacity 0.15s ease';
      stamp.style.opacity = '1';
    }
    el.style.transition = 'transform 0.5s cubic-bezier(0.2, 0, 0, 1), opacity 0.5s ease';
    el.style.transform = `translateX(${flyX}px) rotate(${dir === 'right' ? 25 : -25}deg)`;
    el.style.opacity = '0';
    setTimeout(() => onSwipe(dir), 450);
  }, [onSwipe]);

  return (
    <div
      ref={cardRef}
      className={`sc-card${isTop ? ' sc-card--active' : ''}`}
      style={style}
      onPointerDown={isTop ? onPointerDown : undefined}
      onPointerMove={isTop ? onPointerMove : undefined}
      onPointerUp={isTop ? onPointerUp : undefined}
      data-trigger-swipe={isTop ? 'true' : undefined}
      // expose trigger function via ref callback
      {...(isTop ? { 'data-card-top': 'true' } : {})}
    >
      {/* Stamp overlays */}
      <div className="sc-stamp sc-stamp--approve">APPROVED</div>
      <div className="sc-stamp sc-stamp--reject">NOPE</div>

      {/* Card accent glow */}
      <div className="sc-accent" style={{ '--accent': activity.color }} />

      {/* Image */}
      <div className="sc-image-wrap">
        <img src={activity.image} alt={activity.title} className="sc-image" draggable="false" />
        <div className="sc-image-overlay" />
      </div>

      {/* Content */}
      <div className="sc-content">
        <h3 className="sc-title">{activity.title}</h3>
        <p className="sc-desc">{activity.desc}</p>
        <div className="sc-tag">
          <span className="sc-tag-dot" style={{ background: activity.color }} />
          Daily Challenge
        </div>
      </div>

      {/* Bottom gradient strip */}
      <div className="sc-strip" style={{ background: `linear-gradient(90deg, ${activity.color}22, ${activity.color}66, ${activity.color}22)` }} />

      {/* Expose triggerSwipe for button usage */}
      {isTop && (
        <button
          className="sc-trigger-btn"
          style={{ display: 'none' }}
          ref={(btn) => {
            if (btn) btn._triggerSwipe = triggerSwipe;
          }}
        />
      )}
    </div>
  );
}
