<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <industryWheel msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import industryWheel from './views/paper/industryWheel.vue'

export default {
  name: 'App',
  components: {
    industryWheel
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
