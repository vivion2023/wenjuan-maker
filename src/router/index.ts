import { createRouter, createWebHistory } from "vue-router";
import ManageLayout from "../layouts/ManageLayout.vue";
import MainLayout from "../layouts/MainLayout.vue";
import QuestionLayout from "../layouts/QuestionLayout.vue";
import Home from "@/pages/Home.vue";
import Login from "@/pages/Login.vue";
import Register from "@/pages/Register.vue";
import NotFound from "@/pages/NotFound.vue";
import List from "@/pages/manager/List.vue";
import Star from "@/pages/manager/Star.vue";
import Trash from "@/pages/manager/Trash.vue";
import Edit from "@/pages/question/Edit/index.vue";
import Stat from "@/pages/question/Stat/index.vue";

// 配置映射关系
const routes = [
  {
    path: "/",
    component: MainLayout,
    children: [
      {
        path: "",
        component: Home,
      },
      {
        path: "login",
        component: Login,
      },
      {
        path: "register",
        component: Register,
      },
      {
        path: "manager",
        component: ManageLayout,
        children: [
          {
            path: "",
            redirect: "/manager/list",
          },
          {
            path: "list",
            component: List,
          },
          {
            path: "star",
            component: Star,
          },
          {
            path: "trash",
            component: Trash,
          },
        ],
      },
      {
        path: "/:pathMatch(.*)*",
        component: NotFound,
      },
    ],
  },
  {
    path: "/question",
    component: QuestionLayout,
    children: [
      {
        path: "edit/:id",
        component: Edit,
      },
      {
        path: "stat/:id",
        component: Stat,
      },
    ],
  },
];

// 创建一个路由对象
const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

export default router;

// 常用的路由常量
export const HOME_PATHNAME = "/";
export const LOGIN_PATHNAME = "/login";
export const REGISTER_PATHNAME = "/register";
export const MANAGER_INDEX_PATHNAME = "/manager/list";
