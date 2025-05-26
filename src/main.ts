// src/main.js
import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import router from "./router";
import "./style.css";
import { i18n } from "../i18n";
import { emitter } from "./plugins/emitter";

const app = createApp(App);

// 전역 프로퍼티로 붙여두면 this.emitter 또는 setup() 내에서 import 없이 this.emitter로도 쓸 수 있습니다.
app.config.globalProperties.emitter = emitter;

app.use(createPinia()).use(i18n).use(router).mount("#app");
