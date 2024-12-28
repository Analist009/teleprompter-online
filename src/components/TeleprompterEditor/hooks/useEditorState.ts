import { useState, useCallback } from 'react';
import { TeleprompterSettings } from '../../../types';

const DEFAULT_SETTINGS: TeleprompterSettings = {
  fontSize: 24,
  scrollSpeed: 50,
  backgroundColor: '#1a1a1a',
  textColor: '#ffffff',
};

export function useEditorState() {
  const [content, setContent] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState<TeleprompterSettings>(DEFAULT_SETTINGS);

  const updateSettings = useCallback((newSettings: Partial<TeleprompterSettings>) => {
    setSettings(prev => ({
      ...prev,
      ...newSettings
    }));
  }, []);

  const resetSettings = useCallback(() => {
    setSettings(DEFAULT_SETTINGS);
  }, []);

  return {
    content,
    setContent,
    settings,
    updateSettings,
    resetSettings,
    showSettings,
    setShowSettings,
  };
}