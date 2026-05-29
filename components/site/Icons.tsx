export const ArrowRightIcon = ({ className }: { className?: string }) => (
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

export const SearchIcon = () => (
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
);

export const BrandMark = () => (
  <span className="nav__mark">
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img src="/favicon.svg" alt="MapMyGenomics" width={22} height={22} />
  </span>
);
