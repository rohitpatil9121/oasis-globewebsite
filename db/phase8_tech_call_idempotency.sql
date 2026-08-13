-- Idempotency for technician-raised calls ("New Call" in the app).
--
-- Why: the app now parks a New Call in its offline outbox when the phone has no
-- signal and replays it later. A replay is not only the offline case — the
-- request can reach the server and have its RESPONSE dropped on the way back,
-- which on one bar of signal is routine. The outbox, having seen no answer,
-- sends it again. Without a key to recognise the repeat, that second attempt
-- creates a SECOND ticket: two rows in the office queue, two manager alerts,
-- and a second "we've received your request" WhatsApp to a customer who only
-- ever asked once.
--
-- Every other technician write already survives this — steps, photos and the
-- arrival code carry a client_id that the backend remembers in
-- tech_work.applied_client_ids. A new call cannot use that: there is no ticket
-- yet to hold the list. So the id lives on the ticket the call creates.
--
-- The unique index is what actually enforces it. The service also looks the
-- client_id up before inserting, but two replays arriving at the same instant
-- both find nothing; the index is the one that then refuses the loser, and the
-- service turns that refusal into "here is the ticket you already made".
--
-- Apply this BEFORE deploying the backend that sends client_id.

alter table tickets add column if not exists client_id text;

-- Partial: every ticket raised from the dashboard or WhatsApp has a null
-- client_id, and nulls must not collide with each other.
create unique index if not exists idx_tickets_client_id
  on tickets (client_id) where client_id is not null;
