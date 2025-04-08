<template>
  <div class="login-container">
    <div class="login-box">
      <h2>Iniciar sesión</h2>

      <!-- Formulario de login -->
      <div class="input-group">
        <label for="email">Correo electrónico:</label>
        <input v-model="userEmail" type="email" id="email" placeholder="Introduce tu email" required />
      </div>
      <div class="input-group">
        <label for="password">Contraseña:</label>
        <input v-model="userPassword" type="password" id="password" placeholder="Introduce tu contraseña" required />
      </div>

      <!-- Botón de login -->
      <button @click="handleLogin">Iniciar sesión</button>

      <!-- Mensaje de error -->
      <p v-if="error" class="error-message">{{ error }}</p>

      <!-- Muestra ID y Email de forma más pequeña -->
      <div v-if="userEmail && userId" class="user-info">
        <span class="user-details">
          <span>ID: {{ userId }}</span>
          <span>Email: {{ userEmail }}</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import Swal from 'sweetalert2';

export default {
  data() {
    return {
      userEmail: '',
      userPassword: '',
      error: null, // Mensaje de error
      userId: '',  // Guardar el ID aquí para mostrarlo
    };
  },
  methods: {
    ...mapActions(['saveUserId', 'saveUserEmail']), // Mapear acciones para guardar en Vuex

    // Verificar si el email y la contraseña están correctos
    async handleLogin() {
      if (!this.userEmail || !this.userPassword) {
        this.error = 'Por favor, ingresa ambos campos.';
        return;
      }

      // Generar un ID alfanumérico aleatorio
      const newId = this.generateRandomId();

      // Guardar el email y el ID en Vuex
      this.saveUserId(newId);
      this.saveUserEmail(this.userEmail);

      // Guardar el ID, email y password en localStorage
      const user = { id: newId, email: this.userEmail, password: this.userPassword };
      localStorage.setItem('user', JSON.stringify(user));

      // Mostrar SweetAlert2
      await Swal.fire({
        title: 'Bienvenido',
        text: `Tu ID generado es: ${newId}`,
        icon: 'success',
        confirmButtonText: 'Ok',
      });

      // Navegar a la página principal
      this.$router.push('/HomeView');
    },

    // Generar ID aleatorio alfanumérico
    generateRandomId(length = 8) {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let result = '';
      for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return result;
    },
  },
};
</script>

<style scoped>
/* Contenedor principal */
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
 
}

/* Caja del formulario */
.login-box {
  background-image: url('../assets/krusty.png'); 
  background-size: cover;
  background-position: center;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 300px;
  text-align: center;
  color: #fff; /* Color de texto blanco para contrastar con la imagen */
}


/* Título */
h2 {
  color: #fff; /* Color de texto blanco */
  margin-bottom: 20px;
  font-size: 22px;
}

/* Estilos para los inputs */
.input-group {
  margin-bottom: 20px;
}

.input-group label {
  font-size: 14px;
  color: #fff; /* Color blanco para los labels */
  text-align: left;
  display: block;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;
  color: #333;
  margin-bottom: 10px;
  outline: none;
}

input:focus {
  border-color: #1ce9b9;
}

/* Estilo para el botón */
button {
  background-color: #1ce9b9;
  color: white;
  padding: 12px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
  font-size: 16px;
}

button:hover {
  background-color: #17a895;
}

/* Mensaje de error */
.error-message {
  color: rgb(250, 250, 250);
  font-size: 12px;
  margin-top: 10px;
}

/* Mostrar los datos del usuario en pequeño */
.user-info {
  margin-top: 20px;
  font-size: 12px;
  color: #fff;
}

.user-details span {
  display: block;
  font-size: 12px;
  color: #fff;
}
</style>
