import React, { memo } from 'react';

interface TimeDisplayProps {
  hours: string;
  minutes: string;
  seconds: string;
}

const TimeDisplay = memo(({ hours, minutes, seconds }: TimeDisplayProps) => {
  return (
    <div className="flex items-center justify-center">
      <span className="text-3xl font-semibold text-gray-800">{hours}</span>
      <span className="text-3xl font-light text-gray-600 mx-0.5">:</span>
      <span className="text-3xl font-semibold text-gray-800">{minutes}</span>
      <span className="text-3xl font-light text-gray-600 mx-0.5">:</span>
      <span className="text-2xl font-normal text-gray-600">{seconds}</span>
    </div>
  );
});

export default TimeDisplay;