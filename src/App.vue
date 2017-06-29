<template>
  <div id="app">
    <router-view></router-view>
    <!--<loading></loading>
    <pieChart></pieChart>
    <particleText></particleText>-->
  </div>
</template>

<script>
// import pieChart from './pages/pie'
// import loading from './pages/loadingTest'
// import particleText from './pages/particleText'

export default {
  name: 'app',
  components: {
    // pieChart,
    // loading,
    // particleText
  }
}
</script>

<style>
* {
  margin: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
