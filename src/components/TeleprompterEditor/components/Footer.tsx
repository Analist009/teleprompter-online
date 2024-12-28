import React from 'react';
import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="mt-8 text-center text-gray-400 py-4">
      <div className="flex items-center justify-center gap-2">
        <span>נבנה באהבה</span>
        <Heart className="w-4 h-4 text-red-500 animate-pulse" />
        <span>על ידי</span>
        <a 
          href="https://networkjo.io" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-400 hover:text-blue-300 transition-colors"
        >
          networkjo.io
        </a>
      </div>
      <div className="mt-2 text-sm">
        <span>מאת Joseph Elyashar</span>
        <span className="mx-2">•</span>
        <span>בשיתוף עם Michael Nirko</span>
      </div>
      <div className="mt-1 text-xs text-gray-500">
        נתרם לשימוש הציבור
      </div>
    </footer>
  );
};

export default Footer;