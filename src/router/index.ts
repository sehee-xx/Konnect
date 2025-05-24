// src/router/index.js
import { createRouter, createWebHistory } from "vue-router";
import Landing from "../views/Landing.vue";
import Join from "../views/Join.vue";
import List from "../views/List.vue";
import Mypage from "../views/Mypage.vue";
import DestinationPlans from "../views/DestinationPlans.vue";
import CardDetail from "../views/CardDetail.vue";
import TripCreate from "../views/TripCreate.vue";

const routes = [
  { path: "/", component: Landing, meta: { noHeader: true } },
  { path: "/join", component: Join, meta: { noHeader: true } },
  { path: "/list", component: List },
  {
    path: "/mypage",
    name: "Mypage",
    component: Mypage,
  },
  {
    path: "/trip-create",
    name: "TripCreate",
    component: TripCreate,
  },
  {
    path: "/list/:regionId",
    name: "DestinationPlans",
    component: DestinationPlans,
    props: true,
  },
  {
    path: "/plan/:planId",
    name: "PlanById",
    component: CardDetail,
    props: true,
  },
  {
    path: "/plan/:planId/edit",
    name: "PlanEdit",
    component: () => import("../views/TravelEdit.vue"),
    props: true,
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
