export interface TextStatsData {
  wordsCount: number;
  linesCount: number;
  charsCount: number;
  estimatedTime: number;
  uniqueWords?: number;
  avgWordLength?: number;
}

export interface TextStatsProps {
  stats: TextStatsData;
  className?: string;
}