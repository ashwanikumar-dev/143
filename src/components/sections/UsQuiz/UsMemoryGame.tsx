'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionShell } from '@/components/layout/SectionShell';
import { EditorialHeading } from '@/components/ui/EditorialHeading';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { triggerConfetti } from '@/components/ui/Confetti';
import { useJourneyStore } from '@/store/journeyStore';
import { useAudio } from '@/hooks/useAudio';
import { content } from '@/config/content';

export const UsMemoryGame: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const goToChapter = useJourneyStore((state) => state.goToChapter);
  const completeChapter = useJourneyStore((state) => state.completeChapter);
  const { playSfx } = useAudio();

  const questions = content.usQuiz.questions;
  const currentQ = questions[currentIdx];

  const handleReveal = () => {
    setIsRevealed(true);
    playSfx(content.audio.sfx.correct);
  };

  const handleNext = () => {
    if (currentIdx + 1 < questions.length) {
      setCurrentIdx((prev) => prev + 1);
      setIsRevealed(false);
    } else {
      setIsFinished(true);
      triggerConfetti({ preset: 'hearts' });
    }
  };

  const handleContinue = () => {
    completeChapter(5);
    goToChapter(6);
  };

  return (
    <SectionShell chapter={5} chapterName="Us Memories" className="py-6 sm:py-10">
      <div className="w-full max-w-xl mx-auto flex flex-col items-center">
        <EditorialHeading
          chapterNumber={5}
          title={content.usQuiz.title}
          subtitle={content.usQuiz.subtitle}
          emphasisWord="Us"
        />

        {!isFinished ? (
          <div className="w-full space-y-6">
            <ProgressBar
              current={currentIdx + 1}
              total={questions.length}
              label={`Memory ${currentIdx + 1} of ${questions.length}`}
            />

            <AnimatePresence mode="wait">
              <motion.div
                key={currentIdx}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
              >
                <GlassCard className="p-6 sm:p-8 space-y-6 text-center">
                  <div className="inline-block px-3 py-1 rounded-pill bg-rose-100/70 text-rose-600 text-xs font-sans uppercase tracking-wider font-semibold">
                    {currentQ.category}
                  </div>

                  <h3 className="font-serif text-2xl text-plum-700 font-medium leading-snug">
                    {currentQ.question}
                  </h3>

                  {currentQ.hint && (
                    <p className="font-sans text-xs italic text-plum-400">
                      Hint: {currentQ.hint}
                    </p>
                  )}

                  {!isRevealed ? (
                    <div className="pt-2">
                      <Button variant="primary" size="md" onClick={handleReveal} className="px-8 shadow-soft">
                        Reveal Memory 💭
                      </Button>
                    </div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="p-5 rounded-2xl bg-white/80 border border-blush-200 shadow-soft space-y-3"
                    >
                      <span className="text-3xl">💌</span>
                      <p className="font-hand text-2xl text-rose-500 font-medium">
                        &ldquo;{currentQ.answer}&rdquo;
                      </p>
                      <div className="pt-3">
                        <Button variant="primary" size="md" onClick={handleNext} className="px-6">
                          {currentIdx + 1 < questions.length ? 'Next Memory →' : 'See Summary →'}
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </GlassCard>
              </motion.div>
            </AnimatePresence>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full"
          >
            <GlassCard className="p-8 text-center space-y-6">
              <span className="text-5xl">🕊️</span>
              <div className="space-y-2">
                <p className="font-sans text-xs uppercase tracking-widest font-semibold text-rose-500">
                  Shared Journey
                </p>
                <h3 className="font-serif text-3xl text-plum-700 font-medium">
                  Treasured Moments
                </h3>
                <p className="font-serif text-lg text-plum-600/90 italic leading-relaxed max-w-md mx-auto">
                  &ldquo;Every single memory with you is a keepsake in my heart.&rdquo;
                </p>
              </div>

              <div className="pt-4">
                <Button variant="primary" size="lg" onClick={handleContinue} className="px-8 shadow-glow-rose">
                  Unlock Sweet Messages →
                </Button>
              </div>
            </GlassCard>
          </motion.div>
        )}
      </div>
    </SectionShell>
  );
};
