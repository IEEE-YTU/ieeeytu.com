<template>
  <div class="col-md-12 col-lg-4 sidebar">
    <div class="blog-sidebar-box">
      <h3 class="heading">Blogda Ara</h3>
      <div class="search-input">
        <i @click="goSearch" class="fas fa-search"></i>

        <b-input v-model="searchQuery" @keydown.enter="goSearch"></b-input>
      </div>
    </div>
    <div class="blog-sidebar-box">
      <h3 class="heading">Popüler Yazılar</h3>

      <div class="blog-post-entry-sidebar">
        <ul>
          <li v-for="(post, index) in mostViewedBlogPosts" :key="'p' + index">
            <router-link :to="'/ytornavida/post/' + post.slug" v-if="post">
              <img :src="post.photo" class="mr-4 sidebar-post-image" />
              <div class="text">
                <h4>{{ post.title }}</h4>
                <div class="blog-post-meta">
                  <span class="mr-2">{{ $dateConverter(post.date) }} </span>
                </div>
              </div>
            </router-link>
          </li>
        </ul>
      </div>
    </div>

    <div class="sidebar-box">
      <h3 class="heading">Kategoriler</h3>
      <ul class="categories">
        <li
          v-for="(cat, index) in blogCategories"
          :key="'c' + index"
          class="li-cat"
        >
          <router-link
            :to="'/ytornavida/kategori/' + cat.slug"
            class="text-dark"
            >{{ cat.name }}
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import router from "../router";
export default {
  props: {
    showUser: Boolean
  },
  data() {
    return {
      searchQuery: null
    };
  },
  created() {
    this.getBlogCategories();
    this.getMostViewedBlogPosts();
  },
  computed: {
    ...mapState(["singlePost", "blogCategories", "mostViewedBlogPosts"])
  },
  methods: {
    ...mapActions(["getBlogCategories", "getMostViewedBlogPosts"]),
    goSearch() {
      router.push("/ytornavida/ara?q=" + this.searchQuery);
    }
  }
};
</script>
<style>
.sidebar-post-image {
  max-height: 70px;
  object-fit: cover;
  border-radius: 6px;
}
.li-cat {
  transition: 100ms;
}
.li-cat:hover {
  margin-left: 6px;
}
</style>
