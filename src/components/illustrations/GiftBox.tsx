'use client';

import React from 'react';

interface GiftBoxProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  className?: string;
  isOpen?: boolean;
}

export const GiftBox: React.FC<GiftBoxProps> = ({
  size = 56,
  className = '',
  isOpen = false,
  ...props
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      className={className}
      {...props}
    >
      {/* Box base */}
      <rect x="14" y="28" width="36" height="28" rx="4" fill="#FBB6CE" stroke="#F472B6" strokeWidth="2" />
      {/* Vertical ribbon on base */}
      <rect x="29" y="28" width="6" height="28" fill="#C9796A" />

      {/* Lid (rotates/lifts if open) */}
      <g
        className="transition-transform duration-500 origin-[10px_24px]"
        style={{
          transform: isOpen ? 'translateY(-12px) rotate(-15deg)' : 'none',
        }}
      >
        <rect x="11" y="20" width="42" height="9" rx="3" fill="#F472B6" stroke="#FB7185" strokeWidth="2" />
        <rect x="29" y="20" width="6" height="9" fill="#C9796A" />
        {/* Ribbon Bow */}
        <path
          d="M24 16 C 22 10, 28 8, 32 14 C 36 8, 42 10, 40 16 C 36 18, 28 18, 24 16 Z"
          fill="#C9796A"
        />
        <circle cx="32" cy="16" r="3" fill="#B26558" />
      </g>
    </svg>
  );
};
