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
import "../public/scss/style.scss";
import "../public/fonts/icomoon/style.css";
import "../public/fonts/flaticon/font/flaticon.css";
import Storage from "vue-ls";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

import { BootstrapVue } from "bootstrap-vue";

// Install BootstrapVue
Vue.use(BootstrapVue);

Vue.config.productionTip = false;

const options = {
  name: "ls", // name variable Vue.[ls] or this.[$ls],
  storage: "local" // storage name session, local, memory
};

Vue.use(Storage, options);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
