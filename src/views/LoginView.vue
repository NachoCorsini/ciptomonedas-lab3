<template>
  <div class="login-container">
    <div class="login-box animate__animated animate__fadeInDown">
      <h2>Iniciar sesión</h2>

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
  name: "LoginView",
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

      const user = {
        id: newId,
        email: this.userEmail,
        password: this.userPassword,
      };
      localStorage.setItem('user', JSON.stringify(user));

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
@import "https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css";

.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(to right, #fff0f5, #fcbab2);
  padding: 20px;
}

.login-box {
  background: #ffffff;
  padding: 35px;
  border-radius: 12px;
  width: 340px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);
  text-align: center;
}

h2 {
  margin-bottom: 20px;
  color: #222;
}

.input-group {
  margin-bottom: 20px;
  text-align: left;
}

.input-group label {
  font-size: 14px;
  display: block;
  color: #444;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
  outline: none;
}

input:focus {
  border-color: #ff7f8f;
}

button {
  background-color: #ff6e7f;
  color: white;
  padding: 12px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  width: 100%;
  font-size: 16px;
}

button:hover {
  background-color: #f1546a;
}

.error-message {
  color: #d32f2f;
  font-size: 13px;
  margin-top: 10px;
}

.user-info {
  margin-top: 20px;
  font-size: 12px;
  color: #555;
}

.user-details span {
  display: block;
  margin-top: 5px;
}
</style>
