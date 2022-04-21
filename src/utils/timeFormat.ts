const periods = {
  month: 30 * 24 * 60 * 60 * 1000,
  week: 7 * 24 * 60 * 60 * 1000,
  day: 24 * 60 * 60 * 1000,
  hour: 60 * 60 * 1000,
  minute: 60 * 1000
};

export default function formatTime(timeCreated: string): string {
  const diff = Date.now() - Number(timeCreated);

  if (diff > periods.month) {
    // it was at least a month ago
    return `${Math.floor(diff / periods.month)} mo`;
  }
  if (diff > periods.week) {
    return `${Math.floor(diff / periods.week)} w`;
  }
  if (diff > periods.day) {
    return `${Math.floor(diff / periods.day)} d`;
  }
  if (diff > periods.hour) {
    return `${Math.floor(diff / periods.hour)} h`;
  }
  if (diff > periods.minute) {
    return `${Math.floor(diff / periods.minute)} m`;
  }
  return 'Just now';
}
