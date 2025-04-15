<template>
  <div class="login-container">
    <div class="login-box">
      <h2 class="animated-text">¡Bienvenido a KrustyWallet!</h2>

      <div class="input-group">
        <label for="email">Correo electrónico:</label>
        <input
          v-model="userEmail"
          type="email"
          id="email"
          placeholder="Introduce tu email"
          required
          maxlength="40"
        />
      </div>

      <div class="input-group">
        <label for="password">Contraseña:</label>
        <div class="password-wrapper">
          <input
            :type="showPassword ? 'text' : 'password'"
            v-model="userPassword"
            id="password"
            placeholder="Introduce tu contraseña"
            required
            maxlength="15"
          />
          <span class="eye-icon" @click="showPassword = !showPassword">
            <svg
              v-if="!showPassword"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="1.8"
            >
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="1.8"
            >
              <path d="M17.94 17.94A10.94 10.94 0 0112 20C5 20 1 12 1 12a21.8 21.8 0 014.58-5.76M3 3l18 18" />
            </svg>
          </span>
        </div>
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
      showPassword: false,
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
    },
  },
  methods: {
    ...mapActions(['saveUserId', 'saveUserEmail']),
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

      if (
        !this.validLength ||
        !this.hasUppercase ||
        !this.hasLowercase ||
        !this.hasNumber
      ) {
        this.error = 'La contraseña no cumple con los requisitos.';
        return;
      }

      let existingUser = JSON.parse(localStorage.getItem('user'));

      if (existingUser && existingUser.email === this.userEmail) {
        this.userId = existingUser.id;
      } else {
        this.userId = this.generateRandomId();
        existingUser = {
          id: this.userId,
          email: this.userEmail,
        };
        localStorage.setItem('user', JSON.stringify(existingUser));
      }

      this.saveUserId(this.userId);
      this.saveUserEmail(this.userEmail);

      await Swal.fire({
        title: 'Bienvenido',
        text: `Tu ID es: ${this.userId}`,
        icon: 'success',
        confirmButtonText: 'Ok',
      });

      this.$router.push('/HomeView');
    },

    generateRandomId(length = 10) {
      const chars =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      return Array.from({ length }, () =>
        chars.charAt(Math.floor(Math.random() * chars.length))
      ).join('');
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
  position: relative;
  padding: 40px 30px;
  border-radius: 12px;
  width: 340px;
  text-align: center;
  background-image: url("@/assets/krustyportada.png");
  background-size: cover;
  background-position: center bottom 20px;
  background-repeat: no-repeat;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5);
}

.login-box::before {
  content: "";
  position: absolute;
  inset: 0;
  background-color: rgba(245, 246, 246, 0.431);
  z-index: 0;
  border-radius: 12px;
}

.login-box * {
  position: relative;
  z-index: 1;
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

.password-wrapper {
  position: relative;
}

.password-wrapper input {
  width: 100%;
  padding-right: 30px;
}

.eye-icon {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: #333;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
  box-sizing: border-box;
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
