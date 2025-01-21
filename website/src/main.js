import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { loadOml2d } from 'oh-my-live2d';

import App from './App.vue'
import ArcoVue from '@arco-design/web-vue';
import ArcoVueIcon from '@arco-design/web-vue/es/icon';
import { Message } from '@arco-design/web-vue';
import Router from './router.js'
import '@arco-design/web-vue/dist/arco.css';

const app = createApp(App)
// 设置为暗黑主题
document.body.setAttribute('arco-theme', 'light')
//app.config.globalProperties.$message = Message;
Message._context = app._context;

loadOml2d({
    dockedPosition: "right",
  primaryColor: "#ff0000",
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
