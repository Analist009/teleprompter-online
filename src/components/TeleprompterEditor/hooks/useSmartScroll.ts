import { useCallback, useRef } from 'react';

interface SmartScrollOptions {
  speed: number;
  smoothing?: number;
}

export const useSmartScroll = (
  ref: React.RefObject<HTMLTextAreaElement>,
  options: SmartScrollOptions
) => {
  const scrollInterval = useRef<number>();
  const startTimeRef = useRef<number>();
  const lastScrollPos = useRef<number>(0);

  const startScroll = useCallback(() => {
    if (!ref.current) return;
    
    const animate = (timestamp: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
        lastScrollPos.current = ref.current?.scrollTop || 0;
      }

      const elapsed = timestamp - startTimeRef.current;
      const smoothing = options.smoothing || 500;
      
      // Improved acceleration curve
      const acceleration = Math.min(elapsed / smoothing, 1);
      const speedFactor = 0.5 + (acceleration * 0.5); // Smooth start
      
      if (ref.current) {
        const step = (options.speed * speedFactor) / 15; // Adjusted base speed
        ref.current.scrollTop += step;
        lastScrollPos.current = ref.current.scrollTop;
      }

      scrollInterval.current = requestAnimationFrame(animate);
    };

    scrollInterval.current = requestAnimationFrame(animate);
  }, [options.speed, options.smoothing]);

  const stopScroll = useCallback(() => {
    if (scrollInterval.current) {
      cancelAnimationFrame(scrollInterval.current);
      scrollInterval.current = undefined;
    }
    startTimeRef.current = undefined;
  }, []);

  const resetScroll = useCallback(() => {
    if (ref.current) {
      ref.current.scrollTop = 0;
      lastScrollPos.current = 0;
    }
  }, [ref]);

  return { startScroll, stopScroll, resetScroll };
};