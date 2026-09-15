# Oasis Globe — nayi website ka plan

Date: 15 Sep 2026. Current site: https://oasisglobe.in (pura replace karna hai).
Input: Bhushan Dada ke chats (minimal, clean, ads ke liye, price + specs), UC analysis (doc 13).

---

## 1. Abhi ki site me kya galat hai

| Problem | Kyun matter karta hai |
|---|---|
| Editorial/fancy copy ("Clarity runs deep", "Every drop, considered") | Bhushan Dada: fancy nahi, to the point. Ad se aaya customer 5 sec me samajhna chahta hai |
| Stats counters "0+ years, 0+ installations, 0% satisfaction" | Animation fail, page pe literally 0 dikh raha hai. Trust tootta hai |
| Products page "Loading catalog…" pe atka hai | Catalog hai hi nahi. Ye site ka main kaam tha |
| Koi price nahi, koi service charge nahi | Log online sirf price/specs compare karne aate hain (Bhushan Dada) |
| Contact = form (name, email, "tell us about your water") | Koi form nahi bharta. WhatsApp hi channel hai |
| "Staff Portal" link purane Azure app pe | Dead link, customer ke liye confusing |
| ISI/WQA/BIS, "since 2014", "500+ homes", industrial plants ke claims | Verify nahi hai. Ad chalao toh galat claim pe complaint aa sakti hai |
| Bada animated blob, serif fonts, 6 sections ka "why us" | Motion design zyada, ads landing ke liye slow |

Sirf ye rakhne layak: address (Mankar Chowk, Kaspatewasti, Wakad 411057), phone +91 8855 000 093, hours Mon–Sat 9–7. Ye bhi confirm karna hai.

## 2. Website ka kaam kya hai (ek line)

Do tarah ke log aayenge:
1. **Ad se aaya service customer** ("RO service near me") → 10 sec me: kya charge, kitne der me, WhatsApp button.
2. **Purifier kharidne wala** jo offline lega par online compare kar raha hai → model, price, specs. Bas.

Sab kuch isi ke liye. Jo isme fit nahi, site pe nahi.

## 3. Pages (sirf 4)

### 3.1 Home `/`
1. **Hero**: "Water purifier service in Pune. Same-day visit, price before work." + WhatsApp button + Call button. Ek line: "Kent, Aquaguard, Oasis aur sabhi brands."
2. **Service charges** (3–4 cards, backend se live): Service/visit ₹250 · Installation · Filter change · AMC. Har card pe "WhatsApp pe book karo".
3. **Kaise kaam karta hai** (3 steps, ek line each): WhatsApp karo → technician exact estimate WhatsApp pe bhejta hai, aap approve karo → kaam, 7 din warranty.
4. **Trust strip**: fixed charge · price before work · same technician · written warranty · genuine parts. (Rating + count jab 50+ ratings ho jayein.)
5. **Products teaser**: 3–4 Oasis models, price ke saath, "Sab dekho" link.
6. **Service area**: Wakad, Hinjewadi, Baner, Pimple Saudagar, PCMC… (list confirm karni hai). Google Maps embed nahi, sirf naam + pincode.
7. **FAQ** (5): visit charge · kaunse brand · spare nahi hai toh · warranty · kitne der me aate ho.
8. **Footer**: address, phone, WhatsApp, hours. Bas.

### 3.2 Service `/service` — ads yahan land karenge
Home ka service hissa detail me + thodi marketing copy (Bhushan Dada ne bola). Tone: seedha, bharosa. Example:
> "Purifier band? Paani ka taste kharab? WhatsApp karo, aaj hi technician aayega. Kaam se pehle exact price WhatsApp pe, aap haan bolo tabhi kaam. Kent, Aquaguard, Pureit, Livpure, Oasis — sab brands."

- Charges table (live from Settings)
- Spare parts price list ka link (PDF jo bana hai) — "Har part ka daam pehle se dekho"
- Brands list
- Process 3 steps
- FAQ
- Sticky WhatsApp button mobile pe

### 3.3 Products `/products`
- Grid: photo, model name, **price**, 3 key specs (capacity, technology RO/UV/UF, warranty). Filter: Oasis / Kent / Aquaguard.
- Click → detail page: photo, price, specs table, "WhatsApp pe pucho". Koi cart, koi buy button. Sale offline.
- Data: ek JSON/spreadsheet se (aap doge). Baad me dashboard se manage kar sakte hain.

### 3.4 Contact `/contact`
WhatsApp button, call button, address, hours, map link. **Form nahi.**

## 4. Design

- Oasis ka apna look: teal (#0F766E) + white + slate text, wahi jo dashboard aur PDF me hai. Logo top-left.
- Ek font (Inter/system). Koi serif, koi blob, koi scroll animation. Hover pe sirf halka shade.
- Mobile-first: ads 90% mobile pe chalenge. WhatsApp button hamesha screen pe.
- Har page < 1 sec load. Lighthouse 95+.

## 5. Tech

- **Astro + Tailwind**, static HTML. Fast, SEO-ready, zero JS jahan zaroorat nahi.
- **Charges/warranty live** from `GET /api/public/config` (already bana hai) build time pe + client refresh. Settings badlo, site badle.
- Products: `products.json` repo me. Phase 2 me dashboard se.
- Rating: baad me `GET /api/public/rating` (avg + count) — chhota endpoint.
- Hosting: Vercel (dashboard already wahan). Domain oasisglobe.in point karna.
- Ads ke liye: Google Analytics/Meta Pixel ek script tag, conversion = WhatsApp click.
- WhatsApp link: `wa.me/91XXXXXXXXXX?text=Hi, purifier service chahiye` — pre-filled text taaki bot seedha intake shuru kare.

## 6. Aapse chahiye (bina iske shuru nahi)

| # | Kya | Kyun |
|---|---|---|
| 1 | Products list: model, price, 3–5 specs, photo (Oasis + jo Kent/AG bechte ho) | Products page |
| 2 | Service area: localities/pincodes | Home + ads targeting |
| 3 | Kaunsa number site pe: 8855 000 093 ya 92 wala? | WhatsApp button |
| 4 | Address/hours confirm (Mankar Chowk wala sahi hai?) | Footer |
| 5 | Kaunse brands service karte ho (Kent, Aquaguard, Pureit, Livpure, AO Smith?) | Service page |
| 6 | Purani site kisne banayi, domain DNS access kiske paas | Deploy |
| 7 | AMC dete ho? Price? | Service card |

Optional: 3–4 customer photo/testimonial (asli), technician team photo.

## 7. Kya NAHI banayenge

Online booking form · payment · login · blog · "about us" ki kahani · industrial plants (jab tak Bhushan Dada na bole) · animations · chatbot widget (WhatsApp hi hai).

## 8. Time

Data milne ke baad ~1 din build, aadha din review/fix, phir domain switch.
