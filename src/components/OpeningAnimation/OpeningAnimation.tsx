import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wand2, Sparkles, Type, Mic } from 'lucide-react';

interface OpeningAnimationProps {
  onComplete: () => void;
}

export default function OpeningAnimation({ onComplete }: OpeningAnimationProps) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (step < 4) {
        setStep(prev => prev + 1);
      } else {
        onComplete();
      }
    }, 800);

    return () => clearTimeout(timer);
  }, [step, onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-gray-900 flex items-center justify-center z-50"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center space-y-8">
          <motion.div 
            className="flex items-center justify-center gap-6"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Wand2 className={`w-12 h-12 transition-all duration-700 ${
              step >= 1 ? 'text-blue-400' : 'text-gray-600'
            }`} />
            <Type className={`w-12 h-12 transition-all duration-700 ${
              step >= 2 ? 'text-purple-400' : 'text-gray-600'
            }`} />
            <Mic className={`w-12 h-12 transition-all duration-700 ${
              step >= 3 ? 'text-green-400' : 'text-gray-600'
            }`} />
            <Sparkles className={`w-12 h-12 transition-all duration-700 ${
              step >= 4 ? 'text-yellow-400' : 'text-gray-600'
            }`} />
          </motion.div>
          
          <motion.h1 
            className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-green-400"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            פרומפטר פרו
          </motion.h1>
          
          <motion.p
            className="text-gray-400 text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            הטלפרומפטר החכם והמתקדם ביותר
          </motion.p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}