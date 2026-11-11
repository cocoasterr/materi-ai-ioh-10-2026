<script setup>
import { cases } from '../cases.js'
</script>

<template>
  <div class="wrap">
    <header class="hero">
      <span class="pill"><span class="dot" /> Prompt Library · {{ cases.length }} case</span>
      <h1>Agentic AI untuk <span class="grad">Business Analyst</span></h1>
      <p class="sub">Prompt siap pakai untuk review dokumen, interview stakeholder, analisis kelayakan, sampai generate FSD lengkap. Pilih salah satu di bawah.</p>
    </header>

    <div class="grid">
      <RouterLink v-for="c in cases" :key="c.to" :to="c.to" class="tile">
        <div class="top">
          <span class="tag">{{ c.tag }}</span>
          <span v-if="c.badge" class="badge">{{ c.badge }}</span>
        </div>
        <h2>{{ c.title }}</h2>
        <p>{{ c.desc }}</p>
        <span class="go">Buka <span aria-hidden="true">→</span></span>
      </RouterLink>
    </div>

    <footer>Vue 3 + Vite · setiap halaman punya tombol copy prompt.</footer>
  </div>
</template>

<style scoped>
.hero{padding:26px 0 36px}
.pill{
  display:inline-flex;align-items:center;gap:8px;font-size:12px;font-weight:700;letter-spacing:.06em;
  text-transform:uppercase;color:var(--acc);background:rgba(99,102,241,.1);
  border:1px solid rgba(99,102,241,.2);border-radius:999px;padding:6px 14px;margin:0 0 18px;
}
.dot{width:7px;height:7px;border-radius:99px;background:var(--grad);animation:pulse 2s ease-in-out infinite}
@keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.45;transform:scale(.8)}}

.hero h1{font-size:46px;line-height:1.08;margin:0 0 14px;letter-spacing:-.04em;font-weight:800}
.grad{background:var(--grad);-webkit-background-clip:text;background-clip:text;color:transparent}
.hero .sub{max-width:620px;margin:0;font-size:17px}

.grid{display:grid;grid-template-columns:repeat(2,1fr);gap:18px}

.tile{
  position:relative;display:flex;flex-direction:column;gap:11px;text-decoration:none;color:inherit;
  background:var(--card);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);
  border:1px solid var(--line);border-radius:20px;padding:22px;box-shadow:var(--ring);overflow:hidden;
  transition:transform .22s cubic-bezier(.2,.8,.2,1),box-shadow .22s ease,border-color .22s ease;
}
.tile::before{
  content:"";position:absolute;inset:0 0 auto;height:3px;background:var(--grad);
  opacity:0;transition:opacity .22s ease;
}
.tile:hover{transform:translateY(-4px);border-color:rgba(99,102,241,.3);box-shadow:0 1px 2px rgba(15,23,42,.04),0 24px 48px -22px rgba(99,102,241,.6)}
.tile:hover::before{opacity:1}
.tile:focus-visible{outline:2px solid var(--acc);outline-offset:3px}
.tile:hover{text-decoration:none}

.top{display:flex;align-items:center;gap:9px;min-height:28px}
.tag{font-size:10.5px;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:var(--mut);background:rgba(100,116,139,.1);border-radius:999px;padding:4px 10px}
.badge{font-size:10.5px;font-weight:800;letter-spacing:.05em;color:#fff;background:var(--grad);border-radius:999px;padding:4px 10px}

.tile h2{font-size:17.5px;margin:2px 0 0;line-height:1.35;font-weight:700;letter-spacing:-.02em}
.tile p{margin:0;font-size:14px;color:var(--mut);flex:1}
.go{font-size:13.5px;font-weight:700;color:var(--acc);display:inline-flex;align-items:center;gap:6px}
.go span{transition:transform .22s cubic-bezier(.2,.8,.2,1)}
.tile:hover .go span{transform:translateX(5px)}

@media (max-width:680px){.grid{grid-template-columns:1fr}.hero h1{font-size:33px}}
</style>
