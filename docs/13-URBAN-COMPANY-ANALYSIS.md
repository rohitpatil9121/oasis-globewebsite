# Urban Company vs Oasis Globe — kya seekhna hai, kya nahi

> UC ki copy nahi banani. Unka model samajhna hai taaki Oasis apni cheez — local team,
> same technician, WhatsApp pe seedha estimate — ko unke muqable me clearly bech sake.

Date: 15 Sep 2026. Source: urbancompany.com Pune water purifier pages + rate card
(screenshots Bhushan Dada ne bheje). Public reviews bhi dekhe (Trustpilot, MouthShut,
consumercomplaints.in).

---

## 1. UC ka model, ek nazar me

| Cheez | Urban Company (Pune) |
|---|---|
| Visit / repair check-up | ₹299, fixed. Agar kuch nahi nikla toh ₹249 inspection. |
| Filter check-up | ₹299 |
| Complete filter replacement | ₹4,199 (NATIVE, UC ka apna brand) |
| Wall-mounted installation | ₹449 · Under-counter ₹649 · Uninstall ₹399 |
| Labour on spares | Har part ke saath ₹299 labour, **cap ₹299 per appliance** (kitne bhi parts lago) |
| Conveyance | Part price me included, extra nahi |
| Warranty | NATIVE spares 1 saal · Installation 10 din · Baaki repair 1 mahina · UC Cover ₹10,000 damage |
| Spare nahi hai toh | Order karke 1–2 din me revisit |
| Genuine kaise | Technician har part ka barcode scan karta hai |
| Process | Diagnosis → exact estimate → approval ke baad hi kaam → quality check → warranty |
| Social proof | 4.79★, 2.4M bookings, 200K reviews (page pe har service ke saath) |
| Brands | Kent, Aquaguard, PureIT + local. Xiaomi, DrinkPrime, LG, commercial nahi. |

**Rate card structure:** Section bars brand-wise (Native Consumables, Servicing/Installation,
UV Spares, Generic Spares, Generic Electrical, Aquaguard, Kent, Pure IT, Livpure, Philips),
andar do column: Description | Part price + ₹299 (Labour).

## 2. UC ki asli kamzori (reviews se)

- Public review rating ~1.4/5 (PissedConsumer, 3.8K reviews). Complaints: no-show,
  adhura kaam, refund me delay, technician ka behaviour, disputed charges.
- Technician customer ka nahi hota, platform ka hota hai. Repeat customer ka koi
  relationship nahi banta.
- NATIVE push: branded filter maangne pe bhi apna brand bechte hain.
- ₹299 visit + ₹249 inspection: chhoti problem me bhi customer ₹250–300 deta hai.

**Yahi Oasis ka opening hai:** local, same technician, WhatsApp pe seedha baat, aur
transparent price list. Ads me yahi bolna hai.

## 3. Oasis ke liye: kya adopt karna hai (priority order)

### A. Abhi karo, cost zero (is hafte)

1. **Public rate card** — ban gaya (`docs/Oasis-Spare-Parts-Price-List.pdf`). WhatsApp
   Business profile (92) me catalog/PDF daalo. Ye UC ka "Transparent Pricing" pillar hai,
   aur customer "price verify" wali baat bhi isi se solve hoti hai.
2. **Fixed visit charge decide karo aur likho.** UC ₹299 leta hai. Oasis ka jo bhi hai
   (₹200? ₹250?), wo PDF ke header me aur bot ke reply me hona chahiye. Abhi bot "charges"
   pooche toh "team confirm karegi" bolta hai; ek fixed number bolna zyada bharosa deta hai.
   *Ye Bhushan Dada se puchna hai.*
3. **Labour ko simple rakho:** ek part ho ya paanch, ek hi labour. UC cap ₹299 hai; Oasis
   isse kam rakh ke ad me "labour capped at ₹___" bol sakta hai.
4. **Warranty ko likhit karo:** Oasis parts pe kitne din, installation pe kitne din, repair
   pe kitne din. Abhi kahin likha nahi hai. Bina number ke "warranty" ka matlab nahi.
5. **Service menu with fixed price**, UC jaisa 5–6 line ka:
   Repair check-up · Filter service · Full filter kit (Oasis All Filter Kit ₹4,200 already
   hai, UC ₹4,199 — same range, achha hai) · Installation ₹350 (already) · Uninstall.
   Ye website aur WhatsApp dono pe same rahe.

### B. System me chhota kaam (1–2 hafte)

6. **Estimate → approval → kaam.** Ye Oasis app me already hai (tech estimate, customer
   Approve/Reject on WhatsApp). Ise marketing me bolo: "Kaam shuru hone se pehle exact
   price WhatsApp pe, aap approve karo tabhi kaam." UC isko 5-step process bana ke bechta hai.
7. **Rating ko dikhao.** Best/Good/Poor rating ab collect ho rahi hai. 50–100 ratings hone
   pe website pe "4.x★ from N customers" daalo. UC ka sabse bada trust signal yahi hai.
8. **"Spare nahi hai toh revisit in 1–2 din"** — ye promise bot ke reply aur PDF me daalo.
   Backend me ticket status pe "AWAITING_PART" jaisa state nahi hai; agar chahiye toh
   add kar sakte hain taaki customer ko auto-update jaye.
9. **Filter reminder:** UC bolta hai filter 12 mahine, pre-filter 6 mahine. Oasis ke paas
   har closed ticket ka date + parts hain. 6/12 mahine baad WhatsApp template bhejo
   "Aapka pre-filter due hai" — ye UC nahi kar sakta, Oasis kar sakta hai. Repeat business
   ka sabse sasta rasta.

### C. Abhi nahi karna

- **UC jaisa apna filter brand (NATIVE)** — Oasis generic parts already hain, alag brand
  banane ki zaroorat nahi. Bas PDF me "Oasis Spares (Generic / Universal)" bola hai.
- **Barcode scan for genuine parts** — overkill. Bill pe part name + warranty likhna kaafi.
- **UC Cover jaisa damage insurance** — abhi scale nahi hai.
- **Online booking/payment flow website pe** — WhatsApp hi booking hai, website sirf
  "WhatsApp karo" button de. Sales offline hai, Bhushan Dada ne khud bola.

## 4. Website ke liye seedha nateeja (jab banayenge)

Service page pe sirf ye 6 cheezein, UC ke order me:

1. Ek line: kya karte hain + area (Pune, Wakad/PCMC…) + WhatsApp button
2. Service menu: 5–6 services, fixed price, ek line description
3. 3 trust points: fixed visit charge · price approval before work · written warranty
4. Rate card link (PDF) — "Har part ka daam pehle se dekho"
5. Rating + review count (jab data ho)
6. FAQ 5 sawaal: visit charge kya hai · kaunse brand · spare nahi hai toh · warranty · area

Product (purifier) page: model, price, specs table, WhatsApp button. Bas.

## 5. Bhushan Dada se confirm karne wale numbers

| Sawaal | Kyun |
|---|---|
| Visit / repair check-up charge kitna? | PDF header, bot reply, website, ad copy sab me jayega |
| Labour per job kitna, cap hai? | PDF me har price ke neeche likhna hai (abhi "+ labour") |
| Warranty: Oasis parts / Kent-AG parts / installation / repair — kitne din? | Trust point ke bina UC se compare nahi kar sakte |
| 92 number aur office address | PDF aur website header |
| Service area list (kaunse pincodes/localities) | Ads ka targeting isi pe hoga |
