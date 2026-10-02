import Image from "next/image";
import Link from "next/link";
import { formatDzd, menuItems, merchItems } from "@/lib/data";

const latestArrivals = [
  { ...merchItems[2], name: "Casbah", price: 2900 },
  { ...menuItems[3], name: "Sirocco", price: 3190 },
  { ...merchItems[0], name: "Médina", price: 3480 },
  { ...menuItems[0], name: "Tassili", price: 2900 },
  { ...menuItems[1], name: "Atlas", price: 3190 },
  { ...merchItems[3], name: "Souk Box", price: 13050 },
  { ...menuItems[6], name: "Menthe", price: 2610 },
  { ...menuItems[2], name: "Karkadeh", price: 2900 },
  { ...merchItems[0], name: "Bottle", price: 5075 },
];

export default function Home() {
  return (
    <main className="home-page">
      <section className="home-hero" aria-label="QAHWA in Hydra">
        <div className="hero-slides" aria-hidden="true">
          <Image className="hero-slide hero-slide--one" src="/images/qahwa-cup.png" alt="" fill priority sizes="100vw" />
          <Image className="hero-slide hero-slide--two" src="/images/qahwa-paper.png" alt="" fill loading="eager" sizes="100vw" />
          <Image className="hero-slide hero-slide--three" src="/images/qahwa-drink.png" alt="" fill loading="eager" sizes="100vw" />
          <Image className="hero-slide hero-slide--four" src="/images/qahwa-ice.png" alt="" fill loading="eager" sizes="100vw" />
        </div>
        <span className="hero-scrim" aria-hidden="true" />
        <span className="hero-texture" aria-hidden="true" />
        <a className="scroll-cue" href="#arrivals">scroll down</a>
      </section>

      <section className="reference-section" id="arrivals">
        <h1 className="reference-kicker">Latest Arrivals</h1>
        <div className="arrival-grid">
          {latestArrivals.map((item, index) => (
            <Link className="arrival-card" href={index === 5 ? "/shop" : "/menu"} key={`${item.name}-${index}`}>
              <div className="arrival-image">
                <Image src={item.image} alt={item.name} fill priority={index < 3} sizes="(max-width: 680px) 50vw, 33vw" />
              </div>
              <div className="arrival-copy">
                <h2>{item.name}</h2>
                <p>{formatDzd(item.price)}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="reference-section locations-reference" id="location">
        <h2 className="reference-kicker">Locations</h2>
        <div className="location-grid">
          <a className="location-card" href="https://www.google.com/maps/place/Qahwa+The+Coffee/" target="_blank" rel="noreferrer">
            <div className="location-card-image">
              <Image src="/images/hydra-location.png" alt="QAHWA Hydra entrance" fill sizes="(max-width: 760px) 100vw, 50vw" />
            </div>
            <div className="location-card-copy">
              <span>Shop 1</span>
              <h3>Hydra</h3>
              <p>Rue Mohamed BAG, Hydra 16000, Algiers</p>
            </div>
          </a>
          <article className="location-card location-card--soon">
            <div className="coming-soon"><span>Coming Soon</span></div>
            <div className="location-card-copy">
              <span>Shop 2</span>
              <h3>Opening November 2026</h3>
              <p>A second QAHWA ritual is on the way.</p>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
