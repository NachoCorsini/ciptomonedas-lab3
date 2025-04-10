<template>
  <div class="login-container">
    <div class="login-box">
      <img src="@/assets/krusty.jpg" alt="Krusty Logo" class="login-logo" />
      <h2 class="animated-text">¡Bienvenido a KrustyWallet!</h2>

      <div class="input-group">
        <label for="email">Correo electrónico:</label>
        <input v-model="userEmail" type="email" id="email" placeholder="Introduce tu email" required />
      </div>

      <div class="input-group">
        <label for="password">Contraseña:</label>
        <input v-model="userPassword" type="password" id="password" placeholder="Introduce tu contraseña" required />
      </div>

      <ul class="validation-list" v-if="userPassword">
        <li :class="{ valid: validLength }">✔ Mínimo 6 caracteres</li>
        <li :class="{ valid: hasUppercase }">✔ Al menos una mayúscula</li>
        <li :class="{ valid: hasLowercase }">✔ Al menos una minúscula</li>
        <li :class="{ valid: hasNumber }">✔ Al menos un número</li>
      </ul>

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
import Swal from 'sweetalert2';
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      userEmail: '',
      userPassword: '',
      userId: '',
      error: null,
    };
  },
  computed: {
    validLength() {
      return this.userPassword.length >= 6;
    },
    hasUppercase() {
      return /[A-Z]/.test(this.userPassword);
    },
    hasLowercase() {
      return /[a-z]/.test(this.userPassword);
    },
    hasNumber() {
      return /\d/.test(this.userPassword);
    },
    isEmailValid() {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.userEmail);
    }
  },
  methods: {
    ...mapActions(['saveUserId', 'saveUserEmail', 'saveUserPassword']),
    
    async handleLogin() {
      this.error = null;

      if (!this.userEmail || !this.userPassword) {
        this.error = 'Por favor, completa todos los campos.';
        return;
      }

      if (!this.isEmailValid) {
        this.error = 'El correo electrónico no es válido.';
        return;
      }

      if (!this.validLength || !this.hasUppercase || !this.hasLowercase || !this.hasNumber) {
        this.error = 'La contraseña no cumple con los requisitos.';
        return;
      }

      let existingUser = JSON.parse(localStorage.getItem('user'));

      if (existingUser && existingUser.email === this.userEmail && existingUser.password === this.userPassword) {
        this.userId = existingUser.id;
      } else {
        this.userId = this.generateRandomId();
        existingUser = {
          id: this.userId,
          email: this.userEmail,
          password: this.userPassword
        };
        localStorage.setItem('user', JSON.stringify(existingUser));
      }

      this.saveUserId(this.userId);
      this.saveUserEmail(this.userEmail);
      this.saveUserPassword(this.userPassword);

      await Swal.fire({
        title: 'Bienvenido',
        text: `Tu ID es: ${this.userId}`,
        icon: 'success',
        confirmButtonText: 'Ok',
      });

      this.$router.push('/HomeView');
    },

    generateRandomId(length = 10) {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      return Array.from({ length }, () => chars.charAt(Math.floor(Math.random() * chars.length))).join('');
    }
  },
};
</script>

<style scoped>
/* Misma estética que antes */
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

.login-logo {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 0;
  margin-bottom: 15px;
  border: 2px solid #ccc;
}

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
  background-color: rgb(37, 157, 10);
  color: white;
  padding: 12px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  width: 100%;
  font-size: 16px;
}

button:hover {
  background-color: rgb(131, 239, 158);
}

.error-message {
  color: red;
  font-size: 13px;
  margin-top: 10px;
}

.validation-list {
  list-style: none;
  padding: 0;
  margin: 10px 0;
  text-align: left;
  font-size: 13px;
  color: #555;
}

.validation-list li {
  margin-bottom: 5px;
}

.validation-list li.valid {
  color: green;
}

.user-info {
  margin-top: 15px;
  font-size: 12px;
  color: #444;
}
</style>
