<template>
  <div class="CompraCripto">
    <!-- Icono y texto de Home -->
    <div class="home-icon">
      <router-link to="/HomeView" class="home-link">
        <span class="icon">
          <!-- Ícono SVG de casa -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="home-svg"
          >
            <path d="M3 9l9-7 9 7" />
            <path d="M9 22V12h6v10" />
          </svg>
        </span>
        <span class="text">Home</span>
      </router-link>
    </div>

    <h1>Compra tus Criptomonedas</h1>
    <div class="crypto-select">
      <label for="crypto">Selecciona una criptomoneda:</label>
      <select v-model="selectedCrypto" id="crypto" @change="calcularPrecio">
        <option disabled value="">-- Selecciona --</option>
        <option value="usdt">USDT</option>
        <option value="btc">BTC</option>
        <option value="eth">Ethereum</option>
      </select>
    </div>
    <div v-if="valorCrypto !== null" class="crypto-value">
      <p>Valor de la criptomoneda: {{ valorCrypto }} ARS</p>
    </div>
    <div class="crypto-amount">
      <label for="amount">Cantidad a comprar:</label>
      <input
        type="number"
        v-model="amount"
        id="amount"
        min="0"
        @input="calcularPrecio"
      />
    </div>
    <div v-if="precioTotal !== null" class="crypto-price">
      <p>Precio total: {{ precioTotal }} ARS</p>
    </div>
    <button @click="confirmPurchase">Comprar</button>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import axios from "axios";

export default {
  name: "CompraCripto",
  data() {
    return {
      selectedCrypto: "",
      amount: 0,
      precioTotal: null,
      valorCrypto: null,
      criptomonedas: [
        { id: "usdt", nombre: "USDT" },
        { id: "btc", nombre: "BTC" },
        { id: "eth", nombre: "Ethereum" },
      ],
    };
  },
  methods: {
    async calcularPrecio() {
      if (!this.selectedCrypto || this.amount <= 0) {
        this.precioTotal = null;
        this.valorCrypto = null;
        return;
      }
      const criptomoneda = this.criptomonedas.find(
        (c) => c.id === this.selectedCrypto
      );
      if (criptomoneda) {
        const url = `https://criptoya.com/api/argenbtc/${criptomoneda.id}/ars/${this.amount}`;
        try {
          const response = await axios.get(url);
          this.precioTotal = response.data.ask * this.amount.toFixed(3);
          this.precioTotal = new Intl.NumberFormat("de-DE").format(
            this.precioTotal
          );
          this.valorCrypto = response.data.ask;
        } catch (error) {
          console.error("Error al calcular el precio:", error);
          this.precioTotal = null;
          this.valorCrypto = null;
        }
      }
    },
    async confirmPurchase() {
      if (
        !this.selectedCrypto ||
        this.amount <= 0 ||
        this.precioTotal === null
      ) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Debes seleccionar una criptomoneda, una cantidad válida y calcular el precio.",
        });
        return;
      }

      const result = await Swal.fire({
        title: "¿Estás seguro?",
        text: `Vas a comprar ${
          this.amount
        } ${this.selectedCrypto.toUpperCase()} por ${this.precioTotal} ARS.`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, comprar",
        cancelButtonText: "Cancelar",
      });

      if (result.isConfirmed) {
        try {
          const historialMovimientos =
            JSON.parse(localStorage.getItem("historialMovimientos")) || [];
          historialMovimientos.push({
            tipo: "compra",
            nombre: this.selectedCrypto,
            precio: this.precioTotal,
            cantidad: this.amount,
          });
          localStorage.setItem(
            "historialMovimientos",
            JSON.stringify(historialMovimientos)
          );

          Swal.fire({
            icon: "success",
            title: "Compra realizada",
            text: `Has comprado ${
              this.amount
            } ${this.selectedCrypto.toUpperCase()}.`,
          });
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Hubo un problema al procesar tu compra.",
          });
          console.error(error);
        }
      }
    },
  },
};
</script>

<style scoped>
.CompraCripto {
  text-align: center;
  margin: 20px;
}

.home-icon {
  position: absolute;
  top: 20px;
  left: 20px;
  display: flex;
  align-items: center;
}

.home-link {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: black;
  transition: color 0.3s, transform 0.3s;
}

.home-link:hover {
  color: #007acc;
  transform: scale(1.1);
}

.home-svg {
  width: 24px;
  height: 24px;
  margin-right: 8px;
}

.crypto-select,
.crypto-amount {
  margin: 10px 0;
}

.crypto-value {
  margin: 10px 0;
  font-size: 1.2em;
  color: #007acc;
}

.crypto-price {
  margin: 20px 0;
  font-size: 1.2em;
  color: #003366;
}

button {
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 16px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}
</style>
