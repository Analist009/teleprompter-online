import React, { memo } from 'react';

interface IndicatorProps {
  active: boolean;
}

const Indicator = memo(({ active }: IndicatorProps) => {
  return (
    <div 
      className={`
        rounded-full
        ${active ? 'w-1.5 h-1.5 bg-blue-500 animate-pulse' : 'w-1 h-1 bg-gray-300'}
      `}
    />
  );
});

const Indicators = memo(() => {
  return (
    <div className="flex justify-between px-5 mb-4">
      {[...Array(12)].map((_, index) => (
        <Indicator 
          key={index} 
          active={index % 3 === 0} 
        />
      ))}
    </div>
  );
});

export default Indicators;