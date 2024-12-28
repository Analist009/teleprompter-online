import { useCallback } from 'react';
import { TextStats } from '../../../../../types';

export function useTextProcessor() {
  const processText = useCallback((text: string) => {
    // Remove multiple spaces and normalize line breaks
    const cleanText = text
      .replace(/\s+/g, ' ')
      .replace(/\n\s*\n/g, '\n')
      .trim();

    // Calculate statistics
    const words = cleanText.split(/\s+/).filter(Boolean);
    const lines = cleanText.split('\n');
    const chars = cleanText.length;
    const readingTime = Math.ceil(words.length / 200); // 200 words per minute

    const stats: TextStats = {
      wordsCount: words.length,
      charsCount: chars,
      linesCount: lines.length,
      estimatedReadTime: readingTime,
      uniqueWords: new Set(words.map(w => w.toLowerCase())).size,
      avgWordLength: chars / (words.length || 1)
    };

    return { text: cleanText, stats };
  }, []);

  return { processText };
}