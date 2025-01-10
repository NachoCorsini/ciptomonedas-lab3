<template>
  <div class="home">
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
      <div class="feature" @click="navigateTo('TransferCripto')">
        <img src="../assets/transfercripto.jpg" alt="Estado de Criptomonedas" />
        <p>El estado de tus criptos en tiempo real</p>
      </div>
      <div class="feature" @click="navigateTo('PortfolioCripto')">
        <img src="../assets/portfoliocripto.jpg" alt="Historial de Movimientos" />
        <p>Observa todos tus movimietnos de compra y venta </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  methods: {
    navigateTo(CompraCripto) {
      // Redirige a la página específica según el nombre de la ruta
      this.$router.push({ name: CompraCripto });
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
  box-shadow: 0 4px 8px rgba(5, 170, 143, 0.807);
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
