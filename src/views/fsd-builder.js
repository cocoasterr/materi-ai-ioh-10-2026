import { bagianB } from './fsd-bagian-b.js'

export const fields = [
  ['projectName', 'Project name', 'Digitalisasi Approval Pembelian'],
  ['businessProcess', 'Business process', 'Proses Purchase Request sampai approval'],
  ['owner', 'Business unit / owner', 'Procurement'],
  ['industry', 'Industry', 'Telekomunikasi'],
  ['version', 'Document version', 'v0.1 Draft'],
  ['language', 'Output language', 'Bahasa Indonesia'],
  ['fileName', 'File name', 'FSD_Approval_Pembelian_v0.1']
]

export const blocks = [
  ['problem', 'PROBLEM SUMMARY', 'Jelaskan masalah utama dalam 2–5 kalimat'],
  ['brd', '<brd>', 'Tempel isi BRD: latar belakang, tujuan, kebutuhan bisnis (BR-xx), aturan bisnis'],
  ['interview', '<interview_notes>', 'Tempel notulen interview stakeholder'],
  ['process', '<process_documentation>', 'Tempel SOP / alur proses saat ini'],
  ['others', '<other_documents>', 'Dokumen pendukung lain: kebijakan, data sistem, daftar integrasi']
]

export const modules = [
  ['migration', 'Data Migration: pemindahan data dari sistem lama'],
  ['uat', 'UAT Test Scenarios: skenario uji untuk User Acceptance Test'],
  ['compliance', 'Compliance & Regulatory: kebutuhan kepatuhan dan regulasi'],
  ['wireframe', 'Wireframe Description: deskripsi tata letak layar yang lebih detail'],
  ['phasing', 'Implementation Phasing: pembagian rilis / fase implementasi'],
  ['risk', 'Risk Register: daftar risiko implementasi dan mitigasinya']
]

export const emptyForm = () => ({
  ...Object.fromEntries(fields.map(([k]) => [k, ''])),
  ...Object.fromEntries(blocks.map(([k]) => [k, ''])),
  modules: [],
  additional: ''
})

const ph = (v, hint) => (v.trim() ? v.trim() : `[[${hint}]]`)
const line = '=================================================================='

export function buildPrompt(f) {
  const info = fields.map(([k, label, hint]) => `- ${label}: ${ph(f[k], 'contoh: ' + hint)}`).join('\n')
  const block = ([k, tag, hint]) =>
    tag.startsWith('<')
      ? `${tag}\n${ph(f[k], hint)}\n${tag.replace('<', '</')}`
      : `${tag}\n${ph(f[k], hint)}`
  const mods = modules.map(([k, label]) => `[${f.modules.includes(k) ? 'x' : ' '}] ${label}`).join('\n')

  return `${line}
BAGIAN A — DIISI OLEH USER
(Ganti teks di dalam [[...]]. Kosongkan jika tidak ada.)
${line}

PROJECT INFORMATION
${info}

${blocks.map(block).join('\n\n')}

OPTIONAL MODULES (ganti [ ] menjadi [x] untuk mengaktifkan)
${mods}

ADDITIONAL INSTRUCTIONS (opsional)
${ph(f.additional, 'Tulis kebutuhan tambahan di sini, misalnya: "fokus pada akses mobile"')}

${line}
BAGIAN B — JANGAN DIUBAH
${line}

${bagianB}`
}
