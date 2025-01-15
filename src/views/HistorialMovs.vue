<template>
  <div>
    <h1>Historial de Movimientos</h1>
    <div v-if="transactions.length > 0">
      <table>
        <thead>
          <tr>
            <th>Crypto</th>
            <th>Cantidad</th>
            <th>Dinero</th>
            <th>Acción</th>
            <th>Fecha</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="transaction in transactions" :key="transaction._id">
            <td>{{ transaction.crypto_code }}</td>
            <td>{{ transaction.crypto_amount }}</td>
            <td>{{ transaction.money }}</td>
            <td>
              {{ transaction.action === "purchase" ? "Compra" : "Venta" }}
            </td>
            <td>{{ new Date(transaction.datetime).toLocaleString() }}</td>
            <td>
              <button @click="verTransaccion(transaction._id)">Ver</button>
              <button @click="editarTransaccion(transaction._id)">
                Editar
              </button>
              <button @click="eliminarTransaccion(transaction._id)">
                Eliminar
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else>
      <p>No hay movimientos registrados.</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
    name: 'HistorialMovs',
    
  data() {
    return {
      transactions: [],
      userId: "", // Aquí deberías almacenar el user_id desde el login
    };
  },
  mounted() {
    this.userId = localStorage.getItem("user_id"); // Obtener el user_id desde el localStorage
    this.obtenerMovimientos();
  },
  methods: {
    async obtenerMovimientos() {
      try {
        const response = await axios.get(
          `https://laboratorio3-f36a.restdb.io/rest/transactions?q={"user_id":"${this.userId}"}`
        );
        this.transactions = response.data;
      } catch (error) {
        console.error("Error al obtener las transacciones:", error);
      }
    },
    async verTransaccion(id) {
      try {
        const response = await axios.get(
          `https://laboratorio3-f36a.restdb.io/rest/transactions/${id}`
        );
        console.log("Detalles de la transacción:", response.data);
        // Puedes abrir una nueva vista o mostrar un modal con la información
      } catch (error) {
        console.error(
          "Error al obtener los detalles de la transacción:",
          error
        );
      }
    },
    async editarTransaccion(id) {
      const nuevoMonto = prompt("Ingrese el nuevo monto:");
      if (nuevoMonto) {
        try {
          await axios.patch(
            `https://laboratorio3-f36a.restdb.io/rest/transactions/${id}`,
            { money: nuevoMonto }
          );
          alert("Transacción actualizada");
          this.obtenerMovimientos();
        } catch (error) {
          console.error("Error al editar la transacción:", error);
        }
      }
    },
    async eliminarTransaccion(id) {
      if (confirm("¿Estás seguro de que deseas eliminar esta transacción?")) {
        try {
          await axios.delete(
            `https://laboratorio3-f36a.restdb.io/rest/transactions/${id}`
          );
          alert("Transacción eliminada");
          this.obtenerMovimientos();
        } catch (error) {
          console.error("Error al eliminar la transacción:", error);
        }
      }
    },
  },
};
</script>

<style scoped>
/* Estilos básicos para la tabla */
table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 8px 12px;
  border: 1px solid #ccc;
  text-align: center;
}

button {
  margin: 5px;
}
</style>
