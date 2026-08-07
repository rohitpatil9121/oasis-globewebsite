# Post — English + Hindi mix (FINAL)

---

Handed over a project last week, aur ek conversation abhi tak dimaag se nahi ja rahi.

I was building a service platform for a small water purifier service centre - WhatsApp bot for customers, a dispatch dashboard for the manager, an Android app for technicians. I'd designed all these helpful notifications. Reminders, confirmations, follow-ups. Full excitement mein tha.

The owner stopped me and said: **"Ek step pe ek message. Bas."** Uska reason maine socha bhi nahi tha - zyada messages bhejoge toh customer confuse ho ke office pe call karega "ye kya aaya hai?" - aur mera aadmi phone uthane mein busy ho jayega, kaam karne mein nahi.

That one line became the best architecture decision in the project. Every notification now goes through an outbox table with a worker that retries failures and guarantees exactly one delivery per milestone. Ye kisi system design blog se nahi seekha - a guy who's serviced ROs for 15 years knows his business better than I do.

What got shipped: customer messages on WhatsApp, an AI bot creates a ticket, manager assigns from a live board, and the technician runs the entire job from an app - GPS proof on arrival, TDS readings, photos of old and new parts, and the customer approves the estimate on WhatsApp **before** any paid work starts. Surprise bill? Kabhi nahi. That was the owner's other non-negotiable.

The decision I'm most confident about: every incoming message gets written to a raw log table before any processing touches it. My AI intake broke more than once during testing. Par inquiry har baar bach gayi.

If you're building for small businesses, teen cheezein yaad rakho - WhatsApp IS the app, don't make customers install anything. Log first, process later. And the client's weird non-negotiable rule? Wahi actually sabse important requirement hoti hai.

Built solo, end to end - Node, Supabase, Meta's WhatsApp API, React. It's live now with real customers - kya tootega, kya tikega, that too I'll share.

Taking on new projects. DM karo, baat karte hain.

---

## First comment (post ke turant baad paste karo)

Stack ke baare mein poochne walon ke liye - Node + Express backend on Render, Supabase Postgres, Meta WhatsApp Cloud API, React dashboard, technician app Capacitor se APK. Intake AI agent free-form Hindi/English dono samajh leta hai. Estimate approval flow sabse interesting part hai - customer WhatsApp pe OTP se verify karta hai, tabhi technician ka app "start work" unlock karta hai. Kuch bhi puchna ho, puch lo.

#freelancing #nodejs #supabase #whatsappapi #react
