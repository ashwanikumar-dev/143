'use client';

import React, { useMemo } from 'react';
import { useJourneyStore } from '@/store/journeyStore';
import { seededRandom } from '@/lib/random';

export const FloatingHearts: React.FC = () => {
  const reducedMotion = useJourneyStore((state) => state.reducedMotion);

  // High quality floating hearts count
  const heartCount = reducedMotion ? 0 : 14;

  const hearts = useMemo(() => {
    if (heartCount === 0) return [];
    const rng = seededRandom(1337);
    return Array.from({ length: heartCount }, (_, i) => ({
      id: i,
      left: `${(rng() * 92 + 4).toFixed(1)}%`,
      size: Math.floor(rng() * 16 + 16), // 16px to 32px
      duration: (rng() * 6 + 9).toFixed(1), // 9s to 15s rise time
      delay: (rng() * 10).toFixed(1), // staggered delays
      opacity: (rng() * 0.35 + 0.35).toFixed(2), // 0.35 to 0.70
    }));
  }, [heartCount]);

  if (heartCount === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-1 overflow-hidden" aria-hidden="true">
      {hearts.map((h) => (
        <div
          key={h.id}
          className="absolute bottom-0 animate-heart-float"
          style={{
            left: h.left,
            animationDuration: `${h.duration}s`,
            animationDelay: `-${h.delay}s`,
            opacity: h.opacity,
          }}
        >
          <svg
            width={h.size}
            height={h.size}
            viewBox="0 0 24 24"
            fill="currentColor"
            className="text-rose-400 drop-shadow-sm"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>
      ))}
    </div>
  );
};
