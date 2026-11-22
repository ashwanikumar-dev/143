'use client';

import React from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { WheelSegment } from '@/types/content';

interface WheelResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: WheelSegment | null;
  onSpinAgain: () => void;
  onContinue: () => void;
}

export const WheelResultModal: React.FC<WheelResultModalProps> = ({
  isOpen,
  onClose,
  result,
  onSpinAgain,
  onContinue,
}) => {
  if (!result) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={result.resultTitle}>
      <div className="space-y-6 text-center py-2">
        {/* Emoji / Icon Display */}
        <div
          className="w-20 h-20 mx-auto rounded-full flex items-center justify-center text-4xl shadow-soft border border-white"
          style={{ backgroundColor: result.color }}
        >
          {result.emoji}
        </div>

        {/* Message */}
        <div className="space-y-2">
          <p className="font-sans text-xs uppercase tracking-widest font-semibold text-rose-500">
            {result.label}
          </p>
          <p className="font-serif text-lg text-plum-700 leading-relaxed italic">
            &ldquo;{result.resultDescription}&rdquo;
          </p>
        </div>

        {/* Dual Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Button variant="soft" size="md" onClick={onSpinAgain} className="w-full sm:w-auto">
            Spin Again 🎡
          </Button>
          <Button variant="primary" size="md" onClick={onContinue} className="w-full sm:w-auto">
            Continue Journey →
          </Button>
        </div>
      </div>
    </Modal>
  );
};
