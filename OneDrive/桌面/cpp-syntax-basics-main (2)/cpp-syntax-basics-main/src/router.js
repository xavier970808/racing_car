import { createWebHistory, createRouter } from 'vue-router'

import Home from './views/Home.vue'
import 輸入輸出 from './views/輸入輸出.vue'
import 標頭檔 from './views/標頭檔.vue'
import 基本資料型態 from './views/基本資料型態.vue'
import 變數命名原則 from './views/變數命名原則.vue'
import 運算子 from './views/運算子.vue'
import 常數const from './views/常數const.vue'


const routes = [
  { path: '/', component: Home },
  { path: '/輸入輸出', component: 輸入輸出 },
  { path: '/標頭檔', component: 標頭檔 },
  { path: '/基本資料型態', component: 基本資料型態 },
  { path: '/變數命名原則', component: 變數命名原則 },
  { path: '/運算子', component: 運算子 },
  { path: '/常數const', component: 常數const },

]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router