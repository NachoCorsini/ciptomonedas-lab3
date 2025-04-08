<template>
  <div>
    <NavBar />

    <div class="HistorialMovimientos">
      <h1>Historial de Movimientos</h1>
      <table>
        <thead>
          <tr>
            <th>Tipo</th>
            <th>Criptomoneda</th>
            <th>Cantidad</th>
            <th>Precio</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(mov, index) in historial" :key="index">
            <td>{{ mov.tipo }}</td>
            <td>{{ mov.nombre }}</td>
            <td>{{ mov.cantidad }}</td>
            <td v-if="mov.tipo === 'compra'">{{ mov.precio }}</td>
            <td v-else>-</td>
            <td>{{ mov.fecha }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';

export default {
  name: "HistorialMovs",
  components: {
    NavBar
  },
  data() {
    return {
      historial: JSON.parse(localStorage.getItem("historialMovimientos")) || [],
    };
  },
};
</script>

<style scoped>
.HistorialMovimientos {
  margin: 100px auto 20px auto; /* espacio arriba por la navbar */
  text-align: center;
}

table {
  margin: 0 auto;
  border-collapse: collapse;
  width: 80%;
}

table th,
table td {
  border: 1px solid #ddd;
  padding: 8px;
}

table th {
  background-color: #f2f2f2;
  font-weight: bold;
}
</style>
