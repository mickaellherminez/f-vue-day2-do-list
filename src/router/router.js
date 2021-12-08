import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/to-do-list/",
    name: "home",
    component: () => import("@/views/ToDoList.vue")
  },
  {
    path: "/task/:item",
    name: "task",
    component: () => import("@/views/Task.vue")
  },
  {
    path: "/*",
    redirect: { name: "home" },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  // base: `${process.env.BASE_URL}/v2/`,
  routes,
});

export default router;
