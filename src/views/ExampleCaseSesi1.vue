<script setup>
import CopyBtn from '../components/CopyBtn.vue'
import { sections, brd, fsd, issueTypes, verdicts, prompt } from './prompt-sesi-1.js'
</script>

<template>
  <div class="wrap">
    <h1>Example Case Sesi 1 — Review Kualitas BRD &amp; FSD</h1>
    <p class="sub">Prompt siap pakai — klik <b>Copy Prompt</b>, tempel ke ChatGPT / Claude / Gemini.</p>

    <div class="bar"><CopyBtn :text="prompt" label="Copy Prompt" /></div>

    <section class="card" v-for="[k, v] in sections" :key="k">
      <h2>{{ k }}</h2>
      <div class="body"><pre>{{ v }}</pre></div>
    </section>

    <section class="card">
      <h2>Dokumen PR-01 — Dashboard Kampanye Digital</h2>
      <div class="body two">
        <div>
          <pre>{{ brd }}</pre>
          <div class="bar"><CopyBtn :text="brd" label="Copy BRD" :primary="false" /></div>
        </div>
        <div>
          <pre>{{ fsd }}</pre>
          <div class="bar"><CopyBtn :text="fsd" label="Copy FSD" :primary="false" /></div>
        </div>
      </div>
    </section>

    <section class="card">
      <h2>Format Output</h2>
      <div class="body">
        <table>
          <thead><tr><th>Finding</th><th>Section</th><th>Issue Type</th><th>Impact</th><th>Suggested Fix</th></tr></thead>
          <tbody><tr><td colspan="5" class="mut">… diisi oleh AI</td></tr></tbody>
        </table>
        <p>Issue Type: <b>{{ issueTypes.join(' / ') }}</b></p>
        <p>Verdict akhir: <b>{{ verdicts.join(' / ') }}</b></p>
      </div>
    </section>

    <footer>
      <RouterLink to="/example-case-sesi-3">Sesi 3 →</RouterLink> ·
      <RouterLink to="/example-case-sesi-3-1">Sesi 3.1 →</RouterLink> ·
      <RouterLink to="/example-case-sesi-4">Sesi 4 →</RouterLink> ·
      <RouterLink to="/example-case-sesi-4-1">Sesi 4.1 →</RouterLink>
    </footer>
  </div>
</template>

<style scoped>
.two { display: grid; grid-template-columns: 1fr 1fr; gap: 20px }
.mut { color: var(--mut) }
@media (max-width: 720px) { .two { grid-template-columns: 1fr } }
</style>
