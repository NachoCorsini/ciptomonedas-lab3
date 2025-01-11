<template>
  <div>
    <!-- Sección superior con el ID y el email del usuario -->
    <div class="user-info">
      <span class="user-details">
        <span>ID: {{ userId }}</span>
        <span>Email: {{ userEmail }}</span>
      </span>
      <button class="logout-btn" @click="logout">Salir</button>
    </div>
    
    <h1>Bienvenido a Krustywallet</h1>
    <p>Tu billetera digital para administrar y comprar criptomonedas de forma segura.</p>
    
    <!-- Sección de imágenes con epígrafes como botones -->
    <div class="features">
      <div class="feature" @click="navigateTo('CompraCripto')">
        <img src="../assets/compracripto.png" alt="Comprar Criptomonedas" />
        <p>Compra tus criptos preferidas</p>
      </div>
      <div class="feature" @click="navigateTo('VentaCripto')">
        <img src="../assets/ventacripto.png" alt="Vender Criptomonedas" />
        <p>Vende tus criptos cuando lo necesites</p>
      </div>
      <div class="feature" @click="navigateTo('HistorialMovs')">
        <img src="../assets/transfercripto.jpg" alt="Estado de Criptomonedas" />
        <p>Visualiza el estado de tus criptos en tiempo real</p>
      </div>
      <div class="feature" @click="navigateTo('PortfolioCripto')">
        <img src="../assets/portfoliocripto.jpg" alt="Historial de Movimientos" />
        <p>Observa todos tus movimientos de compra y venta</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  data() {
    return {
      userId: '',
      userEmail: '',
    };
  },
  mounted() {
    // Obtener datos del usuario desde Vuex o localStorage
    const user = JSON.parse(localStorage.getItem('user')) || {};
    this.userId = user.id || 'No disponible';
    this.userEmail = user.email || 'No disponible';
  },
  methods: {
    navigateTo(routename) {
      // Redirige a la página específica según el nombre de la ruta
      this.$router.push({ name: routename });
    },
    logout() {
      // Eliminar los datos del usuario en localStorage
      localStorage.removeItem('user');
      
      // Redirigir a la vista de login
      this.$router.push({ name: 'LoginView' });
    },
  },
};
</script>

<style scoped>
.home {
  text-align: center;
  padding: 20px;
}

h1 {
  font-size: 2.5em;
  color: #333;
}

p {
  font-size: 1.2em;
  color: #555;
  margin-bottom: 20px;
}

.features {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 20px;
}

.feature {
  width: 200px;
  text-align: center;
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
  border-radius: 10px;
  padding: 10px;
}

.feature:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 8px rgba(22, 23, 23, 0.807);
}

.feature img {
  width: 100%;
  max-width: 150px;
  border-radius: 8px;
  margin-bottom: 10px;
}

.feature p {
  font-size: 1em;
  color: #333;
  margin-top: 10px;
}

.user-info {
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.user-details {
  font-size: 0.9em; /* Más pequeño */
  color: #333;
}

.logout-btn {
  padding: 6px 12px;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.8em; /* Más pequeño */
}

.logout-btn:hover {
  background-color: #e53935;
}
</style>
