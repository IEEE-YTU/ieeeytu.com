<template>
  <div>
    <div class="site-wrap">
      <div class="site-mobile-menu site-navbar-target">
        <div class="site-mobile-menu-header">
          <div class="site-mobile-menu-close mt-3">
            <span class="icon-close2 js-menu-toggle"></span>
          </div>
        </div>
        <div
          class="site-mobile-menu-body"
          style="height:unset;padding-bottom:0"
        ></div>
        <div
          style="padding: 0 20px 20px 38px;font-size:20px;font-family:Nunito"
          @click="changeLanguage"
        >
          {{ language === "tr" ? "EN" : "TR" }}
        </div>
      </div>
      <div class="ieee-topbar">
        <div style="display:inline">
          <a href="https://www.ieee.org/" target="_blank">IEEE.org</a>
        </div>
        <div style="display:inline">
          <a href="http://www.ieeetrsb.org/" target="_blank">IEEETürkiye</a>
        </div>
        <div style="display:inline">
          <a href="https://ieeexplore.ieee.org/Xplore/home.jsp" target="_blank"
            >IEEEXplore</a
          >
        </div>
        <div style="display:inline">
          <a href="https://spectrum.ieee.org/" target="_blank">IEEESpectrum</a>
        </div>
        <div style="display:inline">
          <a href="https://standards.ieee.org/" target="_blank"
            >IEEEStandartları</a
          >
        </div>
      </div>
      <header
        class="site-navbar is-sticky js-sticky-header site-navbar-target"
        role="banner"
      >
        <div class="container">
          <div class="row align-items-center">
            <div class="col-6 col-xl-2">
              <h1 class="mb-0 site-logo">
                <a href="/" class="h2 mb-0">
                  <img
                    :src="require('@/assets/ieeeytulogo.png')"
                    height="40"
                    alt=""
                  />
                  <span class="text-primary"></span>
                </a>
              </h1>
            </div>

            <div class="col-12 col-md-10 d-none d-xl-block">
              <nav
                class="site-navigation position-relative text-right"
                role="navigation"
              >
                <ul
                  class="site-menu main-menu js-clone-nav mr-auto d-none d-lg-block"
                  style="color:#fff !important"
                >
                  <li>
                    <a href="/" class="nav-link">{{
                      variables.home[language]
                    }}</a>
                  </li>
                  <li>
                    <a href="/hakkimizda" class="nav-link">{{
                      variables.about[language]
                    }}</a>
                  </li>
                  <li class="has-children">
                    <a
                      href="#"
                      data-toggle="collapse"
                      data-target="#collapseItem0"
                      aria-expanded="true"
                      class="nav-link"
                      >{{ variables.committees[language] }}</a
                    >
                    <ul class="dropdown">
                      <li v-for="(committee, index) in committees" :key="index">
                        <a
                          :href="'/komite/' + committee.slug"
                          class="nav-link"
                          style="font-size:12px"
                          >{{
                            language === "tr"
                              ? committee.name
                              : committee.name_en
                          }}</a
                        >
                      </li>
                    </ul>
                  </li>

                  <li>
                    <a href="/ekibimiz" class="nav-link">{{
                      variables.team[language]
                    }}</a>
                  </li>
                  <li>
                    <a href="/iletisim" class="nav-link">{{
                      variables.contact[language]
                    }}</a>
                  </li>
                  <li class="social">
                    <a
                      href="https://tr-tr.facebook.com/ieeeytu/"
                      class="nav-link"
                      target="_blank"
                      ><span class="icon-facebook"></span
                    ></a>
                  </li>
                  <li class="social">
                    <a
                      target="_blank"
                      href="https://twitter.com/ytuieee"
                      class="nav-link"
                      ><span class="icon-twitter"></span
                    ></a>
                  </li>
                  <li class="social">
                    <a
                      target="_blank"
                      href="https://www.instagram.com/ieeeytu/"
                      class="nav-link"
                      ><span class="icon-instagram"></span
                    ></a>
                  </li>
                  <li class="social">
                    <a
                      target="_blank"
                      href="https://www.linkedin.com/company/ytu-ieee-student-branch/"
                      class="nav-link"
                      ><span class="icon-linkedin"></span
                    ></a>
                  </li>
                  <li
                    class="social"
                    style="font-family:Nunito;font-weight:700;"
                  >
                    <a
                      target="_blank"
                      href="https://social.ieeeytu.com"
                      class="nav-link"
                      style="color:#78BCFF !important"
                      >Social
                    </a>
                  </li>

                  <li @click="changeLanguage" id="selaam">
                    <a class="nav-link" href="#">
                      {{ language === "tr" ? "EN" : "TR" }}
                    </a>
                  </li>
                </ul>
              </nav>
            </div>

            <div
              class="col-6 d-inline-block d-xl-none ml-md-0 py-3"
              style="position: relative; top: 3px;"
            >
              <a href="#" class="site-menu-toggle js-menu-toggle float-right"
                ><span class="icon-menu h3"></span
              ></a>
            </div>
          </div>
        </div>
      </header>

      <router-view></router-view>
      <footer class="site-footer" style="padding-top:5em">
        <div class="container">
          <img
            width="300"
            style="margin-bottom:20px"
            :src="require('@/assets/20yil.png')"
            alt=""
          />
          <div class="row">
            <div class="col-md-9">
              <div class="row">
                <div class="col-md-5">
                  <h2 class="footer-heading mb-4">
                    {{ variables.about[language] }}
                  </h2>
                  <p>
                    {{ variables.mainpage1[language] }}
                  </p>
                </div>
                <div class="col-md-3 ml-auto">
                  <h2 class="footer-heading mb-4">
                    {{ variables.quick[language] }}
                  </h2>
                  <ul class="list-unstyled">
                    <li>
                      <a href="/">{{ variables.home[language] }}</a>
                    </li>
                    <li>
                      <a href="/hakkimizda">{{ variables.about[language] }}</a>
                    </li>
                    <li>
                      <a href="#services-section">{{
                        variables.committees[language]
                      }}</a>
                    </li>
                    <li>
                      <a href="/ekibimiz">{{ variables.team[language] }}</a>
                    </li>
                    <li>
                      <a href="/iletisim">{{ variables.contact[language] }}</a>
                    </li>
                  </ul>
                </div>
                <div class="col-md-4 footer-social">
                  <h2 class="footer-heading mb-4">
                    {{ variables.follow[language] }}
                  </h2>
                  <a
                    href="https://tr-tr.facebook.com/ieeeytu/"
                    target="_blank"
                    class="pl-0 pr-3"
                    ><span class="icon-facebook"></span
                  ></a>
                  <a
                    href="https://twitter.com/ytuieee"
                    target="_blank"
                    class="pl-3 pr-3"
                    ><span class="icon-twitter"></span
                  ></a>
                  <a
                    href="https://www.instagram.com/ieeeytu/"
                    target="_blank"
                    class="pl-3 pr-3"
                    ><span class="icon-instagram"></span
                  ></a>
                  <a
                    href="https://www.linkedin.com/company/ytu-ieee-student-branch/"
                    target="_blank"
                    class="pl-3 pr-3"
                    ><span class="icon-linkedin"></span
                  ></a>
                  <a
                    target="_blank"
                    href="https://social.ieeeytu.com"
                    class="pl-3 pr-3"
                    style="color:#78BCFF !important ;font-family:Nunito;font-weight:700;"
                    >Social
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
import committees from "./assets/committees.json";
import variables from "./assets/variables.json";
export default {
  data() {
    return {
      committees,
      variables
    };
  },
  created() {
    if (
      !this.$ls.get("language") ||
      !["tr", "en"].includes(this.$ls.get("language"))
    ) {
      this.$ls.set("language", "tr");
    }
  },
  methods: {
    changeLanguage() {
      if (this.$ls.get("language") === "tr") {
        this.$ls.set("language", "en");
      } else if (this.$ls.get("language") === "en") {
        this.$ls.set("language", "tr");
      }
      window.location.reload(true);
    }
  },
  computed: {
    language() {
      return this.$ls.get("language");
    }
  }
};
</script>
<style>
.ieee-topbar::-webkit-scrollbar {
  display: none;
}
/* Hide scrollbar for IE, Edge and Firefox */
.ieee-topbar {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
.ieee-topbar {
  overflow: scroll;
  background: black;
  text-align: center;
  padding: 6px;
}
.ieee-topbar div a {
  cursor: pointer;
  color: white;
  margin-right: 40px;
  font-size: 14px;
}
</style>
