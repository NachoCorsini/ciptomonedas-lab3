<template>
    <div class="navbar">
      <!-- Botón Home (oculto en HomeView) -->
      <router-link
        to="/HomeView"
        class="home-link"
        v-if="$route.name !== 'HomeView'"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" stroke-width="2"
          stroke-linecap="round" stroke-linejoin="round" class="icon">
          <path d="M3 9l9-7 9 7" />
          <path d="M9 22V12h6v10" />
        </svg>
        <span class="home-text">Home</span>
      </router-link>
  
      <!-- Info usuario y botón salir -->
      <div class="user-info">
        <span>ID: <strong>{{ user.id }}</strong></span>
        <span>Email: <strong>{{ user.email }}</strong></span>
        <button class="logout-btn" @click="logout">Salir</button>
      </div>
    </div>
  </template>
  
  <script>
  import Swal from 'sweetalert2'
  
  export default {
    name: 'NavBar',
    data() {
      return {
        user: {
          id: '',
          email: ''
        }
      }
    },
    mounted() {
      const storedUser = JSON.parse(localStorage.getItem('user')) || {}
      this.user.id = storedUser.id || 'No disponible'
      this.user.email = storedUser.email || 'No disponible'
    },
    methods: {
      logout() {
        Swal.fire({
          title: '¿Cerrar sesión?',
          text: '¿Estás seguro de que querés salir?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Sí, salir',
          cancelButtonText: 'Cancelar',
        }).then((result) => {
          if (result.isConfirmed) {
            localStorage.clear()
            this.$store.dispatch("saveUserId", null)
            this.$store.dispatch("saveUserEmail", null)
  
            Swal.fire({
              icon: 'success',
              title: 'Sesión cerrada',
              showConfirmButton: false,
              timer: 1200,
            })
            this.$router.push({ name: 'LoginView' })
          }
        })
      }
    }
  }
  </script>
  
  <style scoped>
  .navbar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 60px;
    background-color: linear-gradient(to right, #efefef, #85fdcb);;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 0 20px;
    z-index: 1000;
  }
  
  .home-link {
    display: flex;
    align-items: center;
    color: #333;
    text-decoration: none;
    transition: color 0.3s ease;
    margin-right: auto;
  }
  
  .home-link:hover {
    color: #007bff;
  }
  
  .icon {
    width: 24px;
    height: 24px;
    margin-right: 6px;
  }
  
  .user-info {
    display: flex;
    align-items: center;
    gap: 15px;
    font-size: 0.9em;
    color: #333;
  }
  
  .logout-btn {
    padding: 6px 12px;
    background-color: #f44336;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 0.8em;
  }
  
  .logout-btn:hover {
    background-color: #e53935;
  }
  </style>
  