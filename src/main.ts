import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router/index";
import ElementPlus from "element-plus";
import { io } from "socket.io-client";

import "element-plus/dist/index.css";
import "normalize.css";
import "@/assets/styles/main.scss";
import "@/assets/styles/_theme.css";

let initialMenuState = localStorage.getItem("menuIsCollapsed");
if (initialMenuState === null) {
  // Здесь вы можете выбрать, что делать при первом посещении сайта.
  // Например, можно установить меню в закрытое состояние:
  initialMenuState = "true"; // Это строка, а не булево значение.
  localStorage.setItem("menuIsCollapsed", initialMenuState);
}

const app = createApp(App);

const socket = io("http://localhost:3000"); // замените на адрес сервера

app.provide("socket", socket);

app.use(store).use(ElementPlus).use(router).mount("#app");
