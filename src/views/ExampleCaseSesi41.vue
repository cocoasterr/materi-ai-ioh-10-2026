<script setup>
import CopyBtn from '../components/CopyBtn.vue'
import { brd, dataRekon, cols, rows, tools, toText, toTextWithData } from './prompt-sesi-4-1.js'
</script>

<template>
  <div class="wrap">
    <h1>Example Case Sesi 4.1 — Multi-Tool Prompt Chain</h1>
    <p class="sub">Alur: <b>Gemini (riset)</b> → <b>ChatGPT (analisis data)</b> → <b>Claude (ringkasan keputusan)</b>. Salin prompt satu per satu.</p>

    <section class="card">
      <h2>Data Dummy — BRD PR-05</h2>
      <div class="body">
        <pre>{{ brd }}</pre>
        <div class="bar"><CopyBtn :text="brd" label="📋 Copy BRD" /></div>
      </div>
    </section>

    <section class="card">
      <h2>Data Dummy — Rekonsiliasi 3 Bulan Terakhir</h2>
      <div class="body">
        <table>
          <thead><tr><th v-for="c in cols" :key="c">{{ c }}</th></tr></thead>
          <tbody>
            <tr v-for="r in rows" :key="r[0]"><td v-for="(c, i) in r" :key="i">{{ c }}</td></tr>
          </tbody>
        </table>
        <p>Data biaya: biaya kerja <b>Rp1,5 juta</b> per staf per hari.</p>
        <div class="bar"><CopyBtn :text="dataRekon" label="📋 Copy Data" /></div>
      </div>
    </section>

    <section class="card" v-for="(t, i) in tools" :key="t.tool">
      <h2>Langkah {{ i + 1 }} — {{ t.tool }} · {{ t.tag }}</h2>
      <div class="body">
        <dl class="fields">
          <template v-for="[k, v] in t.fields" :key="k">
            <dt>{{ k }}</dt><dd>{{ v }}</dd>
          </template>
        </dl>
        <p class="note">💡 {{ t.note }} Atau pakai tombol <b>Copy + Data Dummy</b> agar Input langsung terisi.</p>
        <div class="bar">
          <CopyBtn :text="toText(t)" label="📋 Copy Prompt Saja" />
          <CopyBtn :text="toTextWithData(t)" label="📎 Copy + Data Dummy" :primary="false" />
        </div>
      </div>
    </section>

    <footer><RouterLink to="/example-case-sesi-4">← Kembali ke Sesi 4</RouterLink></footer>
  </div>
</template>

<style scoped>
.fields { display: grid; grid-template-columns: 110px 1fr; gap: 8px 14px; margin: 0 }
dt { font-weight: 600; color: var(--acc) }
dd { margin: 0 }
.note { background: #fef9c3; border: 1px solid #fde68a; border-radius: 8px; padding: 10px 12px; font-size: 14px; margin: 16px 0 0 }
@media (max-width: 560px) { .fields { grid-template-columns: 1fr; gap: 2px 0 } dd { margin-bottom: 10px } }
</style>
