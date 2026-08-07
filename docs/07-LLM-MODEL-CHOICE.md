# 07 — LLM Model Choice: `openai/gpt-oss-120b`

**Status:** Active
**Decision date:** 2 August 2026
**Applies to:** WhatsApp intake agent (`backend/src/services/agent/`)

---

## 1. Summary

The WhatsApp intake agent runs on **`openai/gpt-oss-120b`**, an open-weight
117B-parameter Mixture-of-Experts model from OpenAI, served through **Groq**
(primary, when its paid tier is available) and **OpenRouter** (currently primary).

The decision rests on four requirements specific to this system, in priority order:

1. **Reliable multi-step tool calling** — the agent has 12 tools and must chain them
2. **Multilingual** — English, Hindi and Marathi in the same conversation
3. **Low cost** — a single-location service business, not a funded product
4. **No vendor lock-in** — the model must be available from more than one provider

Requirement 4 is the one that separates this model from every closed alternative,
and it has already paid for itself once (see §5).

---

## 2. What the model actually has to do

This is not a chatbot. Per one customer message the model must:

- Decide which of five flows applies (new request / status / FAQ / complaint / reschedule-cancel)
- Call the right tools from a set of 12 (`backend/src/services/agent/tools.js`)
- Chain them correctly — e.g. `identify_customer` → `create_or_get_request` →
  `update_request` → `submit_request`
