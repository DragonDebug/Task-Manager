const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

/**
 * Convert an ISO date string ("YYYY-MM-DD") to "DD-MMM-YYYY" format.
 * Pure string operation — no Date object, no timezone issues.
 */
export function formatDate(isoDate: string | undefined | null): string {
  if (!isoDate) return "";
  const parts = isoDate.split("-");
  if (parts.length !== 3) return isoDate;
  const [y, m, d] = parts;
  const monthIdx = parseInt(m, 10) - 1;
  if (monthIdx < 0 || monthIdx > 11) return isoDate;
  return `${d}-${MONTHS[monthIdx]}-${y}`;
}
