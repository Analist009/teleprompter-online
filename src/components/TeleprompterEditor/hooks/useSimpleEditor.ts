import { useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { TeleprompterSettings } from '../../../types';

const DEFAULT_SETTINGS: TeleprompterSettings = {
  fontSize: 24,
  scrollSpeed: 50,
  backgroundColor: '#1a1a1a',
  textColor: '#ffffff',
};

export function useSimpleEditor() {
  const [content, setContent] = useLocalStorage<string>('teleprompter_content', '');
  const [settings, setSettings] = useLocalStorage<TeleprompterSettings>(
    'teleprompter_settings',
    DEFAULT_SETTINGS
  );
  const [isScrolling, setIsScrolling] = useLocalStorage('teleprompter_scrolling', false);

  const updateSettings = useCallback((newSettings: Partial<TeleprompterSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  }, [setSettings]);

  const resetSettings = useCallback(() => {
    setSettings(DEFAULT_SETTINGS);
  }, [setSettings]);

  const toggleScroll = useCallback(() => {
    setIsScrolling(prev => !prev);
  }, [setIsScrolling]);

  return {
    content,
    setContent,
    settings,
    updateSettings,
    resetSettings,
    isScrolling,
    toggleScroll,
  };
}