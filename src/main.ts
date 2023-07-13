import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router/index";
import ElementPlus from "element-plus";

import "element-plus/dist/index.css";
import "@/assets/theme/index.css";
import "normalize.css";
import "@fontsource/roboto";
import "@/assets/styles/main.scss";

let initialMenuState = localStorage.getItem("menuIsCollapsed");
if (initialMenuState === null) {
  // Здесь вы можете выбрать, что делать при первом посещении сайта.
  // Например, можно установить меню в закрытое состояние:
  initialMenuState = "true"; // Это строка, а не булево значение.
  localStorage.setItem("menuIsCollapsed", initialMenuState);
}

createApp(App).use(store).use(ElementPlus).use(router).mount("#app");
