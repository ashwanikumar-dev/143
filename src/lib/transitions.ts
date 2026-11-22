import { Variants } from 'framer-motion';

export const springConfig = {
  type: 'spring',
  stiffness: 300,
  damping: 30,
};

export const softSpring = {
  type: 'spring',
  stiffness: 180,
  damping: 24,
};

export const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.3,
    },
  },
};

export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export const headlineVariants: Variants = {
  hidden: { opacity: 0, y: 24, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export const chapterPageVariants: Variants = {
  initial: (direction: number) => ({
    opacity: 0,
    scale: 0.98,
    y: direction > 0 ? 20 : -20,
    filter: 'blur(6px)',
  }),
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: (direction: number) => ({
    opacity: 0,
    scale: 0.98,
    y: direction > 0 ? -20 : 20,
    filter: 'blur(6px)',
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};
