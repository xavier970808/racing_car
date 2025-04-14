import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import ArcoVue from '@arco-design/web-vue';
import ArcoVueIcon from '@arco-design/web-vue/es/icon';
import Router from'./router.js'
import '@arco-design/web-vue/dist/arco.css';
import { loadOml2d } from 'oh-my-live2d';
loadOml2d({
    dockedPosition: "right",
  primaryColor: "#ff0000",
  mobileDisplay: true,
  models: [ 
    // 在这里进行配置
    {
      path: "/l2d/爱莉希雅-桌宠/爱莉希雅-桌宠.model3.json",
      showHitAreaFrames: true,
      position: [0, 100],
      scale: 0.08,
      mobileScale: 0.08,
      mobilePosition: [0, 100],
      mobileStageStyle: {
        
      },
    },

    {
      path: "/l2d/chicheng_5/chicheng_5.model3.json",
      position: [0, 110],
      scale: 0.02,
      mobileScale: 0.02,
      mobilePosition: [0, 100],
      mobileStageStyle: {
        
      },
    },

    {
      path: "/l2d/bilibili-22/index.json",
      position: [0, 40],
      scale: 0.2,
      mobileScale: 0.2,
      mobilePosition: [0, 40],
      mobileStageStyle: {
        
      },
      showHitAreaFrames: true,
    }
  ],
  tips: {
    enable: true,
    style: {
    }
  },
  stageStyle: {
    height:"50%",
  }
});


const app = createApp(App)

app.use(createPinia())
app.use(ArcoVue);
app.use(ArcoVueIcon);
app.use(Router)
app.mount('#app')
