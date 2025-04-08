<template>
  <div id="app">
    <router-view />
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
  font-family: 'Segoe UI', sans-serif;
  background: linear-gradient(to right, #fff0f5, #fcbab2);
  min-height: 100vh;
  color: #0b0b0b;
}

#app {
  min-height: 100vh;
}
</style>
