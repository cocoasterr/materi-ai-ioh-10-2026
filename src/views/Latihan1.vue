<script setup>
import CopyBtn from '../components/CopyBtn.vue'

const KURS = 18130
const idr = n => 'Rp' + Math.round(n).toLocaleString('en-US')

const prompt = `Role
Act as an AI API Cost Analyst specializing in Gemini, Claude, and OpenAI pricing.

Context
I want to compare AI API costs for a chatbot application based on the latest token prices from each provider.

Objective
Get a token price comparison and a chatbot cost simulation for a single conversation.

Input
- Provider: Google Gemini, Anthropic Claude, OpenAI ChatGPT.
- Model: The latest relevant API models from each provider.
- Estimated usage: 1 conversation consists of 10 interactions (user prompt + AI response).

Constraints
- Use the latest official prices from each provider's website.
- Separate Input Token and Output Token costs.
- Calculate in USD and convert to IDR.
- Account for context tokens accumulating over the conversation.
- Do not assume prices without an official source.
- Distinguish cached tokens where available.

Output
- Price comparison table per 1 million Input and Output Tokens.
- Cost breakdown for each interaction (per turn).
- Total cost simulation for 1 conversation (10 interactions).
- Cost simulation for 1,000 and 10,000 conversations.
- Conclusion: the most economical provider and model for a chatbot application.

Include calculation formulas, token assumptions, official reference sources, and the price update date.`

const stats = [['3', 'Providers'], ['9', 'Models compared'], ['10', 'Turns / conversation'], ['Rp18,130', 'USD rate (JISDOR, 6 Nov 2026)']]

const harga = [
  ['Anthropic', 'Claude Opus 5.5', 4, 0.2, 5, 20],
  ['Anthropic', 'Claude Sonnet 5.5', 2, 0.1, 2.5, 10],
  ['Anthropic', 'Claude Haiku 5.5 (≤100K)', 0.1, 0.01, 0.125, 0.5],
  ['OpenAI', 'GPT-6 Astra', 10, 1, 12.5, 50],
  ['OpenAI', 'GPT-6.1 Sol', 2, 0.1, 2.5, 10],
  ['OpenAI', 'GPT-6.1 Terra', 1, 0.05, 1.25, 5],
  ['OpenAI', 'GPT-6 Luna', 0.1, 0.01, 0.125, 0.5],
  ['Google', 'Gemini 4 Argon (promo until 30 Nov)', '2 → 4', '0.1 → 0.2', '–', '10 → 20'],
  ['Google', 'Gemini 3.8 Flash (promo until 31 Dec)', '0.75 → 1.5', '0.075 + storage', '–', '3.75 → 7.5'],
  ['Google', 'Gemini 3.5 Flash-Lite', 0.3, '0.03 + storage', '–', 2.5]
]

// Simulasi Sonnet 5.5: I(n) = 200 + 400n, output 300/turn, cache read $0.1, write $2.5
const turns = Array.from({ length: 10 }, (_, i) => {
  const n = i + 1, inp = 200 + 400 * n, out = 300 * 10 / 1e6
  const plain = inp * 2 / 1e6 + out
  const cache = (n === 1 ? inp * 2.5 : (inp - 400) * 0.1 + 400 * 2.5) / 1e6 + out
  return [n, inp, plain, cache]
})
const sum = i => turns.reduce((a, t) => a + t[i], 0)
console.assert(Math.abs(sum(2) - 0.078) < 1e-9 && Math.abs(sum(3) - 0.04248) < 1e-9)

// [model, total tanpa cache, total dengan cache] per 1 conversation (USD)
const total = [
  ['Claude Haiku 5.5', 0.0039, 0.00222, 'Claude'],
  ['GPT-6 Luna', 0.0039, 0.00222, 'OpenAI'],
  ['Gemini 3.5 Flash-Lite', 0.0147, 0.00935, 'Google'],
  ['Gemini 3.8 Flash (promo)', 0.02925, 0.01589, 'Google'],
  ['GPT-6.1 Terra', 0.039, 0.02124, 'OpenAI'],
  ['Gemini 4 Argon (promo)', 0.078, 0.04038, 'Google'],
  ['Claude Sonnet 5.5', 0.078, 0.04248, 'Claude'],
  ['GPT-6.1 Sol', 0.078, 0.04248, 'OpenAI'],
  ['Gemini 4 Argon (from 1 Dec)', 0.156, 0.08076, 'Google']
]
const max = Math.max(...total.map(t => t[2]))

