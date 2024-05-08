import { createRouter, createWebHistory } from 'vue-router'
import PasapalabraView from '@/views/PasapalabraView.vue'
import CursoView from '@/views/CursosView.vue'
import AsignaturasView from '@/views/AsignaturasView.vue'
import AsignaturasJuegosView from '@/views/AsignaturasJuegosView.vue'
import JuegosView from '@/views/JuegosView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'





const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/pasapalabra/:id',
      name: 'pasapalabra-id',
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
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: {
        showHeader: true,
      }
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      meta: {
        showHeader: true,
      }
    },
  ]
})

export default router
