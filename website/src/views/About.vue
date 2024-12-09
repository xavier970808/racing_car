<template>

  <a-radio-group type="button" v-model="size">
    <a-radio value="mini">mini</a-radio>
    <a-radio value="small">small</a-radio>
    <a-radio value="medium">medium</a-radio>
    <a-radio value="large">large</a-radio>
  </a-radio-group>
  <a-space size="large">
    <a-avatar :size="64">
      <img alt="avatar" src="https://images.1111.com.tw/oad/69392802.jpg" />
    </a-avatar>
  </a-space>
  <br /><br />
  <hr />
  <hr /><br />
  <div class="description" style="margin-top: 20px">
    <a-space direction="vertical" class="discription-block">
      <a-space direction="horizontal">
        <a-avatar class="avatar">
          <img alt="avatar"
            src="https://img.4gamers.com.tw/puku-clone-version/d5499338b9913b42276a718ecd19e6c73b0a55e0.png" />
        </a-avatar>
        <a-descriptions class = "info" :data="data" :size="size" title="Creator Information" :column="1"
          layout="inline-vertical" />
      </a-space>
      <br /><br />
      <a-space direction="horizontal" size="mini" class="discription-block">
        <a-avatar class="avatar">
          <img alt="avatar"
            src="https://truth.bahamut.com.tw/s01/202407/forum/74934/7ef2b98d84d2d428b35b0e0726642695.JPG" />
        </a-avatar>
        <a-descriptions :data="data_1" :size="size" title="Creator Information" :column="1"
          layout="inline-vertical" />
      </a-space>
      <br /><br />
      <a-space direction="horizontal" class="discription-block">
        <a-avatar class="avatar">
          <img alt="avatar"
            src="https://upload-os-bbs.hoyolab.com/upload/2024/02/20/248396271/f6a88399cf0a0da5ab1c365757b88f9a_5922478165928583116.png?x-oss-process=image%2Fresize%2Cs_1000%2Fauto-orient%2C0%2Finterlace%2C1%2Fformat%2Cwebp%2Fquality%2Cq_70" />
        </a-avatar>
        <a-descriptions class = "info" :data="data_2" :size="size" title="Creator Information" :column="1"
          layout="inline-vertical" />
      </a-space>
    </a-space>
  </div>
</template>
<style scoped>
.description{
  margin-left: 20px;
}
.description-block {
  padding: 20px;
  margin:20px;
}
.info {
  margin-left: 20px;
}
.avatar{
  margin-right: 10px;
}
</style>
<script>
import { IconUser } from '@arco-design/web-vue/es/icon';  // 引入 Arco Design 的 IconUser 圖標元件

import { ref } from 'vue';  // 引入 Vue 3 的 ref，讓我們可以創建響應式變數

export default {
  name: 'About',

  components: { IconUser },  // 註冊 IconUser 元件，使其可以在模板中使用


  setup() {
    // 使用 Vue 3 的 Composition API，這是 setup 函數內部邏輯

    // 創建一個名為 size 的響應式變數，並設置初始值為 'medium'
    const size = ref('medium');

    // 設置一個名為 data 的數據陣列，包含多個對象，每個對象代表用戶資訊的標籤和值
    const data = [{
      label: 'Name',  // 用戶的名字
      value: '黃子恒',  // 名字為 Socrates
    }, {
      label: 'School',  // 用戶的家鄉
      value: 'Wego',  // 家鄉為北京
    }, {
      label: 'Class',  // 班級
      value: '二辛'
    }, {
      label: 'Number',
      value: '44'
    }];

    const data_1 = [{
      label: 'Name',  // 用戶的名字
      value: '鄒佳祐',  // 名字為 Socrates
    }, {
      label: 'School',  // 用戶的家鄉
      value: 'Wego',  // 家鄉為北京
    }, {
      label: 'Class',  // 班級
      value: '二辛'
    }, {
      label: 'Number',
      value: '49'
    }];

    const data_2 = [{
      label: 'Name',  // 用戶的名字
      value: '陳禹睿',  // 名字為 Socrates
    }, {
      label: 'School',  // 用戶的家鄉
      value: 'Wego',  // 家鄉為北京
    }, {
      label: 'Class',  // 班級
      value: '二辛'
    }, {
      label: 'Number',
      value: '42'
    }];

    // 返回 data 和 size，使其能夠在模板中使用
    return {
      data, data_1, data_2,
      size
    }
  },
};
</script>