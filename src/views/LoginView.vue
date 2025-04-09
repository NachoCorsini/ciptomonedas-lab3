<template>
  <div class="login-container">
    <div class="login-box">
      
      <!-- Imagen -->
      <img
        src="@/assets/krusty.jpg"
        alt="Krusty Logo"
        class="login-logo"
      />

      <!-- Texto animado -->
      <h2 class="animated-text">¡Bienvenido a KrustyWallet!</h2>

      <div class="input-group">
        <label for="email">Correo electrónico:</label>
        <input v-model="userEmail" type="email" id="email" placeholder="Introduce tu email" required />
      </div>
      <div class="input-group">
        <label for="password">Contraseña:</label>
        <input v-model="userPassword" type="password" id="password" placeholder="Introduce tu contraseña" required />
      </div>

      <button @click="handleLogin">Iniciar sesión</button>

      <p v-if="error" class="error-message">{{ error }}</p>

      <div v-if="userEmail && userId" class="user-info">
        <span>ID: {{ userId }}</span>
        <span>Email: {{ userEmail }}</span>
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
      error: null,
      userId: '',
    };
  },
  methods: {
    ...mapActions(['saveUserId', 'saveUserEmail']),
    async handleLogin() {
      if (!this.userEmail || !this.userPassword) {
        this.error = 'Por favor, ingresa ambos campos.';
        return;
      }

      const newId = this.generateRandomId();
      this.saveUserId(newId);
      this.saveUserEmail(this.userEmail);
      localStorage.setItem('user', JSON.stringify({ id: newId, email: this.userEmail, password: this.userPassword }));

      await Swal.fire({
        title: 'Bienvenido',
        text: `Tu ID generado es: ${newId}`,
        icon: 'success',
        confirmButtonText: 'Ok',
      });

      this.$router.push('/HomeView');
    },
    generateRandomId(length = 8) {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
    },
  },
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.login-box {
  background-color: white;
  padding: 40px 30px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 340px;
  text-align: center;
}

/* Nueva imagen */
.login-logo {
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin-bottom: 10px;
  border: 2px solid #ccc;
}

/* Texto animado */
.animated-text {
  color: #333;
  font-size: 20px;
  margin-bottom: 20px;
  animation: floatText 3s ease-in-out infinite;
}

@keyframes floatText {
  0% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
  100% { transform: translateY(0); }
}

.input-group {
  margin-bottom: 20px;
  text-align: left;
}

.input-group label {
  font-size: 14px;
  margin-bottom: 5px;
  display: block;
  color: #555;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
}

button {
  background-color:rgb(37, 157, 10);
  color: white;
  padding: 12px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  width: 100%;
  font-size: 16px;
}

button:hover {
  background-color:rgb(131, 239, 158);
}

.error-message {
  color: red;
  font-size: 13px;
  margin-top: 10px;
}

.user-info {
  margin-top: 15px;
  font-size: 12px;
  color: #444;
}
</style>
