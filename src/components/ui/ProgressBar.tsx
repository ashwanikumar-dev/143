'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ProgressBarProps {
  current: number;
  total: number;
  label?: string;
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  current,
  total,
  label,
  className = '',
}) => {
  const percentage = Math.min(100, Math.max(0, (current / total) * 100));

  return (
    <div className={cn('w-full space-y-1.5', className)}>
      {label && (
        <div className="flex justify-between items-center text-xs font-sans text-plum-500 font-medium">
          <span>{label}</span>
          <span>
            {current} / {total}
          </span>
        </div>
      )}
      <div className="w-full h-2 rounded-pill bg-white/60 border border-blush-200 overflow-hidden p-0.5 shadow-inner">
        <motion.div
          className="h-full rounded-pill bg-gradient-to-r from-rose-400 via-rose-500 to-rose-400 shadow-xs"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  );
};
