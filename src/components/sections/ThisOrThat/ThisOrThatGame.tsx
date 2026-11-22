'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionShell } from '@/components/layout/SectionShell';
import { EditorialHeading } from '@/components/ui/EditorialHeading';
import { TiltCard } from '@/components/ui/TiltCard';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { triggerConfetti } from '@/components/ui/Confetti';
import { getTier } from '@/lib/scoring';
import { useJourneyStore } from '@/store/journeyStore';
import { useAudio } from '@/hooks/useAudio';
import { content } from '@/config/content';

export const ThisOrThatGame: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<'A' | 'B' | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const goToChapter = useJourneyStore((state) => state.goToChapter);
  const completeChapter = useJourneyStore((state) => state.completeChapter);
  const setStoreScore = useJourneyStore((state) => state.setScore);
  const { playSfx } = useAudio();

  const pairs = content.thisOrThat.pairs;
  const currentPair = pairs[currentIdx];

  const handleChoose = (choice: 'A' | 'B') => {
    if (isAnswered) return;
    setSelectedChoice(choice);
    setIsAnswered(true);

    const isMatch = choice === 'A' ? currentPair.optionA.isPreferred : currentPair.optionB.isPreferred;
    if (isMatch) {
      setScore((s) => s + 1);
      playSfx(content.audio.sfx.correct);
    } else {
      playSfx(content.audio.sfx.correct); // Playful either way
    }

    setTimeout(() => {
      if (currentIdx + 1 < pairs.length) {
        setCurrentIdx((prev) => prev + 1);
        setSelectedChoice(null);
        setIsAnswered(false);
      } else {
        setIsFinished(true);
        const finalScore = isMatch ? score + 1 : score;
        setStoreScore(4, finalScore);
        triggerConfetti({ preset: 'hearts' });
      }
    }, 1800);
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedChoice(null);
    setIsAnswered(false);
    setScore(0);
    setIsFinished(false);
  };

  const handleContinue = () => {
    completeChapter(4);
    goToChapter(5);
  };

  const resultTier = getTier(score, content.thisOrThat.resultTiers);

  return (
    <SectionShell chapter={4} chapterName="This or That" className="py-6 sm:py-10">
      <div className="w-full max-w-2xl mx-auto flex flex-col items-center">
        <EditorialHeading
          chapterNumber={4}
          title={content.thisOrThat.title}
          subtitle={content.thisOrThat.subtitle}
          emphasisWord="That"
        />

        {!isFinished ? (
          <div className="w-full space-y-6">
            <ProgressBar
              current={currentIdx + 1}
              total={pairs.length}
              label={`Choice ${currentIdx + 1} of ${pairs.length}`}
            />

            <h3 className="font-serif text-2xl text-center text-plum-700 font-medium">
              {currentPair.question}
            </h3>

            {/* Pair Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 pt-2">
              {/* Option A */}
              <TiltCard>
                <GlassCard
                  onClick={() => handleChoose('A')}
                  className={`p-6 sm:p-8 text-center cursor-pointer transition-all duration-300 flex flex-col items-center justify-center min-h-[190px] border-2 ${
                    isAnswered
                      ? selectedChoice === 'A'
                        ? 'border-rose-400 bg-rose-50/80 scale-102 shadow-glow-rose'
                        : 'opacity-40 border-transparent'
                      : 'border-white/90 hover:border-rose-300 hover:shadow-soft'
                  }`}
                >
                  <span className="text-4xl sm:text-5xl mb-3">{currentPair.optionA.emoji || '🌸'}</span>
                  <span className="font-sans font-medium text-plum-800 text-base sm:text-lg">
                    {currentPair.optionA.label}
                  </span>
                </GlassCard>
              </TiltCard>

              {/* Option B */}
              <TiltCard>
                <GlassCard
                  onClick={() => handleChoose('B')}
                  className={`p-6 sm:p-8 text-center cursor-pointer transition-all duration-300 flex flex-col items-center justify-center min-h-[190px] border-2 ${
                    isAnswered
                      ? selectedChoice === 'B'
                        ? 'border-rose-400 bg-rose-50/80 scale-102 shadow-glow-rose'
                        : 'opacity-40 border-transparent'
                      : 'border-white/90 hover:border-rose-300 hover:shadow-soft'
                  }`}
                >
                  <span className="text-4xl sm:text-5xl mb-3">{currentPair.optionB.emoji || '✨'}</span>
                  <span className="font-sans font-medium text-plum-800 text-base sm:text-lg">
                    {currentPair.optionB.label}
                  </span>
                </GlassCard>
              </TiltCard>
            </div>

            {/* Reveal Line */}
            {isAnswered && (
              <motion.p
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-hand text-xl text-rose-500 text-center italic pt-3"
              >
                &ldquo;{currentPair.revealMessage}&rdquo;
              </motion.p>
            )}
          </div>
        ) : (
          /* Finished State */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full"
          >
            <GlassCard className="p-8 text-center space-y-6">
              <span className="text-5xl">🥂</span>
              <div className="space-y-2">
                <p className="font-sans text-xs uppercase tracking-widest font-semibold text-rose-500">
                  All Choices Explored
                </p>
                <h3 className="font-serif text-3xl text-plum-700 font-medium">
                  {resultTier.title}
                </h3>
                <p className="font-serif text-lg text-plum-600/90 italic leading-relaxed max-w-md mx-auto">
                  &ldquo;{resultTier.message}&rdquo;
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
                <Button variant="soft" size="md" onClick={handleRestart} className="w-full sm:w-auto">
                  Play Again 🔄
                </Button>
                <Button variant="primary" size="md" onClick={handleContinue} className="w-full sm:w-auto">
                  Next Chapter →
                </Button>
              </div>
            </GlassCard>
          </motion.div>
        )}
      </div>
    </SectionShell>
  );
};
