import React, { useState, useEffect, useCallback } from 'react';
import { Mic, MicOff, Wand2 } from 'lucide-react';
import { useSpeechRecognition } from './hooks/useSpeechRecognition';

interface SpeechRecognitionProps {
  onTextReceived: (text: string) => void;
}

export default function SpeechRecognition({ onTextReceived }: SpeechRecognitionProps) {
  const [isListening, setIsListening] = useState(false);
  const [lastTranscript, setLastTranscript] = useState('');
  const [confidence, setConfidence] = useState(0);

  const handleResult = useCallback((transcript: string, currentConfidence: number) => {
    // Avoid duplicate words by comparing with last transcript
    if (transcript !== lastTranscript) {
      onTextReceived(transcript + ' ');
      setLastTranscript(transcript);
      setConfidence(currentConfidence);
    }
  }, [lastTranscript, onTextReceived]);

  const {
    startListening,
    stopListening,
    error,
    isSupported
  } = useSpeechRecognition({
    onResult: handleResult,
    onStart: () => setIsListening(true),
    onEnd: () => setIsListening(false),
  });

  if (!isSupported) {
    return (
      <div className="text-red-400 text-sm">
        הדפדפן שלך לא תומך בזיהוי קול
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={isListening ? stopListening : startListening}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all
          ${isListening 
            ? 'bg-red-500 hover:bg-red-600 text-white' 
            : 'bg-gray-700 hover:bg-gray-600 text-gray-200'
          }`}
        disabled={!isSupported}
      >
        {isListening ? (
          <>
            <MicOff className="w-5 h-5" />
            <span>הפסק הקלטה</span>
          </>
        ) : (
          <>
            <Mic className="w-5 h-5" />
            <span>התחל הקלטה</span>
          </>
        )}
      </button>

      {isListening && (
        <div className="absolute top-full mt-2 right-0 bg-gray-800 rounded-lg p-3 shadow-lg">
          <div className="flex items-center gap-2 text-sm">
            <Wand2 className="w-4 h-4 text-blue-400" />
            <div className="text-gray-300">
              רמת דיוק: {Math.round(confidence * 100)}%
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="absolute top-full mt-2 right-0 bg-red-500 text-white text-sm px-3 py-1 rounded-lg">
          {error}
        </div>
      )}
    </div>
  );
}