const skala = [1000, 10000]

const catatan = [
  ['Claude tokenizer', 'Produces about 30% more tokens for the same text, so real Haiku cost can be ~30% above Luna.'],
  ['Haiku 5.5 100K limit', 'Price rises 5× above 100K prompt tokens. Watch this if you use RAG with large documents.'],
  ['Gemini promo', 'Argon doubles from 1 Dec 2026; 3.8 Flash doubles from 1 Jan 2027.'],
  ['Reasoning tokens', 'GPT-6.1 Sol cannot disable reasoning; reasoning tokens are billed as output.'],
  ['Not included', 'Digital services tax, minimum prompt length for caching, cache expiry, Gemini cache storage, exchange-rate fluctuation.']
]
</script>

<template>
  <div class="wrap l1">
    <header class="hero">
      <span class="pill"><span class="dot" /> Latihan 1 · AI Cost Analysis</span>
      <h1>Chatbot API Cost: <span class="grad">Gemini vs Claude vs OpenAI</span></h1>
      <p class="sub">One structured prompt (Role–Context–Objective–Input–Constraints–Output) to compare token prices and simulate chatbot costs. Prices accessed 12 November 2026.</p>
    </header>

    <div class="stats">
      <div class="stat" v-for="[v, l] in stats" :key="l"><b>{{ v }}</b><span>{{ l }}</span></div>
    </div>

    <section class="card">
      <h2>Prompt</h2>
      <div class="body">
        <div class="bar"><CopyBtn :text="prompt" label="Copy Prompt" /></div>
        <pre>{{ prompt }}</pre>
      </div>
    </section>

    <h2 class="part">Results</h2>

    <section class="card win">
      <div class="body">
        <span class="trophy">Most economical</span>
        <h3>Claude Haiku 5.5 &amp; GPT-6 Luna</h3>
        <p>Identical list prices. <b>{{ idr(0.00222 * KURS) }}</b> per conversation with cache, or about <b>{{ idr(0.00222 * KURS * 10000) }}</b> per 10,000 conversations. Roughly 4× cheaper than Gemini 3.5 Flash-Lite.</p>
      </div>
    </section>

    <section class="card">
      <h2>1. Price per 1 Million Tokens (USD)</h2>
      <div class="body scroll">
        <table>
          <thead><tr><th>Provider</th><th>Model</th><th>Input</th><th>Cache read</th><th>Cache write</th><th>Output</th></tr></thead>
          <tbody><tr v-for="r in harga" :key="r[1]"><td>{{ r[0] }}</td><td>{{ r[1] }}</td><td v-for="v in r.slice(2)" :key="v">{{ v }}</td></tr></tbody>
        </table>
      </div>
    </section>

    <section class="card">
      <h2>2. Formulas &amp; Assumptions</h2>
      <div class="body">
        <p>System prompt 500 tokens · user 100 tokens/turn · AI response 300 tokens/turn (including reasoning) · full history resent every turn.</p>
        <pre>Input at turn n  : Iₙ = S + n·U + (n−1)·R = 200 + 400n
