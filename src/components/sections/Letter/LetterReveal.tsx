'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SectionShell } from '@/components/layout/SectionShell';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import { PenFlourish } from '@/components/illustrations/PenFlourish';
import { WaxSeal } from '@/components/illustrations/WaxSeal';
import { Sprig } from '@/components/illustrations/Botanicals';
import { SecretHeart } from '@/components/sections/Extras/SecretHeart';
import { useTypewriter } from '@/hooks/useTypewriter';
import { useJourneyStore } from '@/store/journeyStore';
import { content } from '@/config/content';

export const LetterReveal: React.FC = () => {
  const [hasFinishedTyping, setHasFinishedTyping] = useState(false);
  const goToChapter = useJourneyStore((state) => state.goToChapter);
  const completeChapter = useJourneyStore((state) => state.completeChapter);

  // Combine letter paragraphs into single typewriter stream
  const fullText = content.letter.paragraphs.join('\n\n');

  const { displayText, isComplete, skip } = useTypewriter(fullText, {
    speed: 18,
    initialDelay: 200,
    onComplete: () => setHasFinishedTyping(true),
  });

  const handleContinue = () => {
    completeChapter(1);
    goToChapter(2);
  };

  return (
    <SectionShell chapter={1} chapterName="Personal Letter" className="py-8 sm:py-12">
      <div className="w-full max-w-2xl mx-auto flex flex-col items-center">
        {/* Paper-textured Love Letter Card */}
        <GlassCard className="relative w-full bg-[#FFFDF9]/95 backdrop-blur-2xl p-6 sm:p-10 md:p-12 shadow-ambient border border-blush-200/90 rounded-card-lg overflow-hidden">
          {/* Subtle paper top edge highlight */}
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-rose-300/50 to-transparent" />

          {/* Skip animation control button */}
          {!isComplete && !hasFinishedTyping && (
            <button
              onClick={skip}
              className="absolute top-4 right-4 text-xs font-sans text-plum-500 hover:text-plum-800 bg-white/80 hover:bg-white px-3 py-1 rounded-pill border border-rose-200 transition-all shadow-2xs cursor-pointer"
            >
              Skip animation ⏩
            </button>
          )}

          {/* Decorative Pen Calligraphy Header */}
          <div className="flex flex-col items-center mb-6">
            <PenFlourish size={130} className="text-rose-400 mb-2" />
            <h2 className="font-serif text-2xl sm:text-3xl text-plum-700 font-medium tracking-tight">
              {content.letter.greeting}
            </h2>
          </div>

          {/* Letter Content: Typewritten visible text + Screen reader accessible */}
          <div className="relative min-h-[160px] font-hand text-xl sm:text-2xl text-plum-700/90 leading-relaxed sm:leading-loose whitespace-pre-line tracking-wide">
            {/* Screen reader gets complete text immediately */}
            <div className="sr-only" aria-live="off">
              {fullText}
            </div>

            {/* Visual typewritten text with blinking quill cursor */}
            <p aria-hidden="true">
              {displayText}
              {!isComplete && !hasFinishedTyping && (
                <span className="inline-block w-2 h-5 bg-rose-400 ml-1 animate-pulse align-middle" />
              )}
            </p>
          </div>

          {/* Signature and Wax Seal */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isComplete || hasFinishedTyping ? 1 : 0 }}
            transition={{ duration: 0.6 }}
            className="mt-8 pt-6 border-t border-blush-200/70 flex flex-col sm:flex-row items-center justify-between gap-4"
          >
            <div className="space-y-1 text-center sm:text-left">
              <p className="font-hand text-xl sm:text-2xl text-rose-500 font-medium">
                {content.letter.signature}
              </p>
              {content.letter.postscript && (
                <p className="font-sans text-xs italic text-plum-500/80 max-w-sm">
                  {content.letter.postscript}
                </p>
              )}
            </div>

            {/* Decorative stamp & Botanical with nestled Secret Heart */}
            <div className="flex items-center gap-3">
              <div className="relative flex items-center justify-center">
                <Sprig size={38} className="text-blush-400" />
                {/* Secret Heart Nestled into Botanical Art */}
                <div className="absolute -top-1 -right-1">
                  <SecretHeart />
                </div>
              </div>
              <div className="animate-heartbeat">
                <WaxSeal size={44} />
              </div>
            </div>
          </motion.div>
        </GlassCard>

        {/* Continue Button appears once letter is done */}
        {(isComplete || hasFinishedTyping) && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-8"
          >
            <Button
              variant="primary"
              size="lg"
              onClick={handleContinue}
              className="px-8 shadow-glow-rose hover:scale-105 active:scale-95"
            >
              A Little Something To Make You Smile →
            </Button>
          </motion.div>
        )}
      </div>
    </SectionShell>
  );
};
