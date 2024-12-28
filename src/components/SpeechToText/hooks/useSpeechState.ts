import { useState, useCallback } from 'react';

export function useSpeechState() {
  const [isListening, setIsListening] = useState(false);

  const startListening = useCallback(() => {
    setIsListening(true);
  }, []);

  const stopListening = useCallback(() => {
    setIsListening(false);
  }, []);

  return {
    isListening,
    startListening,
    stopListening
  };
}