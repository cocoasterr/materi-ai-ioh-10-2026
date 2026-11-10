export const findings = [
  'KPI "100% transaksi tidak cocok terdeteksi" tidak realistis',
  'Kebutuhan laporan harian belum jelas',
  'Manfaat belum dihitung dalam rupiah',
  'Risiko integrasi dengan 5 bank belum dibahas'
]

export const stakeholders = [
  ['Tim Finance', 'pengaju & pengguna utama'],
  ['Tim Billing', 'pemilik data tagihan pelanggan'],
  ['Tim IT', 'pelaksana integrasi dengan bank'],
  ['Tim Internal Audit', 'pengawas kontrol & kepatuhan']
]

const input = `Temuan BRD yang harus diperbaiki:
${findings.map((f, i) => `${i + 1}. ${f}`).join('\n')}

Stakeholder:
${stakeholders.map(([n, d]) => `- ${n}: ${d}`).join('\n')}`

export const sections = [
  ['Role', 'Act as a Senior Business Analyst preparing stakeholder interviews.'],
  ['Context', 'A payment reconciliation automation project (Rp1.2 billion) was approved with revisions. The BRD must be improved based on stakeholder input before development starts.'],
  ['Objective', 'Prepare interview questions for each stakeholder to clarify their needs and resolve the BRD findings.'],
  ['Input', input],
  ['Constraints', 'Each question must be linked to at least one BRD finding. Avoid leading questions. Respond in Bahasa Indonesia.'],
  ['Output', 'A table per stakeholder: Question | Related BRD Finding | Purpose of the Question. Maximum 5 questions per stakeholder.']
]

export const prompt = sections.map(([k, v]) => `${k}: ${v}`).join('\n\n')
