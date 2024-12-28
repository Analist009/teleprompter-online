import React, { useState, useEffect } from 'react';
import { Users } from 'lucide-react';

export default function VisitorCounter() {
  const [visitorCount, setVisitorCount] = useState<number>(0);

  useEffect(() => {
    // Simulate visitor count with a random number between 100-1000
    // In a real app, this would come from an analytics service
    const randomVisitors = Math.floor(Math.random() * 900) + 100;
    setVisitorCount(randomVisitors);
  }, []);

  return (
    <div className="bg-gray-800/30 p-4 rounded-lg backdrop-blur-sm">
      <div className="flex items-center gap-2 text-gray-300">
        <Users className="w-4 h-4 text-blue-400" />
        <span className="text-sm">מבקרים ייחודיים</span>
      </div>
      <div className="mt-2 text-2xl font-bold text-white">
        {visitorCount.toLocaleString('he-IL')}
      </div>
    </div>
  );
}