import React from 'react';
import { TeleprompterSettings } from '../../types';

interface SettingsPanelProps {
  settings: TeleprompterSettings;
  onSettingsChange: (settings: TeleprompterSettings) => void;
}

const SettingsPanel = React.memo(({ settings, onSettingsChange }: SettingsPanelProps) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4">הגדרות</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            גודל טקסט
          </label>
          <input
            type="range"
            min="12"
            max="32"
            value={settings.fontSize}
            onChange={(e) =>
              onSettingsChange({
                ...settings,
                fontSize: Number(e.target.value),
              })
            }
            className="w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            מהירות גלילה
          </label>
          <input
            type="range"
            min="1"
            max="100"
            value={settings.scrollSpeed}
            onChange={(e) =>
              onSettingsChange({
                ...settings,
                scrollSpeed: Number(e.target.value),
              })
            }
            className="w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            צבע רקע
          </label>
          <input
            type="color"
            value={settings.backgroundColor}
            onChange={(e) =>
              onSettingsChange({
                ...settings,
                backgroundColor: e.target.value,
              })
            }
            className="w-full h-8"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            צבע טקסט
          </label>
          <input
            type="color"
            value={settings.textColor}
            onChange={(e) =>
              onSettingsChange({
                ...settings,
                textColor: e.target.value,
              })
            }
            className="w-full h-8"
          />
        </div>
      </div>
    </div>
  );
});

export default SettingsPanel;