"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { MagnifyingGlass, MapPin, Plus, SlidersHorizontal, X } from "@phosphor-icons/react";
import { useCart } from "@/components/cart-provider";
import { formatDzd, menuItems, type MenuItem } from "@/lib/data";

const categories = ["All", "Matcha", "Coffee", "Fresh", "Brunch", "Dessert"];

export function MenuExperience({ initialCategory, zone, service }: { initialCategory?: string; zone?: string; service?: string }) {
  const [category, setCategory] = useState(categories.includes(initialCategory ?? "") ? initialCategory! : "All");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<MenuItem | null>(null);

  const filtered = useMemo(() => menuItems.filter((item) => {
    const categoryMatch = category === "All" || item.category === category;
    const searchMatch = `${item.name} ${item.description}`.toLowerCase().includes(query.toLowerCase());
    return categoryMatch && searchMatch;
  }), [category, query]);

  const zoneLabel = zone ? zone.charAt(0).toUpperCase() + zone.slice(1) : null;
  const serviceLabel = service === "pickup" ? "Pickup" : service === "delivery" ? "Delivery" : "Dine in";

  return (
    <main className="menu-page page-with-header">
      <section className="menu-intro section-shell">
        <div>
          <span className="micro-label">{serviceLabel}</span>
          <h1>Our menu</h1>
          <p>Made daily in Hydra. Personalise your drink, then add a name for the order.</p>
        </div>
        {zoneLabel && (
          <div className="scan-context">
            <MapPin size={20} />
            <div><strong>{zoneLabel} zone</strong><span>Your order is linked to this area, not a movable table.</span></div>
          </div>
        )}
      </section>

      <section className="menu-controls section-shell" aria-label="Menu filters">
        <label className="search-field">
          <span className="sr-only">Search the menu</span>
          <MagnifyingGlass size={19} />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search drinks and food" />
        </label>
        <div className="category-scroll">
          {categories.map((item) => (
            <button key={item} type="button" className={category === item ? "is-active" : ""} onClick={() => setCategory(item)}>{item}</button>
          ))}
        </div>
      </section>

      <section className="menu-results section-shell">
        <div className="results-heading"><span>{filtered.length} items</span><span><SlidersHorizontal size={17} /> Available now</span></div>
        {filtered.length ? (
          <div className="menu-grid">
            {filtered.map((item, index) => (
              <article className={`menu-card ${index === 0 ? "menu-card--featured" : ""}`} key={item.id}>
                <button type="button" className="menu-card-image" onClick={() => setSelected(item)} aria-label={`Customise ${item.name}`}>
                  <Image src={item.image} alt={item.name} fill priority={index === 0} sizes="(max-width: 760px) 50vw, 28vw" />
                  {item.featured && <span>QAHWA pick</span>}
                </button>
                <div className="menu-card-copy">
                  <div><h2>{item.name}</h2><p>{item.description}</p></div>
                  <div><strong>{formatDzd(item.price)}</strong><button type="button" aria-label={`Add ${item.name}`} onClick={() => setSelected(item)}><Plus size={18} /></button></div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="empty-results"><h2>No matches yet.</h2><p>Try another search or return to all categories.</p><button className="primary-button" type="button" onClick={() => { setCategory("All"); setQuery(""); }}>Show all</button></div>
        )}
      </section>

      {selected && <ProductDialog item={selected} onClose={() => setSelected(null)} />}
    </main>
  );
}

function ProductDialog({ item, onClose }: { item: MenuItem; onClose: () => void }) {
  const { addLine } = useCart();
  const [temperature, setTemperature] = useState("Iced");
  const [milk, setMilk] = useState("Whole milk");
  const [grade, setGrade] = useState("Daily");

  const gradePrice = grade === "Ceremonial Uji" ? 350 : grade === "Single-origin Japan" ? 650 : 0;
  const price = item.price + (item.matcha ? gradePrice : 0);
  const options = item.category === "Coffee" || item.matcha
    ? `${temperature}, ${milk}${item.matcha ? `, ${grade}` : ""}`
    : "Standard preparation";

  const add = () => {
    addLine({ id: item.id, name: item.name, price, options });
    onClose();
  };

  return (
    <div className="modal-layer" role="dialog" aria-modal="true" aria-labelledby="product-title">
      <button className="modal-scrim" aria-label="Close product" onClick={onClose} />
      <section className="product-dialog">
        <button className="icon-button product-close" type="button" aria-label="Close product" onClick={onClose}><X size={22} /></button>
        <div className="product-dialog-image"><Image src={item.image} alt={item.name} fill sizes="(max-width: 760px) 100vw, 48vw" /></div>
        <div className="product-dialog-copy">
          <div><span className="micro-label">{item.category}</span><h2 id="product-title">{item.name}</h2><p>{item.description}</p></div>

          {(item.category === "Coffee" || item.matcha) && (
            <div className="option-group"><h3>Preparation</h3><div className="choice-grid">{["Hot", "Iced"].map((choice) => <button type="button" className={temperature === choice ? "is-active" : ""} key={choice} onClick={() => setTemperature(choice)}>{choice}</button>)}</div></div>
          )}
          {(item.category === "Coffee" || item.matcha) && (
            <div className="option-group"><h3>Milk</h3><div className="choice-grid choice-grid--three">{["Whole milk", "Oat", "Almond"].map((choice) => <button type="button" className={milk === choice ? "is-active" : ""} key={choice} onClick={() => setMilk(choice)}>{choice}</button>)}</div></div>
          )}
          {item.matcha && (
            <div className="option-group">
              <h3>Matcha powder</h3>
              <div className="grade-choices">
                {[{ name: "Daily", detail: "Balanced and smooth", price: "Included" }, { name: "Ceremonial Uji", detail: "Umami-rich, Japan", price: "+350 DZD" }, { name: "Single-origin Japan", detail: "Rare micro-lot", price: "+650 DZD" }].map((choice) => (
                  <button type="button" className={grade === choice.name ? "is-active" : ""} key={choice.name} onClick={() => setGrade(choice.name)}><span><strong>{choice.name}</strong><small>{choice.detail}</small></span><b>{choice.price}</b></button>
                ))}
              </div>
            </div>
          )}
          <button className="primary-button add-order-button" type="button" onClick={add}><span>Add to order</span><strong>{formatDzd(price)}</strong></button>
        </div>
      </section>
    </div>
  );
}
