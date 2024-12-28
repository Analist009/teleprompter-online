import { useCallback, useRef, useEffect } from 'react';

interface AutoScrollOptions {
  isActive: boolean;
  speed: number;
  delay?: number;
}

export const useAutoScroll = (ref: React.RefObject<HTMLTextAreaElement>, options: AutoScrollOptions) => {
  const scrollInterval = useRef<number>();
  const startTimeRef = useRef<number>();

  const startScroll = useCallback(() => {
    if (!ref.current) return;
    
    const animate = (timestamp: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
      }

      // התחל גלילה רק אחרי השהייה המוגדרת
      if (timestamp - startTimeRef.current >= (options.delay || 0)) {
        if (ref.current) {
          ref.current.scrollTop += options.speed / 60;
        }
      }

      if (options.isActive) {
        scrollInterval.current = requestAnimationFrame(animate);
      }
    };

    scrollInterval.current = requestAnimationFrame(animate);
  }, [options.isActive, options.speed, options.delay]);

  const stopScroll = useCallback(() => {
    if (scrollInterval.current) {
      cancelAnimationFrame(scrollInterval.current);
      scrollInterval.current = undefined;
    }
    startTimeRef.current = undefined;
  }, []);

  useEffect(() => {
    if (options.isActive) {
      startScroll();
    } else {
      stopScroll();
    }

    return () => stopScroll();
  }, [options.isActive, startScroll, stopScroll]);

  return { startScroll, stopScroll };
};