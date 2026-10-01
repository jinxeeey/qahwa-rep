"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { List, ShoppingBag, X } from "@phosphor-icons/react";
import { useState } from "react";
import { useCart } from "@/components/cart-provider";
import { CartDrawer } from "@/components/cart-drawer";

const navItems = [
  ["Menu", "/menu"],
  ["Shop", "/shop"],
  ["Loyalty", "/loyalty"],
  ["Locations", "/#location"],
  ["About", "/#story"],
];

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const { count, setDrawerOpen } = useCart();

  if (pathname.startsWith("/admin")) return <>{children}</>;

  const overlay = pathname === "/";

  return (
    <>
      <header className={`site-header ${overlay ? "site-header--overlay" : ""}`}>
        <Link className="wordmark" href="/" aria-label="QAHWA home">QĀHWA</Link>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
        </nav>
        <div className="header-actions">
          <Link className="order-link" href="/menu">Order</Link>
          <button className="icon-button cart-button" type="button" aria-label={`Open cart with ${count} items`} onClick={() => setDrawerOpen(true)}>
            <ShoppingBag size={20} weight="regular" />
            {count > 0 && <span>{count}</span>}
          </button>
          <button className="icon-button mobile-menu-button" type="button" aria-label="Open menu" onClick={() => setMenuOpen(true)}>
            <List size={22} />
          </button>
        </div>
      </header>

      {menuOpen && (
        <div className="mobile-menu" role="dialog" aria-modal="true" aria-label="Navigation menu">
          <button className="icon-button" type="button" aria-label="Close menu" onClick={() => setMenuOpen(false)}><X size={24} /></button>
          <nav>
            {navItems.map(([label, href]) => <Link key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</Link>)}
            <Link href="/admin" onClick={() => setMenuOpen(false)}>Admin demo</Link>
          </nav>
        </div>
      )}

      {children}
      <CartDrawer />
    </>
  );
}
