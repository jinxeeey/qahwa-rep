"use client";

import Link from "next/link";
import { useState, useSyncExternalStore } from "react";
import { QRCodeSVG } from "qrcode.react";
import {
  ArrowLeft,
  ArrowUpRight,
  ChartLineUp,
  Check,
  Clock,
  Coffee,
  ForkKnife,
  House,
  Package,
  QrCode,
  ShoppingBag,
  Storefront,
  Users,
  WarningCircle,
} from "@phosphor-icons/react";

type AdminTab = "Overview" | "Orders" | "Inventory" | "Team" | "Guests" | "QR access";
type OrderState = "New" | "Preparing" | "Ready" | "Complete";

const fallbackOrigin = "https://qahwathecoffee.com";
const subscribeToOrigin = () => () => undefined;

function useBrowserOrigin() {
  return useSyncExternalStore(subscribeToOrigin, () => window.location.origin, () => fallbackOrigin);
}

const tabs: { name: AdminTab; icon: typeof House }[] = [
  { name: "Overview", icon: House },
  { name: "Orders", icon: ShoppingBag },
  { name: "Inventory", icon: Package },
  { name: "Team", icon: Users },
  { name: "Guests", icon: Coffee },
  { name: "QR access", icon: QrCode },
];

const initialOrders = [
  { id: "#1047", guest: "Amel", channel: "Terrace", items: "Matcha Latte, Madeleine", total: "1,350 DZD", age: "2 min", state: "New" as OrderState },
  { id: "#1046", guest: "Yacine", channel: "Pickup", items: "Flat White, Salmon Croissant", total: "2,650 DZD", age: "5 min", state: "Preparing" as OrderState },
  { id: "#1045", guest: "Lina", channel: "Indoor", items: "Spanish Latte", total: "600 DZD", age: "7 min", state: "Ready" as OrderState },
  { id: "#1044", guest: "Sofiane", channel: "Delivery", items: "Qahwa Clean, Egg Toast", total: "2,200 DZD", age: "14 min", state: "Complete" as OrderState },
];

const serviceZones = [
  { name: "Indoor", code: "indoor", detail: "Main room and window seats" },
  { name: "Terrace", code: "terrace", detail: "Outdoor seating area" },
  { name: "Counter", code: "counter", detail: "Walk-in and quick pickup" },
];

export function AdminDashboard() {
  const [active, setActive] = useState<AdminTab>("Overview");
  const [orders, setOrders] = useState(initialOrders);

  const advanceOrder = (id: string) => {
    const next: Record<OrderState, OrderState> = { New: "Preparing", Preparing: "Ready", Ready: "Complete", Complete: "Complete" };
    setOrders((current) => current.map((order) => order.id === id ? { ...order, state: next[order.state] } : order));
  };

  return (
    <main className="admin-shell">
      <aside className="admin-sidebar">
        <div>
          <Link className="admin-wordmark" href="/">QĀHWA</Link>
          <span>Hydra operations</span>
        </div>
        <nav aria-label="Admin sections">
          {tabs.map(({ name, icon: Icon }) => (
            <button type="button" className={active === name ? "is-active" : ""} key={name} onClick={() => setActive(name)}><Icon size={18} />{name}</button>
          ))}
        </nav>
        <div className="admin-sidebar-footer">
          <Link href="/"><ArrowLeft size={16} /> Back to website</Link>
          <div><span>NB</span><p><strong>Nadia B.</strong><small>Owner view</small></p></div>
        </div>
      </aside>

      <section className="admin-content">
        <header className="admin-topbar">
          <div><span className="admin-demo-label">Demonstration data</span><h1>{active}</h1></div>
          <div className="admin-date"><Clock size={17} /> Thursday, 1 October</div>
        </header>

        {active === "Overview" && <Overview orders={orders} />}
        {active === "Orders" && <OrdersPanel orders={orders} onAdvance={advanceOrder} />}
        {active === "Inventory" && <InventoryPanel />}
        {active === "Team" && <TeamPanel />}
        {active === "Guests" && <GuestsPanel />}
        {active === "QR access" && <QrPanel />}
      </section>
    </main>
  );
}

