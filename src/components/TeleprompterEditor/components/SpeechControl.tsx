import React from 'react';
import { Mic, MicOff } from 'lucide-react';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';

interface SpeechControlProps {
  onTextReceived: (text: string) => void;
}

const SpeechControl: React.FC<SpeechControlProps> = ({ onTextReceived }) => {
  const {
    isListening,
    error,
    startListening,
    stopListening
  } = useSpeechRecognition(onTextReceived);

  return (
    <div className="relative">
      <button
        onClick={isListening ? stopListening : startListening}
        className={`btn-secondary flex items-center gap-2 ${
          isListening ? 'bg-red-600 hover:bg-red-700' : ''
        }`}
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
      
      {error && (
        <div className="absolute top-full mt-2 bg-red-500 text-white text-sm px-3 py-1 rounded-md whitespace-nowrap">
          {error}
        </div>
      )}
    </div>
  );
};

export default SpeechControl;