import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "dashboard",
      component: () => import("../views/Dashboard.vue"),
    },
    {
      path: "/details/:id",
      name: "details",
      component: () => import("../views/Details.vue"),
    },
  ],
});

export default router;
