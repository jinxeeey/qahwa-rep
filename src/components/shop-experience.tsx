"use client";

import Image from "next/image";
import { Plus } from "@phosphor-icons/react";
import { useCart } from "@/components/cart-provider";
import { formatDzd, merchItems } from "@/lib/data";

export function ShopExperience() {
  const { addLine } = useCart();

  return (
    <main className="shop-page page-with-header">
      <section className="shop-intro section-shell">
        <span className="micro-label">QAHWA goods</span>
        <h1>Objects for the daily ritual.</h1>
        <p>Cups, coffee and matcha tools selected for home, work and gifting.</p>
      </section>
      <section className="shop-grid section-shell">
        {merchItems.map((item, index) => (
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
