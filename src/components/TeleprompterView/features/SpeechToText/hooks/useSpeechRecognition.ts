import { useState, useCallback, useEffect, useRef } from 'react';

interface UseSpeechRecognitionProps {
  onResult: (transcript: string, confidence: number) => void;
  onStart?: () => void;
  onEnd?: () => void;
  language?: string;
}

export function useSpeechRecognition({
  onResult,
  onStart,
  onEnd,
  language = 'he-IL'
}: UseSpeechRecognitionProps) {
  const [error, setError] = useState<string | null>(null);
  const [isSupported, setIsSupported] = useState(false);
  const recognition = useRef<SpeechRecognition | null>(null);
  const lastTranscriptRef = useRef<string>('');

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognition.current = new SpeechRecognition();
      recognition.current.continuous = true;
      recognition.current.interimResults = true;
      recognition.current.lang = language;
      setIsSupported(true);
    }
  }, [language]);

  const startListening = useCallback(() => {
    if (!recognition.current) {
      setError('זיהוי קול לא זמין');
      return;
    }

    try {
      recognition.current.onstart = () => {
        setError(null);
        onStart?.();
      };

      recognition.current.onend = () => {
        onEnd?.();
      };

      recognition.current.onerror = (event) => {
        setError('שגיאה בזיהוי קול');
        onEnd?.();
      };

      recognition.current.onresult = (event) => {
        const result = event.results[event.results.length - 1];
        const transcript = result[0].transcript.trim();
        const confidence = result[0].confidence;

        // Prevent duplicate words
        if (transcript !== lastTranscriptRef.current) {
          lastTranscriptRef.current = transcript;
          onResult(transcript, confidence);
        }
      };

      recognition.current.start();
    } catch (err) {
      setError('שגיאה בהפעלת זיהוי קול');
      onEnd?.();
    }
  }, [onStart, onEnd, onResult]);

  const stopListening = useCallback(() => {
    if (recognition.current) {
      recognition.current.stop();
    }
  }, []);

  useEffect(() => {
    return () => {
      if (recognition.current) {
        recognition.current.stop();
      }
    };
  }, []);

  return {
    startListening,
    stopListening,
    error,
    isSupported
  };
}