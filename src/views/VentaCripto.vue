<template>
  <div>
    <NavBar />

    <div class="VentaCripto">
      <h1>Registrar Nueva Venta</h1>
      <form @submit.prevent="confirmarVenta">
        <div>
          <label for="crypto">Criptomoneda:</label>
          <select v-model="venta.crypto_code" id="crypto" required @change="calcularCantidadDisponible">
            <option value="" disabled>Selecciona una criptomoneda</option>
            <option value="eth">Ethereum</option>
            <option value="dai">Dai</option>
            <option value="usdt">Tether</option>
          </select>
        </div>

        <div>
          <label for="amount">Cantidad a Vender:</label>
          <input
            type="number"
            v-model.number="venta.crypto_amount"
            id="amount"
            required
            step="0.00000001"
            :max="cantidadDisponible"
          />
        </div>

        <p v-if="cantidadDisponible !== null">
          Cantidad disponible: {{ cantidadDisponible }}
        </p>

        <div v-if="precioActual !== null && venta.crypto_amount">
          <p>Precio actual: ${{ precioActual }} ARS</p>
          <p>Total a recibir: ${{ (venta.crypto_amount * precioActual).toFixed(2) }}</p>
        </div>

        <button type="submit">Vender</button>
      </form>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import axios from "axios";
import dayjs from "dayjs";
import NavBar from "@/components/NavBar.vue";

export default {
  name: "VentaCripto",
  components: { NavBar },
  data() {
    return {
      venta: {
        crypto_code: "",
        crypto_amount: null,
      },
      precioActual: null,
      cantidadDisponible: null,
      userId: "",
    };
  },
  mounted() {
    const user = JSON.parse(localStorage.getItem("user"));
    this.userId = user?.id || "default_user";
  },
  methods: {
    async calcularCantidadDisponible() {
      if (!this.venta.crypto_code) return;

      try {
        const res = await axios.get(
          `https://laboratorio3-f36a.restdb.io/rest/transactions?q={"user_id":"${this.userId}","crypto_code":"${this.venta.crypto_code}"}`,
          { headers: { "x-apikey": "60eb09146661365596af552f" } }
        );

        const transacciones = res.data;
        const totalComprado = transacciones
          .filter((tx) => tx.action === "purchase")
          .reduce((sum, tx) => sum + parseFloat(tx.crypto_amount), 0);

        const totalVendido = transacciones
          .filter((tx) => tx.action === "sale")
          .reduce((sum, tx) => sum + parseFloat(tx.crypto_amount), 0);

        this.cantidadDisponible = totalComprado - totalVendido;

        // también actualizamos el precio actual
        const precioRes = await axios.get(`https://criptoya.com/api/argenbtc/${this.venta.crypto_code}/ars`);
        this.precioActual = precioRes.data.totalBid;
      } catch (err) {
        console.error("Error al calcular disponibilidad o precio", err);
        Swal.fire("Error", "No se pudo calcular la cantidad disponible.", "error");
      }
    },

    async confirmarVenta() {
      if (!this.venta.crypto_code || !this.venta.crypto_amount || this.venta.crypto_amount <= 0) {
        Swal.fire("Error", "Todos los campos deben estar correctamente llenos.", "error");
        return;
      }

      if (this.venta.crypto_amount > this.cantidadDisponible) {
        Swal.fire("Error", "No tienes suficiente cantidad para vender.", "error");
        return;
      }

      const montoARS = (this.venta.crypto_amount * this.precioActual).toFixed(2);
      const datetime = dayjs().format("YYYY-MM-DDTHH:mm:ss");

      try {
        await axios.post(
          "https://laboratorio3-f36a.restdb.io/rest/transactions",
          {
            user_id: this.userId,
            action: "sale",
            crypto_code: this.venta.crypto_code,
            crypto_amount: this.venta.crypto_amount,
            money: montoARS,
            datetime: datetime,
          },
          {
            headers: { "x-apikey": "60eb09146661365596af552f" },
          }
        );

        Swal.fire("Venta Registrada", "La venta ha sido registrada exitosamente.", "success");
        this.venta = { crypto_code: "", crypto_amount: null };
        this.cantidadDisponible = null;
        this.precioActual = null;
        this.$router.push("/HomeView");
      } catch (error) {
        console.error("Error al registrar la venta:", error);
        Swal.fire("Error", "Hubo un problema al registrar la venta.", "error");
      }
    },
  },
};
</script>

<style scoped>
.VentaCripto {
  text-align: center;
  margin: 100px auto 20px auto;
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
