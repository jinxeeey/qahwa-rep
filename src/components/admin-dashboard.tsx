"use client";

import Link from "next/link";
import { useMemo, useState, useSyncExternalStore } from "react";
import { QRCodeSVG } from "qrcode.react";
import {
  ArrowLeft, ArrowUpRight, ChartLineUp, Check, Clock, Coffee,
  CurrencyCircleDollar, DownloadSimple, ForkKnife, House, MagnifyingGlass,
  MapPin, Package, Percent, QrCode, Receipt, ShoppingBag, Storefront,
  TrendUp, Users, WarningCircle,
} from "@phosphor-icons/react";
import { formatDzd, menuCategories, menuItems } from "@/lib/data";

type AdminTab = "Overview" | "Orders" | "Menu" | "Inventory" | "Team" | "Guests" | "Finance" | "Insights" | "QR zones";
type OrderState = "New" | "Preparing" | "Ready" | "Complete";

const fallbackOrigin = "https://qahwathecoffee.com";
const subscribeToOrigin = () => () => undefined;

function useBrowserOrigin() {
  return useSyncExternalStore(subscribeToOrigin, () => window.location.origin, () => fallbackOrigin);
}

const tabs: { name: AdminTab; icon: typeof House }[] = [
  { name: "Overview", icon: House }, { name: "Orders", icon: ShoppingBag },
  { name: "Menu", icon: ForkKnife }, { name: "Inventory", icon: Package },
  { name: "Team", icon: Users }, { name: "Guests", icon: Coffee },
  { name: "Finance", icon: CurrencyCircleDollar }, { name: "Insights", icon: ChartLineUp },
  { name: "QR zones", icon: QrCode },
];

const initialOrders = [
  { id: "#1047", guest: "Amel", phone: "Dine in", channel: "Terrace", source: "Zone QR", items: "1 Matcha Latte, 1 Pistachio Cookie", total: 1500, payment: "Card", age: "2 min", promised: "12:42", state: "New" as OrderState, notes: "Oat milk, no syrup" },
  { id: "#1046", guest: "Yacine", phone: "0551 82 40 17", channel: "Pickup", source: "Website", items: "1 Flat White, 1 Chicken Focaccia", total: 1850, payment: "Cash", age: "5 min", promised: "12:38", state: "Preparing" as OrderState, notes: "Call on arrival" },
  { id: "#1045", guest: "Lina", phone: "Dine in", channel: "Indoor", source: "Zone QR", items: "1 Spanish Latte", total: 650, payment: "Card", age: "7 min", promised: "12:34", state: "Ready" as OrderState, notes: "Extra hot" },
  { id: "#1044", guest: "Sofiane", phone: "0662 40 77 91", channel: "Pickup", source: "Website", items: "1 Qahwa Clean, 1 Egg Toast", total: 1900, payment: "Card", age: "14 min", promised: "12:25", state: "Complete" as OrderState, notes: "No cinnamon" },
  { id: "#1043", guest: "Ines", phone: "Dine in", channel: "Counter", source: "Staff POS", items: "2 Hojicha Latte", total: 1800, payment: "Cash", age: "16 min", promised: "12:22", state: "Complete" as OrderState, notes: "One almond milk" },
];

const serviceZones = [
  { name: "Indoor", code: "indoor", detail: "Main room and window seats", scans: 318, conversion: "38%", orders: 121, ticket: "1,440 DZD" },
  { name: "Terrace", code: "terrace", detail: "Outdoor seating area", scans: 246, conversion: "42%", orders: 103, ticket: "1,580 DZD" },
  { name: "Counter", code: "counter", detail: "Walk-in and quick pickup", scans: 184, conversion: "29%", orders: 53, ticket: "1,160 DZD" },
];

