<script setup>
import { ref } from 'vue'
import { prompt, sections, cols, rows, outputs } from './prompt-sesi-4.js'

const copied = ref(false)

async function copy() {
  try {
    await navigator.clipboard.writeText(prompt)
  } catch {
    const t = document.createElement('textarea')
    t.value = prompt
    document.body.append(t); t.select(); document.execCommand('copy'); t.remove()
  }
  copied.value = true
  setTimeout(() => (copied.value = false), 1800)
}

function download() {
  const a = document.createElement('a')
  a.href = URL.createObjectURL(new Blob([prompt], { type: 'text/plain' }))
  a.download = 'prompt-review-brd-rekonsiliasi.txt'
  a.click()
  URL.revokeObjectURL(a.href)
}
</script>

<template>
  <div class="wrap">
    <h1>Example Case Sesi 4 — Review BRD Otomasi Rekonsiliasi</h1>
    <p class="sub">Prompt siap pakai — klik <b>Copy Prompt</b>, tempel ke ChatGPT / Claude / Gemini.</p>

    <div class="bar">
      <button class="primary" :class="{ done: copied }" @click="copy">
        {{ copied ? '✅ Tersalin!' : '📋 Copy Prompt' }}
      </button>
      <button @click="download">⬇ Download .txt</button>
      <button @click="print()">🖨 Print / PDF</button>
    </div>

    <section class="card" v-for="s in sections" :key="s.h">
      <h2>{{ s.h }}</h2>
      <div class="body"><pre>{{ s.text }}</pre></div>
    </section>

    <section class="card">
      <h2>Data Rekonsiliasi 3 Bulan Terakhir</h2>
      <div class="body">
        <table>
          <thead><tr><th v-for="c in cols" :key="c">{{ c }}</th></tr></thead>
          <tbody>
            <tr v-for="r in rows" :key="r[0]"><td v-for="(c, i) in r" :key="i">{{ c }}</td></tr>
          </tbody>
        </table>
        <p>Data biaya: biaya kerja <b>Rp1,5 juta</b> per staf per hari.</p>
      </div>
    </section>

    <section class="card">
      <h2>Output yang Diminta</h2>
      <div class="body"><ol><li v-for="o in outputs" :key="o" v-html="o" /></ol></div>
    </section>

    <footer>Vue 3 + Vite + vue-router — deploy otomatis via Vercel.</footer>
  </div>
</template>
