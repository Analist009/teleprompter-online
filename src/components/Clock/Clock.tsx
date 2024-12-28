import React from 'react';
import TimeDisplay from './TimeDisplay';
import Indicators from './Indicators';
import { useClockTime } from './useClockTime';

const Clock = () => {
  const time = useClockTime();

  return (
    <div className="p-4 bg-white rounded-xl shadow-md animate-fade-in">
      <Indicators />
      <TimeDisplay {...time} />
    </div>
  );
};

export default Clock;