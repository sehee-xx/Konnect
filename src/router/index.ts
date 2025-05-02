import { createRouter, createWebHistory } from "vue-router";
import Landing from "../views/Landing.vue";
import Join from "../views/Join.vue";

const routes = [
  { path: "/", component: Landing },
  { path: "/join", component: Join },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
