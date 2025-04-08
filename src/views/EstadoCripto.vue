<template>
  <div>
    <NavBar />

    <div class="estado-cripto">
      <h1>Estado Actual de tus Criptomonedas</h1>

      <table v-if="estado.length">
        <thead>
          <tr>
            <th>Criptomoneda</th>
            <th>Cantidad</th>
            <th>Valor actual</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="cripto in estado" :key="cripto.crypto">
            <td>{{ cripto.crypto.toUpperCase() }}</td>
            <td>{{ cripto.amount.toFixed(8) }}</td>
            <td>$ {{ cripto.value.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="2"><strong>Total</strong></td>
            <td><strong>$ {{ total.toLocaleString('es-AR', { minimumFractionDigits: 2 }) }}</strong></td>
          </tr>
        </tfoot>
      </table>

      <p v-else>Cargando datos...</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import NavBar from '@/components/NavBar.vue';

export default {
  name: 'EstadoCripto',
  components: {
    NavBar
  },
  data() {
    return {
      estado: [],
      total: 0,
      userId: '',
    };
  },
  async mounted() {
    const user = JSON.parse(localStorage.getItem('user'));
    this.userId = user?.id;

    if (this.userId) {
      await this.cargarEstado();
    }
  },
  methods: {
    async cargarEstado() {
      try {
        const response = await axios.get(
          `https://laboratorio3-f36a.restdb.io/rest/transactions?q={"user_id":"${this.userId}"}`,
          {
            headers: {
              'x-apikey': '60eb09146661365596af552f',
            },
          }
        );

        const transacciones = response.data;

        const resumen = {};
        transacciones.forEach(tx => {
          const code = tx.crypto_code.toLowerCase();
          const amount = parseFloat(tx.crypto_amount);
          if (!resumen[code]) resumen[code] = 0;
          resumen[code] += tx.action === 'purchase' ? amount : -amount;
        });

        const estadoFinal = [];
        let total = 0;

        for (const crypto in resumen) {
          const cantidad = resumen[crypto];
          if (cantidad <= 0) continue;

          const precioRes = await axios.get(`https://criptoya.com/api/satoshitango/${crypto}/ars`);
          const precio = precioRes.data.totalBid;

          const valor = cantidad * precio;

          estadoFinal.push({
            crypto,
            amount: cantidad,
            value: valor,
          });

          total += valor;
        }

        this.estado = estadoFinal;
        this.total = total;
      } catch (error) {
        console.error('Error cargando el estado:', error);
      }
    },
  },
};
</script>

<style scoped>
.estado-cripto {
  max-width: 800px;
  margin: 100px auto 20px auto; /* deja espacio arriba para el NavBar */
  text-align: center;
  padding: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th, td {
  border: 1px solid #aaa;
  padding: 10px;
}

th {
  background-color: #f4f4f4;
}
</style>
