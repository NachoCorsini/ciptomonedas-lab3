<template>
  <div class="home">
    <!-- Navbar reutilizable -->
    <NavBar />

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
        <p>Observa todos tus movimientos de compra y venta</p>
      </div>
      <div class="feature" @click="navigateTo('EstadoCripto')">
        <img src="../assets/portfoliocripto.jpg" alt="Historial de Movimientos" />
        <p>Visualiza el estado de tus criptos en tiempo real</p>
      </div>
      <div class="feature" @click="navigateTo('AnalisisInversion')">
        <img src="../assets/analisisinversiones.jpg" alt="Análisis de Inversiones" />
        <p>Descubrí el rendimiento de tus inversiones</p>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';

export default {
  name: 'HomeView',
  components: {
    NavBar
  },
  methods: {
    navigateTo(routename) {
      this.$router.push({ name: routename });
    }
  }
};
</script>

<style scoped>
.home {
  text-align: center;
  padding: 20px;
  margin-top: 80px; /* para que no se tape con la navbar fija */
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
</style>
