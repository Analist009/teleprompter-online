import { useState, useCallback, useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';

interface TeleprompterState {
  fontSize: number;
  speed: number;
  backgroundColor: string;
  textColor: string;
  mirrorText: boolean;
  autoStart: boolean;
  startDelay: number;
}

const DEFAULT_STATE: TeleprompterState = {
  fontSize: 32,
  speed: 50,
  backgroundColor: '#000000',
  textColor: '#ffffff',
  mirrorText: false,
  autoStart: false,
  startDelay: 3,
};

export function useTeleprompter() {
  const [state, setState] = useLocalStorage<TeleprompterState>('teleprompter_settings', DEFAULT_STATE);
  const [content, setContent] = useLocalStorage<string>('teleprompter_content', '');
  const [isScrolling, setIsScrolling] = useState(false);
  const [countdown, setCountdown] = useState(state.startDelay);

  const updateSettings = useCallback((updates: Partial<TeleprompterState>) => {
    setState(prev => ({ ...prev, ...updates }));
  }, [setState]);

  const toggleScroll = useCallback(() => {
    if (state.autoStart && !isScrolling) {
      setCountdown(state.startDelay);
    } else {
      setIsScrolling(prev => !prev);
    }
  }, [state.autoStart, state.startDelay, isScrolling]);

  // Countdown logic for auto-start
  useEffect(() => {
    if (!state.autoStart || !countdown || isScrolling) return;

    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          setIsScrolling(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown, state.autoStart, isScrolling]);

  // Reset countdown when stopping
  useEffect(() => {
    if (!isScrolling) {
      setCountdown(state.startDelay);
    }
  }, [isScrolling, state.startDelay]);

  return {
    state,
    content,
    isScrolling,
    countdown,
    updateSettings,
    setContent,
    toggleScroll,
  };
}