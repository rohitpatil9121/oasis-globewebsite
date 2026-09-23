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
  // The customer-facing number, confirmed 23 Sep 2026 — it is the one on the
  // WhatsApp Business display picture. The site had the "93" number, which is
  // not where customers should land. Google Business Profile must carry this
  // same number: a mismatch costs local ranking.
  phone: "+91 88550 00092",
  tel: "+918855000092",
  wa: "918855000092",
  address: "Mankar Chowk, Kaspatewasti, Wakad, Pune 411057",
  hours: "Mon–Sat · 9 AM–7 PM",
  brands: ["KENT", "AQUAGUARD", "PUREIT", "LIVPURE", "OASIS"],
  // Brand tiles on the home page. `logo` (a file in /public/images/brands/)
  // wins when present; otherwise the name is set in the brand's colour.
  // Drop official logo files in that folder and add `logo: "kent.svg"` etc.
  brandTiles: [
    { name: "Aquaguard", color: "#0B4EA2", style: "font-weight:600;letter-spacing:-.01em" },
    { name: "Kent", logo: "/images/brands/kent.svg" },
    { name: "Pureit", logo: "/images/brands/pureit.png" },
    { name: "Livpure", logo: "/images/brands/livpure.png" },
    { name: "Oasis", logo: "/images/logo.png" },
    { name: "& more…", color: "#374151", style: "font-weight:500" },
  ],
  // TODO confirm service area with Bhushan.
  areas: ["Wakad", "Hinjewadi", "Baner", "Pimple Saudagar", "Pimple Nilakh", "Tathawade", "Balewadi", "PCMC"],
};

// "Pimple Saudagar" -> "pimple-saudagar". Used for the /areas/<slug>/ pages.
export const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

// Each area page lists the neighbouring areas we also cover, so a visitor who
// landed on the wrong one can get to theirs and the pages link to each other.
export const nearby = (area) => biz.areas.filter((a) => a !== area).slice(0, 5);

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
  { name: "Repair / Service", priceKey: "service_charge", body: "Our man comes to your home, checks the purifier and fixes it. If a part is needed, he tells you the price first. You decide.", msg: msgs.service },
  { name: "Installation", priceKey: "installation_charge", priceText: "from ₹250", body: "We fit your new purifier — on the wall or under the sink. Before leaving, we check that there is no leak.", msg: msgs.install },
  { name: "Filter change", priceText: "Parts at list price", body: "Sediment, carbon, membrane or UV — we put real parts, at the price written in our list. No extra labour charge.", msg: msgs.filter, link: { text: "See the price list", href: "/price-list/" } },
];

// The four promises the owner wants front and centre (17 Sep 2026). The
// free-revisit window reads the dashboard's repair warranty, default 10 days.
export const trust = (cfg = {}) => {
  const days = cfg.warranty_repair_days || 10;
  return [
    { title: "Pay after the work is done", body: "No money before. You pay only when the purifier is working and you have seen it yourself." },
    { title: `Free revisit within ${days} days`, body: `If the same problem comes back within ${days} days, we come again. No visit charge.` },
    { title: "Warranty written on the bill", body: "Your bill says what is covered and for how many days. Nothing is only said by mouth." },
    { title: "Our own technicians, no outside men", body: "Our own trained men come to your home. Their work is to make your water clean, not to sell you parts." },
  ];
};

export const steps = [
  { n: "01", title: "WhatsApp", body: "Tell us the problem and your area." },
  { n: "02", title: "Visit", body: "Our man comes. Same day if possible." },
  { n: "03", title: "Repair", body: "He fixes it there itself. If a part is needed, he tells you the price first." },
  { n: "04", title: "Pay", body: "Pay only after it is working. Warranty is written on your bill." },
];

// FAQ answers that quote a charge are built in the page from live config.
export const faq = (cfg) => [
  { q: "What is the visit charge?", a: `₹${cfg.service_charge} for a visit in our area. If you get the repair done, this is part of the total — no separate visit charge on top.` },
  { q: "Which brands do you service?", a: "Kent, Aquaguard, Pureit, Livpure and Oasis. If your brand is not here, send us a message and we will tell you." },
  { q: "How much will the repair cost?", a: `The visit is ₹${cfg.service_charge}. If a part is needed, its price is in our parts list, and our man tells you the amount before putting it.` },
  { q: "What if the part is not available?", a: "We tell you how many days it will take and come again to put it. You pay for the part only when it is fitted." },
  { q: "When do I pay?", a: "After the work is done and you have seen that the purifier is working. We do not take money before." },
  { q: "What if the problem comes back?", a: `If the same problem comes back within ${cfg.warranty_repair_days || 10} days, we come again and there is no visit charge. You pay only if a new part is needed.` },
  { q: "What warranty do you give?", a: "It is written on your bill — what is covered and for how many days. Company parts also have the company warranty." },
  { q: "Who will come to my home?", a: "Our own trained man. We do not send outside people. His work is to make your water clean, not to sell you more parts." },
  { q: "Which areas do you cover?", a: biz.areas.join(", ") + "." },
];
