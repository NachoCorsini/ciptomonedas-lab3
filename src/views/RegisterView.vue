<template>

    <div>
      <h1>Iniciar Sesión</h1>
      <form @submit.prevent="saveCredentials">
        <div>
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="email" required />
        </div>
        <div>
          <label for="password">Contraseña:</label>
          <input type="password" id="password" v-model="password" required />
        </div>
        <button type="submit">Guardar y continuar</button>
      </form>
    </div>
</template>
  
  <script>

  export default {
    name: 'RegisterView',

    data() {
      return {
        email: "",
        password: "",
      };
    },
    methods: {
      saveCredentials() {
        localStorage.setItem("email", this.email);
        localStorage.setItem("password", this.password);
        alert("Credenciales guardadas correctamente");
        this.$router.push("/HomeView"); 
      },
    },
  };
  </script>
  