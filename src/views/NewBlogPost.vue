/* eslint-disable vue/no-parsing-error */
<template>
  <div class="container">
    <VideoModal ref="videoModal" @onConfirm="addCommand" />

    <h1>Yeni Yazı</h1>
    <b-form-group label="Başlık">
      <b-input v-model="newBlogPost.title" size="lg"></b-input>
    </b-form-group>
    <b-form-group label="Yazı" style="position:relative">
      <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
        <div class="menubar">
          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.bold() }"
            @click="commands.bold"
          >
            <i class="fas fa-bold"></i>
          </button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.italic() }"
            @click="commands.italic"
          >
            <i class="fas fa-italic"></i>
          </button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.underline() }"
            @click="commands.underline"
          >
            <i class="fas fa-underline"></i>
          </button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.strike() }"
            @click="commands.strike"
          >
            <i class="fas fa-strikethrough"></i>
          </button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.code() }"
            @click="commands.code"
          >
            {{ code }}
          </button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.paragraph() }"
            @click="commands.paragraph"
          >
            <i class="fas fa-paragraph"></i>
          </button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.heading({ level: 1 }) }"
            @click="commands.heading({ level: 1 })"
          >
            H1
          </button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.heading({ level: 2 }) }"
            @click="commands.heading({ level: 2 })"
          >
            H2
          </button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.heading({ level: 3 }) }"
            @click="commands.heading({ level: 3 })"
          >
            H3
          </button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.bullet_list() }"
            @click="commands.bullet_list"
          >
            <i class="fas fa-list-ul"></i>
          </button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.ordered_list() }"
            @click="commands.ordered_list"
          >
            <i class="fas fa-list-ol"></i>
          </button>
          <button
            class="menubar__button"
            @click="showImagePrompt(commands.image)"
          >
            <i class="fas fa-image"></i>
          </button>
          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.blockquote() }"
            @click="commands.blockquote"
          >
            <i class="fas fa-quote-right"></i>
          </button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.code_block() }"
            @click="commands.code_block"
          >
            <i class="fas fa-code"></i>
          </button>

          <button class="menubar__button" @click="commands.horizontal_rule">
            -
          </button>

          <button class="menubar__button" @click="commands.undo">
            <i class="fas fa-undo"></i>
          </button>

          <button class="menubar__button" @click="commands.redo">
            <i class="fas fa-redo"></i>
          </button>
          <button
            class="menubar__button"
            @click="showVideoModal(commands.iframe)"
          >
            <i class="fab fa-youtube"></i>
          </button>
        </div>
      </editor-menu-bar>
      <editor-menu-bubble
        class="menububble"
        :editor="editor"
        @hide="hideLinkMenu"
        v-slot="{ commands, isActive, getMarkAttrs, menu }"
      >
        <div
          class="menububble"
          :class="{ 'is-active': menu.isActive }"
          :style="`left: ${menu.left}px; bottom: ${menu.bottom}px;`"
        >
          <form
            class="menububble__form"
            v-if="linkMenuIsActive"
            @submit.prevent="setLinkUrl(commands.link, linkUrl)"
          >
            <input
              class="menububble__input"
              type="text"
              v-model="linkUrl"
              placeholder="https://"
              ref="linkInput"
              @keydown.esc="hideLinkMenu"
            />
            <button
              class="menububble__button"
              @click="setLinkUrl(commands.link, null)"
              type="button"
            >
              <i class="fas fa-link"></i>
            </button>
          </form>

          <template v-else>
            <button
              class="menububble__button"
              @click="showLinkMenu(getMarkAttrs('link'))"
              :class="{ 'is-active': isActive.link() }"
            >
              <span>{{
                isActive.link() ? "Linki güncelle" : "Link ekle"
              }}</span>
              <i class="fas fa-remove"></i>
            </button>
          </template>
        </div>
      </editor-menu-bubble>
      <editor-content
        class="editor__content post-content-body"
        :editor="editor"
      />
    </b-form-group>
    <b-form-group label="Ana görsel linki">
      <b-input v-model="newBlogPost.photo" size="lg"></b-input>
    </b-form-group>
    <b-form-group label="Etiketler">
      <b-form-tags
        placeholder="Etiket yaz enter'a bas"
        add-button-text="Ekle"
        v-model="newBlogPost.tags"
      ></b-form-tags>
    </b-form-group>
    <b-form-group label="Yazar">
      <b-input v-model="author" v-if="!newBlogPost.userId" size="lg"></b-input>

      <div class="user-search" v-if="!newBlogPost.userId">
        <ul>
          <li
            v-for="(user, index) in suggestedUsers"
            :key="index"
            @click="selectUser(user._id)"
          >
            <avatar :src="user.photoXs" :size="30" class="mr-2" />
            <p>{{ user.fullname }}</p>
            <span>{{ user.username }}</span>
            <span
              v-if="user.committee"
              :style="{ color: user.committee.color, fontWeight: '700' }"
              >{{ user.committee.name }}</span
            >
          </li>
        </ul>
      </div>
      <div class="selected-user" v-else>
        <avatar :src="selectedUser.photoXs" :size="30" class="mr-2" />

        <p>{{ selectedUser.fullname }}</p>
        <span>{{ selectedUser.username }}</span>
        <span
          v-if="selectedUser.committee"
          :style="{ color: selectedUser.committee.color, fontWeight: '700' }"
          >{{ selectedUser.committee.name }}</span
        >
        <span class="ml-auto" @click="changeUser">Değiştir</span>
      </div>
    </b-form-group>
    <b-form-group label="Kategori">
      <b-form-checkbox-group
        v-model="newBlogPost.blogCategoryId"
        :options="categories"
      ></b-form-checkbox-group>
    </b-form-group>
    <b-form-group>
      <b-button
        v-if="$route.name === 'NewBlogPost'"
        @click="create"
        variant="success"
        :disabled="loading"
      >
        <b-spinner small v-if="loading"></b-spinner>
        <span>Ekle</span>
      </b-button>
      <b-button v-else @click="update" variant="success" :disabled="loading">
        <b-spinner small v-if="loading"></b-spinner>
        <span>Güncelle</span>
      </b-button>
    </b-form-group>
  </div>
