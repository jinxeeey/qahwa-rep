"use client";

import { useState } from "react";
import { CheckCircle, Minus, Plus, ShoppingBagOpen, X } from "@phosphor-icons/react";
import { useCart } from "@/components/cart-provider";
import { formatDzd } from "@/lib/data";

export function CartDrawer() {
  const { lines, total, drawerOpen, setDrawerOpen, updateQuantity, removeLine, clearCart } = useCart();
  const [name, setName] = useState("");
  const [service, setService] = useState<"dine-in" | "pickup">("dine-in");
  const [error, setError] = useState("");
  const [orderNumber, setOrderNumber] = useState<number | null>(null);

  const placeOrder = () => {
    if (!name.trim()) {
      setError("Add the guest name so the team can call the order.");
      return;
    }
    setError("");
    setOrderNumber(37);
    clearCart();
  };

  const close = () => {
    setDrawerOpen(false);
    setOrderNumber(null);
  };

  return (
    <div className={`drawer-layer ${drawerOpen ? "drawer-layer--open" : ""}`} aria-hidden={!drawerOpen}>
      <button className="drawer-scrim" aria-label="Close cart" onClick={close} tabIndex={drawerOpen ? 0 : -1} />
      <aside className="cart-drawer" aria-label="Your order">
        <div className="drawer-header">
          <div><span className="micro-label">Your order</span><h2>{lines.length ? `${lines.length} selection${lines.length > 1 ? "s" : ""}` : "Cart"}</h2></div>
          <button className="icon-button" type="button" aria-label="Close cart" onClick={close}><X size={22} /></button>
        </div>

        {orderNumber ? (
          <div className="order-success">
            <CheckCircle size={42} weight="thin" />
            <h3>Thank you, {name.trim()}.</h3>
            <p>Your order number is <strong>{orderNumber}</strong>. We will call your name when it is ready.</p>
            <button className="primary-button" type="button" onClick={close}>Done</button>
          </div>
        ) : lines.length === 0 ? (
          <div className="cart-empty">
            <ShoppingBagOpen size={42} weight="thin" />
            <h3>Your order is empty.</h3>
            <p>Choose a drink or something from the kitchen.</p>
            <button className="primary-button" type="button" onClick={close}>Browse menu</button>
          </div>
        ) : (
          <>
            <div className="cart-lines">
              {lines.map((line) => (
                <article className="cart-line" key={line.key}>
                  <div>
                    <h3>{line.name}</h3>
                    {line.options && <p>{line.options}</p>}
                    <strong>{formatDzd(line.price)}</strong>
                  </div>
                  <div className="line-actions">
                    <button type="button" aria-label={`Reduce ${line.name}`} onClick={() => updateQuantity(line.key, line.quantity - 1)}><Minus size={14} /></button>
                    <span>{line.quantity}</span>
                    <button type="button" aria-label={`Add another ${line.name}`} onClick={() => updateQuantity(line.key, line.quantity + 1)}><Plus size={14} /></button>
                    <button className="remove-line" type="button" onClick={() => removeLine(line.key)}>Remove</button>
                  </div>
                </article>
              ))}
            </div>

            <div className="checkout-form">
              <fieldset className="segmented-control">
                <legend>Service mode</legend>
                <button type="button" className={service === "dine-in" ? "is-active" : ""} onClick={() => setService("dine-in")}>Dine in</button>
                <button type="button" className={service === "pickup" ? "is-active" : ""} onClick={() => setService("pickup")}>Pickup</button>
              </fieldset>
              <label htmlFor="guest-name">Name for the order</label>
              <input id="guest-name" value={name} onChange={(event) => setName(event.target.value)} placeholder="For example, Amel" />
              <small>Used only to identify this order at the counter.</small>
              {error && <p className="form-error">{error}</p>}
              <div className="checkout-total"><span>Total</span><strong>{formatDzd(total)}</strong></div>
              <button className="primary-button" type="button" onClick={placeOrder}>Place demo order</button>
              <p className="demo-note">Prototype only. No payment is processed.</p>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
