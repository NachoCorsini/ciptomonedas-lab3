<template>
  <div>
    <NavBar />

    <div class="analisis-inversion">
      <h1>Análisis de tus Inversiones</h1>

      <table v-if="resultados.length">
        <thead>
          <tr>
            <th>Criptomoneda</th>
            <th>Resultado</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="res in resultados" :key="res.crypto">
            <td>{{ res.crypto.toUpperCase() }}</td>
            <td :class="{ positivo: res.resultado >= 0, negativo: res.resultado < 0 }">
              $
              {{
                res.resultado.toLocaleString("es-AR", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })
              }}
            </td>
          </tr>
        </tbody>
      </table>

      <p v-else>Cargando datos de inversiones...</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import NavBar from "@/components/NavBar.vue";

export default {
  name: "AnalisisInversion",
  components: { NavBar },
  data() {
    return {
      resultados: [],
      userId: "",
    };
  },
  async mounted() {
    const user = JSON.parse(localStorage.getItem("user"));
    this.userId = user?.id;

    if (this.userId) {
      await this.calcularInversiones();
    }
  },
  methods: {
    async calcularInversiones() {
      try {
        const res = await axios.get(
          `https://laboratorio3-f36a.restdb.io/rest/transactions?q={"user_id":"${this.userId}"}`,
          { headers: { "x-apikey": "60eb09146661365596af552f" } }
        );

        const transacciones = res.data;
        const agrupado = {};

        transacciones.forEach((tx) => {
          const crypto = tx.crypto_code.toLowerCase();
          const amount = parseFloat(tx.crypto_amount);
          const money = parseFloat(tx.money);

          if (!agrupado[crypto]) {
            agrupado[crypto] = {
              totalComprado: 0,
              totalGastado: 0,
              totalVendido: 0,
              totalGanado: 0,
            };
          }

          if (tx.action === "purchase") {
            agrupado[crypto].totalComprado += amount;
            agrupado[crypto].totalGastado += money;
          } else if (tx.action === "sale") {
            agrupado[crypto].totalVendido += amount;
            agrupado[crypto].totalGanado += money;
          }
        });

        const resultadosFinales = [];

        for (const crypto in agrupado) {
          const data = agrupado[crypto];
          const tenenciaActual = data.totalComprado - data.totalVendido;
          let valorActual = 0;

          if (tenenciaActual > 0) {
            const precioRes = await axios.get(
              `https://criptoya.com/api/satoshitango/${crypto}/ars`
            );
            const precio = precioRes.data.totalBid;
            valorActual = tenenciaActual * precio;
          }

          const resultado = data.totalGanado + valorActual - data.totalGastado;

          resultadosFinales.push({
            crypto,
            resultado,
          });
        }

        this.resultados = resultadosFinales;
      } catch (error) {
        console.error("Error al calcular análisis de inversión:", error);
      }
    },
  },
};
</script>

<style scoped>
.analisis-inversion {
  max-width: 800px;
  margin: 100px auto 20px auto;
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
  background-color: #f0f0f0;
}

.positivo {
  color: green;
  font-weight: bold;
}

.negativo {
  color: red;
  font-weight: bold;
}
</style>
