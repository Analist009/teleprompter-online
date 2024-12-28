import React, { useRef, useEffect } from 'react';
import { useSmartScroll } from '../../hooks/useSmartScroll';
import { motion, AnimatePresence } from 'framer-motion';
import './styles.css';

interface TeleprompterDisplayProps {
  content: string;
  fontSize: number;
  textColor: string;
  backgroundColor: string;
  isScrolling: boolean;
  speed: number;
  mirrorText: boolean;
  countdown: number;
}

export default function TeleprompterDisplay({
  content,
  fontSize,
  textColor,
  backgroundColor,
  isScrolling,
  speed,
  mirrorText,
  countdown,
}: TeleprompterDisplayProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { startScroll, stopScroll, resetScroll } = useSmartScroll(containerRef, speed);

  useEffect(() => {
    if (isScrolling) {
      startScroll();
    } else {
      stopScroll();
    }
    return () => stopScroll();
  }, [isScrolling, startScroll, stopScroll]);

  return (
    <motion.div 
      className="relative flex-1"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <AnimatePresence>
        {countdown > 0 && !isScrolling && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              transition: {
                duration: 0.3,
                ease: "easeOut"
              }
            }}
            exit={{ 
              opacity: 0, 
              scale: 0.5,
              transition: {
                duration: 0.2,
                ease: "easeIn"
              }
            }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                     text-6xl font-bold text-white glass-effect rounded-full w-28 h-28
                     flex items-center justify-center z-10 shadow-lg"
          >
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              {countdown}
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>

      <div
        ref={containerRef}
        style={{
          backgroundColor: `${backgroundColor}dd`,
          transform: mirrorText ? 'scaleX(-1)' : 'none',
        }}
        className="relative h-[80vh] overflow-y-auto teleprompter-scrollbar
                   rounded-xl shadow-2xl teleprompter-transition"
        data-teleprompter-content
      >
        <div
          style={{
            fontSize: `${fontSize}px`,
            color: textColor,
          }}
          className={`p-8 whitespace-pre-wrap leading-relaxed ${
            mirrorText ? 'text-left' : 'text-right'
          } teleprompter-transition`}
          dir="rtl"
        >
          {content || 'הכנס טקסט להצגה...'}
        </div>

        {isScrolling && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              className="absolute top-0 left-0 right-0 h-32 
                       bg-gradient-to-b from-black to-transparent 
                       pointer-events-none"
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              className="absolute bottom-0 left-0 right-0 h-32 
                       bg-gradient-to-t from-black to-transparent 
                       pointer-events-none"
            />
          </>
        )}
      </div>
    </motion.div>
  );
}