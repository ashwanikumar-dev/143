'use client';

import { useState, useEffect } from 'react';
import { DeviceTier } from '@/store/journeyStore';

export function useDeviceTier(): DeviceTier {
  const [tier, setTier] = useState<DeviceTier>('high');

  useEffect(() => {
    try {
      let score = 0;
      // 1. Hardware Concurrency
      const cores = navigator.hardwareConcurrency || 4;
      if (cores >= 8) score += 3;
      else if (cores >= 4) score += 2;
      else score += 1;

      // 2. Memory
      const mem = (navigator as unknown as { deviceMemory?: number }).deviceMemory;
      if (mem !== undefined) {
        if (mem >= 8) score += 3;
        else if (mem >= 4) score += 2;
        else score += 1;
      } else {
        score += 2;
      }

      if (score >= 4) setTier('high');
      else if (score >= 2) setTier('balanced');
      else setTier('lite');
    } catch {
      setTier('high');
    }
  }, []);

  return tier;
}
