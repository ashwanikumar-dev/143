import { ResultTier } from '@/types/content';

/**
 * Returns the matching ResultTier based on user's score.
 */
export function getTier(score: number, tiers: ResultTier[]): ResultTier {
  if (!tiers || tiers.length === 0) {
    return {
      minScore: 0,
      maxScore: 100,
      title: 'Wonderful Effort!',
      message: 'Every moment we spend together is precious.',
    };
  }

  // Find matching tier
  for (const tier of tiers) {
    if (score >= tier.minScore && score <= tier.maxScore) {
      return tier;
    }
  }

  // Fallback to closest tier
  if (score < tiers[0].minScore) return tiers[0];
  return tiers[tiers.length - 1];
}
