<template>
  <body>
    <div class="main-black-back">
      <!-- <vue-typed-js
        :strings="blogCategories.map(x => x.name)"
        :loop="true"
        :startDelay="1000"
        :backDelay="2000"
        :typeSpeed="80"
        :backSpeed="80"
      >
        <h1 class="mt-3 mb-3 top-text">
          <i>
            Gün gelir, <span class="typing" style="opacity:0.7"></span>lazım
            olur.
          </i>
        </h1>
      </vue-typed-js> -->
      <div class="main-black-back pt-5">
        <div class="container ">
          <b-overlay :show="mostViewedLoading" rounded="sm">
            <most-viewed />
          </b-overlay>
        </div>
      </div>
    </div>

    <div class="blog-site-section">
      <div class="container">
        <div class="row mb-5">
          <div class="col-12 d-flex justify-content-between align-items-center">
            <h2>Son Yazılar</h2>
          </div>
        </div>
        <b-overlay :show="blogPostsLoading" rounded="sm">
          <div class="row">
            <div
              class="col-lg-8 col-md-8 col-sm-12 col-xs-12"
              v-if="postDisplay === 'grid'"
            >
              <div class="row">
                <div
                  class="col-lg-12 mb-4"
                  v-for="(item, index) in blogPosts"
                  :key="index"
                >
                  <BlogGridItem :post="item" />
                  <hr v-if="index !== blogPosts.length - 1" />
                </div>
              </div>
              <div class="row text-center pt-5 border-top">
                <div class="col-md-12">
                  <div class="mt-3">
                    <b-pagination
                      v-model="currentPage"
                      pills
                      :total-rows="parseInt((allPostCount * 20) / 6)"
                    ></b-pagination>
                  </div>
                </div>
              </div>
            </div>

            <sidebar :show-user="false" />
          </div>
        </b-overlay>
      </div>
    </div>
  </body>
</template>
<script>
import BlogGridItem from "../components/BlogGridItem";
import MostViewed from "../components/MostViewed";
import Sidebar from "../components/Sidebar";
import { mapState, mapActions } from "vuex";
import router from "../router";
export default {
  data() {
    return {
      postDisplay: "grid",
      currentPage: 1,
      mostViewedLoading: true,
      blogPostsLoading: true,
      searchQuery: null
    };
  },
  // eslint-disable-next-line vue/no-unused-components
  components: { BlogGridItem, MostViewed, Sidebar },
  methods: {
    ...mapActions(["getBlogPost", "getBlogCategories", "searchBlog"]),
    goSearch() {
      router.push("/ytornavida/ara?q=" + this.searchQuery);
    },
    async changePage() {
      this.blogPostsLoading = true;
      await this.getBlogPost({ size: 6, page: this.currentPage - 1 });
      this.blogPostsLoading = false;
      window.scrollTo({ top: 700, behavior: "smooth" });
    },
    changeDisplay(type) {
      this.postDisplay = type;
    }
  },
  computed: {
    ...mapState(["blogPosts", "allPostCount", "blogCategories"]),
    pageCount() {
      return Math.ceil(this.allPostCount / 6);
    }
  },
  async created() {
    await this.getBlogPost({ size: 6, page: 0 });
    this.blogPostsLoading = false;
    this.mostViewedLoading = false;

    await this.getBlogCategories();
    await this.searchBlog("yazılım");
  },
  watch: {
    currentPage() {
      this.changePage();
    }
  }
};
</script>

<style>
/* @import url("https://fonts.googleapis.com/css2?family=Crimson+Text:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&display=swap"); */
.ytornavida-blog-post {
  padding-bottom: 12px;
  border-bottom: 1px solid #eee;
}
.ytornavida-blog-post img {
  border-radius: 6px;
}
.ytornavida-blog-post h1 {
  margin-top: 12px;
  margin-bottom: 12px;
}
.ytornavida-blog-post .blog-user {
  display: flex;
  justify-content: space-between;
}
.ytornavida-blog-post .blog-user img {
  border-radius: 50%;
  width: 30px;
}
.blog-gorunum i {
  margin-left: 8px;
  font-size: 18px;
}
.blog-gorunum i:hover {
  color: black;
  cursor: pointer;
}
.selected-display {
  color: black;
}

.search-input {
  position: relative;
}
.search-input input {
  padding-right: 34px;
}
.search-input i {
  position: absolute;
  right: 14px;
  top: 14px;
  cursor: pointer;
}

.top-text {
  font-family: "Times New Roman" !important;
  display: block;
  text-align: center;
  width: 100%;
  font-size: 26px;
  color: white;
}
@media only screen and (max-width: 600px) {
  .top-text {
    font-size: 19px;
  }
}

.main-black-back {
  background: #171717;
}
</style>
