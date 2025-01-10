<template>
    <div>
      <h1>Iniciar Sesión</h1>
      <button @click="showInputAlert">INGRESA AQUÍ</button>
    </div>
  </template>
  
  <script>
  import Swal from "sweetalert2";
  
  export default {
    name: "RegisterView",
    data() {
      return {
        email: "",
        password: "",
      };
    },
    methods: {
      async showInputAlert() {
        // Pedir email
        const { value: email } = await Swal.fire({
          title: "Ingresa tu email",
          input: "email",
          inputLabel: "Email",
          inputPlaceholder: "ejemplo@correo.com",
          showCancelButton: true,
        });
  
        if (email) {
          this.email = email;
  
          // Pedir contraseña
          const { value: password } = await Swal.fire({
            title: "Ingresa tu contraseña",
            input: "password",
            inputLabel: "Contraseña",
            inputPlaceholder: "Ingresa tu contraseña",
            inputAttributes: {
              maxlength: 15,
              autocapitalize: "off",
              autocorrect: "off",
            },
            showCancelButton: true,
          });
  
          if (password) {
            this.password = password;
  
            // Guardar en localStorage
            localStorage.setItem("userEmail", this.email);
            localStorage.setItem("userPassword", this.password);
  
            // Confirmación final
            Swal.fire({
                icon: "success",
                title: "¡Registro Exitoso!",
                text: `Email: ${this.email}`,
                timer: 1000, // Cierra automáticamente después de 1 segundo
                timerProgressBar: true, // Muestra la barra de progreso
                willClose: () => {
                // Redirigir a HomeView después de que el modal se cierre
                 this.$router.push("/HomeView");
                },
              
            });

           
          }
        }
      },
    },
  };
  </script>
  
  