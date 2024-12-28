import { useCallback, useRef, useEffect } from 'react';

interface ScrollState {
  isScrolling: boolean;
  startTime: number | null;
  currentSpeed: number;
  lastPosition: number;
}

export function useSmartScroll(containerRef: React.RefObject<HTMLElement>, baseSpeed: number) {
  const scrollState = useRef<ScrollState>({
    isScrolling: false,
    startTime: null,
    currentSpeed: 0,
    lastPosition: 0
  });
  const animationFrame = useRef<number>();

  const scroll = useCallback(() => {
    if (!containerRef.current || !scrollState.current.isScrolling) return;

    const now = performance.now();
    if (!scrollState.current.startTime) {
      scrollState.current.startTime = now;
      scrollState.current.lastPosition = containerRef.current.scrollTop;
    }

    // Smooth acceleration curve
    const elapsed = now - scrollState.current.startTime;
    const accelerationDuration = 1000; // 1 second to reach full speed
    const progress = Math.min(elapsed / accelerationDuration, 1);
    
    // Cubic easing for smoother start
    const easeInOutCubic = progress < 0.5
      ? 4 * progress * progress * progress
      : 1 - Math.pow(-2 * progress + 2, 3) / 2;

    const targetSpeed = baseSpeed * easeInOutCubic;
    scrollState.current.currentSpeed = targetSpeed;

    if (containerRef.current) {
      containerRef.current.scrollTop += targetSpeed / 60;
      scrollState.current.lastPosition = containerRef.current.scrollTop;
    }

    animationFrame.current = requestAnimationFrame(scroll);
  }, [baseSpeed]);

  const startScroll = useCallback(() => {
    scrollState.current = {
      isScrolling: true,
      startTime: null,
      currentSpeed: 0,
      lastPosition: containerRef.current?.scrollTop || 0
    };
    scroll();
  }, [scroll]);

  const stopScroll = useCallback(() => {
    scrollState.current.isScrolling = false;
    if (animationFrame.current) {
      cancelAnimationFrame(animationFrame.current);
    }
  }, []);

  const resetScroll = useCallback(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
      scrollState.current.lastPosition = 0;
    }
  }, []);

  useEffect(() => {
    return () => {
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, []);

  return { startScroll, stopScroll, resetScroll };
}