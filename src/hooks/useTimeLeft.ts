import { useCallback, useEffect, useState } from "react";

const frequency = 60 * 6;

export default function useTimeLeft(timestamp: number) {
  const [percentage, setPercentage] = useState<number>(0);
  const timeLeft = +new Date((timestamp + frequency) * 1000) - +new Date();
  const timeCurrent = Date.now() / 1000;

  const updatePercentage = useCallback(() => {
    const newValue =
      timeLeft <= 0 ? 100 : ((timeCurrent - timestamp) / frequency) * 100;
    setPercentage(newValue);
  }, [timeLeft, timeCurrent, timestamp]);

  useEffect(() => {
    const timer = setTimeout(() => {
      updatePercentage();
    }, 1000);

    return () => clearTimeout(timer);
  }, [percentage, updatePercentage]);

  return { time: timeLeft, percentage: percentage };
}
