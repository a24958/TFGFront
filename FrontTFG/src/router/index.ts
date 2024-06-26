import { createRouter, createWebHistory } from 'vue-router'
import PasapalabraView from '@/views/PasapalabraView.vue'
import CursoView from '@/views/CursosView.vue'
import AsignaturasView from '@/views/AsignaturasView.vue'
import JuegosView from '@/views/JuegosView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import IntranetView from '@/views/IntranetView.vue'
import HomeView from '@/views/HomeView.vue'
import CrearPasapalabraView from '@/views/CrearPasapalabraView.vue'
import GameCardsView from '@/views/GameCardsView.vue'
import TeacherGraphView from '@/views/TeacherGraphView.vue'
import TipoJuegoView from '@/views/TipoJuegoView.vue'
import UsuarioEstadisticasView from '@/views/UsuarioEstadisticasView.vue'

import PasapalabraMultiplayerView from '@/views/PasapalabraMultiplayerView.vue'
import AhorcadoView from '@/views/AhorcadoView.vue'
import UsuariosView from '@/views/UsuariosView.vue'




const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/pasapalabra/:id',
      name: 'pasapalabra-id',
      component: PasapalabraView,
      meta: {
        showHeader: false,
        requiresFetch: true
      }
    },
    {
      path: '/ahorcado/:id',
      name: 'ahorcado',
      component: AhorcadoView,
      meta: {
        showHeader: true,
      }
    },
    {
      path: '/multiplayer',
      name: 'multiplayer',
      component: PasapalabraMultiplayerView,
      meta: {
        showHeader: false,
        requiresFetch: true
      }
    },
    {
      path: '/intranet/curso',
      name: 'curso',
      component: CursoView,
      props: true,
      meta: {
        showHeader: false,
        requiresAdmin: true,
        requiresAuth: true,
      }
    },
    {
      path: '/intranet/asignatura',
      name: 'asignatura',
      component: AsignaturasView,
      meta: {
        showHeader: false,
        requiresAdmin: true,
        requiresAuth: true,
      }
    },
    {
      path: '/intranet/tipojuego',
      name: 'tipojuego',
      component: TipoJuegoView,
      props: true,
      meta: {
        showHeader: false,
        requiresAdmin: true,
        requiresAuth: true,
      }
    },
    {
      path: '/intranet/usuario',
      name: 'usuarios',
      component: UsuariosView,
      props: true,
      meta: {
        showHeader: false,
        requiresAdmin: true,
        requiresAuth: true,
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
    {
      path: '/intranet',
      name: 'intranet',
      component: IntranetView,
      meta: {
        showHeader: false,
        requiresAdmin: true,
        requiresAuth: true,
      }
    },
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        showHeader: true,
        requiresAdmin: false,
        requiresAuth: false,
      }
    },
    {
      path: '/usuario',
      name: 'usuario',
      component: UsuarioEstadisticasView,
      meta: {
        showHeader: false,
        requiresAdmin: false,
        requiresAuth: false,
      }
    },
    {
      path: '/teacher-intranet/crear-juegos',
      name: 'teacher-intranet-crear-juegos',
      component: CrearPasapalabraView,
      meta: {
        showHeader: false,
        requiresAdmin: false,
        requiresAuth: true,
        requiresTeacher: true,
      }
    },
    {
      path: '/game-search-result',
      name: 'game-search-result',
      component: GameCardsView,
      meta: {
        showHeader: true,
        requiresAdmin: false,
        requiresAuth: false,
      }
    },
    {
      path: '/teacher-intranet/graphs',
      name: 'teacher-intranet-graphs',
      component: TeacherGraphView,
      meta: {
        showHeader: false,
        requiresAdmin: false,
        requiresAuth: true,
        requiresTeacher: true,

      }
    },
  ]
})

router.beforeEach((to, from, next) => {
  const userData = localStorage.getItem('userData');
  const rol = userData ? JSON.parse(userData).rol : null;

  if (to.matched.some(record => record.meta.requiresAuth && record.meta.requiresAdmin)) {
    // Verifica si el usuario tiene el rol de administrador
    if (rol !== 'Admin') {
      next('/login');
    } else {
      next();
    }
  } else if (to.matched.some(record => record.meta.requiresAuth && record.meta.requiresTeacher)) {
    // Verifica si el usuario tiene el rol de profesor
    if (rol !== 'Profesor') {
      next('/login');
    } else {
      next();
    }
  } else if (to.matched.some(record => record.meta.requiresAuth && record.meta.requiresGuest)) {
    // Verifica si el usuario tiene el rol de alumno
    if (rol !== 'Alumno') {
      next('/login');
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
