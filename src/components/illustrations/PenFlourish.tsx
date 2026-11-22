'use client';

import React from 'react';

interface SvgProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  className?: string;
}

export const PenFlourish: React.FC<SvgProps> = ({ size = 120, className = 'text-rose-400', ...props }) => (
  <svg
    width={size}
    height={size * 0.3}
    viewBox="0 0 160 48"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    {/* Elegant calligraphy flourish that draws itself onto the paper */}
    <path
      d="M10 24 C 30 10, 50 40, 70 20 C 90 2, 105 35, 125 15 C 135 5, 145 28, 155 20"
      className="animate-pen-stroke"
    />
    <circle cx="8" cy="25" r="2.5" fill="currentColor" />
  </svg>
);
