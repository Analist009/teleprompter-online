import React, { useEffect, useState } from 'react';
import { Bot, Wand2 } from 'lucide-react';

interface OpeningAnimationProps {
  onComplete: () => void;
}

export default function OpeningAnimation({ onComplete }: OpeningAnimationProps) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (step < 3) {
        setStep(prev => prev + 1);
      } else {
        onComplete();
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [step, onComplete]);

  return (
    <div className="fixed inset-0 bg-gray-900 flex items-center justify-center z-50">
      <div className="text-center space-y-6">
        <div className="flex items-center justify-center gap-4">
          <Bot className={`w-12 h-12 transition-all duration-700 ${
            step >= 1 ? 'text-blue-400 scale-110' : 'text-gray-600'
          }`} />
          <Wand2 className={`w-12 h-12 transition-all duration-700 ${
            step >= 2 ? 'text-purple-400 scale-110' : 'text-gray-600'
          }`} />
        </div>
        
        <h1 className={`text-4xl font-bold transition-all duration-700 ${
          step >= 3 ? 'text-white scale-110' : 'text-gray-600'
        }`}>
          פרומפטר פרו
        </h1>
        
        <div className="flex justify-center gap-2">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i <= step ? 'bg-blue-400' : 'bg-gray-600'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}