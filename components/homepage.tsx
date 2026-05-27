"use client";

import { useEffect, type CSSProperties } from "react";

type RevealStyle = CSSProperties & { "--rd"?: string };
type ChipStyle = CSSProperties & { "--c-accent"?: string };

const UpvoteIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 4 4 14h6v6h4v-6h6z" />
  </svg>
);

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

const ArrowRightIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 12h14M13 5l7 7-7 7" />
  </svg>
);

const BrandMark = () => (
  <span className="nav__mark">
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 20c0-2 5-3 5-8s-5-6-5-8" />
      <path d="M17 4c0 2-5 3-5 8s5 6 5 8" />
      <path d="M8 8h8M8 16h8" />
    </svg>
  </span>
);

export default function Homepage() {
  useEffect(() => {
    const reveals = document.querySelectorAll<HTMLElement>(".reveal");
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

    const nav = document.getElementById("nav");
    const onScroll = () => {
      if (!nav) return;
      if (window.scrollY > 12) nav.classList.add("is-scrolled");
      else nav.classList.remove("is-scrolled");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    const chips = document.querySelectorAll<HTMLButtonElement>(".chip");
    const onChipClick = (e: Event) => {
      const target = e.currentTarget as HTMLButtonElement;
      chips.forEach((x) => x.classList.remove("is-active"));
      target.classList.add("is-active");
    };
    chips.forEach((c) => c.addEventListener("click", onChipClick));

    const voteBtns = document.querySelectorAll<HTMLButtonElement>(".a-vote__btn");
    const onVote = (e: Event) => {
      e.preventDefault();
      const btn = e.currentTarget as HTMLButtonElement;
      if (btn.dataset.voted === "1") {
        btn.dataset.voted = "0";
        btn.style.background = "";
        btn.style.color = "";
      } else {
        btn.dataset.voted = "1";
        btn.style.background = "var(--c-teal-light)";
        btn.style.color = "#fff";
        btn.style.transform = "translateY(-1px)";
        btn.animate(
          [
            { transform: "translateY(-1px) scale(1)" },
            { transform: "translateY(-4px) scale(1.08)" },
            { transform: "translateY(-1px) scale(1)" },
          ],
          { duration: 380, easing: "cubic-bezier(0.22, 1, 0.36, 1)" },
        );
      }
    };
    voteBtns.forEach((b) => b.addEventListener("click", onVote));

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
      io?.disconnect();
      window.removeEventListener("scroll", onScroll);
      chips.forEach((c) => c.removeEventListener("click", onChipClick));
      voteBtns.forEach((b) => b.removeEventListener("click", onVote));
      anchors.forEach((link) => link.removeEventListener("click", onAnchor));
    };
  }, []);

  return (
    <>
      {/* ============================================================
           NAVIGATION
           ============================================================ */}
      <header className="nav" id="nav">
        <div className="container nav__inner">
          <a href="#" className="nav__brand">
            <BrandMark />
            <span className="nav__brand-w">
              <span>MapMyGenomics</span>
              <small>A KYG community</small>
            </span>
          </a>

          <label className="nav__search">
            <svg
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="9" cy="9" r="6" />
              <path d="m14 14 4 4" />
            </svg>
            <input
              type="text"
              placeholder="Search 4,200+ questions…"
              aria-label="Search questions"
            />
            <span className="nav__search-key">⌘ K</span>
          </label>

          <div className="nav__cta">
            <a href="https://knowyourgenes.com" className="btn btn--primary">
              Visit KnowYourGenes
              <ArrowRightIcon className="ico" />
            </a>
          </div>
        </div>
      </header>

      {/* ============================================================
           HERO
           ============================================================ */}
      <section className="hero">
        <div className="container">
          <div className="hero__inner">
            <div className="hero__eyebrow reveal">
              <span className="hero__eyebrow-pill">
                <span className="hero__eyebrow-dot"></span>
                Ask · Read · Wonder
              </span>
              <span>Genetics, the way you actually wonder about it</span>
            </div>

            <h1 className="hero__h reveal" style={{ "--rd": ".05s" } as RevealStyle}>
              The genetics questions you
              <br />
              actually wonder about,
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
              <a href="#feed" className="btn btn--primary">
                Browse questions
                <ArrowRightIcon className="ico" />
              </a>
              <a href="#" className="btn btn--ghost">
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
              </a>
            </div>

            <div className="hero__trust reveal" style={{ "--rd": ".2s" } as RevealStyle}>
              <span className="hero__trust-item">
                <b>4,200+</b> questions answered
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
            <button className="chip is-active" type="button">
              All topics
            </button>
            <button
              className="chip"
              type="button"
              style={{ "--c-accent": "var(--c-teal-light)" } as ChipStyle}
            >
              <span className="chip__dot"></span>Inheritance
            </button>
            <button
              className="chip"
              type="button"
              style={{ "--c-accent": "var(--c-amber)" } as ChipStyle}
            >
              <span className="chip__dot"></span>Ancestry
            </button>
            <button
              className="chip"
              type="button"
              style={{ "--c-accent": "var(--c-rust)" } as ChipStyle}
            >
              <span className="chip__dot"></span>Genetic testing
            </button>
            <button
              className="chip"
              type="button"
              style={{ "--c-accent": "var(--c-rose)" } as ChipStyle}
            >
              <span className="chip__dot"></span>Disease risk
            </button>
            <button
              className="chip"
              type="button"
              style={{ "--c-accent": "var(--c-violet)" } as ChipStyle}
            >
              <span className="chip__dot"></span>Twins
            </button>
            <button
              className="chip"
              type="button"
              style={{ "--c-accent": "var(--c-violet)" } as ChipStyle}
            >
              <span className="chip__dot"></span>Genealogy surprises
            </button>
            <button
              className="chip"
              type="button"
              style={{ "--c-accent": "var(--c-rust)" } as ChipStyle}
            >
              <span className="chip__dot"></span>Got my results
            </button>
            <button
              className="chip"
              type="button"
              style={{ "--c-accent": "var(--c-rust)" } as ChipStyle}
            >
              <span className="chip__dot"></span>Pop culture &amp; science
            </button>
            <button
              className="chip"
              type="button"
              style={{ "--c-accent": "var(--c-rose)" } as ChipStyle}
            >
              <span className="chip__dot"></span>Pregnancy &amp; children
            </button>
            <button
              className="chip"
              type="button"
              style={{ "--c-accent": "var(--ink-2)" } as ChipStyle}
            >
              <span className="chip__dot"></span>Ethics
            </button>
            <button
              className="chip"
              type="button"
              style={{ "--c-accent": "var(--c-forest)" } as ChipStyle}
            >
              <span className="chip__dot"></span>Wild science
            </button>
          </div>
        </div>
      </section>

      {/* ============================================================
           FEED
           ============================================================ */}
      <section className="feed" id="feed">
        <div className="container">
          <div className="feed__layout">
            {/* ===================== MAIN COLUMN ===================== */}
            <div className="feed__main">
              <div className="feed-head reveal">
                <div className="feed-head__left">
                  <span className="eyebrow">The Feed</span>
                  <h2 className="feed-head__title">
                    Questions <em style={{ fontStyle: "italic" }}>people are asking</em>
                  </h2>
                  <p className="feed-head__sub">
                    A growing library. Curated by usefulness, not by upvote count alone.
                  </p>
                </div>
                <button className="feed-head__sort">
                  Sort: Most helpful
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

              <div className="q-list">
                {/* Q1 — INHERITANCE */}
                <article className="q-card reveal" data-topic="inheritance">
                  <div className="q-card__head">
                    <span className="q-card__topic">
                      <span className="q-card__topic-dot"></span>Inheritance
                    </span>
                    <span className="q-card__meta">
                      Asked by <b>Ananya R.</b>
                      <span className="q-card__meta-sep"></span>3.4k views
                      <span className="q-card__meta-sep"></span>2 days ago
                    </span>
                  </div>
                  <h3 className="q-card__title">
                    <a href="#">
                      If I share 50% DNA with both my parents, why do I look so much more like one
                      of them?
                    </a>
                  </h3>

                  <div className="a-block">
                    <div className="a-vote">
                      <button className="a-vote__btn" aria-label="Upvote">
                        <UpvoteIcon />
                      </button>
                      <div className="a-vote__count">
                        847<small>Upvotes</small>
                      </div>
                    </div>
                    <div className="a-body">
                      <div className="persona" data-p="arjun">
                        <div className="persona__avatar">AM</div>
                        <div className="persona__info">
                          <div className="persona__name">
                            Arjun Mehta
                            <span className="persona__verified">
                              <VerifiedIcon />
                            </span>
                          </div>
                          <div className="persona__title">
                            PhD candidate in population genetics, IISc
                          </div>
                        </div>
                      </div>
                      <div className="a-text a-text--clamp">
                        <p>This is more interesting than it sounds. Let me explain why.</p>
                        <p>
                          Yes, you got 50% of your DNA from each parent. But &quot;look like&quot;
                          is determined by a small subset of your DNA, maybe a few hundred variants
                          that influence visible facial features, skin tone, hair, eye shape. Which
                          half of each parent&apos;s DNA you got is random, and the random draw
                          might have given you most of the appearance-relevant variants from one
                          side.
                        </p>
                        <p>
                          So you can be 50/50 by total DNA and 80/20 by visible-trait DNA.
                          That&apos;s not a contradiction. It&apos;s exactly what the maths predicts
                          will happen sometimes.
                        </p>
                      </div>
                      <div className="a-foot">
                        <a href="#" className="a-foot__action">
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                          </svg>
                          3 comments
                        </a>
                        <a href="#" className="a-foot__action">
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
                        </a>
                        <a href="#" className="a-foot__action">
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
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="a-block">
                    <div className="a-vote">
                      <button className="a-vote__btn" aria-label="Upvote">
                        <UpvoteIcon />
                      </button>
                      <div className="a-vote__count">
                        412<small>Upvotes</small>
                      </div>
                    </div>
                    <div className="a-body">
                      <div className="persona" data-p="priya">
                        <div className="persona__avatar">PI</div>
                        <div className="persona__info">
                          <div className="persona__name">
                            Dr. Priya Iyer
                            <span className="persona__verified">
                              <VerifiedIcon />
                            </span>
                          </div>
                          <div className="persona__title">Genetic counsellor · 11 years</div>
                        </div>
                      </div>
                      <div className="a-text a-text--clamp">
                        <p>Great question, this comes up a lot when families bring babies in.</p>
                        <p>
                          To add to Arjun&apos;s answer: people sometimes notice that a child looks
                          like one parent for a few years and then &quot;switches&quot; to looking
                          like the other parent. This is also real. The genes for facial structure
                          express themselves at different rates as the face grows. Toddler features
                          are dominated by certain variants, adolescent features by others, and
                          adult features by yet others.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="q-card__more">
                    <span className="q-card__answers-pip">
                      <span className="q-card__answers-pip-stack">
                        <span
                          className="q-card__answers-pip-dot"
                          style={{ background: "linear-gradient(135deg, #6F61E8, #4E40C2)" }}
                        ></span>
                        <span
                          className="q-card__answers-pip-dot"
                          style={{ background: "linear-gradient(135deg, #2F8C5C, #1F6B43)" }}
                        ></span>
                      </span>
                      2 answers · 8 follow-ups
                    </span>
                    <a href="#" className="q-card__more-link">
                      Read full thread <ArrowRightIcon />
                    </a>
                  </div>
                </article>

                {/* Q2 — TWINS */}
                <article className="q-card reveal" data-topic="twins">
                  <div className="q-card__head">
                    <span className="q-card__topic">
                      <span className="q-card__topic-dot"></span>Twins
                    </span>
                    <span className="q-card__meta">
                      Asked by <b>Rohan P.</b>
                      <span className="q-card__meta-sep"></span>5.1k views
                      <span className="q-card__meta-sep"></span>4 days ago
                    </span>
                  </div>
                  <h3 className="q-card__title">
                    <a href="#">
                      Why do identical twins sometimes have noticeably different personalities?
                    </a>
                  </h3>

                  <div className="a-block">
                    <div className="a-vote">
                      <button className="a-vote__btn" aria-label="Upvote">
                        <UpvoteIcon />
                      </button>
                      <div className="a-vote__count">
                        1.2k<small>Upvotes</small>
                      </div>
                    </div>
                    <div className="a-body">
                      <div className="persona" data-p="maya">
                        <div className="persona__avatar">MS</div>
                        <div className="persona__info">
                          <div className="persona__name">
                            Maya Subramaniam
                            <span className="persona__verified">
                              <VerifiedIcon />
                            </span>
                          </div>
                          <div className="persona__title">Science journalist</div>
                        </div>
                      </div>
                      <div className="a-text a-text--clamp">
                        <p>
                          The short answer: identical genes don&apos;t mean identical lives, and
                          personality is shaped by both.
                        </p>
                        <p>
                          Twin studies have been the workhorse of behavioural genetics for decades.
                          The consensus from large studies (the Minnesota Twin Family Study is the
                          most-cited): personality traits are roughly 40 to 60% heritable. The
                          remaining 40 to 60% is environmental. Here is the crucial bit: most of
                          that environmental variation is &quot;non-shared&quot; environment, not
                          &quot;shared&quot; environment.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="a-block">
                    <div className="a-vote">
                      <button className="a-vote__btn" aria-label="Upvote">
                        <UpvoteIcon />
                      </button>
                      <div className="a-vote__count">
                        508<small>Upvotes</small>
                      </div>
                    </div>
                    <div className="a-body">
                      <div className="persona" data-p="kabir">
                        <div className="persona__avatar">KA</div>
                        <div className="persona__info">
                          <div className="persona__name">Kabir Ahmed</div>
                          <div className="persona__title">Bioinformatics engineer</div>
                        </div>
                      </div>
                      <div className="a-text a-text--clamp">
                        <p>
                          Quick reality check on the genes-aren&apos;t-everything point: identical
                          twins also aren&apos;t quite genetically identical at the cellular level.
                        </p>
                        <p>
                          Mutations happen during cell division. By the time twins are adults, each
                          has accumulated hundreds of somatic mutations that the other doesn&apos;t
                          carry. These are usually trivial, but they add up. And gene expression
                          (which genes are turned on or off in which cells) diverges significantly
                          through life because of epigenetic changes driven by diet, stress,
                          illness, environment.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="q-card__more">
                    <span className="q-card__answers-pip">
                      <span className="q-card__answers-pip-stack">
                        <span
                          className="q-card__answers-pip-dot"
                          style={{ background: "linear-gradient(135deg, #B66B16, #8B4F0E)" }}
                        ></span>
                        <span
                          className="q-card__answers-pip-dot"
                          style={{ background: "linear-gradient(135deg, #C73C70, #9A2855)" }}
                        ></span>
                      </span>
                      2 answers · 14 follow-ups
                    </span>
                    <a href="#" className="q-card__more-link">
                      Read full thread <ArrowRightIcon />
                    </a>
                  </div>
                </article>

                {/* ===== HOW THIS WORKS — interstitial card ===== */}
                <div className="rules-card reveal">
                  <div className="rules-card__head">
                    <span className="rules-card__ico">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M12 22c5.5 0 10-4.5 10-10S17.5 2 12 2 2 6.5 2 12s4.5 10 10 10z" />
                        <path d="M9 11l3 3L22 4" />
                      </svg>
                    </span>
                    <h3 className="rules-card__title">
                      How this works ·{" "}
                      <em
                        style={{
                          fontStyle: "italic",
                          color: "var(--ink-3)",
                          fontWeight: 400,
                        }}
                      >
                        three rules
                      </em>
                    </h3>
                  </div>
                  <div className="rules-list">
                    <div className="rule">
                      <div className="rule__num">01</div>
                      <div className="rule__text">
                        <b>Anyone can ask.</b> We curate which questions to surface to the homepage
                        based on how useful the answer is likely to be to other readers.
                      </div>
                    </div>
                    <div className="rule">
                      <div className="rule__num">02</div>
                      <div className="rule__text">
                        <b>Anyone can answer.</b> We verify contributor credentials when they claim
                        a professional title.
                      </div>
                    </div>
                    <div className="rule">
                      <div className="rule__num">03</div>
                      <div className="rule__text">
                        <b>We don&apos;t sell anything.</b> No products, no tests, no affiliate
                        links. The site exists because the questions are interesting.
                      </div>
                    </div>
                  </div>
                </div>

                {/* Q3 — GOT MY RESULTS */}
                <article className="q-card reveal" data-topic="results">
                  <div className="q-card__head">
                    <span className="q-card__topic">
                      <span className="q-card__topic-dot"></span>Got my results
                    </span>
                    <span className="q-card__meta">
                      Asked by <b>Priyanka G.</b>
                      <span className="q-card__meta-sep"></span>2.8k views
                      <span className="q-card__meta-sep"></span>6 days ago
                    </span>
                  </div>
                  <h3 className="q-card__title">
                    <a href="#">
                      I just got my DNA test back and it says I&apos;m 8% Italian. None of my known
                      ancestors are Italian. What&apos;s going on?
                    </a>
                  </h3>

                  <div className="a-block">
                    <div className="a-vote">
                      <button className="a-vote__btn" aria-label="Upvote">
                        <UpvoteIcon />
                      </button>
                      <div className="a-vote__count">
                        923<small>Upvotes</small>
                      </div>
                    </div>
                    <div className="a-body">
                      <div className="persona" data-p="sunita">
                        <div className="persona__avatar">SR</div>
                        <div className="persona__info">
                          <div className="persona__name">Sunita Rao</div>
                          <div className="persona__title">Genealogy hobbyist · 18 tests taken</div>
                        </div>
                      </div>
                      <div className="a-text a-text--clamp">
                        <p>Welcome to the club. This happens to a lot of us.</p>
                        <p>A few possibilities, in rough order of likelihood:</p>
                        <p>
                          One: the test is wrong in the most boring way. Ancestry estimates have
                          wide confidence intervals, and an &quot;8% Italian&quot; result might be
                          saying &quot;we found a pattern that could be Italian, or could be some
                          other Southern European population, with moderate confidence.&quot; Look
                          at the underlying confidence range if the company shows it.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="a-block">
                    <div className="a-vote">
                      <button className="a-vote__btn" aria-label="Upvote">
                        <UpvoteIcon />
                      </button>
                      <div className="a-vote__count">
                        445<small>Upvotes</small>
                      </div>
                    </div>
                    <div className="a-body">
                      <div className="persona" data-p="arjun">
                        <div className="persona__avatar">AM</div>
                        <div className="persona__info">
                          <div className="persona__name">
                            Arjun Mehta
                            <span className="persona__verified">
                              <VerifiedIcon />
                            </span>
                          </div>
                          <div className="persona__title">PhD candidate, population genetics</div>
                        </div>
                      </div>
                      <div className="a-text a-text--clamp">
                        <p>Sunita&apos;s answer is solid. Adding one more point.</p>
                        <p>
                          Reference populations are built from people who self-identify as having
                          ancestry from a specific region for several generations. But
                          &quot;Italian&quot; is a relatively recent national identity. For most of
                          European history, what&apos;s now Italy was a collection of city-states,
                          kingdoms, and shifting populations with significant gene flow from North
                          Africa, the Middle East, the Balkans, and Northern Europe.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="q-card__more">
                    <span className="q-card__answers-pip">
                      <span className="q-card__answers-pip-stack">
                        <span
                          className="q-card__answers-pip-dot"
                          style={{ background: "linear-gradient(135deg, #C76842, #9C4A2C)" }}
                        ></span>
                        <span
                          className="q-card__answers-pip-dot"
                          style={{ background: "linear-gradient(135deg, #6F61E8, #4E40C2)" }}
                        ></span>
                      </span>
                      2 answers · 11 follow-ups
                    </span>
                    <a href="#" className="q-card__more-link">
                      Read full thread <ArrowRightIcon />
                    </a>
                  </div>
                </article>

                {/* Q4 — DISEASE RISK / HUNTINGTON */}
                <article className="q-card reveal" data-topic="risk">
                  <div className="q-card__head">
                    <span className="q-card__topic">
                      <span className="q-card__topic-dot"></span>Disease risk
                    </span>
                    <span className="q-card__meta">
                      Asked by <b>Anonymous</b>
                      <span className="q-card__meta-sep"></span>8.7k views
                      <span className="q-card__meta-sep"></span>1 week ago
                    </span>
                  </div>
                  <h3 className="q-card__title">
                    <a href="#">
                      My grandfather had Huntington&apos;s. What&apos;s the chance I get it?
                    </a>
                  </h3>

                  <div className="a-block">
                    <div className="a-vote">
                      <button className="a-vote__btn" aria-label="Upvote">
                        <UpvoteIcon />
                      </button>
                      <div className="a-vote__count">
                        1.8k<small>Upvotes</small>
                      </div>
                    </div>
                    <div className="a-body">
                      <div className="persona" data-p="priya">
                        <div className="persona__avatar">PI</div>
                        <div className="persona__info">
                          <div className="persona__name">
                            Dr. Priya Iyer
                            <span className="persona__verified">
                              <VerifiedIcon />
                            </span>
                          </div>
                          <div className="persona__title">Genetic counsellor · 11 years</div>
                        </div>
                      </div>
                      <div className="a-text a-text--clamp">
                        <p>
                          I&apos;m sorry you&apos;re carrying this question. Let me give you the
                          math, then the harder part.
                        </p>
                        <p>
                          Huntington&apos;s disease is autosomal dominant, which means a person with
                          the affected gene variant has the condition. It is not skipped. If your
                          grandfather had Huntington&apos;s, the genetics work like this: he had one
                          copy of the affected gene. Each of his children (including your parent)
                          had a 50% chance of inheriting that copy.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="a-block">
                    <div className="a-vote">
                      <button className="a-vote__btn" aria-label="Upvote">
                        <UpvoteIcon />
                      </button>
                      <div className="a-vote__count">
                        612<small>Upvotes</small>
                      </div>
                    </div>
                    <div className="a-body">
                      <div className="persona" data-p="ravi">
                        <div className="persona__avatar">RK</div>
                        <div className="persona__info">
                          <div className="persona__name">
                            Dr. Ravi Krishnan
                            <span className="persona__verified">
                              <VerifiedIcon />
                            </span>
                          </div>
                          <div className="persona__title">Practising oncologist</div>
                        </div>
                      </div>
                      <div className="a-text a-text--clamp">
                        <p>
                          I&apos;m not a Huntington&apos;s specialist, but I want to add one
                          practical note.
                        </p>
                        <p>
                          The decision of whether to test for a late-onset, currently incurable
                          condition is one of the most personally weighty calls in clinical
                          genetics. People choose differently. Some want to know so they can plan,
                          have children before symptoms appear, or use IVF with embryo screening to
                          avoid passing it on. Others choose not to know because the uncertainty is
                          more bearable than a confirmed positive.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="q-card__more">
                    <span className="q-card__answers-pip">
                      <span className="q-card__answers-pip-stack">
                        <span
                          className="q-card__answers-pip-dot"
                          style={{ background: "linear-gradient(135deg, #2F8C5C, #1F6B43)" }}
                        ></span>
                        <span
                          className="q-card__answers-pip-dot"
                          style={{ background: "linear-gradient(135deg, #15605D, #0E4D4B)" }}
                        ></span>
                      </span>
                      2 answers · 24 follow-ups
                    </span>
                    <a href="#" className="q-card__more-link">
                      Read full thread <ArrowRightIcon />
                    </a>
                  </div>
                </article>

                {/* ===== NEWSLETTER — interstitial ===== */}
                <div className="inline-card reveal">
                  <div className="inline-card__inner">
                    <div className="inline-card__eyebrow">Newsletter · Every Sunday</div>
                    <h3 className="inline-card__title">The five best answers of the week.</h3>
                    <p className="inline-card__sub">
                      A weekly digest of the most interesting genetics questions our community
                      answered. Curated, not algorithm-picked.
                    </p>
                    <form
                      className="inline-card__form"
                      onSubmit={(e) => {
                        e.preventDefault();
                      }}
                    >
                      <input type="email" placeholder="your@email.com" aria-label="Email address" />
                      <button type="submit">
                        Subscribe{" "}
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          style={{ width: 14, height: 14 }}
                        >
                          <path d="M5 12h14M13 5l7 7-7 7" />
                        </svg>
                      </button>
                    </form>
                  </div>
                </div>

                {/* Q5 — ANCESTRY / NEANDERTHAL */}
                <article className="q-card reveal" data-topic="ancestry">
                  <div className="q-card__head">
                    <span className="q-card__topic">
                      <span className="q-card__topic-dot"></span>Ancestry
                    </span>
                    <span className="q-card__meta">
                      Asked by <b>Vikram J.</b>
                      <span className="q-card__meta-sep"></span>4.2k views
                      <span className="q-card__meta-sep"></span>2 weeks ago
                    </span>
                  </div>
                  <h3 className="q-card__title">
                    <a href="#">
                      How can my DNA test say &apos;less than 1% Neanderthal&apos; if Neanderthals
                      went extinct 40,000 years ago?
                    </a>
                  </h3>

                  <div className="a-block">
                    <div className="a-vote">
                      <button className="a-vote__btn" aria-label="Upvote">
                        <UpvoteIcon />
                      </button>
                      <div className="a-vote__count">
                        1.1k<small>Upvotes</small>
                      </div>
                    </div>
                    <div className="a-body">
                      <div className="persona" data-p="maya">
                        <div className="persona__avatar">MS</div>
                        <div className="persona__info">
                          <div className="persona__name">
                            Maya Subramaniam
                            <span className="persona__verified">
                              <VerifiedIcon />
                            </span>
                          </div>
                          <div className="persona__title">Science journalist</div>
                        </div>
                      </div>
                      <div className="a-text a-text--clamp">
                        <p>
                          Because Neanderthals didn&apos;t fully go extinct. They interbred with
                          modern humans, and a small percentage of their DNA is still walking around
                          inside everyone of non-African descent.
                        </p>
                        <p>
                          When anatomically modern Homo sapiens migrated out of Africa starting
                          around 60,000 years ago, they encountered Neanderthals in the Middle East
                          and Europe. The two groups interbred enough that today, every person of
                          European, Asian, or Indigenous American descent carries between 1% and 4%
                          Neanderthal DNA.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="a-block">
                    <div className="a-vote">
                      <button className="a-vote__btn" aria-label="Upvote">
                        <UpvoteIcon />
                      </button>
                      <div className="a-vote__count">
                        527<small>Upvotes</small>
                      </div>
                    </div>
                    <div className="a-body">
                      <div className="persona" data-p="arjun">
                        <div className="persona__avatar">AM</div>
                        <div className="persona__info">
                          <div className="persona__name">
                            Arjun Mehta
                            <span className="persona__verified">
                              <VerifiedIcon />
                            </span>
                          </div>
                          <div className="persona__title">PhD candidate, population genetics</div>
                        </div>
                      </div>
                      <div className="a-text a-text--clamp">
                        <p>Adding a fun fact: Denisovan DNA is the other half of this story.</p>
                        <p>
                          Denisovans are an extinct human cousin we only learned about in 2010, from
                          a finger bone found in a Siberian cave. They also interbred with modern
                          humans. People of East Asian and Melanesian descent carry small amounts of
                          Denisovan DNA, up to 5% in some Papuan populations.
                        </p>
                        <p>
                          We have learned almost everything we know about Denisovans from their DNA
                          inside us. There are still no confirmed Denisovan skeletons beyond a
                          handful of bone fragments. They are, in a real sense, ghosts who are
                          mostly visible through their descendants.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="q-card__more">
                    <span className="q-card__answers-pip">
                      <span className="q-card__answers-pip-stack">
                        <span
                          className="q-card__answers-pip-dot"
                          style={{ background: "linear-gradient(135deg, #B66B16, #8B4F0E)" }}
                        ></span>
                        <span
                          className="q-card__answers-pip-dot"
                          style={{ background: "linear-gradient(135deg, #6F61E8, #4E40C2)" }}
                        ></span>
                      </span>
                      2 answers · 19 follow-ups
                    </span>
                    <a href="#" className="q-card__more-link">
                      Read full thread <ArrowRightIcon />
                    </a>
                  </div>
                </article>

                {/* Q6 — DEPRESSION / RISK */}
                <article className="q-card reveal" data-topic="risk">
                  <div className="q-card__head">
                    <span className="q-card__topic">
                      <span className="q-card__topic-dot"></span>Disease risk
                    </span>
                    <span className="q-card__meta">
                      Asked by <b>Anonymous</b>
                      <span className="q-card__meta-sep"></span>9.3k views
                      <span className="q-card__meta-sep"></span>3 days ago
                    </span>
                  </div>
                  <h3 className="q-card__title">
                    <a href="#">Is depression genetic?</a>
                  </h3>

                  <div className="a-block">
                    <div className="a-vote">
                      <button className="a-vote__btn" aria-label="Upvote">
                        <UpvoteIcon />
                      </button>
                      <div className="a-vote__count">
                        1.6k<small>Upvotes</small>
                      </div>
                    </div>
                    <div className="a-body">
                      <div className="persona" data-p="priya">
                        <div className="persona__avatar">PI</div>
                        <div className="persona__info">
                          <div className="persona__name">
                            Dr. Priya Iyer
                            <span className="persona__verified">
                              <VerifiedIcon />
                            </span>
                          </div>
                          <div className="persona__title">Genetic counsellor · 11 years</div>
                        </div>
                      </div>
                      <div className="a-text a-text--clamp">
                        <p>
                          Partially, yes. But &quot;genetic&quot; is doing a lot of work in that
                          question. Let me unpack it.
                        </p>
                        <p>
                          Heritability estimates for major depressive disorder cluster around 35 to
                          40% based on twin studies. That means roughly 35-40% of the variation in
                          who develops depression versus who doesn&apos;t is explained by genetic
                          variation in the population. The remaining 60-65% is environmental:
                          trauma, stress, sleep, social context, medical conditions, life events.
                        </p>
                        <p>
                          What &quot;genetic&quot; doesn&apos;t mean here: there is no
                          &quot;depression gene.&quot; Hundreds, possibly thousands, of variants
                          each contribute a small amount to risk.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="a-block">
                    <div className="a-vote">
                      <button className="a-vote__btn" aria-label="Upvote">
                        <UpvoteIcon />
                      </button>
                      <div className="a-vote__count">
                        734<small>Upvotes</small>
                      </div>
                    </div>
                    <div className="a-body">
                      <div className="persona" data-p="maya">
                        <div className="persona__avatar">MS</div>
                        <div className="persona__info">
                          <div className="persona__name">
                            Maya Subramaniam
                            <span className="persona__verified">
                              <VerifiedIcon />
                            </span>
                          </div>
                          <div className="persona__title">Science journalist</div>
                        </div>
                      </div>
                      <div className="a-text a-text--clamp">
                        <p>One more useful piece of context.</p>
                        <p>
                          The hunt for &quot;depression genes&quot; had a famously rough decade.
                          Several candidate genes that early studies identified (particularly
                          5-HTTLPR, the serotonin transporter variant) failed to replicate in larger
                          studies. The field has shifted from looking for individual genes to
                          looking at the cumulative effect of thousands of small-effect variants,
                          which is what polygenic risk scores try to capture.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="q-card__more">
                    <span className="q-card__answers-pip">
                      <span className="q-card__answers-pip-stack">
                        <span
                          className="q-card__answers-pip-dot"
                          style={{ background: "linear-gradient(135deg, #2F8C5C, #1F6B43)" }}
                        ></span>
                        <span
                          className="q-card__answers-pip-dot"
                          style={{ background: "linear-gradient(135deg, #B66B16, #8B4F0E)" }}
                        ></span>
                      </span>
                      2 answers · 42 follow-ups
                    </span>
                    <a href="#" className="q-card__more-link">
                      Read full thread <ArrowRightIcon />
                    </a>
                  </div>
                </article>

                {/* Q7 — WILD SCIENCE / DOG */}
                <article className="q-card reveal" data-topic="wild">
                  <div className="q-card__head">
                    <span className="q-card__topic">
                      <span className="q-card__topic-dot"></span>Wild science
                    </span>
                    <span className="q-card__meta">
                      Asked by <b>Tanvi L.</b>
                      <span className="q-card__meta-sep"></span>3.6k views
                      <span className="q-card__meta-sep"></span>5 days ago
                    </span>
                  </div>
                  <h3 className="q-card__title">
                    <a href="#">Can my dog be more genetically diverse than I am?</a>
                  </h3>

                  <div className="a-block">
                    <div className="a-vote">
                      <button className="a-vote__btn" aria-label="Upvote">
                        <UpvoteIcon />
                      </button>
                      <div className="a-vote__count">
                        1.4k<small>Upvotes</small>
                      </div>
                    </div>
                    <div className="a-body">
                      <div className="persona" data-p="arjun">
                        <div className="persona__avatar">AM</div>
                        <div className="persona__info">
                          <div className="persona__name">
                            Arjun Mehta
                            <span className="persona__verified">
                              <VerifiedIcon />
                            </span>
                          </div>
                          <div className="persona__title">PhD candidate, population genetics</div>
                        </div>
                      </div>
                      <div className="a-text a-text--clamp">
                        <p>
                          If your dog is a mutt, almost certainly yes. If your dog is a purebred,
                          almost certainly no.
                        </p>
                        <p>
                          Modern dog breeds were created mostly in the 19th and 20th centuries by
                          selecting for a small set of physical traits and aggressively inbreeding
                          to fix them. Many breeds today trace back to fewer than a dozen founder
                          dogs. The genetic diversity within a single breed (say, Cavalier King
                          Charles Spaniels, or German Shepherds) is brutally low. Some breeds carry
                          inbreeding coefficients equivalent to first-cousin marriages, in every
                          individual.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="q-card__more">
                    <span className="q-card__answers-pip">
                      <span className="q-card__answers-pip-stack">
                        <span
                          className="q-card__answers-pip-dot"
                          style={{ background: "linear-gradient(135deg, #6F61E8, #4E40C2)" }}
                        ></span>
                      </span>
                      1 answer · 22 follow-ups
                    </span>
                    <a href="#" className="q-card__more-link">
                      Read full thread <ArrowRightIcon />
                    </a>
                  </div>
                </article>

                {/* Q8 — NPE / SURPRISES */}
                <article className="q-card reveal" data-topic="surprises">
                  <div className="q-card__head">
                    <span className="q-card__topic">
                      <span className="q-card__topic-dot"></span>Genealogy surprises
                    </span>
                    <span className="q-card__meta">
                      Asked by <b>Anonymous</b>
                      <span className="q-card__meta-sep"></span>12.1k views
                      <span className="q-card__meta-sep"></span>4 days ago
                    </span>
                  </div>
                  <h3 className="q-card__title">
                    <a href="#">
                      What do I do if my DNA test reveals my dad isn&apos;t my biological father?
                    </a>
                  </h3>

                  <div className="a-block">
                    <div className="a-vote">
                      <button className="a-vote__btn" aria-label="Upvote">
                        <UpvoteIcon />
                      </button>
                      <div className="a-vote__count">
                        2.1k<small>Upvotes</small>
                      </div>
                    </div>
                    <div className="a-body">
                      <div className="persona" data-p="sunita">
                        <div className="persona__avatar">SR</div>
                        <div className="persona__info">
                          <div className="persona__name">Sunita Rao</div>
                          <div className="persona__title">
                            Genealogy hobbyist · has seen this in community
                          </div>
                        </div>
                      </div>
                      <div className="a-text a-text--clamp">
                        <p>
                          First: I&apos;m sorry. This is one of the heaviest discoveries that comes
                          out of consumer DNA testing, and you are not alone. There is a name for
                          what happens when people find out this way (NPE, &quot;Not Parent
                          Expected&quot;), and there are large support communities online
                          specifically for people in your situation.
                        </p>
                        <p>Practical, in this order:</p>
                        <p>
                          One: confirm. Sometimes the algorithm gets it wrong, especially for
                          distant relative matches. Two: don&apos;t act fast. Three: find your
                          people. Four: therapy is genuinely useful here.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="a-block">
                    <div className="a-vote">
                      <button className="a-vote__btn" aria-label="Upvote">
                        <UpvoteIcon />
                      </button>
                      <div className="a-vote__count">
                        1.1k<small>Upvotes</small>
                      </div>
                    </div>
                    <div className="a-body">
                      <div className="persona" data-p="priya">
                        <div className="persona__avatar">PI</div>
                        <div className="persona__info">
                          <div className="persona__name">
                            Dr. Priya Iyer
                            <span className="persona__verified">
                              <VerifiedIcon />
                            </span>
                          </div>
                          <div className="persona__title">Genetic counsellor</div>
                        </div>
                      </div>
                      <div className="a-text a-text--clamp">
                        <p>
                          Echoing Sunita&apos;s advice. The single most important thing in the first
                          week: do nothing irreversible.
                        </p>
                        <p>
                          I have worked with families on this. The discoveries are real, the
                          feelings are real, but the people involved (your parents, your siblings,
                          your possible biological father, his possible other family) are real too.
                          A few quiet weeks of processing before any conversation tends to lead to
                          better outcomes for everyone, including you.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="q-card__more">
                    <span className="q-card__answers-pip">
                      <span className="q-card__answers-pip-stack">
                        <span
                          className="q-card__answers-pip-dot"
                          style={{ background: "linear-gradient(135deg, #C76842, #9C4A2C)" }}
                        ></span>
                        <span
                          className="q-card__answers-pip-dot"
                          style={{ background: "linear-gradient(135deg, #2F8C5C, #1F6B43)" }}
                        ></span>
                      </span>
                      2 answers · 87 follow-ups
                    </span>
                    <a href="#" className="q-card__more-link">
                      Read full thread <ArrowRightIcon />
                    </a>
                  </div>
                </article>

                {/* Q9 — ARYAN / DRAVIDIAN */}
                <article className="q-card reveal" data-topic="ancestry">
                  <div className="q-card__head">
                    <span className="q-card__topic">
                      <span className="q-card__topic-dot"></span>Ancestry
                    </span>
                    <span className="q-card__meta">
                      Asked by <b>Anonymous</b>
                      <span className="q-card__meta-sep"></span>11.4k views
                      <span className="q-card__meta-sep"></span>5 days ago
                    </span>
                  </div>
                  <h3 className="q-card__title">
                    <a href="#">
                      Are &apos;Aryan&apos; and &apos;Dravidian&apos; real genetic categories or
                      colonial inventions?
                    </a>
                  </h3>

                  <div className="a-block">
                    <div className="a-vote">
                      <button className="a-vote__btn" aria-label="Upvote">
                        <UpvoteIcon />
                      </button>
                      <div className="a-vote__count">
                        2.3k<small>Upvotes</small>
                      </div>
                    </div>
                    <div className="a-body">
                      <div className="persona" data-p="arjun">
                        <div className="persona__avatar">AM</div>
                        <div className="persona__info">
                          <div className="persona__name">
                            Arjun Mehta
                            <span className="persona__verified">
                              <VerifiedIcon />
                            </span>
                          </div>
                          <div className="persona__title">PhD candidate, population genetics</div>
                        </div>
                      </div>
                      <div className="a-text a-text--clamp">
                        <p>
                          Both, sort of. The terms are colonial categories that don&apos;t map
                          cleanly to biology, but they roughly correspond to real ancestral
                          components that population genetics has identified in South Asians.
                        </p>
                        <p>
                          Modern South Asian populations are descended from a mix of several
                          ancestral groups. The two largest contributions, identified through
                          extensive ancient DNA research over the last decade (David Reich&apos;s
                          lab at Harvard has done much of this work), are usually called Ancestral
                          North Indians (ANI) and Ancestral South Indians (ASI).
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="a-block">
                    <div className="a-vote">
                      <button className="a-vote__btn" aria-label="Upvote">
                        <UpvoteIcon />
                      </button>
                      <div className="a-vote__count">
                        612<small>Upvotes</small>
                      </div>
                    </div>
                    <div className="a-body">
                      <div className="persona" data-p="sunita">
                        <div className="persona__avatar">SR</div>
                        <div className="persona__info">
                          <div className="persona__name">Sunita Rao</div>
                          <div className="persona__title">Genealogy hobbyist</div>
                        </div>
                      </div>
                      <div className="a-text a-text--clamp">
                        <p>
                          Arjun&apos;s answer is solid. From a non-scientist perspective: if you
                          upload your DNA to enough services, this is one of the most striking parts
                          of the results. Almost every Indian shows up as a continuous gradient.
                          There is no clean &quot;North Indian&quot; or &quot;South Indian&quot;
                          cluster in the data, more like a smooth spectrum.
                        </p>
                        <p>
                          It is one of those moments when the genetic data quietly contradicts a lot
                          of inherited categories. Worth sitting with.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="q-card__more">
                    <span className="q-card__answers-pip">
                      <span className="q-card__answers-pip-stack">
                        <span
                          className="q-card__answers-pip-dot"
                          style={{ background: "linear-gradient(135deg, #6F61E8, #4E40C2)" }}
                        ></span>
                        <span
                          className="q-card__answers-pip-dot"
                          style={{ background: "linear-gradient(135deg, #C76842, #9C4A2C)" }}
                        ></span>
                      </span>
                      2 answers · 156 follow-ups
                    </span>
                    <a href="#" className="q-card__more-link">
                      Read full thread <ArrowRightIcon />
                    </a>
                  </div>
                </article>
              </div>

              <div className="load-more reveal">
                <button type="button">
                  Load 13 more questions
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
            </div>

            {/* ===================== SIDEBAR ===================== */}
            <aside className="feed__aside">
              {/* Trending this week */}
              <div className="aside-card reveal">
                <div className="aside-card__head">
                  <h4 className="aside-card__title">Trending this week</h4>
                  <span className="aside-card__count">Top 5</span>
                </div>
                <div className="trending-list">
                  <div className="trending-item">
                    <div className="trending-item__num">01</div>
                    <div className="trending-item__body">
                      <div className="trending-item__q">
                        If I take a DNA test, can it incriminate a relative I&apos;ve never met?
                      </div>
                      <div className="trending-item__meta">
                        Ethics<span className="trending-item__meta-dot"></span>7.3k views
                        <span className="trending-item__meta-dot"></span>3 days
                      </div>
                    </div>
                  </div>
                  <div className="trending-item">
                    <div className="trending-item__num">02</div>
                    <div className="trending-item__body">
                      <div className="trending-item__q">
                        Is balding really inherited from the mother&apos;s side?
                      </div>
                      <div className="trending-item__meta">
                        Inheritance<span className="trending-item__meta-dot"></span>5.6k views
                        <span className="trending-item__meta-dot"></span>6 days
                      </div>
                    </div>
                  </div>
                  <div className="trending-item">
                    <div className="trending-item__num">03</div>
                    <div className="trending-item__body">
                      <div className="trending-item__q">
                        My polygenic risk score for type 2 diabetes is in the 95th percentile. Do I
                        need to panic?
                      </div>
                      <div className="trending-item__meta">
                        Got my results<span className="trending-item__meta-dot"></span>4.7k views
                        <span className="trending-item__meta-dot"></span>4 days
                      </div>
                    </div>
                  </div>
                  <div className="trending-item">
                    <div className="trending-item__num">04</div>
                    <div className="trending-item__body">
                      <div className="trending-item__q">
                        Is there really a &apos;warrior gene&apos; that makes people violent?
                      </div>
                      <div className="trending-item__meta">
                        Pop culture<span className="trending-item__meta-dot"></span>6.7k views
                        <span className="trending-item__meta-dot"></span>1 week
                      </div>
                    </div>
                  </div>
                  <div className="trending-item">
                    <div className="trending-item__num">05</div>
                    <div className="trending-item__body">
                      <div className="trending-item__q">
                        Should I get tested for BRCA if no one in my family has had breast cancer?
                      </div>
                      <div className="trending-item__meta">
                        Disease risk<span className="trending-item__meta-dot"></span>5.8k views
                        <span className="trending-item__meta-dot"></span>2 weeks
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contributors */}
              <div className="aside-card reveal">
                <div className="aside-card__head">
                  <h4 className="aside-card__title">Featured voices</h4>
                  <span className="aside-card__count">6 of 280</span>
                </div>
                <div className="contrib-grid">
                  <div className="contrib" data-p="priya">
                    <div className="contrib__avatar">PI</div>
                    <div className="contrib__name">Dr. Priya Iyer</div>
                    <div className="contrib__role">Genetic counsellor</div>
                  </div>
                  <div className="contrib" data-p="arjun">
                    <div className="contrib__avatar">AM</div>
                    <div className="contrib__name">Arjun Mehta</div>
                    <div className="contrib__role">PhD, pop. genetics</div>
                  </div>
                  <div className="contrib" data-p="sunita">
                    <div className="contrib__avatar">SR</div>
                    <div className="contrib__name">Sunita Rao</div>
                    <div className="contrib__role">Genealogy hobbyist</div>
                  </div>
                  <div className="contrib" data-p="ravi">
                    <div className="contrib__avatar">RK</div>
                    <div className="contrib__name">Dr. Ravi Krishnan</div>
                    <div className="contrib__role">Oncologist</div>
                  </div>
                  <div className="contrib" data-p="maya">
                    <div className="contrib__avatar">MS</div>
                    <div className="contrib__name">Maya Subramaniam</div>
                    <div className="contrib__role">Science journalist</div>
                  </div>
                  <div className="contrib" data-p="kabir">
                    <div className="contrib__avatar">KA</div>
                    <div className="contrib__name">Kabir Ahmed</div>
                    <div className="contrib__role">Bioinformatics</div>
                  </div>
                </div>
              </div>

              {/* Info card */}
              <div className="info-card reveal">
                <div className="info-card__inner">
                  <div className="info-card__ico">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 16v-4M12 8h.01" />
                    </svg>
                  </div>
                  <h4 className="info-card__title">A community of curiosity</h4>
                  <p className="info-card__text">
                    A community of people who find genetics interesting and try to explain it well.
                    Free, ad-free, curated for accuracy.
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ============================================================
           FOOTER
           ============================================================ */}
      <footer className="footer">
        <div className="container footer__inner">
          <div className="footer__top">
            <div className="footer__brand-block">
              <div className="footer__brand-row">
                <BrandMark />
                <span className="nav__brand-w">
                  <span
                    style={{
                      fontFamily: "var(--ff-serif)",
                      fontSize: 19,
                      fontWeight: 600,
                    }}
                  >
                    MapMyGenomics
                  </span>
                  <small>A KYG community</small>
                </span>
              </div>
              <p className="footer__mission">
                A community of people who find genetics interesting and try to explain it well.
                Free, ad-free, curated for accuracy.
              </p>
            </div>

            <div className="footer__col">
              <div className="footer__col-title">Explore</div>
              <div className="footer__list">
                <a href="#">All questions</a>
                <a href="#">Topics</a>
                <a href="#">Contributors</a>
                <a href="#">Trending</a>
                <a href="#">Ask a question</a>
              </div>
            </div>

            <div className="footer__col">
              <div className="footer__col-title">About</div>
              <div className="footer__list">
                <a href="#">How this works</a>
                <a href="#">Editorial review</a>
                <a href="#">Become a contributor</a>
                <a href="#">Newsletter</a>
                <a href="#">Press</a>
              </div>
            </div>

            <div className="footer__col">
              <div className="footer__col-title">Family</div>
              <div className="footer__list">
                <a href="#">KnowYourGenes</a>
                <a href="#">MatchGenes</a>
                <a href="#">MapMyGenetic</a>
                <a href="#">Privacy</a>
                <a href="#">Contact</a>
              </div>
            </div>
          </div>

          <div className="footer__bottom">
            <span className="footer__brandline">
              Curated <span>·</span> Reviewed <span>·</span> Free
            </span>
            <span>© 2026 MapMyGenomics. Part of the KYG family.</span>
            <div className="footer__socials">
              <a href="#" aria-label="Twitter">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22 5.8a8.49 8.49 0 0 1-2.36.64 4.13 4.13 0 0 0 1.81-2.27 8.21 8.21 0 0 1-2.61 1 4.1 4.1 0 0 0-7 3.74A11.64 11.64 0 0 1 3.39 4.62a4.16 4.16 0 0 0 1.26 5.46A4.1 4.1 0 0 1 2.8 9.6v.05a4.11 4.11 0 0 0 3.29 4 4.18 4.18 0 0 1-1.85.07A4.11 4.11 0 0 0 8.07 16.5a8.23 8.23 0 0 1-6.07 1.7 11.61 11.61 0 0 0 6.29 1.84A11.61 11.61 0 0 0 20 8.45v-.53A8.27 8.27 0 0 0 22 5.8z" />
                </svg>
              </a>
              <a href="#" aria-label="Instagram">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a href="#" aria-label="Email">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
