import { useState, useEffect, useCallback } from 'react';

interface SpeechRecognitionHook {
  isListening: boolean;
  error: string | null;
  startListening: () => void;
  stopListening: () => void;
}

export const useSpeechRecognition = (
  onResult: (text: string) => void,
  language = 'he-IL'
): SpeechRecognitionHook => {
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [recognition, setRecognition] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Check for browser support
      const SpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition;
      
      if (!SpeechRecognition) {
        setError('הדפדפן שלך לא תומך בזיהוי קול');
        return;
      }

      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = true;
      recognitionInstance.interimResults = true;
      recognitionInstance.lang = language;

      setRecognition(recognitionInstance);
    }
  }, [language]);

  const startListening = useCallback(() => {
    if (!recognition) {
      setError('זיהוי קול לא זמין');
      return;
    }

    try {
      recognition.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0])
          .map((result: any) => result.transcript)
          .join(' ');
        
        onResult(transcript);
      };

      recognition.onerror = (event: any) => {
        setError(`שגיאה בזיהוי קול: ${event.error}`);
        setIsListening(false);
      };

      recognition.start();
      setIsListening(true);
      setError(null);
    } catch (err) {
      setError('שגיאה בהפעלת זיהוי קול');
      setIsListening(false);
    }
  }, [recognition, onResult]);

  const stopListening = useCallback(() => {
    if (recognition) {
      recognition.stop();
      setIsListening(false);
    }
  }, [recognition]);

  useEffect(() => {
    return () => {
      if (recognition) {
        recognition.stop();
      }
    };
  }, [recognition]);

  return {
    isListening,
    error,
    startListening,
    stopListening
  };
};