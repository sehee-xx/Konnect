import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import router from "./router";
import "./style.css";
import { i18n } from "../i18n";

createApp(App)
  .use(createPinia())
  .use(i18n)
  .use(router) // ← and install it
  .mount("#app");
