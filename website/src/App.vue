<script setup>
import NavBar from './components/NavBar.vue'
</script>

<template>
  <div class="layout">
      <header><NavBar /></header>
      <div class="content"><router-view /></div>
    
  </div>
</template>

<style scoped>
.layout{
  width: 100%;
  max-width: 1200px;
  overflow-x: hidden;
  padding: 0px;
}
.header{
  position: absolute;
  width : 100%;
}
.content{
  position: relative;
  margin: 0 auto;
  margin-top: 60px
}
</style>
