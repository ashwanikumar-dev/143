'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HeartFilled } from '@/components/illustrations/Hearts';
import { Modal } from '@/components/ui/Modal';
import { useJourneyStore } from '@/store/journeyStore';
import { useAudio } from '@/hooks/useAudio';
import { announceToScreenReader } from '@/lib/a11y';
import { content } from '@/config/content';

export const SecretHeart: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const secretHeartFound = useJourneyStore((state) => state.secretHeartFound);
  const discoverSecretHeart = useJourneyStore((state) => state.discoverSecretHeart);
  const { playSfx } = useAudio();

  const handleDiscover = () => {
    if (!secretHeartFound) {
      discoverSecretHeart();
    }
    setIsOpen(true);
    playSfx(content.audio.sfx.chime);
    announceToScreenReader('Secret heart discovered! ' + content.secretHeart.message);
  };

  return (
    <>
      <button
        onClick={handleDiscover}
        className="group relative w-11 h-11 flex items-center justify-center rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 cursor-pointer"
        aria-label="A hidden heart. Activate to reveal a secret message."
        title="What is this little heart...?"
      >
        {/* Soft pulse glow around the heart */}
        <span className="absolute inset-2 rounded-full bg-rose-400/20 group-hover:scale-125 transition-transform duration-500 animate-pulse-soft" />

        <HeartFilled
          size={18}
          className={`transition-all duration-300 ${
            secretHeartFound
              ? 'text-rose-500 scale-110 drop-shadow-sm'
              : 'text-rose-300/80 group-hover:text-rose-500 group-hover:scale-125'
          }`}
        />
      </button>

      {/* Secret Message Modal */}
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="You Found The Secret Heart! ✨"
      >
        <div className="space-y-4 text-center py-2">
          <div className="w-16 h-16 mx-auto rounded-full bg-blush-100 flex items-center justify-center text-rose-500 shadow-inner">
            <HeartFilled size={32} />
          </div>
          <p className="font-serif text-lg text-plum-700 leading-relaxed italic">
            &ldquo;{content.secretHeart.message}&rdquo;
          </p>
          <p className="font-sans text-xs text-plum-400">
            A small secret kept just for you, whenever you need a reminder.
          </p>
        </div>
      </Modal>
    </>
  );
};
