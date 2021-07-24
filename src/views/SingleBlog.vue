<template>
  <b-overlay
    id="overlay-background"
    :show="singlePostLoading"
    variant="transparent"
    :opacity="1"
    blur="5px"
    rounded="sm"
  >
    <section v-if="singlePost" class="site-section py-lg mt-5 pt-0">
      <div class="container">
        <div class="row">
          <div
            class="left-side col-lg-2 mt-3 d-none d-lg-block h-100"
            style="position: fixed; z-index: 111"
          >
            <div
              class="left-info h-100"
              :style="{
                opacity:
                  scrollVal > 120 + imageHeight && scrollVal < pageHeight - 1100
                    ? 1
                    : 0,
                transform:
                  scrollVal > 120 + imageHeight && scrollVal < pageHeight - 1100
                    ? 'translateY(0)'
                    : 'translateY(-20px)',
              }"
            >
              <avatar
                v-if="singlePost.userId.photoXs"
                :src="singlePost.userId.photoXs"
                :size="84"
                style="display: block; border: 3px solid #ddd"
              />
              <strong
                >{{ singlePost.userId.name }}
                {{ singlePost.userId.surname }}</strong
              >
              <p>YAZDI</p>
              <!-- <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Delectus eaque corporis.
              </p> -->

              <!-- <a class="other-posts">Yazarın diğer yazıları</a> -->
              <ul class="action-icons">
                <li>
                  <img
                    v-if="singlePost.liked"
                    src="../assets/icons/liked.svg"
                    @click="_unlike()"
                  />
                  <img @click="_like()" v-else src="../assets/icons/like.svg" />
                  <span>{{ singlePost.likeCount || 0 }}</span>
                </li>
                <li>
                  <a href="#comments">
                    <img src="../assets/icons/chat.svg"
                  /></a>
                  <span> {{ singlePost.commentCount || 0 }}</span>
                </li>
                <li>
                  <img src="../assets/icons/visibility.svg" />
                  <span>{{ singlePost.viewCount || 0 }}</span>
                </li>
              </ul>
            </div>
          </div>
          <div class="col-md-12 col-lg-8 main-content mx-auto">
            <div class="mt-2">
              <span
                :style="{ background: cat.color }"
                v-for="(cat, index) in singlePost.blogCategoryId"
                :key="'c' + index"
                class="post-category text-white mr-2"
                >{{ cat.name }}</span
              >
            </div>

            <h1 class="tit">{{ singlePost.title }}</h1>
            <h4 v-if="singlePost.shortDescription">
              {{ singlePost.shortDescription }}
            </h4>
            <img
              class="main-image"
              ref="photo"
              :src="singlePost.photo"
              alt=""
              @load="getImageHeight"
            />
            <div class="d-flex mt-4 justify-content-between align-items-center">
              <div class="d-flex align-items-center author-bar author-figure">
                <avatar
                  :size="40"
                  :src="singlePost.userId.photoXs"
                  class="mr-2"
                />
                <div class="ml-2">
                  <p class="name">
                    <strong>
                      {{ singlePost.userId.name }}
                      {{ singlePost.userId.surname }}</strong
                    >
                  </p>

                  <p>{{ $dateConverter(singlePost.date) }}</p>
                </div>
              </div>
              <ul v-if="role === 0 || role === 1" class="d-flex list-unstyled">
                <li class="mr-3">
                  <router-link
                    :to="'/ytornavida/post/' + singlePost.slug + '/edit'"
                    >Düzenle</router-link
                  >
                </li>
                <li>
                  <a href="#" class="text-danger" @click="_deletePost">Sil</a>
                </li>
              </ul>
            </div>

            <div class="post-content-body" v-html="singlePost.text"></div>

            <div class="pt-5">
              <p>
                Kategoriler:

                <router-link
                  class="mr-2"
                  v-for="(cat, index) in singlePost.blogCategoryId"
                  :key="'cat' + index"
                  :to="'/ytornavida/kategori/' + cat.slug"
                  >{{ cat.name }}</router-link
                >&nbsp;&nbsp;Etiketler:
                <a
                  class="mr-2"
                  v-for="(tag, index) in singlePost.tags"
                  :key="'tag' + index"
                  href="#"
                  >{{ tag }}</a
                >
              </p>
            </div>

            <div class="pt-5" id="comments">
              <h3 class="mb-5" v-if="singlePost.blogComments.length > 0">
                {{ singlePost.blogComments.length }} Yorum
              </h3>
              <p v-else-if="isAuth">İlk yorum yazan sen ol!</p>
              <ul class="comment-list">
                <li
                  v-for="(comment, index) in singlePost.blogComments"
                  :key="'comment' + index"
                  class="comment"
                >
                  <div class="vcard">
                    <avatar :size="60" :src="comment.userId.photoXs" />
                  </div>
                  <div class="comment-body">
                    <h3>
                      {{ comment.userId.name + " " + comment.userId.surname }}
                    </h3>
                    <div class="meta">{{ $dateConverter(comment.date) }}</div>
                    <p>
                      {{ comment.text }}
                    </p>
                    <p v-if="isAuth && !comment.selected">
                      <b-button
                        @click="reply(comment._id)"
                        class="reply rounded"
                        size="sm"
                        style="border: 0"
                        >Yanıtla</b-button
                      >
                    </p>
                    <div v-if="isAuth && comment.selected">
                      <b-textarea v-model="replyText"> </b-textarea>
                      <b-button
                        class="mt-2 mr-2"
                        size="sm"
                        variant="success"
                        @click="sendComment(comment._id)"
                        >Gönder</b-button
                      >
                      <b-button
                        class="mt-2"
                        size="sm"
                        @click="cancelReply"
                        variant="danger"
                        >İptal</b-button
                      >
                    </div>
                  </div>
                  <ul
                    v-if="comment.children && comment.children.length > 0"
                    class="children"
                  >
                    <li
                      v-for="(children, index) in comment.children"
                      :key="'child' + index"
                      class="comment"
                    >
                      <div class="vcard">
                        <avatar :size="60" :src="comment.userId.photoXs" />
                      </div>
                      <div class="comment-body">
                        <h3>
                          {{
                            children.userId.name + " " + children.userId.surname
                          }}
                        </h3>
                        <div class="meta">
                          {{ $dateConverter(children.date) }}
                        </div>
                        <p>{{ children.text }}</p>
                        <!-- <p><a href="#" class="reply rounded">Reply</a></p> -->
                      </div>
                    </li>
                  </ul>
                </li>
              </ul>
              <!-- END comment-list -->

              <div class="comment-form-wrap pt-5">
                <div v-if="isAuth">
                  <b-form-group>
                    <b-textarea v-model="commentText" rows="6"> </b-textarea>
                  </b-form-group>
                  <b-form-group>
                    <b-button
                      @click="sendComment(null)"
                      :disabled="loading"
                      variant="outline-dark"
                    >
                      <b-spinner small v-if="loading"></b-spinner>
                      <span>Yorum yaz</span>
                    </b-button>
                  </b-form-group>
                </div>
                <div v-else>Yorum yapmak için giriş yapmalısınız!</div>
              </div>
            </div>
          </div>
          <div
            class="col-lg-2 mt-3 d-none d-lg-block h-100"
            style="position: fixed; right: 10%"
          >
            <div
              class="right-info h-100"
              :style="{
                opacity:
                  scrollVal > 120 + imageHeight && scrollVal < pageHeight - 1600
                    ? 1
                    : 0,
                transform:
                  scrollVal > 120 + imageHeight && scrollVal < pageHeight - 1600
                    ? 'translateY(0)'
                    : 'translateY(-20px)',
              }"
            >
              <div class="row justify-content-end">
                <div class="col-lg-2 share">
                  <span>PAYLAŞ</span>
                  <ul>
                    <li>
                      <a
                        target="_blank"
                        :href="
                          'https://twitter.com/intent/tweet?text=' +
                          singlePost.title +
                          '&url=https://www.ieeeytu.com/ytornavida/post/' +
                          singlePost.slug +
                          '&via=ieeeytu'
                        "
                        ><span
                          style="color: black; font-size: 18px"
                          class="icon-twitter p-2"
                        ></span
                      ></a>
                    </li>
                    <li>
                      <a
                        target="_blank"
                        :href="
                          'https://www.facebook.com/sharer/sharer.php?u=https://www.ieeeytu.com/ytornavida/post/' +
                          singlePost.slug
                        "
                        ><span
                          style="color: black; font-size: 18px"
                          class="icon-facebook p-2"
                        >
                        </span
                      ></a>
                    </li>
                    <li>
                      <a
                        target="_blank"
                        :href="
                          'http://www.linkedin.com/shareArticle?url=https://www.ieeeytu.com/ytornavida/post/' +
                          singlePost.slug +
                          '&title=' +
                          singlePost.title +
                          '&source=https//www.ieeeytu.com/ytornavida/'
                        "
                        ><span
                          style="color: black; font-size: 18px"
                          class="icon-linkedin p-2"
                        ></span
                      ></a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <!-- <sidebar :show-user="true" /> -->
        </div>
      </div>
    </section>
    <RelatedPosts v-if="singlePost" />
  </b-overlay>
