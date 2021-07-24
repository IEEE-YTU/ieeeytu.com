<template>
  <div class="mb-5 ">
    <div class="row most-viewed container-fluid p-0 m-0">
      <!-- <div class="col-4">
            <PostCard
              className="row h-50 mb-1"
              :post="mostViewedBlogPosts[0]"
            ></PostCard>
            <div class="row h-50">
              <PostCard
                className="col-12"
                :post="mostViewedBlogPosts[1]"
              ></PostCard>
            </div>
          </div> -->
      <div class="col-6 col-lg-3 col-md-3 col-xs-6 col-sm-6   m-0 p-0">
        <PostCard :post="mostViewedBlogPosts[0]"></PostCard>
      </div>
      <div class="col-6 col-lg-3 col-md-3 col-xs-6 col-sm-6   m-0 p-0">
        <PostCard :post="mostViewedBlogPosts[1]"></PostCard>
      </div>
      <div class="col-6 col-lg-3 col-md-3 col-xs-6 col-sm-6   m-0 p-0">
        <PostCard :post="mostViewedBlogPosts[2]"></PostCard>
      </div>
      <div class="col-6 col-lg-3 col-md-3 col-xs-6 col-sm-6   m-0 p-0">
        <PostCard :post="mostViewedBlogPosts[3]"></PostCard>
      </div>

      <!-- <div class="col-4">
            <PostCard
              className="row h-50 mb-1"
              :post="mostViewedBlogPosts[3]"
            ></PostCard>

            <div class="row h-50">
              <PostCard
                className="col-12"
                :post="mostViewedBlogPosts[4]"
              ></PostCard>
            </div>
          </div> -->
    </div>
  </div>

  <!-- <div
      v-if="mostViewedBlogPosts.length === 5"
      class="row align-items-stretch retro-layout-2"
    >
      <div class="col-md-4 col-sm-4 col-xs-4">
        <router-link
          v-if="mostViewedBlogPosts[0]"
          :to="`/ytornavida/post/${mostViewedBlogPosts[0].slug}`"
          href="single.html"
          class="h-entry mb-30 v-height gradient"
          :style="{
            'background-image': `url(${mostViewedBlogPosts[0].photo})`
          }"
        >
          <div class="text">
            <h2>{{ mostViewedBlogPosts[0].title }}</h2>
            <span class="date">{{
              $dateConverter(mostViewedBlogPosts[0].date)
            }}</span>
          </div>
        </router-link>
        <router-link
          v-if="mostViewedBlogPosts[1]"
          :to="`/ytornavida/post/${mostViewedBlogPosts[1].slug}`"
          class="h-entry v-height gradient"
          :style="{
            'background-image': `url(${mostViewedBlogPosts[1].photo})`
          }"
        >
          <div class="text">
            <h2>{{ mostViewedBlogPosts[1].title }}</h2>
            <span class="date">{{
              $dateConverter(mostViewedBlogPosts[1].date)
            }}</span>
          </div>
        </router-link>
      </div>
      <div class="col-md-4 col-sm-4 col-xs-4">
        <router-link
          v-if="mostViewedBlogPosts[2]"
          :to="`/ytornavida/post/${mostViewedBlogPosts[2].slug}`"
          class="h-entry img-5 h-100 gradient"
          :style="{
            'background-image': `url(${mostViewedBlogPosts[2].photo})`
          }"
        >
          <div class="text">
            <div class="post-categories mb-3">
              <span
                v-for="(cat, index) in mostViewedBlogPosts[2].blogCategoryId"
                :key="index"
                class="post-category mr-2"
                :style="{ background: cat.color }"
                >{{ cat.name }}</span
              >
            </div>
            <h2>{{ mostViewedBlogPosts[2].title }}</h2>
            <span class="date">{{
              $dateConverter(mostViewedBlogPosts[2].date)
            }}</span>
          </div>
        </router-link>
      </div>
      <div class="col-md-4 col-sm-4 col-xs-4">
        <router-link
          v-if="mostViewedBlogPosts[3]"
          :to="`/ytornavida/post/${mostViewedBlogPosts[3].slug}`"
          class="h-entry mb-30 v-height gradient"
          :style="{
            'background-image': `url(${mostViewedBlogPosts[3].photo})`
          }"
        >
          <div class="text">
            <h2>{{ mostViewedBlogPosts[3].title }}</h2>
            <span class="date">{{
              $dateConverter(mostViewedBlogPosts[3].date)
            }}</span>
          </div>
        </router-link>
        <router-link
          v-if="mostViewedBlogPosts[4]"
          :to="`/ytornavida/post/${mostViewedBlogPosts[4].slug}`"
          class="h-entry v-height gradient"
          :style="{
            'background-image': `url(${mostViewedBlogPosts[4].photo})`
          }"
        >
          <div class="text">
            <h2>{{ mostViewedBlogPosts[4].title }}</h2>
            <span class="date">{{
              $dateConverter(mostViewedBlogPosts[4].date)
            }}</span>
          </div>
        </router-link>
      </div>
    </div>
    <div
      v-else-if="mostViewedBlogPosts.length === 4"
      class="row align-items-stretch retro-layout-2"
    >
      <div class="col-md-4">
        <router-link
          v-if="mostViewedBlogPosts[0]"
          :to="`/ytornavida/post/${mostViewedBlogPosts[0].slug}`"
          class="h-entry img-5 h-100 gradient"
          :style="{
            'background-image': `url(${mostViewedBlogPosts[0].photo})`
          }"
        >
          <div class="text">
            <div class="post-categories mb-3"></div>
            <h2>{{ mostViewedBlogPosts[0].title }}</h2>
            <span class="date">{{
              $dateConverter(mostViewedBlogPosts[0].date)
            }}</span>
          </div>
        </router-link>
      </div>
      <div class="col-md-4">
        <router-link
          v-if="mostViewedBlogPosts[1]"
          :to="`/ytornavida/post/${mostViewedBlogPosts[1].slug}`"
          class="h-entry img-5 h-100 gradient"
          :style="{
            'background-image': `url(${mostViewedBlogPosts[1].photo})`
          }"
        >
          <div class="text">
            <div class="post-categories mb-3"></div>
            <h2>{{ mostViewedBlogPosts[1].title }}</h2>
            <span class="date">{{
              $dateConverter(mostViewedBlogPosts[1].date)
            }}</span>
          </div>
        </router-link>
      </div>
      <div class="col-md-4">
        <router-link
          v-if="mostViewedBlogPosts[2]"
          :to="`/ytornavida/post/${mostViewedBlogPosts[2].slug}`"
          class="h-entry mb-30 v-height gradient"
          :style="{
            'background-image': `url(${mostViewedBlogPosts[2].photo})`
          }"
        >
          <div class="text">
            <h2>{{ mostViewedBlogPosts[2].title }}</h2>
            <span class="date">{{
              $dateConverter(mostViewedBlogPosts[2].date)
            }}</span>
          </div>
        </router-link>
        <router-link
          v-if="mostViewedBlogPosts[3]"
          :to="`/ytornavida/post/${mostViewedBlogPosts[3].slug}`"
          class="h-entry v-height gradient"
          :style="{
            'background-image': `url(${mostViewedBlogPosts[3].photo})`
          }"
        >
          <div class="text">
            <h2>{{ mostViewedBlogPosts[3].title }}</h2>
            <span class="date">{{
              $dateConverter(mostViewedBlogPosts[3].date)
            }}</span>
          </div>
        </router-link>
      </div>
    </div> -->
</template>
<script>
import { mapState } from "vuex";
import PostCard from "./PostCard";
export default {
  components: { PostCard },
  computed: {
    ...mapState(["mostViewedBlogPosts"])
  }
};
</script>
<style>
.most-viewed {
  height: 450px;

  flex-wrap: wrap;
}
@media only screen and (max-width: 600px) {
  .most-viewed {
    height: 450px;
  }
}
html,
body {
  overflow-x: hidden;
}
</style>
