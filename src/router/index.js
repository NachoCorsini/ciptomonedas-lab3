import { createRouter, createWebHistory } from 'vue-router'
import WelcomeView from '@/views/WelcomeView.vue'
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
    name: 'WelcomeView',
    component: WelcomeView,
  },
  {
    path: '/login',
    name: 'LoginView',
    component: LoginView,
  },
  {
    path: '/HomeView',
    name: 'HomeView',
    component: HomeView,
  },
  {
    path: '/CompraCripto',
    name: 'CompraCripto',
    component: CompraCripto,
  },
  {
    path: '/VentaCripto',
    name: 'VentaCripto',
    component: VentaCripto,
  },
  {
    path: '/HistorialMovs',
    name: 'HistorialMovs',
    component: HistorialMovs,
  },
  {
    path: '/EstadoCripto',
    name: 'EstadoCripto',
    component: EstadoCripto,
  },
  {
    path: '/AnalisisInversion',
    name: 'AnalisisInversion',
    component: AnalisisInversion,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
