<template>
  <div id="app">
    <!--<router-view></router-view>-->
    <pieChart></pieChart>
  </div>
</template>

<script>
import pieChart from './pages/pie.vue'

export default {
  name: 'app',
  components: {
    pieChart
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 40px;
}
</style>
