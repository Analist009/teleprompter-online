import React from 'react';
import TextArea from './TextArea';
import Controls from './Controls';
import SpeechControls from './SpeechControls';
import { TeleprompterSettings } from '../../../types';

interface EditorContentProps {
  textAreaRef: React.RefObject<HTMLTextAreaElement>;
  content: string;
  settings: TeleprompterSettings;
  onContentChange: (content: string) => void;
}

const EditorContent: React.FC<EditorContentProps> = ({
  textAreaRef,
  content,
  settings,
  onContentChange,
}) => {
  const [isScrolling, setIsScrolling] = React.useState(false);

  return (
    <div className="lg:col-span-3 space-y-4 animate-fade-in">
      <div className="flex justify-between items-center flex-wrap gap-4 bg-gray-800/30 p-4 rounded-lg backdrop-blur-sm">
        <Controls
          isScrolling={isScrolling}
          onToggleScroll={() => setIsScrolling(!isScrolling)}
          onReset={() => {
            if (textAreaRef.current) {
              textAreaRef.current.scrollTop = 0;
            }
          }}
          scrollSpeed={settings.scrollSpeed}
          onSpeedChange={() => {}}
        />
        <SpeechControls
          content={content}
          onTextReceived={onContentChange}
        />
      </div>

      <TextArea
        ref={textAreaRef}
        content={content}
        onChange={onContentChange}
        style={{
          fontSize: `${settings.fontSize}px`,
          backgroundColor: settings.backgroundColor,
          color: settings.textColor,
        }}
        isScrolling={isScrolling}
      />
    </div>
  );
};

export default EditorContent;