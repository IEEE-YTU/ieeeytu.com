<template>
  <div class="container">
    <div class="row mb-5 justify-content-end">
      <div class="col-sm-12 col-xs-12 col-md-12 col-lg-10">
        <h2>İlginizi Çekebilecek Yazılar</h2>
        <div
          class="row "
          style="height:500px;border-radius:4px;overflow:hidden"
          v-if="singlePost"
        >
          <div class="col-7 ">
            <PostCard
              className="row h-50"
              :post="singlePost.relatedPosts[0]"
            ></PostCard>

            <div class="row h-50">
              <PostCard
                className="col-6  "
                :post="singlePost.relatedPosts[1]"
              ></PostCard>
              <PostCard
                className="col-6  "
                :post="singlePost.relatedPosts[2]"
              ></PostCard>
            </div>
          </div>
          <PostCard
            className="col-5"
            :post="singlePost.relatedPosts[3]"
          ></PostCard>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import PostCard from "./PostCard";
export default {
  components: { PostCard },
  computed: {
    ...mapState(["singlePost"])
  }
};
</script>
