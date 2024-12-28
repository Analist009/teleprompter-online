import React, { useEffect, useRef } from 'react';
import { useSmartScroll } from '../../../hooks/useSmartScroll';

interface AutoScrollProps {
  isActive: boolean;
  speed: number;
  content: string;
  fontSize: number;
  onComplete?: () => void;
}

export default function AutoScroll({
  isActive,
  speed,
  content,
  fontSize,
  onComplete,
}: AutoScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { startScroll, stopScroll, resetScroll } = useSmartScroll(containerRef, speed);

  useEffect(() => {
    if (isActive) {
      startScroll();
    } else {
      stopScroll();
    }
    return () => stopScroll();
  }, [isActive, startScroll, stopScroll]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const isAtBottom = 
        container.scrollHeight - container.scrollTop === container.clientHeight;
      if (isAtBottom) {
        onComplete?.();
      }
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [onComplete]);

  return (
    <div 
      ref={containerRef}
      className="h-full overflow-hidden"
      style={{ fontSize: `${fontSize}px` }}
    >
      {content}
    </div>
  );
}