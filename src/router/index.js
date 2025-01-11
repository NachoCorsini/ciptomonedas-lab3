import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import HomeView from '@/views/HomeView.vue'
import CompraCripto from '@/views/CompraCripto.vue'
import VentaCripto from '@/views/VentaCripto.vue'
// eslint-disable-next-line no-unused-vars
import HistorialMovs from '@/views/HistorialMovs.vue'


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
  },
 
  {
    path: '/CompraCripto',
    name: 'CompraCripto',
    component:CompraCripto,
  },
  {
    path: '/VentaCripto',
    name: 'VentaCripto',
    component:VentaCripto,
  },
  {
    path: '/HistorialMovs',
    name: 'HistorialMovs',
    component:HistorialMovs,
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
