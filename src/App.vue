<template>
  <nav></nav>
  <router-view />
</template>
<script>
export default {
  components: {},
};
</script>
<style>
html,
body {
  margin: 0;
  padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: rgb(235, 235, 235);
  margin: 0;
  padding: 0;
  height: 100vh;
}

nav {
  padding: 30px;
}

.nav_item {
  font-weight: bold;
}

.nav_item:hover {
  cursor: pointer;
  color: #2244d8;
  transition: border 0.3s linear;
}

nav a.router-link-exact-active {
  color: #94a5f1;
}
</style>
