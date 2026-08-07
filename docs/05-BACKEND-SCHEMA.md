# Backend Schema — The Data Layer

Target: **Supabase / PostgreSQL**. Base DDL in `db/schema.sql` (+ `policies.sql`, `views.sql`, `seed.sql`, phase files e.g. `phase6_location.sql`). UUIDs via pgcrypto; `updated_at` auto-touch triggers on mutable tables.

## 1. Enums

- `user_role`: owner · manager · technician · customer
- `ticket_status` (coarse, dashboard): NEW · ASSIGNED · IN_PROGRESS · CLOSED · CANCELLED
- `tech_status` (fine, workflow): NEW · ACCEPTED · ON_THE_WAY · ARRIVED · DIAGNOSED · ESTIMATE_SENT · VERIFIED · WORK_DONE · PAID · CLOSED
- `intake_state`: AWAITING_NAME · AWAITING_PHONE · AWAITING_ADDRESS · AWAITING_ISSUE · COMPLETED
- `notification_status`: PENDING · SENT · FAILED

## 2. Core tables (Phase 1, existing)

### `users` — staff
`id` uuid PK · `full_name` · `phone` unique (E.164) · `email` · `password_hash` (bcrypt) · `role` · `is_active` · `otp_code` + `otp_expires_at` · timestamps. Index on role.

### `customers`
`id` · `full_name` · `phone` unique (E.164) · `address` · timestamps.

### `tickets` — the single source of truth (a "job" in the app IS a ticket)
`id` · `ticket_number` unique, auto `OG-1001…` (sequence) · `customer_id` FK restrict · `issue_description` · `status` (coarse) · `assigned_technician_id` FK set-null · `source` (whatsapp | manual) · `created_by` · timestamps. Indexes: status, customer, technician.

### `assignments` — assignment history
`ticket_id` FK cascade · `technician_id` · `assigned_by` · `note` · `assigned_at`.

### `ticket_events` — full audit log
`ticket_id` · `event_type` (created | status_changed | assigned | note | step events) · `from_status`/`to_status` · `actor_id` (null = system/customer) · `meta` jsonb · `created_at`. **Every state change on any surface appends here.**

### `intake_sessions` — WhatsApp conversation state
`phone` · `state` · `data` jsonb {name, phone, address, issue} · `customer_id` · `ticket_id`. Partial unique index: one active (non-COMPLETED) session per phone.

### `wa_inbound` — raw inbound log (written BEFORE any processing)
`from_phone` · `body` · `created_at`. Guarantees no inquiry is ever lost.

### `notifications` — outbox (queue-ready)
`channel` (whatsapp) · `recipient` · `body` · `status` · `related_ticket_id` · `audience` (customer | manager | technician) · `attempts` · `last_error` · `provider_sid` · `sent_at`. Worker drains PENDING with retries.

## 3. Workflow extensions (technician app phases)

### `tickets` — added columns
- Step timestamps: `accepted_at, enroute_at, arrived_at, diagnosed_at, estimate_sent_at, approved_at, work_done_at, paid_at, closed_at`
- `tech_status` (fine-grained; coarse `status` kept for dashboard compat)
- GPS proof: `arrival_lat`, `arrival_lng`
- TDS: `tds_input`, `tds_output` (at diagnosis), `tds_output_final` (at work done)
- Billing: `charge_type`, `charge_amount`
- Approval: `approval_channel` (whatsapp | manager), `approval_status`
- Follow-up: `next_service_interval`, `rating`, `lead_source`
- Flags: `is_repeat`, `repeat_within_days`, `is_free_visit`

### New tables
| Table | Columns (key) | Purpose |
|---|---|---|
| `job_issues` | ticket_id, issue_type | Selected diagnosis chips (many per ticket) |
| `job_photos` | ticket_id, kind (BEFORE / DAMAGE / OLD_PART / NEW_PART_INSTALLED / USED_PART_REMOVED), url, stock_item_id? | Proof chain; part photos tie to the part used |
| `job_notes` | ticket_id, text, voice_url? | Technician notes |
| `payments` | ticket_id, method (UPI/CASH/CARD), amount, created_at | Split payments; SUM must equal approved total (or visit charge on rejected branch) |
| `job_reviews` | ticket_id, category scores (polite, first_time_fix, on_time, done_properly, communication), comment | Per-category ratings; `tickets.rating` = overall |
| `leads` | ticket_id, customer_id, note, status | "Create a lead?" at close → manager follow-up |

### Stock (existing, manager-owned)
`stock_items` (catalog + default price, brand) · `stock_issues` / `stock_issue_lines` (parts issued to technicians) · `stock_movements` (CONSUME on job close). Estimate part lines reference `stock_items`.

### Location (phase 6 — `phase6_location.sql`)
Technician live-location pings (technician_id, lat, lng, recorded_at) powering the dashboard live map; plus `users` availability flag for the online/offline toggle.

### Incentives
Computed in `backend/src/services/incentives.js` from closed tickets + payments + parts cost: Kent/Aqua slab 6%→10%, Oasis margin basis −18% GST. Display-only in app Earnings; reviewed on dashboard Incentives page.

## 4. Integrity rules (enforced in service layer + constraints)

1. Step endpoints validate the current `tech_status` — no skipping (arrive before diagnose, TDS before estimate, approval before work-done, ₹0 remaining before paid).
2. One active intake session per phone (partial unique index).
3. `payments` sum reconciled server-side before `PAID`.
4. Ticket numbers are gap-tolerant but unique (sequence).
5. RLS (`policies.sql`): service-role for backend; groundwork for per-role row access in Phase 2.

## 5. Views (`views.sql`)
Reporting/board helpers (bucketed ticket lists, per-technician aggregates) consumed by the dashboard and incentives.
