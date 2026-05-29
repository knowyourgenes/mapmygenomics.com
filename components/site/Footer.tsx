import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__bottom">
          <span>© 2026 MapMyGenomics.</span>
          <div className="footer__socials">
            <Link href="#" aria-label="Twitter">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M22 5.8a8.49 8.49 0 0 1-2.36.64 4.13 4.13 0 0 0 1.81-2.27 8.21 8.21 0 0 1-2.61 1 4.1 4.1 0 0 0-7 3.74A11.64 11.64 0 0 1 3.39 4.62a4.16 4.16 0 0 0 1.26 5.46A4.1 4.1 0 0 1 2.8 9.6v.05a4.11 4.11 0 0 0 3.29 4 4.18 4.18 0 0 1-1.85.07A4.11 4.11 0 0 0 8.07 16.5a8.23 8.23 0 0 1-6.07 1.7 11.61 11.61 0 0 0 6.29 1.84A11.61 11.61 0 0 0 20 8.45v-.53A8.27 8.27 0 0 0 22 5.8z" />
              </svg>
            </Link>
            <Link href="#" aria-label="Instagram">
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
            </Link>
            <Link href="#" aria-label="Email">
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
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
