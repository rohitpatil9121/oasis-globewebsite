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

// The same models grouped the way a shop shelf shows them: one card per range
// on /purifiers/, and a page per range (/purifiers/oasis/<slug>/) where the
// customer picks the model or the cabinet colour. `facts` are as printed in
// the owner's Prospera-10 and Inspera-10 leaflets (11 Oct 2026); Spectra and
// Fonix have no leaflet yet, so they say only what is printed on the unit.
// Spectra's colours are the catalogue renders in public/images/cabinets/.
const model = (slug) => ({ ...oasisModels.find((x) => x.slug === slug), image: `/images/oasis/${slug}.jpg` });
const COMMON_FACTS = [
  "Philips UV-C lamp and Philips ballast (254 nm) in a reflector chamber, to kill bacteria in the water.",
  "Hollow fibre UF membrane, 0.01 micron.",
  "Water first passes a sediment filter, then Oasis sediment and activated carbon filters.",
  "Stops by itself when there is no water coming in or the tank is full, and uses no power when it is not running.",
  "LED indicator, and you can see the water level.",
  "Pre-filter unit free with the purifier.",
  "Made by an ISO 9001:2015 certified company.",
];
export const oasisFamilies = [
  {
    slug: "prospera", name: "Prospera", tag: "RO + UV + UF + TDS", pick: "Choose a model",
    intro: "For every kind of drinking water: borewell, tanker or tap. 7 stage purification that gives pure water with minerals. A compact purifier that looks good in the kitchen.",
    facts: ["Oasis 100 GPD RO membrane and booster pump. The membrane supports high TDS water.", ...COMMON_FACTS],
    variants: ["prospera-max", "prospera-10l", "prospera-9l", "prospera-alkaline", "prospera-utc"].map(model),
  },
  {
    slug: "inspera", name: "Inspera", tag: "UV + UF + Copper", pick: "Choose a model",
    intro: "For every kind of drinking water: borewell, tanker or tap. 5 stage purification that gives pure water with minerals. A compact purifier that looks good in the kitchen.",
    facts: COMMON_FACTS,
    variants: ["inspera-6-5l"].map(model),
  },
  {
    slug: "spectra", name: "Spectra", tag: "UV", pick: "Choose a colour",
    intro: "A UV purifier without a storage tank, in four cabinet colours.",
    facts: [],
    variants: [
      { slug: "spectra-marble-gray-brown", name: "Marble Gray Brown", note: "UV", image: "/images/oasis/spectra.jpg", w: 587, h: 800 },
      { slug: "spectra-marble-brown", name: "Marble Brown", note: "UV", image: "/images/cabinets/marble-brown.jpg", w: 642, h: 800 },
      { slug: "spectra-blue-granite", name: "Blue Granite", note: "UV", image: "/images/cabinets/blue-granite.jpg", w: 648, h: 800 },
      { slug: "spectra-lavender", name: "Lavender", note: "UV", image: "/images/cabinets/lavender.jpg", w: 647, h: 800 },
    ],
  },
  {
    slug: "fonix", name: "Fonix", tag: "", pick: "Choose a model",
    intro: "",
    facts: [],
    variants: ["fonix"].map(model),
  },
];

// Kent and Aquaguard models live in kent.json and aquaguard.json, built from
// the two company brochures (names, specs and MRP as printed there).
