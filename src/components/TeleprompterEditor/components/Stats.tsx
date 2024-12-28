import React from 'react';
import { AlignJustify, Clock, Type } from 'lucide-react';

interface StatsProps {
  wordsCount: number;
  charsCount: number;
  linesCount: number;
}

const Stats: React.FC<StatsProps> = ({ wordsCount, charsCount, linesCount }) => {
  return (
    <div className="grid grid-cols-3 gap-2 mb-4">
      <div className="stat-card">
        <Type className="w-4 h-4" />
        <span className="text-sm">מילים</span>
        <span className="text-lg font-bold">{wordsCount}</span>
      </div>
      <div className="stat-card">
        <AlignJustify className="w-4 h-4" />
        <span className="text-sm">שורות</span>
        <span className="text-lg font-bold">{linesCount}</span>
      </div>
      <div className="stat-card">
        <Clock className="w-4 h-4" />
        <span className="text-sm">תווים</span>
        <span className="text-lg font-bold">{charsCount}</span>
      </div>
    </div>
  );
};

export default Stats;