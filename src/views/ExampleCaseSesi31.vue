<script setup>
import CopyBtn from '../components/CopyBtn.vue'
import { sections, notes, outputs, prompt } from './prompt-sesi-3-1.js'
</script>

<template>
  <div class="wrap">
    <h1>Example Case Sesi 3.1 — Notulen Interview → Requirement &amp; KPI</h1>
    <p class="sub">Prompt siap pakai — klik <b>Copy Prompt</b>, tempel ke ChatGPT / Claude / Gemini.</p>

    <div class="bar"><CopyBtn :text="prompt" label="📋 Copy Prompt" /></div>

    <section class="card" v-for="[k, v] in sections" :key="k">
      <h2>{{ k }}</h2>
      <div class="body"><pre>{{ v }}</pre></div>
    </section>

    <section class="card">
      <h2>Notulen Interview (ringkas)</h2>
      <div class="body">
        <table>
          <thead><tr><th style="width:170px">Stakeholder</th><th>Kutipan</th></tr></thead>
          <tbody><tr v-for="[n, q] in notes" :key="n"><td>{{ n }}</td><td>“{{ q }}”</td></tr></tbody>
        </table>
      </div>
    </section>

    <section class="card">
      <h2>Output yang Diminta</h2>
      <div class="body"><ol><li v-for="o in outputs" :key="o" v-html="o" /></ol></div>
    </section>

    <footer>
      <RouterLink to="/example-case-sesi-3">← Sesi 3</RouterLink> ·
      <RouterLink to="/example-case-sesi-4">Sesi 4 →</RouterLink> ·
      <RouterLink to="/example-case-sesi-4-1">Sesi 4.1 →</RouterLink>
    </footer>
  </div>
</template>
