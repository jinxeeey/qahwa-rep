import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, MapPin, QrCode } from "@phosphor-icons/react/dist/ssr";
import { formatDzd, merchItems } from "@/lib/data";

export default function Home() {
  return (
    <main>
      <section className="home-hero" aria-labelledby="home-title">
        <div className="hero-slides" aria-hidden="true">
          <Image className="hero-slide hero-slide--one" src="/images/qahwa-cup.png" alt="" fill priority sizes="100vw" />
          <Image className="hero-slide hero-slide--two" src="/images/qahwa-paper.png" alt="" fill loading="eager" sizes="100vw" />
          <Image className="hero-slide hero-slide--three" src="/images/qahwa-drink.png" alt="" fill loading="eager" sizes="100vw" />
          <Image className="hero-slide hero-slide--four" src="/images/qahwa-ice.png" alt="" fill loading="eager" sizes="100vw" />
        </div>
        <div className="hero-scrim" />
        <div className="hero-copy">
          <span className="hero-eyebrow">Hydra, Algiers</span>
          <h1 id="home-title">QAHWA is one.</h1>
          <p>Coffee, matcha and food made for the day, ordered your way.</p>
          <div className="hero-actions">
            <Link className="light-button" href="/menu">Order now</Link>
            <Link className="text-link text-link--light" href="#location">Find us <ArrowRight size={16} /></Link>
          </div>
        </div>
      </section>

      <section className="order-paths section-shell" id="story">
        <div className="section-heading">
          <h2>One menu. Three ways to enjoy it.</h2>
          <p>Start from your phone, choose how you want it, and we will take care of the rest.</p>
        </div>
        <div className="order-grid">
          <Link className="order-card order-card--large" href="/menu?zone=terrace&service=dine-in">
            <Image src="/images/qahwa-paper.png" alt="A QAHWA drink served in the coffee shop" fill sizes="(max-width: 760px) 100vw, 65vw" />
            <span className="order-card-scrim" />
            <div><QrCode size={24} /><h3>Dine in</h3><p>Scan by zone, add your name, and order without fixing tables in place.</p></div>
          </Link>
          <div className="order-card-stack">
            <Link className="order-card order-card--plain" href="/menu?service=pickup">
              <div><Clock size={24} /><h3>Pick up</h3><p>Order ahead and collect at the Hydra counter.</p></div>
              <ArrowRight size={20} />
            </Link>
            <Link className="order-card order-card--accent" href="/menu?service=delivery">
              <div><MapPin size={24} /><h3>Delivery</h3><p>Enter your address and see the available delivery zone.</p></div>
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      <section className="matcha-story section-shell">
        <div className="matcha-image">
          <Image src="/images/matcha-grades.png" alt="Three grades of matcha powder with an iced matcha drink" fill sizes="(max-width: 760px) 100vw, 58vw" />
        </div>
        <div className="matcha-copy">
          <h2>Choose your matcha.</h2>
          <p>Every matcha drink can start with a daily grade, ceremonial Uji, or a rare single-origin Japanese powder.</p>
          <div className="grade-list">
            <div><span>Daily</span><strong>Included</strong></div>
            <div><span>Ceremonial Uji</span><strong>+350 DZD</strong></div>
            <div><span>Single-origin Japan</span><strong>+650 DZD</strong></div>
          </div>
          <Link className="primary-button inline-button" href="/menu?category=Matcha">Build a matcha</Link>
        </div>
      </section>

      <section className="merch-preview section-shell">
        <div className="section-heading">
          <span className="micro-label">QAHWA goods</span>
          <h2>Take the ritual home.</h2>
        </div>
        <div className="merch-row">
          {merchItems.slice(0, 3).map((item, index) => (
            <Link className={`merch-tile merch-tile--${index + 1}`} href="/shop" key={item.id}>
              <div className="merch-image"><Image src={item.image} alt={item.name} fill sizes="(max-width: 760px) 80vw, 33vw" /></div>
              <div><h3>{item.name}</h3><p>{item.note}</p><strong>{formatDzd(item.price)}</strong></div>
            </Link>
          ))}
        </div>
        <Link className="text-link" href="/shop">Shop all goods <ArrowRight size={16} /></Link>
      </section>

      <section className="location-section section-shell" id="location">
        <div className="location-photo">
          <Image src="/images/hydra-location.png" alt="Entrance of QAHWA in Hydra, Algiers" fill sizes="(max-width: 760px) 100vw, 50vw" />
        </div>
        <div className="location-copy">
          <h2>Hydra</h2>
          <p>Rue Mohamed BAG<br />Hydra 16000, Algiers</p>
          <dl>
            <div><dt>Monday to Friday</dt><dd>8:00 AM - 8:00 PM</dd></div>
            <div><dt>Saturday and Sunday</dt><dd>9:00 AM - 9:00 PM</dd></div>
          </dl>
          <a className="primary-button inline-button" href="https://www.google.com/maps/place/Qahwa+The+Coffee/" target="_blank" rel="noreferrer">Open in Maps</a>
        </div>
      </section>

      <footer className="site-footer section-shell">
        <Link className="wordmark" href="/">QĀHWA</Link>
        <div><Link href="/menu">Menu</Link><Link href="/shop">Shop</Link><Link href="/loyalty">Loyalty</Link><Link href="/admin">Admin demo</Link></div>
        <p>Hydra, Algiers<br />© QAHWA 2026</p>
      </footer>
    </main>
  );
}
