'use client';

import { useEffect, useRef, useCallback } from 'react';
import { useJourneyStore } from '@/store/journeyStore';
import { content } from '@/config/content';

export function useAudio() {
  const audioMuted = useJourneyStore((state) => state.audioMuted);
  const sfxMuted = useJourneyStore((state) => state.sfxMuted);
  const bgMusicRef = useRef<HTMLAudioElement | null>(null);
  const isAudioUnlockedRef = useRef(false);

  // Initialize background music element once
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const bgMusicConfig = content.audio.bgMusic[0];
    if (bgMusicConfig) {
      const audio = new Audio(bgMusicConfig.src);
      audio.loop = bgMusicConfig.loop ?? true;
      audio.volume = bgMusicConfig.volume ?? 0.25;
      bgMusicRef.current = audio;
    }

    return () => {
      if (bgMusicRef.current) {
        bgMusicRef.current.pause();
        bgMusicRef.current = null;
      }
    };
  }, []);

  // Sync mute state with background music
  useEffect(() => {
    if (!bgMusicRef.current) return;
    bgMusicRef.current.muted = audioMuted;
  }, [audioMuted]);

  // Unlock and start music upon user gesture
  const unlockAudio = useCallback(() => {
    if (isAudioUnlockedRef.current || !bgMusicRef.current) return;
    isAudioUnlockedRef.current = true;
    bgMusicRef.current.play().catch(() => {
      // Audio file might not exist or autoplay policy triggered — fail gracefully
    });
  }, []);

  // Play a sound effect by path or key
  const playSfx = useCallback(
    (sfxPath: string) => {
      if (sfxMuted || typeof window === 'undefined') return;
      try {
        const audio = new Audio(sfxPath);
        audio.volume = 0.5;
        audio.play().catch(() => {
          // Graceful skip if audio asset missing
        });
      } catch {
        // Silently skip
      }
    },
    [sfxMuted]
  );

  return {
    unlockAudio,
    playSfx,
    audioMuted,
    sfxMuted,
  };
}