export function AdminDashboard() {
  const [active, setActive] = useState<AdminTab>("Overview");
  const [period, setPeriod] = useState("Today");
  const [orders, setOrders] = useState(initialOrders);

  const advanceOrder = (id: string) => {
    const next: Record<OrderState, OrderState> = { New: "Preparing", Preparing: "Ready", Ready: "Complete", Complete: "Complete" };
    setOrders((current) => current.map((order) => order.id === id ? { ...order, state: next[order.state] } : order));
  };

  return (
    <main className="admin-shell">
      <aside className="admin-sidebar">
        <div><Link className="admin-wordmark" href="/">QĀHWA</Link><span>Hydra operations</span></div>
        <nav aria-label="Admin sections">{tabs.map(({ name, icon: Icon }) => <button type="button" className={active === name ? "is-active" : ""} key={name} onClick={() => setActive(name)}><Icon size={18} />{name}</button>)}</nav>
        <div className="admin-sidebar-footer"><Link href="/"><ArrowLeft size={16} /> Back to website</Link><div><span>NB</span><p><strong>Nadia B.</strong><small>Owner view</small></p></div></div>
      </aside>

      <section className="admin-content">
        <header className="admin-topbar">
          <div><span className="admin-demo-label">Demonstration data</span><h1>{active}</h1></div>
          <div className="admin-top-actions"><div className="admin-period" aria-label="Reporting period">{["Today", "Week", "Month"].map((item) => <button type="button" className={period === item ? "is-active" : ""} key={item} onClick={() => setPeriod(item)}>{item}</button>)}</div><div className="admin-date"><Clock size={17} /> Friday, 2 October</div></div>
        </header>

        {active === "Overview" && <Overview orders={orders} period={period} />}
        {active === "Orders" && <OrdersPanel orders={orders} onAdvance={advanceOrder} />}
        {active === "Menu" && <MenuPanel />}
        {active === "Inventory" && <InventoryPanel />}
        {active === "Team" && <TeamPanel />}
        {active === "Guests" && <GuestsPanel />}
        {active === "Finance" && <FinancePanel period={period} />}
        {active === "Insights" && <InsightsPanel />}
        {active === "QR zones" && <QrPanel />}
      </section>
    </main>
  );
}

function Overview({ orders, period }: { orders: typeof initialOrders; period: string }) {
  const salesBars = [36, 48, 43, 62, 58, 74, 88, 71, 96, 81, 102, 89];
  return (
    <div className="admin-view">
      <div className="admin-context"><span>Hydra flagship</span><span>Open now</span><span>{period} view</span><span>Last refreshed 12:26</span></div>
      <section className="metric-grid metric-grid--six">
        <Metric label="Net sales" value="482,500 DZD" change="+8.4% vs prior Friday" /><Metric label="Orders" value="327" change="2.8 items per order" /><Metric label="Average ticket" value="1,476 DZD" change="+110 DZD this week" /><Metric label="Gross margin" value="68.6%" change="After recipe cost" /><Metric label="Labour ratio" value="19.8%" change="Within 18 to 22% target" /><Metric label="Returning guests" value="41.8%" change="Based on loyalty matches" />
      </section>

      <section className="admin-main-grid">
        <article className="admin-panel sales-panel"><div className="panel-heading"><div><h2>Hourly net sales</h2><p>Sample day, 8:00 AM to 8:00 PM</p></div><ChartLineUp size={21} /></div><div className="bar-chart" aria-label="Hourly sales sample bar chart">{salesBars.map((height, index) => <div key={index}><span style={{ height: `${height}px` }} /><small>{index % 2 === 0 ? `${index + 8}:00` : ""}</small></div>)}</div><div className="chart-foot"><span>Lunch peak 12:00 to 14:00</span><strong>96,400 DZD</strong></div></article>
        <article className="admin-panel channel-panel"><div className="panel-heading"><div><h2>Service mix</h2><p>Orders by fulfilment</p></div><Storefront size={21} /></div><div className="donut-wrap"><div className="donut" aria-label="Channel mix: dine in 54 percent, pickup 30 percent, counter 16 percent"><span>327<small>orders</small></span></div><dl><div><dt>Dine in</dt><dd>54%</dd></div><div><dt>Pickup</dt><dd>30%</dd></div><div><dt>Counter</dt><dd>16%</dd></div></dl></div><div className="payment-mix"><span>Card <strong>61%</strong></span><span>Cash <strong>39%</strong></span></div></article>
      </section>

      <section className="admin-lower-grid admin-lower-grid--three">
        <article className="admin-panel"><div className="panel-heading"><div><h2>Live order queue</h2><p>Name, service and promised time</p></div><ShoppingBag size={21} /></div><div className="compact-order-list">{orders.slice(0, 4).map((order) => <div key={order.id}><span className={`status status--${order.state.toLowerCase()}`}>{order.state}</span><p><strong>{order.guest}</strong><small>{order.items}</small></p><span>{order.channel}</span><b>{order.age}</b></div>)}</div></article>
        <article className="admin-panel ranking-panel"><div className="panel-heading"><div><h2>Top items</h2><p>Units and item revenue</p></div><TrendUp size={21} /></div><ol><li><span>Matcha Latte<small>48 sold</small></span><strong>43,200 DZD</strong></li><li><span>Spanish Latte<small>41 sold</small></span><strong>26,650 DZD</strong></li><li><span>Hojicha Latte<small>29 sold</small></span><strong>26,100 DZD</strong></li><li><span>Pistachio Cookie<small>27 sold</small></span><strong>16,200 DZD</strong></li></ol></article>
        <article className="admin-panel stock-panel"><div className="panel-heading"><div><h2>Stock attention</h2><p>Projected from recipe usage</p></div><WarningCircle size={21} /></div><div className="stock-alerts"><div><span>Oat milk</span><strong>11 cartons</strong><small>1.2 days left</small></div><div><span>Ceremonial Uji</span><strong>820 g</strong><small>2.1 days left</small></div><div><span>Chicken portions</span><strong>14 portions</strong><small>Reorder today</small></div></div></article>
      </section>
    </div>
  );
}

