<template>
  <div>
    <NavBar />

    <div class="CompraCripto">
      <h1>Registrar Nueva Compra</h1>
      <form @submit.prevent="registrarCompra">
        <div>
          <label for="crypto">Criptomoneda:</label>
          <select v-model="compra.crypto_code" id="crypto" @change="obtenerPrecio" required>
            <option value="" disabled>Selecciona una criptomoneda</option>
            <option value="eth">Ethereum</option>
            <option value="dai">Dai</option>
            <option value="usdt">Tether</option>
          </select>
        </div>

        <div v-if="precioActual">
          <p>Precio actual de {{ compra.crypto_code.toUpperCase() }}: {{ precioActual }} ARS</p>
        </div>

        <div>
          <label for="amount">Cantidad:</label>
          <input
            type="number"
            step="0.00000001"
            min="0.00000001"
            v-model.number="compra.crypto_amount"
            id="amount"
            required
            @input="calcularMontoPagado"
          />
        </div>

        <div v-if="compra.money !== null">
          <p>Monto total a pagar: {{ compra.money }} ARS</p>
        </div>

        <div>
          <label>Fecha y Hora:</label>
          <input
            type="datetime-local"
            :value="compra.datetime"
            disabled
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
  components: { NavBar },
  data() {
    return {
      precioActual: null,
      compra: {
        user_id: this.$store.getters.getUserId || "default_user",
        action: "purchase",
        crypto_code: "",
        crypto_amount: null,
        money: null,
        datetime: dayjs().format("YYYY-MM-DDTHH:mm"),
      },
    };
  },
  methods: {
    async obtenerPrecio() {
      try {
        const res = await axios.get(`https://criptoya.com/api/argenbtc/${this.compra.crypto_code}/ars`);
        this.precioActual = res.data.ask;
        this.calcularMontoPagado();
      } catch (err) {
        this.precioActual = null;
        Swal.fire("Error", "No se pudo obtener el precio actual", "error");
      }
    },
    calcularMontoPagado() {
      if (this.precioActual && this.compra.crypto_amount > 0) {
        this.compra.money = (this.precioActual * this.compra.crypto_amount).toFixed(2);
      } else {
        this.compra.money = null;
      }
    },
    async registrarCompra() {
      const datos = { ...this.compra };
      try {
        await axios.post("https://laboratorio3-f36a.restdb.io/rest/transactions", datos, {
          headers: { "x-apikey": "60eb09146661365596af552f" },
        });

        Swal.fire("Compra exitosa", "Se registró correctamente", "success");
        this.$router.push("/HomeView");
      } catch (err) {
        Swal.fire("Error", "No se pudo registrar la compra", "error");
      }
    },
  },
};
</script>

<style scoped>
.CompraCripto {
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
