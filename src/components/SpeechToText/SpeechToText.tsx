import React from 'react';
import { Mic, MicOff, AlertCircle } from 'lucide-react';
import { useSpeechRecognition } from '../../hooks/speech/useSpeechRecognition';
import SpeechFeedback from './SpeechFeedback';

interface SpeechToTextProps {
  onTextReceived: (text: string) => void;
  language?: string;
  className?: string;
}

export default function SpeechToText({ 
  onTextReceived, 
  language = 'he-IL',
  className 
}: SpeechToTextProps) {
  const { isListening, error, startListening, stopListening } = useSpeechRecognition({
    onResult: onTextReceived,
    language
  });

  return (
    <div className={`relative ${className || ''}`}>
      <button
        onClick={isListening ? stopListening : startListening}
        className={`btn-secondary flex items-center gap-2 w-full justify-center sm:w-auto
          ${isListening ? 'bg-red-600 hover:bg-red-700' : ''}`}
        title={isListening ? 'הפסק הקלטה' : 'התחל הקלטה'}
      >
        {isListening ? (
          <>
            <MicOff className="w-4 h-4" />
            <span>הפסק הקלטה</span>
          </>
        ) : (
          <>
            <Mic className="w-4 h-4" />
            <span>התחל הקלטה</span>
          </>
        )}
      </button>

      {isListening && <SpeechFeedback />}

      {error && (
        <div className="absolute top-full mt-2 right-0 bg-red-500 text-white text-sm px-3 py-1.5 rounded-lg flex items-center gap-2">
          <AlertCircle className="w-4 h-4" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}