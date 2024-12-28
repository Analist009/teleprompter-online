import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface KaraokeDisplayProps {
  text: string;
  isRecording: boolean;
}

const KaraokeDisplay: React.FC<KaraokeDisplayProps> = ({ text, isRecording }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [text]);

  const words = text.split(' ').filter(Boolean);

  return (
    <div 
      ref={containerRef}
      className="relative h-[200px] overflow-y-auto bg-gray-900/50 rounded-lg p-4 backdrop-blur-sm"
    >
      <AnimatePresence mode="popLayout">
        {words.map((word, index) => (
          <motion.span
            key={`${word}-${index}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="inline-block mx-1 text-xl text-white"
          >
            {word}
          </motion.span>
        ))}
        {isRecording && (
          <motion.span
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="inline-block w-3 h-3 bg-red-500 rounded-full ml-2"
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default KaraokeDisplay;