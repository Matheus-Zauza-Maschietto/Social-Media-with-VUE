<template>
  <div id="app">
    <HeaderComponent/>
    <router-view></router-view>
  </div>
</template>

<script>
import HeaderComponent from './components/Header.vue'

export default {
  name: 'App',
  components: {
    HeaderComponent
  },

}
</script>

<style>
  #app{
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
</style>
