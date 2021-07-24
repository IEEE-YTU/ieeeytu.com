import Vue from "vue";
import Vuex from "vuex";
import API from "../axios";
import router from "../router/index";
import VueJwtDecode from "vue-jwt-decode";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    blogPosts: null,
    singlePost: null,
    createdPost: null,
    mostViewedBlogPosts: null,
    blogCategories: null,
    createdCategory: null,
    allPostCount: 0,
    category: null,
    categoryPosts: null,
    allCategoryPostsCount: 0,
    suggestedUsers: null,
    searchPosts: null
  },
  getters: {
    token() {
      const token = Vue.ls.get("token");
      return token;
    },
    isAuth(_, getters) {
      return !!getters.token;
    },
    role(_, getters) {
      if (getters.token) return VueJwtDecode.decode(getters.token).role;
    },
    user() {
      const user = Vue.ls.get("user");
      return user ? user.user : {};
    },
    userId(_, getters) {
      if (getters.token) return VueJwtDecode.decode(getters.token).userId;
    }
  },
  mutations: {
    SET_BLOG_POSTS(state, blogPosts) {
      state.blogPosts = blogPosts;
    },
    SET_SINGLE_POST(state, singlePost) {
      state.singlePost = singlePost;
      state.singlePost.liked = singlePost.likedBy.includes(this.getters.userId);
      state.singlePost.likeCount = singlePost.likedBy.length;
    },
    SET_CREATED_POST(state, createdPost) {
      state.createdPost = createdPost;
    },
    ADD_COMMENT_TO_SINGLE_POST(state, addedComment) {
      if (addedComment.parentId) {
        state.singlePost.blogComments = state.singlePost.blogComments.map(x => {
          if (x._id === addedComment.parentId)
            if (Object.keys(x).includes("children"))
              x.children.push(addedComment);
            else x.children = [addedComment];
          return x;
        });
      } else state.singlePost.blogComments.push(addedComment);
    },
    IND_SINGLE_POST(state, inc) {
      state.singlePost.viewCount += inc;
    },
    SET_MOST_VIEWED_BLOG_POSTS(state, posts) {
      state.mostViewedBlogPosts = posts;
    },
    SET_BLOG_CATEGORIES(state, categories) {
      state.blogCategories = categories;
    },
    SET_CREATED_CATEGORY(state, newCategory) {
      state.createdCategory = newCategory;
    },
    SET_ALL_BLOG_COUNT(state, count) {
      state.allPostCount = count;
    },
    SET_CATEGORY(state, category) {
      state.category = category;
    },
    SET_CATEGORY_BLOG_POSTS(state, posts) {
      state.categoryPosts = posts;
    },
    SET_ALL_CATEGORY_BLOG_COUNT(state, count) {
      state.allCategoryPostsCount = count;
    },
    SET_SUGGESTED_USERS(state, users) {
      state.suggestedUsers = users;
    },
    SET_SEARCH_POSTS(state, posts) {
      state.searchPosts = posts;
    },
    LIKE_POST(state, postId) {
      if (state.singlePost._id === postId) {
        state.singlePost = {
          ...state.singlePost,
          liked: true,
          likeCount: state.singlePost.likeCount + 1
        };
      }
      if (state.blogPosts)
        state.blogPosts.forEach((element, index) => {
          if (element._id === postId) {
            state.blogPosts[index].likeCount++;
            state.blogPosts[index].liked = true;
          }
        });
      if (state.searchPosts)
        state.searchPosts.forEach((element, index) => {
          if (element._id == postId) {
            state.searchPosts[index].likeCount++;
            state.searchPosts[index].liked = true;
          }
        });
      if (state.categoryPosts)
        state.categoryPosts.forEach((element, index) => {
          if (element._id === postId) {
            state.categoryPosts[index].likeCount++;
            state.categoryPosts[index].liked = true;
          }
        });
    },
    UNLIKE_POST(state, postId) {
      if (state.singlePost._id == postId) {
        state.singlePost = {
          ...state.singlePost,
          liked: false,
          likeCount: state.singlePost.likeCount - 1
        };
      }
      if (state.blogPosts)
        state.blogPosts.forEach((element, index) => {
          if (element._id === postId) {
            state.blogPosts[index].likeCount--;
            state.blogPosts[index].liked = false;
          }
        });
      if (state.searchPosts)
        state.searchPosts.forEach((element, index) => {
          if (element._id === postId) {
            state.searchPosts[index].likeCount--;
            state.searchPosts[index].liked = false;
          }
        });
      if (state.categoryPosts)
        state.categoryPosts.forEach((element, index) => {
          if (element._id === postId) {
            state.categoryPosts[index].likeCount--;
            state.categoryPosts[index].liked = false;
          }
        });
    }
  },
  actions: {
    async getMe() {
      try {
        const res = await API.get("/v1/users/me");
        Vue.ls.set("user", { user: res.data.user }, 60 * 60 * 600000);
        Vue.ls.set("token", res.data.token, 60 * 60 * 600000);
        return res.data;
      } catch (error) {
        return Promise.reject(error.response);
      }
    },
    async signIn({ dispatch }, payload) {
      try {
        const response = await API.post("/v1/auth/login", payload);

        Vue.ls.set("token", response.data.token, 60 * 60 * 600000);
        Vue.ls.set("userId", response.data.userId, 60 * 60 * 600000);
        Vue.ls.set("committeeId", response.data.committeeId, 60 * 60 * 600000);

        const res = await dispatch("getMe");
        Vue.ls.set("user", res, 60 * 60 * 600000);
        router.go("/ytornavida");
      } catch (error) {
        return Promise.reject(error.response);
      }
    },
    async getBlogPost({ commit }, payload) {
      try {
        const res = await API.get(
          "/v1/blog-post?size=" + payload.size + "&page=" + payload.page
        );

        commit("SET_BLOG_POSTS", res.data.blogPosts);
        commit("SET_ALL_BLOG_COUNT", res.data.count);
      } catch (error) {
        return Promise.reject(error.response);
      }
    },
    async getMostViewedBlogPosts({ commit }) {
      try {
        const res = await API.get("/v1/blog-post/most-viewed");

        commit("SET_MOST_VIEWED_BLOG_POSTS", res.data.mostViewedBlogPosts);
      } catch (error) {
        return Promise.reject(error.response);
      }
    },
    async getSinglePost({ commit }, slug) {
      try {
        const res = await API.get(`/v1/blog-post/${slug}`);
        commit("SET_SINGLE_POST", res.data.blogPost);
      } catch (error) {
        return Promise.reject(error.response);
      }
    },
    async createBlogPost({ commit }, payload) {
      try {
        const res = await API.post("/v1/blog-post/", { ...payload });
        commit("SET_CREATED_POST", res.data.post);
      } catch (error) {
        return Promise.reject(error.response);
      }
    },
    async updateBlogPost(_, payload) {
      try {
        await API.put("/v1/blog-post/" + payload.postId, {
          ...payload.data
        });
        // commit("SET_CREATED_POST", res.data.post);
      } catch (error) {
        return Promise.reject(error.response);
      }
    },
    async updateCategory(_, payload) {
      try {
        await API.put("/v1/blog-category/" + payload._id, {
          blogCategory: { ...payload }
        });
      } catch (error) {
        return Promise.reject(error.response);
      }
    },
    async sendBlogComment({ commit }, payload) {
      try {
        const res = await API.post("/v1/blog-comment/", { ...payload });
        commit("ADD_COMMENT_TO_SINGLE_POST", res.data.blogComment);
      } catch (error) {
        return Promise.reject(error.response);
      }
    },
    async viewBog({ commit, state }) {
      try {
        await API.post(`/v1/blog-post/${state.singlePost._id}/view`);
        commit("IND_SINGLE_POST", 1);
      } catch (error) {
        return Promise.reject(error.response);
      }
    },
    async getBlogCategories({ commit }) {
      try {
        const res = await API.get("/v1/blog-category/");
        commit("SET_BLOG_CATEGORIES", res.data.blogCategories);
      } catch (error) {
        return Promise.reject(error.response);
      }
    },

    async createCategory({ commit }, payload) {
      try {
        const res = await API.post("/v1/blog-category/", { ...payload });
        commit("SET_CREATED_CATEGORY", res.data.blogCategory);
      } catch (error) {
        return Promise.reject(error.response);
      }
    },
    async getBlogPostsByCategory({ commit }, payload) {
      try {
        const res = await API.get(
          "/v1/blog-post?blogCategoryId=" +
            payload.blogCategoryId +
            "&size=" +
            payload.size +
            "&page=" +
            payload.page
        );

        commit("SET_CATEGORY_BLOG_POSTS", res.data.blogPosts);
      } catch (error) {
        return Promise.reject(error.response);
      }
    },
    async getCategory({ commit }, slug) {
      try {
        const res = await API.get("/v1/blog-category/" + slug);
        commit("SET_CATEGORY", res.data.blogCategory);
        commit("SET_ALL_CATEGORY_BLOG_COUNT", res.data.count);
      } catch (error) {
        return Promise.reject(error.response);
      }
    },
    async suggestUsers({ commit }, q) {
      try {
        const res = await API.get(`/v1/users/search/name/?q=${q}&limit=20`);
        commit("SET_SUGGESTED_USERS", res.data.users);
      } catch (error) {
        return Promise.reject(error.response);
      }
    },
    async searchBlog({ commit }, q) {
      try {
        const res = await API.get(`/v1/blog-post/search?q=${q}`);
        commit("SET_SEARCH_POSTS", res.data.posts);
      } catch (error) {
        return Promise.reject(error.response);
      }
    },
    async likePost({ commit }, postId) {
      try {
        await API.put(`/v1/blog-post/${postId}/like/`);
        commit("LIKE_POST", postId);
      } catch (error) {
        return Promise.reject(error.response);
      }
    },
    async unlikePost({ commit }, postId) {
      try {
        await API.put(`/v1/blog-post/${postId}/unlike/`);
        commit("UNLIKE_POST", postId);
      } catch (error) {
        return Promise.reject(error.response);
      }
    },
    async deletePost(_, postId) {
      try {
        await API.delete(`/v1/blog-post/${postId}/`);
      } catch (error) {
        return Promise.reject(error.response);
      }
    }
  },
  modules: {}
});
