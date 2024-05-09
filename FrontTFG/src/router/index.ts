import { createRouter, createWebHistory } from 'vue-router'
import PasapalabraView from '@/views/PasapalabraView.vue'
import CursoView from '@/views/CursosView.vue'
import AsignaturasView from '@/views/AsignaturasView.vue'
import AsignaturasJuegosView from '@/views/AsignaturasJuegosView.vue'
import JuegosView from '@/views/JuegosView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import IntranetView from '@/views/IntranetView.vue'






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
  ]
})

router.beforeEach((to, from, next) => {
  // Verifica si la ruta requiere autenticación y si el usuario tiene el rol adecuado
  if (to.matched.some(record => record.meta.requiresAuth && record.meta.requiresAdmin)) {
    const userData = localStorage.getItem('userData');
    const rol = userData ? JSON.parse(userData).rol : null;

    // Verifica si el usuario tiene el rol de administrador
    if (rol !== 'Admin') {
      next('/login');
    } else {
      next();
    }
  } else {
    next();
  }
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth && record.meta.requiresGuest)) {
    const userData = localStorage.getItem('userData');
    const rol = userData ? JSON.parse(userData).rol : null;

    // Verifica si el usuario tiene el Guest de administrador
    if (rol !== 'Guest') {
      next('/login');
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router
