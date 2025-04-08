<template>
  <div class="welcome">
    <!-- Logo Krusty con animación -->
    <img
      src="../assets/el-payaso-de-los-simpsons-el-h-roe-m-s-intratable-de-esta-caricatura-removebg-preview.png"
      alt="Logo Krusty"
      class="logo animate__animated zoomInCustom"
    />

    <!-- Texto animado -->
    <h1 class="animate__animated animate__fadeInUp animate__delay-1s">
      Bienvenido a KrustyWallet
    </h1>
  </div>
</template>

<script>
export default {
  name: "WelcomeView",
  mounted() {
    setTimeout(() => {
      this.$router.push({ name: "LoginView" });
    }, 2500);
  }
};
</script>

<style scoped>
@import "https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css";

/* 🎨 Fondo con gradiente animado pastel */
.welcome {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  margin: 0;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 25px;
  text-align: center;
  background: linear-gradient(-45deg, #4f4c4c, #fcbab2, #fddde6, #050000);
  background-size: 400% 400%;
  animation: gradientBackground 12s ease infinite;
  box-sizing: border-box;
}

@keyframes gradientBackground {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

/* 🧸 Logo Krusty */
.logo {
  width: 100%;
  max-width: 650px;
  max-height: 60vh;
  height: auto;
  margin: 0;
  filter: drop-shadow(0 0 15px rgba(0, 0, 0, 0.3));
}

/* 💥 Zoom animado personalizado */
.zoomInCustom {
  animation: zoomInCustom 1.2s ease-out forwards;
}

@keyframes zoomInCustom {
  0% {
    opacity: 0;
    transform: scale(0.1);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

/* ✏️ Título */
h1 {
  font-size: 2.8em;
  max-width: 90%;
  color: #333;
  margin: 0;
}

/* 📱 Responsive */
@media (max-height: 600px), (max-width: 480px) {
  .logo {
    max-height: 30vh;
  }

  h1 {
    font-size: 1.8em;
  }
}
</style>

<!-- Global: sin scroll ni márgenes -->
<style>
body,
html {
  margin: 0;
  padding: 0;
  overflow: hidden;
}
</style>
