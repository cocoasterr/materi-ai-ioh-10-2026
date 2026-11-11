<script setup>
import { reactive, computed, watch } from 'vue'
import CopyBtn from '../components/CopyBtn.vue'
import { fields, blocks, modules, emptyForm, buildPrompt } from './fsd-builder.js'
import { dummy } from './fsd-dummy.js'

const KEY = 'fsd-builder'
const form = reactive({ ...emptyForm(), ...JSON.parse(localStorage.getItem(KEY) || '{}') })
watch(form, v => localStorage.setItem(KEY, JSON.stringify(v)), { deep: true })

const prompt = computed(() => buildPrompt(form))
const filled = computed(() =>
  [...fields, ...blocks].filter(([k]) => form[k].trim()).length
)
const total = fields.length + blocks.length

function fillDummy() { Object.assign(form, structuredClone(dummy)) }
function reset() { Object.assign(form, emptyForm()) }
function download() {
  const a = document.createElement('a')
  a.href = URL.createObjectURL(new Blob([prompt.value], { type: 'text/plain' }))
  a.download = (form.fileName.trim() || 'prompt-fsd') + '.txt'
  a.click(); URL.revokeObjectURL(a.href)
}
</script>

<template>
  <div class="wrap">
    <h1>Generate Standard FSD — Prompt Builder</h1>
    <p class="sub">Isi parameter di bawah, lalu salin prompt yang terbentuk. Field kosong otomatis jadi placeholder <code>[[...]]</code> dan dianggap <b>NOT PROVIDED</b> oleh AI.</p>

    <div class="bar">
      <CopyBtn :text="prompt" label="Copy Prompt" />
      <button @click="fillDummy">Fill Dummy</button>
      <button @click="download">Download .txt</button>
      <button @click="reset">Reset</button>
      <span class="count">{{ filled }}/{{ total }} field terisi</span>
    </div>

    <section class="card">
      <h2>Project Information</h2>
      <div class="body grid">
        <label v-for="[k, label, hint] in fields" :key="k">
          <span>{{ label }}</span>
          <input v-model="form[k]" :placeholder="hint">
        </label>
      </div>
    </section>

    <section class="card" v-for="[k, tag, hint] in blocks" :key="k">
      <h2>{{ tag }}</h2>
      <div class="body">
        <textarea v-model="form[k]" :placeholder="hint" rows="7" />
      </div>
    </section>

    <section class="card">
      <h2>Optional Modules</h2>
      <div class="body">
        <label class="check" v-for="[k, label] in modules" :key="k">
          <input type="checkbox" :value="k" v-model="form.modules"> <span>{{ label }}</span>
        </label>
      </div>
    </section>

    <section class="card">
      <h2>Additional Instructions (opsional)</h2>
      <div class="body">
        <textarea v-model="form.additional" rows="3" placeholder='misalnya: "fokus pada akses mobile"' />
      </div>
    </section>

    <section class="card">
      <h2>Preview Prompt</h2>
      <div class="body">
        <pre class="preview">{{ prompt }}</pre>
        <div class="bar"><CopyBtn :text="prompt" label="Copy Prompt" /></div>
      </div>
    </section>

    <footer>
      <RouterLink to="/example-case-sesi-1">Sesi 1</RouterLink> ·
      <RouterLink to="/example-case-sesi-3">Sesi 3</RouterLink> ·
      <RouterLink to="/example-case-sesi-4">Sesi 4</RouterLink>
    </footer>
  </div>
</template>

<style scoped>
.grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px }
label { display: flex; flex-direction: column; gap: 5px; font-size: 14px }
label > span { color: var(--mut) }
input, textarea {
  font: inherit; font-size: 14px; color: var(--fg); background: #fff;
  border: 1px solid var(--line); border-radius: 9px; padding: 9px 11px; width: 100%; resize: vertical;
}
textarea { font-family: ui-monospace, Menlo, Consolas, monospace; line-height: 1.6 }
input:focus, textarea:focus { outline: 2px solid var(--acc); outline-offset: -1px; border-color: var(--acc) }
.check { flex-direction: row; align-items: center; gap: 9px; padding: 5px 0 }
.check > span { color: var(--fg) }
.count { align-self: center; color: var(--mut); font-size: 13px }
.preview { max-height: 420px; overflow: auto; background: #f8fafc; border: 1px solid var(--line); border-radius: 10px; padding: 14px }
code { background: #eef2f9; padding: 1px 5px; border-radius: 5px; font-size: 13px }
@media (max-width: 620px) { .grid { grid-template-columns: 1fr } }
</style>
