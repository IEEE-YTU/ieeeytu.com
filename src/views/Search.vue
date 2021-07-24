<template>
  <div>
    <div
      class="site-cover site-cover-sm same-height overlay single-page "
      style="height:50vh;background-image:url(https://images.pexels.com/photos/733252/pexels-photo-733252.png?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260)"
    >
      <!-- :style="{ 'background-image': `url('${category.photo}')` }" -->
      <div class="container">
        <div class="row  justify-content-center">
          <div class="col-md-12 col-lg-10">
            <div class="blog-post-entry text-center">
              <h2 class="mb-4" style="position:relative;">
                <!-- <a href="#">{{ category.name }}</a> -->
                <a href="">Blogda Ara</a>
                <b-input
                  @keydown.enter="search"
                  v-model="newQ"
                  style="border-radius:6px;background:rgb(255,255,255,0.2);color:white"
                  class="mt-5 p-4"
                ></b-input>
                <i
                  @click="search"
                  style="position:absolute;right:20px;bottom:16px;font-size:20px"
                  class="fas fa-search"
                ></i>
              </h2>
              <p style="font-size:20px;color:rgb(255,255,255,.7)">
                <!-- {{ category.description }} -->
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="!q">
      <div class="row text-center pt-5 border-top">
        <div class="col-md-12">
          <h5>Merhaba! Sanırım yolunu kaybettin.</h5>
          <h6 class="mb-5">
            Harika blogumuzda arama yaparak istediğin yazıya hızlıca
            ulaşabilirsin.
          </h6>
        </div>
      </div>
    </div>
    <div class="container mt-4" v-if="q">
      <h3 class="mt-4 mb-4">
        <abbr title="">{{ q }}</abbr> arama sonuçları
      </h3>
      <b-overlay :show="loading" rounded="sm">
        <div class="row">
          <div
            class="col-lg-4 mb-4"
            v-for="(item, index) in searchPosts"
            :key="index"
          >
            <BlogGridItem :post="item" />
          </div></div
      ></b-overlay>

      <div v-if="q && !loading && (!searchPosts || searchPosts.length === 0)">
        <div class="row text-center pt-5 border-top">
          <div class="col-md-12">
            <h5>{{ q }} ile ilgili bir yazı bulamadık :(</h5>
            <h6>Bu konuyla alakalı bir şeyler yazmak istersen bize ulaş!</h6>
            <div class="col-md-12">
              <div>
                <p class="mt-4">
                  <a target="_blank" href="https://www.twitter.com/ieeeytu"
                    ><span
                      style="color:black;font-size:18px"
                      class="icon-twitter p-2"
                    ></span
                  ></a>
                  <a target="_blank" href="https://www.instagram.com/ieeeytu"
                    ><span
                      style="color:black;font-size:18px"
                      class="icon-instagram p-2"
                    ></span
                  ></a>
                  <a
                    target="_blank"
                    href="https://www.linkedin.com/company/ytu-ieee-student-branch/"
                    ><span
                      style="color:black;font-size:18px"
                      class="icon-linkedin p-2"
                    ></span
                  ></a>
                  <a target="_blank" href="mailto:iletisim@ieeeytu.com"
                    ><span
                      style="color:black;font-size:18px"
                      class="icon-envelope p-2"
                    ></span
                  ></a>
                </p>
                <p>
                  <router-link
                    to="/ytornavida"
                    style="color:black;font-size:18px"
                  >
                    Ana sayfaya dön
                  </router-link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BlogGridItem from "../components/BlogGridItem";
import router from "../router";
import { mapActions, mapState } from "vuex";
export default {
  components: { BlogGridItem },
  data() {
    return {
      loading: true,
      newQ: ""
    };
  },
  methods: {
    ...mapActions(["searchBlog"]),
    async search() {
      this.loading = true;
      await this.searchBlog(this.newQ);
      router.push("/ytornavida/ara?q=" + this.newQ);
      this.loading = false;
    }
  },
  computed: {
    ...mapState(["searchPosts"]),
    q() {
      return this.$route.query.q;
    }
  },
  async created() {
    this.newQ = this.q;
    this.loading = true;

    await this.searchBlog(this.q);
    this.loading = false;
  }
};
</script>