</template>

<script>
/* eslint-disable no-unused-vars */
import hljs from "highlight.js";
import router from "../router";
// import Sidebar from "../components/Sidebar";
import RelatedPosts from "../components/RelatedPosts";

import { mapActions, mapState, mapGetters } from "vuex";
export default {
  components: { RelatedPosts },
  data() {
    return {
      commentText: null,
      parentId: null,
      replyText: null,
      loading: false,
      singlePostLoading: true,
      searchQuery: null,
      scrollVal: 0,
      imageHeight: 0,
      pageHeight: 0,
    };
  },

  methods: {
    async _like() {
      await this.likePost(this.singlePost._id);
    },
    async _unlike() {
      await this.unlikePost(this.singlePost._id);
    },
    getImageHeight() {
      this.imageHeight = this.$refs.photo.height;
    },
    ...mapActions([
      "getSinglePost",
      "sendBlogComment",
      "deletePost",
      "unlikePost",
      "likePost",
    ]),
    async _deletePost() {
      this.boxTwo = "";
      this.$bvModal
        .msgBoxConfirm(this.singlePost.title + " silinecek", {
          title: "Emin misiniz?",
          size: "sm",
          buttonSize: "sm",
          okVariant: "danger",
          okTitle: "EVET",
          cancelTitle: "HAYIR",
          footerClass: "p-2",
          hideHeaderClose: false,
          centered: true,
        })
        .then(async (value) => {
          if (value) {
            await this.deletePost(this.singlePost._id);
            router.push("/ytornavida");
          }
        });
    },
    async sendComment(parentId) {
      this.loading = true;
      await this.sendBlogComment({
        blogPostId: this.singlePost._id,
        text: parentId === null ? this.commentText : this.replyText,
        parentId: parentId,
      });
      this.commentText = null;
      this.loading = false;

      this.comment.selected = null;
      this.cancelReply();
    },
    goSearch() {
      router.push("/ytornavida/ara?q=" + this.searchQuery);
    },
    reply(parentId) {
      this.parentId = parentId;
      this.singlePost.blogComments = this.singlePost.blogComments.map(
        (element) => {
          if (element._id === parentId) element.selected = true;
          else element.selected = false;
          return element;
        }
      );
    },
    cancelReply() {
      this.replyText = null;
      this.singlePost.blogComments = this.singlePost.blogComments.map(
        (element) => {
          element.selected = false;
          return element;
        }
      );
    },
  },
  computed: {
    aaa() {
      return this.$refs.photo ? this.$refs.photo.height : null;
    },
    ...mapGetters(["isAuth", "role", "userId"]),
    ...mapState(["singlePost"]),
  },

  async created() {
    this.singlePostLoading = true;
    const self = this;
    const interval = setInterval(() => {
      self.pageHeight = document.body.clientHeight;
    }, 2000);
    document.addEventListener("scroll", () => {
      let ticking;
      if (!ticking) {
        window.requestAnimationFrame(() => {
          this.scrollVal = window.scrollY;
          ticking = false;
        });

        ticking = true;
      }
    });

    try {
      const { slug } = this.$route.params;
      this.singlePostLoading = true;
      await this.getSinglePost(slug);
      this.singlePostLoading = false;
    } catch (error) {
      router.push("/ytornavida");
    }

    var aCodes = document.getElementsByTagName("pre");
    console.log(aCodes);
    for (var i = 0; i < aCodes.length; i++) {
      const code = aCodes[i].getElementsByTagName("code")[0];
      hljs.highlightBlock(code);
    }
  },
  watch: {
    "$refs.photo"() {
      console.log("naber");
    },
    async "$route.params.slug"() {
      const { slug } = this.$route.params;
      this.singlePostLoading = true;
      await this.getSinglePost(slug);
      this.singlePostLoading = false;
    },
  },
};
</script>
<style>
.tit {
  --reach-tabs: 1;
  --reach-menu-button: 1;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  word-break: break-word;
  box-sizing: inherit;
  margin: 0;
  font-family: sohne, "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-weight: 700;
  color: rgba(41, 41, 41, 1);
  font-style: normal;
  margin-bottom: 0.4em;
  font-size: 46px;
  margin-top: 0.2em;
  line-height: 56px;
  letter-spacing: -0.011em;
}
.tit + hr {
  margin: 12px 0;
}
.tit + h4 {
  font-family: charter, Georgia, Cambria, "Times New Roman", Times, serif;
  color: rgb(129, 129, 129);

  font-style: italic;
}
.main-image {
  width: 130%;
  margin-left: -15%;
  margin-top: 1em;
  border-radius: 20px;
  margin-bottom: 3em;
}

