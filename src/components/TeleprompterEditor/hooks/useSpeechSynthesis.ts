import { useState, useCallback } from 'react';

interface UseSpeechSynthesisProps {
  language?: string;
}

export const useSpeechSynthesis = ({ language = 'he-IL' }: UseSpeechSynthesisProps) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const speak = useCallback((text: string) => {
    if (!('speechSynthesis' in window)) {
      setError('הדפדפן שלך לא תומך בהקראת טקסט');
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language;
    utterance.rate = 1;
    utterance.pitch = 1;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => {
      setError('אירעה שגיאה בהקראת הטקסט');
      setIsSpeaking(false);
    };

    window.speechSynthesis.speak(utterance);
  }, [language]);

  const stop = useCallback(() => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  }, []);

  return { isSpeaking, error, speak, stop };
};