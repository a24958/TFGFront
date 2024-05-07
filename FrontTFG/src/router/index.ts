import { createRouter, createWebHistory } from 'vue-router'
import PasapalabraView from '@/views/PasapalabraView.vue'
import CursoView from '@/views/CursosView.vue'
import AsignaturasView from '@/views/AsignaturasView.vue'
import AsignaturasJuegosView from '@/views/AsignaturasJuegosView.vue'
import JuegosView from '@/views/JuegosView.vue'





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
      name: 'curso',
      component: CursoView
    },
    {
      path: '/curso/:id',
      name: 'curso-id',
      component: AsignaturasView,
      props: true,
      meta: {
        showHeader: true,
        requiresFetch: true
      }
    },
    {
      path: '/asignatura/:id',
      name: 'asignatura-id',
      component: AsignaturasJuegosView,
      props: true,
      meta: {
        showHeader: true,
        requiresFetch: true
      }
    },
    {
      path: '/asignatura-juego/:id',
      name: 'asignatura-juegos-id',
      component: JuegosView,
      props: true,
      meta: {
        showHeader: true,
        requiresFetch: true
      }
    },
  ]
})

export default router
