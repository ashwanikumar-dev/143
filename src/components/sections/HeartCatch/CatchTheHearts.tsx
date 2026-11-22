'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { SectionShell } from '@/components/layout/SectionShell';
import { EditorialHeading } from '@/components/ui/EditorialHeading';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import { HeartFilled } from '@/components/illustrations/Hearts';
import { triggerConfetti } from '@/components/ui/Confetti';
import { getTier } from '@/lib/scoring';
import { useJourneyStore } from '@/store/journeyStore';
import { useAudio } from '@/hooks/useAudio';
import { useGameLoop } from '@/hooks/useGameLoop';
import { content } from '@/config/content';

interface FallingHeart {
  id: number;
  x: number; // percentage (0-100)
  y: number; // percentage (0-100)
  speed: number; // percentage per second
  size: number;
  isGolden: boolean;
  isCaught: boolean;
}

export const CatchTheHearts: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(content.heartGame.duration);
  const [catcherX, setCatcherX] = useState(50); // percentage (0-100)
  const [hearts, setHearts] = useState<FallingHeart[]>([]);

  const containerRef = useRef<HTMLDivElement>(null);
  const spawnTimerRef = useRef(0);
  const nextIdRef = useRef(1);

  const goToChapter = useJourneyStore((state) => state.goToChapter);
  const completeChapter = useJourneyStore((state) => state.completeChapter);
  const setStoreScore = useJourneyStore((state) => state.setScore);
  const { playSfx } = useAudio();

  const handleStartGame = () => {
    setIsPlaying(true);
    setIsPaused(false);
    setIsFinished(false);
    setScore(0);
    setTimeLeft(content.heartGame.duration);
    setHearts([]);
    spawnTimerRef.current = 0;
  };

  // Keyboard controls for catcher
  useEffect(() => {
    if (!isPlaying || isPaused || isFinished) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'a') {
        setCatcherX((x) => Math.max(10, x - 8));
      } else if (e.key === 'ArrowRight' || e.key === 'd') {
        setCatcherX((x) => Math.min(90, x + 8));
      } else if (e.key === 'Escape' || e.key === 'p') {
        setIsPaused((p) => !p);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying, isPaused, isFinished]);

  // Touch & Mouse movement controls for catcher
  const handlePointerMove = (clientX: number) => {
    if (!containerRef.current || !isPlaying || isPaused) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 100;
    setCatcherX(Math.max(10, Math.min(90, x)));
  };

  // Visibility change pauses game
  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden && isPlaying && !isFinished) {
        setIsPaused(true);
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, [isPlaying, isFinished]);

  // Game loop updating hearts and collisions
  const updateGame = useCallback(
    (delta: number) => {
      if (!isPlaying || isPaused || isFinished) return;

      // Update timer countdown
      setTimeLeft((t) => {
        const nextTime = Math.max(0, t - delta);
        if (nextTime <= 0) {
          setIsFinished(true);
          setIsPlaying(false);
          setStoreScore(8, score);
          if (score >= content.heartGame.targetScore) {
            triggerConfetti({ preset: 'hearts' });
          }
        }
        return nextTime;
      });

      // Spawn hearts
      spawnTimerRef.current += delta;
      if (spawnTimerRef.current >= 1 / content.heartGame.spawnRate) {
        spawnTimerRef.current = 0;
        const isGolden = Math.random() < content.heartGame.goldenHeartChance;
        const newHeart: FallingHeart = {
          id: nextIdRef.current++,
          x: Math.random() * 80 + 10,
          y: -5,
          speed: Math.random() * 20 + 25, // 25-45% per second
          size: isGolden ? 32 : 24,
          isGolden,
          isCaught: false,
        };
        setHearts((prev) => [...prev, newHeart]);
      }

      // Move hearts and check catcher collision
      setHearts((prev) =>
        prev
          .map((h) => {
            if (h.isCaught) return h;
            const nextY = h.y + h.speed * delta;

            // Collision check with catcher at bottom (y ~ 82% to 92%)
            if (nextY >= 80 && nextY <= 90 && Math.abs(h.x - catcherX) < 14) {
              // Caught!
              const points = h.isGolden ? 3 : 1;
              setScore((s) => s + points);
              playSfx(content.audio.sfx.heartPop);
              return { ...h, y: nextY, isCaught: true };
            }

            return { ...h, y: nextY };
          })
          .filter((h) => h.y < 105 && !h.isCaught)
      );
    },
    [isPlaying, isPaused, isFinished, catcherX, score, setStoreScore, playSfx]
  );

  useGameLoop(updateGame, isPlaying && !isPaused && !isFinished);

  const handleContinue = () => {
    completeChapter(8);
    goToChapter(9);
  };

  const resultTier = getTier(score, content.heartGame.resultTiers);

  return (
    <SectionShell chapter={8} chapterName="Catch the Hearts" className="py-6 sm:py-10">
      <div className="w-full max-w-xl mx-auto flex flex-col items-center">
        <EditorialHeading
          chapterNumber={8}
          title="Catch the Falling Hearts"
          subtitle="Move the basket to catch every piece of love falling from the sky."
          emphasisWord="Hearts"
        />

        {!isPlaying && !isFinished ? (
          /* Start Screen */
          <GlassCard className="p-8 text-center space-y-6 w-full">
            <span className="text-5xl animate-bounce">🧺</span>
            <div className="space-y-2">
              <h3 className="font-serif text-2xl text-plum-700 font-medium">
                Ready to Catch My Love?
              </h3>
              <p className="font-sans text-sm text-plum-600/90 max-w-sm mx-auto">
                Use your mouse, touch drag, or keyboard arrow keys (← / →) to move the basket.
                Catch golden hearts for bonus love!
              </p>
            </div>
            <div className="pt-2">
              <Button variant="primary" size="lg" onClick={handleStartGame} className="px-8 shadow-glow-rose">
                Start Game ✨
              </Button>
            </div>
          </GlassCard>
        ) : isPlaying ? (
          /* Active Game Area */
          <div className="w-full space-y-3">
            {/* HUD Bar */}
            <div className="flex items-center justify-between px-4 py-2 rounded-card bg-white/75 backdrop-blur-md border border-white/80 shadow-soft text-sm font-sans font-medium text-plum-700">
              <div className="flex items-center gap-1.5">
                <span>Score:</span>
                <span className="text-rose-500 font-bold text-base">{score}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span>Time:</span>
                <span className="font-mono text-base font-bold text-plum-800">
                  {Math.ceil(timeLeft)}s
                </span>
              </div>
              <button
                onClick={() => setIsPaused((p) => !p)}
                className="text-xs px-2.5 py-1 rounded-pill bg-cream-100 hover:bg-cream-200 border border-neutral-200"
              >
                {isPaused ? 'Resume ▶' : 'Pause ⏸'}
              </button>
            </div>

            {/* Playfield Canvas */}
            <div
              ref={containerRef}
              onMouseMove={(e) => handlePointerMove(e.clientX)}
              onTouchMove={(e) => handlePointerMove(e.touches[0].clientX)}
              className="relative w-full h-[360px] sm:h-[400px] rounded-card-lg bg-gradient-to-b from-white/40 via-white/60 to-rose-50/70 backdrop-blur-xl border border-white/90 shadow-ambient overflow-hidden touch-none select-none"
              style={{ touchAction: 'none' }}
            >
              {/* Falling Hearts */}
              {hearts.map((h) => (
                <div
                  key={h.id}
                  className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-transform"
                  style={{
                    left: `${h.x}%`,
                    top: `${h.y}%`,
                  }}
                >
                  <HeartFilled
                    size={h.size}
                    className={h.isGolden ? 'text-amber-400 drop-shadow-md animate-pulse' : 'text-rose-400'}
                  />
                </div>
              ))}

              {/* Basket Catcher Element */}
              <div
                className="absolute bottom-5 -translate-x-1/2 flex flex-col items-center pointer-events-none transition-all duration-75"
                style={{ left: `${catcherX}%` }}
              >
                <div className="w-16 sm:w-20 h-9 rounded-b-2xl rounded-t-sm bg-gradient-to-r from-amber-200 via-amber-300 to-amber-200 border-2 border-amber-400 shadow-md flex items-center justify-center text-lg">
                  🧺
                </div>
              </div>

              {/* Pause Overlay */}
              {isPaused && (
                <div className="absolute inset-0 bg-plum-900/40 backdrop-blur-xs flex items-center justify-center">
                  <div className="text-center bg-white/90 px-6 py-4 rounded-card shadow-soft space-y-2">
                    <p className="font-serif text-xl text-plum-700">Paused</p>
                    <Button variant="primary" size="sm" onClick={() => setIsPaused(false)}>
                      Resume
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Finished End Screen */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full"
          >
            <GlassCard className="p-8 text-center space-y-6">
              <span className="text-5xl">💖</span>
              <div className="space-y-2">
                <p className="font-sans text-xs uppercase tracking-widest font-semibold text-rose-500">
                  Game Over • Final Score: {score}
                </p>
                <h3 className="font-serif text-3xl text-plum-700 font-medium">
                  {resultTier.title}
                </h3>
                <p className="font-serif text-lg text-plum-600/90 italic leading-relaxed max-w-md mx-auto">
                  &ldquo;{resultTier.message}&rdquo;
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
                <Button variant="soft" size="md" onClick={handleStartGame} className="w-full sm:w-auto">
                  Play Again 🔄
                </Button>
                <Button variant="primary" size="md" onClick={handleContinue} className="w-full sm:w-auto">
                  Final Apology →
                </Button>
              </div>
            </GlassCard>
          </motion.div>
        )}
      </div>
    </SectionShell>
  );
};
