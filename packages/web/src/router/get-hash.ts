export const getHash = (): { date: string; report: string } | null => {
  const parts = location.hash.slice(1).split("/");
  const date = parts[0] ?? "";
  const report = parts[1];
  return /^\d{4}-\d{2}-\d{2}$/.test(date) && report ? { date, report } : null;
};
