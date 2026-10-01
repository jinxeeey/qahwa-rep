import Link from "next/link";

export default function NotFound() {
  return (
    <main className="page-with-header error-page">
      <span className="micro-label">404</span>
      <h1>This page is not on the menu.</h1>
      <p>Return to the current QAHWA selection.</p>
      <Link className="primary-button" href="/menu">Open menu</Link>
    </main>
  );
}
