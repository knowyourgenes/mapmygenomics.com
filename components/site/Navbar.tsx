"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRightIcon, BrandMark, SearchIcon } from "./Icons";

type ControlledProps = {
  variant: "home";
  search: string;
  setSearch: (s: string) => void;
  onSearchFocus?: () => void;
  questionsCount: number;
};

type SubpageProps = {
  variant: "subpage";
  questionsCount: number;
};

type NavbarProps = ControlledProps | SubpageProps;

export default function Navbar(props: NavbarProps) {
  const router = useRouter();
  const navRef = useRef<HTMLElement | null>(null);
  const mobileInputRef = useRef<HTMLInputElement | null>(null);

  // Local search state for subpage variant; navigates to "/" with ?q= on submit.
  const [localSearch, setLocalSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  // Toggle .is-scrolled
  useEffect(() => {
    const onScroll = () => {
      const nav = navRef.current;
      if (!nav) return;
      if (window.scrollY > 12) nav.classList.add("is-scrolled");
      else nav.classList.remove("is-scrolled");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile menu is open and close on Escape.
  useEffect(() => {
    if (!menuOpen) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  // Focus the mobile search input when it opens.
  useEffect(() => {
    if (mobileSearchOpen) mobileInputRef.current?.focus();
  }, [mobileSearchOpen]);

  const search = props.variant === "home" ? props.search : localSearch;
  const setSearch = props.variant === "home" ? props.setSearch : setLocalSearch;
  const placeholder = `Search ${props.questionsCount}+ questions…`;

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (props.variant === "subpage" && search.trim()) {
      router.push(`/?q=${encodeURIComponent(search.trim())}#feed`);
    }
    setMobileSearchOpen(false);
    setMenuOpen(false);
  };

  return (
    <header className="nav" id="nav" ref={navRef}>
      <div className="container nav__inner">
        <Link href="/" className="nav__brand" onClick={() => setMenuOpen(false)}>
          <BrandMark />
          <span className="nav__brand-w">
            <span>MapMyGenomics</span>
            <small>A KYG community</small>
          </span>
        </Link>

        {/* Desktop search (≥ 768px) */}
        <form className="nav__search nav__search--desktop" onSubmit={onSubmit}>
          <SearchIcon />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onFocus={() => {
              if (props.variant === "home") props.onSearchFocus?.();
            }}
            placeholder={placeholder}
            aria-label="Search questions"
          />
          {search ? (
            <button
              type="button"
              className="nav__search-clear"
              onClick={() => setSearch("")}
              aria-label="Clear search"
            >
              ×
            </button>
          ) : null}
        </form>

        {/* Desktop CTA (≥ 768px) */}
        <Link
          href={props.variant === "home" ? "#how" : "/#how"}
          className="nav__cta-btn nav__cta-btn--desktop"
        >
          Become a contributor
          <ArrowRightIcon className="ico" />
        </Link>

        {/* Mobile actions (< 768px) */}
        <div className="nav__mobile-actions">
          <button
            type="button"
            className="nav__icon-btn"
            aria-label="Search"
            aria-expanded={mobileSearchOpen}
            onClick={() => {
              setMobileSearchOpen((v) => !v);
              setMenuOpen(false);
            }}
          >
            <SearchIcon />
          </button>
          <button
            type="button"
            className={`nav__icon-btn nav__menu-toggle ${menuOpen ? "is-open" : ""}`}
            aria-label="Menu"
            aria-expanded={menuOpen}
            onClick={() => {
              setMenuOpen((v) => !v);
              setMobileSearchOpen(false);
            }}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      {/* Mobile expanded search drawer */}
      {mobileSearchOpen ? (
        <div className="nav__mobile-search">
          <div className="container">
            <form className="nav__search" onSubmit={onSubmit}>
              <SearchIcon />
              <input
                ref={mobileInputRef}
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onFocus={() => {
                  if (props.variant === "home") props.onSearchFocus?.();
                }}
                placeholder={placeholder}
                aria-label="Search questions"
              />
              {search ? (
                <button
                  type="button"
                  className="nav__search-clear"
                  onClick={() => setSearch("")}
                  aria-label="Clear search"
                >
                  ×
                </button>
              ) : null}
            </form>
          </div>
        </div>
      ) : null}

      {/* Mobile menu drawer */}
      {menuOpen ? (
        <div className="nav__menu" role="dialog" aria-modal="true">
          <div className="container">
            <Link
              href={props.variant === "home" ? "#how" : "/#how"}
              className="nav__cta-btn"
              onClick={() => setMenuOpen(false)}
            >
              Become a contributor
              <ArrowRightIcon className="ico" />
            </Link>
            <div className="nav__menu-links">
              <Link href="/" onClick={() => setMenuOpen(false)}>
                All questions
              </Link>
              <Link
                href={props.variant === "home" ? "#feed" : "/#feed"}
                onClick={() => setMenuOpen(false)}
              >
                Trending
              </Link>
              <Link
                href={props.variant === "home" ? "#ask" : "/#ask"}
                onClick={() => setMenuOpen(false)}
              >
                Ask a question
              </Link>
              <Link
                href={props.variant === "home" ? "#how" : "/#how"}
                onClick={() => setMenuOpen(false)}
              >
                How this works
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