function Overview({ orders }: { orders: typeof initialOrders }) {
  const salesBars = [46, 58, 43, 72, 66, 84, 91, 78, 98, 86, 103, 94];
  return (
    <div className="admin-view">
      <section className="metric-grid">
        <Metric label="Sample sales today" value="482,500 DZD" change="+8.4% vs prior Thursday" />
        <Metric label="Orders" value="327" change="2.8 items per order" />
        <Metric label="Average ticket" value="1,476 DZD" change="+110 DZD this week" />
        <Metric label="Returning guests" value="41.8%" change="Based on loyalty matches" />
      </section>

      <section className="admin-main-grid">
        <article className="admin-panel sales-panel">
          <div className="panel-heading"><div><h2>Hourly sales</h2><p>Sample day, 8:00 AM to 8:00 PM</p></div><ChartLineUp size={21} /></div>
          <div className="bar-chart" aria-label="Hourly sales sample bar chart">
            {salesBars.map((height, index) => <div key={index}><span style={{ height: `${height}px` }} /><small>{index % 2 === 0 ? `${index + 8}:00` : ""}</small></div>)}
          </div>
        </article>
        <article className="admin-panel channel-panel">
          <div className="panel-heading"><div><h2>Order channels</h2><p>Sample mix today</p></div><Storefront size={21} /></div>
          <div className="donut-wrap">
            <div className="donut" aria-label="Channel mix: in store 54 percent, pickup 24 percent, delivery 22 percent"><span>327<small>orders</small></span></div>
            <dl><div><dt>In store</dt><dd>54%</dd></div><div><dt>Pickup</dt><dd>24%</dd></div><div><dt>Delivery</dt><dd>22%</dd></div></dl>
          </div>
        </article>
      </section>

      <section className="admin-lower-grid">
        <article className="admin-panel">
          <div className="panel-heading"><div><h2>Live order queue</h2><p>Guest name plus service zone</p></div><ShoppingBag size={21} /></div>
          <div className="compact-order-list">{orders.slice(0, 3).map((order) => <div key={order.id}><span className={`status status--${order.state.toLowerCase()}`}>{order.state}</span><p><strong>{order.guest}</strong><small>{order.items}</small></p><span>{order.channel}</span><b>{order.age}</b></div>)}</div>
        </article>
        <article className="admin-panel stock-panel">
          <div className="panel-heading"><div><h2>Stock attention</h2><p>Projected from recipe usage</p></div><WarningCircle size={21} /></div>
          <div className="stock-alerts"><div><span>Oat milk</span><strong>11 cartons</strong><small>1.2 days left</small></div><div><span>Ceremonial Uji</span><strong>820 g</strong><small>2.1 days left</small></div><div><span>Salmon</span><strong>14 portions</strong><small>Reorder today</small></div></div>
        </article>
      </section>
    </div>
  );
}

function Metric({ label, value, change }: { label: string; value: string; change: string }) {
  return <article className="metric"><span>{label}</span><strong>{value}</strong><small><ArrowUpRight size={13} />{change}</small></article>;
}

function OrdersPanel({ orders, onAdvance }: { orders: typeof initialOrders; onAdvance: (id: string) => void }) {
  return (
    <div className="admin-view">
      <div className="admin-filter-row"><button className="is-active" type="button">Live queue</button><button type="button">Scheduled</button><button type="button">Completed</button></div>
      <section className="order-board">
        {(["New", "Preparing", "Ready", "Complete"] as OrderState[]).map((state) => (
          <div className="order-column" key={state}>
            <div className="order-column-heading"><h2>{state}</h2><span>{orders.filter((order) => order.state === state).length}</span></div>
            {orders.filter((order) => order.state === state).map((order) => (
              <article className="order-ticket" key={order.id}>
                <div><span>{order.id}</span><b>{order.age}</b></div>
                <h3>{order.guest}</h3><p>{order.items}</p>
                <footer><span>{order.channel}</span><strong>{order.total}</strong></footer>
                {order.state !== "Complete" && <button type="button" onClick={() => onAdvance(order.id)}>{order.state === "Ready" ? "Complete" : order.state === "Preparing" ? "Mark ready" : "Start order"}</button>}
              </article>
            ))}
          </div>
        ))}
      </section>
    </div>
  );
}

const inventory = [
  ["House espresso", "8.4 kg", "6 kg", "4.7 days", "Healthy"],
  ["Daily matcha", "2.6 kg", "1.5 kg", "5.2 days", "Healthy"],
  ["Ceremonial Uji", "820 g", "1 kg", "2.1 days", "Low"],
  ["Single-origin matcha", "410 g", "300 g", "6.3 days", "Healthy"],
  ["Oat milk", "11 cartons", "18 cartons", "1.2 days", "Low"],
  ["Whole milk", "28 bottles", "20 bottles", "2.9 days", "Healthy"],
  ["Salmon portions", "14", "24", "0.8 days", "Urgent"],
  ["Croissants", "42", "30", "1.6 days", "Watch"],
];

function InventoryPanel() {
  return (
    <div className="admin-view">
      <section className="inventory-summary"><div><Package size={22} /><span>Tracked ingredients<strong>68</strong></span></div><div><WarningCircle size={22} /><span>Below par<strong>7</strong></span></div><div><ForkKnife size={22} /><span>Recipe cost average<strong>31.4%</strong></span></div></section>
      <section className="admin-panel table-panel">
        <div className="panel-heading"><div><h2>Inventory and forecast</h2><p>Sample stock calculated from recipes and order volume</p></div><button type="button">Export list</button></div>
        <div className="data-table-wrap"><table className="data-table"><thead><tr><th>Ingredient</th><th>On hand</th><th>Par level</th><th>Forecast</th><th>Status</th></tr></thead><tbody>{inventory.map((row) => <tr key={row[0]}>{row.slice(0, 4).map((cell) => <td key={cell}>{cell}</td>)}<td><span className={`stock-state stock-state--${row[4].toLowerCase()}`}>{row[4]}</span></td></tr>)}</tbody></table></div>
      </section>
      <section className="admin-panel waste-panel"><div><h2>Waste log</h2><p>Capture quantity, reason and staff member to separate spoilage from recipe variance.</p></div><button className="admin-primary" type="button">Add waste entry</button></section>
    </div>
  );
}

