'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { chapterPageVariants } from '@/lib/transitions';

interface ChapterTransitionProps {
  currentChapter: number;
  direction?: number;
  children: React.ReactNode;
}

export const ChapterTransition: React.FC<ChapterTransitionProps> = ({
  currentChapter,
  direction = 1,
  children,
}) => {
  return (
    <AnimatePresence mode="wait" custom={direction}>
      <motion.div
        key={currentChapter}
        custom={direction}
        variants={chapterPageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};
