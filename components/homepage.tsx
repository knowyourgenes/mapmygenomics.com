"use client";

import { useEffect, useMemo, useState, type CSSProperties } from "react";
import Link from "next/link";
import type { FeedQuestion, FeedTopic, FeedTrending } from "../sanity/fetch";
import { formatShortDate, formatVotes, postedAgoToDate } from "../sanity/format";
import Navbar from "./site/Navbar";
import Footer from "./site/Footer";
import HowItWorksSection from "./site/HowItWorks";
import { AskStrip } from "./site/AskCard";
import { ArrowRightIcon } from "./site/Icons";

type RevealStyle = CSSProperties & { "--rd"?: string };
type ChipStyle = CSSProperties & { "--c-accent"?: string };

const PAGE_SIZE = 10;

const VerifiedIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m5 12 5 5L20 7" />
  </svg>
);

type Props = {
  questions: FeedQuestion[];
  topics: FeedTopic[];
  trending: FeedTrending[];
  initialQuery?: string;
};

type SortKey = "recent" | "popular";
const SORT_LABELS: Record<SortKey, string> = {
  recent: "Most recent",
  popular: "Most views",
};

function parsePostedAgo(v: string) {
  // Smaller = more recent. Use minutes-equivalent ordering.
  const m = v.match(/(\d+)\s*(day|week|month|hour)/i);
  if (!m) return Number.MAX_SAFE_INTEGER;
  const n = parseInt(m[1], 10);
  const unit = m[2].toLowerCase();
  const mult = unit === "hour" ? 1 : unit === "day" ? 24 : unit === "week" ? 24 * 7 : 24 * 30;
  return n * mult;
}

