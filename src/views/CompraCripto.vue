<template>
  <div>
    <NavBar />

    <div class="CompraCripto">
      <h1>Registrar Nueva Compra</h1>
      <form @submit.prevent="registrarCompra">
        <div>
          <label for="crypto">Criptomoneda:</label>
          <select
            v-model="compra.crypto_code"
            id="crypto"
            @change="obtenerPrecio"
            required
          >
            <option value="" disabled>Selecciona una criptomoneda</option>
            <option value="eth">Ethereum</option>
            <option value="dai">Dai</option>
            <option value="usdt">Tether</option>
          </select>
        </div>

        <div v-if="precioActual">
          <p>
            Precio actual de {{ compra.crypto_code.toUpperCase() }}:
            {{ precioActual }} ARS
          </p>
        </div>

        <div>
          <label for="amount">Cantidad:</label>
          <input
            type="number"
            step="0.00001"
            v-model.number="compra.crypto_amount"
            id="amount"
            required
            min="0.00001"
            @input="calcularMontoPagado"
          />
        </div>

        <div v-if="compra.money !== null">
          <p>Monto total a pagar: {{ compra.money }} ARS</p>
        </div>

        <div>
          <label for="datetime">Fecha y Hora:</label>
          <input
            type="datetime-local"
            v-model="compra.datetime"
            id="datetime"
            required
          />
        </div>

        <button type="submit">Comprar</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
import dayjs from "dayjs";
import NavBar from "@/components/NavBar.vue";

export default {
  name: "CompraCripto",
  components: {
    NavBar
  },
  data() {
    return {
      precioActual: null,
      compra: {
        user_id: this.$store.getters.getUserId || "default_user",
        action: "purchase",
        crypto_code: "",
        crypto_amount: null,
        money: null,
        datetime: "",
      },
    };
  },
  methods: {
    async obtenerPrecio() {
      if (!this.compra.crypto_code) {
        this.precioActual = null;
        this.compra.money = null;
        return;
      }

      try {
        const response = await axios.get(
          `https://criptoya.com/api/argenbtc/${this.compra.crypto_code}/ars`
        );
        this.precioActual = response.data.ask;
        this.calcularMontoPagado();
      } catch (error) {
        console.error("Error al obtener el precio:", error);
        this.precioActual = null;
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudo obtener el precio actual de la criptomoneda.",
        });
      }
    },
    calcularMontoPagado() {
      if (this.precioActual && this.compra.crypto_amount > 0) {
        this.compra.money = (
          this.precioActual * this.compra.crypto_amount
        ).toFixed(2);
      } else {
        this.compra.money = null;
      }
    },
    async registrarCompra() {
      if (
        !this.compra.crypto_code ||
        this.compra.crypto_amount <= 0 ||
        !this.compra.money ||
        !this.compra.datetime
      ) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Todos los campos deben estar correctamente llenos.",
        });
        return;
      }

      const fechaIngresada = dayjs(this.compra.datetime);
      const fechaActual = dayjs();
      if (fechaIngresada.isAfter(fechaActual)) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "La fecha no puede ser futura.",
        });
        return;
      }

      const datosCompra = { ...this.compra };

      try {
        await axios.post(
          "https://laboratorio3-f36a.restdb.io/rest/transactions",
          datosCompra,
          {
            headers: { "x-apikey": "60eb09146661365596af552f" },
          }
        );

        const historialMovimientos =
          JSON.parse(localStorage.getItem("historialMovimientos")) || [];
        historialMovimientos.push({
          tipo: "compra",
          nombre: this.compra.crypto_code,
          cantidad: this.compra.crypto_amount,
          precio: this.compra.money,
          fecha: datosCompra.datetime,
        });
        localStorage.setItem(
          "historialMovimientos",
          JSON.stringify(historialMovimientos)
        );

        Swal.fire({
          icon: "success",
          title: "Compra Registrada",
          text: "La compra ha sido registrada exitosamente.",
        });

        this.compra = {
          user_id: this.$store.getters.getUserId || "default_user",
          action: "purchase",
          crypto_code: "",
          crypto_amount: null,
          money: null,
          datetime: "",
        };
        this.precioActual = null;

        this.$router.push("/HomeView");
      } catch (error) {
        console.error("Error al registrar la compra:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Hubo un problema al registrar la compra. Intenta nuevamente.",
        });
      }
    },
  },
};
</script>

<style scoped>
.CompraCripto {
  text-align: center;
  margin: 100px auto 20px auto; /* para no tapar la navbar */
}

form {
  display: inline-block;
  text-align: left;
  max-width: 400px;
  width: 100%;
}

form div {
  margin-bottom: 10px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input,
select,
button {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  box-sizing: border-box;
}

button {
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
