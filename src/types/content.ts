// ============================================================
// src/types/content.ts
// TypeScript interfaces for the master content configuration
// ============================================================

export interface SiteConfig {
  title: string;
  description: string;
  senderName: string;
  recipientName: string;
  locale: string;
}

export interface PersonalConfig {
  compliments: string[];
  insideJokes: string[];
  thingsSheLoves: string[];
  sharedPlaces: string[];
}

export interface EnvelopeConfig {
  waxSealColor: string;
  ribbonColor: string;
  envelopeColor: string;
  greetingText: string;
  openButtonLabel: string;
}

export interface LetterConfig {
  greeting: string;
  paragraphs: string[];
  signature: string;
  postscript?: string;
}

export interface WheelSegment {
  id: string;
  label: string;
  type: 'compliment' | 'hug' | 'reason' | 'challenge' | 'romantic' | 'kiss' | 'memory' | 'surprise';
  color: string;
  emoji: string;
  resultTitle: string;
  resultDescription: string;
}

export interface WheelConfig {
  spinButtonLabel: string;
  segments: WheelSegment[];
  resultTiers: ResultTier[];
}

export interface QuizOption {
  text: string;
  isCorrect: boolean;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: QuizOption[];
  funFeedbackCorrect: string;
  funFeedbackWrong: string;
  hint?: string;
}

export interface ResultTier {
  minScore: number;
  maxScore: number;
  title: string;
  message: string;
}

export interface QuizConfig {
  title: string;
  subtitle: string;
  questions: QuizQuestion[];
  resultTiers: ResultTier[];
}

export interface ThisOrThatOption {
  label: string;
  emoji?: string;
  image?: string;
  isPreferred: boolean;
}

export interface ThisOrThatPair {
  id: string;
  question: string;
  optionA: ThisOrThatOption;
  optionB: ThisOrThatOption;
  revealMessage: string;
}

export interface ThisOrThatConfig {
  title: string;
  subtitle: string;
  pairs: ThisOrThatPair[];
  resultTiers: ResultTier[];
}

export interface UsMemoryQuestion {
  id: string;
  question: string;
  answer: string;
  hint?: string;
  category: string;
}

export interface UsQuizConfig {
  title: string;
  subtitle: string;
  questions: UsMemoryQuestion[];
  resultTiers: ResultTier[];
}

export interface SweetCard {
  id: string;
  title: string;
  message: string;
  emoji?: string;
  color: 'blush' | 'rose' | 'lavender' | 'peach' | 'gold';
  isFlippable: boolean;
  backMessage?: string;
}

export interface SweetCardsConfig {
  title: string;
  subtitle: string;
  cards: SweetCard[];
}

export interface MemoryPhoto {
  id: string;
  src: string;
  alt: string;
  caption?: string;
  date?: string;
  location?: string;
  isPolaroid: boolean;
}

export interface TimelineEntry {
  id: string;
  date: string;
  title: string;
  description: string;
  photo?: MemoryPhoto;
  emoji?: string;
}

export interface MemoriesConfig {
  title: string;
  subtitle: string;
  photos: MemoryPhoto[];
  timeline: TimelineEntry[];
}

export interface HeartGameConfig {
  duration: number;
  spawnRate: number;
  targetScore: number;
  goldenHeartChance: number;
  resultTiers: ResultTier[];
}

export interface FinaleResponseOption {
  id: 'time' | 'talk' | 'forgive';
  label: string;
  emoji: string;
  reply: string;
}

export interface FinaleConfig {
  apologyMessage: string[];
  promises: string[];
  bridgeQuestion: string;
  responseOptions: FinaleResponseOption[];
  closingMessage: string;
}

export interface SecretHeartConfig {
  enabled: boolean;
  hint: string;
  message: string;
  revealDelay: number;
}

export interface AudioTrack {
  id: string;
  src: string;
  loop?: boolean;
  volume?: number;
  chapter?: number;
}

export interface AudioConfig {
  enabled: boolean;
  bgMusic: AudioTrack[];
  sfx: {
    chime: string;
    correct: string;
    wrong: string;
    heartPop: string;
    pageFlip: string;
    sealCrack: string;
    confetti: string;
    finalChime: string;
  };
}

export interface FeaturesConfig {
  cursorTrail: boolean;
  floatingHearts: boolean;
  filmGrain: boolean;
  parallelPreload: boolean;
  persistProgress: boolean;
  debugMode: boolean;
}

export interface RootConfig {
  meta: SiteConfig;
  personal: PersonalConfig;
  envelope: EnvelopeConfig;
  letter: LetterConfig;
  wheel: WheelConfig;
  quiz: QuizConfig;
  thisOrThat: ThisOrThatConfig;
  usQuiz: UsQuizConfig;
  sweetCards: SweetCardsConfig;
  memories: MemoriesConfig;
  heartGame: HeartGameConfig;
  finale: FinaleConfig;
  secretHeart: SecretHeartConfig;
  audio: AudioConfig;
  features: FeaturesConfig;
}
