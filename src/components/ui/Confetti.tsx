'use client';

import confetti from 'canvas-confetti';

interface ConfettiOptions {
  preset?: 'celebrate' | 'hearts' | 'gentle';
}

export function triggerConfetti(options: ConfettiOptions = {}) {
  if (typeof window === 'undefined') return;

  // Check reduced motion
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion) return;

  const { preset = 'hearts' } = options;

  if (preset === 'hearts') {
    confetti({
      particleCount: 45,
      spread: 70,
      origin: { y: 0.65 },
      colors: ['#F472B6', '#FDDDE6', '#C4B5FD', '#FFF8F0', '#D4A853'],
      shapes: ['circle'],
      scalar: 1.2,
      ticks: 200,
    });
  } else if (preset === 'celebrate') {
    confetti({
      particleCount: 80,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#F472B6', '#E9D5FF', '#FDE68A', '#FFCBA4'],
      scalar: 1.1,
    });
  } else {
    confetti({
      particleCount: 30,
      spread: 50,
      origin: { y: 0.7 },
      colors: ['#FDDDE6', '#FFF8F0'],
      ticks: 150,
    });
  }
}
