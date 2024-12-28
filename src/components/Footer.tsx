import React from 'react';
import { Mail, Phone, Globe } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-800/30 backdrop-blur-sm mt-8 py-6 px-4">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-right">
            <a 
              href="https://networkjo.io" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-lg font-semibold text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-2"
            >
              <Globe className="w-5 h-5" />
              networkjo.io
            </a>
            <div className="text-sm text-gray-400 mt-1">
              Developer: Joseph Elyashar © 2024
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <a 
              href="tel:0552998143"
              className="text-gray-300 hover:text-white transition-colors flex items-center gap-2"
            >
              <Phone className="w-4 h-4" />
              055-2998143
            </a>
            <a 
              href="tel:0584423342"
              className="text-gray-300 hover:text-white transition-colors flex items-center gap-2"
            >
              <Phone className="w-4 h-4" />
              058-4423342
            </a>
            <a 
              href="mailto:Jelyashar@gmail.com"
              className="text-gray-300 hover:text-white transition-colors flex items-center gap-2"
            >
              <Mail className="w-4 h-4" />
              Jelyashar@gmail.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}