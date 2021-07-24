<template>
  <div class="entry2" ref="post">
    <router-link :to="'/ytornavida/post/' + post.slug">
      <div class="square-box w-100 img-fluid rounded img-responsive">
        <div
          class="square-content"
          :style="{
            'background-image': `url(${post.photo})`
          }"
        ></div>
      </div>

      <!-- <img
        :src="post.photo"
        alt="Image"
        class="img-fluid rounded img-responsive"
        style="min-height:250px;width:100%;object-fit:cover"
    /> -->
    </router-link>
    <div class="excerpt p-0">
      <span
        class="post-category text-white mb-3 mr-2"
        :style="{ background: cat.color }"
        v-for="(cat, index) in post.blogCategoryId"
        :key="'cc' + index"
        >{{ cat.name }}</span
      >

      <h2>
        <router-link :to="'/ytornavida/post/' + post.slug">{{
          post.title
        }}</router-link>
      </h2>
      <div class="blog-post-meta align-items-center text-left clearfix">
        <div class="author-figure mb-1 mr-3 float-left">
          <avatar :src="post.userId.photoXs" :size="30" />
        </div>
        <span class="d-inline-block mt-1">
          <a href="#">{{
            post.userId.name + " " + post.userId.surname
          }}</a></span
        >
        <span>&nbsp;-&nbsp; {{ dateString }}</span>
        <span class="icon-eye pl-3"></span> {{ post.viewCount }}
        <span
          @click="
            () => {
              if (post.liked) unlikePost(post._id);
              else likePost(post._id);
            }
          "
          :style="{ color: post.liked ? '#c0392b' : 'unset' }"
          style="cursor:pointer"
        >
          <span class="icon-heart pl-3"></span>
          {{ post.likeCount }}</span
        >
        <span>
          <span class="icon-comment pl-3"></span>
          {{ post.commentCount }}</span
        >
      </div>
      <div></div>

      <p
        v-html="
          post.text
            .replace(/<\/?[^>]+(>|$)/g, '')
            .split(' ')
            .slice(0, 30)
            .join(' ')
        "
      ></p>
      <p>
        <router-link :to="'/ytornavida/post/' + post.slug"
          >Devamını oku</router-link
        >
      </p>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  props: {
    post: {
      type: Object,
      default: null
    }
  },
  methods: {
    ...mapActions(["unlikePost", "likePost"])
  },
  computed: {
    dateString() {
      const d = new Date(this.post.date);
      const month = [
        "Ocak",
        "Şubat",
        "Mart",
        "Nisan",
        "Mayıs",
        "Haziran",
        "Temmuz",
        "Ağustos",
        "Eylül",
        "Ekim",
        "Kasım",
        "Aralık"
      ][d.getMonth()];
      const day = d.getDate();
      const year = d.getYear() + 1900;
      return `${day} ${month} ${year}`;
    }
  }
};
</script>
<style>
.square-box {
  position: relative;
}
.square-box:before {
  content: "";
  display: block;
  padding-top: 100%;
}
.square-content {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-position: center;
  background-size: 100% 100%;
  background-size: cover;
  border-radius: 10px;
  margin-bottom: 10px;
}
</style>
