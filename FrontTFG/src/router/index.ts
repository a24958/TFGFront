import { createRouter, createWebHistory } from 'vue-router'
import PasapalabraView from '@/views/PasapalabraView.vue'
import CursoView from '@/views/CursosView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/pasapalabra',
      name: 'home',
      component: PasapalabraView
    },
    {
      path: '/curso',
      name: 'home',
      component: CursoView
    },
  ]
})

export default router
