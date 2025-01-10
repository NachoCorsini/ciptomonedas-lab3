import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import HomeView from '@/views/HomeView.vue'
import RegisterView from '@/views/RegisterView.vue'
import CompraCripto from '@/views/CompraCripto.vue'
import VentaCripto from '@/views/VentaCripto.vue'


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
    path: '/RegisterView',
    name: 'RegisterView',
    component: RegisterView,
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

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
