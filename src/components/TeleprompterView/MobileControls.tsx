import React from 'react';
import { Play, Pause, RotateCcw, Type } from 'lucide-react';

interface MobileControlsProps {
  isScrolling: boolean;
  onToggleScroll: () => void;
  settings: {
    fontSize: number;
    speed: number;
    mirrorText: boolean;
  };
  onSettingChange: (key: string, value: number | boolean) => void;
}

export default function MobileControls({
  isScrolling,
  onToggleScroll,
  settings,
  onSettingChange,
}: MobileControlsProps) {
  return (
    <div className="w-full space-y-3">
      <div className="flex items-center justify-between gap-2">
        <button
          onClick={onToggleScroll}
          className="btn-primary flex-1"
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
          onClick={() => onSettingChange('mirrorText', !settings.mirrorText)}
          className="btn-secondary"
          title="שיקוף טקסט"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      <div className="flex items-center gap-2 glass-effect px-3 py-2 rounded-lg">
        <Type className="w-4 h-4 text-blue-400" />
        <input
          type="range"
          min="24"
          max="72"
          value={settings.fontSize}
          onChange={(e) => onSettingChange('fontSize', Number(e.target.value))}
          className="flex-1 accent-blue-500"
        />
        <span className="text-sm text-gray-300 min-w-[3ch]">{settings.fontSize}</span>
      </div>

      <div className="flex items-center gap-2 glass-effect px-3 py-2 rounded-lg">
        <Play className="w-4 h-4 text-blue-400" />
        <input
          type="range"
          min="20"
          max="200"
          value={settings.speed}
          onChange={(e) => onSettingChange('speed', Number(e.target.value))}
          className="flex-1 accent-blue-500"
        />
        <span className="text-sm text-gray-300 min-w-[3ch]">{settings.speed}</span>
      </div>
    </div>
  );
}