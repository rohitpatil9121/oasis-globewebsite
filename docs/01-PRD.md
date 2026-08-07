# PRD — Oasis Globe Service Platform
*(Covers both surfaces: the **Technician App** (Android/PWA) and the **Website** — manager dashboard + owner view)*

## 1. Problem

Oasis Globe is a small RO / water-purifier service centre. Before this platform:
- Customer inquiries arrived on WhatsApp/phone and could be lost or forgotten.
- Job assignment, estimates, payments and follow-ups lived in the manager's head.
- Customers had no visibility: who is coming, when, and what it will cost.
- The owner had no view of profitability, satisfaction, or work throughput.

## 2. Vision

Urban-Company-level **trust and polish at small-service-centre scale**. A service centre model (employees dispatched by a Service Manager), **not** a marketplace — technicians never browse or bid; they execute what's assigned.

Four roles, one system, one database, one customer history:

| Role | Surface | Goal |
|---|---|---|
| **Customer** | WhatsApp only | Always knows who's coming, when, what it costs; no surprise charges |
| **Technician** | Technician App (this repo: `technician-app/`) | Smooth, no-thinking, hard-to-make-mistakes job flow |
| **Service Manager** | Website dashboard (`oasis-globe/frontend/`) | See everything, assign fast, unblock technicians |
| **Owner** | Website dashboard | Are we making money, are customers happy, is work getting done |

## 3. What we're building

### 3.1 Customer surface (WhatsApp — no app)
- AI intake bot (tool-agent) captures Name → Phone → Address → Issue; every inbound message is raw-logged first so **no inquiry is ever lost**.
- Exactly **one WhatsApp message per milestone** (owner's hard rule — never spam): request received → technician assigned (name + ⭐rating) → on the way (ETA) → arrived → estimate (approve YES/NO before any paid work) → payment → done + feedback → next-service reminder.
- `status` / `track` command returns the latest ticket state.
- Estimate approval via WhatsApp OTP verification.

### 3.2 Technician App (mobile — Capacitor APK + PWA)
- OTP login (WhatsApp `login_otp` template) against the shared `users` table.
- **Home / Today:** stat tiles (Pending / Today / Done), job buckets — pending-from-previous-days, today's jobs, completed today, repeat calls (free within 10 days), escalations. Online/offline availability toggle.
- **Job detail — the strict 9-step workflow:** Accept → Travel → Arrive (GPS proof) → Diagnose (issues + TDS in/out + parts + photos + note) → Estimate (fixed charge types, editable part prices) → Approval (WhatsApp OTP or manager) → Work Done (final TDS + new/old part photos) → Payment (split UPI/Cash/Card to ₹0) → Close (next-service interval, optional lead).
- **Earnings tab:** incentive display (Kent/Aqua 6→10% slabs, Oasis margin −18% GST) — display only; computed server-side.
- **Reviews:** average rating, per-category scores, recent feedback, incentive nudges.
- **Help:** manager/office contacts, emergency support, issue guide, customer-script playbook.

### 3.3 Website (manager + owner)
- **Live dispatch board:** every ticket by status, refreshing live; assign/reassign + visit slot; technician availability.
- **Inbox:** WhatsApp conversation view (chat panel, media), manual ticket creation.
- **Ticket view:** full history/audit, status control, estimate approval on customer's behalf, payment reconciliation.
- **Customers:** profiles, history, warranty/AMC context.
- **Technicians:** per-technician dashboards, live location, chat.
- **Stock:** parts catalog, stock issues to technicians, movements.
- **Incentives:** per-technician incentive computation and review.
- **Owner analytics (roadmap):** revenue vs parts cost / net margin, CSAT trend, throughput, lead pipeline.

## 4. Business rules (product-critical)

1. **Approval before any paid repair.** No exceptions; rejected estimate → visit charge only.
2. **One charge type per job, fixed amounts** (Service ₹400, Visit ₹250, Warranty Free, Repeat-within-10-days Free). Only part prices editable.
3. **Arrival (GPS) gates diagnosis; TDS gates estimate; proof photos gate payment.**
4. **Payments must reconcile to ₹0** across split methods before confirmation.
5. **Exactly one customer message per milestone.**
6. **Central assignment only** — manager dispatches; technicians can accept/reject but not pick.

## 5. Success metrics

- Zero lost inquiries (every inbound in `wa_inbound` → ticket or explicit close).
- % jobs with full proof chain (GPS + photos + TDS before/after).
- First-time-fix rate and repeat-complaint (10-day) rate.
- Average rating / CSAT trend per technician.
- Time-to-assign and time-to-close.
- Digital-payment share; estimate-approval rate.

## 6. Out of scope (current phase)

- Customer-facing app (WhatsApp is the customer surface, deliberately).
- Marketplace features (bidding, technician self-scheduling).
- Full accounting/invoicing (GST invoices), multi-branch, multi-language UI.
- In-app chat/calling for customers (device dialer + WhatsApp).
