import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container">
      <div className="thread__notfound">
        <h1>Thread not found</h1>
        <p>This question doesn&apos;t exist or has been removed.</p>
        <Link href="/" className="thread__back">
          Back to all questions
        </Link>
      </div>
    </div>
  );
}
