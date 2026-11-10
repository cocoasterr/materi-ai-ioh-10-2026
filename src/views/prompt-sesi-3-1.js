export const notes = [
  ['Tim Finance', 'Closing kami sekarang 7 hari. Target kami bisa selesai di hari ke-2. Yang paling makan waktu itu mencari penyebab selisih. Laporan harian kami butuhkan supaya selisih besar ketahuan lebih awal, bukan menunggu akhir bulan.'],
  ['Tim Billing', 'Data billing diperbarui sekali sehari setiap jam 02.00. Sekitar 60% selisih terjadi karena pelanggan salah menulis nomor referensi saat transfer.'],
  ['Tim IT', 'Dari 5 bank, baru 3 yang punya API. Dua bank lainnya mengirim file di hari berikutnya (H+1). Integrasi dua bank itu butuh tambahan 2 bulan.'],
  ['Tim Internal Audit', 'Kami tidak keberatan prosesnya otomatis, tapi setiap selisih di atas Rp10 juta harus direview manusia dan ada jejak auditnya. Target 100% terdeteksi itu tidak realistis. Yang penting semua selisih tercatat dan bisa ditelusuri.']
]

const input = `Notulen interview:
${notes.map(([n, q]) => `- ${n}: "${q}"`).join('\n')}`

export const outputs = [
  'A requirement table: <b>Stakeholder | Need | Requirement</b>',
  'A KPI table: <b>KPI | Baseline | Target | Owner</b>',
  'A list of conflicts between stakeholders and a suggested solution for each',
  'A list of open questions for follow-up'
]

export const sections = [
  ['Role', 'Act as a Senior Business Analyst revising a BRD.'],
  ['Context', 'Interviews were conducted with four stakeholders of a payment reconciliation automation project. The results will be used to revise the BRD.'],
  ['Objective', 'Turn the interview notes into requirements and measurable KPIs, and identify conflicts between stakeholders.'],
  ['Input', input],
  ['Constraints', 'Do not add any need that was not mentioned in the notes. Every KPI must have a baseline, a target, and an owner. If a baseline is not in the notes, write "Data Needed". Respond in Bahasa Indonesia.'],
  ['Output', `(1) A requirement table: Stakeholder | Need | Requirement.
(2) A KPI table: KPI | Baseline | Target | Owner.
(3) A list of conflicts between stakeholders and a suggested solution for each.
(4) A list of open questions for follow-up.`]
]

export const prompt = sections.map(([k, v]) => `${k}: ${v}`).join('\n\n')
