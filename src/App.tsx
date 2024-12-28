import React, { useState } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import TeleprompterView from './components/TeleprompterView';
import Footer from './components/Footer';
import OpeningAnimation from './components/OpeningAnimation/OpeningAnimation';

export default function App() {
  const [showAnimation, setShowAnimation] = useState(true);

  return (
    <HelmetProvider>
      {showAnimation && (
        <OpeningAnimation onComplete={() => setShowAnimation(false)} />
      )}
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <TeleprompterView />
        <Footer />
      </div>
    </HelmetProvider>
  );
}