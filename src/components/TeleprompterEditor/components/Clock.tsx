import React, { useState, useEffect } from 'react';
import { Clock as ClockIcon } from 'lucide-react';

const Clock: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center gap-2 bg-gray-700/50 px-3 py-1.5 rounded-lg">
      <ClockIcon className="w-4 h-4 text-blue-400" />
      <time className="text-sm font-medium text-gray-200">
        {time.toLocaleTimeString('he-IL')}
      </time>
    </div>
  );
};

export default Clock;