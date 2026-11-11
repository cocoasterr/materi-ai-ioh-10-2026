<script setup>
import { useRoute } from 'vue-router'
const route = useRoute()
</script>

<template>
  <nav v-if="route.path !== '/'" class="topnav">
    <div class="inner">
      <RouterLink to="/" class="back">Back to All Prompt</RouterLink>
      <span class="brand">Prompt Library</span>
    </div>
  </nav>
  <RouterView />
</template>

<style scoped>
.topnav{
  position:sticky;top:0;z-index:10;
  background:rgba(247,248,255,.72);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);
  border-bottom:1px solid var(--line);
}
.inner{max-width:920px;margin:0 auto;padding:14px 20px;display:flex;align-items:center;justify-content:space-between;gap:12px}
.back{font-size:15px;font-weight:750;display:inline-flex;align-items:center;min-height:44px;padding:0 16px;color:#fff;background:var(--acc);border:1px solid var(--acc);border-radius:10px;box-shadow:0 5px 14px -8px rgba(37,99,235,.8);transition:background .2s ease,transform .2s ease,box-shadow .2s ease}
.back:hover{text-decoration:none;background:#1d4ed8;transform:translateY(-1px);box-shadow:0 8px 18px -8px rgba(37,99,235,.8)}
.back:focus-visible{outline:3px solid rgba(37,99,235,.3);outline-offset:3px}
.brand{
  font-size:11px;font-weight:800;letter-spacing:.14em;text-transform:uppercase;
  background:var(--grad);-webkit-background-clip:text;background-clip:text;color:transparent;
}
@media print{.topnav{display:none}}
</style>
