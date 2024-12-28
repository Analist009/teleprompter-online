import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useSmartScroll } from '../hooks/useSmartScroll';
import TextStats from './TextStats/TextStats';
import { analyzeText } from '../utils/textProcessor';

interface TeleprompterDisplayProps {
  content: string;
  fontSize: number;
  isScrolling: boolean;
  speed: number;
  mirrorText: boolean;
  onComplete?: () => void;
}

export default function TeleprompterDisplay({
  content,
  fontSize,
  isScrolling,
  speed,
  mirrorText,
  onComplete
}: TeleprompterDisplayProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [stats, setStats] = useState(analyzeText(content));
  const { startScroll, stopScroll, resetScroll } = useSmartScroll(containerRef, speed);

  useEffect(() => {
    setStats(analyzeText(content));
  }, [content]);

  useEffect(() => {
    if (isScrolling) {
      startScroll();
    } else {
      stopScroll();
    }
    return () => stopScroll();
  }, [isScrolling, speed, startScroll, stopScroll]);

  return (
    <div className="space-y-4">
      <TextStats stats={stats} />
      
      <motion.div 
        className="relative"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div
          ref={containerRef}
          style={{
            fontSize: `${fontSize}px`,
            transform: mirrorText ? 'scaleX(-1)' : 'none'
          }}
          className="h-[70vh] overflow-y-auto bg-gray-900/80 rounded-xl p-8
                     text-white shadow-xl transition-all duration-300"
          dir="rtl"
        >
          {content || 'הכנס טקסט להצגה...'}
        </div>

        {isScrolling && (
          <>
            <div className="absolute top-0 left-0 right-0 h-24 
                         bg-gradient-to-b from-gray-900 to-transparent 
                         pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 h-24 
                         bg-gradient-to-t from-gray-900 to-transparent 
                         pointer-events-none" />
          </>
        )}
      </motion.div>
    </div>
  );
}