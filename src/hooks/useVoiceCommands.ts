import { useCallback, useEffect, useRef } from 'react';

interface UseVoiceCommandsProps {
  commands: Record<string, () => void>;
  onStart?: () => void;
  onStop?: () => void;
  language?: string;
}

export function useVoiceCommands({
  commands,
  onStart,
  onStop,
  language = 'he-IL',
}: UseVoiceCommandsProps) {
  const recognition = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognition.current = new SpeechRecognition();
      recognition.current.continuous = true;
      recognition.current.interimResults = false;
      recognition.current.lang = language;

      recognition.current.onresult = (event) => {
        const command = event.results[event.results.length - 1][0].transcript.trim().toLowerCase();
        if (command in commands) {
          commands[command]();
        }
      };
    }
  }, [commands, language]);

  const startListening = useCallback(() => {
    if (recognition.current) {
      recognition.current.start();
      onStart?.();
    }
  }, [onStart]);

  const stopListening = useCallback(() => {
    if (recognition.current) {
      recognition.current.stop();
      onStop?.();
    }
  }, [onStop]);

  return { startListening, stopListening };
}