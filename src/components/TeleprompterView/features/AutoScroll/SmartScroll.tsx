import React, { useEffect, useRef } from 'react';
import { useSmartScroll } from './hooks/useSmartScroll';
import { useScrollProgress } from './hooks/useScrollProgress';

interface SmartScrollProps {
  content: string;
  isScrolling: boolean;
  speed: number;
  onProgress: (progress: number) => void;
  onComplete: () => void;
}

export default function SmartScroll({
  content,
  isScrolling,
  speed,
  onProgress,
  onComplete
}: SmartScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { startScroll, stopScroll, resetScroll } = useSmartScroll(containerRef, {
    speed,
    smoothing: 1000,
    acceleration: 0.5
  });

  const { progress } = useScrollProgress(containerRef, {
    onProgressChange: onProgress,
    onComplete
  });

  useEffect(() => {
    if (isScrolling) {
      startScroll();
    } else {
      stopScroll();
    }
  }, [isScrolling, startScroll, stopScroll]);

  return (
    <div 
      ref={containerRef}
      className="relative overflow-y-auto h-full"
    >
      <div className="absolute bottom-4 right-4 bg-gray-800/80 px-3 py-1 rounded-full text-sm">
        {Math.round(progress * 100)}%
      </div>
      {content}
    </div>
  );
}