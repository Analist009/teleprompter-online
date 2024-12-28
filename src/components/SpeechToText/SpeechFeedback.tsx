import React from 'react';
import { Mic } from 'lucide-react';

export default function SpeechFeedback() {
  return (
    <div className="absolute top-full mt-2 right-0 bg-gray-800/90 backdrop-blur-sm rounded-lg p-3">
      <div className="flex items-center gap-2">
        <div className="relative">
          <Mic className="w-4 h-4 text-blue-400" />
          <div className="absolute inset-0 animate-ping bg-blue-400 rounded-full opacity-75" />
        </div>
        <span className="text-sm text-gray-300">מקליט...</span>
      </div>
    </div>
  );
}