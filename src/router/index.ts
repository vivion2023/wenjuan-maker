import { createRouter, createWebHistory } from "vue-router";
import List from "../pages/List.vue";
import Star from "../pages/Star.vue";

// 配置映射关系
const routers = [
  {
    path: "/",
    redirect: "/list",
  },
  {
    path: "/list",
    component: List,
  },
  {
    path: "/star",
    component: Star,
  },
];

// 创建一个路由对象
const router = createRouter({
  history: createWebHistory(),
  routes: routers,
});

export default router;
