<script setup>
import { cases } from '../cases.js'
</script>

<template>
  <div class="wrap">
    <header class="hero">
      <p class="eyebrow">Prompt Library</p>
      <h1>Agentic AI untuk Business Analyst</h1>
      <p class="sub">Kumpulan prompt siap pakai untuk review dokumen, interview stakeholder, analisis kelayakan, sampai generate FSD. Pilih salah satu di bawah.</p>
    </header>

    <div class="grid">
      <RouterLink v-for="c in cases" :key="c.to" :to="c.to" class="tile">
        <div class="top">
          <span class="icon">{{ c.icon }}</span>
          <span class="tag">{{ c.tag }}</span>
          <span v-if="c.badge" class="badge">{{ c.badge }}</span>
        </div>
        <h2>{{ c.title }}</h2>
        <p>{{ c.desc }}</p>
        <span class="go">Buka <span aria-hidden="true">→</span></span>
      </RouterLink>
    </div>

    <footer>Static Vue 3 + Vite — setiap halaman punya tombol copy prompt.</footer>
  </div>
</template>

<style scoped>
.hero { padding: 18px 0 30px }
.eyebrow { margin: 0 0 8px; font-size: 12px; letter-spacing: .14em; text-transform: uppercase; color: var(--acc); font-weight: 700 }
.hero h1 { font-size: 36px; line-height: 1.2; margin: 0 0 12px; letter-spacing: -.02em }
.hero .sub { max-width: 620px; margin: 0 }

.grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 18px }

.tile {
  display: flex; flex-direction: column; gap: 10px; text-decoration: none; color: inherit;
  background: var(--card); border: 1px solid var(--line); border-radius: 16px; padding: 20px;
  box-shadow: 0 1px 2px rgba(15, 23, 42, .05);
  transition: transform .16s ease, box-shadow .16s ease, border-color .16s ease;
}
.tile:hover { transform: translateY(-3px); border-color: #bfd3ff; box-shadow: 0 10px 24px rgba(37, 99, 235, .12) }
.tile:focus-visible { outline: 2px solid var(--acc); outline-offset: 3px }

.top { display: flex; align-items: center; gap: 9px }
.icon { font-size: 22px; line-height: 1 }
.tag { font-size: 11px; font-weight: 700; letter-spacing: .07em; text-transform: uppercase; color: var(--mut); background: #eef2f9; border-radius: 999px; padding: 4px 9px }
.badge { font-size: 11px; font-weight: 700; color: #fff; background: var(--acc); border-radius: 999px; padding: 4px 9px }

.tile h2 { font-size: 17px; margin: 0; line-height: 1.35 }
.tile p { margin: 0; font-size: 14px; color: var(--mut); flex: 1 }
.go { font-size: 14px; font-weight: 600; color: var(--acc) }
.tile:hover .go span { display: inline-block; transform: translateX(3px); transition: transform .16s ease }

@media (max-width: 680px) { .grid { grid-template-columns: 1fr } .hero h1 { font-size: 28px } }
</style>
