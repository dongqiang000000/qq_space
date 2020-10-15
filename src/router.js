// 0. 使用模块化机制编程，导入Vue和VueRouter，要调用 Vue.use(VueRouter)
import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

// 1. 定义 (路由) 组件。
// 可以从其他文件 import 进来
import Home from '@/pages/Home/index.vue';
import Mood from '@/pages/Mood/index.vue';
import MoodAdd from '@/pages/Mood/Add.vue';
import Album from '@/pages/Album/index.vue';
import AlbumAdd from '@/pages/Album/Add.vue';
import AlbumDetail from '@/pages/Album/Detail.vue';
import QzoneLayout from '@/pages/Layout.vue';

// 2. 定义路由
const routes = [
  {
    path: '/qzone',
    alias: '/',
    component: QzoneLayout,
    children: [
      { path: '', component: Home },
      { path: 'mood', component: Mood },
      { path: 'mood/add', component: MoodAdd },
      { path: 'album', component: Album },
      { path: 'album/add', component: AlbumAdd },
      { path: 'album/detail', component: AlbumDetail }
    ]
  }
];

// 3. 创建 router 实例，然后传 `routes` 配置
export default new VueRouter({
  mode: 'history',
  routes // (缩写) 相当于 routes: routes
});