</template>
<script>
import { Editor, EditorContent, EditorMenuBar, EditorMenuBubble } from "tiptap";

import {
  Blockquote,
  CodeBlock,
  CodeBlockHighlight,
  HardBreak,
  Heading,
  HorizontalRule,
  OrderedList,
  BulletList,
  ListItem,
  TodoItem,
  TodoList,
  Bold,
  Code,
  Italic,
  Link,
  Strike,
  Underline,
  History,
  Image,
  TrailingNode
} from "tiptap-extensions";

import { mapActions, mapState } from "vuex";

import router from "../router/index";
import Iframe from "../components/iframe";
import VideoModal from "../components/VideoModal";
import javascript from "highlight.js/lib/languages/javascript";
import css from "highlight.js/lib/languages/css";
import python from "highlight.js/lib/languages/python";

export default {
  components: { EditorContent, EditorMenuBar, VideoModal, EditorMenuBubble },
  data() {
    return {
      code: "<>",
      editor: new Editor({
        extensions: [
          new CodeBlockHighlight({
            languages: {
              javascript,
              css,
              python
            }
          }),
          new Blockquote(),
          new BulletList(),
          new CodeBlock(),
          new HardBreak(),
          new Heading({ levels: [1, 2, 3] }),
          new HorizontalRule(),
          new ListItem(),
          new OrderedList(),
          new TodoItem(),
          new TodoList(),
          new Link(),
          new Bold(),
          new Code(),
          new Italic(),
          new Strike(),
          new Underline(),
          new History(),
          new Image(),
          new Iframe(),
          new TrailingNode()
        ],
        content: "",
        onUpdate: ({ getHTML }) => {
          this.html = getHTML();
        }
      }),
      html: "",
      newBlogPost: {
        title: null,
        text: null,
        tags: null,
        photo: null,
        blogCategoryId: [],
        userId: null
      },
      author: "",
      loading: false,
      awaitingSearch: false,
      selectedUser: null,
      editorConfig: {},
      linkUrl: null,
      linkMenuIsActive: false
    };
  },
  mounted() {},
  beforeDestroy() {
    this.editor.destroy();
  },
  computed: {
    ...mapState([
      "blogCategories",
      "createdPost",
      "suggestedUsers",
      "singlePost"
    ]),
    categories() {
      return this.blogCategories
        ? this.blogCategories.map(x => {
            return {
              text: x.name,
              value: x._id
            };
          })
        : [];
    }
  },
  async created() {
    const route = this.$route;
    if (route.name === "EditSingleBlog") {
      await this.getSinglePost(this.$route.params.slug);
      this.html = this.singlePost.text;

      this.selectedUser = this.singlePost.userId;
      this.newBlogPost.userId = this.singlePost.userId._id;

      this.newBlogPost.title = this.singlePost.title;
      this.newBlogPost.text = this.singlePost.text;
      this.editor.setContent(this.singlePost.text);
      this.newBlogPost.tags = this.singlePost.tags;
      this.newBlogPost.photo = this.singlePost.photo;
      this.newBlogPost.blogCategoryId = this.singlePost.blogCategoryId.map(
        x => x._id
      );
      // this.newBlogPost.userId = this.singlePost.userId;
    }
    await this.getBlogCategories();
  },
  methods: {
    addCommand(data) {
      if (data.command !== null) {
        data.command(data.data);
      }
    },
    showVideoModal(command) {
      console.log(this.$refs.videoModal.showModal);
      this.$refs.videoModal.showModal(command);
    },
    showImagePrompt(command) {
      const src = prompt("Görsel linki");
      if (src !== null) {
        command({ src });
      }
    },
    getId(url) {
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
      const match = url.match(regExp);

      return match && match[2].length === 11 ? match[2] : null;
    },
    ...mapActions([
      "createBlogPost",
      "getBlogCategories",
      "suggestUsers",
      "getSinglePost",
      "updateBlogPost",
      "getUser"
    ]),
    async create() {
      this.newBlogPost.text = this.html;
      await this.createBlogPost(this.newBlogPost);
      this.loading = false;
      router.push(`/ytornavida/post/${this.createdPost.slug}`);
    },
    async update() {
      this.newBlogPost.text = this.html;
      await this.updateBlogPost({
        postId: this.singlePost._id,
        data: this.newBlogPost
      });
      this.loading = false;
      router.push(`/ytornavida/post/${this.singlePost.slug}`);
    },
    selectUser(_id) {
      this.newBlogPost.userId = _id;
      this.selectedUser = this.suggestedUsers.filter(x => x._id === _id)[0];
    },
    changeUser() {
      this.selectedUser = null;
      this.newBlogPost.userId = null;
    },
    showLinkMenu(attrs) {
      this.linkUrl = attrs.href;
      this.linkMenuIsActive = true;
      this.$nextTick(() => {
        this.$refs.linkInput.focus();
      });
    },
    hideLinkMenu() {
      this.linkUrl = null;
      this.linkMenuIsActive = false;
    },
    setLinkUrl(command, url) {
      command({ href: url });
      this.hideLinkMenu();
    }
  },
  watch: {
    async author() {
      if (!this.awaitingSearch) {
        setTimeout(async () => {
          await this.suggestUsers(this.author);
          this.awaitingSearch = false;
        }, 1000); // 1 sec delay
      }
      this.awaitingSearch = true;
    },
    html(val) {
      this.newBlogPost.text = val;
    }
  }
};
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;0,800;1,300;1,400;1,600;1,700;1,800&display=swap");

