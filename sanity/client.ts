import { createClient, type SanityClient } from "next-sanity";
import { apiVersion, dataset, projectId, useCdn, isSanityConfigured } from "./env";

let _client: SanityClient | null = null;

export function getClient(): SanityClient | null {
  if (!isSanityConfigured) return null;
  if (_client) return _client;
  // Server-only read token (for private datasets). Falls back to the write token
  // if a dedicated read token isn't set. Never exposed to the browser because
  // the homepage server component does all fetching.
  const token =
    typeof window === "undefined"
      ? process.env.SANITY_API_READ_TOKEN || process.env.SANITY_API_WRITE_TOKEN
      : undefined;
  _client = createClient({ projectId, dataset, apiVersion, useCdn, token });
  return _client;
}
