import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "shedule",
    component: () => import("@/views/WorkSchedule.vue"),
  },
  {
    path: "/employees",
    name: "employees",
    component: () => import("@/views/EmployeeSettings.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
