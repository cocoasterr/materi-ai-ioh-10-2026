export const prompt = `Role: Act as a Senior Business Analyst preparing material for an investment approval.
Context: The Finance team submitted a project to automate payment reconciliation, with an estimated cost of Rp1.2 billion. The approver needs an objective review before deciding.
Objective: Review the BRD and the data, assess whether the needs and KPIs are realistic, and estimate the potential savings.
Input: BRD PR-05: Otomasi Rekonsiliasi Pembayaran
- Latar belakang: Tim finance mencocokkan transaksi pembayaran dari 5 bank dengan data billing secara manual. Prosesnya butuh 6 hari kerja setiap akhir bulan dan melibatkan 8 staf.
- Tujuan bisnis: Mempercepat closing bulanan dan mengurangi selisih yang tidak terdeteksi.
- Kebutuhan bisnis:
  1. Mencocokkan transaksi bank dengan data billing secara otomatis
  2. Menandai transaksi yang tidak cocok
  3. Laporan selisih harian
- KPI: Waktu rekonsiliasi dari 6 hari menjadi 1 hari; 100% transaksi tidak cocok terdeteksi
- Estimasi biaya & timeline: Rp1,2 miliar, 6 bulan
Data rekonsiliasi 3 bulan terakhir:
| Bulan    | Jumlah transaksi | Transaksi tidak cocok | Nilai selisih | Waktu rekonsiliasi |
|----------|------------------|-----------------------|---------------|--------------------|
| Januari  | 1.200.000        | 3.600                 | Rp840 juta    | 6 hari             |
| Februari | 1.150.000        | 4.100                 | Rp910 juta    | 7 hari             |
| Maret    | 1.300.000        | 5.200                 | Rp1,1 miliar  | 7 hari             |
Data biaya: biaya kerja Rp1,5 juta per staf per hari.
Constraints: Use only the data provided. Show the formula for every number. Separate facts from assumptions. Respond in Bahasa Indonesia.
Output: (1) A table of BRD findings: Finding | Issue | Suggested Fix. (2) Potential annual savings and payback period with formulas. (3) A recommendation: Approve / Approve with Revision / Reject.`

export const sections = [
  { h: 'Role', text: 'Act as a Senior Business Analyst preparing material for an investment approval.' },
  { h: 'Context', text: 'The Finance team submitted a project to automate payment reconciliation, with an estimated cost of Rp1.2 billion. The approver needs an objective review before deciding.' },
  { h: 'Objective', text: 'Review the BRD and the data, assess whether the needs and KPIs are realistic, and estimate the potential savings.' },
  { h: 'Input — BRD PR-05', text: `BRD PR-05: Otomasi Rekonsiliasi Pembayaran
- Latar belakang: Tim finance mencocokkan transaksi pembayaran dari 5 bank dengan data billing secara manual. Prosesnya butuh 6 hari kerja setiap akhir bulan dan melibatkan 8 staf.
- Tujuan bisnis: Mempercepat closing bulanan dan mengurangi selisih yang tidak terdeteksi.
- Kebutuhan bisnis:
  1. Mencocokkan transaksi bank dengan data billing secara otomatis
  2. Menandai transaksi yang tidak cocok
  3. Laporan selisih harian
- KPI: Waktu rekonsiliasi dari 6 hari menjadi 1 hari; 100% transaksi tidak cocok terdeteksi
- Estimasi biaya & timeline: Rp1,2 miliar, 6 bulan` },
  { h: 'Constraints', text: 'Use only the data provided. Show the formula for every number. Separate facts from assumptions. Respond in Bahasa Indonesia.' }
]

export const cols = ['Bulan', 'Jumlah transaksi', 'Transaksi tidak cocok', 'Nilai selisih', 'Waktu rekonsiliasi']
export const rows = [
  ['Januari', '1.200.000', '3.600', 'Rp840 juta', '6 hari'],
  ['Februari', '1.150.000', '4.100', 'Rp910 juta', '7 hari'],
  ['Maret', '1.300.000', '5.200', 'Rp1,1 miliar', '7 hari']
]
export const outputs = [
  'Tabel temuan BRD: <b>Finding | Issue | Suggested Fix</b>',
  'Potensi penghematan tahunan & payback period <b>beserta rumusnya</b>',
  'Rekomendasi: <b>Approve / Approve with Revision / Reject</b>'
]
