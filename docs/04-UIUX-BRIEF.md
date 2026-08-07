# UI/UX Brief — How It Looks and Feels

*(Align with `oasis-globe/docs/DESIGN.md` where they overlap; this consolidates both surfaces.)*

## 1. Design principles

1. **Trust by default** — identity, status, price shown before asked; nothing surprising.
2. **Simple over clever** — fewest taps; the system remembers, the user doesn't.
3. **One-hand field use** (tech app) — big targets, sticky primary action, bottom nav.
4. **Hard to make mistakes** — guards, disabled buttons until valid, confirm dialogs on irreversible actions (accept, close, payment).
5. **Calm information density** (website) — the manager scans dozens of tickets; color-coded status does the talking.

## 2. Color system (shared language across surfaces)

| Color | Use |
|---|---|
| **Brand blue gradient** ~`#1A8FE0 → #0E6FC4` | Hero banners, primary buttons, brand identity |
| **Green** | Positive/secondary actions, Free/success states, Maps button, completion checks, approved |
| **Red** | Destructive/urgent — Reject, Rejected, Emergency, URGENT badge |
| **Amber/orange** | Warnings, high-priority, repeat complaint, "Important" callouts, low ratings |
| **Neutral greys** | Surfaces; white cards with subtle border/shadow |

**Status pills** (soft tinted, both surfaces): NEW · ACCEPTED · ON THE WAY · ARRIVED · DIAGNOSED · ESTIMATE SENT · VERIFIED · WORK DONE · PAID · CLOSED.
**Tag chips** (small, rounded, meaning-coded): AMC/Warranty = blue/green info; High Priority/Urgent/Repeat = amber/red; Payment Pending = amber.

## 3. Typography & layout

- ALL-CAPS small-label section headers (`TODAY'S JOBS`, `WHAT CUSTOMERS RATED YOU ON`).
- Cards: 12–16px radius, generous padding, subtle shadow.
- Tailwind utility styling; shadcn/ui-style primitives (`components/ui.jsx` on both surfaces).

## 4. Technician app specifics

- **Fixed narrow column (~380–420px)**, mobile-first; installable PWA + APK.
- **Bottom tab nav:** Home · Earnings · Reviews · Help.
- **Sticky bottom primary button** — always exactly one obvious next action per workflow step.
- **Horizontal stepper** in job detail: green check for done, highlight for current, grey for locked.
- **Hero banner:** blue gradient, warm greeting ("Namaste 🙏 Ramesh, ready for today? ⭐4.7"), three stat tiles.
- **Forms:** chip multi-selects over dropdowns; numeric keypads for TDS/amounts; photo slots as labeled tiles with camera capture; voice-note button beside text note.
- **Payment:** UPI QR shown full-width ("Show QR to customer for ₹X"); live Collected vs Remaining counters.
- **Feedback moments:** success screen with green check on job close + incentive-impact nudge; pull-to-refresh; offline banner rather than errors.
- **Tone:** encouraging, Hinglish-friendly warmth; scripts section coaches polite customer language.

## 5. Website specifics

- Desktop-first dashboard layout: sidebar/top nav (`Layout.jsx`), content in tables and cards.
- **Dispatch board:** status buckets with counts, color badges (`BoardBadge`/`StatusBadge`), auto-refresh — the manager should see a new WhatsApp ticket appear without touching anything.
- Modals for every action (assign, schedule, cancel, reconcile, issue stock, edit customer, new ticket) — keep the manager in context, never navigate away mid-task.
- Chat panels styled like WhatsApp (bubbles, media) for familiarity.
- Ratings as stars (`RatingStars`); timelines as vertical event lists with timestamps.

## 6. Customer-facing tone (WhatsApp copy)

- Short, warm, informative; one message per milestone, never duplicated.
- Trust signals in copy: technician **name + ⭐rating** on assignment; "Work starts only after your approval" on estimates; explicit **Free** for warranty/AMC/repeat visits.
- Money always in ₹ with a clear total line.

## 7. Accessibility & i18n

- Large tap targets (≥44px), readable contrast on tinted pills.
- English UI v1; Hindi/Marathi later (copy kept short and simple to ease translation).
