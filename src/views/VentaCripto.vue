<template>
  <div class="VentaCripto">
    <h1>Vender Criptomonedas</h1>

    <div class="crypto-select">
      <label for="crypto">Selecciona una criptomoneda:</label>
      <select v-model="selectedCrypto" id="crypto" @change="calcularPrecio">
        <option disabled value="">-- Selecciona --</option>
        <option
          v-for="crypto in criptomonedasDisponibles"
          :key="crypto.id"
          :value="crypto.id"
        >
          {{ crypto.nombre }} (Disponible: {{ crypto.cantidad }})
        </option>
      </select>
    </div>

    <div v-if="valorCrypto !== null" class="crypto-value">
      <p>Valor actual de la criptomoneda: {{ valorCrypto }} ARS</p>
    </div>

    <div class="crypto-amount">
      <label for="amount">Cantidad a vender:</label>
      <input
        type="number"
        v-model="amount"
        id="amount"
        :max="cantidadDisponible"
        min="0"
        step="0.0001"
        @input="calcularPrecioTotal"
      />
    </div>

    <div v-if="precioTotal !== null" class="crypto-price">
      <p>Monto a recibir: {{ precioTotal }} ARS</p>
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
      valorCrypto: null,
      cantidadDisponible: 0,
      criptomonedasDisponibles: [
        { id: "usdt", nombre: "USDT", cantidad: 5 },
        { id: "btc", nombre: "BTC", cantidad: 0.5 },
        { id: "eth", nombre: "Ethereum", cantidad: 1.2 },
      ],
    };
  },
  methods: {
    calcularPrecio() {
      if (!this.selectedCrypto) {
        this.valorCrypto = null;
        this.cantidadDisponible = 0;
        return;
      }

      // Obtiene la cantidad disponible
      const cryptoSeleccionada = this.criptomonedasDisponibles.find(
        (c) => c.id === this.selectedCrypto
      );
      if (cryptoSeleccionada) {
        this.cantidadDisponible = cryptoSeleccionada.cantidad;

        // Simula obtener el valor actual de la criptomoneda
        const url = `https://criptoya.com/api/argenbtc/${cryptoSeleccionada.id}/ars`;
        axios
          .get(url)
          .then((response) => {
            this.valorCrypto = response.data.ask;
          })
          .catch((error) => {
            console.error(
              "Error al obtener el valor de la criptomoneda:",
              error
            );
            this.valorCrypto = null;
          });
      }
    },
    calcularPrecioTotal() {
      if (!this.selectedCrypto || this.amount <= 0 || !this.valorCrypto) {
        this.precioTotal = null;
        return;
      }

      if (this.amount > this.cantidadDisponible) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No tienes suficiente cantidad para vender.",
        });
        this.precioTotal = null;
        return;
      }

      this.precioTotal = (this.amount * this.valorCrypto).toFixed(2);
    },
    async confirmSale() {
      if (
        !this.selectedCrypto ||
        this.amount <= 0 ||
        !this.precioTotal ||
        this.amount > this.cantidadDisponible
      ) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Verifica que los datos ingresados sean válidos.",
        });
        return;
      }

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
        const ventaData = {
          user_id: "usuario_logueado", // Reemplazar por el usuario real
          action: "sale",
          crypto_code: this.selectedCrypto,
          crypto_amount: this.amount,
          money: this.precioTotal,
          datetime: new Date().toLocaleString("es-AR"),
        };

        try {
          const url = "https://laboratorio3-f36a.restdb.io/rest/transactions";
          const headers = {
            "x-apikey": "60eb09146661365596af552f",
            "Content-Type": "application/json",
          };

          await axios.post(url, ventaData, { headers });

          Swal.fire({
            icon: "success",
            title: "Venta realizada",
            text: `Has vendido ${
              this.amount
            } ${this.selectedCrypto.toUpperCase()}.`,
          });

          // Actualizar historial
          const historialMovimientos =
            JSON.parse(localStorage.getItem("historialMovimientos")) || [];
          historialMovimientos.push({
            tipo: "venta",
            nombre: this.selectedCrypto,
            precio: this.precioTotal,
            cantidad: this.amount,
            fecha: ventaData.datetime,
          });
          localStorage.setItem(
            "historialMovimientos",
            JSON.stringify(historialMovimientos)
          );

          // Restar de la cantidad disponible
          const crypto = this.criptomonedasDisponibles.find(
            (c) => c.id === this.selectedCrypto
          );
          if (crypto) crypto.cantidad -= this.amount;

          // Resetear valores
          this.selectedCrypto = "";
          this.amount = 0;
          this.valorCrypto = null;
          this.precioTotal = null;
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
/* Agregar estilos aquí, similares a los de CompraCripto.vue */
.VentaCripto {
  text-align: center;
  margin: 20px;
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
  background-color: #ff5722;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #e64a19;
}
</style>
