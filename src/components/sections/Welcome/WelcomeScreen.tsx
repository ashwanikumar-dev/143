'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SectionShell } from '@/components/layout/SectionShell';
import { EnvelopeAnimation } from './EnvelopeAnimation';
import { Button } from '@/components/ui/Button';
import { Sprig } from '@/components/illustrations/Botanicals';
import { triggerConfetti } from '@/components/ui/Confetti';
import { useJourneyStore } from '@/store/journeyStore';
import { useAudio } from '@/hooks/useAudio';
import { content } from '@/config/content';

export const WelcomeScreen: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const goToChapter = useJourneyStore((state) => state.goToChapter);
  const completeChapter = useJourneyStore((state) => state.completeChapter);
  const { unlockAudio, playSfx } = useAudio();

  const handleOpen = () => {
    if (isOpen) return;
    setIsOpen(true);
    unlockAudio();
    playSfx(content.audio.sfx.sealCrack);
    triggerConfetti({ preset: 'hearts' });
  };

  const handleContinue = () => {
    completeChapter(0);
    goToChapter(1);
  };

  return (
    <SectionShell chapter={0} chapterName="Welcome" className="relative">
      {/* Decorative botanical accents at borders */}
      <div className="absolute top-8 left-6 opacity-35 pointer-events-none hidden sm:block rotate-[-25deg]">
        <Sprig size={72} />
      </div>
      <div className="absolute bottom-8 right-6 opacity-35 pointer-events-none hidden sm:block rotate-[155deg]">
        <Sprig size={72} />
      </div>

      <div className="w-full flex flex-col items-center justify-center text-center space-y-6 sm:space-y-8">
        {/* Editorial Title */}
        <div className="space-y-2">
          <p className="font-sans text-xs uppercase tracking-[0.28em] font-medium text-plum-500/80">
            A Gentle Apology &amp; Love Note
          </p>
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl text-plum-700 font-medium tracking-tight">
            A Little Step <em className="italic font-normal text-rose-500">Forward</em>
          </h1>
          <p className="font-sans text-sm sm:text-base text-plum-600/80 max-w-md mx-auto leading-relaxed">
            {content.envelope.greetingText}
          </p>
        </div>

        {/* The Animated Envelope */}
        <div className="my-2 sm:my-4">
          <EnvelopeAnimation
            isOpen={isOpen}
            onOpen={handleOpen}
            senderName={content.meta.senderName}
            recipientName={content.meta.recipientName}
          />
        </div>

        {/* Primary Action Button */}
        <div className="pt-2">
          {!isOpen ? (
            <Button
              variant="primary"
              size="lg"
              onClick={handleOpen}
              className="px-8 shadow-glow-rose/40"
              aria-label="Open your special letter"
            >
              {content.envelope.openButtonLabel} 💌
            </Button>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Button
                variant="primary"
                size="lg"
                onClick={handleContinue}
                className="px-8 shadow-glow-rose/40 animate-pulse-soft"
              >
                Read My Letter →
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </SectionShell>
  );
};
