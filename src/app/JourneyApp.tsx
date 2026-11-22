'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { useJourneyStore } from '@/store/journeyStore';
import { ChapterProgress } from '@/components/layout/ChapterProgress';
import { ChapterTransition } from '@/components/layout/ChapterTransition';
import { SoundToggle } from '@/components/ui/SoundToggle';
import { CursorTrail } from '@/components/effects/CursorTrail';

// Dynamically lazy-load all 10 chapters for performance
const WelcomeScreen = dynamic(
  () => import('@/components/sections/Welcome/WelcomeScreen').then((m) => m.WelcomeScreen),
  { ssr: false }
);
const LetterReveal = dynamic(
  () => import('@/components/sections/Letter/LetterReveal').then((m) => m.LetterReveal),
  { ssr: false }
);
const LoveWheel = dynamic(
  () => import('@/components/sections/Wheel/LoveWheel').then((m) => m.LoveWheel),
  { ssr: false }
);
const KnowMeQuiz = dynamic(
  () => import('@/components/sections/Quiz/KnowMeQuiz').then((m) => m.KnowMeQuiz),
  { ssr: false }
);
const ThisOrThatGame = dynamic(
  () => import('@/components/sections/ThisOrThat/ThisOrThatGame').then((m) => m.ThisOrThatGame),
  { ssr: false }
);
const UsMemoryGame = dynamic(
  () => import('@/components/sections/UsQuiz/UsMemoryGame').then((m) => m.UsMemoryGame),
  { ssr: false }
);
const SweetMessageGrid = dynamic(
  () => import('@/components/sections/SweetCards/SweetMessageGrid').then((m) => m.SweetMessageGrid),
  { ssr: false }
);
const MemoryLane = dynamic(
  () => import('@/components/sections/Memories/MemoryLane').then((m) => m.MemoryLane),
  { ssr: false }
);
const CatchTheHearts = dynamic(
  () => import('@/components/sections/HeartCatch/CatchTheHearts').then((m) => m.CatchTheHearts),
  { ssr: false }
);
const FinalApology = dynamic(
  () => import('@/components/sections/Finale/FinalApology').then((m) => m.FinalApology),
  { ssr: false }
);

export default function JourneyApp() {
  const currentChapter = useJourneyStore((state) => state.currentChapter);

  const renderChapter = () => {
    switch (currentChapter) {
      case 0:
        return <WelcomeScreen />;
      case 1:
        return <LetterReveal />;
      case 2:
        return <LoveWheel />;
      case 3:
        return <KnowMeQuiz />;
      case 4:
        return <ThisOrThatGame />;
      case 5:
        return <UsMemoryGame />;
      case 6:
        return <SweetMessageGrid />;
      case 7:
        return <MemoryLane />;
      case 8:
        return <CatchTheHearts />;
      case 9:
        return <FinalApology />;
      default:
        return <WelcomeScreen />;
    }
  };

  return (
    <main className="relative min-h-[100dvh] w-full overflow-hidden bg-cream-100 font-sans text-plum-800">
      {/* Top persistent progress ribbon */}
      <ChapterProgress />

      {/* Chapter Transition System */}
      <ChapterTransition currentChapter={currentChapter}>
        {renderChapter()}
      </ChapterTransition>

      {/* Floating persistent audio toggle */}
      <SoundToggle />

      {/* Desktop whimsical cursor trail */}
      <CursorTrail />
    </main>
  );
}
