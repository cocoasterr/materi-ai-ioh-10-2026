export const brd = `BRD
- Latar belakang: Tim marketing butuh 3 hari setiap minggu untuk menyusun laporan performa kampanye dari 4 channel.
- Tujuan bisnis: Mempercepat pengambilan keputusan kampanye.
- Kebutuhan bisnis:
  1. Dashboard menampilkan performa kampanye dari 4 channel
  2. Data diperbarui setiap hari
  3. Bisa diakses oleh tim marketing regional
- KPI: Pengambilan keputusan kampanye menjadi lebih cepat
- Estimasi biaya & timeline: Rp450 juta, 3 bulan`

export const fsd = `FSD
- F1: Dashboard menampilkan impresi, klik, dan konversi dari Google Ads, Meta, dan TikTok
- F2: Data diperbarui setiap jam
- F3: Fitur export laporan ke PDF
- F4: Login menggunakan akun karyawan
- Kebutuhan non-fungsional: Sistem harus cepat dan aman
- Hak akses: Tim marketing pusat
- Integrasi: API Google Ads, Meta, dan TikTok`

const input = `PR-01: Dashboard Kampanye Digital (Unit Marketing)

${brd}

${fsd}`

export const issueTypes = ['Gap', 'Inconsistency', 'Unclear', 'Unmeasurable']
export const verdicts = ['Ready', 'Needs Revision', 'Reject']

export const sections = [
  ['Role', 'Act as a Senior Business Analyst reviewing project documents before IT development.'],
  ['Context', 'A business unit submitted a BRD and an FSD for a new project. Both documents have passed the completeness check, and now the content quality must be reviewed.'],
  ['Objective', 'Identify gaps, inconsistencies between the BRD and FSD, unclear requirements, and unmeasurable KPIs. Then decide whether the documents are ready for development.'],
  ['Input', input],
  ['Constraints', 'Use only the content of the documents. Mention the section where each finding appears. Respond in Bahasa Indonesia.'],
  ['Output', 'A table: Finding | Section | Issue Type (Gap / Inconsistency / Unclear / Unmeasurable) | Impact | Suggested Fix. End with a verdict: Ready / Needs Revision / Reject.']
]

export const prompt = sections.map(([k, v]) => `${k}: ${v}`).join('\n\n')
