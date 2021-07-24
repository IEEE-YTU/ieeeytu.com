import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "../public/css/bootstrap.min.css";
import "../public/css/bootstrap.min.css";
import "../public/css/jquery-ui.css";
import "../public/css/owl.carousel.min.css";
import "../public/css/owl.theme.default.min.css";
import "../public/css/owl.theme.default.min.css";
import "../public/css/jquery.fancybox.min.css";
import "../public/css/bootstrap-datepicker.css";
import "../public/css/aos.css";
import "../public/css/style.css";
// import "../public/scss/style.scss";
import "../public/fonts/icomoon/style.css";
import "../public/fonts/flaticon/font/flaticon.css";

import Storage from "vue-ls";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

import { BootstrapVue } from "bootstrap-vue";
import DefaultLayout from "./DefaultLayout.vue";
import BlogLayout from "./BlogLayout.vue";
import Avatar from "./components/Avatar.vue";

import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload)

Vue.use(BootstrapVue);

Vue.config.productionTip = false;

const options = {
  name: "ls", // name variable Vue.[ls] or this.[$ls],
  storage: "local" // storage name session, local, memory
};

Vue.use(Storage, options);

Vue.component("default-layout", DefaultLayout);

Vue.component("blog-layout", BlogLayout);

Vue.component("avatar", Avatar);
const dateConverter = (d, showTime = true) => {
  d = new Date(d);

  const month = [
    "Oca",
    "Şub",
    "Mar",
    "Nis",
    "May",
    "Haz",
    "Tem",
    "Ağu",
    "Eyl",
    "Eki",
    "Kas",
    "Ara"
  ][d.getMonth()];
  const days = [
    "Pazar",
    "Pazartesi",
    "Salı",
    "Çarşamba",
    "Perşembe",
    "Cuma",
    "Cumartesi"
  ];
  const day = d.getDate();
  const year = d.getYear() + 1900;
  const hour = d.getHours();
  const minute = d.getMinutes();
  const date = `${day} ${month} ${year} ${days[d.getDay()]}`;
  const time = `${hour < 10 ? `0${hour}` : hour}:${minute < 10 ? `0${minute}` : minute
    }`;
  return `${date}${showTime ? " - " + time : ""}`;
};
export default dateConverter;

Vue.prototype.$dateConverter = dateConverter;

import VueTypedJs from "vue-typed-js";

Vue.use(VueTypedJs);

import "../src/assets/webfonts/stylesheet.css";

new Vue({
  router,
  store,
  render: h => h(App),
  data() {
    return {
      windowHeight: window.innerHeight,
      windowWidth: window.innerWidth,
      txt: ""
    };
  },
  watch: {
    windowWidth(val) {
      console.log(val);
    }
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener("resize", this.onResize);
    });
  },

  beforeDestroy() {
    window.removeEventListener("resize", this.onResize);
  },

  methods: {
    onResize() {
      this.windowHeight = window.innerHeight;
      this.innerWidth = window.innerWidth;
    }
  }
}).$mount("#app");
