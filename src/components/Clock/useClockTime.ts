import { useState, useEffect, useCallback } from 'react';

interface Time {
  hours: string;
  minutes: string;
  seconds: string;
}

export const useClockTime = () => {
  const [time, setTime] = useState<Time>({
    hours: '00',
    minutes: '00',
    seconds: '00',
  });

  const updateTime = useCallback(() => {
    const now = new Date();
    setTime({
      hours: now.getHours().toString().padStart(2, '0'),
      minutes: now.getMinutes().toString().padStart(2, '0'),
      seconds: now.getSeconds().toString().padStart(2, '0'),
    });
  }, []);

  useEffect(() => {
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [updateTime]);

  return time;
};