<script setup>
import NavBar from './components/NavBar.vue'
</script>

<template>
  <div class="app-container">
    <header>
      <NavBar />
    </header>
    <router-view />
  </div>
</template>

<style scoped>
header {
  line-height: 0;
}

.app-container {
  display: flex;
  flex-direction: column;
  /* 确保子元素纵向排列 */
}

router-view {
  flex-grow: 1;
  /* 让内容部分自适应剩余空间 */
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}
</style>
