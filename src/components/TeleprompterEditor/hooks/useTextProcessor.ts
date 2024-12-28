import { useState, useEffect } from 'react';

interface TextStats {
  wordsCount: number;
  charsCount: number;
  linesCount: number;
}

export const useTextProcessor = (text: string) => {
  const [stats, setStats] = useState<TextStats>({
    wordsCount: 0,
    charsCount: 0,
    linesCount: 0,
  });

  useEffect(() => {
    const words = text.trim().split(/\s+/).filter(Boolean);
    
    setStats({
      wordsCount: words.length,
      charsCount: text.length,
      linesCount: text.split('\n').length,
    });
  }, [text]);

  return { stats };
};