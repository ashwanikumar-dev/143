'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/GlassCard';
import { useAudio } from '@/hooks/useAudio';
import { content } from '@/config/content';

export const HugInteraction: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const holdIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const { playSfx } = useAudio();

  const handleStartHold = () => {
    if (isCompleted) return;
    holdIntervalRef.current = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          if (holdIntervalRef.current) clearInterval(holdIntervalRef.current);
          setIsCompleted(true);
          playSfx(content.audio.sfx.chime);
          return 100;
        }
        return p + 5;
      });
    }, 80);
  };

  const handleEndHold = () => {
    if (isCompleted) return;
    if (holdIntervalRef.current) clearInterval(holdIntervalRef.current);
    // Slowly discharge if released early
    const discharge = setInterval(() => {
      setProgress((p) => {
        if (p <= 0) {
          clearInterval(discharge);
          return 0;
        }
        return p - 10;
      });
    }, 50);
  };

  useEffect(() => {
    return () => {
      if (holdIntervalRef.current) clearInterval(holdIntervalRef.current);
    };
  }, []);

  return (
    <GlassCard className="p-6 text-center border-rose-200/60 shadow-soft max-w-sm mx-auto">
      <div className="flex flex-col items-center space-y-3">
        <div
          onMouseDown={handleStartHold}
          onMouseUp={handleEndHold}
          onTouchStart={handleStartHold}
          onTouchEnd={handleEndHold}
          className="relative w-24 h-24 rounded-full bg-cream-100 border-2 border-rose-300 flex items-center justify-center cursor-pointer select-none overflow-hidden transition-transform active:scale-95 shadow-inner"
        >
          {/* Progress fill */}
          <div
            className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-rose-400 to-rose-300 transition-all duration-75"
            style={{ height: `${progress}%` }}
          />

          <span className="relative z-10 text-4xl">
            {isCompleted ? '🤗' : '🫂'}
          </span>
        </div>

        <div>
          <p className="font-serif text-lg text-plum-700 font-medium">
            {isCompleted ? 'Mene Catch krliyaa babyyyyyyy ❤️' : 'Mko Warm hug bhejo upr hold krke'}
          </p>
          <p className="font-sans text-xs text-plum-500 mt-0.5">
            {isCompleted
              ? 'Wrap your arms around yourself — it\'s coming straight from me.'
              : 'Press and hold the circle to fill it with warmth'}
          </p>
        </div>
      </div>
    </GlassCard>
  );
};
