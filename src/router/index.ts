import { createRouter, createWebHistory } from "vue-router";
import Landing from "../views/Landing.vue";
import Join from "../views/Join.vue";
import List from "../views/List.vue";

const routes = [
  { path: "/", component: Landing },
  { path: "/join", component: Join },
  { path: "/list", component: List },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
