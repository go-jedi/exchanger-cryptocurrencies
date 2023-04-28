import Vue from "vue";
import VueRouter from "vue-router";

import HomeView from "@/views/HomeView.vue";
import LoginView from "@/views/LoginView.vue";
import RegisterView from "@/views/RegisterView.vue";
import ReviewView from "@/views/ReviewView.vue";
import PartnerView from "@/views/PartnerView.vue";
import ContactView from "@/views/ContactView.vue";
import RateView from "@/views/RateView.vue";
import ExchangeView from "@/views/ExchangeView.vue";
import PayView from "@/views/PayView.vue";
import RuleView from "@/views/RuleView.vue";
import FaqView from "@/views/FaqView.vue";
import RecoveryView from "@/views/RecoveryView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/register",
    name: "register",
    component: RegisterView,
  },
  {
    path: "/review",
    name: "review",
    component: ReviewView,
  },
  {
    path: "/partner",
    name: "partner",
    component: PartnerView,
  },
  {
    path: "/contact",
    name: "contact",
    component: ContactView,
  },
  {
    path: "/rate",
    name: "rate",
    component: RateView,
  },
  {
    path: "/exchange",
    name: "exchange",
    component: ExchangeView,
  },
  {
    path: "/pay",
    name: "pay",
    component: PayView,
  },
  {
    path: "/rule",
    name: "rule",
    component: RuleView,
  },
  {
    path: "/faq",
    name: "faq",
    component: FaqView,
  },
  {
    path: "/recovery",
    name: "recovery",
    component: RecoveryView,
  },
  //   {
  //     path: "/about",
  //     name: "about",
  //     // route level code-splitting
  //     // this generates a separate chunk (about.[hash].js) for this route
  //     // which is lazy-loaded when the route is visited.
  //     component: () => import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  //   },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, _, next) => {
  if (localStorage.getItem("token")) {
    if (to.name === "login" || to.name === "register") {
      router.push("/");
    } else {
      next();
    }
  }
  next();
});

export default router;
