import { createWebHistory, createRouter } from 'vue-router'

import Home from './views/Home.vue'
import About from './views/About.vue'
import Articles from './views/Articles.vue'
import ArticleRead from './views/ArticleRead.vue'
import ArticleCreate from './views/ArticleCreate.vue'
import Login from './views/Login.vue'
import snake from './views/snake.vue'
import maze from './views/maze.vue'
import game from './views/game.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  { path: '/articles', component: Articles },
  { path: '/articles/read/:id', component: ArticleRead },
  //{ path: '/articles/read/', component: ArticleRead },
  { path: '/articles/create', component: ArticleCreate },
  { path: '/login', component: Login },
  { path: '/snake', component: snake},
  { path: '/maze', component: maze},
  { path: '/game', component: game}

]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router