.right-info,
.left-info {
  opacity: 0;
  transition: 300ms;
  transform: translateY(10px);
  width: 75%;
}

.left-info strong {
  color: black;
  font-weight: 700;
  font-family: sohne, "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 18px;
}
.left-info strong + p {
  text-transform: uppercase;
  font-family: sohne, "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 13px;
}
.left-info strong + p + p {
  font-family: sohne, "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 14px;
}
/* @import url("https://fonts.googleapis.com/css2?family=ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"); */
pre::before {
  content: attr(data-language);
  text-transform: uppercase;
  display: block;
  text-align: right;
  font-weight: bold;
  font-size: 0.6rem;
}
pre code .hljs-comment,
pre code .hljs-quote {
  color: #999;
}
pre code .hljs-variable,
pre code .hljs-template-variable,
pre code .hljs-attribute,
pre code .hljs-tag,
pre code .hljs-name,
pre code .hljs-regexp,
pre code .hljs-link,
pre code .hljs-name,
pre code .hljs-selector-id,
pre code .hljs-selector-class {
  color: #f2777a;
}
pre code .hljs-number,
pre code .hljs-meta,
pre code .hljs-built_in,
pre code .hljs-builtin-name,
pre code .hljs-literal,
pre code .hljs-type,
pre code .hljs-params {
  color: #f99157;
}
pre code .hljs-string,
pre code .hljs-symbol,
pre code .hljs-bullet {
  color: #9c9;
}
pre code .hljs-title,
pre code .hljs-section {
  color: #fc6;
}
pre code .hljs-keyword,
pre code .hljs-selector-tag {
  color: #69c;
}
pre code .hljs-emphasis {
  font-style: italic;
}
pre code .hljs-strong {
  font-weight: 700;
}
pre {
  padding: 10px;
  border-radius: 6px;
  color: white !important;
  background: black;
}
pre *::selection {
  background: rgb(255, 174, 0);
}

