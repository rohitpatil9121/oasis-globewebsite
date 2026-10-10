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
  // Two numbers (Rohit, 10 Oct 2026). This one, the "91" number, is the main
  // one: buying a purifier, the custom builder and every general button. The
  // "92" number below (`svc`) is only for service — that is where the WhatsApp
  // bot takes the pre-filled service messages. Google Business Profile should
  // carry the same number as here: a mismatch costs local ranking.
  phone: "+91 88550 00091",
  tel: "+918855000091",
  wa: "918855000091",
  address: "Mankar Chowk, Kaspatewasti, Wakad, Pune 411057",
  // Our Google Maps listing (link from the owner, 10 Oct 2026) and the pin it
  // points to. Google matches the site to the Business Profile through these.
  map: "https://maps.app.goo.gl/JAHKkvxFKL3KYoXN8",
  geo: { lat: 18.5914129, lng: 73.7727545 },
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
  // The owner's list (10 Oct 2026, "service centre SEO area focus"). Each one
  // gets an /areas/<slug>/ page, so add or remove a name only when he does.
  areas: ["Wakad", "Hinjewadi Phase 1", "Baner", "Balewadi", "Aundh", "Pimple Saudagar", "Pimple Nilakh", "Rahatani", "Thergaon", "Dange Chowk", "Tathawade"],
};

// "Pimple Saudagar" -> "pimple-saudagar". Used for the /areas/<slug>/ pages.
// Hinjewadi keeps the address it had before it was narrowed to Phase 1, so
// the page Google already knows does not disappear.
const SLUGS = { "Hinjewadi Phase 1": "hinjewadi" };
export const slug = (s) => SLUGS[s] || s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

// Each area page lists the neighbouring areas we also cover, so a visitor who
// landed on the wrong one can get to theirs and the pages link to each other.
export const nearby = (area) => biz.areas.filter((a) => a !== area).slice(0, 5);

// Pre-filled WhatsApp messages. The bot reads these and starts intake directly.
export const msgs = {
  hello: "Hi, I want to know about your water purifiers and service.",
  service: "Hi, I need water purifier service. Please share the visit charge and availability.",
  install: "Hi, I need water purifier installation. Please share the price and availability.",
  filter: "Hi, I need a filter service for my water purifier. Please share the price and availability.",
  price: "Hi, I have a question about the spare-parts price list.",
  product: (name) => `Hi, I am interested in ${name}. Please share the details.`,
};

export const wa = (msg) => `https://wa.me/${biz.wa}?text=${encodeURIComponent(msg)}`;

// The service number, and the pages that are about service: there the header
// button, the phone bar and every call link use it instead of the main one.
export const svc = { phone: "+91 88550 00092", tel: "+918855000092", wa: "918855000092" };
export const waSvc = (msg) => `https://wa.me/${svc.wa}?text=${encodeURIComponent(msg)}`;
export const isServicePath = (path) => /\/(service|areas|brands|problems|price-list)\//.test(path);

// Service cards. `priceKey` reads the live figure from config; `priceText`
// is used when the office has no fixed figure (installation varies by lead).
export const services = [
  { name: "Repair / Service", priceKey: "service_charge", body: "Our man comes to your home, checks the purifier and fixes it. If a part is needed, he tells you the price first.", msg: msgs.service },
  { name: "Installation", priceKey: "installation_charge", priceText: "from ₹250", body: "We fit your new purifier — on the wall or under the sink. Before leaving, we check that there is no leak.", msg: msgs.install },
  { name: "Filter change", priceText: "Parts at list price", body: "Sediment, carbon, membrane or UV — we put real parts, at the price written in our list. No extra labour charge.", msg: msgs.filter, link: { text: "See the price list", href: "/price-list/" } },
];

// The four promises the owner wants front and centre (17 Sep 2026). The
// free-revisit window reads the dashboard's repair warranty, default 10 days.
export const trust = (cfg = {}) => {
  const days = cfg.warranty_repair_days || 10;
  return [
    { title: "Pay after the work is done", body: "No money before. You pay only when the purifier is working and you have seen it yourself." },
    { title: `Free revisit within ${days} days`, body: `If the same problem comes back within ${days} days, we come again with no visit charge. You pay only if a new part is needed.` },
    { title: "Warranty written on the bill", body: "Your bill says what is covered and for how many days. Company parts also have the company warranty." },
    { title: "Our own technicians, no outside men", body: "Our own trained men come to your home. Their work is to make your water clean, not to sell you parts." },
  ];
};

// Only what the page above does not already say — brands, areas, payment,
// revisit, warranty, part prices and timings each have their own place, so
// they are not repeated here. Answers that quote a charge are built from live config.
export const faq = (cfg) => [
  { q: "How much will it cost?", a: `The visit is ₹${cfg.service_charge}. If you get the repair done, this is part of the total — no separate visit charge on top.` },
  { q: "What if the part is not available?", a: "We tell you how many days it will take and come again to put it. You pay for the part only when it is fitted." },
];
