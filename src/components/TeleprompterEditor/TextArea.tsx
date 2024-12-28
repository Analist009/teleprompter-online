import React, { useEffect } from 'react';
import { useAutoScroll } from './useAutoScroll';

interface TextAreaProps {
  content: string;
  onChange: (content: string) => void;
  style: React.CSSProperties;
  textAreaRef: React.RefObject<HTMLTextAreaElement>;
  isScrolling: boolean;
  scrollSpeed: number;
}

const TextArea = React.memo(({ 
  content, 
  onChange, 
  style, 
  textAreaRef,
  isScrolling,
  scrollSpeed
}: TextAreaProps) => {
  const { startScroll, stopScroll } = useAutoScroll(textAreaRef, {
    isActive: isScrolling,
    speed: scrollSpeed,
    delay: 5000 // התחל גלילה אחרי 5 שניות
  });

  useEffect(() => {
    if (isScrolling) {
      startScroll();
    } else {
      stopScroll();
    }
  }, [isScrolling, startScroll, stopScroll]);

  return (
    <div className="relative">
      <textarea
        ref={textAreaRef}
        value={content}
        onChange={(e) => onChange(e.target.value)}
        style={style}
        className="w-full min-h-[600px] p-6 rounded-lg shadow-lg resize-none
                   focus:outline-none focus:ring-2 focus:ring-blue-500
                   text-right leading-relaxed transition-all duration-200"
        placeholder="הכנס את הטקסט כאן..."
        dir="rtl"
      />
      {isScrolling && (
        <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-black/20 to-transparent pointer-events-none" />
      )}
    </div>
  );
});

export default TextArea;