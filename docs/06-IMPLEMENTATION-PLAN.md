# Implementation Plan — AI-Sized Tasks

Each task is scoped to one focused session, with a **verify** step so it can loop independently. Tasks already shipped are marked ✅ (kept so the plan doubles as a build record); remaining work is ⬜.

## Phase 1 — Foundation (website + intake) ✅ shipped

- ✅ 1.1 DB: enums, users/customers/tickets/assignments/ticket_events/intake_sessions/wa_inbound/notifications, triggers, seed → *verify: `setup_all.sql` runs clean on fresh Supabase*
- ✅ 1.2 Backend scaffold: Express app, env config, Supabase client, JWT auth middleware, RBAC → *verify: `/health` 200; login returns JWT*
- ✅ 1.3 WhatsApp webhook + raw inbound logging → *verify: curl webhook writes `wa_inbound` row before anything else*
- ✅ 1.4 Intake state machine (name→phone→address→issue, guards, restart/cancel, status/track) → *verify: scripted conversation produces OG-#### ticket*
- ✅ 1.5 Notification outbox + worker with retries; mock mode → *verify: kill worker mid-send, restart, message still delivers once*
- ✅ 1.6 Manager dashboard: login, ticket table, ticket view, assign modal, status changes, history → *verify: assign fires technician WhatsApp alert + event row*

## Phase 2 — AI agent + live WhatsApp ✅ shipped

- ✅ 2.1 Meta WhatsApp Cloud API integration (replacing Twilio sandbox); templates incl. `login_otp` → *verify: template message received on real number*
- ✅ 2.2 Tool-agent intake (`agent/prompt.js` + `executor.js`), `USE_TOOL_AGENT=true` → *verify: free-form Hindi/English inquiry still yields complete ticket*
- ✅ 2.3 Inbox page with chat panel + media bubbles → *verify: inbound image renders; reply delivers*

## Phase 3–5 — Technician app core ✅ shipped

- ✅ 3.1 Scaffold Vite+React+Tailwind PWA; Capacitor Android build (`build-apk.sh`) → *verify: APK installs and logs in*
- ✅ 3.2 OTP login via WhatsApp template + demo login → *verify: OTP round-trip on real device*
- ✅ 3.3 Home: 5 job buckets, stat tiles, job cards, online toggle, pull-refresh → *verify: dashboard-assigned ticket appears without reinstall*
- ✅ 3.4 Job detail shell: header, stepper, address/issue cards, sticky action → *verify: stepper reflects `tech_status`*
- ✅ 3.5 Workflow steps 1–3 (accept w/ confirm, enroute, arrive w/ GPS) → *verify: timestamps + lat/lng persisted; one WhatsApp msg each*
- ✅ 3.6 Diagnose form (issue chips, TDS required, brand-first parts picker, photos, voice note) → *verify: submit blocked until TDS present*
- ✅ 3.7 Estimate builder (fixed charge types, editable part prices, bill summary) + send → *verify: customer receives estimate message*
- ✅ 3.8 Approval step with **customer OTP verification**; manager channel; rejected → visit-charge-only branch → *verify: rejected job skips Work Done*
- ✅ 3.9 Work Done proof (final TDS, new/old part photos) → *verify: payment locked until proof uploaded*
- ✅ 3.10 Payment (split UPI/Cash/Card, QR, reconcile to ₹0) → *verify: confirm disabled while remaining > 0*
- ✅ 3.11 Close (next-service, lead toggle, success screen) → *verify: `ticket_events` complete chain; stock CONSUME recorded*
- ✅ 3.12 Reviews + Help screens → *verify: category aggregates match `job_reviews`*

## Phase 6 — Live location + incentives ✅ shipped (verify pending items below)

- ✅ 6.1 Location pings + dashboard live view (`phase6_location.sql`) — ⬜ **confirm `phase6_location.sql` has been run on production Supabase** → *verify: query the pings table on prod*
- ✅ 6.2 Incentives service (Kent/Aqua 6→10%, Oasis −18% GST) + dashboard page + app Earnings tab → *verify: hand-computed sample month matches*

## Phase 7 — Hardening & gaps ⬜ next

- ⬜ 7.1 Fix duplicate completion messages (tracked in `ISSUE_DUPLICATE_COMPLETION_MESSAGES.md`) → *verify: close a job; exactly one message in `notifications` per milestone*
- ⬜ 7.2 Offline submit queue in tech app (persist pending step submissions, retry on reconnect) → *verify: airplane-mode diagnosis survives app restart and syncs*
- ⬜ 7.3 Push notifications end-to-end (per `docs/push-notifications-setup.md`) for new assignments → *verify: locked-phone notification on assign*
- ⬜ 7.4 Photo compression before upload + Supabase Storage lifecycle → *verify: upload <300KB on a 12MP capture*
- ⬜ 7.5 RLS enforcement pass (`policies.sql` from groundwork → active policies) → *verify: technician JWT cannot read another tech's jobs via REST*
- ⬜ 7.6 Rotate/remove committed secrets (`WA key.txt`, Firebase admin JSON, `CREDENTIALS.md`) into env/secret manager → *verify: repo clean; services still boot*

## Phase 8 — Owner analytics ⬜ planned

- ⬜ 8.1 Views for revenue vs parts cost, net margin by day/week/technician/area → *verify: view totals match payments table*
- ⬜ 8.2 Owner dashboard page: profitability, CSAT trend + low-rating flags, throughput, time-to-close, lead pipeline → *verify: numbers reconcile with Incentives page*
- ⬜ 8.3 First-time-fix + 10-day repeat-rate metrics → *verify: seeded repeat scenario counted once*

## Phase 9 — Customer trust extras ⬜ backlog

- ⬜ 9.1 Next-service reminder scheduler (uses `next_service_interval`) → *verify: reminder enqueued at interval in a time-warped test*
- ⬜ 9.2 Start-OTP (customer reads code to technician) → *verify: job cannot start without code*
- ⬜ 9.3 Post-close feedback quick-reply buttons → per-category `job_reviews` capture → *verify: WhatsApp button reply writes review row*
- ⬜ 9.4 Hindi/Marathi message copy variants → *verify: template approvals in Meta*

## Working rules for every task

1. One task = one branch/session; touch only files the task names.
2. Every state-advancing change must append `ticket_events` and enqueue **exactly one** notification — add/keep a test for this.
3. Test in `WHATSAPP_MOCK=true` first; then verify one real message on the live number.
4. APK URL is baked at build time — any backend URL change requires an APK rebuild + redistribution.
5. Schema changes ship as a new numbered SQL file in `db/`, idempotent (`if not exists` / `do $$` guards), and get run on prod Supabase before the code depending on them deploys.
