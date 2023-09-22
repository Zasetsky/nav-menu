import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router/index";
import { io } from "socket.io-client";

import "normalize.css";
import "@/assets/styles/_theme.css";
import "@/assets/styles/main.scss";

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

app.use(store).use(router).mount("#app");
