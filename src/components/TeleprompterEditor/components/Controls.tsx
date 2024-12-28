import React from 'react';
import { Play, Pause, RotateCcw, Settings } from 'lucide-react';

interface ControlsProps {
  isScrolling: boolean;
  onToggleScroll: () => void;
  onReset: () => void;
  scrollSpeed: number;
  onSpeedChange: (speed: number) => void;
}

const Controls: React.FC<ControlsProps> = ({
  isScrolling,
  onToggleScroll,
  onReset,
  scrollSpeed,
  onSpeedChange,
}) => {
  return (
    <div className="flex items-center gap-3 mb-4 bg-gray-800/30 p-3 rounded-lg backdrop-blur-sm">
      <button
        onClick={onToggleScroll}
        className="btn-primary"
      >
        {isScrolling ? (
          <>
            <Pause className="w-5 h-5" />
            <span>עצור</span>
          </>
        ) : (
          <>
            <Play className="w-5 h-5" />
            <span>התחל</span>
          </>
        )}
      </button>
      
      <button
        onClick={onReset}
        className="btn-secondary"
        title="אפס מיקום"
      >
        <RotateCcw className="w-4 h-4" />
      </button>

      <div className="flex items-center gap-2 mr-4">
        <span className="text-sm text-gray-300">מהירות</span>
        <input
          type="range"
          min="1"
          max="100"
          value={scrollSpeed}
          onChange={(e) => onSpeedChange(Number(e.target.value))}
          className="w-24 accent-blue-500"
        />
      </div>
    </div>
  );
};

export default Controls;