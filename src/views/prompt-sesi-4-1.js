export const brd = `BRD PR-05: Otomasi Rekonsiliasi Pembayaran
- Latar belakang: Tim finance mencocokkan transaksi pembayaran dari 5 bank dengan data billing secara manual. Prosesnya butuh 6 hari kerja setiap akhir bulan dan melibatkan 8 staf.
- Tujuan bisnis: Mempercepat closing bulanan dan mengurangi selisih yang tidak terdeteksi.
- Kebutuhan bisnis:
  1. Mencocokkan transaksi bank dengan data billing secara otomatis
  2. Menandai transaksi yang tidak cocok
  3. Laporan selisih harian
- KPI: Waktu rekonsiliasi dari 6 hari menjadi 1 hari; 100% transaksi tidak cocok terdeteksi
- Estimasi biaya & timeline: Rp1,2 miliar, 6 bulan`

export const dataRekon = `Data rekonsiliasi 3 bulan terakhir:
| Bulan    | Jumlah transaksi | Transaksi tidak cocok | Nilai selisih | Waktu rekonsiliasi |
|----------|------------------|-----------------------|---------------|--------------------|
| Januari  | 1.200.000        | 3.600                 | Rp840 juta    | 6 hari             |
| Februari | 1.150.000        | 4.100                 | Rp910 juta    | 7 hari             |
| Maret    | 1.300.000        | 5.200                 | Rp1,1 miliar  | 7 hari             |
Data biaya: biaya kerja Rp1,5 juta per staf per hari.`

export const cols = ['Bulan', 'Jumlah transaksi', 'Transaksi tidak cocok', 'Nilai selisih', 'Waktu rekonsiliasi']
export const rows = [
  ['Januari', '1.200.000', '3.600', 'Rp840 juta', '6 hari'],
  ['Februari', '1.150.000', '4.100', 'Rp910 juta', '7 hari'],
  ['Maret', '1.300.000', '5.200', 'Rp1,1 miliar', '7 hari']
]

export const tools = [
  {
    tool: 'Gemini',
    tag: 'Riset',
    note: 'Ganti [tempel latar belakang BRD PR-05] dengan teks BRD di atas.',
    fields: [
      ['Role', 'Act as a Business Research Analyst.'],
      ['Context', 'Our Finance team plans to automate payment reconciliation across 5 banks.'],
      ['Objective', 'Find how other companies, especially in telecommunications, automate payment reconciliation.'],
      ['Input', '[tempel latar belakang BRD PR-05]'],
      ['Constraints', 'Include a source for every point. Respond in Bahasa Indonesia.'],
      ['Output', 'A summary of common approaches, typical benefits, and common risks, with sources.']
    ]
  },
  {
    tool: 'ChatGPT',
    tag: 'Analisis Data',
    note: 'Ganti [tempel data rekonsiliasi dan data biaya] dengan tabel data di atas.',
    fields: [
      ['Role', 'Act as a Financial Data Analyst.'],
      ['Context', 'We are assessing a Rp1.2 billion reconciliation automation project.'],
      ['Objective', 'Analyze the reconciliation trend and calculate the potential annual savings and payback period.'],
      ['Input', '[tempel data rekonsiliasi dan data biaya dari Slide 3]'],
      ['Constraints', 'Show the formula for every number. Do not invent numbers. Respond in Bahasa Indonesia.'],
      ['Output', 'A trend table, a savings calculation, and the payback period.']
    ]
  },
  {
    tool: 'Claude',
    tag: 'Ringkasan Keputusan',
    note: 'Ganti [tempel hasil Gemini, hasil ChatGPT, dan BRD PR-05] dengan output langkah 1 & 2.',
    fields: [
      ['Role', 'Act as a Senior Business Analyst writing for an approver.'],
      ['Context', 'An approver must decide on a Rp1.2 billion reconciliation automation project.'],
      ['Objective', 'Combine the research, data analysis, and BRD review into one decision summary.'],
      ['Input', '[tempel hasil Gemini, hasil ChatGPT, dan BRD PR-05]'],
      ['Constraints', 'Maximum 1 page. Keep all numbers exactly as given. Clearly state risks and open questions. Respond in Bahasa Indonesia.'],
      ['Output', 'An executive summary: problem, key data, benefits, risks, and recommendation.']
    ]
  }
]

const asText = fields => fields.map(([k, v]) => `${k}: ${v}`).join('\n')

// prompt polos (placeholder dibiarkan)
export const toText = t => asText(t.fields)

// prompt + data dummy dipasang menggantikan placeholder Input
const filled = { Gemini: brd, ChatGPT: dataRekon, Claude: `${brd}\n\n${dataRekon}` }
export const toTextWithData = t =>
  asText(t.fields.map(([k, v]) => (k === 'Input' ? [k, `\n${filled[t.tool]}`] : [k, v])))
