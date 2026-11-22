"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type DeviceTier = "high" | "balanced" | "lite";
export type FinalChoice = "time" | "talk" | "forgive" | null;

interface JourneyState {
  currentChapter: number; // 0-9
  completedChapters: number[];
  scores: Record<number, number>;
  audioMuted: boolean;
  sfxMuted: boolean;
  reducedMotion: boolean;
  deviceTier: DeviceTier;
  secretHeartFound: boolean;
  finalChoice: FinalChoice;
  storeVersion: number;
}

interface JourneyActions {
  goToChapter: (chapter: number) => void;
  completeChapter: (chapter: number) => void;
  setScore: (chapter: number, score: number) => void;
  toggleAudio: () => void;
  toggleSfx: () => void;
  toggleReducedMotion: () => void;
  setDeviceTier: (tier: DeviceTier) => void;
  discoverSecretHeart: () => void;
  setFinalChoice: (choice: "time" | "talk" | "forgive") => void;
  resetJourney: () => void;
}

export type JourneyStore = JourneyState & JourneyActions;

const CURRENT_VERSION = 2;

const defaultState: JourneyState = {
  currentChapter: 0,
  completedChapters: [],
  scores: {},
  audioMuted: false,
  sfxMuted: false,
  reducedMotion: false,
  deviceTier: "high",
  secretHeartFound: false,
  finalChoice: null,
  storeVersion: CURRENT_VERSION,
};

export const useJourneyStore = create<JourneyStore>()(
  persist(
    (set) => ({
      ...defaultState,

      goToChapter: (chapter) =>
        set({ currentChapter: Math.max(0, Math.min(9, chapter)) }),

      completeChapter: (chapter) =>
        set((state) => ({
          completedChapters: state.completedChapters.includes(chapter)
            ? state.completedChapters
            : [...state.completedChapters, chapter],
        })),

      setScore: (chapter, score) =>
        set((state) => ({
          scores: { ...state.scores, [chapter]: score },
        })),

      toggleAudio: () => set((state) => ({ audioMuted: !state.audioMuted })),

      toggleSfx: () => set((state) => ({ sfxMuted: !state.sfxMuted })),

      toggleReducedMotion: () =>
        set((state) => ({ reducedMotion: !state.reducedMotion })),

      setDeviceTier: (tier) => set({ deviceTier: tier }),

      discoverSecretHeart: () => set({ secretHeartFound: true }),

      setFinalChoice: (choice) => set({ finalChoice: choice }),

      resetJourney: () =>
        set({ ...defaultState, storeVersion: CURRENT_VERSION }),
    }),
    {
      name: "alittlestepforward-store-v2",
      storage: createJSONStorage(() => localStorage),
      version: CURRENT_VERSION,
    },
  ),
);
