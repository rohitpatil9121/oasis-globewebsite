// The home-page buttons under the hero: the same labels and links as the
// header menu, so a phone visitor reaches any topic without opening it.
export const topics = [
  { name: "Branded purifiers", link: "/purifiers/" },
  { name: "Custom", link: "/custom/" },
  { name: "Service", link: "/#services" },
  { name: "Price list", link: "/price-list/" },
];

// Our own models. Photos are the catalogue renders (public/images/oasis/).
// `note` carries only what is printed on the unit or in the model name — no
// prices and no invented specs; the office quotes on WhatsApp.
export const oasisModels = [
  { slug: "prospera-max", name: "Prospera MAX", note: "RO + UV + UF + TDS", w: 577, h: 800 },
  { slug: "prospera-10l", name: "Prospera 10L", note: "10 litre tank · RO + UV + UF + TDS", w: 577, h: 800 },
  { slug: "prospera-9l", name: "Prospera 9L", note: "9 litre detachable tank", w: 669, h: 800 },
  { slug: "prospera-alkaline", name: "Prospera + Alkaline", note: "RO + UV + UF + TDS + alkaline", w: 682, h: 800 },
  { slug: "prospera-utc", name: "Prospera UTC", note: "No storage tank · RO + UV + UF + TDS", w: 647, h: 800 },
  { slug: "inspera-6-5l", name: "Inspera 6.5L", note: "6.5 litre tank", w: 622, h: 800 },
  { slug: "spectra", name: "Spectra", note: "UV", w: 587, h: 800 },
  { slug: "fonix", name: "Fonix", note: "", w: 800, h: 632 },
];

// Kent and Aquaguard models live in kent.json and aquaguard.json, built from
// the two company brochures (names, specs and MRP as printed there).
