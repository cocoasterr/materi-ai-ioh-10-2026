// node check.mjs  — self-check builder prompt FSD
import assert from 'node:assert/strict'
import { buildPrompt, emptyForm, fields, blocks } from './src/views/fsd-builder.js'
import { dummy } from './src/views/fsd-dummy.js'

const sectionA = p => p.split('BAGIAN B')[0].split('(Ganti teks')[0] + p.split('Kosongkan jika tidak ada.)')[1].split('BAGIAN B')[0]

const full = buildPrompt(dummy)
assert.ok(!sectionA(full).includes('[['), 'dummy terisi penuh, tak boleh ada placeholder')
assert.ok(full.includes('[x] UAT Test Scenarios'), 'modul aktif ditandai [x]')
assert.ok(full.includes('[ ] Data Migration'), 'modul non-aktif ditandai [ ]')
assert.ok(full.includes('</brd>') && full.includes('</other_documents>'), 'tag blok tertutup')
assert.ok(full.includes('CHAT SUMMARY AFTER THE FILE IS CREATED'), 'Bagian B lengkap')

const empty = buildPrompt(emptyForm())
for (const [, label] of fields) assert.ok(empty.includes(`- ${label}: [[`), `placeholder: ${label}`)
for (const [, tag] of blocks) assert.ok(empty.includes(tag), `blok: ${tag}`)

console.log('✓ semua cek lolos')
