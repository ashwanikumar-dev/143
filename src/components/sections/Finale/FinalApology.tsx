'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionShell } from '@/components/layout/SectionShell';
import { EditorialHeading } from '@/components/ui/EditorialHeading';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import { HugInteraction } from '@/components/sections/Extras/HugInteraction';
import { triggerConfetti } from '@/components/ui/Confetti';
import { useJourneyStore, FinalChoice } from '@/store/journeyStore';
import { useAudio } from '@/hooks/useAudio';
import { content } from '@/config/content';

export const FinalApology: React.FC = () => {
  const [selectedChoice, setSelectedChoice] = useState<FinalChoice>(null);
  const setStoreChoice = useJourneyStore((state) => state.setFinalChoice);
  const resetJourney = useJourneyStore((state) => state.resetJourney);
  const goToChapter = useJourneyStore((state) => state.goToChapter);
  const { playSfx } = useAudio();

  const handleSelect = (choice: 'time' | 'talk' | 'forgive') => {
    setSelectedChoice(choice);
    setStoreChoice(choice);

    if (choice === 'forgive') {
      playSfx(content.audio.sfx.confetti);
      triggerConfetti({ preset: 'celebrate' });
    } else if (choice === 'talk') {
      playSfx(content.audio.sfx.chime);
    } else {
      // quiet & peaceful
      playSfx(content.audio.sfx.chime);
    }
  };

  const choiceData = content.finale.responseOptions.find((opt) => opt.id === selectedChoice);

  return (
    <SectionShell chapter={9} chapterName="Finale" className="py-10 sm:py-16">
      <div className="w-full max-w-3xl mx-auto flex flex-col items-center">
        <EditorialHeading
          chapterNumber={9}
          title="From the Depths of My Heart"
          subtitle="Thank you for walking with me through every step of this journey."
          emphasisWord="Heart"
        />

        {/* Staged Apology Letter Section */}
        <div className="w-full space-y-6 mb-8">
          <GlassCard className="p-6 sm:p-10 space-y-5 border-rose-300/80 shadow-ambient text-center">
            {content.finale.apologyMessage.map((paragraph, idx) => (
              <p
                key={idx}
                className="font-serif text-lg sm:text-xl text-plum-700/95 leading-relaxed italic"
              >
                &ldquo;{paragraph}&rdquo;
              </p>
            ))}
          </GlassCard>

          {/* Three Promises Cards */}
          <div className="space-y-3">
            <p className="font-sans text-xs uppercase tracking-widest text-plum-500 font-semibold text-center mb-2">
              Three Sincere Promises to You
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {content.finale.promises.map((promise, idx) => (
                <GlassCard
                  key={idx}
                  className="p-5 border-l-4 border-l-rose-400 border-white/80 shadow-soft text-left flex flex-col justify-between"
                >
                  <p className="font-sans text-xs text-rose-500 font-semibold uppercase tracking-wider mb-2">
                    Promise {idx + 1}
                  </p>
                  <p className="font-sans text-sm text-plum-700 leading-relaxed">
                    {promise}
                  </p>
                </GlassCard>
              ))}
            </div>
          </div>
        </div>

        {/* The Heartfelt Question */}
        <div className="text-center my-6 space-y-3">
          <span className="text-4xl animate-pulse-soft inline-block">🌸</span>
          <h3 className="font-serif text-2xl sm:text-3xl text-plum-700 font-medium">
            {content.finale.bridgeQuestion}
          </h3>
          <p className="font-sans text-xs sm:text-sm text-plum-500 max-w-md mx-auto">
            Choose karo jaan niche m se kisi ak option ko 🥺🥺.
          </p>
        </div>

        {/* Three Equally-Weighted Choice Buttons */}
        {!selectedChoice ? (
          <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-4 my-4">
            {content.finale.responseOptions.map((opt) => (
              <button
                key={opt.id}
                onClick={() => handleSelect(opt.id)}
                className="w-full sm:w-[220px] min-h-[54px] px-6 py-3.5 rounded-pill bg-white/85 hover:bg-white text-plum-700 hover:text-plum-900 border border-blush-300/80 shadow-soft hover:shadow-glass hover:scale-102 transition-all duration-300 font-sans font-medium text-sm sm:text-base flex items-center justify-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 cursor-pointer"
              >
                <span>{opt.emoji}</span>
                <span>{opt.label}</span>
              </button>
            ))}
          </div>
        ) : (
          /* Staged Response Scene */
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="w-full my-4"
            >
              <GlassCard className="p-8 text-center space-y-5 border-rose-300 shadow-ambient">
                <span className="text-5xl">{choiceData?.emoji}</span>
                <div className="space-y-2">
                  <p className="font-sans text-xs uppercase tracking-widest text-rose-500 font-semibold">
                    You Selected: {choiceData?.label}
                  </p>
                  <p className="font-serif text-2xl text-plum-700 font-medium leading-relaxed italic max-w-xl mx-auto">
                    &ldquo;{choiceData?.reply}&rdquo;
                  </p>
                </div>

                <p className="font-sans text-sm text-plum-500/80 pt-2 border-t border-blush-200">
                  {content.finale.closingMessage}
                </p>

                {/* Journey controls */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
                  <Button
                    variant="soft"
                    size="md"
                    onClick={() => setSelectedChoice(null)}
                    className="w-full sm:w-auto"
                  >
                    Change Choice
                  </Button>
                  <Button
                    variant="soft"
                    size="md"
                    onClick={() => goToChapter(1)}
                    className="w-full sm:w-auto"
                  >
                    Revisit Love Letter
                  </Button>
                  <Button
                    variant="primary"
                    size="md"
                    onClick={resetJourney}
                    className="w-full sm:w-auto"
                  >
                    Replay Journey 🔄
                  </Button>
                </div>
              </GlassCard>
            </motion.div>
          </AnimatePresence>
        )}

        {/* Hug Interaction Extra */}
        <div className="w-full mt-10">
          <HugInteraction />
        </div>
      </div>
    </SectionShell>
  );
};
