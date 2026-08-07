# Post 2 — English (just-finished version, ~2 weeks later)

---

Handed over a project last week and I keep thinking about one conversation from the middle of it.

I was building a service platform for a small water purifier service centre - WhatsApp bot for customers, a dispatch dashboard for the manager, an Android app for technicians. I'd designed all these helpful notifications. Reminders, confirmations, follow-ups.

The owner stopped me and said: one message per step. That's it. Spam my customers and they block the number, and then I've lost them forever.

That one sentence turned into the best architecture decision in the project. Every notification now goes through an outbox table with a worker that retries failures and guarantees exactly one delivery per milestone. Not because I read it in a system design blog - because a guy who's serviced ROs for 15 years knows his customers better than I do.

What got shipped: customer messages on WhatsApp, an AI bot creates a ticket, the manager assigns from a live board, and the technician runs the entire job from an app - GPS proof on arrival, TDS readings, photos of old and new parts, and the customer approves the estimate on WhatsApp before any paid work starts. No surprise bills, ever. That was the owner's other non-negotiable.

The decision I'm most confident about: every incoming message gets written to a raw log table before any processing touches it. My AI intake broke more than once during testing. The inquiries survived every time.

If you're building for small businesses - WhatsApp is the app, don't make customers install anything. Log first, process later. And the client's weird non-negotiable rule is usually the most important requirement in the project.

Built solo, end to end - Node, Supabase, Meta's WhatsApp API, React. It's live now with real customers, and I'll share what breaks and what holds up. Taking on new projects, DMs open.

---

## First comment

The estimate approval flow is the part I'd nerd out about - estimate goes to the customer on WhatsApp, they verify with an OTP, and only then does the technician's app unlock the work step. Rejected estimate = visit charge only, nothing else. Curious to see how it performs against billing disputes over the next few months.

#freelancing #nodejs #supabase #whatsappapi #systemdesign