Without cache   : Iₙ × P_in / 10⁶ + R × P_out / 10⁶
With cache      : n=1 → I₁ × P_write
                   n≥2 → Iₙ₋₁ × P_read + 400 × P_write + R × P_out</pre>
      </div>
    </section>

    <section class="card">
      <h2>3. Cost per Turn — Claude Sonnet 5.5</h2>
      <div class="body scroll">
        <table>
          <thead><tr><th>Turn</th><th>Input tokens</th><th>No cache</th><th>With cache</th></tr></thead>
          <tbody>
            <tr v-for="t in turns" :key="t[0]"><td>{{ t[0] }}</td><td>{{ t[1].toLocaleString('en-US') }}</td><td>${{ t[2].toFixed(5) }}</td><td>${{ t[3].toFixed(5) }}</td></tr>
            <tr class="sum"><td>Total</td><td>24,000</td><td>${{ sum(2).toFixed(5) }}</td><td>${{ sum(3).toFixed(5) }}</td></tr>
          </tbody>
        </table>
        <p class="note">Without cache, turn 10 costs almost 3× turn 1. With cache, cost per turn stays nearly flat.</p>
      </div>
    </section>

    <section class="card">
      <h2>4. Total per Conversation (10 Interactions, with Cache)</h2>
      <div class="body">
        <div class="chart" v-for="t in total" :key="t[0]">
          <span class="lbl">{{ t[0] }}</span>
          <span class="track"><i :class="t[3]" :style="{ width: Math.max(t[2] / max * 100, 2) + '%' }" /></span>
          <span class="val">${{ t[2] }} <small>({{ idr(t[2] * KURS) }})</small></span>
        </div>
        <div class="legend"><span class="Claude">Claude</span><span class="OpenAI">OpenAI</span><span class="Google">Google</span></div>
      </div>
    </section>

    <section class="card">
      <h2>5. Scale Simulation (with Cache)</h2>
      <div class="body scroll">
        <table>
          <thead><tr><th>Model</th><th>1 conv</th><th v-for="n in skala" :key="n">{{ n.toLocaleString('en-US') }} conv</th></tr></thead>
          <tbody>
            <tr v-for="t in total" :key="t[0]">
              <td>{{ t[0] }}</td><td>{{ idr(t[2] * KURS) }}</td>
              <td v-for="n in skala" :key="n">${{ (t[2] * n).toLocaleString('en-US', { maximumFractionDigits: 2 }) }} · {{ idr(t[2] * n * KURS) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section class="card">
      <h2>Key Notes</h2>
      <div class="body">
        <ul><li v-for="[k, v] in catatan" :key="k"><b>{{ k }}.</b> {{ v }}</li></ul>
        <p class="note">Mid-tier: Sonnet 5.5, GPT-6.1 Sol, and Gemini 4 Argon are priced the same ($2/$10). Argon is cheaper only until 30 November. Prompt caching saves ~45%.</p>
      </div>
    </section>

    <footer><RouterLink to="/">← Home</RouterLink></footer>
  </div>
</template>

<style scoped>
.hero{padding:20px 0 24px}
.pill{display:inline-flex;align-items:center;gap:8px;font-size:12px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:var(--acc);background:rgba(99,102,241,.1);border:1px solid rgba(99,102,241,.2);border-radius:999px;padding:6px 14px;margin:0 0 16px}
.dot{width:7px;height:7px;border-radius:99px;background:var(--grad)}
.hero h1{font-size:38px;line-height:1.1;margin:0 0 12px;letter-spacing:-.04em;font-weight:800}
.grad{background:var(--grad);-webkit-background-clip:text;background-clip:text;color:transparent}
.stats{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin:0 0 20px}
.stat{background:var(--card);border:1px solid var(--line);border-radius:16px;padding:14px 16px;display:flex;flex-direction:column;gap:2px}
.stat b{font-size:24px;letter-spacing:-.03em;background:var(--grad);-webkit-background-clip:text;background-clip:text;color:transparent}
.stat span{font-size:12px;color:var(--mut)}
.part{font-size:22px;margin:30px 0 14px;letter-spacing:-.03em}
.win{border-color:rgba(16,185,129,.4);background:linear-gradient(135deg,rgba(16,185,129,.1),rgba(255,255,255,.72))}
.trophy{font-size:11px;font-weight:800;letter-spacing:.08em;text-transform:uppercase;color:#fff;background:#10b981;border-radius:999px;padding:4px 12px}
.win h3{margin:10px 0 6px;font-size:22px;letter-spacing:-.02em}
.win p{margin:0}
.scroll{overflow-x:auto}
.sum td{font-weight:800;background:rgba(99,102,241,.07)}
.note{font-size:13.5px;color:var(--mut);margin:12px 0 0}
.chart{display:grid;grid-template-columns:190px 1fr 190px;gap:12px;align-items:center;padding:5px 0;font-size:13.5px}
.track{height:14px;border-radius:99px;background:rgba(100,116,139,.12);overflow:hidden}
.track i{display:block;height:100%;border-radius:99px;transition:width .6s cubic-bezier(.2,.8,.2,1)}
.val small{color:var(--mut)}
.Claude{background:#f59e0b}.OpenAI{background:#10b981}.Google{background:#6366f1}
.legend{display:flex;gap:14px;margin-top:12px;font-size:12px;font-weight:700}
.legend span{background:none;color:var(--mut);display:inline-flex;align-items:center;gap:6px}
.legend span::before{content:"";width:10px;height:10px;border-radius:99px;background:inherit}
.legend .Claude::before{background:#f59e0b}.legend .OpenAI::before{background:#10b981}.legend .Google::before{background:#6366f1}
@media (max-width:760px){.stats{grid-template-columns:repeat(2,1fr)}.hero h1{font-size:28px}.chart{grid-template-columns:1fr}}
</style>
