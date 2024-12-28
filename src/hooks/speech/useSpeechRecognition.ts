import { useState, useCallback, useRef } from 'react';
import { createSpeechRecognition } from './utils/createSpeechRecognition';

interface UseSpeechRecognitionProps {
  onResult: (text: string) => void;
  language?: string;
}

export function useSpeechRecognition({ onResult, language = 'he-IL' }: UseSpeechRecognitionProps) {
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const lastTranscriptRef = useRef<string>('');

  const startListening = useCallback(() => {
    const recognition = createSpeechRecognition({ language });
    
    if (!recognition) {
      setError('הדפדפן שלך לא תומך בזיהוי קול');
      return;
    }

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = Array.from(event.results)
        .map(result => result[0].transcript)
        .join(' ')
        .trim();
      
      // Only send new text that hasn't been processed
      if (transcript !== lastTranscriptRef.current) {
        const newText = transcript.replace(lastTranscriptRef.current, '').trim();
        if (newText) {
          onResult(newText + ' ');
          lastTranscriptRef.current = transcript;
        }
      }
    };

    recognition.onerror = () => {
      setError('שגיאה בזיהוי קול');
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
      lastTranscriptRef.current = '';
    };

    try {
      recognition.start();
      setIsListening(true);
      setError(null);
    } catch (err) {
      setError('שגיאה בהפעלת זיהוי קול');
      setIsListening(false);
    }
  }, [language, onResult]);

  const stopListening = useCallback(() => {
    setIsListening(false);
    lastTranscriptRef.current = '';
  }, []);

  return {
    isListening,
    error,
    startListening,
    stopListening
  };
}