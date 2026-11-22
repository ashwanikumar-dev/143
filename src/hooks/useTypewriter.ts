'use client';

import { useState, useEffect, useRef } from 'react';
import { useReducedMotion } from './useReducedMotion';

interface UseTypewriterOptions {
  speed?: number;
  initialDelay?: number;
  onComplete?: () => void;
}

export function useTypewriter(text: string, options: UseTypewriterOptions = {}) {
  const { speed = 20, initialDelay = 100 } = options;
  const onCompleteRef = useRef(options.onComplete);
  onCompleteRef.current = options.onComplete;

  const reducedMotion = useReducedMotion();
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const textRef = useRef(text);
  textRef.current = text;

  useEffect(() => {
    if (reducedMotion) {
      setDisplayText(text);
      setIsComplete(true);
      onCompleteRef.current?.();
      return;
    }

    setDisplayText('');
    setIsComplete(false);

    let idx = 0;
    const targetText = text;
    let timer: NodeJS.Timeout | null = null;

    const timeout = setTimeout(() => {
      timer = setInterval(() => {
        if (idx < targetText.length) {
          idx++;
          setDisplayText(targetText.slice(0, idx));
        } else {
          if (timer) clearInterval(timer);
          setIsComplete(true);
          onCompleteRef.current?.();
        }
      }, speed);
    }, initialDelay);

    return () => {
      clearTimeout(timeout);
      if (timer) clearInterval(timer);
    };
  }, [text, speed, initialDelay, reducedMotion]);

  return {
    displayText,
    isComplete,
    skip: () => {
      setDisplayText(text);
      setIsComplete(true);
      onCompleteRef.current?.();
    },
  };
}
