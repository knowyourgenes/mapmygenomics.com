import { createClient, type SanityClient } from "next-sanity";
import { apiVersion, dataset, projectId, isSanityConfigured } from "./env";

let _client: SanityClient | null = null;

// Server-only client with an Editor token, used for mutation endpoints
// (e.g. /api/views). Never imported into client components.
export function getWriteClient(): SanityClient | null {
  if (typeof window !== "undefined") return null;
  if (!isSanityConfigured) return null;
  if (_client) return _client;
  const token = process.env.SANITY_API_WRITE_TOKEN;
  if (!token) return null;
  _client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false,
    token,
    perspective: "raw",
  });
  return _client;
}
