'use client';

import { useJourneyStore } from '@/store/journeyStore';

export function useReducedMotion(): boolean {
  const storeReduced = useJourneyStore((state) => state.reducedMotion);
  return storeReduced;
}
