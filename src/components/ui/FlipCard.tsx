'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface FlipCardProps {
  front: React.ReactNode;
  back: React.ReactNode;
  isFlipped?: boolean;
  onFlip?: (flipped: boolean) => void;
  className?: string;
}

export const FlipCard: React.FC<FlipCardProps> = ({
  front,
  back,
  isFlipped: controlledFlipped,
  onFlip,
  className = '',
}) => {
  const [uncontrolledFlipped, setUncontrolledFlipped] = useState(false);
  const reducedMotion = useReducedMotion();

  const isFlipped = controlledFlipped !== undefined ? controlledFlipped : uncontrolledFlipped;

  const handleToggle = () => {
    const next = !isFlipped;
    setUncontrolledFlipped(next);
    onFlip?.(next);
  };

  return (
    <div
      className={cn('relative perspective-1000 cursor-pointer select-none', className)}
      onClick={handleToggle}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleToggle();
        }
      }}
      role="button"
      tabIndex={0}
      aria-pressed={isFlipped}
      aria-label="Flip card for sweet message"
    >
      <motion.div
        className="w-full h-full relative"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={
          reducedMotion
            ? { duration: 0.1 }
            : { duration: 0.6, type: 'spring', stiffness: 260, damping: 20 }
        }
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front Face */}
        <div
          className="w-full h-full backface-hidden"
          style={{ backfaceVisibility: 'hidden' }}
        >
          {front}
        </div>

        {/* Back Face */}
        <div
          className="w-full h-full absolute inset-0 backface-hidden"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          {back}
        </div>
      </motion.div>
    </div>
  );
};
