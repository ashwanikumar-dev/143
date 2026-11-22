'use client';

import React from 'react';
import { useJourneyStore } from '@/store/journeyStore';

interface AuroraBackgroundProps {
  chapter?: number;
}

// Chapter color palettes for temperature progression
const chapterPalettes: Record<number, { c1: string; c2: string; c3: string; c4: string }> = {
  // 0: Welcome (warm dawn)
  0: { c1: '#FDDDE6', c2: '#FFCBA4', c3: '#E8D5F5', c4: '#FFF8F0' },
  // 1: Letter (cream paper warmth)
  1: { c1: '#FFF8F0', c2: '#FDDDE6', c3: '#FFB3C6', c4: '#F3E8FF' },
  // 2: Wheel (magical soft lavender & rose)
  2: { c1: '#C4B5FD', c2: '#F9A8D4', c3: '#FDDDE6', c4: '#FFEBD9' },
  // 3: Quiz (playful blush & peach)
  3: { c1: '#FDDDE6', c2: '#FFD6A5', c3: '#FFF8F0', c4: '#E9D5FF' },
  // 4: This or That (warm rose & amber)
  4: { c1: '#FECDD3', c2: '#FED7AA', c3: '#F3E8FF', c4: '#FFF1F2' },
  // 5: Us Quiz (nostalgic twilight)
  5: { c1: '#E9D5FF', c2: '#FDDDE6', c3: '#FFCBA4', c4: '#FFF8F0' },
  // 6: Sweet Cards (golden hour)
  6: { c1: '#F9A8D4', c2: '#FDE68A', c3: '#DDD6FE', c4: '#FFE4E6' },
  // 7: Memories (nostalgic warm amber)
  7: { c1: '#FFF8F0', c2: '#FFCBA4', c3: '#FFB3C6', c4: '#E9D5FF' },
  // 8: Catch the Hearts (vibrant romantic glow)
  8: { c1: '#FDDDE6', c2: '#F472B6', c3: '#C4B5FD', c4: '#FFCBA4' },
  // 9: Finale (candlelight & deep dusk plum)
  9: { c1: '#7C3A5E', c2: '#F472B6', c3: '#FDDDE6', c4: '#FFD6A5' },
};

export const AuroraBackground: React.FC<AuroraBackgroundProps> = ({ chapter = 0 }) => {
  const reducedMotion = useJourneyStore((state) => state.reducedMotion);
  const colors = chapterPalettes[chapter] || chapterPalettes[0];

  return (
    <div
      className="fixed inset-0 pointer-events-none -z-10 overflow-hidden bg-cream-100 transition-colors duration-1000"
      aria-hidden="true"
    >
      {/* Aurora Blob 1 - Top Left */}
      <div
        className={`absolute -top-[15%] -left-[10%] w-[75vw] h-[75vw] max-w-[850px] max-h-[850px] rounded-full blur-[80px] md:blur-[110px] opacity-75 transition-all duration-1000 ${
          reducedMotion ? '' : 'animate-aurora-1'
        }`}
        style={{
          background: `radial-gradient(circle, ${colors.c1} 0%, transparent 70%)`,
        }}
      />

      {/* Aurora Blob 2 - Top Right */}
      <div
        className={`absolute -top-[10%] -right-[15%] w-[70vw] h-[70vw] max-w-[800px] max-h-[800px] rounded-full blur-[70px] md:blur-[100px] opacity-70 transition-all duration-1000 ${
          reducedMotion ? '' : 'animate-aurora-2'
        }`}
        style={{
          background: `radial-gradient(circle, ${colors.c2} 0%, transparent 70%)`,
        }}
      />

      {/* Aurora Blob 3 - Bottom Center */}
      <div
        className={`absolute -bottom-[15%] left-[10%] w-[80vw] h-[80vw] max-w-[900px] max-h-[900px] rounded-full blur-[90px] md:blur-[120px] opacity-65 transition-all duration-1000 ${
          reducedMotion ? '' : 'animate-aurora-3'
        }`}
        style={{
          background: `radial-gradient(circle, ${colors.c3} 0%, transparent 70%)`,
        }}
      />

      {/* Aurora Blob 4 - Center Highlight */}
      <div
        className="absolute top-[30%] left-[25%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] rounded-full blur-[90px] opacity-45 animate-pulse-soft"
        style={{
          background: `radial-gradient(circle, ${colors.c4} 0%, transparent 70%)`,
          animationDuration: '6s',
        }}
      />
    </div>
  );
};
