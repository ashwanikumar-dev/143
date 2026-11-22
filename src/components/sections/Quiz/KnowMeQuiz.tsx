'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionShell } from '@/components/layout/SectionShell';
import { EditorialHeading } from '@/components/ui/EditorialHeading';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { triggerConfetti } from '@/components/ui/Confetti';
import { getTier } from '@/lib/scoring';
import { useJourneyStore } from '@/store/journeyStore';
import { useAudio } from '@/hooks/useAudio';
import { content } from '@/config/content';

export const KnowMeQuiz: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const goToChapter = useJourneyStore((state) => state.goToChapter);
  const completeChapter = useJourneyStore((state) => state.completeChapter);
  const setStoreScore = useJourneyStore((state) => state.setScore);
  const { playSfx } = useAudio();

  const questions = content.quiz.questions;
  const currentQ = questions[currentIdx];

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);

    const isCorrect = currentQ.options[idx].isCorrect;
    if (isCorrect) {
      setScore((s) => s + 1);
      playSfx(content.audio.sfx.correct);
    } else {
      playSfx(content.audio.sfx.wrong);
    }

    // Auto-advance after 1.8 seconds
    setTimeout(() => {
      if (currentIdx + 1 < questions.length) {
        setCurrentIdx((prev) => prev + 1);
        setSelectedOption(null);
        setIsAnswered(false);
      } else {
        setIsFinished(true);
        const finalScore = isCorrect ? score + 1 : score;
        setStoreScore(3, finalScore);
        triggerConfetti({ preset: 'celebrate' });
      }
    }, 1800);
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setIsFinished(false);
  };

  const handleContinue = () => {
    completeChapter(3);
    goToChapter(4);
  };

  const resultTier = getTier(score, content.quiz.resultTiers);

  return (
    <SectionShell chapter={3} chapterName="Know Me Quiz" className="py-6 sm:py-10">
      <div className="w-full max-w-xl mx-auto flex flex-col items-center">
        <EditorialHeading
          chapterNumber={3}
          title={content.quiz.title}
          subtitle={content.quiz.subtitle}
          emphasisWord="Know"
        />

        {!isFinished ? (
          <div className="w-full space-y-6">
            {/* Progress bar */}
            <ProgressBar
              current={currentIdx + 1}
              total={questions.length}
              label={`Question ${currentIdx + 1} of ${questions.length}`}
            />

            {/* Question Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIdx}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
              >
                <GlassCard className="p-6 sm:p-8 space-y-6">
                  <h3 className="font-serif text-xl sm:text-2xl text-plum-700 font-medium leading-snug">
                    {currentQ.question}
                  </h3>

                  {/* Options List */}
                  <div className="space-y-3">
                    {currentQ.options.map((opt, idx) => {
                      let btnStateClass = 'bg-white/80 hover:bg-white text-plum-700 border-neutral-200/80';
                      if (isAnswered) {
                        if (opt.isCorrect) {
                          btnStateClass = 'bg-emerald-50 border-emerald-400 text-emerald-800 shadow-sm';
                        } else if (selectedOption === idx) {
                          btnStateClass = 'bg-rose-50 border-rose-300 text-rose-700 animate-shake';
                        } else {
                          btnStateClass = 'opacity-40 bg-neutral-50 border-neutral-200';
                        }
                      }

                      return (
                        <button
                          key={idx}
                          onClick={() => handleSelectOption(idx)}
                          disabled={isAnswered}
                          className={`w-full text-left p-4 rounded-xl border text-sm sm:text-base font-sans font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 ${btnStateClass}`}
                        >
                          <div className="flex items-center justify-between">
                            <span>{opt.text}</span>
                            {isAnswered && opt.isCorrect && <span>✓</span>}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Immediate Feedback Line */}
                  {isAnswered && (
                    <motion.p
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="font-hand text-lg text-rose-500 text-center italic pt-2"
                    >
                      {selectedOption !== null && currentQ.options[selectedOption].isCorrect
                        ? currentQ.funFeedbackCorrect
                        : currentQ.funFeedbackWrong}
                    </motion.p>
                  )}
                </GlassCard>
              </motion.div>
            </AnimatePresence>
          </div>
        ) : (
          /* Finished Result Card */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full"
          >
            <GlassCard className="p-8 text-center space-y-6">
              <span className="text-5xl">✨</span>
              <div className="space-y-2">
                <p className="font-sans text-xs uppercase tracking-widest font-semibold text-rose-500">
                  Quiz Completed • Score: {score} / {questions.length}
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
