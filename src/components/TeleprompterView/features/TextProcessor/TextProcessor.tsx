import React, { useEffect, useState } from 'react';
import { useTextProcessor } from './hooks/useTextProcessor';
import { TextStats } from '../../../../types';

interface TextProcessorProps {
  content: string;
  onStatsUpdate: (stats: TextStats) => void;
}

export default function TextProcessor({ content, onStatsUpdate }: TextProcessorProps) {
  const { stats, processText } = useTextProcessor();
  const [processedContent, setProcessedContent] = useState(content);

  useEffect(() => {
    const { text, stats } = processText(content);
    setProcessedContent(text);
    onStatsUpdate(stats);
  }, [content, processText, onStatsUpdate]);

  return (
    <div className="text-right" dir="rtl">
      {processedContent}
    </div>
  );
}