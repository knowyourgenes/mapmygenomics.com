// Shared generators for /llms.txt and /llms-full.txt (see https://llmstxt.org).
//
// buildLlmsTxt()      -> concise markdown index of the whole site.
// buildLlmsFullTxt()  -> same structure but with full answer bodies inlined.
//
// Both build absolute URLs from siteConfig.siteUrl and pull content from the
// existing Sanity-backed fetch layer (which returns empty offline).

import { siteConfig } from "./siteConfig";
import { postedAgoToDate, formatLongDate } from "../sanity/format";
import { getQuestionsForLlms, type LlmsQuestion } from "../sanity/fetch";

// ---------- URL + text helpers ----------

/** Absolute URL from a site-root path. */
function abs(path: string): string {
  const base = siteConfig.siteUrl.replace(/\/$/, "");
  return path.startsWith("/") ? `${base}${path}` : `${base}/${path}`;
}

/** Strip a trailing " | Brand" / " - Brand" / " · Brand" suffix off meta titles. */
export function cleanTitle(title: string): string {
  return title.replace(/\s+[|·\-–—]\s+[^|·\-–—]*$/, "").trim() || title.trim();
}

// ---------- Portable Text -> markdown ----------
// Generic serializer for Sanity Portable Text. Handles headings, lists,
// blockquotes and paragraphs with bold/italic marks; images and embeds are
// skipped. `headingOffset` demotes body headings so they nest under the
// article title (pass 2 to push h1->h3, h2->h4, ...).

type PTSpan = { _type?: string; text?: string; marks?: string[] };
type PTBlock = {
  _type?: string;
  style?: string;
  listItem?: string;
  level?: number;
  children?: PTSpan[];
};

function serializeSpans(children: PTSpan[] | undefined): string {
  if (!Array.isArray(children)) return "";
  return children
    .map((span) => {
      let text = span?.text ?? "";
      if (!text) return "";
      const marks = span.marks ?? [];
      if (marks.includes("strong")) text = `**${text}**`;
      if (marks.includes("em")) text = `*${text}*`;
      return text;
    })
    .join("");
}

export function portableTextToMarkdown(blocks: unknown, headingOffset = 0): string {
  if (!Array.isArray(blocks)) return "";
  const out: string[] = [];

  for (const block of blocks as PTBlock[]) {
    if (!block || block._type !== "block") continue; // skip images/embeds/etc.
    const text = serializeSpans(block.children).trim();
    if (!text) continue;

    const style = block.style ?? "normal";

    if (/^h[1-6]$/.test(style)) {
      const level = Math.min(6, parseInt(style.slice(1), 10) + headingOffset);
      out.push(`${"#".repeat(level)} ${text}`);
    } else if (style === "blockquote") {
      out.push(`> ${text}`);
    } else if (block.listItem === "bullet") {
      out.push(`- ${text}`);
    } else if (block.listItem === "number") {
      out.push(`1. ${text}`);
    } else {
      out.push(text);
    }
  }

  return out.join("\n\n");
}

// ---------- thread (question) helpers ----------

/** First non-empty paragraph of the first answer, trimmed for use as an excerpt. */
function threadExcerpt(q: LlmsQuestion): string {
  for (const a of q.answers) {
    const md = portableTextToMarkdown(a.body, 0).trim();
    if (md) {
      const firstPara = md.split("\n\n")[0].replace(/\s+/g, " ").trim();
      return firstPara.length > 200 ? firstPara.slice(0, 197).trimEnd() + "…" : firstPara;
    }
  }
  return "";
}

// ---------- llms.txt (concise index) ----------

export async function buildLlmsTxt(): Promise<string> {
  const questions = await getQuestionsForLlms();

  const lines: string[] = [];
  lines.push(`# ${siteConfig.siteName}`);
  lines.push("");
  lines.push(`> ${siteConfig.description}`);
  lines.push("");

  lines.push("## Key Pages");
  lines.push(
    `- [Home](${abs("/")}): Browse and search the full library of genetics questions and answers.`,
  );
  lines.push("");

  if (questions.length) {
    lines.push("## Questions");
    for (const q of questions) {
      const title = cleanTitle(q.title);
      const excerpt = threadExcerpt(q);
      const url = abs(`/thread/${q.slug}`);
      lines.push(excerpt ? `- [${title}](${url}): ${excerpt}` : `- [${title}](${url})`);
    }
    lines.push("");
  }

  return lines.join("\n").trim() + "\n";
}

// ---------- llms-full.txt (full content inlined) ----------

export async function buildLlmsFullTxt(): Promise<string> {
  const questions = await getQuestionsForLlms();

  const lines: string[] = [];
  lines.push(`# ${siteConfig.siteName}`);
  lines.push("");
  lines.push(`> ${siteConfig.description}`);
  lines.push("");

  lines.push("## Key Pages");
  lines.push(`- [Home](${abs("/")})`);
  lines.push("");

  if (questions.length) {
    lines.push("## Questions");
    lines.push("");
    for (const q of questions) {
      lines.push(`### ${cleanTitle(q.title)}`);
      lines.push(`URL: ${abs(`/thread/${q.slug}`)}`);
      if (q.topic) lines.push(`Topic: ${q.topic}`);
      if (q.askedBy) lines.push(`Asked by: ${q.askedBy}`);
      const posted = postedAgoToDate(q.postedAgo);
      const postedStr = formatLongDate(posted);
      if (postedStr) lines.push(`Posted: ${postedStr}`);

      const excerpt = threadExcerpt(q);
      lines.push("");
      if (excerpt) {
        lines.push(excerpt);
        lines.push("");
      }

      for (const a of q.answers) {
        const author = [a.personaName, a.personaTitle].filter(Boolean).join(" — ");
        if (author) lines.push(`#### Answer by ${author}`);
        const md = portableTextToMarkdown(a.body, 2).trim();
        if (md) {
          lines.push("");
          lines.push(md);
        }
        lines.push("");
      }
    }
  }

  return lines.join("\n").trim() + "\n";
}
