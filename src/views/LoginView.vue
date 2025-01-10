<template>
  <div>
    <h2>Login</h2>
    <button class="generate-id-button" @click="generateAndSaveId">Generar ID</button>
    <p v-if="error" style="color: red;">{{ error }}</p>
  </div>
</template>

<script>
import Swal from 'sweetalert2'; // Importar SweetAlert2
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
    async generateAndSaveId() {
      let newId;

      // Generar un nuevo ID que no esté repetido
      do {
        newId = this.generateRandomId(); // Generar ID aleatorio
      } while (this.checkIdInLocalStorage(newId));

      // Guardar el ID generado
      this.userId = newId;
      this.saveIdToLocalStorage(newId);
      this.saveUserId(newId);

      // Mostrar el SweetAlert2 con el ID generado
      await Swal.fire({
        title: 'ID generado',
        text: `Tu ID generado es: ${newId}`,
        icon: 'success',
        confirmButtonText: 'Ok',
      });

      // Navegar a la página de registro
      this.$router.push('/RegisterView');  

      this.error = null; // Resetear errores
    },
  },
};
</script>

<style scoped>
.generate-id-button {
  background-color: #1ce9b9; /* Color de fondo verde */
  color: rgb(15, 13, 13); /* Color de texto blanco */
  padding: 15px 32px; /* Espaciado interno */
  font-size: 16px; /* Tamaño de fuente */
  border: none; /* Sin borde */
  border-radius: 8px; /* Bordes redondeados */
  cursor: pointer; /* Cursor de mano al pasar por encima */
  transition: background-color 0.3s ease; /* Transición suave para el hover */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Sombra sutil */
}

.generate-id-button:hover {
  background-color: #96edd6; /* Color de fondo al pasar el mouse */
}

.generate-id-button:active {
  background-color: #388e3c; /* Color de fondo cuando se hace clic */
}

p {
  font-size: 14px;
  margin-top: 10px;
}
</style>
