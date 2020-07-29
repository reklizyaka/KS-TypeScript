import Vue from "vue";
import Router, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";

Vue.use(Router);

const routes: RouteConfig[] = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/Login.vue"),
  },
];

const router = new Router({
  routes,
});

export default router;
