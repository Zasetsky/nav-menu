import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router/index";
import ElementPlus from "element-plus";

import "element-plus/dist/index.css";
import "@/assets/theme/index.css";
import "normalize.css";
import "@fontsource/roboto";

createApp(App).use(store).use(ElementPlus).use(router).mount("#app");
