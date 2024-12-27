<script setup>
import MobileNavBar from './components/MobileNavBar.vue';
import NavBar from './components/NavBar.vue'
</script>
<script>
import zhTW from '@arco-design/web-vue/es/locale/lang/zh-tw';
export default {
  data() {
    return {
      zhTW,
    };
  },
};

</script>

<template>
  <a-config-provider :locale="zhTW">
    <div class="layout">
      <header>
        <NavBar class="desktop-nav"/>
        <MobileNavBar class="mobile-nav"/>
      </header>
      <div class="content"><router-view /></div>
    </div>
  </a-config-provider>
</template>

<style scoped>
 .layout {
  width: 100%;
  max-width: 1280px;
  overflow-x: hidden;
  padding: 0px;
}

.header {
  position: absolute;
  width: 100%;
}

.content {
  position: relative;
  margin: 0 auto;
  margin-top: 60px;
}
@media (min-width: 801px){
  .mobile-nav {
    display: none;
  }
}

@media (max-width: 800px) {
  .desktop-nav {
    display: none;
  }
}

</style>
