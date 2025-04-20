import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import HomeView from '@/views/HomeView.vue'
import CompraCripto from '@/views/CompraCripto.vue'
import VentaCripto from '@/views/VentaCripto.vue'
import HistorialMovs from '@/views/HistorialMovs.vue'
import EstadoCripto from '@/views/EstadoCripto.vue'
import AnalisisInversion from '@/views/AnalisisInversion.vue'
import Swal from 'sweetalert2'
import WelcomeView from '@/views/WelcomeView.vue'

const routes = [
  {
    path: '/',
    name: 'LoginView',
    component: LoginView
  },
  {
    path: '/HomeView',
    name: 'HomeView',
    component: HomeView
  },
  {
    path: '/CompraCripto',
    name: 'CompraCripto',
    component: CompraCripto
  },
  {
    path: '/VentaCripto',
    name: 'VentaCripto',
    component: VentaCripto
  },
  {
    path: '/HistorialMovs',
    name: 'HistorialMovs',
    component: HistorialMovs
  },
  {
    path: '/EstadoCripto',
    name: 'EstadoCripto',
    component: EstadoCripto
  },
  {
    path: '/AnalisisInversion',
    name: 'AnalisisInversion',
    component: AnalisisInversion
  },
  {
    path: '/welcome',
    name: 'WelcomeView',
    component: WelcomeView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

//Protegemos rutas para los que saben programacion 
router.beforeEach((to, from, next) => {
  const rutasPublicas = ['LoginView', 'WelcomeView']
  const estaLogueado = !!localStorage.getItem('user')

  if (!rutasPublicas.includes(to.name) && !estaLogueado) {
    Swal.fire({
      icon: 'info',
      title: 'Acceso restringido',
      text: 'Debes iniciar sesión para acceder a esta página',
      confirmButtonText: 'Ok',
      timer: 3000,
      timerProgressBar: true
    }).then(() => {
      next({ name: 'LoginView' })
    })
  } else {
    next()
  }
})

export default router
