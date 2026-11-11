<script setup>
import { ref, computed } from 'vue'
import CopyBtn from '../components/CopyBtn.vue'

const os = ref('windows')
const win = computed(() => os.value === 'windows')
const home = computed(() => (win.value ? '%USERPROFILE%\\demo-telco-agent' : '~/demo-telco-agent'))
// ponytail: cmd tidak mendukung heredoc, pakai blok echo; teks tidak boleh berisi & | < > % ^ ( )
const file = (path, body) => win.value
  ? `(\n${body.split('\n').map(l => 'echo ' + l).join('\n')}\n) > ${path.replaceAll('/', '\\')}`
  : `cat > ${path} << 'EOF'\n${body}\nEOF`

const setup = computed(() => `${win.value
  ? 'mkdir "%USERPROFILE%\\demo-telco-agent\\.agents\\agents" "%USERPROFILE%\\demo-telco-agent\\data"\ncd /d "%USERPROFILE%\\demo-telco-agent"'
  : 'mkdir -p ~/demo-telco-agent/.agents/agents ~/demo-telco-agent/data\ncd ~/demo-telco-agent'}

${file('data/pelanggan.csv', `msisdn,nama,paket,kuota_gb,pemakaian_gb,tagihan_bulan_lalu,tagihan_bulan_ini,lokasi
081211110001,Andi,Internet 25GB,25,31.5,150000,287000,Bekasi Barat
081211110002,Sari,Internet 50GB,50,18.2,220000,220000,Depok
081211110003,Budi,Unlimited Basic,999,120.4,300000,300000,Bekasi Barat`)}

${file('data/jaringan.csv', `site_id,lokasi,status,utilisasi_persen,keterangan
BKS-012,Bekasi Barat,DEGRADED,94,Kepadatan tinggi jam 19-23
DPK-004,Depok,NORMAL,61,-
JKT-101,Jakarta Selatan,MAINTENANCE,0,Perbaikan perangkat s/d 14 Nov`)}

${file('data/paket.csv', `nama_paket,kuota_gb,harga,keterangan
Internet 25GB,25,150000,Kelebihan pemakaian Rp20.000/GB
Internet 50GB,50,220000,Kelebihan pemakaian Rp15.000/GB
Internet 75GB,75,280000,Bonus 10GB malam
Unlimited Basic,999,300000,FUP 100GB lalu turun ke 2Mbps`)}`)

const agent = (name, desc, model, prompt) => file(`.agents/agents/${name}.md`, `---
name: ${name}
description: ${desc}
tools:
  - view_file
subagent: true
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

const prompt = `Pelanggan dengan nomor 081211110001 komplain: "Internet saya lemot banget tiap malam,
dan tagihan bulan ini hampir dua kali lipat. Kenapa?"

Delegasikan ke subagent billing, jaringan, dan paket secara paralel,
lalu gabungkan jadi satu jawaban customer care yang sopan dan solutif.`

const steps = computed(() => [
  ['1. Siapkan folder project & data dummy', `Jalankan di ${win.value ? 'Command Prompt (cmd)' : 'terminal'}. Membuat folder demo beserta data pelanggan, jaringan, dan katalog paket.`, setup.value, 'Copy Script'],
  ['2. Buat 3 subagent', 'Setiap subagent punya satu tugas dan model sendiri: billing & paket (flash), jaringan (pro).', agents.value, 'Copy Script'],
  ['3. Kirim prompt ke agent utama', `Buka folder ${home.value} di Antigravity App, lalu kirim prompt berikut.`, prompt, 'Copy Prompt']
])
const hasil = [
  ['Billing', 'Andi melebihi kuota 6,5 GB, sehingga tagihan naik dari Rp150.000 menjadi Rp287.000.'],
  ['Jaringan', 'Site BKS-012 Bekasi Barat padat (utilisasi 94%) pada jam 19–23, penyebab internet lambat di malam hari.'],
  ['Paket', 'Internet 75GB (Rp280.000) lebih sesuai dan lebih hemat dibanding tagihan saat ini.']
]
</script>

<template>
  <div class="wrap">
    <h1>Hands-on Antigravity — Multi Agent Customer Care Telco</h1>
    <p class="sub">Skenario: pelanggan mengeluh “internet lambat dan tagihan membengkak”. Agent utama mendelegasikan ke tiga subagent, lalu menggabungkan hasilnya menjadi satu jawaban.</p>

    <p><a href="https://drive.google.com/file/d/1lITWoGszzsMj2mhzFrMI806cZRo9nvm6/view?usp=sharing" target="_blank" rel="noopener">Buka file pendukung di Google Drive →</a></p>

    <div class="bar">
      <label>Sistem operasi:
        <select v-model="os"><option value="windows">Windows (cmd)</option><option value="linux">Linux / macOS</option></select>
      </label>
    </div>

    <section class="card" v-for="[t, d, code, label] in steps" :key="t">
      <h2>{{ t }}</h2>
      <div class="body">
        <p>{{ d }}</p>
        <div class="bar"><CopyBtn :text="code" :label="label" /></div>
        <pre>{{ code }}</pre>
      </div>
    </section>

    <section class="card">
      <h2>Hasil yang Diharapkan</h2>
      <div class="body">
        <table>
          <thead><tr><th>Subagent</th><th>Temuan</th></tr></thead>
          <tbody><tr v-for="[n, d] in hasil" :key="n"><td>{{ n }}</td><td>{{ d }}</td></tr></tbody>
        </table>
        <p>Jawaban akhir merupakan gabungan ketiga temuan di atas.</p>
      </div>
    </section>

    <section class="card">
      <h2>Latihan Lanjutan</h2>
      <div class="body"><p>Tambahkan subagent keempat, misalnya <code>retensi.md</code>, yang menawarkan kompensasi kepada pelanggan terdampak gangguan jaringan.</p></div>
    </section>

    <footer><RouterLink to="/">← Beranda</RouterLink></footer>
  </div>
</template>
