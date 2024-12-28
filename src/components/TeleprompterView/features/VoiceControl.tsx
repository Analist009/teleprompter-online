import React, { useState } from 'react';
import { Mic, MicOff } from 'lucide-react';
import { useVoiceCommands } from '../../../hooks/useVoiceCommands';

interface VoiceControlProps {
  onStart: () => void;
  onStop: () => void;
  onReset: () => void;
  onSpeedChange: (speed: number) => void;
}

export default function VoiceControl({
  onStart,
  onStop,
  onReset,
  onSpeedChange,
}: VoiceControlProps) {
  const [isListening, setIsListening] = useState(false);
  
  const { startListening, stopListening } = useVoiceCommands({
    commands: {
      'התחל': onStart,
      'עצור': onStop,
      'אפס': onReset,
      'מהר יותר': () => onSpeedChange(speed => speed + 10),
      'לאט יותר': () => onSpeedChange(speed => speed - 10),
    },
    onStart: () => setIsListening(true),
    onStop: () => setIsListening(false),
  });

  return (
    <button
      onClick={isListening ? stopListening : startListening}
      className={`btn-secondary ${isListening ? 'bg-blue-600' : ''}`}
      title="שליטה קולית"
    >
      {isListening ? (
        <MicOff className="w-4 h-4" />
      ) : (
        <Mic className="w-4 h-4" />
      )}
    </button>
  );
}