import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  // {
  //   path: "/",
  //   name: "news",
  //   component: () => import("@/views/CompanyNews.vue"),
  // },
  // {
  //   path: "/about",
  //   name: "knowledge",
  //   component: () => import("@/views/KnowledgeBase.vue"),
  // },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
