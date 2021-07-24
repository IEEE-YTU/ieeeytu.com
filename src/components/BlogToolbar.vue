<template>
  <div style="z-index:123123123123">
    <b-sidebar
      id="sidebar-backdrop"
      title="Yıldız Tornavida"
      backdrop
      shadow
      right
      style="z-index:10000"
    >
      <div class="px-3 py-2">
        <nav class="blog-site-navigation" role="navigation">
          <ul class="site-menu mr-auto mb-0 blog-sidebar">
            <li>
              <router-link to="/ytornavida/ara">Blogda ara</router-link>
            </li>
            <li>
              <router-link to="/ytornavida/kategoriler"
                >Kategoriler</router-link
              >
            </li>
            <li v-if="isAuth && [0, 1].includes(role)">
              <router-link to="/ytornavida/new-post">+ Yazı ekle</router-link>
            </li>
            <hr />
            <li v-if="!isAuth">
              <a
                style="font-family:Nunito,sans-serif;color:#78BCFF !important;font-weight:600"
                href="/ytornavida/login-with-social"
                >Social ile Giriş Yap</a
              >
            </li>
            <li v-else>{{ user.name }} {{ user.surname }}</li>
            <li class="d-none d-lg-inline-block">
              <b-dropdown right size="lg" variant="link" no-caret>
                <template #button-content>
                  <b-img
                    width="40"
                    :src="user.photoXs"
                    rounded="circle"
                    style="object-fit:cover"
                  ></b-img>
                </template>
                <b-dropdown-item @click="logOut()" href="#"
                  >Çıkış yap</b-dropdown-item
                >
              </b-dropdown>
            </li>
          </ul>
        </nav>
      </div>
    </b-sidebar>
    <header class="blog-header">
      <div class="container">
        <div class="header-top ">
          <div class="col-2"></div>
          <router-link to="/ytornavida">
            <img
              class="col-8"
              :src="require('@/assets/yildiztornavida_beyaz.png')"
              alt=""
          /></router-link>
          <div class="col-2">
            <a v-b-toggle.sidebar-backdrop class=" d-inline-block d-lg-none"
              ><span class=" text-light icon-menu h3"></span
            ></a>
          </div>
        </div>
        <hr class="d-none d-md-block " />
        <nav class=" blog-site-navigation blog-nav" role="navigation">
          <ul
            class="site-menu blog-js-clone-nav d-none d-lg-flex blog-nav-list mb-0"
          >
            <router-link to="/ytornavida"> <li>Ana sayfa</li></router-link>
            <router-link to="/ytornavida/ara"> <li>Blogda ara</li></router-link>

            <router-link to="/ytornavida/kategoriler">
              <li>Kategoriler</li></router-link
            >

            <router-link
              v-if="isAuth && [0, 1].includes(role)"
              to="/ytornavida/new-post"
            >
              <li>+ Yazı ekle</li></router-link
            >
            |
            <li v-if="!isAuth">
              <a
                style="font-family:Nunito,sans-serif;color:#78BCFF"
                href="/ytornavida/login-with-social"
                >Social ile Giriş Yap</a
              >
            </li>

            <li v-else>
              <button class="blog-dropdown-button">
                {{ user.name }} {{ user.surname }}
              </button>
              <ul style="z-index:1234283" class="blog-dropdown">
                <li @click="logOut()">Çıkış Yap</li>
              </ul>
            </li>
          </ul>
        </nav>
      </div>
    </header>
    <!-- <header
      class="blog-site-navbar navbar-shadow"
      style="padding:18px 0;position:sticky;top:0"
      role="banner"
    >
      <div class="container-fluid">
        <div class="row align-items-center">
          <div class="col-4 site-logo">
            <router-link to="/ytornavida" class="text-black h2 mb-0">
              <img
                class="blog-logo"
                :src="require('@/assets/yildiztornavida.png')"
                alt=""
              />
            </router-link>
          </div>

          <div class="col-8 text-right">
            <nav class="blog-site-navigation" role="navigation">
              <ul
                class="site-menu blog-js-clone-nav mr-auto d-none d-lg-block mb-0"
              >
                <li>
                  <router-link to="/ytornavida/ara">Blogda ara</router-link>
                </li>
                <li>
                  <router-link to="/ytornavida/kategoriler"
                    >Kategoriler</router-link
                  >
                </li>
                <li v-if="isAuth && [0, 1].includes(role)">
                  <router-link to="/ytornavida/new-post"
                    >+ Yazı ekle</router-link
                  >
                </li>
                <li v-if="!isAuth">
                  <a
                    style="font-family:Nunito,sans-serif;color:#78BCFF"
                    href="/ytornavida/login-with-social"
                    >Social ile Giriş Yap</a
                  >
                </li>
                <li v-else>{{ user.name }} {{ user.surname }}</li>
                <li class="d-none d-lg-inline-block">
                  <b-dropdown right size="lg" variant="link" no-caret>
                    <template #button-content>
                      <b-img
                        width="40"
                        :src="user.photoXs"
                        rounded="circle"
                        style="object-fit:cover"
                      ></b-img>
                    </template>
                    <b-dropdown-item @click="logOut()" href="#"
                      >Çıkış yap</b-dropdown-item
                    >
                  </b-dropdown>
                </li>
              </ul>
            </nav>
            <a
              v-b-toggle.sidebar-backdrop
              class="text-black d-inline-block d-lg-none"
              ><span class="icon-menu h3"></span
            ></a>
          </div>
        </div>
      </div>
    </header> -->
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      dropdown: false
    };
  },
  methods: {
    logOut() {
      this.$ls.clear();
      window.location.href = "/ytornavida";
    }
  },
  computed: {
    ...mapGetters(["user", "isAuth", "role"])
  }
};
</script>
<style>
.blog-header {
  background: #171717;
  padding: 12px;
  padding-top: 24px;
}
.header-top {
  display: flex;
  justify-content: center;
}
.header-top img {
  width: 100%;
  max-width: 270px;
  object-fit: scale-down;
}
.header-top + hr {
  border-color: rgba(255, 255, 255, 0.089);
}
.blog-nav-list {
  z-index: 10000000;

  display: flex;
  list-style: none;
  color: rgb(190, 190, 190);
  justify-content: center;
  background: #171717;
  left: 0;
  right: 0;
}
.blog-nav-list li {
  color: rgb(190, 190, 190);
  margin: 0 15px;
  transition: 200ms;
  cursor: pointer;
}
.blog-nav-list li:hover {
  color: white;
}
.blog-nav {
  justify-content: center !important;
}
.blog-dropdown {
  position: absolute;
  background: white;
  color: black;
  border-radius: 4px;
  list-style: none;
  padding: 0;
  opacity: 0;
  visibility: hidden;

  transition: 200ms;
  transform: translateY(-10px);
  transition-delay: 200ms;
}
.blog-dropdown:hover {
  border-radius: 4px;
}
.blog-dropdown li {
  color: black;
  padding: 12px 20px;
  margin: 0;
  border-bottom: 2px solid #eee;
}
.blog-dropdown li:hover {
  color: unset;

  background: rgb(233, 233, 233);
}
.blog-dropdown-button {
  border: none;
  background: transparent;
  color: rgb(190, 190, 190);
}
.blog-dropdown-button:focus {
  outline: none;
}
.blog-dropdown-button:focus + .blog-dropdown {
  opacity: 1;
  visibility: visible;

  transform: translateY(0px);
}
</style>
