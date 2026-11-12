<script setup>
import { ref, computed } from 'vue'
import CopyBtn from '../components/CopyBtn.vue'

const os = ref('windows')
const win = computed(() => os.value === 'windows')
const home = computed(() => (win.value ? '%USERPROFILE%\\demo-telco-agent' : '~/demo-telco-agent'))
// ponytail: cmd tanpa heredoc, pakai blok echo; karakter khusus di luar tanda kutip di-escape dengan ^. Belum menangani %, tambahkan jika dibutuhkan
const esc = l => l.split('"').map((p, i) => (i % 2 ? p : p.replace(/[&|<>()^]/g, '^$&'))).join('"')
const file = (path, body) => win.value
  ? `(\n${body.split('\n').map(l => l ? 'echo ' + esc(l) : 'echo.').join('\n')}\n) > ${path.replaceAll('/', '\\')}`
  : `cat > ${path} << 'EOF'\n${body}\nEOF`

const csv = {
  pelanggan: `msisdn,nama,paket,kuota_gb,pemakaian_gb,tagihan_bulan_lalu,tagihan_bulan_ini,lokasi
081211110001,Andi,Internet 25GB,25,31.5,150000,287000,Bekasi Barat
081211110002,Sari,Internet 50GB,50,18.2,220000,220000,Depok
081211110003,Budi,Unlimited Basic,999,120.4,300000,300000,Bekasi Barat`,
  jaringan: `site_id,lokasi,status,utilisasi_persen,keterangan
BKS-012,Bekasi Barat,DEGRADED,94,Kepadatan tinggi jam 19-23
DPK-004,Depok,NORMAL,61,-
JKT-101,Jakarta Selatan,MAINTENANCE,0,Perbaikan perangkat s/d 14 Nov`,
  paket: `nama_paket,kuota_gb,harga,keterangan
Internet 25GB,25,150000,Kelebihan pemakaian Rp20.000/GB
Internet 50GB,50,220000,Kelebihan pemakaian Rp15.000/GB
Internet 75GB,75,280000,Bonus 10GB malam
Unlimited Basic,999,300000,FUP 100GB lalu turun ke 2Mbps`
}
const preview = Object.entries(csv).map(([n, c]) => [n + '.csv', c.split('\n').map(r => r.split(','))])

const setup = computed(() => `${win.value
  ? 'mkdir "%USERPROFILE%\\demo-telco-agent\\.agents\\agents" "%USERPROFILE%\\demo-telco-agent\\data"\ncd /d "%USERPROFILE%\\demo-telco-agent"'
  : 'mkdir -p ~/demo-telco-agent/.agents/agents ~/demo-telco-agent/data\ncd ~/demo-telco-agent'}

${file('data/pelanggan.csv', csv.pelanggan)}

${file('data/jaringan.csv', csv.jaringan)}

${file('data/paket.csv', csv.paket)}`)

const agent = (name, desc, model, prompt, tools = 'tools:\n  - view_file\n') => file(`.agents/agents/${name}.md`, `---
name: ${name}
description: ${desc}
${tools}subagent: true
mainAgent: false
model: ${model}
---
# System Prompt
${prompt}`)

const agents = computed(() => [
  agent('billing', 'Menganalisis tagihan pelanggan dan menjelaskan penyebab kenaikan tagihan. Panggil jika ada keluhan soal tagihan atau biaya.', 'flash',
    'Kamu analis billing telco. Baca data/pelanggan.csv dan data/paket.csv.\nJelaskan rincian kenaikan tagihan dengan perhitungan yang jelas dalam Rupiah.'),
  agent('jaringan', 'Mengecek kondisi jaringan/BTS di lokasi pelanggan dan mendiagnosis penyebab internet lambat. Panggil jika ada keluhan sinyal atau koneksi.', 'pro',
    'Kamu engineer NOC. Cocokkan lokasi pelanggan di data/pelanggan.csv dengan data/jaringan.csv.\nDiagnosis penyebab gangguan, beri estimasi, dan saran yang bisa dilakukan pelanggan.'),
  agent('paket', 'Merekomendasikan paket yang paling sesuai berdasarkan pola pemakaian pelanggan. Panggil jika pelanggan butuh rekomendasi paket atau sering kelebihan kuota.', 'flash',
    'Kamu konsultan produk telco. Bandingkan pemakaian pelanggan di data/pelanggan.csv dengan data/paket.csv.\nRekomendasikan 1 paket terbaik beserta estimasi penghematan per bulan.')
].join('\n\n'))

const dl = computed(() => `https://antigravity.google/download?os=${win.value ? 'windows' : 'mac'}`)
const test = 'Sebutkan custom subagent apa saja yang tersedia di workspace ini beserta model-nya.'

const prompt = `Tangani komplain pelanggan 081211110001 ("internet lemot tiap malam, tagihan naik hampir 2x").
Jalankan subagent billing, jaringan, dan paket secara paralel, lalu minta subagent laporan
membuat dokumen laporannya di Google Docs dan berikan link-nya.`

