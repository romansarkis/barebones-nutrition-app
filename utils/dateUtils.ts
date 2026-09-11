export function isToday(isoString: string): boolean {
  const entryDate = new Date(isoString);
  const today = new Date();

  return (
    entryDate.getFullYear() === today.getFullYear() &&
    entryDate.getMonth() === today.getMonth() &&
    entryDate.getDate() === today.getDate()
  );
}