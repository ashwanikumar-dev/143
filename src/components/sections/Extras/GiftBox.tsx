'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GiftBox as GiftBoxIcon } from '@/components/illustrations/GiftBox';
import { GlassCard } from '@/components/ui/GlassCard';
import { triggerConfetti } from '@/components/ui/Confetti';
import { useAudio } from '@/hooks/useAudio';
import { content } from '@/config/content';

export const GiftBox: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { playSfx } = useAudio();

  const handleOpen = () => {
    if (isOpen) return;
    setIsOpen(true);
    playSfx(content.audio.sfx.chime);
    triggerConfetti({ preset: 'celebrate' });
  };

  return (
    <GlassCard className="p-6 text-center border-rose-300/80 shadow-soft max-w-md mx-auto">
      <div className="flex flex-col items-center space-y-4">
        <div
          onClick={handleOpen}
          className="cursor-pointer hover:scale-105 active:scale-95 transition-transform"
        >
          <GiftBoxIcon size={72} isOpen={isOpen} />
        </div>

        {!isOpen ? (
          <div>
            <p className="font-serif text-lg text-plum-700 font-medium">
              A Little Gift For Unlocking Every Note 🎁
            </p>
            <p className="font-sans text-xs text-plum-500 mt-1">
              Tap the box to open your surprise
            </p>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-2 pt-1"
          >
            <span className="text-3xl">🕊️</span>
            <p className="font-hand text-2xl text-rose-500 font-medium">
              &ldquo;My heart, my patience, and a promise to always make you smile.&rdquo;
            </p>
            <p className="font-sans text-xs text-plum-400">
              Valid forever, with no expiration date.
            </p>
          </motion.div>
        )}
      </div>
    </GlassCard>
  );
};
