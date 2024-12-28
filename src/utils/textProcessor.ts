import { TextStats } from '../types';

export function analyzeText(text: string): TextStats {
  const cleanText = text.trim();
  const words = cleanText.split(/\s+/).filter(Boolean);
  const lines = cleanText.split('\n').filter(Boolean);
  const chars = cleanText.length;
  
  // Calculate reading time (average 200 words per minute)
  const readingTime = Math.ceil(words.length / 200);
  
  // Calculate unique words
  const uniqueWords = new Set(words.map(word => word.toLowerCase())).size;
  
  // Calculate average word length
  const avgWordLength = words.length > 0 
    ? (chars / words.length).toFixed(1) 
    : 0;

  return {
    wordsCount: words.length,
    charsCount: chars,
    linesCount: lines.length,
    estimatedReadTime: readingTime,
    uniqueWords,
    avgWordLength: Number(avgWordLength)
  };
}

export function formatText(text: string): string {
  return text
    .replace(/\s+/g, ' ')      // Replace multiple spaces with single space
    .replace(/\n\s*\n/g, '\n') // Remove empty lines
    .trim();
}