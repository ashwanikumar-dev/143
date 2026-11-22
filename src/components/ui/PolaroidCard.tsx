'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface PolaroidCardProps {
  imageSrc?: string;
  alt?: string;
  caption?: string;
  date?: string;
  location?: string;
  rotation?: number; // degrees
  onClick?: () => void;
  className?: string;
}

export const PolaroidCard: React.FC<PolaroidCardProps> = ({
  imageSrc,
  alt = 'A sweet memory',
  caption,
  date,
  location,
  rotation = 0,
  onClick,
  className = '',
}) => {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      onClick={onClick}
      whileHover={reducedMotion ? undefined : { scale: 1.03, y: -4, rotate: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      style={{
        transform: reducedMotion ? 'none' : `rotate(${rotation}deg)`,
      }}
      className={cn(
        'relative bg-white p-3.5 pb-6 rounded-sm shadow-soft border border-neutral-100 cursor-pointer select-none max-w-[280px] w-full',
        className
      )}
    >
      {/* Tape SVG element at the top */}
      <div
        className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-5 bg-white/70 backdrop-blur-xs shadow-xs border border-white/90 rotate-[-1deg] pointer-events-none"
        style={{
          clipPath:
            'polygon(0% 10%, 5% 0%, 95% 0%, 100% 10%, 97% 90%, 92% 100%, 8% 100%, 3% 90%)',
        }}
      />

      {/* Image / Placeholder Area */}
      <div className="relative aspect-square w-full rounded-xs overflow-hidden bg-gradient-to-tr from-blush-200 via-rose-100 to-lavender-200 border border-neutral-100">
        {imageSrc ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={imageSrc}
            alt={alt}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            loading="lazy"
            onError={(e) => {
              // Graceful placeholder fallback if image file is not yet placed
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
        ) : null}
        {/* Soft watermark aesthetic heart in center of placeholder */}
        <div className="absolute inset-0 flex flex-col items-center justify-center opacity-40 pointer-events-none">
          
          <span className="text-[11px] font-sans text-plum-700/60 mt-1">Our memory</span>
        </div>
      </div>

      {/* Handwritten Caption */}
      <div className="mt-3.5 px-1 text-center">
        {caption && (
          <p className="font-hand text-lg text-plum-700 leading-tight tracking-wide">
            {caption}
          </p>
        )}
        {(date || location) && (
          <p className="font-sans text-[10px] tracking-wider uppercase text-plum-400 mt-1">
            {[date, location].filter(Boolean).join(' • ')}
          </p>
        )}
      </div>
    </motion.div>
  );
};
