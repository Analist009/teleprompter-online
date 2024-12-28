import { useEffect, useState, useCallback } from 'react';

interface UseScrollProgressOptions {
  onProgressChange?: (progress: number) => void;
  onComplete?: () => void;
  threshold?: number;
}

export function useScrollProgress(
  containerRef: React.RefObject<HTMLElement>,
  options: UseScrollProgressOptions = {}
) {
  const [progress, setProgress] = useState(0);
  const { onProgressChange, onComplete, threshold = 0.99 } = options;

  const calculateProgress = useCallback(() => {
    if (!containerRef.current) return 0;
    
    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    const maxScroll = scrollHeight - clientHeight;
    const currentProgress = scrollTop / maxScroll;
    
    return Math.min(Math.max(currentProgress, 0), 1);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const newProgress = calculateProgress();
      setProgress(newProgress);
      onProgressChange?.(newProgress);

      if (newProgress >= threshold) {
        onComplete?.();
      }
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [calculateProgress, onProgressChange, onComplete, threshold]);

  return { progress };
}