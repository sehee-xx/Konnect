// src/router/index.js
import { createRouter, createWebHistory } from "vue-router";
import Landing from "../views/Landing.vue";
import Join from "../views/Join.vue";
import List from "../views/List.vue";
import Mypage from "../views/Mypage.vue";
import DestinationPlans from "../views/DestinationPlans.vue";
import TripCreate from "../views/TripCreate.vue";
import CardDetail from "../views/CardDetail.vue";

const routes = [
  {
    path: "/",
    name: "Landing",
    component: Landing,
    meta: { noHeader: true },
  },
  {
    path: "/join",
    name: "Join",
    component: Join,
    meta: { noHeader: true },
  },
  {
    path: "/list",
    name: "List",
    component: List,
  },
  {
    path: "/mypage",
    name: "Mypage",
    component: Mypage,
  },
  {
    path: "/trip-create",
    name: "TripCreate",
    component: TripCreate,
    props: true,
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
    component: TripCreate,
    props: true,
  },
  {
    path: "/detail/:planId",
    name: "TravelDetail",
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
