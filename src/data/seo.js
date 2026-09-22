// Pages that exist to be found. A visitor searching for a purifier problem or
// a brand is not searching for us by name, so the site needs a page that
// answers the thing they typed. Everything written here is what our own
// technicians actually do on a job — no invented specifications, no invented
// prices. A charge is never written into this file: those come live from the
// dashboard (see src/lib/config.js).

// Brand pages: "kent service centre pune", "aquaguard repair near me".
// We are an independent service company, NOT an authorised service centre for
// any of these brands, and the copy must never suggest otherwise.
export const brands = [
  {
    slug: "kent",
    name: "Kent",
    logo: "/images/brands/kent.svg",
    models: "Grand, Grand Plus, Supreme, Pearl, Prime, Elegant and the older Excell range",
    common: [
      "Filter and membrane change once the water slows down or starts tasting flat",
      "UV lamp replacement — the lamp stops working long before the unit does",
      "Pump and SMPS faults, which is what most 'no water' complaints turn out to be",
      "Leaks from the tubing, the elbow fittings or the tank connection",
    ],
  },
  {
    slug: "aquaguard",
    name: "Aquaguard",
    logo: null,
    models: "Aura, Marvel, Delight, Reviva, Enhance and the wall-mounted Classic units",
    common: [
      "Membrane and carbon change when the output drops or the taste changes",
      "UV lamp and ballast replacement",
      "Solenoid valve and float switch faults — the unit runs when it should stop, or will not start",
      "Tank and tap leaks",
    ],
  },
  {
    slug: "pureit",
    name: "Pureit",
    logo: "/images/brands/pureit.png",
    models: "Copper+, Ultima, Eco Water Saver, Marvella and the storage (non-electric) range",
    common: [
      "Germkill kit and filter replacement",
      "RO membrane change when the purified output falls",
      "Pump noise and 'no water' faults",
      "Leaks at the tank and the dispensing tap",
    ],
  },
  {
    slug: "livpure",
    name: "Livpure",
    logo: "/images/brands/livpure.png",
    models: "Glo, Bolt, Envy, Pep and Zinger",
    common: [
      "Sediment, carbon and membrane change",
      "UV lamp replacement",
      "Pump and adaptor faults",
      "Leaks and fitting replacement",
    ],
  },
  {
    slug: "oasis",
    name: "Oasis",
    logo: "/images/logo.png",
    models: "our own wall, table-top and under-sink units",
    common: [
      "Filter and membrane change at the service interval",
      "UV lamp replacement",
      "Pump service",
      "Any fault at all — we build these, so we know every part in them",
    ],
  },
];

// Problem pages: what people actually type when something is wrong. Each one
// names the symptom, what it usually turns out to be and what we do about it.
export const problems = [
  {
    slug: "no-water",
    title: "Purifier is not giving water",
    q: "Why is my RO not giving water?",
    intro: "Nothing comes out of the tap, or the purifier runs and runs but the tank never fills.",
    causes: [
      "The pump has failed, or the SMPS/adaptor that powers it has. This is the most common cause by a long way.",
      "The sediment or carbon filter is completely choked, so not enough water reaches the membrane.",
      "The RO membrane itself is choked after long use.",
      "The float switch or solenoid valve has failed, so the unit never starts filling.",
      "Low incoming water pressure — sometimes the purifier is fine and the supply is the problem.",
    ],
    fix: "The technician checks the supply first, then the power side, then each stage in order. Whatever has actually failed is replaced — we do not change the whole filter set to be safe.",
  },
  {
    slug: "water-tastes-bad",
    title: "Purified water tastes or smells bad",
    q: "Why does my RO water taste bad?",
    intro: "The water has a flat, salty, metallic or musty taste, or smells off.",
    causes: [
      "The carbon filter is exhausted — carbon is what removes taste and smell, and it is usually the first to go.",
      "The RO membrane is past its life, so more dissolved salts are getting through.",
      "Water has been standing in the tank for days, which happens after a holiday.",
      "The post-carbon or mineral cartridge, if fitted, is finished.",
    ],
    fix: "We measure the TDS of your input water and the purified water. That number tells us whether it is the carbon or the membrane, so only the one that has failed gets replaced.",
  },
  {
    slug: "water-leaking",
    title: "Purifier is leaking water",
    q: "Why is my water purifier leaking?",
    intro: "Water on the platform, under the sink or dripping down the wall.",
    causes: [
      "A push-fit tube has come loose from its elbow, or the elbow's O-ring has hardened.",
      "The tank connection or the dispensing tap is leaking.",
      "A filter housing has not sealed — often after a badly done service elsewhere.",
      "The membrane housing cap is leaking.",
    ],
    fix: "The technician pressure-checks every joint, replaces the fitting or O-ring that has gone, and runs the unit to confirm it is dry before leaving.",
  },
  {
    slug: "tds-high",
    title: "TDS is too high after purification",
    q: "My purifier's TDS is high — what does it mean?",
    intro: "You checked with a TDS meter and the purified water reads higher than it should.",
    causes: [
      "The RO membrane has aged and is passing more dissolved salts than it used to.",
      "The TDS controller is set too high, so more raw water is being blended back in.",
      "The membrane was never the right rating for your input water — this happens with borewell water.",
    ],
    fix: "We measure both input and output TDS. If the membrane is done it is replaced; if the controller is simply blending too much, that is adjusted and costs you nothing extra.",
  },
  {
    slug: "purifier-noise",
    title: "Purifier is making a loud noise",
    q: "Why is my RO making noise?",
    intro: "A loud humming, knocking or rattling sound when the purifier runs.",
    causes: [
      "The pump is worn — pumps get louder as they age, and noise is usually the first warning.",
      "Air is trapped in the line, often after a filter change.",
      "The unit is not sitting flat, or is vibrating against the wall or cabinet.",
      "A choked filter is making the pump work harder than it should.",
    ],
    fix: "The technician listens to the unit running, finds whether it is the pump or a mounting, and fixes that. A noisy pump does not always need replacing.",
  },
  {
    slug: "when-to-change-filter",
    title: "When should a purifier filter be changed?",
    q: "How often should I change my RO filter?",
    intro: "The honest answer is that it depends on your water, not on a calendar.",
    causes: [
      "Sediment and carbon filters: usually 6 to 12 months, sooner on borewell or hard water.",
      "RO membrane: usually 2 to 3 years, less if your input TDS is high.",
      "UV lamp: about a year — it keeps glowing after it has stopped disinfecting, so it is easy to miss.",
      "Post-carbon, alkaline or mineral cartridges: around a year.",
    ],
    fix: "We check the actual condition and the TDS reading instead of going by the date. If a filter still has life in it, we say so and you keep your money.",
  },
];
