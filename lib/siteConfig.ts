// Canonical site identity. Reused by sitemap, robots, and the llms.txt routes
// so the production URL/name live in exactly one place.
export const siteConfig = {
  siteUrl: "https://mapmygenomics.com",
  siteName: "MapMyGenomics",
  description:
    "A growing library of genetics questions, answered by researchers, clinicians, " +
    "genetic counsellors, and curious people who have done the reading. " +
    "Free, ad-free, curated for accuracy.",
} as const;