function TeamPanel() {
  const [present, setPresent] = useState(["Lamia", "Rayan", "Meriem"]);
  const staff = [
    ["Lamia", "Shift lead", "07:52", "4h 18m"],
    ["Rayan", "Barista", "07:58", "4h 12m"],
    ["Meriem", "Kitchen", "08:03", "4h 07m"],
    ["Walid", "Barista", "12:00", "Not checked in"],
  ];
  return (
    <div className="admin-view">
      <section className="team-hero admin-panel"><div><h2>{present.length} people present</h2><p>52.4 scheduled hours this week. Sample rota only.</p></div><button className="admin-primary" type="button">Publish rota</button></section>
      <section className="staff-grid">{staff.map(([name, role, start, elapsed]) => { const isPresent = present.includes(name); const displayedElapsed = isPresent && elapsed === "Not checked in" ? "Just now" : elapsed; return <article className="staff-card" key={name}><div className="staff-avatar">{name.slice(0, 2).toUpperCase()}</div><div><h3>{name}</h3><p>{role}</p></div><dl><div><dt>Start</dt><dd>{start}</dd></div><div><dt>Today</dt><dd>{displayedElapsed}</dd></div></dl><button type="button" className={isPresent ? "staff-present" : ""} onClick={() => setPresent((current) => isPresent ? current.filter((item) => item !== name) : [...current, name])}>{isPresent ? <><Check size={15} /> Present</> : "Check in"}</button></article>; })}</section>
      <section className="admin-panel attendance-note"><Clock size={22} /><div><h2>Attendance approach</h2><p>Use a staff PIN or device check-in at the counter. Track scheduled time, actual time, breaks and approved edits without using invasive location tracking.</p></div></section>
    </div>
  );
}

function GuestsPanel() {
  const guests = [["Nadia B.", "23", "18,750 DZD", "Matcha Latte", "9 days"], ["Selma K.", "17", "14,200 DZD", "Flat White", "4 days"], ["Amine R.", "14", "12,850 DZD", "Spanish Latte", "12 days"], ["Lina M.", "12", "9,600 DZD", "Strawberry Matcha", "2 days"]];
  return (
    <div className="admin-view">
      <section className="guest-insights"><article><span>Sample active members</span><strong>1,842</strong><p>Guests with at least one order in 90 days</p></article><article><span>30-day repeat rate</span><strong>41.8%</strong><p>Useful for measuring loyalty value</p></article><article><span>Top preference</span><strong>Iced matcha</strong><p>32.6% of saved favourites</p></article></section>
      <section className="admin-panel table-panel"><div className="panel-heading"><div><h2>Guest frequency</h2><p>Sample loyalty profiles, never payment details</p></div></div><div className="data-table-wrap"><table className="data-table"><thead><tr><th>Guest</th><th>Orders</th><th>Spend</th><th>Favourite</th><th>Since last visit</th></tr></thead><tbody>{guests.map((guest) => <tr key={guest[0]}>{guest.map((cell) => <td key={cell}>{cell}</td>)}</tr>)}</tbody></table></div></section>
      <section className="admin-panel segmentation-panel"><div><h2>Useful segments</h2><p>Regular morning guests, matcha explorers, at-risk regulars and merchandise buyers.</p></div><div><span>Morning regulars<br /><strong>284</strong></span><span>Matcha explorers<br /><strong>418</strong></span><span>At risk<br /><strong>96</strong></span></div></section>
    </div>
  );
}

function QrPanel() {
  const origin = useBrowserOrigin();
  return (
    <div className="admin-view">
      <section className="qr-explainer admin-panel"><div><QrCode size={28} /><div><h2>Zone QR codes solve movable tables.</h2><p>Attach each code to a service area, not a table. The guest adds a name, and the order receives a number. Staff can still locate or call the guest when furniture moves.</p></div></div><span>Recommended setup</span></section>
      <section className="qr-grid">{serviceZones.map((zone) => { const value = `${origin}/menu?zone=${zone.code}&service=dine-in`; return <article className="qr-card" key={zone.code}><div className="qr-frame"><QRCodeSVG value={value} size={184} level="M" bgColor="#f8f8f6" fgColor="#18201b" /></div><h3>{zone.name}</h3><p>{zone.detail}</p><code>{zone.code.toUpperCase()}</code><button type="button">Download print card</button></article>; })}</section>
      <section className="admin-panel qr-rules"><h2>Launch rules</h2><div><p><strong>Use guest name plus order number.</strong><br />This is more resilient than table numbers.</p><p><strong>Keep table codes optional.</strong><br />Add them only for fixed banquettes or private rooms.</p><p><strong>Regenerate compromised codes.</strong><br />Each zone token can be rotated without changing the public menu.</p></div></section>
    </div>
  );
}
