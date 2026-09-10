// utils/chartData.ts
import { Entry } from '@/context/EntriesContext';

export function getWeeklyCalorieData(entries: Entry[]) {
  // Build the last 7 days, oldest to newest, ending today
  const days: { label: string; date: Date }[] = [];
  const today = new Date();

  for (let i = 6; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    days.push({
      label: d.toLocaleDateString('en-US', { weekday: 'short' }), // "Mon", "Tue", etc.
      date: d,
    });
  }

  // Sum calories for entries that fall on each day
  const totals = days.map(({ date }) => {
    return entries
      .filter((entry) => {
        const entryDate = new Date(entry.date);
        return (
          entryDate.getFullYear() === date.getFullYear() &&
          entryDate.getMonth() === date.getMonth() &&
          entryDate.getDate() === date.getDate()
        );
      })
      .reduce((sum, entry) => sum + entry.calories, 0);
  });

  return {
    labels: days.map((d) => d.label),
    datasets: [{ data: totals }],
  };
}