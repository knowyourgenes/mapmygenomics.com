"use client";

import { useState } from "react";
import { ArrowRightIcon } from "./Icons";

export default function HowItWorksSection() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  return (
    <section className="how" id="how">
      <div className="container">
        <div className="how__inner">
          <div className="how__head reveal is-in">
            <span className="eyebrow">How this works</span>
            <h2 className="how__title">
              Three rules,{" "}
              <em style={{ fontStyle: "italic", color: "var(--ink-3)", fontWeight: 400 }}>
                kept simple.
              </em>
            </h2>
            <p className="how__sub">
              MapMyGenomics is curated by the community, not by an algorithm. Here is the agreement
              we make with everyone who reads, asks, or answers.
            </p>
          </div>

          <div className="how__rules reveal is-in">
            <div className="rule">
              <div className="rule__num">01</div>
              <div className="rule__text">
                <b>Anyone can ask.</b> We curate which questions to surface to the homepage based on
                how useful the answer is likely to be to other readers.
              </div>
            </div>
            <div className="rule">
              <div className="rule__num">02</div>
              <div className="rule__text">
                <b>Anyone can answer.</b> We verify contributor credentials when they claim a
                professional title.
              </div>
            </div>
            <div className="rule">
              <div className="rule__num">03</div>
              <div className="rule__text">
                <b>We don&apos;t sell anything.</b> No products, no tests, no affiliate links. The
                site exists because the questions are interesting.
              </div>
            </div>
          </div>

          <div className="how__cta reveal is-in">
            <div className="how__cta-copy">
              <h3 className="how__cta-title">Want to answer?</h3>
              <p className="how__cta-sub">
                Drop your email and we&apos;ll verify your background. Researchers, clinicians,
                genetic counsellors, and credentialled hobbyists are all welcome — we approve
                contributors based on qualifications and a short writing sample.
              </p>
            </div>
            <form
              className="how__cta-form"
              onSubmit={(e) => {
                e.preventDefault();
                if (!email.trim()) return;
                setSent(true);
                setEmail("");
                window.setTimeout(() => setSent(false), 3000);
              }}
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@domain.com"
                aria-label="Your email address"
                required
              />
              <button type="submit">
                {sent ? "Sent ✓" : "Apply"}
                <ArrowRightIcon className="ico" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
