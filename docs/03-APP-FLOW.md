# App Flow — Every Screen, Every State

Covers all three interactive surfaces: **Technician App**, **Website (manager/owner)**, and the **WhatsApp customer flow** (message states).

---

## A. Technician App (`technician-app/src/screens/`)

### A1. Login (`Login.jsx`)
| State | UI | Transition |
|---|---|---|
| Phone entry | Brand header, mobile input, **Send OTP** | valid phone → OTP sent (WhatsApp `login_otp` template) |
| OTP entry | 6-box `OtpInput`, resend timer | correct OTP → JWT stored → Home |
| Error | inline message | wrong OTP / expired → re-prompt; unknown phone → "contact Service Manager" |
| Demo | **Demo Login (Prototype)** button | bypass → Home with mock data |

### A2. Home / Today (`Home.jsx`)
- **Top bar:** date, technician name + ⭐rating, **Online/Offline toggle**, connection indicator, notification bell (unread dot).
- **Hero:** greeting + stat tiles **Pending / Today / Done today**.
- **Sections (each may be empty with an empty-state line):**
  1. Pending from previous days
  2. Today's jobs
  3. Completed today ("None closed yet today")
  4. Repeat calls within 10 days (banner: no charge in window)
  5. Escalations (View escalations →)
- **Job card:** customer + status badge · area/time · issue · model · tags (No AMC / AMC Active / Warranty / High Priority / Urgent / Payment Pending / Repeat / Senior Citizen) · visit charge (₹250 / Free) · actions **Call / Maps / Open**.
- **Pull-to-refresh** (`PullRefresh.jsx`). Offline: cached list + banner.

### A3. Job detail + workflow (`JobDetail.jsx`) — the core state machine
Persistent header: customer, job id, model, live status pill. Horizontal stepper with green checks. Always-visible cards: address (Call / Maps) and issue + model + last-service date. Sticky bottom primary button per step.

| # | Step | Status after | Screen contents | Guard / alternate branch |
|---|---|---|---|---|
| 1 | Accept | `ACCEPTED` | Job summary + **Accept Job** (confirm dialog) / Reject | Reject → job returns to manager, exits flow |
| 2 | Travel | `ON_THE_WAY` | **I'm On The Way** → customer gets ETA msg; live location pings start | — |
| 3 | Arrive | `ARRIVED` | **Mark Arrived** captures GPS lat/lng + time | GPS permission denied → explain + retry; **diagnosis blocked until arrived** |
| 4 | Diagnose | `DIAGNOSED` | Multi-select issue chips (required) · **Input/Output TDS** (required) · parts picker (brand-first, from catalog) · photo slots Before/Damage/Old Part · note + voice note · **Submit Diagnosis** | TDS missing → cannot submit |
| 5 | Estimate | `ESTIMATE_SENT` | Charge type radio (Service ₹400 / Visit ₹250 / Warranty Free / Repeat Free — fixed) · parts with editable prices · bill summary · **Send Estimate for Approval** | exactly one charge type |
| 6 | Approval | `VERIFIED` or rejected branch | Channel: **WhatsApp (customer OTP-verifies)** or **Service Manager**; buttons Approved / Rejected | **Rejected → skip 7, collect visit charge only at step 8** |
| 7 | Work Done | `WORK_DONE` | **Final output TDS** (required) with before→after display · photos: new part installed + old part removed (per part, required) · **Confirm Work Done** | skipped on rejected branch |
| 8 | Payment | `PAID` | Bill recap · Collected vs Remaining · add payment (UPI with **QR card** / Cash / Card), split allowed · reconciliation list · **Confirm Payment** enabled at ₹0 remaining | remaining > 0 → confirm disabled |
| 9 | Complete | `CLOSED` | Summary (issue, amount, modes, final TDS, next-service interval) · **Create a lead?** toggle · **Close Job** → success screen with incentive note · CTAs Back to Jobs / My Reviews | — |

Every advance: timestamp column set, `ticket_events` appended, exactly one WhatsApp milestone message enqueued, dashboard reflects live. Offline: submit queued, retried on reconnect.

### A4. Earnings (`Earnings.jsx`)
Incentive summary per period: Kent/Aqua slab (6%→10%), Oasis margin (−18% GST), job list with per-job contribution. Read-only; server-computed (`incentives.js`).

### A5. Reviews (`Reviews.jsx`)
Average ⭐ + tiles (This Week / Jobs Rated / 5★) · streak vs needs-improvement cards · per-category scores (polite, first-time fix, on-time, done properly, communication) · recent feedback list · rating-growth nudge.

### A6. Help & Support
Contacts (Service Manager, Office, tap-to-call) · Emergency banner · collapsible Common Issue Guide (Low Flow, Bad Taste, Leakage, No Water) · "What to say to customer" script playbook.

### A7. Notifications
Bell → feed of assignments / approvals / reminders. Tap → job detail.

---

## B. Website (`oasis-globe/frontend/src/pages/`)

### B1. Login (`Login.jsx`)
Phone + password tab **or** OTP tab → JWT → Dashboard. Error: invalid credentials inline.

### B2. Dashboard (`Dashboard.jsx`) — live dispatch board
Tickets bucketed by status (`boardBucket.js`): New · Assigned · On the way · Arrived · In progress · Awaiting approval · Paid · Closed. Live refresh. Filters by status/technician. Row → Ticket view. **New Ticket** modal for manual/phone intake. Notification bell.

### B3. Inbox (`Inbox.jsx`)
WhatsApp conversation list + `ChatPanel` (messages, `MediaBubble` for images/audio). Actions: reply, create ticket from conversation, open linked ticket.

### B4. Ticket view (`TicketView.jsx`)
Full ticket detail: customer card (edit modal), status pill + timeline of `ticket_events`, assignment (`AssignModal` — technician picker + slot via `ScheduleModal`), estimate approval on customer's behalf, payments + `ReconcileModal`, stock issue (`IssueStockModal`), cancel (`CancelModal`), rating display.

### B5. Customers (`Customers.jsx` / `CustomerView.jsx`)
Search/list → profile: contact, address, ticket history, ratings given, warranty/AMC context.

### B6. Technicians (`Technicians.jsx` / `TechnicianView.jsx`)
List with availability (online/offline) → per-technician dashboard: today's jobs, live location (phase 6), ratings, chat (`TechnicianChatPanel`).

### B7. Stock (`Stock.jsx`)
Parts catalog (`stock_items`), issue stock to technicians, movement history.

### B8. Incentives (`Incentives.jsx`)
Per-technician incentive computation by period (same rules as app Earnings), review/adjust.

---

## C. WhatsApp customer flow (message states)

```
inbound "hi" → raw-logged (wa_inbound) → tool-agent intake
  collects: name → phone ("same" = sender) → address → issue
  each field re-prompts until valid; "restart"/"cancel" resets
  all 4 valid → ticket OG-#### created → confirmation message
outside intake: "status"/"track" → latest ticket status + technician
milestones (one message each): assigned (name+⭐) → on the way (ETA)
  → arrived → estimate (approve via OTP / YES-NO) → payment → done + feedback
```
