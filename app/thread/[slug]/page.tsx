import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getFeedData,
  getQuestionBySlug,
  getQuestionSlugs,
  type FeedAnswer,
  type FeedQuestion,
} from "../../../sanity/fetch";
import { formatLongDate, formatVotes, postedAgoToDate } from "../../../sanity/format";
import Navbar from "../../../components/site/Navbar";
import Footer from "../../../components/site/Footer";
import { AskStrip } from "../../../components/site/AskCard";
import HowItWorksSection from "../../../components/site/HowItWorks";
import ThreadViewBeacon from "../../../components/ThreadViewBeacon";

export const revalidate = 60;

type Params = { slug: string };

export async function generateStaticParams(): Promise<Params[]> {
  const slugs = await getQuestionSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const q = await getQuestionBySlug(slug);
  if (!q) return { title: "Thread not found · MapMyGenomics" };
  return {
    title: `${q.title} · MapMyGenomics`,
    description: q.answers[0]?.body[0]?.slice(0, 160) ?? undefined,
  };
}

export default async function ThreadPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const [question, feed] = await Promise.all([getQuestionBySlug(slug), getFeedData()]);
  if (!question) notFound();

  const postedDate = postedAgoToDate(question.postedAgo);
  const similar = feed.questions
    .filter((q) => q.slug !== question.slug && q.topic === question.topic)
    .slice(0, 6);

  return (
    <>
      <Navbar variant="subpage" questionsCount={feed.questions.length} />

      <article className="thread">
        <div className="container">
          <Link href="/" className="thread__back">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to all questions
          </Link>

          <div className={`thread__layout ${similar.length === 0 ? "thread__layout--solo" : ""}`}>
            <div className="thread__main">
              <header className="thread__head">
                <span className="q-card__topic" style={{ color: question.topicColor }}>
                  <span
                    className="q-card__topic-dot"
                    style={{ background: question.topicColor }}
                  ></span>
                  {question.topic}
                </span>
                <h1 className="thread__title">{question.title}</h1>
                <div className="thread__meta">
                  <span>
                    Asked by <b>{question.askedBy}</b>
                  </span>
                  <span className="q-card__meta-sep"></span>
                  <span>
                    <ThreadViewBeacon slug={question.slug} initialCount={question.viewCount ?? 0} />{" "}
                    views
                  </span>
                  {postedDate ? (
                    <>
                      <span className="q-card__meta-sep"></span>
                      <time dateTime={postedDate.toISOString()}>{formatLongDate(postedDate)}</time>
                    </>
                  ) : null}
                  <span className="q-card__meta-sep"></span>
                  <span>
                    {question.answers.length} answer
                    {question.answers.length === 1 ? "" : "s"}
                  </span>
                </div>
              </header>

              <div className="thread__answers">
                {question.answers.map((a, i) => (
                  <ThreadAnswer key={i} a={a} />
                ))}
              </div>
            </div>

            {similar.length > 0 ? (
              <aside className="thread__aside">
                <SimilarQuestionsCard topic={question.topic} items={similar} />
              </aside>
            ) : null}
          </div>
        </div>
      </article>

      <AskStrip />
      <HowItWorksSection />
      <Footer />
    </>
  );
}

function SimilarQuestionsCard({ topic, items }: { topic: string; items: FeedQuestion[] }) {
  return (
    <div className="aside-card thread__aside-card">
      <div className="aside-card__head">
        <h4 className="aside-card__title">Similar questions</h4>
        <span className="aside-card__count">{topic}</span>
      </div>
      {items.length === 0 ? (
        <p className="thread__aside-empty">
          No other questions in this topic yet. Check back soon.
        </p>
      ) : (
        <ul className="thread__similar-list">
          {items.map((q) => (
            <li key={q.slug}>
              <Link href={`/thread/${q.slug}`} className="thread__similar-item">
                <span className="thread__similar-title">{q.title}</span>
                <span className="thread__similar-meta">
                  {formatVotes(q.viewCount ?? 0)} views
                  <span className="q-card__meta-sep"></span>
                  Asked by {q.askedBy}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function ThreadAnswer({ a }: { a: FeedAnswer }) {
  return (
    <section className="thread-answer">
      <div className="thread-answer__body">
        <div className="persona">
          <div className="persona__avatar" style={{ background: a.personaGradient }}>
            {a.personaInitials}
          </div>
          <div className="persona__info">
            <div className="persona__name">
              {a.personaName}
              {a.personaVerified ? (
                <span className="persona__verified">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m5 12 5 5L20 7" />
                  </svg>
                </span>
              ) : null}
            </div>
            <div className="persona__title">{a.personaTitle}</div>
          </div>
        </div>
        <div className="thread-answer__text">
          {a.body.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
