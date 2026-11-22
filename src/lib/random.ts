/**
 * Cryptographically secure random float in [0, 1)
 */
export function secureRandom(): number {
  if (typeof window !== 'undefined' && window.crypto && window.crypto.getRandomValues) {
    const array = new Uint32Array(1);
    window.crypto.getRandomValues(array);
    return array[0] / (0xffffffff + 1);
  }
  return Math.random();
}

/**
 * Linear Congruential Generator (LCG) for deterministic seeded pseudo-randomness.
 * Useful for consistent layout angles, polaroid rotations, etc. across re-renders.
 */
export function seededRandom(seed: number): () => number {
  let s = Math.abs(seed) % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

/**
 * Pick a random element from an array
 */
export function pickRandom<T>(arr: T[], rng: () => number = secureRandom): T {
  if (arr.length === 0) throw new Error('Cannot pick from empty array');
  const index = Math.floor(rng() * arr.length);
  return arr[index];
}

/**
 * Shuffle array using Fisher-Yates algorithm
 */
export function shuffle<T>(arr: T[], rng: () => number = secureRandom): T[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}
