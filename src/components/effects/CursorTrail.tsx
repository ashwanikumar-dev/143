'use client';

import React, { useEffect, useState } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useDeviceTier } from '@/hooks/useDeviceTier';

interface Point {
  x: number;
  y: number;
  id: number;
}

export const CursorTrail: React.FC = () => {
  const reducedMotion = useReducedMotion();
  const tier = useDeviceTier();
  const [points, setPoints] = useState<Point[]>([]);

  useEffect(() => {
    // Only enabled on desktop with high/balanced tier and no reduced motion
    if (reducedMotion || tier === 'lite' || typeof window === 'undefined') return;

    let counter = 0;
    const handleMouseMove = (e: MouseEvent) => {
      // Throttle trail creation
      counter++;
      if (counter % 3 !== 0) return;

      const newPoint: Point = {
        x: e.clientX,
        y: e.clientY,
        id: Date.now() + Math.random(),
      };

      setPoints((prev) => [...prev.slice(-8), newPoint]);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Clean up older points
    const interval = setInterval(() => {
      setPoints((prev) => (prev.length > 0 ? prev.slice(1) : prev));
    }, 120);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(interval);
    };
  }, [reducedMotion, tier]);

  if (reducedMotion || tier === 'lite') return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden" aria-hidden="true">
      {points.map((p, idx) => {
        const scale = (idx + 1) / points.length;
        const opacity = (idx + 1) / points.length;
        return (
          <div
            key={p.id}
            className="absolute -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 pointer-events-none"
            style={{
              left: p.x,
              top: p.y,
              transform: `scale(${scale})`,
              opacity: opacity * 0.45,
            }}
          >
            <span className="text-xs select-none text-rose-400">✨</span>
          </div>
        );
      })}
    </div>
  );
};