function Metric({ label, value, change }: { label: string; value: string; change: string }) {
  return <article className="metric"><span>{label}</span><strong>{value}</strong><small><ArrowUpRight size={13} />{change}</small></article>;
}

function OrdersPanel({ orders, onAdvance }: { orders: typeof initialOrders; onAdvance: (id: string) => void }) {
  const [query, setQuery] = useState("");
  const visible = orders.filter((order) => `${order.id} ${order.guest} ${order.phone} ${order.items}`.toLowerCase().includes(query.toLowerCase()));
  return (
    <div className="admin-view">
      <section className="order-toolbar"><label><MagnifyingGlass size={17} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search order, guest or phone" /></label><div className="admin-filter-row"><button className="is-active" type="button">Live queue</button><button type="button">Scheduled</button><button type="button">Completed</button></div><button type="button"><DownloadSimple size={17} /> Export</button></section>
      <section className="order-summary-strip"><span>Open orders <strong>3</strong></span><span>Median prep <strong>7m 42s</strong></span><span>Late orders <strong>1</strong></span><span>Cancelled <strong>0.9%</strong></span><span>Pickup share <strong>30%</strong></span></section>
      <section className="order-board">{(["New", "Preparing", "Ready", "Complete"] as OrderState[]).map((state) => <div className="order-column" key={state}><div className="order-column-heading"><h2>{state}</h2><span>{visible.filter((order) => order.state === state).length}</span></div>{visible.filter((order) => order.state === state).map((order) => <article className="order-ticket" key={order.id}><div><span>{order.id}</span><b>{order.age}</b></div><h3>{order.guest}</h3><p>{order.items}</p><dl><div><dt>Service</dt><dd>{order.channel}</dd></div><div><dt>Contact</dt><dd>{order.phone}</dd></div><div><dt>Source</dt><dd>{order.source}</dd></div><div><dt>Promised</dt><dd>{order.promised}</dd></div></dl><small>{order.notes}</small><footer><span>{order.payment}</span><strong>{formatDzd(order.total)}</strong></footer>{order.state !== "Complete" && <button type="button" onClick={() => onAdvance(order.id)}>{order.state === "Ready" ? "Complete" : order.state === "Preparing" ? "Mark ready" : "Start order"}</button>}</article>)}</div>)}</section>
    </div>
  );
}

