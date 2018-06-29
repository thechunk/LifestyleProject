export function formatDate(date) {
  const options = {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  };
  return (new Date(date)).toLocaleDateString('en-US', options);
}
