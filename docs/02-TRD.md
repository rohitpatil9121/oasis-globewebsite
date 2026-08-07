# TRD — Technical Requirements & Stack

## 1. System architecture

```
Customer (WhatsApp) ──▶ Meta WhatsApp Cloud API ──▶ POST /webhook/whatsapp
                                                        │
                                            AI tool-agent (agent/prompt.js
                                            + executor.js) — LIVE intake path
                                            (USE_TOOL_AGENT=true)
                                                        │
                                                        ▼
                             Backend: Node.js + Express (hosted on Render)
                                                        │
                              Supabase (PostgreSQL + Storage + RLS)
                                  ▲                            ▲
                                  │ REST /api/*  (JWT)         │ REST /api/tech/* (JWT)
                     Website (manager/owner)          Technician App
                     React + Vite + Tailwind          React + Vite + Tailwind
                     `oasis-globe/frontend/`          `technician-app/` — PWA +
                     deployed as SPA                  Capacitor Android APK
```

Notification delivery: **outbox table + worker process** (`notifications` table, `workers/notificationWorker.js`) — queued, retried, never lost. In-process queue abstraction (`queue/queue.js`) is swappable for BullMQ/SQS later.

## 2. Stack

| Layer | Technology | Notes |
|---|---|---|
| Backend | Node.js 18+ / Express | `oasis-globe/backend/`; hosted on Render |
| Database | Supabase (PostgreSQL) | Single DB for all surfaces; pgcrypto UUIDs; RLS scaffolding in `db/policies.sql` |
| File storage | Supabase Storage | Job photos (diagnosis, work-done proof), voice notes |
| WhatsApp | Meta WhatsApp Cloud API | Live bot is the **tool-agent** (webhook `USE_TOOL_AGENT=true`); templates incl. `login_otp`; mock mode (`WHATSAPP_MOCK=true`) for local dev. Twilio sandbox supported for early dev. |
| AI intake | LLM tool-agent | `agent/prompt.js` + `executor.js` — intake fixes go here, not `aiIntake.js` |
| Auth | JWT | Phone + password (manager/owner) and WhatsApp OTP (technicians) |
| Website FE | React + Vite + Tailwind | SPA; fetch wrapper `api/client.js`; AuthContext |
| Tech app FE | React + Vite + Tailwind | Mobile-first (~380–420px column); PWA manifest + service worker |
| Android build | Capacitor | `capacitor.config.json`, `build-apk.sh`; **APK API URL baked at build time** |
| Push | Web push / FCM | `docs/push-notifications-setup.md`; `lib/push.js` in tech app |
| Jobs/queue | In-process queue + worker | `npm run worker` as a separate process on Render |

## 3. Environments & config

- `backend/.env`: `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `JWT_SECRET`, `PUBLIC_BASE_URL`, WhatsApp creds, `WHATSAPP_MOCK`, `USE_TOOL_AGENT`, `MANAGER_WHATSAPP`.
- Frontend `.env`: `VITE_API_BASE` (blank locally = Vite dev proxy; production points at Render).
- **Constraint:** rebuilding the APK is required whenever the backend URL changes (baked at build time).

## 4. API surface (summary)

All `/api/*` JWT-protected except auth. RBAC via `middleware/rbac.js`.

- **Auth:** `POST /api/auth/login`, `/otp/request`, `/otp/verify`, `GET /api/auth/me`
- **Manager:** tickets CRUD/list/detail/history, `POST /:id/assign`, `PATCH /:id/status`, technicians list, customers, stock (items/issues), incentives, chat/media.
- **Technician (`/api/tech/*`, scoped to logged-in tech):** `GET /jobs` (bucketed), `GET /jobs/:id`, step endpoints `accept|reject|enroute|arrive|diagnose|estimate|estimate/send|approval|payments|close`, `GET /parts`, `GET /reviews`, `GET /notifications`, `PATCH /availability`, location ping.
- **Webhook:** `POST /webhook/whatsapp` (Meta verification + inbound). `GET /health`.

Every state-advancing endpoint appends a `ticket_events` row and enqueues **exactly one** milestone notification.

## 5. Non-functional requirements

- **Reliability:** raw-log every inbound before processing (`wa_inbound`); outbox retries with attempt counter and `last_error`.
- **Field connectivity:** tech app queues the current step submit and retries on reconnect; a diagnosis or payment is never lost to a dropped signal.
- **Performance:** mid-range Android target; lazy-load non-home routes; compress photos client-side before upload.
- **Security:** service-role key server-side only; JWT expiry; technician endpoints scoped by `assigned_technician_id`; OTP expiry; RLS phase-2.
- **Consistency:** single source of truth — a "job" in the app *is* a row in `tickets`; dashboard reflects app actions live (polling/refetch; realtime later).
- **Auditability:** every status change, assignment, and payment logged in `ticket_events` / `payments`.

## 6. Deployment

- Backend + worker: Render (web service + background worker).
- Website: static SPA (Vercel/Netlify/Render static).
- Tech app: PWA at `/tech` or `tech.` subdomain **and** Capacitor APK (`Oasis-Technician.apk`) distributed directly; same API base and auth token semantics as the website.
- Database migrations: SQL files in `db/` run in Supabase SQL editor (`setup_all.sql`, plus phase files e.g. `phase6_location.sql`).