const steps = computed(() => [
  ['1. Siapkan folder project & data dummy', `Jalankan di ${win.value ? 'Command Prompt (cmd)' : 'terminal'}. Membuat folder demo beserta data pelanggan, jaringan, dan katalog paket.`, setup.value, 'Copy Script'],
  ['2. Buat 4 subagent', 'Setiap subagent punya satu tugas dan model sendiri: billing, paket, dan laporan (flash), jaringan (pro).', agents.value, 'Copy Script'],
  ['3. Uji subagent terdaftar', `Buka folder ${home.value} di Antigravity App, lalu kirim prompt berikut untuk memastikan keempat subagent terbaca.`, test, 'Copy Prompt'],
  ['4. Kirim prompt ke agent utama', 'Kirim prompt berikut di Antigravity App untuk menjalankan seluruh alur.', prompt, 'Copy Prompt']
])
const hasil = [
  ['Billing', 'Andi melebihi kuota 6,5 GB, sehingga tagihan naik dari Rp150.000 menjadi Rp287.000.'],
  ['Jaringan', 'Site BKS-012 Bekasi Barat padat (utilisasi 94%) pada jam 19–23, penyebab internet lambat di malam hari.'],
  ['Paket', 'Internet 75GB (Rp280.000) lebih sesuai dan lebih hemat dibanding tagihan saat ini.'],
  ['Laporan', 'Dokumen Google Docs bernomor urut (mis. 001_2026-11-12) tersimpan di folder laporan-telco, lengkap dengan link.']
]
</script>

<template>
  <div class="wrap">
    <h1>Hands-on Antigravity — Multi Agent Customer Care Telco</h1>
    <p class="sub">Skenario: pelanggan mengeluh “internet lambat dan tagihan membengkak”. Agent utama mendelegasikan ke empat subagent (billing, jaringan, paket, laporan), lalu menggabungkan hasilnya menjadi satu jawaban dan laporan Google Docs.</p>

    <section class="card">
      <h2>Gambaran Sesi</h2>
      <div class="body">
        <p><b>Tujuan:</b> memahami cara kerja multi-agent: agent utama membagi tugas ke subagent spesialis yang berjalan paralel, lalu hasilnya digabungkan.</p>
        <p><b>Alur:</b> Keluhan pelanggan → Agent utama → Billing + Jaringan + Paket (paralel) → Laporan (Google Docs) → Jawaban akhir.</p>
        <p><b>Yang disiapkan:</b> komputer Windows/macOS/Linux, akun Google, dan koneksi internet.</p>
        <p><b>Langkah:</b> instal Antigravity, siapkan data dummy, buat subagent, uji, lalu jalankan skenario.</p>
      </div>
    </section>

    <p><a href="https://drive.google.com/drive/folders/1ME6jzVI-muqA7x8SgARSRXuxOHQfsxRm?usp=sharing" target="_blank" rel="noopener">Buka folder pendukung di Google Drive →</a></p>

    <div class="seg" role="radiogroup" aria-label="Sistem operasi">
      <button v-for="[v, l] in [['windows', 'Windows (cmd)'], ['linux', 'Linux / macOS']]" :key="v"
        role="radio" :aria-checked="os === v" :class="{ on: os === v }" @click="os = v">{{ l }}</button>
    </div>

    <section class="card">
      <h2>0. Instalasi Antigravity</h2>
      <div class="body">
        <ol>
          <li>Buka <a :href="dl" target="_blank" rel="noopener">antigravity.google/download</a> dan unduh installer sesuai OS (Linux: pilih di halaman unduhan).</li>
          <li>{{ win ? 'Jalankan file .exe, ikuti wizard (Next → Install), lalu Finish.' : 'macOS: buka .dmg lalu seret Antigravity ke Applications. Linux: ikuti petunjuk di halaman unduhan.' }}</li>
          <li>Buka Antigravity, login dengan akun Google, lalu pilih pengaturan awal (default sudah cukup).</li>
          <li>Pastikan aplikasi terbuka dan dapat menerima prompt sebelum lanjut ke langkah 1.</li>
        </ol>
      </div>
    </section>

    <section class="card">
      <h2>Preview Data Dummy</h2>
      <div class="body">
        <div v-for="[n, rows] in preview" :key="n" style="overflow-x:auto">
          <p><code>data/{{ n }}</code></p>
          <table>
            <thead><tr><th v-for="h in rows[0]" :key="h">{{ h }}</th></tr></thead>
            <tbody><tr v-for="(r, j) in rows.slice(1)" :key="j"><td v-for="(c, k) in r" :key="k">{{ c }}</td></tr></tbody>
          </table>
        </div>
      </div>
    </section>

    <template v-for="([t, d, code, label]) in steps" :key="t">
    <section class="card">
      <h2>{{ t }}</h2>
      <div class="body">
        <p>{{ d }}</p>
        <div class="bar"><CopyBtn :text="code" :label="label" /></div>
        <pre>{{ code }}</pre>
      </div>
    </section>
    </template>

    <section class="card">
      <h2>Hasil yang Diharapkan</h2>
      <div class="body">
        <table>
          <thead><tr><th>Subagent</th><th>Temuan</th></tr></thead>
          <tbody><tr v-for="[n, d] in hasil" :key="n"><td>{{ n }}</td><td>{{ d }}</td></tr></tbody>
        </table>
        <p>Jawaban akhir merupakan gabungan tiga temuan pertama; laporan mendokumentasikannya.</p>
      </div>
    </section>

    <section class="card">
      <h2>Latihan Lanjutan</h2>
      <div class="body"><p>Tambahkan subagent keempat, misalnya <code>retensi.md</code>, yang menawarkan kompensasi kepada pelanggan terdampak gangguan jaringan.</p></div>
    </section>

    <footer><RouterLink to="/">← Beranda</RouterLink></footer>
  </div>
</template>

<style scoped>
.seg{display:inline-flex;gap:4px;padding:4px;margin:0 0 18px;border-radius:999px;background:rgba(100,116,139,.12);border:1px solid var(--line)}
.seg button{border:0;background:transparent;color:var(--mut);font:inherit;font-size:13.5px;font-weight:700;padding:8px 18px;border-radius:999px;cursor:pointer;transition:all .2s ease}
.seg button.on{background:var(--grad);color:#fff;box-shadow:0 4px 14px -4px rgba(99,102,241,.6)}
.seg button:focus-visible{outline:2px solid var(--acc);outline-offset:2px}
</style>
