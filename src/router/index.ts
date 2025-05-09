import { createRouter, createWebHistory } from "vue-router";
import Landing from "../views/Landing.vue";
import Join from "../views/Join.vue";
import List from "../views/List.vue";
import DestinationPlans from "../views/DestinationPlans.vue";

const routes = [
  { path: "/", component: Landing },
  { path: "/join", component: Join },
  { path: "/list", component: List },
  {
    path: "/list/:regionId",
    name: "DestinationPlans",
    component: DestinationPlans,
    props: true, // regionId 를 props 로 전달
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
