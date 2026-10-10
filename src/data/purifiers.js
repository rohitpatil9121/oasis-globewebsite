// The three things we provide, shown under the home hero: a button, a photo
// and one line each. The header menu carries the same three. The parts price
// list is not a topic of its own — it is reached from the Service page.
// `image` files live in public/images/ (4:3); swap the file to change a photo.
export const topics = [
  { name: "Branded purifiers", link: "/purifiers/", image: "/images/topic-branded.jpg", alt: "Oasis, Kent and Aquaguard water purifiers side by side", body: "Oasis Globe, Kent and Aquaguard. New purifiers, fitted by us." },
  { name: "Custom", link: "/custom/", image: "/images/topic-custom.jpg", alt: "Three Oasis purifier cabinets in different designs", body: "Choose the model, cabinet and filters. We build it." },
  { name: "Service", link: "/service/", image: "/images/topic-service.jpg", alt: "Technician checking water with a TDS meter beside an opened purifier", body: "Repair, installation and filter change. Parts price list inside." },
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
