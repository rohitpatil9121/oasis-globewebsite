// Single source of truth for business facts on the site.
// Charges and warranty are NOT here — they come live from the dashboard
// (Settings) through /api/public/config, see src/lib/config.js.
// `confirmed: false` on an item means the owner has not verified it yet.

// Root-relative paths must carry Astro's base (GitHub Pages serves the site
// under /oasis-globewebsite/ until the domain is attached).
export const href = (path) => import.meta.env.BASE_URL.replace(/\/$/, "") + path;

export const API = "https://oasis-service-automation.onrender.com";

export const biz = {
  name: "Oasis Globe",
  tagline: "Water purifier sales & service in Pune.",
  // TODO confirm with Bhushan: this is the number on the old site. If the
  // customer WhatsApp is the "92" number, change `wa` and `phone` here only.
  phone: "+91 88550 00093",
  tel: "+918855000093",
  wa: "918855000093",
  address: "Mankar Chowk, Kaspatewasti, Wakad, Pune 411057",
  hours: "Mon–Sat · 9 AM–7 PM",
  brands: ["KENT", "AQUAGUARD", "PUREIT", "LIVPURE", "OASIS"],
  // Brand tiles on the home page. `logo` (a file in /public/images/brands/)
  // wins when present; otherwise the name is set in the brand's colour.
  // Drop official logo files in that folder and add `logo: "kent.svg"` etc.
  brandTiles: [
    { name: "Aquaguard", color: "#0B4EA2", style: "font-weight:600;letter-spacing:-.01em" },
    { name: "KENT", color: "#0057A8", style: "font-weight:700;letter-spacing:.04em" },
    { name: "pureit", color: "#1B3C8C", style: "font-weight:600;letter-spacing:-.02em" },
    { name: "livpure", color: "#4B2E83", style: "font-weight:600;letter-spacing:-.02em" },
    { name: "Oasis", logo: "/images/logo.png" },
    { name: "& more…", color: "#374151", style: "font-weight:500" },
  ],
  // TODO confirm service area with Bhushan.
  areas: ["Wakad", "Hinjewadi", "Baner", "Pimple Saudagar", "Pimple Nilakh", "Tathawade", "Balewadi", "PCMC"],
};

// Pre-filled WhatsApp messages. The bot reads these and starts intake directly.
export const msgs = {
  service: "Hi, I need water purifier service. Please share the visit charge and availability.",
  install: "Hi, I need water purifier installation. Please share the price and availability.",
  filter: "Hi, I need a filter service for my water purifier. Please share the price and availability.",
  price: "Hi, I have a question about the spare-parts price list.",
  product: (name) => `Hi, I am interested in ${name}. Please share the details.`,
};

export const wa = (msg) => `https://wa.me/${biz.wa}?text=${encodeURIComponent(msg)}`;

// Service cards. `priceKey` reads the live figure from config; `priceText`
// is used when the office has no fixed figure (installation varies by lead).
export const services = [
  { name: "Repair / Service", priceKey: "service_charge", body: "A technician visits, checks the purifier and fixes the problem. Any part needed is charged at the listed price — the technician tells you before fitting it.", msg: msgs.service },
  { name: "Installation", priceKey: "installation_charge", priceText: "from ₹250", body: "New purifier fitted, wall or under-counter, with a leak check before we leave.", msg: msgs.install },
  { name: "Filter change", priceText: "Parts at list price", body: "Sediment, carbon, membrane or UV — replaced with genuine parts at the prices on our list. No hidden labour.", msg: msgs.filter, link: { text: "See the price list", href: "/price-list/" } },
];

// The four promises the owner wants front and centre (17 Sep 2026). The
// free-revisit window reads the dashboard's repair warranty, default 10 days.
export const trust = (cfg = {}) => {
  const days = cfg.warranty_repair_days || 10;
  return [
    { title: "Pay after the work is done", body: "No advance. You pay once the purifier is working and you have seen it." },
    { title: `Free revisit within ${days} days`, body: `If the purifier needs repair again within ${days} days of our visit, we come back with no service charge.` },
    { title: "Warranty written on the bill", body: "Every bill says what is covered and for how long. Nothing is left to a verbal promise." },
    { title: "Our own technicians, no freelancers", body: "Trained in-house staff. Their focus is how well your purifier cleans the water, not how many parts they can replace." },
  ];
};

export const steps = [
  { n: "01", title: "WhatsApp", body: "Tell us what is wrong and where you are." },
  { n: "02", title: "Visit", body: "A technician comes the same day where possible." },
  { n: "03", title: "Repair", body: "Fixed on the spot. Parts at listed prices, told to you before fitting." },
  { n: "04", title: "Pay", body: "Only after it is working. Warranty is written on your bill." },
];

// FAQ answers that quote a charge are built in the page from live config.
export const faq = (cfg) => [
  { q: "What is the visit charge?", a: `₹${cfg.service_charge} for a service visit within our area. If you go ahead with the repair, the technician's estimate covers everything — no separate visit fee on top.` },
  { q: "Which brands do you service?", a: "Kent, Aquaguard, Pureit, Livpure and Oasis. If your brand is not listed, message us and we will confirm." },
  { q: "How much will the repair cost?", a: `The visit is ₹${cfg.service_charge}. If a part is needed it is charged at the price on our spare-parts list, and the technician tells you the amount before fitting it.` },
  { q: "What if the spare part is not available?", a: "We tell you the expected time and come back to fit it. You pay for the part only when it is installed." },
  { q: "When do I pay?", a: "After the service is done and you have checked the purifier is working. We do not take an advance." },
  { q: "What if the problem comes back?", a: `If the purifier needs repair again within ${cfg.warranty_repair_days || 10} days of our visit, we come back and there is no service charge. You pay only for a new part if one is needed.` },
  { q: "What warranty do you give?", a: "The warranty is written on your bill: what is covered and for how many days. Branded parts also carry the manufacturer's warranty." },
  { q: "Who will come to my home?", a: "Our own trained technician. We do not send freelancers. Their job is to get clean water out of your purifier, not to sell you more parts." },
  { q: "Which areas do you cover?", a: biz.areas.join(", ") + "." },
];
