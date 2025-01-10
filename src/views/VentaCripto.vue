<template>
  <div class="VentaCripto">
    <h1>Vende tus Criptomonedas</h1>
    <div class="crypto-select">
      <label for="crypto">Selecciona una criptomoneda:</label>
      <select v-model="selectedCrypto" id="crypto" @change="calcularPrecio">
        <option disabled value="">-- Selecciona --</option>
        <option value="usdt">USDT</option>
        <option value="btc">BTC</option>
        <option value="eth">Ethereum</option>
      </select>
    </div>
    <div class="crypto-amount">
      <label for="amount">Cantidad a vender:</label>
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
    <button @click="confirmSale">Vender</button>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import axios from "axios";

export default {
  name: "VentaCripto",
  data() {
    return {
      selectedCrypto: "",
      amount: 0,
      precioTotal: null,
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
          this.precioTotal = new Intl.NumberFormat("de-DE").format(this.precioTotal);
        } catch (error) {
          console.error("Error al calcular el precio:", error);
          this.precioTotal = null;
        }
      }
    },
    async confirmSale() {
      if (
        !this.selectedCrypto ||
        this.amount <= 0 ||
        this.precioTotal === null
      ) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Debes seleccionar una criptomoneda y seleccionar la cantidad.",
        });
        return;
      }

      // Confirmación con SweetAlert2
      const result = await Swal.fire({
        title: "¿Estás seguro?",
        text: `Vas a vender ${
          this.amount
        } ${this.selectedCrypto.toUpperCase()} por ${this.precioTotal} ARS.`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, vender",
        cancelButtonText: "Cancelar",
      });

      if (result.isConfirmed) {
        try {
          Swal.fire({
            icon: "success",
            title: "Venta realizada",
            text: `Has vendido ${
              this.amount
            } ${this.selectedCrypto.toUpperCase()}.`,
          });
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Hubo un problema al procesar tu venta.",
          });
          console.error(error);
        }
      }
    },
  },
};
</script>

<style scoped>
.VentaCripto {
  text-align: center;
  margin: 20px;
}

.crypto-select,
.crypto-amount {
  margin: 10px 0;
}

.crypto-price {
  margin: 20px 0;
  font-size: 1.2em;
  color: #333;
}

button {
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 16px;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #e53935;
}
</style>
