import React from 'react';
import { Play, Pause, RotateCcw, FlipHorizontal, Timer, Type } from 'lucide-react';
import './styles.css';

interface ControlsProps {
  isScrolling: boolean;
  onToggleScroll: () => void;
  onReset: () => void;
  settings: {
    speed: number;
    fontSize: number;
    mirrorText: boolean;
    autoStart: boolean;
    startDelay: number;
  };
  onSettingChange: (key: string, value: number | boolean) => void;
}

export default function Controls({
  isScrolling,
  onToggleScroll,
  onReset,
  settings,
  onSettingChange,
}: ControlsProps) {
  return (
    <div className="flex flex-wrap items-center gap-4 glass-effect p-4 rounded-xl shadow-lg">
      <div className="flex items-center gap-2">
        <button
          onClick={onToggleScroll}
          className="btn-primary min-w-[120px]"
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
          title="חזור להתחלה"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 glass-effect px-3 py-2 rounded-lg">
          <Type className="w-4 h-4 text-blue-400" />
          <input
            type="range"
            min="24"
            max="72"
            value={settings.fontSize}
            onChange={(e) => onSettingChange('fontSize', Number(e.target.value))}
            className="w-24 accent-blue-500"
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
            className="w-24 accent-blue-500"
          />
          <span className="text-sm text-gray-300 min-w-[3ch]">{settings.speed}</span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => onSettingChange('mirrorText', !settings.mirrorText)}
          className={`btn-secondary ${settings.mirrorText ? 'bg-blue-600' : ''}`}
          title="שיקוף טקסט"
        >
          <FlipHorizontal className="w-4 h-4" />
        </button>

        <button
          onClick={() => onSettingChange('autoStart', !settings.autoStart)}
          className={`btn-secondary ${settings.autoStart ? 'bg-blue-600' : ''}`}
          title="התחלה אוטומטית"
        >
          <Timer className="w-4 h-4" />
        </button>

        {settings.autoStart && (
          <select
            value={settings.startDelay}
            onChange={(e) => onSettingChange('startDelay', Number(e.target.value))}
            className="glass-effect text-gray-200 rounded-lg px-3 py-2 text-sm"
          >
            {[3, 5, 10].map((delay) => (
              <option key={delay} value={delay}>
                {delay} שניות
              </option>
            ))}
          </select>
        )}
      </div>
    </div>
  );
}