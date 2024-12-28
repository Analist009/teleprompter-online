import React from 'react';
import { Pencil, BookOpen, Coffee, Code } from 'lucide-react';

const styles = [
  { id: 'professional', name: 'מקצועי', icon: Pencil },
  { id: 'informative', name: 'אינפורמטיבי', icon: BookOpen },
  { id: 'casual', name: 'יומיומי', icon: Coffee },
  { id: 'technical', name: 'טכני', icon: Code }
];

interface StyleSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function StyleSelector({ value, onChange }: StyleSelectorProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm text-gray-300">סגנון כתיבה</label>
      <div className="grid grid-cols-2 gap-2">
        {styles.map((style) => {
          const Icon = style.icon;
          return (
            <button
              key={style.id}
              onClick={() => onChange(style.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all
                ${value === style.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
            >
              <Icon className="w-4 h-4" />
              <span>{style.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}