<template>
  <div class="container mt-4">
    <h1>Kategoriler</h1>

    <b-overlay :show="blogCategoriesLoading" rounded="sm">
      <div class="row mb-5 align-items-stretch retro-layout-2 ">
        <div
          v-for="(item, index) in blogCategories"
          :key="index"
          class="col-md-4 mb-3"
        >
          <router-link :to="'/ytornavida/kategori/' + item.slug">
            <div
              class="h-entry v-height gradient blog-category"
              :style="{
                'background-image': `url(${item.photo})`
              }"
            >
              <div class="text">
                <h2>{{ item.name }}</h2>
                <!-- <span class="date">{{ item.blogPostCount }} yazı</span> -->
              </div>
            </div></router-link
          >
        </div>
        <div class="col-md-4" v-if="role === 0">
          <router-link :to="{ name: 'AddCategory' }">
            <div
              class="h-entry v-height blog-category"
              style="border:2px solid black;"
            >
              <div class="text">
                <h2 style="color:#78BCFF !important">YENİ KATEGORİ EKLE</h2>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </b-overlay>
  </div>
</template>
<script>
import { mapActions, mapState, mapGetters } from "vuex";
export default {
  data() {
    return {
      blogCategoriesLoading: true
    };
  },
  methods: {
    ...mapActions(["getBlogCategories"])
  },
  computed: {
    ...mapGetters(["role"]),
    ...mapState(["blogCategories"])
  },
  async created() {
    this.blogCategoriesLoading = true;
    await this.getBlogCategories();
    this.blogCategoriesLoading = false;
  }
};
</script>
<style>
.blog-category {
  cursor: pointer;
  transition: 0.4s;
}
.blog-category:hover {
  transform: scale(1.05);
  box-shadow: 0px 10px 25px rgb(0, 0, 0, 0.2);
}
</style>
