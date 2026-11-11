<script setup>
import CopyBtn from '../components/CopyBtn.vue'
import { sections, findings, stakeholders, prompt } from './prompt-sesi-3.js'
</script>

<template>
  <div class="wrap">
    <h1>Example Case Sesi 3 — Stakeholder Interview Questions</h1>
    <p class="sub">Prompt siap pakai — klik <b>Copy Prompt</b>, tempel ke ChatGPT / Claude / Gemini.</p>

    <div class="bar"><CopyBtn :text="prompt" label="Copy Prompt" /></div>

    <section class="card" v-for="[k, v] in sections" :key="k">
      <h2>{{ k }}</h2>
      <div class="body"><pre>{{ v }}</pre></div>
    </section>

    <section class="card">
      <h2>Ringkasan Temuan BRD</h2>
      <div class="body"><ol><li v-for="f in findings" :key="f">{{ f }}</li></ol></div>
    </section>

    <section class="card">
      <h2>Stakeholder</h2>
      <div class="body">
        <table>
          <thead><tr><th>Stakeholder</th><th>Peran</th></tr></thead>
          <tbody><tr v-for="[n, d] in stakeholders" :key="n"><td>{{ n }}</td><td>{{ d }}</td></tr></tbody>
        </table>
      </div>
    </section>

    <footer>
      <RouterLink to="/example-case-sesi-4">Sesi 4 →</RouterLink> ·
      <RouterLink to="/example-case-sesi-4-1">Sesi 4.1 →</RouterLink>
    </footer>
  </div>
</template>
