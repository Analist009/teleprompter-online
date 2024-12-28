import React, { forwardRef } from 'react';

interface TextAreaProps {
  content: string;
  onChange: (content: string) => void;
  style: React.CSSProperties;
  isScrolling: boolean;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ content, onChange, style, isScrolling }, ref) => {
    return (
      <div className="relative">
        <textarea
          ref={ref}
          value={content}
          onChange={(e) => onChange(e.target.value)}
          style={style}
          className="w-full min-h-[60vh] p-6 rounded-lg shadow-lg resize-none
                     focus:outline-none focus:ring-2 focus:ring-blue-500
                     transition-all duration-200"
          placeholder="הכנס את הטקסט כאן..."
          dir="rtl"
        />
        {isScrolling && (
          <>
            <div className="absolute top-0 left-0 right-0 h-16 
                          bg-gradient-to-b from-black/20 to-transparent 
                          pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 h-16 
                          bg-gradient-to-t from-black/20 to-transparent 
                          pointer-events-none" />
          </>
        )}
      </div>
    );
  }
);

TextArea.displayName = 'TextArea';

export default TextArea;