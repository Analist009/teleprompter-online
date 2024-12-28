import { useState, useCallback, useEffect, useRef } from 'react';

interface UseSpeechToTextProps {
  onTextReceived: (text: string) => void;
  language?: string;
}

export function useSpeechToText({ onTextReceived, language = 'he-IL' }: UseSpeechToTextProps) {
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const lastTranscriptRef = useRef<string>('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      
      if (!SpeechRecognition) {
        setError('הדפדפן שלך לא תומך בזיהוי קול');
        return;
      }

      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = language;

      // Prevent duplicate words
      recognition.onresult = (event: SpeechRecognitionEvent) => {
        const current = event.results[event.results.length - 1];
        const transcript = current[0].transcript.trim();
        
        // Only add new words
        if (transcript !== lastTranscriptRef.current) {
          lastTranscriptRef.current = transcript;
          onTextReceived(transcript + ' ');
        }
      };

      recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
        setError(`שגיאה בזיהוי קול: ${event.error}`);
        setIsListening(false);
      };

      recognition.onend = () => {
        if (isListening) {
          recognition.start();
        }
      };

      recognitionRef.current = recognition;
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [language, onTextReceived, isListening]);

  const startListening = useCallback(() => {
    if (!recognitionRef.current) {
      setError('זיהוי קול לא זמין');
      return;
    }

    try {
      recognitionRef.current.start();
      setIsListening(true);
      setError(null);
      lastTranscriptRef.current = '';
    } catch (err) {
      setError('שגיאה בהפעלת זיהוי קול');
      setIsListening(false);
    }
  }, []);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  }, []);

  return {
    isListening,
    error,
    startListening,
    stopListening
  };
}