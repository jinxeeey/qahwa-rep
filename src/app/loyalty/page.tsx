import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Coffee, Gift, Star } from "@phosphor-icons/react/dist/ssr";

export const metadata: Metadata = {
  title: "QAHWA Circle",
  description: "A loyalty concept for regular QAHWA guests.",
};

export default function LoyaltyPage() {
  return (
    <main className="loyalty-page page-with-header">
      <section className="loyalty-hero section-shell">
        <div>
          <span className="micro-label">Proposed loyalty program</span>
          <h1>QAHWA Circle</h1>
          <p>Earn on every visit, keep your favourites close, and receive rewards that feel worth returning for.</p>
          <Link className="primary-button inline-button" href="/menu">Start an order</Link>
        </div>
        <div className="loyalty-pass" aria-label="Example QAHWA Circle membership card">
          <span>QĀHWA</span>
          <div><strong>740</strong><small>points</small></div>
          <p>Nadia B.</p>
        </div>
      </section>

      <section className="loyalty-rules section-shell">
        <div><Coffee size={26} /><h2>Simple earning</h2><p>One point for every 100 DZD spent in store or online.</p></div>
        <div><Gift size={26} /><h2>Useful rewards</h2><p>Redeem drinks, matcha upgrades, pastries and member-only goods.</p></div>
        <div><Star size={26} /><h2>Known preferences</h2><p>Save your milk, temperature and favourite matcha grade for faster ordering.</p></div>
      </section>

      <section className="loyalty-tiers section-shell">
        <h2>A program that grows with the guest.</h2>
        <div className="tier-list">
          <article><span>One</span><h3>First 500 points</h3><p>Birthday treat, saved favourites and order history.</p></article>
          <article><span>Daily</span><h3>500 to 1,499 points</h3><p>Faster rewards and one complimentary matcha upgrade each month.</p></article>
          <article><span>Ritual</span><h3>1,500+ points</h3><p>Early product drops, tasting invitations and priority support.</p></article>
        </div>
        <Link className="text-link" href="/menu">See what is available <ArrowRight size={16} /></Link>
      </section>
    </main>
  );
}
