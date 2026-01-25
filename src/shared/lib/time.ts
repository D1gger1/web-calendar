export const timeToMinutes = (time: string) => {
  if(!time) return 0;

  const [rawTime, period] = time.split(' ');
  let [hours, minutes] = rawTime.split(':').map(Number);

  if (period.toLowerCase() === 'pm' && hours !== 12) {
    hours += 12;
  }

  if (period.toLowerCase() === 'am' && hours === 12) {
    hours = 0;
  }

  return hours * 60 + minutes;
};

export const DAY_START_HOUR = 6;
export const DAY_END_HOUR = 24;
export const TIME_STEP_MINUTES = 15; 