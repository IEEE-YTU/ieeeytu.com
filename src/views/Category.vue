<template>
  <div>
    <div
      class="site-cover site-cover-sm same-height overlay single-page "
      style="height:50vh"
      :style="{ 'background-image': `url('${category.photo}')` }"
    >
      <div class="container">
        <div class="row  justify-content-center">
          <div class="col-md-12 col-lg-10">
            <div class="blog-post-entry text-center">
              <h1 class="mb-4">
                <a href="#">{{ category.name }}</a>
              </h1>
              <p style="font-size:20px;color:rgb(255,255,255,.7)">
                {{ category.description }}
              </p>
              <p class="mt-3" v-if="role === 0 || role === 1">
                <router-link
                  :to="`/ytornavida/kategori/${category.slug}/edit`"
                  style="color:white"
                >
                  <i class="fas fa-edit mr-1"></i>Kategoriyi
                  Düzenle</router-link
                >
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="py-5">
      <div class="container">
        <h2 class="mb-4">{{ category.name }} ile ilgili yazılar</h2>
        <b-overlay :show="blogPostsLoading" rounded="sm">
          <div class="row">
            <div
              class="col-lg-4 mb-4"
              v-for="(item, index) in categoryPosts"
              :key="index"
            >
              <BlogGridItem :post="item" />
            </div></div
        ></b-overlay>

        <div
          v-if="
            !blogPostsLoading && (!categoryPosts || categoryPosts.length === 0)
          "
          class="row text-center pt-5 border-top"
        >
          <div class="col-md-12">
            <div class="col-md-12">
              <h5>Bu kategoriye ait yazı bulamadık :(</h5>
              <h6>
                Bu kategoriye bir şeyler yazmak istersen bize ulaş!
              </h6>
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
                      to="/ytornavida/kategoriler"
                      style="color:black;font-size:18px"
                    >
                      Diğer kategorilere göz at
                    </router-link>
                  </p>
                </div>
              </div>
            </div>
            <div v-if="categoryPosts.length > 0" class="mt-3">
              <b-pagination
                v-model="currentPage"
                pills
                :total-rows="parseInt((allCategoryPostsCount * 20) / 6)"
              ></b-pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";

import BlogGridItem from "../components/BlogGridItem";
export default {
  components: { BlogGridItem },
  data() {
    return {
      currentPage: 1,
      blogPostsLoading: true
    };
  },
  async created() {
    await this.getCategory(this.$route.params.slug);
    await this.getBlogPostsByCategory({
      size: 9,
      page: 0,
      blogCategoryId: this.category._id
    });
    this.blogPostsLoading = false;
  },
  methods: {
    ...mapActions(["getCategory", "getBlogPostsByCategory"]),
    async changePage() {
      this.blogPostsLoading = true;
      await this.getBlogPostsByCategory({
        size: 9,
        page: this.currentPage - 1,
        blogCategoryId: this.category._id
      });
      this.blogPostsLoading = false;
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  },
  computed: {
    ...mapGetters(["role"]),
    ...mapState(["category", "allCategoryPostsCount", "categoryPosts"])
  }
};
</script>
