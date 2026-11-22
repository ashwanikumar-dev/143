'use client';

import React from 'react';

interface SvgProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  className?: string;
}

export const Ribbon: React.FC<SvgProps> = ({ size = 60, className = 'text-rose-400', ...props }) => (
  <svg
    width={size}
    height={size * 0.4}
    viewBox="0 0 100 40"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    {/* Flowing silk ribbon path */}
    <path d="M10 25 C 25 10, 40 30, 55 18 C 70 6, 85 24, 90 20" />
    <path d="M8 28 C 23 13, 38 33, 53 21 C 68 9, 83 27, 88 23" opacity="0.4" />
  </svg>
);
