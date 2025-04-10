<template>
  <div class="home">
    <NavBar />

    <h1>Bienvenido a Krustywallet</h1>
    <p>Tu billetera digital para administrar y comprar criptomonedas de forma segura.</p>

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

    <!-- Panel ticker de criptomonedas -->
    <div class="ticker-container" v-if="resumen.length">
      <div class="ticker">
        <div class="ticker-track">
          <span v-for="(item, index) in resumen" :key="index">
            {{ item.crypto.toUpperCase() }}: {{ item.amount.toFixed(4) }} &nbsp;&nbsp;&nbsp;
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import axios from 'axios';

export default {
  name: 'HomeView',
  components: { NavBar },
  data() {
    return {
      resumen: [],
    };
  },
  methods: {
    navigateTo(routename) {
      this.$router.push({ name: routename });
    },
    async cargarResumen() {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const userId = user?.id;
        if (!userId) return;

        const res = await axios.get(
          `https://laboratorio3-f36a.restdb.io/rest/transactions?q={"user_id":"${userId}"}`,
          {
            headers: {
              'x-apikey': '60eb09146661365596af552f',
            },
          }
        );

        const transacciones = res.data;
        const resumen = {};

        transacciones.forEach(tx => {
          const crypto = tx.crypto_code.toLowerCase();
          const cantidad = parseFloat(tx.crypto_amount);
          if (!resumen[crypto]) resumen[crypto] = 0;
          resumen[crypto] += tx.action === 'purchase' ? cantidad : -cantidad;
        });

        this.resumen = Object.entries(resumen)
          .filter(([, val]) => val > 0)
          .map(([crypto, amount]) => ({ crypto, amount }));
      } catch (error) {
        console.error("Error al cargar resumen de criptos:", error);
      }
    }
  },
  mounted() {
    this.cargarResumen();
  }
};
</script>

<style scoped>
.home {
  text-align: center;
  padding: 20px;
  margin-top: 80px;
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

/* Ticker con fondo igual que App.vue */
.ticker-container {
  margin-top: 40px;
  overflow: hidden;
  width: 100%;
  background: linear-gradient(to right, #fff0f5, #fcbab2);
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  padding: 10px 0;
}

.ticker {
  white-space: nowrap;
  overflow: hidden;
  position: relative;
}

.ticker-track {
  display: inline-block;
  padding-left: 100%;
  animation: scroll 15s linear infinite;
  font-weight: bold;
  color: #333;
  font-size: 1.1em;
}

@keyframes scroll {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-100%);
  }
}
</style>
