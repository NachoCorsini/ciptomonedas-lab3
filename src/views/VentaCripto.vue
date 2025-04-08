<template>
  <div>
    <NavBar />

    <div class="VentaCripto">
      <h1>Registrar Nueva Venta</h1>
      <form @submit.prevent="confirmarVenta">
        <div>
          <label for="crypto">Criptomoneda:</label>
          <select
            v-model="venta.crypto_code"
            id="crypto"
            required
            @change="calcularCantidadDisponible"
          >
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
            v-model.number="venta.amount"
            id="amount"
            required
            :max="cantidadDisponible"
          />
        </div>

        <p v-if="cantidadDisponible !== null">
          Cantidad disponible: {{ cantidadDisponible }}
        </p>

        <button type="submit">Registrar Venta</button>
      </form>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import NavBar from "@/components/NavBar.vue";

export default {
  name: "VentaCripto",
  components: {
    NavBar
  },
  data() {
    return {
      venta: {
        crypto_code: "",
        amount: null,
      },
      cantidadDisponible: null,
    };
  },
  methods: {
    calcularCantidadDisponible() {
      const historial =
        JSON.parse(localStorage.getItem("historialMovimientos")) || [];
      const compras = historial
        .filter((mov) => mov.tipo === "compra" && mov.nombre === this.venta.crypto_code)
        .reduce((sum, mov) => sum + parseFloat(mov.cantidad), 0);
      const ventas = historial
        .filter((mov) => mov.tipo === "venta" && mov.nombre === this.venta.crypto_code)
        .reduce((sum, mov) => sum + parseFloat(mov.cantidad), 0);
      this.cantidadDisponible = compras - ventas;
    },
    confirmarVenta() {
      if (!this.venta.crypto_code || !this.venta.amount || this.venta.amount <= 0) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Todos los campos deben estar correctamente llenos.",
        });
        return;
      }

      if (this.venta.amount > this.cantidadDisponible) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No tienes suficiente cantidad para vender.",
        });
        return;
      }

      const historialMovimientos =
        JSON.parse(localStorage.getItem("historialMovimientos")) || [];
      historialMovimientos.push({
        tipo: "venta",
        nombre: this.venta.crypto_code,
        cantidad: this.venta.amount,
        fecha: new Date().toLocaleString("es-AR"),
      });
      localStorage.setItem(
        "historialMovimientos",
        JSON.stringify(historialMovimientos)
      );

      Swal.fire({
        icon: "success",
        title: "Venta Registrada",
        text: "La venta ha sido registrada exitosamente.",
      });

      this.venta = {
        crypto_code: "",
        amount: null,
      };
      this.cantidadDisponible = null;

      this.$router.push("/HomeView");
    },
  },
};
</script>

<style scoped>
.VentaCripto {
  text-align: center;
  margin: 100px auto 20px auto; /* espacio para no tapar la navbar */
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
