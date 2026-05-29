/**
 * Push seed-data.ts into the configured Sanity dataset.
 *
 * Required env vars (in .env.local):
 *   NEXT_PUBLIC_SANITY_PROJECT_ID
 *   NEXT_PUBLIC_SANITY_DATASET
 *   SANITY_API_WRITE_TOKEN     (must have Editor permissions)
 *
 * Run:  pnpm seed
 */

import { createClient } from "@sanity/client";
import { personas, questions, topics, topicColors, trending } from "./seed-data";

// Load env from .env.local. dotenv-flow / next would normally do this for us;
// for a standalone tsx script we read it explicitly.
function loadDotEnv() {
  try {
    const fs = require("fs");
    const path = require("path");
    const candidates = [".env.local", ".env"];
    for (const file of candidates) {
      const p = path.join(process.cwd(), file);
      if (!fs.existsSync(p)) continue;
      const lines = fs.readFileSync(p, "utf8").split(/\r?\n/);
      for (const raw of lines) {
        const line = raw.trim();
        if (!line || line.startsWith("#")) continue;
        const eq = line.indexOf("=");
        if (eq === -1) continue;
        const key = line.slice(0, eq).trim();
        let val = line.slice(eq + 1).trim();
        if (
          (val.startsWith('"') && val.endsWith('"')) ||
          (val.startsWith("'") && val.endsWith("'"))
        ) {
          val = val.slice(1, -1);
        }
        if (!process.env[key]) process.env[key] = val;
      }
    }
  } catch {
    // best-effort
  }
}

loadDotEnv();

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !dataset || !token) {
  console.error(
    "Missing env vars. Set NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, SANITY_API_WRITE_TOKEN in .env.local",
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: "2024-10-01",
  useCdn: false,
});

function paragraphsToBlocks(paragraphs: string[]) {
  return paragraphs.map((text, i) => ({
    _type: "block",
    _key: `b${i}`,
    style: "normal",
    markDefs: [],
    children: [{ _type: "span", _key: `s${i}`, text, marks: [] }],
  }));
}

async function run() {
  console.log(`Seeding project=${projectId} dataset=${dataset}`);

  // Drop any pre-existing question docs so old slugs don't linger after a slug
  // scheme change. We rebuild personas / topics / trending by createOrReplace
  // which is idempotent on stable IDs.
  const oldQuestionIds = await client.fetch<string[]>(`*[_type == "question"]._id`);
  if (oldQuestionIds.length > 0) {
    console.log(`Deleting ${oldQuestionIds.length} existing question docs.`);
  }

  const tx = client.transaction();
  for (const id of oldQuestionIds) {
    tx.delete(id);
  }

  // Personas
  for (const p of personas) {
    tx.createOrReplace({
      _id: `persona.${p.slug}`,
      _type: "persona",
      name: p.name,
      slug: { _type: "slug", current: p.slug },
      title: p.title,
      initials: p.initials,
      gradient: p.gradient,
      voice: p.voice,
      verified: p.verified,
    });
  }

  // Topics
  topics.forEach((name, idx) => {
    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    tx.createOrReplace({
      _id: `topic.${slug}`,
      _type: "topic",
      name,
      slug: { _type: "slug", current: slug },
      color: topicColors[name] ?? "var(--c-teal-light)",
      order: idx,
    });
  });

  // Trending
  trending.forEach((t, idx) => {
    tx.createOrReplace({
      _id: `trending.${idx + 1}`,
      _type: "trending",
      question: t.question,
      topic: t.topic,
      views: t.views,
      postedAgo: t.postedAgo,
      order: idx,
    });
  });

  // Questions
  questions.forEach((q, idx) => {
    const topicSlug = q.topic
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    tx.createOrReplace({
      _id: `question.${q.slug}`,
      _type: "question",
      title: q.title,
      slug: { _type: "slug", current: q.slug },
      topic: { _type: "reference", _ref: `topic.${topicSlug}` },
      askedBy: q.askedBy,
      viewCount: q.viewCount,
      postedAgo: q.postedAgo,
      order: idx,
      answers: q.answers.map((a, aIdx) => ({
        _type: "answer",
        _key: `a${aIdx}`,
        persona: { _type: "reference", _ref: `persona.${a.personaSlug}` },
        upvotes: a.upvotes,
        body: paragraphsToBlocks(a.body),
      })),
    });
  });

  const result = await tx.commit();
  console.log(`Seeded ${result.results.length} documents.`);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
