"use client";

export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <main className="page-with-header error-page">
      <span className="micro-label">Something changed</span>
      <h1>We could not load this page.</h1>
      <p>Try again. Your current selections are still in this browser.</p>
      <button className="primary-button" type="button" onClick={reset}>Try again</button>
    </main>
  );
}
