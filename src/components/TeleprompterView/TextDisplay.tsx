import React, { forwardRef } from 'react';
import './styles.css';

interface TextDisplayProps {
  content: string;
  fontSize: number;
  isScrolling: boolean;
  speed: number;
  mirrorText: boolean;
  countdown: number;
}

const TextDisplay = forwardRef<HTMLDivElement, TextDisplayProps>(({
  content,
  fontSize,
  isScrolling,
  mirrorText,
  countdown,
}, ref) => {
  return (
    <div className="relative flex-1">
      {countdown > 0 && !isScrolling && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                     text-6xl font-bold text-white glass-effect rounded-full w-28 h-28
                     flex items-center justify-center z-10 shadow-lg">
          <span>{countdown}</span>
        </div>
      )}

      <div
        ref={ref}
        style={{
          fontSize: `${fontSize}px`,
          transform: mirrorText ? 'scaleX(-1)' : 'none',
        }}
        className="h-[80vh] overflow-y-auto teleprompter-scrollbar bg-black/80
                   rounded-xl shadow-2xl p-8 text-white"
        dir="rtl"
      >
        {content || 'הכנס טקסט להצגה...'}
      </div>

      {isScrolling && (
        <>
          <div className="absolute top-0 left-0 right-0 h-32 
                       bg-gradient-to-b from-black to-transparent 
                       pointer-events-none" />
          <div className="absolute bottom-0 left-0 right-0 h-32 
                       bg-gradient-to-t from-black to-transparent 
                       pointer-events-none" />
        </>
      )}
    </div>
  );
});

TextDisplay.displayName = 'TextDisplay';

export default TextDisplay;