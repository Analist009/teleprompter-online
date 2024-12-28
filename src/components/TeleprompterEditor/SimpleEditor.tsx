import React from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { useSimpleEditor } from './hooks/useSimpleEditor';
import TextDisplay from './components/TextDisplay';
import SpeedControl from './components/SpeedControl';

const SimpleEditor: React.FC = () => {
  const {
    content,
    setContent,
    settings,
    updateSettings,
    resetSettings,
    isScrolling,
    toggleScroll,
  } = useSimpleEditor();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4">
      <div className="max-w-4xl mx-auto space-y-4">
        <div className="flex items-center justify-between gap-4 bg-gray-800/30 p-4 rounded-lg backdrop-blur-sm">
          <button
            onClick={toggleScroll}
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

          <SpeedControl
            speed={settings.scrollSpeed}
            onChange={(speed) => updateSettings({ scrollSpeed: speed })}
          />

          <button
            onClick={resetSettings}
            className="btn-secondary"
            title="אפס הגדרות"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="הכנס טקסט כאן..."
            className="w-full h-32 p-4 rounded-lg bg-gray-800/30 text-white
                     placeholder-gray-400 resize-none focus:outline-none
                     focus:ring-2 focus:ring-blue-500"
            dir="rtl"
          />

          <TextDisplay
            content={content}
            fontSize={settings.fontSize}
            textColor={settings.textColor}
            backgroundColor={settings.backgroundColor}
            isScrolling={isScrolling}
            speed={settings.scrollSpeed}
          />
        </div>
      </div>
    </div>
  );
};

export default SimpleEditor;