- Follow a ~175-line system prompt with strict negative constraints
  ("never invent a technician name", "never quote a price", "never re-ask for a
  saved field")
- Reply in the customer's language, in short operational Indian English

A model that is merely *fluent* fails here. The binding constraint is **function-calling
accuracy under a long instruction set**, not prose quality.

---

## 3. Why `gpt-oss-120b`

### 3.1 Tool calling is a first-class capability

The model was built for agentic use — it supports **native tool use, function calling,
structured output, and configurable reasoning depth**, and demonstrates strong
function-calling performance on the Tau-Bench Retail benchmark, which specifically
measures multi-turn tool use in a customer-service setting. That is close to a direct
analogue of this workload.

Fireworks' evaluation describes both gpt-oss models as *"very strong reasoning models
that excel at problem solving and tool calling."*

### 3.2 Reasoning quality is well above its price class

- **90% on MMLU** (general knowledge and reasoning)
- **Surpasses OpenAI o3-mini and approaches o4-mini** on accuracy

We are paying open-model prices for near-o4-mini instruction-following. That matters
because our system prompt is long and rule-dense — a weaker model drifts and starts
inventing prices or re-asking for the customer's name.

### 3.3 Context window is sufficient

131K tokens. Our worst-case payload is roughly 4,300 tokens (system prompt + 12 tool
definitions) plus 12 turns of history — under 10K. We are using **less than 8%** of the
window, so there is no truncation risk and plenty of headroom if the prompt grows.

### 3.4 Multilingual

Handles English, Hindi and Marathi in the same conversation, including Devanagari
input, which the system prompt explicitly requires
(`backend/src/services/agent/prompt.js`).

---

## 4. Cost comparison — using our real numbers

Measured from the live agent loop:

| Metric | Value |
|---|---|
| Fixed payload per LLM call | ~4,300 tokens (2,700 prompt + 1,600 tool defs) |
| LLM calls per customer message | up to 3 (`MAX_STEPS`) |
| Messages per completed request | ~5 |
| **Input tokens per completed request** | **~90,000** |
| **Output tokens per completed request** | **~3,000** |

At **1,000 completed requests/month** = 90M input + 3M output tokens:

| Model | Input $/M | Output $/M | **Monthly cost** | vs. our choice |
|---|---|---|---|---|
| **gpt-oss-120b** (OpenRouter) | **$0.03** | **$0.17** | **~$3.21** | — |
| GPT-4o-mini | $0.15 | $0.60 | ~$15.30 | **4.8x** |
| Gemini 2.5 Flash | $0.30 | $2.50 | ~$34.50 | **10.7x** |
| Claude Haiku 4.5 | $1.00 | $5.00 | ~$105.00 | **32.7x** |

All four prices are vendor-published (sources in §8). The spread is wider than the
headline per-token numbers suggest because intake is **input-heavy** — a long prompt
and a short reply — and that is exactly where the gap is largest. Independent analysis
puts gpt-oss-120b at ~4.7x cheaper than Gemini 2.5 Flash on a blended 3:1 mix; on our
30:1 mix it is ~10.7x.

**On capability, the gap does not justify the spread.** Against Gemini 2.5 Flash the
published comparison is *"both models are evenly matched across the benchmarks"* —
its wins are a 1M context window and multimodal input, and we use 8% of a 131K window
and handle images on a separate path. Neither applies to us.

**Claude Haiku 4.5 is the strongest of the alternatives on capability** — excellent
multi-step tool calling and strong Hindi/Marathi handling, both of which are our top
two requirements, and its 200K context is more than sufficient. It is not rejected on
quality. It is rejected on §5: closed weights, single vendor, and 32x the cost for a
capability advantage we cannot measure on a 12-tool WhatsApp intake flow.

---

## 5. The decisive factor: no vendor lock-in

`gpt-oss-120b` is **open-weight**, so it is served by many independent providers —
Groq, OpenRouter (17+ upstream providers), Fireworks, DeepInfra, and others. Prices
vary slightly by provider ($0.03–$0.04 input, $0.17–$0.19 output), which means we can
shop on price and latency without changing the model.

**This is not theoretical. It happened on 2 August 2026:**

Groq's paid Developer tier was closed to new signups
("temporarily unavailable due to high demand"), leaving us stuck on the free 8,000
tokens/minute tier — a tier our ~15–20K-tokens-per-message workload structurally
cannot fit inside. Every message was hitting a rate limit and falling into a retry
path that took **minutes**.

Because the model is multi-provider, the fix was:

```
LLM_PRIMARY=openrouter
OPENROUTER_MODEL=openai/gpt-oss-120b
```

**Two environment variables. Same model, same prompt, same 12 tool definitions, same
behaviour, zero code changes, zero re-testing of agent logic.**

Had we built on a closed model, that outage would have meant a provider migration:
new SDK, re-tuned prompt, re-validated tool-calling behaviour, and days of work — in
the middle of a live customer-facing outage.

**We are buying a capability, not a vendor.** That optionality is the single strongest
argument for this choice, and it is only available with an open-weight model.

---

## 6. Alternatives considered and rejected

| Option | Why rejected |
|---|---|
| **`gpt-oss-20b`** | Same family, weaker reasoning. Was our OpenRouter fallback on the `:free` route; the free tier is queued and slow, and the smaller model was less reliable at chaining our 12 tools. Kept only as an emergency fallback. |
| **Claude Haiku 4.5** | The best alternative on merit — excellent tool calling, strong Hindi/Marathi, 200K context. Rejected on cost and lock-in only: **32.7x** our spend ($105/mo vs $3.21), closed weights, single vendor. Revisit if intake accuracy ever becomes the binding constraint instead of cost. |
| **Gemini 2.5 Flash** | **10.7x** our cost, evenly matched on benchmarks, single-vendor. Its wins (1M context, multimodal) are irrelevant to us. |
| **GPT-4o-mini** | **4.8x** cost, closed weights, single vendor. The cheapest closed option, with no tool-calling advantage at this level — and still fails requirement 4. |
| **Self-hosting gpt-oss-120b** | A 117B MoE model needs serious GPU hardware. Nonsensical at ~$3/month of API spend. |

---

## 7. Current configuration

| Variable | Value | Notes |
|---|---|---|
| `GROQ_MODEL` | `openai/gpt-oss-120b` | Fallback while Groq is on the free tier |
| `OPENROUTER_MODEL` | `openai/gpt-oss-120b` | Paid route — no `:free` suffix |
| `LLM_PRIMARY` | `openrouter` | Flip to `groq` when the Developer tier reopens |

**Review trigger:** re-open this decision when Groq's Developer tier becomes available
(Groq is meaningfully faster than most OpenRouter routes), or if monthly spend exceeds
$25 — which at current rates means traffic has grown ~8x and the token-trimming work
in the agent prompt should be done first.

---

## 8. Sources

- [OpenRouter — gpt-oss-120b pricing & benchmarks](https://openrouter.ai/openai/gpt-oss-120b)
- [Fireworks AI — OpenAI gpt-oss 20b & 120b: overview & benchmarking](https://fireworks.ai/blog/openai-gpt-oss)
- [SmythOS — gpt-oss-120b and 20b: speed, accuracy, real results](https://smythos.com/developers/ai-models/openai-gpt-oss-120b-and-20b-speed-accuracy-and-real-results/)
- [LLM-Stats — Gemini 2.5 Flash vs GPT-OSS-120B](https://llm-stats.com/models/compare/gemini-2.5-flash-vs-gpt-oss-120b)
- [GPT-OSS-120B provider pricing comparison](https://pricepertoken.com/pricing-page/model/openai-gpt-oss-120b)
- [Groq — rate limits](https://console.groq.com/docs/rate-limits)
- [OpenAI — GPT-4o mini pricing announcement](https://openai.com/index/gpt-4o-mini-advancing-cost-efficient-intelligence/) ($0.15 / $0.60)
- [OpenAI — API pricing](https://developers.openai.com/api/docs/pricing)
- Anthropic — Claude model pricing ($1.00 / $5.00 for Claude Haiku 4.5, 200K context)
