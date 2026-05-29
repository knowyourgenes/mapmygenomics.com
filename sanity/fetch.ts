import { getClient } from "./client";
import { isSanityConfigured } from "./env";
import {
  questionBySlugQuery,
  questionSlugsQuery,
  questionsQuery,
  topicsQuery,
  trendingQuery,
} from "./queries";

export type FeedAnswer = {
  personaSlug: string;
  personaName: string;
  personaTitle: string;
  personaInitials: string;
  personaGradient: string;
  personaVerified: boolean;
  upvotes: number;
  body: string[];
};

export type FeedQuestion = {
  slug: string;
  topic: string;
  topicColor: string;
  title: string;
  askedBy: string;
  viewCount: number;
  postedAgo: string;
  answers: FeedAnswer[];
};

export type FeedTopic = { name: string; color: string };

export type FeedTrending = {
  question: string;
  topic: string;
  views: string;
  postedAgo: string;
  /** Slug of the underlying question doc when one matches by title. */
  slug?: string;
};

// Sanity returns portable-text blocks; flatten to paragraph strings.
type SanityBlock = { _type?: string; children?: { text?: string }[] };
function flattenBlocks(blocks: unknown): string[] {
  if (!Array.isArray(blocks)) return [];
  return blocks
    .filter(
      (b): b is SanityBlock => !!b && typeof b === "object" && (b as SanityBlock)._type === "block",
    )
    .map((b) => (b.children ?? []).map((c) => c.text ?? "").join(""))
    .filter((t) => t.trim().length > 0);
}

export async function getFeedData(): Promise<{
  questions: FeedQuestion[];
  topics: FeedTopic[];
  trending: FeedTrending[];
}> {
  const client = getClient();
  if (!isSanityConfigured || !client) {
    throw new Error(
      "Sanity is not configured. Set NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET in .env.local.",
    );
  }

  const [rawQuestions, rawTopics, rawTrending] = await Promise.all([
    client.fetch<
      Array<
        Omit<FeedQuestion, "answers"> & {
          answers: Array<Omit<FeedAnswer, "body"> & { body: unknown }>;
        }
      >
    >(questionsQuery),
    client.fetch<FeedTopic[]>(topicsQuery),
    client.fetch<FeedTrending[]>(trendingQuery),
  ]);

  const questions: FeedQuestion[] = (rawQuestions ?? []).map((q) => ({
    ...q,
    answers: (q.answers ?? []).map((a) => ({ ...a, body: flattenBlocks(a.body) })),
  }));

  // Resolve a slug for each trending entry by matching its question text to an
  // existing question. The trending docs in Sanity store the question as a
  // plain string, so we link them up here.
  const titleToSlug = new Map<string, string>();
  for (const q of questions) titleToSlug.set(normalizeTitle(q.title), q.slug);
  const trending: FeedTrending[] = (rawTrending ?? []).map((t) => ({
    ...t,
    slug: titleToSlug.get(normalizeTitle(t.question)),
  }));

  return {
    questions,
    topics: rawTopics ?? [],
    trending,
  };
}

function normalizeTitle(s: string): string {
  return (s ?? "")
    .toLowerCase()
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/\s+/g, " ")
    .trim();
}

export async function getQuestionSlugs(): Promise<string[]> {
  const client = getClient();
  if (!isSanityConfigured || !client) return [];
  return (await client.fetch<string[]>(questionSlugsQuery)) ?? [];
}

export async function getQuestionBySlug(slug: string): Promise<FeedQuestion | null> {
  const client = getClient();
  if (!isSanityConfigured || !client) return null;
  const raw = await client.fetch<
    | (Omit<FeedQuestion, "answers"> & {
        answers: Array<Omit<FeedAnswer, "body"> & { body: unknown }>;
      })
    | null
  >(questionBySlugQuery, { slug });
  if (!raw) return null;
  return {
    ...raw,
    answers: (raw.answers ?? []).map((a) => ({ ...a, body: flattenBlocks(a.body) })),
  };
}
