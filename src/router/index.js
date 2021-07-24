import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Team from "../views/Team.vue";
import Committee from "../views/Committee.vue";
import Contact from "../views/Contact.vue";
import Committees from "../views/Committees.vue";
import About from "../views/About.vue";
import Gallery from "../views/Gallery.vue";
import Blog from "../views/Blog.vue";
import SingleBlog from "../views/SingleBlog.vue";
import NewBlogPost from "../views/NewBlogPost.vue";
import Categories from "../views/Categories.vue";
import AddCategory from "../views/AddCategory.vue";
import Category from "../views/Category.vue";
import BlogLogin from "../views/BlogLogin.vue";
import Search from "../views/Search.vue";
import VueJwtDecode from "vue-jwt-decode";

Vue.use(VueRouter);

const ifAuthenticated = (to, from, next) => {
  const token = Vue.ls.get("token");

  const authUser = Vue.ls.get("token");

  if (to.meta.requiresAuth) {
    if (authUser) {
      const { role } = VueJwtDecode.decode(token);

      if (to.meta.roles && to.meta.roles.length > 0) {
        if (to.meta.roles.includes(role)) {
          next();
        } else {
          next("/");
        }
      } else {
        next();
      }
    } else {
      Vue.ls.clear();
      next({ name: "login" });
    }
  } else {
    next();
  }
};

const ifNotAuthenticated = (to, from, next) => {
  const authUser = Vue.ls.get("token");
  if (!authUser) {
    next();
  } else {
    next("/");
  }
};

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
    path: "/komiteler",
    name: "Committees",
    component: Committees
  },
  {
    path: "/hakkimizda",
    name: "About",
    component: About
  },
  {
    path: "/galeri",
    name: "Gallery",
    component: Gallery
  },
  {
    path: "/ytornavida/kategoriler",
    name: "Categories",
    component: Categories
  },
  {
    path: "/ytornavida/kategori/:slug",
    name: "Category",
    component: Category
  },
  {
    path: "/ytornavida/kategori/:slug/edit",
    name: "EditCategory",
    component: AddCategory,
    beforeEnter: ifAuthenticated,
    meta: {
      requiresAuth: true,
      roles: [0, 1]
    }
  },
  {
    path: "/ytornavida/add-category",
    name: "AddCategory",
    component: AddCategory,
    beforeEnter: ifAuthenticated,
    meta: {
      requiresAuth: true,
      roles: [0, 1]
    }
  },
  {
    path: "/ytornavida/new-post",
    name: "NewBlogPost",
    component: NewBlogPost,
    beforeEnter: ifAuthenticated,
    meta: {
      requiresAuth: true,
      roles: [0, 1]
    }
  },
  {
    path: "/ytornavida/post/:slug/edit",
    name: "EditSingleBlog",
    component: NewBlogPost,
    beforeEnter: ifAuthenticated,
    meta: {
      requiresAuth: true,
      roles: [0, 1]
    }
  },
  {
    path: "/ytornavida/post/:slug",
    name: "SingleBlog",
    component: SingleBlog
  },

  {
    path: "/ytornavida/login-with-social",
    name: "BlogLogin",
    component: BlogLogin,
    beforeEnter: ifNotAuthenticated
  },
  {
    path: "/ytornavida",
    name: "Blog",
    component: Blog
  },
  {
    path: "/ytornavida/ara",
    name: "Search",
    component: Search
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