.ck p {
  margin-bottom: 0 !important;
}
.user-search ul {
  padding: 0;
  margin: 0;
  list-style: none;
}
.user-search ul li {
  display: flex;
  align-items: center;
  margin-bottom: 4px;
  padding: 4px;
  cursor: pointer;
  border-radius: 4px;
}
.user-search ul li:hover {
  background: #eee;
}
.user-search ul li p {
  margin: 0;
  padding: 0;
}
.user-search ul li img {
  margin-right: 8px;
  border-radius: 50%;
}
.user-search ul li span {
  margin-left: 4px;
  font-size: 12px;
}
.selected-user {
  display: flex;
  align-items: center;
  margin-bottom: 4px;
  padding: 4px;
  cursor: pointer;
  border-radius: 4px;
}
.selected-user:hover {
  background: #eee;
}
.selected-user p {
  margin: 0;
  padding: 0;
}
.selected-user img {
  margin-right: 8px;
  border-radius: 50%;
}
.selected-user span {
  margin-left: 4px;
  font-size: 12px;
}
.editor {
  position: relative;
  max-width: 30rem;
  margin: 0 auto 5rem auto;
}
.editor__content {
  overflow-wrap: break-word;
  word-wrap: break-word;
  word-break: break-word;
  border: 1px solid rgb(211, 211, 211);
  padding: 16px;
  padding-left: 24px;
  font-size: 22px;
}
.editor__content * {
  caret-color: currentColor;
}
.editor__content pre {
  padding: 0.7rem 1rem;
  border-radius: 5px;
  background: #000;
  color: #fff;
  font-size: 0.8rem;
  overflow-x: auto;
  line-height: 1.2em;
}
.editor__content pre code {
  display: block;
}
.editor__content p {
  margin-bottom: 4px;
}
.editor__content a {
  color: rgb(0, 0, 224) !important;
}
.editor__content p code {
  padding: 0.2rem 0.4rem;
  border-radius: 5px;
  font-size: 0.8rem;
  font-weight: bold;
  background: rgba(0, 0, 0, 0.1);
  color: rgba(0, 0, 0, 0.8);
}
.editor__content ul,
.editor__content ol {
  padding-left: 1rem;
}
.editor__content li > p,
.editor__content li > ol,
.editor__content li > ul {
  margin: 0;
}
.editor__content a {
  color: inherit;
}
.editor__content blockquote {
  border-left: 3px solid rgba(0, 0, 0, 0.1);
  color: rgba(0, 0, 0, 0.8);
  padding-left: 0.8rem;
  font-style: italic;
}
.editor__content blockquote p {
  margin: 0;
}
.editor__content img {
  max-width: 100%;
  border-radius: 3px;
}
.editor__content table {
  border-collapse: collapse;
  table-layout: fixed;
  width: 100%;
  margin: 0;
  overflow: hidden;
}
.editor__content table td,
.editor__content table th {
  min-width: 1em;
  border: 2px solid #ddd;
  padding: 3px 5px;
  vertical-align: top;
  box-sizing: border-box;
  position: relative;
}
.editor__content table td > *,
.editor__content table th > * {
  margin-bottom: 0;
}
.editor__content table th {
  font-weight: bold;
  text-align: left;
}
.editor__content table .selectedCell:after {
  z-index: 2;
  position: absolute;
  content: "";
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(200, 200, 255, 0.4);
  pointer-events: none;
}
.editor__content table .column-resize-handle {
  position: absolute;
  right: -2px;
  top: 0;
  bottom: 0;
  width: 4px;
  z-index: 20;
  background-color: #adf;
  pointer-events: none;
}
.editor__content .tableWrapper {
  margin: 1em 0;
  overflow-x: auto;
}
.editor__content .resize-cursor {
  cursor: ew-resize;
  cursor: col-resize;
}
.editor__content strong {
  font-weight: 700;
}
*:focus {
  outline: none;
}
.menubar {
  margin-bottom: 1rem;
  transition: visibility 0.2s 0.4s, opacity 0.2s 0.4s;
}
.menubar.is-hidden {
  visibility: hidden;
  opacity: 0;
}
.menubar.is-focused {
  visibility: visible;
  opacity: 1;
  transition: visibility 0.2s, opacity 0.2s;
}
.menubar__button {
  font-weight: bold;
  display: inline-flex;
  background: white;
  border: 0;
  /* color: #fff; */
  padding: 0.2rem 0.5rem;
  margin-right: 0.2rem;
  border-radius: 3px;
  cursor: pointer;
}
.menubar__button:hover {
  background: rgba(255, 255, 255, 0.05) !important;
}
.menubar__button.is-active {
  background: rgba(255, 255, 255, 0.1) !important;
}
pre code * {
  font-family: Consolas !important;
}
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
.menububble {
  position: absolute;
  display: flex;
  z-index: 20;
  background: #000;
  border-radius: 5px;
  padding: 0.3rem;
  margin-bottom: 0.5rem;
  transform: translateX(-50%);
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.2s, visibility 0.2s;
}
.menububble.is-active {
  opacity: 1;
  visibility: visible;
}
.menububble__button {
  display: inline-flex;
  background: transparent;
  border: 0;
  color: #fff;
  padding: 0.2rem 0.5rem;
  margin-right: 0.2rem;
  border-radius: 3px;
  cursor: pointer;
}
.menububble__button:last-child {
  margin-right: 0;
}
.menububble__button:hover {
  background-color: rgba(255, 255, 255, 0.1);
}
.menububble__button.is-active {
  background-color: rgba(255, 255, 255, 0.2);
}
.menububble__form {
  display: flex;
  align-items: center;
}
.menububble__input {
  font: inherit;
  border: none;
  background: transparent;
  color: #fff;
}
</style>
