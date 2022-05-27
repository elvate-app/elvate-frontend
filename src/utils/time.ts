export const getTimeLeft = (timeLeft: number) => {
  let time = { days: 0, hours: 0, minutes: 0, seconds: 0 };

  if (timeLeft >= 0) {
    time = {
      days: Math.floor(timeLeft / (1000 * 60 * 60 * 24)),
      hours: Math.floor((timeLeft / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((timeLeft / 1000 / 60) % 60),
      seconds: Math.floor((timeLeft / 1000) % 60),
    };
  }

  return {
    days: String(time.days),
    hours: String(time.hours).padStart(2, "0"),
    minutes: String(time.minutes).padStart(2, "0"),
    seconds: String(time.seconds).padStart(2, "0"),
  };
};
