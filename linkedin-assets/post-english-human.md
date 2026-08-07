# Post 2 — English (human version, post ~2 weeks later)

---

A water purifier service centre owner told me something 6 months ago that ended up designing an entire system for me.

I was showing him the notification flow for the platform I was building - WhatsApp bot for customers, dashboard for his manager, an app for technicians. I'd planned all these helpful messages. Reminders, confirmations, follow-ups.

He stopped me and said: one message per step. That's it. If you spam my customers they'll block the number and I lose them forever.

That one sentence forced the best architecture decision in the project. Every notification goes through an outbox table with a worker that retries failures and guarantees exactly-once delivery. Not because I read it in a system design blog. Because a guy who's been servicing ROs for 15 years knows his customers better than I do.

The system's been live for a few months now. Customer messages on WhatsApp, bot creates a ticket, manager assigns from a live board, technician runs the whole job from an app - GPS proof on arrival, TDS readings, photos of old and new parts, and the customer approves the estimate on WhatsApp before any paid work starts.

The thing I'm most proud of isn't the code. It's that nothing gets lost anymore. Every single message is logged before any processing touches it, so even when my AI intake broke in the early days (it did, more than once), the inquiry survived.

Some things I'd tell anyone building for small businesses: WhatsApp is the app, don't make customers install anything. Log first, process later. And the client's weird non-negotiable rule is usually the most important requirement in the whole project.

Built solo as a freelancer - Node, Supabase, Meta's WhatsApp API, React. Taking on new projects, DMs open.

---

## First comment (post along with it)

For anyone asking about the approval flow since it's the most interesting part - the estimate goes to the customer on WhatsApp, they verify with an OTP, and only then does the technician's app unlock the "start work" step. Rejected estimate means visit charge only. Zero billing disputes since launch.

#freelancing #nodejs #supabase #whatsappapi #systemdesign