function MenuPanel() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [availability, setAvailability] = useState<Record<string, boolean>>({});
  const visible = useMemo(() => menuItems.filter((item) => (category === "All" || item.category === category) && `${item.name} ${item.description}`.toLowerCase().includes(query.toLowerCase())), [category, query]);
  const marginFor = (price: number) => Math.round(61 + (price % 17));
  return (
    <div className="admin-view">
      <section className="menu-admin-summary"><div><ForkKnife size={20} /><span>Menu items<strong>{menuItems.length}</strong></span></div><div><Check size={20} /><span>Available now<strong>{menuItems.length - Object.values(availability).filter((value) => value === false).length}</strong></span></div><div><Percent size={20} /><span>Average margin<strong>68.6%</strong></span></div><div><Receipt size={20} /><span>Categories<strong>{menuCategories.length - 1}</strong></span></div></section>
      <section className="order-toolbar menu-admin-toolbar"><label><MagnifyingGlass size={17} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search menu item" /></label><select value={category} onChange={(event) => setCategory(event.target.value)}>{menuCategories.map((item) => <option key={item}>{item}</option>)}</select><button type="button">Add menu item</button></section>
      <section className="admin-panel table-panel"><div className="panel-heading"><div><h2>Menu control</h2><p>Pricing, estimated recipe cost, margin and live availability</p></div><span className="admin-demo-label">Sample cost model</span></div><div className="data-table-wrap"><table className="data-table menu-data-table"><thead><tr><th>Item</th><th>Category</th><th>Price</th><th>Est. cost</th><th>Margin</th><th>Sold today</th><th>Availability</th></tr></thead><tbody>{visible.map((item, index) => { const available = availability[item.id] !== false; const margin = marginFor(item.price); const cost = Math.round(item.price * (1 - margin / 100)); return <tr key={item.id}><td><strong>{item.name}</strong><small>{item.description}</small></td><td>{item.category}</td><td>{formatDzd(item.price)}</td><td>{formatDzd(cost)}</td><td>{margin}%</td><td>{(index * 7 + 9) % 49}</td><td><button className={`availability-toggle ${available ? "is-on" : ""}`} type="button" aria-pressed={available} onClick={() => setAvailability((current) => ({ ...current, [item.id]: !available }))}><span />{available ? "Available" : "Paused"}</button></td></tr>; })}</tbody></table></div></section>
    </div>
  );
}

const inventory = [
  ["House espresso", "Atlas Coffee", "8.4 kg", "6 kg", "4.7 days", "3,200 DZD/kg", "Healthy"], ["Daily matcha", "Tea Atelier", "2.6 kg", "1.5 kg", "5.2 days", "13,800 DZD/kg", "Healthy"], ["Ceremonial Uji", "Kyoto Direct", "820 g", "1 kg", "2.1 days", "28,400 DZD/kg", "Low"], ["Single-origin matcha", "Kyoto Direct", "410 g", "300 g", "6.3 days", "39,000 DZD/kg", "Healthy"], ["Oat milk", "Oatly DZ", "11 cartons", "18 cartons", "1.2 days", "520 DZD/unit", "Low"], ["Whole milk", "Local dairy", "28 bottles", "20 bottles", "2.9 days", "170 DZD/unit", "Healthy"], ["Chicken portions", "Fresh Foods", "14", "24", "0.8 days", "290 DZD/unit", "Urgent"], ["Croissants", "In house", "42", "30", "1.6 days", "108 DZD/unit", "Watch"],
];