export default function Homepage({ questions, topics, trending, initialQuery = "" }: Props) {
  const [activeTopic, setActiveTopic] = useState<string>("All topics");
  const [search, setSearch] = useState(initialQuery);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [sortKey, setSortKey] = useState<SortKey>("recent");
  const [sortOpen, setSortOpen] = useState(false);

  // Filter by topic + search
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    const matched = questions.filter((item) => {
      const matchesTopic = activeTopic === "All topics" || item.topic === activeTopic;
      if (!matchesTopic) return false;
      if (!q) return true;
      const hay = (
        item.title +
        " " +
        item.topic +
        " " +
        item.askedBy +
        " " +
        item.answers.map((a) => a.body.join(" ") + " " + a.personaName).join(" ")
      ).toLowerCase();
      return hay.includes(q);
    });
    const sorted = [...matched];
    switch (sortKey) {
      case "popular":
        sorted.sort((a, b) => (b.viewCount ?? 0) - (a.viewCount ?? 0));
        break;
      case "recent":
      default:
        sorted.sort((a, b) => parsePostedAgo(a.postedAgo) - parsePostedAgo(b.postedAgo));
        break;
    }
    return sorted;
  }, [questions, activeTopic, search, sortKey]);

  // Reset pagination when filter/search/sort changes
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [activeTopic, search, sortKey]);

  // Scroll the feed into view whenever a search begins.
  useEffect(() => {
    if (search.trim() === "") return;
    const el = document.getElementById("feed");
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top, behavior: "smooth" });
  }, [search]);

  // Close the sort dropdown on outside click / escape.
  useEffect(() => {
    if (!sortOpen) return;
    const onDown = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(".feed-head__sort-wrap")) setSortOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSortOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [sortOpen]);

  const scrollToFeed = () => {
    const el = document.getElementById("feed");
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top, behavior: "smooth" });
  };

  const visible = filtered.slice(0, visibleCount);
  const remaining = Math.max(0, filtered.length - visibleCount);
  const nextChunk = Math.min(PAGE_SIZE, remaining);

  // Reveal observer, nav scroll, vote toggle, smooth scroll. Re-runs when
  // `visible` changes so newly mounted cards animate in.
  useEffect(() => {
    const reveals = document.querySelectorAll<HTMLElement>(".reveal:not(.is-in)");
    let io: IntersectionObserver | null = null;
    if ("IntersectionObserver" in window) {
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-in");
              io?.unobserve(entry.target);
            }
          });
        },
        { rootMargin: "0px 0px -60px 0px", threshold: 0.05 },
      );
      reveals.forEach((el) => io!.observe(el));
    } else {
      reveals.forEach((el) => el.classList.add("is-in"));
    }
    return () => io?.disconnect();
  }, [visible.length]);

  useEffect(() => {
    const nav = document.getElementById("nav");
    const onScroll = () => {
      if (!nav) return;
      if (window.scrollY > 12) nav.classList.add("is-scrolled");
      else nav.classList.remove("is-scrolled");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    const anchors = document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]');
    const onAnchor = function (this: HTMLAnchorElement, e: Event) {
      const id = this.getAttribute("href");
      if (id && id.length > 1) {
        const target = document.querySelector(id);
        if (target) {
          e.preventDefault();
          const offset = 80;
          const top = (target as HTMLElement).getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top, behavior: "smooth" });
        }
      }
    };
    anchors.forEach((link) => link.addEventListener("click", onAnchor));

    return () => {
      window.removeEventListener("scroll", onScroll);
      anchors.forEach((link) => link.removeEventListener("click", onAnchor));
    };
  }, [visible.length]);

  return (
    <>
      <Navbar
        variant="home"
        questionsCount={questions.length}
        search={search}
        setSearch={setSearch}
        onSearchFocus={scrollToFeed}
      />

      {/* ============================================================
           HERO
           ============================================================ */}
      <section className="hero">
        <div className="container">
          <div className="hero__inner">
            <h1 className="hero__h reveal" style={{ "--rd": ".05s" } as RevealStyle}>
              The genetics questions you actually wonder about,
              <br />
              answered by people who{" "}
              <em>
                <span className="grad-text">actually know.</span>
              </em>
            </h1>

            <p className="hero__sub reveal" style={{ "--rd": ".1s" } as RevealStyle}>
              From &quot;why is my brother taller than me&quot; to &quot;what does it mean if my
              polygenic score is in the 90th percentile&quot;, a growing library of questions,
              answered by researchers, clinicians, genetic counsellors, and curious people who have
              done the reading.
            </p>

            <div className="hero__cta reveal" style={{ "--rd": ".15s" } as RevealStyle}>
              <Link href="#feed" className="btn btn--primary">
                Browse questions
                <ArrowRightIcon className="ico" />
              </Link>
              <Link href="#ask" className="btn btn--ghost">
                Ask your own
                <svg
                  className="ico"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </Link>
            </div>

            <div className="hero__trust reveal" style={{ "--rd": ".2s" } as RevealStyle}>
              <span className="hero__trust-item">
                <b>{questions.length}+</b> questions answered
              </span>
              <span className="hero__trust-sep"></span>
              <span className="hero__trust-item">
                <b>280</b> contributors
              </span>
              <span className="hero__trust-sep"></span>
              <span className="hero__trust-item">Reviewed by certified counsellors</span>
              <span className="hero__trust-sep"></span>
              <span className="hero__trust-item">Free, always</span>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
           TOPIC CHIPS
           ============================================================ */}
      <section className="chips-section">
        <div className="container">
          <div className="chips reveal">
            <button
              className={`chip ${activeTopic === "All topics" ? "is-active" : ""}`}
              type="button"
              onClick={() => setActiveTopic("All topics")}
            >
              All topics
            </button>
            {topics.map((t) => (
              <button
                key={t.name}
                className={`chip ${activeTopic === t.name ? "is-active" : ""}`}
                type="button"
                onClick={() => setActiveTopic(t.name)}
                style={{ "--c-accent": t.color } as ChipStyle}
              >
                <span className="chip__dot"></span>
                {t.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
           FEED
           ============================================================ */}
      <section className="feed" id="feed">
        <div className="container">
          <div className="feed__layout">
            <div className="feed__main">
              <div className="feed-head reveal">
                <div className="feed-head__left">
                  <span className="eyebrow">The Feed</span>
                  <h2 className="feed-head__title">
                    Questions <em style={{ fontStyle: "italic" }}>people are asking</em>
                  </h2>
                  <p className="feed-head__sub">
                    {search
                      ? `${filtered.length} result${filtered.length === 1 ? "" : "s"} for "${search}"`
                      : "A growing library. Curated by usefulness, not by upvote count alone."}
                  </p>
                </div>
                <div className="feed-head__sort-wrap">
                  <button
                    type="button"
                    className="feed-head__sort"
                    aria-haspopup="listbox"
                    aria-expanded={sortOpen}
                    onClick={() => setSortOpen((o) => !o)}
                  >
                    Sort: {SORT_LABELS[sortKey]}
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </button>
                  {sortOpen ? (
                    <ul className="feed-head__sort-menu" role="listbox">
                      {(Object.keys(SORT_LABELS) as SortKey[]).map((key) => (
                        <li key={key}>
                          <button
                            type="button"
                            role="option"
                            aria-selected={sortKey === key}
                            className={`feed-head__sort-option ${sortKey === key ? "is-active" : ""}`}
                            onClick={() => {
                              setSortKey(key);
                              setSortOpen(false);
                            }}
                          >
                            {SORT_LABELS[key]}
                            {sortKey === key ? (
                              <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="m5 12 5 5L20 7" />
                              </svg>
                            ) : null}
                          </button>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </div>

              <div className="q-list">
                {visible.length === 0 ? (
                  <div className="q-empty reveal">
                    <h3>No questions match your search.</h3>
                    <p>Try a different topic or clear the search.</p>
                  </div>
                ) : (
                  visible.map((q) => <QuestionCard key={q.slug} q={q} />)
                )}
              </div>

              {nextChunk > 0 ? (
                <div className="load-more reveal">
                  <button type="button" onClick={() => setVisibleCount((n) => n + PAGE_SIZE)}>
                    Load {nextChunk} more {nextChunk === 1 ? "question" : "questions"}
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </button>
                </div>
              ) : null}
            </div>

            {/* ===================== SIDEBAR ===================== */}
            <aside className="feed__aside">
              <div className="aside-card reveal">
                <div className="aside-card__head">
                  <h4 className="aside-card__title">Trending this week</h4>
                  <span className="aside-card__count">Top {trending.length}</span>
                </div>
                <div className="trending-list">
                  {trending.map((t, i) => {
                    const inner = (
                      <>
                        <div className="trending-item__num">{String(i + 1).padStart(2, "0")}</div>
                        <div className="trending-item__body">
                          <div className="trending-item__q">{t.question}</div>
                          <div className="trending-item__meta">
                            {t.topic}
                            <span className="trending-item__meta-dot"></span>
                            {t.views} views
                            <span className="trending-item__meta-dot"></span>
                            {t.postedAgo}
                          </div>
                        </div>
                      </>
                    );
                    return t.slug ? (
                      <Link key={i} href={`/thread/${t.slug}`} className="trending-item">
                        {inner}
                      </Link>
                    ) : (
                      <div key={i} className="trending-item">
                        {inner}
                      </div>
                    );
                  })}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <AskStrip />
      <HowItWorksSection />
      <Footer />
    </>
  );
}

function QuestionCard({ q }: { q: FeedQuestion }) {
  const postedDate = postedAgoToDate(q.postedAgo);
  const href = `/thread/${q.slug}`;
  return (
    <article className="q-card reveal">
      <div className="q-card__head">
        <span className="q-card__topic" style={{ color: q.topicColor }}>
          <span className="q-card__topic-dot" style={{ background: q.topicColor }}></span>
          {q.topic}
        </span>
        <span className="q-card__meta">
          Asked by <b>{q.askedBy}</b>
          <span className="q-card__meta-sep"></span>
          {formatVotes(q.viewCount ?? 0)} views
          {postedDate ? (
            <>
              <span className="q-card__meta-sep"></span>
              <time dateTime={postedDate.toISOString()}>{formatShortDate(postedDate)}</time>
            </>
          ) : null}
        </span>
      </div>
      <h3 className="q-card__title">
        <Link href={href}>{q.title}</Link>
      </h3>

      {q.answers.map((a, i) => (
        <AnswerBlock key={i} a={a} showFooter={i === 0} />
      ))}

      <div className="q-card__more">
        <span className="q-card__answers-pip">
          <span className="q-card__answers-pip-stack">
            {q.answers.slice(0, 3).map((a, i) => (
              <span
                key={i}
                className="q-card__answers-pip-dot"
                style={{ background: a.personaGradient }}
              ></span>
            ))}
          </span>
          {q.answers.length} answer{q.answers.length === 1 ? "" : "s"}
        </span>
        <Link href={href} className="q-card__more-link">
          Read full thread <ArrowRightIcon />
        </Link>
      </div>
    </article>
  );
}

function AnswerBlock({
  a,
  showFooter,
}: {
  a: FeedQuestion["answers"][number];
  showFooter: boolean;
}) {
  return (
    <div className="a-block">
      <div className="a-body">
        <div className="persona">
          <div className="persona__avatar" style={{ background: a.personaGradient }}>
            {a.personaInitials}
          </div>
          <div className="persona__info">
            <div className="persona__name">
              {a.personaName}
              {a.personaVerified ? (
                <span className="persona__verified">
                  <VerifiedIcon />
                </span>
              ) : null}
            </div>
            <div className="persona__title">{a.personaTitle}</div>
          </div>
        </div>
        <div className="a-text a-text--clamp">
          {a.body.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
        {showFooter ? (
          <div className="a-foot">
            <Link href="#" className="a-foot__action">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
              </svg>
              Comments
            </Link>
            <Link href="#" className="a-foot__action">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                <polyline points="16 6 12 2 8 6" />
                <line x1="12" y1="2" x2="12" y2="15" />
              </svg>
              Share
            </Link>
            <Link href="#" className="a-foot__action">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
              </svg>
              Save
            </Link>
          </div>
        ) : null}
      </div>
    </div>
  );
}
