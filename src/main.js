import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import './style.css'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/example-case-sesi-4' },
    { path: '/example-case-sesi-4', component: () => import('./views/ExampleCaseSesi4.vue') },
    { path: '/example-case-sesi-4-1', component: () => import('./views/ExampleCaseSesi41.vue') },
    { path: '/:pathMatch(.*)*', redirect: '/example-case-sesi-4' }
  ]
})

createApp(App).use(router).mount('#app')
