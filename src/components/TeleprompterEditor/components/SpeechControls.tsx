import React from 'react';
import { Mic, MicOff, Volume2, VolumeX } from 'lucide-react';
import { useSpeechToText } from '../hooks/useSpeechToText';
import { useTextToSpeech } from '../hooks/useTextToSpeech';

interface SpeechControlsProps {
  content: string;
  onTextReceived: (text: string) => void;
}

const SpeechControls: React.FC<SpeechControlsProps> = ({
  content,
  onTextReceived,
}) => {
  const {
    isListening,
    error: speechToTextError,
    startListening,
    stopListening,
  } = useSpeechToText({
    onTextReceived,
  });

  const {
    isSpeaking,
    error: textToSpeechError,
    speak,
    stop: stopSpeaking,
  } = useTextToSpeech();

  const handleSpeechToggle = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const handleSpeakToggle = () => {
    if (isSpeaking) {
      stopSpeaking();
    } else {
      speak(content);
    }
  };

  return (
    <div className="flex items-center gap-4">
      <div className="relative">
        <button
          onClick={handleSpeechToggle}
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
        {speechToTextError && (
          <div className="absolute top-full mt-2 bg-red-500 text-white text-sm px-3 py-1 rounded-md whitespace-nowrap">
            {speechToTextError}
          </div>
        )}
      </div>

      <div className="relative">
        <button
          onClick={handleSpeakToggle}
          className={`btn-secondary flex items-center gap-2 ${
            isSpeaking ? 'bg-blue-600 hover:bg-blue-700' : ''
          }`}
          title={isSpeaking ? 'הפסק הקראה' : 'הקרא טקסט'}
        >
          {isSpeaking ? (
            <>
              <VolumeX className="w-4 h-4" />
              <span>הפסק הקראה</span>
            </>
          ) : (
            <>
              <Volume2 className="w-4 h-4" />
              <span>הקרא טקסט</span>
            </>
          )}
        </button>
        {textToSpeechError && (
          <div className="absolute top-full mt-2 bg-red-500 text-white text-sm px-3 py-1 rounded-md whitespace-nowrap">
            {textToSpeechError}
          </div>
        )}
      </div>
    </div>
  );
};

export default SpeechControls;