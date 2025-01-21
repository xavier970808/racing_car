import { defineStore } from 'pinia';
import axios from 'axios'; // 引入 axios

export const useAuthStore = defineStore('auth', {
  state: () => ({
    username: null,
    isLoggedIn: false,
  }),
  actions: {
    async login(username, password) {
      console.log('登录中...');
      // 使用 async/await 与后端交互
      const userCredentials = {
          username: username.toString(),
          password: password.toString(),
      };
      console.log(userCredentials);
      try {
        // 发送登录请求到后端
        const response = await axios.post('http://localhost:8080/api/login', userCredentials);
        // 假设后端返回的用户信息在 response.data.username
        this.username = username; // 设置用户信息
        this.isLoggedIn = true; // 更新登录状态
      } catch (error) {
        console.error('登录失败:', error);
        throw error;
      }
    },
    logout() {
      this.username = null;
      this.isLoggedIn = false;
    },
  },
  getters: {
    currentUser: (state) => state.username,
    getLoginStatus: (state) => state.isLoggedIn,
  },
});