.post-content-body {
  --reach-tabs: 1;
  --reach-menu-button: 1;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  box-sizing: inherit;
  margin: 0;
  font-weight: 400;
  word-break: break-word;
  color: rgb(78, 78, 78);
  font-family: charter, Georgia, Cambria, "Times New Roman", Times, serif;
  margin-bottom: -0.46em;
  font-size: 21px;
  line-height: 32px;
  letter-spacing: -0.003em;
  margin-top: 1em;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
}
@media only screen and (max-width: 600px) {
  .post-content-body {
    font-size: 18px !important;
  }
}
.post-content-body iframe {
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgb(0, 0, 0, 0.2);
  margin: 15px auto;
  width: 96%;
}

.post-content-body h1,
.post-content-body h2,
.post-content-body h3,
.post-content-body h4,
.post-content-body h5 {
  font-family: sohne, "Helvetica Neue", Helvetica, Arial, sans-serif;
}
.post-content-body h1,
.post-content-body h2,
.post-content-body h3,
.post-content-body h4,
.post-content-body h5,
.post-content-body strong {
  color: rgb(10, 10, 10);
}
.post-content-body img {
  width: 96%;
  border-radius: 10px;
  transition: 300ms;
  box-shadow: 0px 0px 10px rgb(0, 0, 0, 0.2);
  opacity: 0.9;
  text-align: center;
  display: flex;
  margin: 15px auto;
}
.post-content-body img:hover {
  opacity: 1;
  box-shadow: 0px 0px 20px rgb(0, 0, 0, 0.2);
}
@import url(https://fonts.googleapis.com/css?family=Open+Sans:400italic);
.post-content-body blockquote {
  font-size: 1em;
  /* width: 60%; */
  margin: 30px auto;
  font-family: charter, Georgia, Cambria, "Times New Roman", Times, serif;
  font-style: italic;
  color: #555555;
  padding-left: 14px;
  border-left: 8px solid #666666;

  line-height: 1.6rem;
  position: relative;
  margin-left: -20px;
}

/* .post-content-body blockquote::before {
  font-family:  charter, Georgia, Cambria, "Times New Roman", Times,
    serif;
  content: "\201C";
  color: #a8a8a8;
  font-size: 4em;
  position: absolute;
  left: 10px;
  top: 48px;
} */

.post-content-body a {
  color: black;
  text-decoration: underline;
}
.post-content-body a:hover {
  color: black;
  text-decoration: underline;
}

.other-posts {
  font-size: 12px;
  text-transform: uppercase;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
}
.other-posts:hover::after {
  margin-left: 6px;
}
.other-posts::after {
  transition: 300ms;
  margin-left: 2px;
  content: "→";
}
.share > span {
  font-size: 12px;
  color: black;
  font-weight: bold;
}
.share > ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
.share > ul li {
  margin: 8px 0;
}
.share > ul li span {
  transition: 140ms;
  color: grey !important;
}
.share > ul li span:hover {
  color: rgb(0, 0, 0) !important;
}

.action-icons {
  list-style: none;
  padding: 0;
  margin-left: 4px;
  margin-top: 14px;
}

.action-icons li {
  margin-top: 6px;
  display: flex;
  align-items: bottom;
}
.action-icons img {
  cursor: pointer;
  transition: 300ms;
  width: 16px;
  margin-right: 8px;
}
.action-icons img:hover {
  transform: scale(1.1);
}

.author-bar p {
  font-family: sohne, "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 14px;
  margin: 0;
}
.author-bar .name {
  font-weight: 700;
  font-size: 16px;
}

html {
  scroll-behavior: smooth;
}
</style>
