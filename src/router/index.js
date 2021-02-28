import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/ocr",
    name: "Ocr",
    // route level code-splitting
    // this generates a separate chunk (ocr.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "ocr" */ "../views/Ocr.vue"),
  },
  {
    path: "/licenseplate",
    name: "LicensePlate",
    // route level code-splitting
    // this generates a separate chunk (licenseplate.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "licenseplate" */ "../views/LicensePlate.vue"),
  },
  {
    path: "/reference",
    name: "Reference",
    // route level code-splitting
    // this generates a separate chunk (reference.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "reference" */ "../views/Reference.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
