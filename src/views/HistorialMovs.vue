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
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(mov, index) in historial" :key="index">
            <td>{{ mov.action }}</td>
            <td>{{ mov.crypto_code.toUpperCase() }}</td>
            <td>{{ mov.crypto_amount }}</td>
            <td>
              <span v-if="mov.action === 'purchase' || mov.action === 'sale'">
                ${{ mov.money }}
              </span>
              <span v-else>-</span>
            </td>
            <td>{{ formatFecha(mov.datetime) }}</td>
            <td>
              <button @click="verDetalle(mov._id)" title="Ver">🔍</button>
              <button @click="editarTransaccion(mov._id)" title="Editar">✏️</button>
              <button @click="eliminarTransaccion(mov._id)" title="Eliminar">🗑️</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import axios from 'axios'
import Swal from 'sweetalert2'
import dayjs from 'dayjs'

export default {
  name: "HistorialMovs",
  components: { NavBar },
  data() {
    return {
      historial: [],
      apiKey: '60eb09146661365596af552f',
    }
  },
  mounted() {
    this.cargarHistorial()
  },
  methods: {
    formatFecha(datetime) {
      return dayjs(datetime).format('DD/MM/YYYY HH:mm')
    },

    async cargarHistorial() {
      const user = JSON.parse(localStorage.getItem("user"))
      if (!user?.id) return

      const res = await axios.get(
        `https://laboratorio3-f36a.restdb.io/rest/transactions?q={"user_id":"${user.id}"}`,
        { headers: { 'x-apikey': this.apiKey } }
      )
      this.historial = res.data
    },

    async verDetalle(id) {
      const res = await axios.get(
        `https://laboratorio3-f36a.restdb.io/rest/transactions/${id}`,
        { headers: { 'x-apikey': this.apiKey } }
      )

      const tx = res.data
      Swal.fire({
        title: 'Detalle de transacción',
        html: `
          <p><b>Tipo:</b> ${tx.action}</p>
          <p><b>Criptomoneda:</b> ${tx.crypto_code}</p>
          <p><b>Cantidad:</b> ${tx.crypto_amount}</p>
          <p><b>Monto ARS:</b> $${tx.money}</p>
          <p><b>Fecha:</b> ${this.formatFecha(tx.datetime)}</p>
        `,
        icon: 'info'
      })
    },

    async editarTransaccion(id) {
      const { value: formValues } = await Swal.fire({
        title: 'Editar transacción',
        html:
          `<input id="monto" class="swal2-input" placeholder="Monto ARS">` +
          `<input id="cantidad" class="swal2-input" placeholder="Cantidad Cripto">`,
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: 'Guardar',
        preConfirm: () => {
          return {
            money: document.getElementById('monto').value,
            crypto_amount: document.getElementById('cantidad').value,
          }
        }
      })

      if (formValues) {
        await axios.patch(
          `https://laboratorio3-f36a.restdb.io/rest/transactions/${id}`,
          {
            money: formValues.money,
            crypto_amount: formValues.crypto_amount
          },
          { headers: { 'x-apikey': this.apiKey } }
        )

        Swal.fire('Actualizado', 'La transacción fue modificada.', 'success')
        this.cargarHistorial()
      }
    },

    async eliminarTransaccion(id) {
      const confirm = await Swal.fire({
        title: '¿Eliminar transacción?',
        text: 'Esta acción no se puede deshacer.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
      })

      if (confirm.isConfirmed) {
        await axios.delete(
          `https://laboratorio3-f36a.restdb.io/rest/transactions/${id}`,
          { headers: { 'x-apikey': this.apiKey } }
        )
        Swal.fire('Eliminada', 'La transacción fue eliminada.', 'success')
        this.cargarHistorial()
      }
    }
  }
}
</script>

<style scoped>
.HistorialMovimientos {
  margin: 100px auto 20px auto;
  text-align: center;
}

table {
  margin: 0 auto;
  border-collapse: collapse;
  width: 90%;
}

table th,
table td {
  border: 1px solid #ddd;
  padding: 10px;
}

table th {
  background-color: #f2f2f2;
  font-weight: bold;
}

button {
  margin: 0 4px;
  cursor: pointer;
  font-size: 16px;
  border: none;
  background: none;
}
</style>
