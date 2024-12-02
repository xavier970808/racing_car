import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { loadOml2d } from 'oh-my-live2d';

import App from './App.vue'
import ArcoVue from '@arco-design/web-vue';
import ArcoVueIcon from '@arco-design/web-vue/es/icon';
import Router from'./router.js'
import '@arco-design/web-vue/dist/arco.css';

const app = createApp(App)
loadOml2d({
    models: [
      // 在这里进行配置
      {
        path: 'https://model.oml2d.com/HK416-1-normal/model.json',
            position: [0, 0],
        scale: 0.05,
        mobileScale: 0.05,
        
      }
    ]
  });
app.use(createPinia())
app.use(ArcoVue);
app.use(ArcoVueIcon);
app.use(Router)
app.mount('#app')
