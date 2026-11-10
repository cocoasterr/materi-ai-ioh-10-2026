<script setup>
import { ref } from 'vue'

const props = defineProps({ text: String, label: { type: String, default: '📋 Copy' } })
const copied = ref(false)

async function copy() {
  try {
    await navigator.clipboard.writeText(props.text)
  } catch {
    const t = document.createElement('textarea')
    t.value = props.text
    document.body.append(t); t.select(); document.execCommand('copy'); t.remove()
  }
  copied.value = true
  setTimeout(() => (copied.value = false), 1800)
}
</script>

<template>
  <button class="primary" :class="{ done: copied }" @click="copy">
    {{ copied ? '✅ Tersalin!' : label }}
  </button>
</template>
