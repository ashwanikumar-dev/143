'use client';

import React from 'react';
import { AuroraBackground } from '@/components/effects/AuroraBackground';
import { FilmGrain } from '@/components/effects/FilmGrain';
import { FloatingHearts } from '@/components/effects/FloatingHearts';
import { LightLeak } from '@/components/effects/LightLeak';
import { cn } from '@/lib/utils';

interface SectionShellProps {
  chapter: number;
  chapterName: string;
  children: React.ReactNode;
  className?: string;
  showHearts?: boolean;
}

export const SectionShell: React.FC<SectionShellProps> = ({
  chapter,
  chapterName,
  children,
  className = '',
  showHearts = true,
}) => {
  return (
    <section
      role="main"
      aria-label={chapterName}
      className={cn(
        'relative min-h-[100dvh] w-full flex flex-col justify-center items-center px-4 sm:px-6 md:px-12 py-12 md:py-16 overflow-x-hidden overflow-y-auto selection:bg-rose-200 selection:text-plum-800',
        className
      )}
    >
      {/* Visual Ambiance Layers */}
      <AuroraBackground chapter={chapter} />
      <FilmGrain />
      <LightLeak />
      {showHearts && <FloatingHearts />}

      {/* Main Content Area */}
      <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center justify-center my-auto">
        {children}
      </div>
    </section>
  );
};
