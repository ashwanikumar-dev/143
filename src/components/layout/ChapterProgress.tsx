'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useJourneyStore } from '@/store/journeyStore';
import { cn } from '@/lib/utils';

const chapterTitles = [
  'Welcome',
  'Letter',
  'Wheel',
  'Quiz',
  'This or That',
  'Us Quiz',
  'Sweet Notes',
  'Memories',
  'Catch Hearts',
  'Finale',
];

export const ChapterProgress: React.FC = () => {
  const currentChapter = useJourneyStore((state) => state.currentChapter);
  const completedChapters = useJourneyStore((state) => state.completedChapters);
  const secretHeartFound = useJourneyStore((state) => state.secretHeartFound);
  const goToChapter = useJourneyStore((state) => state.goToChapter);

  return (
    <nav
      aria-label="Journey Progress"
      className="fixed top-4 left-1/2 -translate-x-1/2 z-40 bg-white/75 backdrop-blur-md px-3 py-1.5 rounded-pill border border-white/85 shadow-soft flex items-center gap-1.5 sm:gap-2 select-none"
    >
      {chapterTitles.map((title, index) => {
        const isCurrent = currentChapter === index;
        const isCompleted = Array.isArray(completedChapters) && completedChapters.includes(index);

        return (
          <button
            key={index}
            onClick={() => {
              // Can navigate directly to any chapter or completed chapter
              goToChapter(index);
            }}
            className="group relative flex items-center justify-center p-1 rounded-full transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 cursor-pointer"
            aria-label={`Go to Chapter ${index + 1}: ${title}`}
            aria-current={isCurrent ? 'step' : undefined}
          >
            {/* The Dot indicator */}
            <motion.div
              layout
              className={cn(
                'rounded-full transition-all duration-300',
                isCurrent
                  ? 'w-5 h-2 sm:w-6 sm:h-2.5 bg-rose-500 shadow-glow-rose'
                  : isCompleted
                  ? 'w-2 h-2 sm:w-2.5 sm:h-2.5 bg-rose-300 hover:bg-rose-400'
                  : 'w-1.5 h-1.5 sm:w-2 sm:h-2 bg-plum-300/60 hover:bg-plum-400'
              )}
            />

            {/* Hover Tooltip with Chapter Title */}
            <span className="pointer-events-none absolute -bottom-7 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-md bg-plum-800 text-white text-[10px] font-sans whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-sm z-50">
              {title}
            </span>
          </button>
        );
      })}

      {/* Secret Heart Found Indicator */}
      {secretHeartFound && (
        <span
          title="Secret Heart Discovered! ✨"
          className="ml-1 text-xs animate-bounce"
          role="img"
          aria-label="Secret heart found badge"
        >
          💖
        </span>
      )}
    </nav>
  );
};
