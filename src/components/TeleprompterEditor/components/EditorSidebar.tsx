import React from 'react';
import Stats from './Stats';
import SettingsPanel from './SettingsPanel';
import VisitorCounter from './VisitorCounter';
import { TeleprompterSettings } from '../../../types';

interface EditorSidebarProps {
  showSettings: boolean;
  settings: TeleprompterSettings;
  onSettingsChange: (settings: TeleprompterSettings) => void;
}

const EditorSidebar: React.FC<EditorSidebarProps> = ({
  showSettings,
  settings,
  onSettingsChange,
}) => {
  return (
    <div className="lg:col-span-1 space-y-4 animate-fade-in">
      <Stats wordsCount={0} charsCount={0} linesCount={0} />
      {showSettings && (
        <SettingsPanel
          settings={settings}
          onSettingsChange={onSettingsChange}
        />
      )}
      <VisitorCounter />
    </div>
  );
};

export default EditorSidebar;