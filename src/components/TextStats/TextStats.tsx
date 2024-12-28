import React from 'react';
import { AlignJustify, Clock, Type, Book, Hash } from 'lucide-react';
import { TextStats as TextStatsType } from '../../types';

interface TextStatsProps {
  stats: TextStatsType;
}

export default function TextStats({ stats }: TextStatsProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
      <div className="stat-card">
        <Type className="w-4 h-4 text-blue-400" />
        <span className="text-sm">מילים</span>
        <span className="text-lg font-bold">{stats.wordsCount}</span>
      </div>

      <div className="stat-card">
        <Hash className="w-4 h-4 text-green-400" />
        <span className="text-sm">תווים</span>
        <span className="text-lg font-bold">{stats.charsCount}</span>
      </div>

      <div className="stat-card">
        <AlignJustify className="w-4 h-4 text-purple-400" />
        <span className="text-sm">שורות</span>
        <span className="text-lg font-bold">{stats.linesCount}</span>
      </div>

      <div className="stat-card">
        <Clock className="w-4 h-4 text-yellow-400" />
        <span className="text-sm">זמן קריאה</span>
        <span className="text-lg font-bold">{stats.estimatedReadTime} דק׳</span>
      </div>

      <div className="stat-card">
        <Book className="w-4 h-4 text-red-400" />
        <span className="text-sm">מילים ייחודיות</span>
        <span className="text-lg font-bold">{stats.uniqueWords}</span>
      </div>

      <div className="stat-card">
        <Type className="w-4 h-4 text-indigo-400" />
        <span className="text-sm">אורך מילה ממוצע</span>
        <span className="text-lg font-bold">{stats.avgWordLength}</span>
      </div>
    </div>
  );
}