function InventoryPanel() {
  return <div className="admin-view"><section className="inventory-summary"><div><Package size={22} /><span>Tracked ingredients<strong>68</strong></span></div><div><WarningCircle size={22} /><span>Below par<strong>7</strong></span></div><div><ForkKnife size={22} /><span>Recipe cost average<strong>31.4%</strong></span></div><div><CurrencyCircleDollar size={22} /><span>Stock value<strong>638,400 DZD</strong></span></div></section><section className="admin-panel table-panel"><div className="panel-heading"><div><h2>Inventory and forecast</h2><p>Sample stock calculated from recipes and order volume</p></div><button type="button"><DownloadSimple size={15} /> Export list</button></div><div className="data-table-wrap"><table className="data-table"><thead><tr><th>Ingredient</th><th>Supplier</th><th>On hand</th><th>Par</th><th>Forecast</th><th>Unit cost</th><th>Status</th></tr></thead><tbody>{inventory.map((row) => <tr key={row[0]}>{row.slice(0, 6).map((cell) => <td key={cell}>{cell}</td>)}<td><span className={`stock-state stock-state--${row[6].toLowerCase()}`}>{row[6]}</span></td></tr>)}</tbody></table></div></section><section className="inventory-detail-grid"><article className="admin-panel"><div className="panel-heading"><div><h2>Suggested purchase order</h2><p>Based on par and 7-day forecast</p></div><strong>87,650 DZD</strong></div><ul className="plain-rows"><li><span>Oat milk<small>24 cartons</small></span><strong>12,480 DZD</strong></li><li><span>Ceremonial Uji<small>1.5 kg</small></span><strong>42,600 DZD</strong></li><li><span>Chicken portions<small>36 portions</small></span><strong>10,440 DZD</strong></li><li><span>Packaging<small>2 cases</small></span><strong>22,130 DZD</strong></li></ul><button className="admin-primary" type="button">Create draft order</button></article><article className="admin-panel"><div className="panel-heading"><div><h2>Waste log</h2><p>Today by quantity, value and reason</p></div><strong>3,870 DZD</strong></div><ul className="plain-rows"><li><span>Whole milk<small>Expired</small></span><strong>1.5 L</strong></li><li><span>Croissant<small>End of day</small></span><strong>4 units</strong></li><li><span>Espresso beans<small>Dial-in</small></span><strong>180 g</strong></li></ul><button className="admin-primary admin-primary--ghost" type="button">Add waste entry</button></article></section></div>;
}

function TeamPanel() {
  const [present, setPresent] = useState(["Lamia", "Rayan", "Meriem"]);
  const staff = [["Lamia", "Shift lead", "07:52", "16:00", "4h 18m", "7h 30m", "1,350 DZD"], ["Rayan", "Barista", "07:58", "16:00", "4h 12m", "7h 30m", "1,080 DZD"], ["Meriem", "Kitchen", "08:03", "17:00", "4h 07m", "8h 15m", "1,420 DZD"], ["Walid", "Barista", "12:00", "20:00", "Not checked in", "7h 30m", "1,080 DZD"]];
  return <div className="admin-view"><section className="team-kpis"><Metric label="Present now" value={`${present.length} people`} change="5 scheduled today" /><Metric label="Scheduled hours" value="38h 45m" change="Today across all roles" /><Metric label="Labour cost" value="58,400 DZD" change="19.8% of net sales" /><Metric label="Late starts" value="1" change="8 minutes total" /></section><section className="staff-grid">{staff.map(([name, role, start, end, elapsed, scheduled, cost]) => { const isPresent = present.includes(name); const displayedElapsed = isPresent && elapsed === "Not checked in" ? "Just now" : elapsed; return <article className="staff-card" key={name}><div className="staff-avatar">{name.slice(0, 2).toUpperCase()}</div><div><h3>{name}</h3><p>{role}</p></div><dl><div><dt>Shift</dt><dd>{start} to {end}</dd></div><div><dt>Worked</dt><dd>{displayedElapsed}</dd></div><div><dt>Scheduled</dt><dd>{scheduled}</dd></div><div><dt>Est. cost</dt><dd>{cost}</dd></div></dl><button type="button" className={isPresent ? "staff-present" : ""} onClick={() => setPresent((current) => isPresent ? current.filter((item) => item !== name) : [...current, name])}>{isPresent ? <><Check size={15} /> Present</> : "Check in"}</button></article>; })}</section><section className="admin-panel rota-table"><div className="panel-heading"><div><h2>Weekly rota</h2><p>Scheduled versus actual attendance</p></div><button type="button">Publish rota</button></div><div className="data-table-wrap"><table className="data-table"><thead><tr><th>Day</th><th>Open</th><th>Close</th><th>Scheduled hours</th><th>Actual hours</th><th>Variance</th><th>Labour cost</th></tr></thead><tbody>{[["Mon","4","3","41h","39h 48m","-1h 12m","56,200 DZD"],["Tue","4","4","44h","44h 35m","+35m","61,450 DZD"],["Wed","5","4","49h","48h 42m","-18m","67,800 DZD"],["Thu","5","4","52h","51h 55m","-5m","72,100 DZD"],["Fri","5","5","55h","In progress","","78,600 DZD"]].map((row) => <tr key={row[0]}>{row.map((cell) => <td key={cell}>{cell}</td>)}</tr>)}</tbody></table></div></section><section className="admin-panel attendance-note"><Clock size={22} /><div><h2>Attendance approach</h2><p>Use a staff PIN or device check-in at the counter. Track scheduled time, actual time, breaks and approved edits without invasive location tracking.</p></div></section></div>;
}

