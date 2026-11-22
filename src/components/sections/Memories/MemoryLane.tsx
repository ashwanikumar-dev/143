'use client';

import React, { useState } from 'react';
import { SectionShell } from '@/components/layout/SectionShell';
import { EditorialHeading } from '@/components/ui/EditorialHeading';
import { PolaroidCard } from '@/components/ui/PolaroidCard';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import { PhotoLightbox } from './PhotoLightbox';
import { MemoryPhoto } from '@/types/content';
import { useJourneyStore } from '@/store/journeyStore';
import { content } from '@/config/content';

export const MemoryLane: React.FC = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<MemoryPhoto | null>(null);
  const goToChapter = useJourneyStore((state) => state.goToChapter);
  const completeChapter = useJourneyStore((state) => state.completeChapter);

  const { photos, timeline, title, subtitle } = content.memories;

  const handleContinue = () => {
    completeChapter(7);
    goToChapter(8);
  };

  return (
    <SectionShell chapter={7} chapterName="Memory Lane" className="py-8 sm:py-12">
      <div className="w-full max-w-4xl mx-auto flex flex-col items-center">
        <EditorialHeading
          chapterNumber={7}
          title={title}
          subtitle={subtitle}
          emphasisWord="Memory"
        />

        {/* Polaroid Wall Section */}
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 my-6">
          {photos.map((photo, idx) => {
            const rotations = [-3, 2.5, -1.8, 3];
            const rotation = rotations[idx % rotations.length];

            return (
              <PolaroidCard
                key={photo.id}
                imageSrc={photo.src}
                alt={photo.alt}
                caption={photo.caption}
                date={photo.date}
                location={photo.location}
                rotation={rotation}
                onClick={() => setSelectedPhoto(photo)}
              />
            );
          })}
        </div>

        {/* Horizontal Memory Timeline */}
        <div className="w-full mt-10 space-y-4">
          <p className="font-sans text-xs uppercase tracking-widest text-plum-500 font-semibold text-center">
            Our Story in Milestones
          </p>

          <div className="relative py-4">
            {/* Timeline Connecting Thread / Ribbon */}
            <div className="hidden sm:block absolute top-1/2 left-8 right-8 h-0.5 bg-gradient-to-r from-rose-200 via-rose-400 to-rose-200 -translate-y-1/2 -z-0" />

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 relative z-10">
              {timeline.map((entry) => (
                <GlassCard
                  key={entry.id}
                  className="p-5 text-center flex flex-col items-center space-y-2 border-rose-200/60 shadow-soft"
                >
                  <span className="text-2xl">{entry.emoji || '🌱'}</span>
                  <p className="font-sans text-[11px] uppercase tracking-wider text-rose-500 font-semibold">
                    {entry.date}
                  </p>
                  <h4 className="font-serif text-lg text-plum-700 font-medium">
                    {entry.title}
                  </h4>
                  <p className="font-sans text-xs text-plum-500/90 leading-relaxed">
                    {entry.description}
                  </p>
                </GlassCard>
              ))}
            </div>
          </div>
        </div>

        {/* Continue Button */}
        <div className="mt-10">
          <Button
            variant="primary"
            size="lg"
            onClick={handleContinue}
            className="px-8 shadow-glow-rose"
          >
            Catch My Falling Hearts →
          </Button>
        </div>

        {/* Lightbox Modal */}
        <PhotoLightbox photo={selectedPhoto} onClose={() => setSelectedPhoto(null)} />
      </div>
    </SectionShell>
  );
};
