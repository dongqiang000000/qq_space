import Vue from "vue";
import App from "./App.vue";
import router from './router';

Vue.config.productionTip = false;

// 4. 创建和挂载根实例。
// 记得要通过 router 配置参数注入路由，
// 从而让整个应用都有路由功能
new Vue({
  router,
  render: h => h(App)
}).$mount("#app");

