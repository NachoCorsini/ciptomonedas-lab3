import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 🔁 Redirige a WelcomeView solo la primera vez que se abre la app
const hasVisited = sessionStorage.getItem("hasVisited")

if (!hasVisited) {
  sessionStorage.setItem("hasVisited", "true")
  // Redirecciona directamente al splash
  window.location.replace("/")
} else {
  // Crea la app normalmente
  createApp(App).use(store).use(router).mount('#app')
}
