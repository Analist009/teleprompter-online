import React, { useState } from 'react';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import Controls from './Controls';
import TextDisplay from './TextDisplay';
import SpeechToText from '../SpeechToText/SpeechToText';
import AITextImprover from '../AITextImprover/AITextImprover';
import MobileControls from './MobileControls';

export default function TeleprompterView() {
  const [content, setContent] = useState('');
  const [isScrolling, setIsScrolling] = useState(false);
  const [settings, setSettings] = useState({
    fontSize: 32,
    speed: 50,
    mirrorText: false
  });

  const isMobile = useMediaQuery('(max-width: 768px)');

  const handleTextFromSpeech = (text: string) => {
    setContent(prev => prev + ' ' + text);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="container mx-auto px-4 py-2 sm:py-4 md:py-6 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-gray-800/30 p-3 sm:p-4 rounded-xl backdrop-blur-sm">
          {isMobile ? (
            <MobileControls
              isScrolling={isScrolling}
              onToggleScroll={() => setIsScrolling(!isScrolling)}
              settings={settings}
              onSettingChange={(key, value) => 
                setSettings(prev => ({ ...prev, [key]: value }))
              }
            />
          ) : (
            <Controls
              isScrolling={isScrolling}
              onToggleScroll={() => setIsScrolling(!isScrolling)}
              settings={settings}
              onSettingChange={(key, value) => 
                setSettings(prev => ({ ...prev, [key]: value }))
              }
            />
          )}
          
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            <SpeechToText 
              onTextReceived={handleTextFromSpeech}
              className="w-full sm:w-auto"
            />
            <AITextImprover 
              text={content}
              onImprovedText={setContent}
              className="w-full sm:w-auto"
            />
          </div>
        </div>

        <TextDisplay
          content={content}
          fontSize={settings.fontSize}
          isScrolling={isScrolling}
          speed={settings.speed}
          mirrorText={settings.mirrorText}
          className="h-[calc(100vh-12rem)] sm:h-[calc(100vh-8rem)]"
        />
      </div>
    </div>
  );
}