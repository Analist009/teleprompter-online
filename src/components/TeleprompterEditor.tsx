import React, { useState, useRef, useEffect } from 'react';
import { TextMetadata, TeleprompterSettings } from '../types';
import { calculateMetadata } from '../utils/textProcessor';
import { Settings } from 'lucide-react';

export default function TeleprompterEditor() {
  const [content, setContent] = useState('');
  const [isScrolling, setIsScrolling] = useState(false);
  const [metadata, setMetadata] = useState<TextMetadata>(calculateMetadata(''));
  const [settings, setSettings] = useState<TeleprompterSettings>({
    fontSize: 18,
    scrollSpeed: 50,
    backgroundColor: '#1a1a1a',
    textColor: '#ffffff',
  });
  const [showSettings, setShowSettings] = useState(false);
  
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const scrollInterval = useRef<number>();

  useEffect(() => {
    setMetadata(calculateMetadata(content));
  }, [content]);

  useEffect(() => {
    if (isScrolling) {
      scrollInterval.current = window.setInterval(() => {
        if (textAreaRef.current) {
          textAreaRef.current.scrollTop += settings.scrollSpeed / 50;
        }
      }, 16); // ~60fps
    }
    return () => {
      if (scrollInterval.current) {
        clearInterval(scrollInterval.current);
      }
    };
  }, [isScrolling, settings.scrollSpeed]);

  const toggleScroll = () => setIsScrolling(!isScrolling);

  return (
    <div className="min-h-screen bg-gray-100 p-6" dir="rtl">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">טלפרומפטר מתקדם</h1>
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-2 rounded-full hover:bg-gray-200"
          >
            <Settings className="w-6 h-6" />
          </button>
        </div>

        <div className="flex gap-6">
          <div className="flex-1">
            <div className="mb-4 flex gap-2">
              <button
                onClick={toggleScroll}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                {isScrolling ? 'עצור גלילה' : 'התחל גלילה'}
              </button>
            </div>

            <textarea
              ref={textAreaRef}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              style={{
                fontSize: `${settings.fontSize}px`,
                backgroundColor: settings.backgroundColor,
                color: settings.textColor,
              }}
              className="w-full h-[600px] p-4 rounded-lg shadow-lg resize-none"
              placeholder="הכנס את הטקסט כאן..."
            />
          </div>

          <div className="w-72">
            {showSettings ? (
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
                        setSettings({
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
                        setSettings({
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
                        setSettings({
                          ...settings,
                          backgroundColor: e.target.value,
                        })
                      }
                      className="w-full"
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
                        setSettings({
                          ...settings,
                          textColor: e.target.value,
                        })
                      }
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white p-4 rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold mb-4">פרטי טקסט</h2>
                <div className="space-y-2">
                  <p>מילים: {metadata.wordsCount}</p>
                  <p>תווים: {metadata.charsCount}</p>
                  <p>שורות: {metadata.linesCount}</p>
                  <p>זמן קריאה משוער: {metadata.estimatedReadTime} דקות</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}