function GuestsPanel() {
  const guests = [["Nadia B.", "23", "18,750 DZD", "Matcha Latte", "Hydra", "Dine in", "2 days", "Gold"], ["Selma K.", "17", "14,200 DZD", "Flat White", "El Biar", "Pickup", "4 days", "Gold"], ["Amine R.", "14", "12,850 DZD", "Spanish Latte", "Hydra", "Dine in", "12 days", "Regular"], ["Lina M.", "12", "9,600 DZD", "Strawberry Matcha", "Ben Aknoun", "Pickup", "2 days", "Regular"], ["Yasmine A.", "8", "7,450 DZD", "Hojicha Latte", "Dely Brahim", "Pickup", "24 days", "At risk"]];
  return <div className="admin-view"><section className="guest-insights"><article><span>Active members</span><strong>1,842</strong><p>At least one order in 90 days</p></article><article><span>30-day repeat rate</span><strong>41.8%</strong><p>Guests who returned within 30 days</p></article><article><span>Average frequency</span><strong>2.7 orders</strong><p>Per active guest each month</p></article><article><span>Loyalty liability</span><strong>186,200 DZD</strong><p>Estimated value of unredeemed points</p></article></section><section className="admin-panel table-panel"><div className="panel-heading"><div><h2>Guest frequency and value</h2><p>Sample loyalty profiles, never payment details</p></div><button type="button"><DownloadSimple size={15} /> Export guests</button></div><div className="data-table-wrap"><table className="data-table"><thead><tr><th>Guest</th><th>Orders</th><th>Spend</th><th>Favourite</th><th>Area</th><th>Mode</th><th>Last visit</th><th>Segment</th></tr></thead><tbody>{guests.map((guest) => <tr key={guest[0]}>{guest.map((cell) => <td key={cell}>{cell}</td>)}</tr>)}</tbody></table></div></section><section className="admin-lower-grid"><article className="admin-panel segmentation-panel"><div><h2>Useful segments</h2><p>Groups that can support relevant, permission-based offers.</p></div><div><span>Morning regulars<br /><strong>284</strong></span><span>Matcha explorers<br /><strong>418</strong></span><span>At risk<br /><strong>96</strong></span></div></article><article className="admin-panel"><div className="panel-heading"><div><h2>Loyalty activity</h2><p>Points earned and redeemed today</p></div><Coffee size={20} /></div><ul className="plain-rows"><li><span>Points issued</span><strong>12,840</strong></li><li><span>Rewards redeemed</span><strong>47</strong></li><li><span>Reward orders</span><strong>8.1%</strong></li></ul></article></section></div>;
}

