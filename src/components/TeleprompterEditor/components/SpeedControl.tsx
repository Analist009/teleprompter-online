import React from 'react';
import { Gauge } from 'lucide-react';

interface SpeedControlProps {
  speed: number;
  onChange: (speed: number) => void;
}

const SpeedControl: React.FC<SpeedControlProps> = ({ speed, onChange }) => {
  const speeds = [0.5, 1, 1.5, 2, 2.5, 3];

  return (
    <div className="flex items-center gap-4 bg-gray-800/30 p-3 rounded-lg backdrop-blur-sm">
      <div className="flex items-center gap-2">
        <Gauge className="w-5 h-5 text-blue-400" />
        <span className="text-sm text-gray-300">מהירות</span>
      </div>
      
      <div className="flex gap-2">
        {speeds.map((value) => (
          <button
            key={value}
            onClick={() => onChange(value * 50)}
            className={`px-3 py-1.5 rounded-lg text-sm transition-all
              ${speed === value * 50
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700/50 text-gray-300 hover:bg-gray-700'
              }`}
          >
            {value}x
          </button>
        ))}
      </div>
    </div>
  );
};

export default SpeedControl;