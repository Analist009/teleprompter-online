import { useCallback, useEffect, useRef } from 'react';

type HotkeyCallback = () => void;

export function useHotkeys() {
  const callbacks = useRef<Record<string, HotkeyCallback>>({});

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    const key = event.key.toLowerCase();
    if (key in callbacks.current) {
      event.preventDefault();
      callbacks.current[key]();
    }
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const bind = useCallback((key: string, callback: HotkeyCallback) => {
    callbacks.current[key.toLowerCase()] = callback;
  }, []);

  const unbind = useCallback((key: string) => {
    delete callbacks.current[key.toLowerCase()];
  }, []);

  const unbindAll = useCallback(() => {
    callbacks.current = {};
  }, []);

  return { bind, unbind, unbindAll };
}