'use client';

import React from 'react';

interface SvgProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  className?: string;
}

export const HeartFilled: React.FC<SvgProps> = ({ size = 24, className = 'text-rose-400', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    {...props}
  >
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

export const HeartOutline: React.FC<SvgProps> = ({ size = 24, className = 'text-rose-400', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

export const HeartDouble: React.FC<SvgProps> = ({ size = 32, className = 'text-rose-400', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 36 36"
    fill="currentColor"
    className={className}
    {...props}
  >
    {/* Left Heart */}
    <path
      opacity="0.8"
      d="M14 26l-1.2-1.1C6.5 19.4 3 16.4 3 12.6 3 9.5 5.4 7.1 8.5 7.1c1.7 0 3.4.8 4.5 2.1 1.1-1.3 2.8-2.1 4.5-2.1 3.1 0 5.5 2.4 5.5 5.5 0 3.8-3.5 6.8-9.8 12.3L14 26z"
    />
    {/* Right Heart (overlapping) */}
    <path
      opacity="0.95"
      d="M22 30l-1.2-1.1C14.5 23.4 11 20.4 11 16.6 11 13.5 13.4 11.1 16.5 11.1c1.7 0 3.4.8 4.5 2.1 1.1-1.3 2.8-2.1 4.5-2.1 3.1 0 5.5 2.4 5.5 5.5 0 3.8-3.5 6.8-9.8 12.3L22 30z"
    />
  </svg>
);

export const HeartCracked: React.FC<SvgProps> = ({ size = 28, className = 'text-rose-400', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    <path d="M12 5.67l-1.5 4.5 3 2.5-2.5 4.5" />
  </svg>
);
