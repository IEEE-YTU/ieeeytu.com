import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Team from "../views/Team.vue";
import Committee from "../views/Committee.vue";
import Contact from "../views/Contact.vue";
import About from "../views/About.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/ekibimiz",
    name: "Team",
    component: Team
  },
  {
    path: "/komite/:slug",
    name: "Committee",
    component: Committee
  },
  {
    path: "/iletisim",
    name: "Contact",
    component: Contact
  },
  {
    path: "/hakkimizda",
    name: "About",
    component: About
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 };
  }
});

export default router;
