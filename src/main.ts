import { createApp } from "vue";

import App from "./App.vue";
import router from "./router/index";
import store from "./store";
import "@/assets/styles/global.scss";
import "element-plus/dist/index.css";
import ElementPlus from "element-plus";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

const app = createApp(App);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.use(ElementPlus);
app.use(router);
app.use(store);
app.mount("#app");
