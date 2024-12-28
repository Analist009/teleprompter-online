import React, { useRef, useEffect } from 'react';
import { useSmartScroll } from '../hooks/useSmartScroll';

interface TextDisplayProps {
  content: string;
  fontSize: number;
  textColor: string;
  backgroundColor: string;
  isScrolling: boolean;
  speed: number;
}

const TextDisplay: React.FC<TextDisplayProps> = ({
  content,
  fontSize,
  textColor,
  backgroundColor,
  isScrolling,
  speed,
}) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const { startScroll, stopScroll } = useSmartScroll(textAreaRef, {
    speed,
    smoothing: 500,
  });

  useEffect(() => {
    if (isScrolling) {
      startScroll();
    } else {
      stopScroll();
    }
    return () => stopScroll();
  }, [isScrolling, speed, startScroll, stopScroll]);

  return (
    <div className="relative flex-1">
      <textarea
        ref={textAreaRef}
        value={content}
        readOnly
        style={{
          fontSize: `${fontSize}px`,
          color: textColor,
          backgroundColor,
        }}
        className="w-full h-[70vh] p-8 rounded-lg shadow-lg resize-none
                   focus:outline-none focus:ring-2 focus:ring-blue-500
                   transition-all duration-200 leading-relaxed"
        dir="rtl"
      />
      
      {isScrolling && (
        <>
          <div className="absolute top-0 left-0 right-0 h-24 
                        bg-gradient-to-b from-black/30 to-transparent 
                        pointer-events-none" />
          <div className="absolute bottom-0 left-0 right-0 h-24 
                        bg-gradient-to-t from-black/30 to-transparent 
                        pointer-events-none" />
        </>
      )}
    </div>
  );
};

export default TextDisplay;