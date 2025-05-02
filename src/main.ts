import { createApp } from "vue";
import App from "./App.vue";
import router from "./router"; // ← re‑add this
import "./style.css";
import { i18n } from "../i18n";

createApp(App)
  .use(i18n)
  .use(router) // ← and install it
  .mount("#app");
