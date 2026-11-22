'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { WaxSeal } from '@/components/illustrations/WaxSeal';

interface EnvelopeAnimationProps {
  isOpen: boolean;
  onOpen: () => void;
  senderName: string;
  recipientName: string;
}

export const EnvelopeAnimation: React.FC<EnvelopeAnimationProps> = ({
  isOpen,
  onOpen,
  senderName,
  recipientName,
}) => {
  return (
    <div className="relative flex flex-col items-center justify-center select-none py-2">
      {/* Outer Glow Halo */}
      <div className="absolute w-72 h-72 sm:w-80 sm:h-80 rounded-full bg-rose-200/50 blur-3xl pointer-events-none -z-10 animate-pulse-soft" />

      {/* Interactive Envelope Container */}
      <motion.div
        animate={
          isOpen
            ? {}
            : {
                y: [0, -10, 0],
              }
        }
        transition={{
          repeat: Infinity,
          duration: 3.5,
          ease: 'easeInOut',
        }}
        className="relative w-[280px] sm:w-[340px] md:w-[380px] h-[190px] sm:h-[230px] md:h-[250px] cursor-pointer hover:scale-102 transition-transform duration-300"
        onClick={!isOpen ? onOpen : undefined}
      >
        {/* Envelope Back Base */}
        <div className="absolute inset-0 bg-[#F9EBE0] rounded-card shadow-soft border border-white/80 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-white/50 via-transparent to-plum-900/5 pointer-events-none" />
        </div>

        {/* Letter Card sliding up out of envelope */}
        <motion.div
          initial={{ y: 0, opacity: 0 }}
          animate={isOpen ? { y: -90, opacity: 1 } : { y: 0, opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-x-4 top-2 h-[185px] bg-white rounded-card shadow-soft border border-rose-100 p-4 sm:p-5 flex flex-col items-center justify-center text-center z-10"
        >
          <span className="font-hand text-2xl sm:text-3xl text-rose-500 mb-1">
            For {recipientName} 💌
          </span>
          <p className="font-serif text-xs sm:text-sm text-plum-600 leading-relaxed italic max-w-[240px]">
            &ldquo;Every step forward begins with an honest heart.&rdquo;
          </p>
          <span className="font-sans text-[10px] text-plum-400 mt-2 uppercase tracking-widest">
            From {senderName}
          </span>
        </motion.div>

        {/* Envelope Body (Front Pocket) */}
        <div
          className="absolute inset-0 rounded-card pointer-events-none z-20"
          style={{
            background: 'linear-gradient(180deg, rgba(255,248,240,0.95) 0%, rgba(253,221,230,0.95) 100%)',
            clipPath: 'polygon(0% 100%, 50% 40%, 100% 100%, 100% 100%, 0% 100%)',
            boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.03)',
          }}
        />

        {/* Envelope Side Flaps */}
        <div
          className="absolute inset-0 rounded-card pointer-events-none z-20"
          style={{
            background: 'linear-gradient(90deg, rgba(255,248,240,0.98) 0%, rgba(250,230,235,0.9) 100%)',
            clipPath: 'polygon(0% 0%, 50% 50%, 0% 100%)',
          }}
        />
        <div
          className="absolute inset-0 rounded-card pointer-events-none z-20"
          style={{
            background: 'linear-gradient(270deg, rgba(255,248,240,0.98) 0%, rgba(250,230,235,0.9) 100%)',
            clipPath: 'polygon(100% 0%, 50% 50%, 100% 100%)',
          }}
        />

        {/* Envelope Top Flap with 3D Rotate */}
        <motion.div
          animate={isOpen ? { rotateX: 180, zIndex: 5 } : { rotateX: 0, zIndex: 30 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          style={{
            transformOrigin: 'top center',
            transformStyle: 'preserve-3d',
          }}
          className="absolute inset-x-0 top-0 h-[60%] pointer-events-none"
        >
          <div
            className="w-full h-full rounded-t-card"
            style={{
              background: 'linear-gradient(180deg, #FFF8F0 0%, #FDDDE6 100%)',
              clipPath: 'polygon(0% 0%, 100% 0%, 50% 100%)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
            }}
          />
        </motion.div>

        {/* Wax Seal on Flap with Heartbeat pulse */}
        <motion.div
          animate={isOpen ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="absolute top-[38%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 cursor-pointer animate-heartbeat"
        >
          <WaxSeal size={56} isCracked={isOpen} />
        </motion.div>
      </motion.div>
    </div>
  );
};