function FinancePanel({ period }: { period: string }) {
  const rows = [["Gross sales", "497,800 DZD", "100.0%"], ["Discounts", "-9,200 DZD", "-1.8%"], ["Refunds", "-6,100 DZD", "-1.2%"], ["Net sales", "482,500 DZD", "96.9%"], ["Cost of goods", "-151,505 DZD", "-31.4%"], ["Gross profit", "330,995 DZD", "68.6%"], ["Labour", "-95,535 DZD", "-19.8%"], ["Operating expenses", "-67,800 DZD", "-14.1%"], ["Estimated operating profit", "167,660 DZD", "34.7%"]];
  return <div className="admin-view"><section className="metric-grid"><Metric label={`${period} net sales`} value="482,500 DZD" change="+8.4% comparison" /><Metric label="Gross profit" value="330,995 DZD" change="68.6% margin" /><Metric label="Estimated profit" value="167,660 DZD" change="Before tax and owner draw" /><Metric label="Cash to reconcile" value="188,175 DZD" change="39% of payments" /></section><section className="finance-grid"><article className="admin-panel finance-statement"><div className="panel-heading"><div><h2>Management profit view</h2><p>Sample only, not an accounting statement</p></div><Receipt size={21} /></div><div>{rows.map((row, index) => <p className={index === 3 || index === 5 || index === 8 ? "is-total" : ""} key={row[0]}><span>{row[0]}<small>{row[2]}</small></span><strong>{row[1]}</strong></p>)}</div></article><article className="admin-panel"><div className="panel-heading"><div><h2>Payment reconciliation</h2><p>Expected versus recorded settlement</p></div><CurrencyCircleDollar size={21} /></div><ul className="plain-rows"><li><span>Card terminal<small>199 transactions</small></span><strong>294,325 DZD</strong></li><li><span>Cash drawer<small>128 transactions</small></span><strong>188,175 DZD</strong></li><li><span>Expected total</span><strong>482,500 DZD</strong></li><li><span>Recorded variance</span><strong>0 DZD</strong></li></ul><button className="admin-primary" type="button">Start daily close</button></article></section><section className="admin-panel table-panel"><div className="panel-heading"><div><h2>Recent daily closes</h2><p>Sales, cash variance, approvals and close time</p></div><button type="button"><DownloadSimple size={15} /> Export CSV</button></div><div className="data-table-wrap"><table className="data-table"><thead><tr><th>Date</th><th>Net sales</th><th>Cash expected</th><th>Cash counted</th><th>Variance</th><th>Closed by</th><th>Time</th></tr></thead><tbody>{[["1 Oct","451,300 DZD","173,000 DZD","172,800 DZD","-200 DZD","Lamia","20:42"],["30 Sep","428,900 DZD","160,450 DZD","160,450 DZD","0 DZD","Nadia","20:31"],["29 Sep","466,750 DZD","181,200 DZD","181,500 DZD","+300 DZD","Lamia","20:47"]].map((row) => <tr key={row[0]}>{row.map((cell) => <td key={cell}>{cell}</td>)}</tr>)}</tbody></table></div></section></div>;
}

