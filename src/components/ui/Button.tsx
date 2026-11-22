'use client';

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface ButtonProps extends HTMLMotionProps<'button'> {
  variant?: 'primary' | 'soft' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', children, className = '', disabled, ...props }, ref) => {
    const reducedMotion = useReducedMotion();

    const baseStyles =
      'inline-flex items-center justify-center font-sans font-medium tracking-wide rounded-pill transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none select-none';

    const variants = {
      primary:
        'bg-gradient-to-r from-rose-400 via-rose-500 to-rose-400 text-white shadow-soft hover:shadow-glow-rose hover:brightness-105 active:brightness-95',
      soft:
        'bg-white/80 hover:bg-white text-plum-600 border border-blush-200/80 shadow-soft hover:shadow-glass hover:text-plum-700 backdrop-blur-md',
      ghost:
        'bg-transparent hover:bg-blush-100/50 text-plum-600 border border-rose-300/60 hover:border-rose-400',
    };

    const sizes = {
      sm: 'text-xs px-4 py-2 min-h-[36px]',
      md: 'text-sm px-6 py-2.5 min-h-[44px]',
      lg: 'text-base px-8 py-3.5 min-h-[50px]',
    };

    return (
      <motion.button
        ref={ref}
        whileHover={reducedMotion || disabled ? undefined : { scale: 1.025 }}
        whileTap={reducedMotion || disabled ? undefined : { scale: 0.975 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={disabled}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';
