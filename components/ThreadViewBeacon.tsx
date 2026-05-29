"use client";

import { useEffect, useState } from "react";

// Fires once on mount: tells the server "this visitor just opened the thread".
// The server checks IP+UA fingerprint; only the first hit per fingerprint
// actually increments viewCount. Subsequent hits are no-ops.
// We render the live count once the server responds so the user sees the
// freshly incremented number without waiting for ISR revalidation.
export default function ThreadViewBeacon({
  slug,
  initialCount,
}: {
  slug: string;
  initialCount: number;
}) {
  const [count, setCount] = useState(initialCount);

  useEffect(() => {
    const ctl = new AbortController();
    fetch(`/api/views/${encodeURIComponent(slug)}`, {
      method: "POST",
      signal: ctl.signal,
      keepalive: true,
    })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data && typeof data.count === "number") setCount(data.count);
      })
      .catch(() => {
        // silent — view counting is best-effort
      });
    return () => ctl.abort();
  }, [slug]);

  return <>{format(count)}</>;
}

function format(n: number): string {
  if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, "") + "k";
  return String(n);
}
