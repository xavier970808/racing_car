<script setup>
import NavBar from './components/NavBar.vue'
</script>

<template>
  <div class="layout">
    <a-layout>
      <a-layout-header><NavBar /></a-layout-header>
        
      <a-layout-content><router-view /></a-layout-content>
    </a-layout>
  </div>
</template>

<style scoped>
.layout :deep(.arco-layout-header)
.layout :deep(.arco-layout-content) {
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-stretch: condensed;
  text-align: center;
}
.layout :deep(.arco-layout-header) {
  height: 64px;
}
.layout :deep(.arco-layout-content) {
  box-sizing: content-box;
  width:  100%;
}
</style>
