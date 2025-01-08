<template>
  <div class="home">
    <h1>Bienvenido a Krustywallet</h1>
    <p>Tu billetera digital para administrar y comprar criptomonedas de forma segura.</p>
    
    <!-- Sección de imágenes con epígrafes -->
    <div class="features">
      <div class="feature">
        <img src ="../assets/compracripto.png" alt="Comprar Criptomonedas" />
        <p>Compra tus criptos preferidas</p>
      </div>
      <div class="feature">
        <img src="../assets/ventacripto.png" alt="Vender Criptomonedas" />
        <p>Vende tus criptos cuando lo necesites</p>
      </div>
      <div class="feature">
        <img src="../assets/transfercripto.jpg" alt="Estado de tus Criptomonedas" />
        <p>Transfiere criptos a tus amigos rápidamente</p>
      </div>
      <div class="feature">
        <img src="../assets/portfoliocripto.jpg" alt="Historial de Movimientos" />
        <p>Monitorea el valor de tus criptos en tiempo real</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeView',

};
</script>

<style scoped>
.home {
  text-align: center;
  padding: 20px;
}

h1 {
  font-size: 2.5em;
  color: #333;
}

p {
  font-size: 1.2em;
  color: #555;
  margin-bottom: 20px;
}

.features {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 20px;
}

.feature {
  width: 200px;
  text-align: center;
}

.feature img {
  width: 100%;
  max-width: 150px;
  border-radius: 8px;
  margin-bottom: 10px;
}

.feature p {
  font-size: 1em;
  color: #333;
  margin-top: 10px;
}
</style>