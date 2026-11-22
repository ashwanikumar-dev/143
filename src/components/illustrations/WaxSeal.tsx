'use client';

import React from 'react';

interface WaxSealProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  className?: string;
  sealColor?: string;
  isCracked?: boolean;
}

export const WaxSeal: React.FC<WaxSealProps> = ({
  size = 56,
  className = '',
  sealColor = '#C9796A',
  isCracked = false,
  ...props
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      className={`drop-shadow-md ${className}`}
      {...props}
    >
      {/* Organic scalloped wax edge */}
      <path
        d="M32 4 C 38 3, 44 8, 49 12 C 54 16, 60 21, 60 28 C 60 35, 55 42, 51 47 C 47 52, 40 58, 33 59 C 26 60, 19 56, 14 51 C 9 46, 4 39, 4 32 C 4 25, 9 18, 14 13 C 19 8, 26 5, 32 4 Z"
        fill={sealColor}
      />
      {/* Inner debossed ring */}
      <circle cx="32" cy="32" r="20" stroke="#7A392F" strokeWidth="1.5" strokeOpacity="0.4" />
      {/* Debossed Heart stamp */}
      <path
        d="M32 40 L30.5 38.6 C25 33.6 21.5 30.5 21.5 26.6 C21.5 23.5 23.9 21.1 27 21.1 C28.7 21.1 30.4 21.9 31.5 23.2 C32.6 21.9 34.3 21.1 36 21.1 C39.1 21.1 41.5 23.5 41.5 26.6 C41.5 30.5 38 33.6 32.5 38.6 L32 40 Z"
        fill="#7A392F"
        fillOpacity="0.45"
      />
      {/* Crack line animation overlay if cracked */}
      {isCracked && (
        <path
          d="M32 12 L28 24 L35 34 L29 48"
          stroke="#FFF8F0"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
    </svg>
  );
};
