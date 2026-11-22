'use client';

import React, { useState, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { SectionShell } from '@/components/layout/SectionShell';
import { EditorialHeading } from '@/components/ui/EditorialHeading';
import { Button } from '@/components/ui/Button';
import { WheelResultModal } from './WheelResultModal';
import { triggerConfetti } from '@/components/ui/Confetti';
import { secureRandom } from '@/lib/random';
import { announceToScreenReader } from '@/lib/a11y';
import { useJourneyStore } from '@/store/journeyStore';
import { useAudio } from '@/hooks/useAudio';
import { content } from '@/config/content';
import { WheelSegment } from '@/types/content';

export const LoveWheel: React.FC = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedResult, setSelectedResult] = useState<WheelSegment | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const lastIndexRef = useRef<number | null>(null);
  const currentRotationRef = useRef<number>(0);

  const controls = useAnimation();
  const goToChapter = useJourneyStore((state) => state.goToChapter);
  const completeChapter = useJourneyStore((state) => state.completeChapter);
  const { playSfx } = useAudio();

  const segments = content.wheel.segments;
  const numSegments = segments.length;
  const anglePerSegment = 360 / numSegments;

  const handleSpin = async () => {
    if (isSpinning) return;
    setIsSpinning(true);

    // 1. Pick a random segment (ensuring no direct repeat)
    let winnerIndex = Math.floor(secureRandom() * numSegments);
    if (lastIndexRef.current !== null && numSegments > 1) {
      while (winnerIndex === lastIndexRef.current) {
        winnerIndex = Math.floor(secureRandom() * numSegments);
      }
    }
    lastIndexRef.current = winnerIndex;
    const winner = segments[winnerIndex];

    // 2. Compute exact rotation
    // Pointer is at the top (12 o'clock, 0° / 360°).
    // Segment winnerIndex center is at winnerIndex * anglePerSegment + anglePerSegment / 2.
    // When the wheel rotates clockwise by R degrees, the segment lands under the top pointer if:
    // (centerOffset + R) % 360 == 0 -> targetNormalized = (360 - centerOffset) % 360.
    const centerOffset = winnerIndex * anglePerSegment + anglePerSegment / 2;
    const targetNormalized = (360 - centerOffset) % 360;

    const fullSpins = (5 + Math.floor(secureRandom() * 3)) * 360; // 5-7 full spins
    const randomJitter = (secureRandom() - 0.5) * (anglePerSegment * 0.3); // slight natural offset within segment
    const nextRotation =
      currentRotationRef.current +
      fullSpins +
      targetNormalized -
      (currentRotationRef.current % 360) +
      randomJitter;

    currentRotationRef.current = nextRotation;

    // Tick sounds during spin
    playSfx(content.audio.sfx.chime);

    // Animate rotation with heavy ease-out deceleration (4.2 seconds)
    await controls.start({
      rotate: nextRotation,
      transition: {
        duration: 4.2,
        ease: [0.15, 0.95, 0.25, 1],
      },
    });

    setIsSpinning(false);
    setSelectedResult(winner);
    setIsModalOpen(true);

    playSfx(content.audio.sfx.correct);
    if (['romantic', 'kiss', 'surprise', 'hug'].includes(winner.type)) {
      triggerConfetti({ preset: 'hearts' });
    }

    announceToScreenReader(`The wheel landed on: ${winner.label}. ${winner.resultDescription}`);
  };

  const handleContinue = () => {
    setIsModalOpen(false);
    completeChapter(2);
    goToChapter(3);
  };

  return (
    <SectionShell chapter={2} chapterName="Love Wheel" className="py-6 sm:py-10">
      <div className="w-full max-w-xl mx-auto flex flex-col items-center text-center">
        <EditorialHeading
          chapterNumber={2}
          title="Spin the Love Wheel"
          subtitle="Every spin holds a gentle promise, memory, or sweet surprise."
          emphasisWord="Wheel"
        />

        {/* Wheel Container */}
        <div className="relative w-[320px] h-[320px] sm:w-[400px] sm:h-[400px] my-4 select-none flex items-center justify-center">
          {/* Top Pointer Arrow */}
          <div className="absolute top-[-16px] left-1/2 -translate-x-1/2 z-30 drop-shadow-lg">
            <svg width="32" height="38" viewBox="0 0 32 38" fill="none">
              <path
                d="M16 36 L4 8 C 2 4, 5 0, 9 0 L 23 0 C 27 0, 30 4, 28 8 Z"
                fill="#C9796A"
                stroke="#FFF8F0"
                strokeWidth="2.5"
              />
              <circle cx="16" cy="11" r="3.5" fill="#FFF8F0" />
            </svg>
          </div>

          {/* Rotating SVG Wheel */}
          <motion.div
            animate={controls}
            className="w-full h-full rounded-full shadow-ambient cursor-pointer"
            onClick={!isSpinning ? handleSpin : undefined}
          >
            <svg
              viewBox="0 0 500 500"
              className="w-full h-full drop-shadow-md"
              style={{ transformOrigin: 'center center' }}
            >
              <defs>
                {/* Metallic rim gradient */}
                <linearGradient id="wheelRimGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="25%" stopColor="#FDDDE6" />
                  <stop offset="50%" stopColor="#FFFFFF" />
                  <stop offset="75%" stopColor="#FBB6CE" />
                  <stop offset="100%" stopColor="#FFFFFF" />
                </linearGradient>

                {/* Center hub shadow filter */}
                <filter id="hubShadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#7C3A5E" floodOpacity="0.18" />
                </filter>
              </defs>

              {/* Outer Metallic Bezel */}
              <circle cx="250" cy="250" r="246" fill="url(#wheelRimGradient)" stroke="#F472B6" strokeWidth="2" />
              <circle cx="250" cy="250" r="240" fill="#FFF8F0" />

              {/* Pie Segments */}
              {segments.map((seg, idx) => {
                const startAngle = idx * anglePerSegment;
                const endAngle = (idx + 1) * anglePerSegment;
                const radStart = (startAngle - 90) * (Math.PI / 180);
                const radEnd = (endAngle - 90) * (Math.PI / 180);

                const x1 = 250 + 236 * Math.cos(radStart);
                const y1 = 250 + 236 * Math.sin(radStart);
                const x2 = 250 + 236 * Math.cos(radEnd);
                const y2 = 250 + 236 * Math.sin(radEnd);

                const pathData = `M 250 250 L ${x1} ${y1} A 236 236 0 0 1 ${x2} ${y2} Z`;
                const midAngle = (startAngle + endAngle) / 2;

                return (
                  <g key={seg.id}>
                    {/* Wedge background */}
                    <path
                      d={pathData}
                      fill={seg.color}
                      stroke="#FFFFFF"
                      strokeWidth="2.5"
                    />

                    {/* Radial Group: perfectly centered, with generous breathing margins */}
                    <g transform={`rotate(${midAngle} 250 250)`}>
                      {/* Emoji Icon at top of wedge */}
                      <text
                        x="250"
                        y="62"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fontSize="20"
                        className="select-none pointer-events-none"
                      >
                        {seg.emoji}
                      </text>

                      {/* Text label running radially along wedge ray from center outward */}
                      <text
                        x="250"
                        y="170"
                        transform="rotate(-90 250 170)"
                        textAnchor="start"
                        dominantBaseline="central"
                        fill="#6B2D4F"
                        fontSize="12.5"
                        fontWeight="700"
                        letterSpacing="0.02em"
                        fontFamily="var(--font-dm-sans), sans-serif"
                      >
                        {seg.label}
                      </text>
                    </g>
                  </g>
                );
              })}

              {/* Center Decorative Hub */}
              <circle
                cx="250"
                cy="250"
                r="38"
                fill="#FFF8F0"
                stroke="#F472B6"
                strokeWidth="4"
                filter="url(#hubShadow)"
              />
              <circle cx="250" cy="250" r="22" fill="#FDDDE6" />
              <text
                x="250"
                y="254"
                fontSize="18"
                textAnchor="middle"
                dominantBaseline="middle"
                className="select-none pointer-events-none"
              >
                💖
              </text>
            </svg>
          </motion.div>
        </div>

        {/* Spin Action Button */}
        <div className="mt-4">
          <Button
            variant="primary"
            size="lg"
            onClick={handleSpin}
            disabled={isSpinning}
            className="px-10 shadow-glow-rose"
          >
            {isSpinning ? 'Spinning with Love...' : content.wheel.spinButtonLabel} 🎡
          </Button>
        </div>

        {/* Result Popup Modal */}
        <WheelResultModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          result={selectedResult}
          onSpinAgain={() => {
            setIsModalOpen(false);
            handleSpin();
          }}
          onContinue={handleContinue}
        />
      </div>
    </SectionShell>
  );
};
