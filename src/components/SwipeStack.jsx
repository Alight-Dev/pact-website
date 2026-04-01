import { useState, useCallback, useRef } from 'react';
import SwipeCard from './SwipeCard';

const ACTIVITIES = [
  { image: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=400&h=300&fit=crop&q=80', title: 'Morning Run',    desc: '5K before the world wakes up',  color: '#22c55e' },
  { image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=300&fit=crop&q=80', title: 'Gym Workout',    desc: 'Iron sharpens iron',            color: '#f59e0b' },
  { image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=300&fit=crop&q=80', title: '30 Min Reading', desc: 'Feed your mind, not your feed', color: '#6366f1' },
];

export default function SwipeStack({ onComplete }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [interactions, setInteractions] = useState(0);
  const stackRef = useRef(null);
  const hasCompletedRef = useRef(false);

  const handleSwipe = useCallback(() => {
    setInteractions((prev) => {
      const next = prev + 1;
      if (next >= ACTIVITIES.length && !hasCompletedRef.current) {
        hasCompletedRef.current = true;
        setTimeout(() => onComplete(), 300);
      }
      return next;
    });
    setCurrentIndex((prev) => prev + 1);
  }, [onComplete]);

  const triggerButtonSwipe = useCallback((dir) => {
    const stack = stackRef.current;
    if (!stack) return;
    const topCard = stack.querySelector('[data-card-top]');
    if (!topCard) return;
    const btn = topCard.querySelector('.sc-trigger-btn');
    if (btn && btn._triggerSwipe) {
      btn._triggerSwipe(dir);
    }
  }, []);

  const remaining = ACTIVITIES.slice(currentIndex);
  const visible = remaining.slice(0, 3);

  return (
    <div className="ss-container">
      {/* Instruction */}
      <div className="ss-instruction">
        <p className="ss-inst-text">Earn Your Unlock</p>
        <p className="ss-inst-sub">Use the buttons to approve or reject</p>
      </div>

      {/* Card stack */}
      <div className="ss-stack" ref={stackRef}>
        {visible.map((activity, i) => {
          const stackIndex = i;
          const scale = 1 - stackIndex * 0.05;
          const translateY = stackIndex * 14;
          const opacity = 1 - stackIndex * 0.3;

          return (
            <SwipeCard
              key={`${activity.title}-${currentIndex + i}`}
              activity={activity}
              isTop={i === 0}
              allowDrag={false}
              onSwipe={handleSwipe}
              style={{
                '--stack-scale': scale,
                '--stack-y': `${translateY}px`,
                '--stack-opacity': opacity,
                '--stack-z': 10 - stackIndex,
              }}
            />
          );
        })}

        {/* Empty state is intentionally blank — reveal animates in behind */}
      </div>

      {/* Buttons */}
      <div className="ss-buttons">
        <button
          className="ss-btn ss-btn--reject"
          onClick={() => triggerButtonSwipe('left')}
          aria-label="Reject"
          disabled={visible.length === 0}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
        <button
          className="ss-btn ss-btn--approve"
          onClick={() => triggerButtonSwipe('right')}
          aria-label="Approve"
          disabled={visible.length === 0}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </button>
      </div>

      {/* Progress dots */}
      <div className="ss-progress">
        {[0, 1, 2].map((dot) => (
          <div
            key={dot}
            className={`ss-dot${interactions > dot ? ' ss-dot--filled' : ''}${interactions === dot ? ' ss-dot--active' : ''}`}
          />
        ))}
      </div>
    </div>
  );
}
