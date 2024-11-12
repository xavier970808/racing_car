import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import ArcoVue from '@arco-design/web-vue';
import ArcoVueIcon from '@arco-design/web-vue/es/icon';
import Router from'./router.js'
import '@arco-design/web-vue/dist/arco.css';

const app = createApp(App)

app.use(createPinia())
app.use(ArcoVue);
app.use(ArcoVueIcon);
app.use(Router)
app.mount('#app')
