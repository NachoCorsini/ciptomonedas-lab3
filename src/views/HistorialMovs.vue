<template>
  <div class="historial">
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

    <h1>Historial de Movimientos</h1>
    <table>
      <thead>
        <tr>
          <th>Tipo</th>
          <th>Criptomoneda</th>
          <th>Precio</th>
          <th>Cantidad</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(movimiento, index) in movimientos"
          :key="index"
          :class="{
            compra: movimiento.tipo === 'compra',
            venta: movimiento.tipo === 'venta',
          }"
        >
          <td>{{ movimiento.tipo }}</td>
          <td>{{ movimiento.nombre }}</td>
          <td>{{ movimiento.precio }}</td>
          <td>{{ movimiento.cantidad }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "HistorialMovs",
  data() {
    return {
      movimientos: [], // Lista de movimientos (compra/venta)
    };
  },
  mounted() {
    // Obtener movimientos del LocalStorage
    const data = JSON.parse(localStorage.getItem("historialMovimientos")) || [];
    this.movimientos = data;
  },
};
</script>

<style scoped>
.historial {
  text-align: center;
  margin: 20px;
}

/* Estilos para el icono Home */
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

/* Estilos para la tabla */
table {
  width: 100%;
  border-collapse: collapse;
  margin: 20px auto;
}
thead {
  background-color: #f5f5f5;
}
th,
td {
  border: 1px solid #ddd;
  padding: 8px;
}

.compra {
  background-color: #e8f5e9; /* Verde claro */
  color: #2e7d32;
}
.venta {
  background-color: #ffebee; /* Rojo claro */
  color: #c62828;
}
</style>
