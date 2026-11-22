'use client';

import React from 'react';

export const LightLeak: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden" aria-hidden="true">
      {/* Warm Golden Light Leak - Top Right */}
      <div
        className="absolute -top-[10%] -right-[5%] w-[45vw] h-[45vw] max-w-[500px] max-h-[500px] rounded-full blur-[80px] opacity-25"
        style={{
          background: 'radial-gradient(circle, #FDE68A 0%, #FBB6CE 50%, transparent 80%)',
        }}
      />
      {/* Gentle Rose Highlight - Bottom Left */}
      <div
        className="absolute -bottom-[10%] -left-[5%] w-[40vw] h-[40vw] max-w-[450px] max-h-[450px] rounded-full blur-[90px] opacity-20"
        style={{
          background: 'radial-gradient(circle, #F472B6 0%, #C4B5FD 50%, transparent 80%)',
        }}
      />
    </div>
  );
};
