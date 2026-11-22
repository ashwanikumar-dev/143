'use client';

import React from 'react';

interface SvgProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  className?: string;
}

export const Sparkle: React.FC<SvgProps> = ({ size = 20, className = 'text-gold-400', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    {...props}
  >
    <path d="M12 0 C 12 7, 17 12, 24 12 C 17 12, 12 17, 12 24 C 12 17, 7 12, 0 12 C 7 12, 12 7, 12 0 Z" />
  </svg>
);

export const SparkleCluster: React.FC<SvgProps> = ({ size = 36, className = 'text-gold-400', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 36 36"
    fill="currentColor"
    className={className}
    {...props}
  >
    {/* Large center star */}
    <path d="M18 4 C 18 10, 24 16, 30 16 C 24 16, 18 22, 18 28 C 18 22, 12 16, 6 16 C 12 16, 18 10, 18 4 Z" />
    {/* Small top-left star */}
    <path
      d="M8 2 C 8 4, 10 6, 12 6 C 10 6, 8 8, 8 10 C 8 8, 6 6, 4 6 C 6 6, 8 4, 8 2 Z"
      opacity="0.8"
    />
    {/* Small bottom-right star */}
    <path
      d="M28 22 C 28 24, 30 26, 32 26 C 30 26, 28 28, 28 30 C 28 28, 26 26, 24 26 C 26 26, 28 24, 28 22 Z"
      opacity="0.8"
    />
  </svg>
);
