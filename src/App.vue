<script setup>
import { useRoute } from 'vue-router'
const route = useRoute()
</script>

<template>
  <nav v-if="route.path !== '/'" class="topnav">
    <RouterLink to="/">← Semua Prompt</RouterLink>
  </nav>
  <RouterView />
</template>

<style scoped>
.topnav { border-bottom: 1px solid var(--line); background: #fff }
.topnav a { display: block; max-width: 900px; margin: 0 auto; padding: 12px 20px; font-size: 14px; font-weight: 600; text-decoration: none }
.topnav a:hover { text-decoration: underline }
@media print { .topnav { display: none } }
</style>
