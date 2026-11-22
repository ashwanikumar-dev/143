'use client';

import { useEffect, useRef } from 'react';

export function useGameLoop(callback: (deltaTime: number) => void, isRunning = true) {
  const reqIdRef = useRef<number | null>(null);
  const previousTimeRef = useRef<number | null>(null);
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!isRunning) {
      if (reqIdRef.current) cancelAnimationFrame(reqIdRef.current);
      previousTimeRef.current = null;
      return;
    }

    const loop = (currentTime: number) => {
      if (previousTimeRef.current !== null) {
        const deltaTime = (currentTime - previousTimeRef.current) / 1000;
        callbackRef.current(deltaTime);
      }
      previousTimeRef.current = currentTime;
      reqIdRef.current = requestAnimationFrame(loop);
    };

    reqIdRef.current = requestAnimationFrame(loop);

    return () => {
      if (reqIdRef.current) cancelAnimationFrame(reqIdRef.current);
    };
  }, [isRunning]);
}