function InsightsPanel() {
  return <div className="admin-view"><section className="insight-banner"><div><span className="admin-demo-label">Sample insight</span><h2>Hojicha is creating a new afternoon occasion.</h2><p>Demo sales show 62% of hojicha orders after 3 PM, with a 19% attachment rate for bakery items.</p></div><TrendUp size={40} /></section><section className="insight-grid"><article className="admin-panel"><div className="panel-heading"><div><h2>Category mix</h2><p>Share of item revenue</p></div></div><div className="progress-list">{[["Matcha","31%"],["Classics","24%"],["Signature","18%"],["Food","17%"],["Hojicha","10%"]].map(([label, value]) => <p key={label}><span>{label}</span><i><b style={{ width: value }} /></i><strong>{value}</strong></p>)}</div></article><article className="admin-panel"><div className="panel-heading"><div><h2>Matcha grade selection</h2><p>Choice within matcha orders</p></div></div><div className="donut-wrap compact-donut"><div className="grade-donut"><span>96<small>orders</small></span></div><dl><div><dt>Daily</dt><dd>67%</dd></div><div><dt>Ceremonial Uji</dt><dd>25%</dd></div><div><dt>Single-origin</dt><dd>8%</dd></div></dl></div></article><article className="admin-panel"><div className="panel-heading"><div><h2>Dayparts</h2><p>Revenue and order behaviour</p></div></div><ul className="plain-rows"><li><span>Morning<small>08:00 to 11:00</small></span><strong>28%</strong></li><li><span>Lunch<small>11:00 to 15:00</small></span><strong>37%</strong></li><li><span>Afternoon<small>15:00 to 18:00</small></span><strong>26%</strong></li><li><span>Evening<small>18:00 to 20:00</small></span><strong>9%</strong></li></ul></article><article className="admin-panel"><div className="panel-heading"><div><h2>Pickup areas</h2><p>Self-reported district at checkout</p></div><MapPin size={20} /></div><ul className="plain-rows"><li><span>Hydra</span><strong>38%</strong></li><li><span>El Biar</span><strong>21%</strong></li><li><span>Ben Aknoun</span><strong>17%</strong></li><li><span>Dely Brahim</span><strong>11%</strong></li><li><span>Other</span><strong>13%</strong></li></ul></article></section><section className="admin-panel table-panel"><div className="panel-heading"><div><h2>Product performance</h2><p>Units, revenue, attachment and contribution margin</p></div></div><div className="data-table-wrap"><table className="data-table"><thead><tr><th>Item</th><th>Units</th><th>Revenue</th><th>Food attach</th><th>Repeat rate</th><th>Contribution margin</th></tr></thead><tbody>{[["Matcha Latte","48","43,200 DZD","21%","38%","29,376 DZD"],["Spanish Latte","41","26,650 DZD","18%","46%","19,188 DZD"],["Hojicha Latte","29","26,100 DZD","19%","31%","18,792 DZD"],["Pistachio Cookie","27","16,200 DZD","","22%","10,044 DZD"],["Chicken Focaccia","19","22,800 DZD","","17%","12,996 DZD"]].map((row) => <tr key={row[0]}>{row.map((cell) => <td key={cell}>{cell}</td>)}</tr>)}</tbody></table></div></section></div>;
}

function QrPanel() {
  const origin = useBrowserOrigin();
  return <div className="admin-view"><section className="qr-explainer admin-panel"><div><QrCode size={28} /><div><h2>Zone QR codes solve movable tables.</h2><p>Attach each code to a service area, not a table. The guest adds a name, and the order receives a number. Staff can still locate or call the guest when furniture moves.</p></div></div><span>Recommended setup</span></section><section className="qr-summary-strip"><span>Total scans <strong>748</strong></span><span>Menu opens <strong>691</strong></span><span>Orders <strong>277</strong></span><span>Conversion <strong>37.0%</strong></span><span>Revenue <strong>414,500 DZD</strong></span></section><section className="qr-grid">{serviceZones.map((zone) => { const value = `${origin}/menu?zone=${zone.code}&service=dine-in`; return <article className="qr-card" key={zone.code}><div className="qr-frame"><QRCodeSVG value={value} size={184} level="M" bgColor="#f8f8f6" fgColor="#18201b" /></div><h3>{zone.name}</h3><p>{zone.detail}</p><code>{zone.code.toUpperCase()}</code><dl><div><dt>Scans</dt><dd>{zone.scans}</dd></div><div><dt>Conversion</dt><dd>{zone.conversion}</dd></div><div><dt>Orders</dt><dd>{zone.orders}</dd></div><div><dt>Avg. ticket</dt><dd>{zone.ticket}</dd></div></dl><div className="qr-card-actions"><button type="button">Print card</button><button type="button">Rotate code</button></div></article>; })}</section><section className="admin-panel qr-rules"><h2>Launch rules</h2><div><p><strong>Use guest name plus order number.</strong><br />This is more resilient than table numbers.</p><p><strong>Keep table codes optional.</strong><br />Add them only for fixed banquettes or private rooms.</p><p><strong>Regenerate compromised codes.</strong><br />Each zone token can be rotated without changing the public menu.</p></div></section></div>;
}
