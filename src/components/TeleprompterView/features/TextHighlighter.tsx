import React, { useEffect, useRef, useState } from 'react';

interface TextHighlighterProps {
  text: string;
  isScrolling: boolean;
  speed: number;
}

export default function TextHighlighter({
  text,
  isScrolling,
  speed,
}: TextHighlighterProps) {
  const [highlightPosition, setHighlightPosition] = useState(0);
  const requestRef = useRef<number>();

  useEffect(() => {
    if (!isScrolling) {
      setHighlightPosition(0);
      return;
    }

    const animate = () => {
      setHighlightPosition(prev => prev + speed / 60);
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [isScrolling, speed]);

  const words = text.split(' ');
  const currentWordIndex = Math.floor(highlightPosition / 50);

  return (
    <div className="relative">
      {words.map((word, index) => (
        <span
          key={index}
          className={`inline-block mx-1 transition-colors duration-200 ${
            index === currentWordIndex ? 'text-blue-400' : 'text-white'
          }`}
        >
          {word}
        </span>
      ))}
    </div>
  );
}