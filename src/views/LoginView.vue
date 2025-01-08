<template>
    <div>
      <h2>Login</h2>
      <label for="userId">ID alfanumérico:</label>
      <input
        type="text"
        id="userId"
        v-model="userId"
        @input="error = null"
        placeholder="Ingresa o genera un ID"
        disabled
      />
      <button @click="generateAndSaveId"> Generar ID </button>
      <p v-if="error" style="color: red;">{{ error }}</p>
    </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      userId: '', // ID ingresado o generado
      error: null, // Mensaje de error para las validaciones
    };
  },
  methods: {
    ...mapActions(['saveUserId']), // Acción para guardar el ID en Vuex

    // Generar un ID alfanumérico aleatorio
    generateRandomId(length = 8) {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let result = '';
      for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return result;
    },

    // Verifica si el ID ya existe en el localStorage
    checkIdInLocalStorage(id) {
      const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
      return storedUsers.includes(id); // Retorna true si el ID ya existe
    },

    // Guarda el ID en el localStorage
    saveIdToLocalStorage(id) {
      const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
      storedUsers.push(id); // Agrega el ID a la lista
      localStorage.setItem('users', JSON.stringify(storedUsers)); // Guarda la lista actualizada
    },

    // Generar y guardar un ID automáticamente, luego navegar
    generateAndSaveId() {
      let newId;

      // Generar un nuevo ID que no esté repetido
      do {
        newId = this.generateRandomId(); // Generar ID aleatorio
      } while (this.checkIdInLocalStorage(newId));

      // Guardar el ID generado
      this.userId = newId;
      this.saveIdToLocalStorage(newId);
      this.saveUserId(newId);
      alert(`ID generado: ${newId}`);
      
      //navego a la pagina home
      this.$router.push('/RegisterView');  

      this.error = null; // Resetear errores
    },
  },
};
</script>