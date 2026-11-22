'use client';

import React from 'react';
import { useDeviceTier } from '@/hooks/useDeviceTier';

export const FilmGrain: React.FC = () => {
  const tier = useDeviceTier();

  // Disable on lite tier for maximum performance
  if (tier === 'lite') return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none z-50 opacity-[0.035] mix-blend-overlay"
      aria-hidden="true"
    >
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <filter id="noiseFilter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>
    </div>
  );
};
