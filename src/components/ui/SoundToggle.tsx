'use client';

import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { useJourneyStore } from '@/store/journeyStore';

export const SoundToggle: React.FC = () => {
  const audioMuted = useJourneyStore((state) => state.audioMuted);
  const toggleAudio = useJourneyStore((state) => state.toggleAudio);
  const toggleSfx = useJourneyStore((state) => state.toggleSfx);

  const handleToggle = () => {
    toggleAudio();
    toggleSfx();
  };

  return (
    <div className="fixed bottom-4 right-4 z-40 flex items-center gap-2">
      <button
        onClick={handleToggle}
        className="w-10 h-10 rounded-full bg-white/75 backdrop-blur-md border border-white/80 shadow-soft flex items-center justify-center text-plum-600 hover:text-plum-800 hover:bg-white hover:scale-105 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400"
        aria-label={audioMuted ? 'Unmute sounds' : 'Mute sounds'}
        aria-pressed={!audioMuted}
      >
        {audioMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
      </button>
    </div>
  );
};
