'use client';

import React from 'react';

interface SvgProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  className?: string;
}

export const Sprig: React.FC<SvgProps> = ({ size = 48, className = 'text-rose-300', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    {/* Main curved stem */}
    <path d="M12 52 C 24 44, 38 28, 52 12" />
    {/* Leaves */}
    <path d="M22 45 C 18 38, 22 32, 28 35 C 30 38, 26 44, 22 45" fill="currentColor" fillOpacity="0.15" />
    <path d="M30 36 C 36 32, 42 36, 40 42 C 34 44, 30 40, 30 36" fill="currentColor" fillOpacity="0.15" />
    <path d="M38 27 C 34 20, 38 14, 44 17 C 46 20, 42 26, 38 27" fill="currentColor" fillOpacity="0.15" />
    <path d="M46 18 C 52 14, 58 18, 56 24 C 50 26, 46 22, 46 18" fill="currentColor" fillOpacity="0.15" />
  </svg>
);

export const PetalScatter: React.FC<SvgProps> = ({ size = 32, className = 'text-blush-400', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 40 40"
    fill="currentColor"
    className={className}
    {...props}
  >
    <path d="M20 8 C 16 2, 24 2, 20 8 Z" opacity="0.6" />
    <path d="M32 20 C 38 16, 38 24, 32 20 Z" opacity="0.75" />
    <path d="M14 28 C 10 34, 18 36, 14 28 Z" opacity="0.5" />
  </svg>
);

export const TinyFlower: React.FC<SvgProps> = ({ size = 24, className = 'text-rose-400', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    fill="none"
    className={className}
    {...props}
  >
    <circle cx="16" cy="16" r="3" fill="#D4A853" />
    <circle cx="16" cy="9" r="4.5" fill="currentColor" fillOpacity="0.6" />
    <circle cx="23" cy="16" r="4.5" fill="currentColor" fillOpacity="0.6" />
    <circle cx="16" cy="23" r="4.5" fill="currentColor" fillOpacity="0.6" />
    <circle cx="9" cy="16" r="4.5" fill="currentColor" fillOpacity="0.6" />
  </svg>
);
