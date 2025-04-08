<template>
  <div id="app">
    <nav>
      <router-link to="/"></router-link>
      <router-link to="/HomeView"></router-link>
      <router-link to="/CompraCripto"></router-link>
      <router-link to="/VentaCripto"></router-link>
      <router-link to="/HistorialMovs"></router-link>
      
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: "App",
};
</script>

<style>

body {
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
  background: linear-gradient(to right, #f6f6f6, #fff308);
  min-height: 100vh;
  color: #0b0b0b; 
}

#app {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}

nav {
  padding: 30px;
  display: flex;
  gap: 20px;
}

nav a {
  font-weight: bold;
  color: #fff;
  text-decoration: none;
  font-size: 18px;
}

nav a:hover {
  color: #1ce9b9; /* Resaltar los enlaces al pasar el mouse */
}

nav a.router-link-exact-active {
  color: #42b983;
}

router-view {
  margin-top: 20px;
}
</style>
