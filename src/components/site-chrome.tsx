"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { List, ShoppingBag, X } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { useCart } from "@/components/cart-provider";
import { CartDrawer } from "@/components/cart-drawer";

const navItems = [
  ["Shop", "/shop"],
  ["Our Menu", "/menu"],
  ["Delivery", "/menu?service=delivery"],
  ["Locations", "/#location"],
  ["About", "/loyalty"],
  ["Contact", "mailto:hello@qahwathecoffee.com"],
];

function SiteFooter() {
  return (
    <footer className="reference-footer">
      <div>
        <nav aria-label="Legal links">
          <span>Legal Notice</span><span>Shipping Policy</span><span>Terms &amp; Conditions</span><span>Privacy Policy</span>
        </nav>
        <div>
          <nav aria-label="Social links">
            <a href="https://instagram.com/qahwathecoffee" target="_blank" rel="noreferrer">Instagram</a>
            <span>TikTok</span>
          </nav>
          <span>© Qahwa 2026</span>
        </div>
      </div>
    </footer>
  );
}

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { count, setDrawerOpen } = useCart();

  useEffect(() => {
    const updateHeader = () => setScrolled(window.scrollY > 48);
    const frame = window.requestAnimationFrame(updateHeader);
    window.addEventListener("scroll", updateHeader, { passive: true });
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateHeader);
    };
  }, []);

  if (pathname.startsWith("/admin")) return <>{children}</>;

  const overlay = pathname === "/";

  return (
    <>
      <header className={`site-header ${overlay ? "site-header--overlay" : ""} ${overlay && scrolled ? "site-header--solid" : ""}`}>
        <button className="icon-button mobile-menu-button" type="button" aria-label="Open menu" onClick={() => setMenuOpen(true)}>
          <List size={20} weight="light" />
        </button>
        <Link className="wordmark" href="/" aria-label="QAHWA home">QAHWA</Link>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map(([label, href]) => <Link key={label} href={href}>{label}</Link>)}
        </nav>
        <div className="header-actions">
          <div className="header-switch" role="group" aria-label="Language"><button type="button" className="is-active">EN</button><button type="button">FR</button></div>
          <div className="header-switch" role="group" aria-label="Currency"><button type="button" className="is-active">DZD</button><button type="button">EUR</button></div>
          <Link className="account-link" href="/loyalty">Account</Link>
          <button className="icon-button cart-button" type="button" aria-label={`Open cart with ${count} items`} onClick={() => setDrawerOpen(true)}>
            <ShoppingBag size={20} weight="light" />
            {count > 0 && <span>{count}</span>}
          </button>
        </div>
      </header>

      {menuOpen && (
        <div className="mobile-menu" role="dialog" aria-modal="true" aria-label="Navigation menu">
          <div className="mobile-menu-top">
            <span className="wordmark">QAHWA</span>
            <button className="icon-button" type="button" aria-label="Close menu" onClick={() => setMenuOpen(false)}><X size={22} weight="light" /></button>
          </div>
          <nav>
            {navItems.map(([label, href]) => <Link key={label} href={href} onClick={() => setMenuOpen(false)}>{label}</Link>)}
            <Link href="/admin" onClick={() => setMenuOpen(false)}>Admin demo</Link>
          </nav>
        </div>
      )}

      {children}
      <SiteFooter />
      <CartDrawer />
    </>
  );
}
