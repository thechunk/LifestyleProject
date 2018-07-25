export function formatDate(date) {
  const options = {
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
  };
  return (new Date(date)).toLocaleDateString('en-HK', options);
}
export function getWeekday(date) {
  // const options = { weekday: 'short' };
  // return (new Date(date)).toLocaleDateString('en-US', options);
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  return weekdays[(new Date(date)).getDay()];
}
