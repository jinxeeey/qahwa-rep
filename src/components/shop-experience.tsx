"use client";

import Image from "next/image";
import { Plus } from "@phosphor-icons/react";
import { useMemo, useState } from "react";
import { useCart } from "@/components/cart-provider";
import { formatDzd, merchItems } from "@/lib/data";

export function ShopExperience() {
  const { addLine } = useCart();
  const [sort, setSort] = useState("newest");
  const sortedItems = useMemo(() => [...merchItems].sort((a, b) => {
    if (sort === "price-asc") return a.price - b.price;
    if (sort === "price-desc") return b.price - a.price;
    if (sort === "name") return a.name.localeCompare(b.name);
    return 0;
  }), [sort]);

  return (
    <main className="shop-page page-with-header">
      <section className="shop-intro section-shell">
        <span className="micro-label">QAHWA goods</span>
        <h1>Our Collection</h1>
        <p>From the high altitudes of East Africa to the lush farms of Central America. Roasted with precision in Algiers.</p>
      </section>
      <section className="collection-controls section-shell" aria-label="Collection controls">
        <span>All</span>
        <label>Sort
          <select value={sort} onChange={(event) => setSort(event.target.value)}>
            <option value="newest">Newest</option>
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
            <option value="name">Name: A to Z</option>
          </select>
        </label>
      </section>
      <section className="shop-grid section-shell">
        {sortedItems.map((item, index) => (
          <article className={`shop-product shop-product--${index + 1}`} key={item.id}>
            <div className="shop-product-image"><Image src={item.image} alt={item.name} fill priority={index === 0} sizes="(max-width: 760px) 100vw, 50vw" /></div>
            <div className="shop-product-copy">
              <div><h2>{item.name}</h2><p>{item.note}</p><strong>{formatDzd(item.price)}</strong></div>
              <button type="button" aria-label={`Add ${item.name} to order`} onClick={() => addLine({ id: item.id, name: item.name, price: item.price, options: item.note })}><Plus size={20} /></button>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
