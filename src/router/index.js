import { createRouter, createWebHistory } from 'vue-router'
import Swal from 'sweetalert2'

import LoginView from '@/views/LoginView.vue'
import HomeView from '@/views/HomeView.vue'
import CompraCripto from '@/views/CompraCripto.vue'
import VentaCripto from '@/views/VentaCripto.vue'
import HistorialMovs from '@/views/HistorialMovs.vue'
import EstadoCripto from '@/views/EstadoCripto.vue'
import AnalisisInversion from '@/views/AnalisisInversion.vue'

const routes = [
  {
    path: '/',
    name: 'LoginView',
    component: LoginView,
  },
  {
    path: '/HomeView',
    name: 'HomeView',
    component: HomeView,
    meta: { requiresAuth: true }
  },
  {
    path: '/CompraCripto',
    name: 'CompraCripto',
    component: CompraCripto,
    meta: { requiresAuth: true }
  },
  {
    path: '/VentaCripto',
    name: 'VentaCripto',
    component: VentaCripto,
    meta: { requiresAuth: true }
  },
  {
    path: '/HistorialMovs',
    name: 'HistorialMovs',
    component: HistorialMovs,
    meta: { requiresAuth: true }
  },
  {
    path: '/EstadoCripto',
    name: 'EstadoCripto',
    component: EstadoCripto,
    meta: { requiresAuth: true }
  },
  {
    path: '/AnalisisInversion',
    name: 'AnalisisInversion',
    component: AnalisisInversion,
    meta: { requiresAuth: true }
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// 🔐 Protección de rutas con alerta
router.beforeEach((to, from, next) => {
  const user = JSON.parse(localStorage.getItem('user'))

  if (to.meta.requiresAuth && !user) {
    Swal.fire({
      icon: 'warning',
      title: 'Acceso restringido',
      text: 'Debés iniciar sesión para acceder a esta página.',
      confirmButtonText: 'Ir al login',
    }).then(() => {
      next({ name: 'LoginView' })
    })
  } else {
    next()
  }
})

export default router
