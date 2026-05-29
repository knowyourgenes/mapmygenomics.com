import { NextResponse } from "next/server";
import { createHash } from "node:crypto";
import { getWriteClient } from "../../../../sanity/write-client";

// One view counted per (slug, fingerprint). Fingerprint = sha256(ip + ua) so we
// dedupe per IP+device combo even when MAC addresses are unavailable (which
// they always are over the public web — the browser never exposes them).
//
// On first call from a fingerprint we atomically:
//   1. create a `view` doc keyed by `view.<slug>.<fingerprint>`
//   2. increment `question.viewCount` by 1
// On subsequent calls we no-op and return the current count.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function getIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0]!.trim();
  return (
    req.headers.get("x-real-ip") ||
    req.headers.get("cf-connecting-ip") ||
    req.headers.get("fly-client-ip") ||
    "anon"
  );
}

function fingerprintFor(ip: string, ua: string): string {
  return createHash("sha256").update(`${ip}|${ua}`).digest("hex").slice(0, 32);
}

export async function POST(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!slug) {
    return NextResponse.json({ error: "missing slug" }, { status: 400 });
  }

  const client = getWriteClient();
  if (!client) {
    return NextResponse.json({ error: "sanity not configured" }, { status: 503 });
  }

  const ip = getIp(req);
  const ua = req.headers.get("user-agent") ?? "";
  const fingerprint = fingerprintFor(ip, ua);
  const viewId = `view.${slug}.${fingerprint}`;

  try {
    const question = await client.fetch<{ _id: string; viewCount: number | null } | null>(
      `*[_type=="question" && slug.current==$slug][0]{_id, viewCount}`,
      { slug },
    );
    if (!question) {
      return NextResponse.json({ error: "not found" }, { status: 404 });
    }

    const existing = await client.fetch<string | null>(`*[_id==$id][0]._id`, {
      id: viewId,
    });

    if (existing) {
      return NextResponse.json({
        count: question.viewCount ?? 0,
        counted: false,
      });
    }

    const newCount = (question.viewCount ?? 0) + 1;
    await client
      .transaction()
      .create({
        _id: viewId,
        _type: "view",
        questionSlug: slug,
        fingerprint,
        createdAt: new Date().toISOString(),
      })
      .patch(question._id, (p) => p.set({ viewCount: newCount }))
      .commit();

    return NextResponse.json({ count: newCount, counted: true });
  } catch (err) {
    console.error("[api/views]", err);
    return NextResponse.json({ error: "internal" }, { status: 500 });
  }
}
