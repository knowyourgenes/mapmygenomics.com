// Render helpers shared by the homepage feed and the /thread/[slug] page.

const REFERENCE_NOW = new Date("2026-05-29T00:00:00Z").getTime();

/**
 * Convert a relative postedAgo string ("2 days ago", "1 week ago", "3 hours ago")
 * to an absolute Date, anchored on a fixed reference so it stays stable across
 * builds. Returns `null` if the input doesn't parse.
 */
export function postedAgoToDate(
  postedAgo: string | null | undefined,
  now = REFERENCE_NOW,
): Date | null {
  if (!postedAgo) return null;
  const m = postedAgo.match(/(\d+)\s*(hour|day|week|month)s?\s*ago/i);
  if (!m) return null;
  const n = parseInt(m[1], 10);
  const unit = m[2].toLowerCase();
  const MS =
    {
      hour: 60 * 60 * 1000,
      day: 24 * 60 * 60 * 1000,
      week: 7 * 24 * 60 * 60 * 1000,
      month: 30 * 24 * 60 * 60 * 1000,
    }[unit] ?? 24 * 60 * 60 * 1000;
  return new Date(now - n * MS);
}

const monthShortFmt = new Intl.DateTimeFormat("en-US", { month: "short" });
const monthLongFmt = new Intl.DateTimeFormat("en-US", { month: "long" });

export function formatShortDate(d: Date | null | undefined): string {
  if (!d || Number.isNaN(d.getTime())) return "";
  return `${d.getDate()} ${monthShortFmt.format(d)}, ${d.getFullYear()}`;
}

export function formatLongDate(d: Date | null | undefined): string {
  if (!d || Number.isNaN(d.getTime())) return "";
  return `${d.getDate()} ${monthLongFmt.format(d)}, ${d.getFullYear()}`;
}

export function formatVotes(n: number): string {
  if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, "") + "k";
  return String(n);
}
