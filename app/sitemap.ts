import type { MetadataRoute } from "next";
import { siteConfig } from "../lib/siteConfig";
import { getQuestionsForLlms } from "../sanity/fetch";
import { postedAgoToDate } from "../sanity/format";

const BASE = siteConfig.siteUrl;

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, lastModified: now, changeFrequency: "daily", priority: 1 },
  ];

  // CMS-driven routes. Wrapped so the static routes still emit if Sanity is down.
  // Note: /api/views/[slug] is an API route and is intentionally excluded.
  let threadRoutes: MetadataRoute.Sitemap = [];
  try {
    const questions = await getQuestionsForLlms();
    threadRoutes = questions.map((q) => ({
      url: `${BASE}/thread/${q.slug}`,
      lastModified: postedAgoToDate(q.postedAgo) ?? now,
      changeFrequency: "weekly",
      priority: 0.8,
    }));
  } catch (err) {
    console.warn("[sitemap] CMS fetch failed, emitting static routes only:", err);
  }

  // Dedupe by URL.
  const seen = new Set<string>();
  return [...staticRoutes, ...threadRoutes].filter((entry) => {
    if (seen.has(entry.url)) return false;
    seen.add(entry.url);
    return true;
  });
}
