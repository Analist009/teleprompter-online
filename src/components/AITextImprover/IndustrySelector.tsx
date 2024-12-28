import React from 'react';
import { Building2 } from 'lucide-react';

const industries = [
  { id: 'general', name: 'כללי' },
  { id: 'tech', name: 'טכנולוגיה' },
  { id: 'medical', name: 'רפואה' },
  { id: 'legal', name: 'משפטים' },
  { id: 'education', name: 'חינוך' },
  { id: 'marketing', name: 'שיווק' },
  { id: 'finance', name: 'פיננסים' },
  { id: 'entertainment', name: 'בידור' },
  { id: 'science', name: 'מדע' },
  { id: 'government', name: 'ממשל' }
];

interface IndustrySelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function IndustrySelector({ value, onChange }: IndustrySelectorProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm text-gray-300">תחום</label>
      <div className="grid grid-cols-2 gap-2">
        {industries.map((industry) => (
          <button
            key={industry.id}
            onClick={() => onChange(industry.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all
              ${value === industry.id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
          >
            <Building2 className="w-4 h-4" />
            <span>{industry.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}