'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SectionShell } from '@/components/layout/SectionShell';
import { EditorialHeading } from '@/components/ui/EditorialHeading';
import { FlipCard } from '@/components/ui/FlipCard';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import { GiftBox } from '@/components/sections/Extras/GiftBox';
import { triggerConfetti } from '@/components/ui/Confetti';
import { useJourneyStore } from '@/store/journeyStore';
import { useAudio } from '@/hooks/useAudio';
import { content } from '@/config/content';

export const SweetMessageGrid: React.FC = () => {
  const [flippedCards, setFlippedCards] = useState<Set<string>>(new Set());
  const goToChapter = useJourneyStore((state) => state.goToChapter);
  const completeChapter = useJourneyStore((state) => state.completeChapter);
  const { playSfx } = useAudio();

  const cards = content.sweetCards.cards;
  const allUnlocked = flippedCards.size === cards.length;

  const handleFlip = (id: string) => {
    setFlippedCards((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
        playSfx(content.audio.sfx.pageFlip);
        if (next.size === cards.length) {
          triggerConfetti({ preset: 'hearts' });
        }
      }
      return next;
    });
  };

  const handleContinue = () => {
    completeChapter(6);
    goToChapter(7);
  };

  return (
    <SectionShell chapter={6} chapterName="Sweet Messages" className="py-6 sm:py-10">
      <div className="w-full max-w-3xl mx-auto flex flex-col items-center">
        <EditorialHeading
          chapterNumber={6}
          title={content.sweetCards.title}
          subtitle={content.sweetCards.subtitle}
          emphasisWord="Heart"
        />

        {/* Counter indicator */}
        <div className="mb-6 px-4 py-1.5 rounded-pill bg-white/70 backdrop-blur-md border border-white/80 shadow-soft text-xs font-sans text-plum-600 font-medium">
          {flippedCards.size} of {cards.length} Notes Unlocked 💌
        </div>

        {/* Scattered / Organically composed cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 w-full mb-8">
          {cards.map((card, idx) => {
            const isFlipped = flippedCards.has(card.id);
            const rotations = [-2, 2.5, -1.5, 2];
            const rotation = rotations[idx % rotations.length];

            return (
              <div
                key={card.id}
                style={{ transform: `rotate(${rotation}deg)` }}
                className="transition-transform duration-300 hover:rotate-0"
              >
                <FlipCard
                  isFlipped={isFlipped}
                  onFlip={() => handleFlip(card.id)}
                  className="h-[210px] w-full"
                  front={
                    <GlassCard className="h-full p-6 flex flex-col justify-between items-center text-center border-rose-200/60 shadow-soft hover:shadow-glass">
                      <span className="text-3xl">{card.emoji || '🌸'}</span>
                      <h4 className="font-serif text-xl text-plum-700 font-medium">
                        {card.title}
                      </h4>
                      <p className="font-sans text-xs text-plum-500/80">
                        {card.message}
                      </p>
                      <span className="text-[11px] font-sans text-rose-500 uppercase tracking-widest font-semibold">
                        Tap to reveal note ↷
                      </span>
                    </GlassCard>
                  }
                  back={
                    <GlassCard className="h-full p-6 flex flex-col justify-center items-center text-center bg-white/95 border-rose-300 shadow-ambient">
                      <span className="text-2xl mb-1">💕</span>
                      <p className="font-hand text-2xl text-rose-600 leading-snug">
                        &ldquo;{card.backMessage || card.message}&rdquo;
                      </p>
                      <span className="text-[10px] font-sans text-plum-400 mt-3 uppercase tracking-wider">
                        Tap to flip back
                      </span>
                    </GlassCard>
                  }
                />
              </div>
            );
          })}
        </div>

        {/* Gift Box Extra unlocked upon all cards flipped */}
        {allUnlocked && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full my-4"
          >
            <GiftBox />
          </motion.div>
        )}

        {/* Continue button */}
        <div className="pt-2">
          <Button
            variant="primary"
            size="lg"
            onClick={handleContinue}
            className="px-8 shadow-glow-rose"
          >
            Visit Our Memory Lane →
          </Button>
        </div>
      </div>
    </SectionShell>
  );
};
