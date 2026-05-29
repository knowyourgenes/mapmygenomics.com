"use client";

import { useState } from "react";
import { ArrowRightIcon } from "./Icons";

export default function AskCard() {
  const [question, setQuestion] = useState("");
  const [sent, setSent] = useState(false);
  return (
    <div className="inline-card reveal is-in" id="ask">
      <div className="inline-card__inner">
        <div className="inline-card__text">
          <div className="inline-card__eyebrow">Ask the community</div>
          <h3 className="inline-card__title">Got a genetics question on your mind?</h3>
          <p className="inline-card__sub">
            Drop it below — our researchers, clinicians, genetic counsellors and curious readers
            will take a look. The most useful questions get answered and surfaced on the homepage.
          </p>
        </div>
        <form
          className="inline-card__form"
          onSubmit={(e) => {
            e.preventDefault();
            if (!question.trim()) return;
            setSent(true);
            setQuestion("");
            window.setTimeout(() => setSent(false), 3000);
          }}
        >
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Type your question…"
            aria-label="Your question"
          />
          <button type="submit">
            {sent ? "Sent ✓" : "Send"}
            <ArrowRightIcon className="ico" />
          </button>
        </form>
      </div>
    </div>
  );
}

export function AskStrip() {
  return (
    <section className="newsletter-strip" id="ask-section">
      <div className="container">
        <AskCard />
      </div>
    </section>
  );
}
