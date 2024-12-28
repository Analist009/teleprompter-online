import React from 'react';
import { TeleprompterSettings } from '../../../types';
import { Sliders, Type, Palette, RotateCcw } from 'lucide-react';

interface SettingsPanelProps {
  settings: TeleprompterSettings;
  onSettingsChange: (settings: Partial<TeleprompterSettings>) => void;
  onReset: () => void;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({
  settings,
  onSettingsChange,
  onReset
}) => {
  return (
    <div className="bg-gray-800/30 p-4 rounded-lg backdrop-blur-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Sliders className="w-5 h-5 text-blue-400" />
          <h2 className="text-lg font-semibold text-white">הגדרות</h2>
        </div>
        <button
          onClick={onReset}
          className="btn-icon"
          title="אפס הגדרות"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm text-gray-300">
            <Type className="w-4 h-4" />
            גודל טקסט
          </label>
          <input
            type="range"
            min="16"
            max="48"
            value={settings.fontSize}
            onChange={(e) =>
              onSettingsChange({
                fontSize: Number(e.target.value),
              })
            }
            className="w-full accent-blue-500"
          />
          <div className="text-xs text-gray-400 text-left">{settings.fontSize}px</div>
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm text-gray-300">
            <Palette className="w-4 h-4" />
            צבע רקע
          </label>
          <input
            type="color"
            value={settings.backgroundColor}
            onChange={(e) =>
              onSettingsChange({
                backgroundColor: e.target.value,
              })
            }
            className="w-full h-8 rounded cursor-pointer"
          />
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm text-gray-300">
            <Palette className="w-4 h-4" />
            צבע טקסט
          </label>
          <input
            type="color"
            value={settings.textColor}
            onChange={(e) =>
              onSettingsChange({
                textColor: e.target.value,
              })
            }
            className="w-full h-8 rounded cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;