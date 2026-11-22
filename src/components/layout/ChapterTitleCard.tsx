'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface ChapterTitleCardProps {
  chapterNumber: number;
  title: string;
  emphasisWord?: string;
  onDismiss?: () => void;
}

export const ChapterTitleCard: React.FC<ChapterTitleCardProps> = ({
  chapterNumber,
  title,
  emphasisWord,
  onDismiss,
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    // Auto-dismiss after 1.2s or immediate if reduced motion
    const timer = setTimeout(() => {
      setIsVisible(false);
      onDismiss?.();
    }, reducedMotion ? 400 : 1200);

    return () => clearTimeout(timer);
  }, [reducedMotion, onDismiss]);

  const handleSkip = () => {
    setIsVisible(false);
    onDismiss?.();
  };

  const renderTitle = () => {
    if (!emphasisWord) return title;
    const parts = title.split(new RegExp(`(${emphasisWord})`, 'gi'));
    return parts.map((part, index) =>
      part.toLowerCase() === emphasisWord.toLowerCase() ? (
        <em key={index} className="font-serif italic font-normal text-rose-500">
          {part}
        </em>
      ) : (
        part
      )
    );
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          onClick={handleSkip}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, filter: 'blur(8px)' }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-cream-100/90 backdrop-blur-xl cursor-pointer select-none px-6 text-center"
        >
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="font-sans text-xs uppercase tracking-[0.3em] font-semibold text-plum-500/80 mb-3"
          >
            CHAPTER {chapterNumber.toString().padStart(2, '0')}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-4xl sm:text-5xl md:text-6xl text-plum-700 tracking-tight"
          >
            {renderTitle()}
          </motion.h1>

          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 0.4 }}
            className="font-sans text-xs text-plum-400 mt-6 tracking-wide"
          >
            Tap anywhere to skip
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
