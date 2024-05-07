import { createRouter, createWebHistory } from 'vue-router'
import PasapalabraView from '@/views/PasapalabraView.vue'
import CursoView from '@/views/CursosView.vue'
import AsignaturasView from '@/views/AsignaturasView.vue'



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
    {
      path: '/curso/:id',
      name: 'play',
      component: AsignaturasView,
      props: true,
      meta: {
        showHeader: true,
        requiresFetch: true
      }
    },
  ]
})

export default router
