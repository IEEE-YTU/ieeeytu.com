<template>
  <component :is="layout">
    <!-- <default-layout /> -->
  </component>
</template>

<script>
import committees from "./assets/committees.json";
import variables from "./assets/variables.json";

export default {
  data() {
    return {
      committees,
      variables
    };
  },

  created() {
    if (
      !this.$ls.get("language") ||
      !["tr", "en"].includes(this.$ls.get("language"))
    ) {
      this.$ls.set("language", "tr");
    }
  },
  methods: {
    changeLanguage() {
      if (this.$ls.get("language") === "tr") {
        this.$ls.set("language", "en");
      } else if (this.$ls.get("language") === "en") {
        this.$ls.set("language", "tr");
      }
      window.location.reload(true);
    }
  },
  computed: {
    layout() {
      return [
        "Blog",
        "SingleBlog",
        "NewBlogPost",
        "Categories",
        "AddCategory",
        "Category",
        "BlogLogin",
        "Search",
        "EditSingleBlog",
        "EditCategory"
      ].includes(this.$route.name)
        ? "blog-layout"
        : "default-layout";
    },
    language() {
      return this.$ls.get("language");
    }
  }
};
</script>
<style>
.ieee-topbar::-webkit-scrollbar {
  display: none;
}
/* Hide scrollbar for IE, Edge and Firefox */
.ieee-topbar {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
.ieee-topbar {
  overflow: scroll;
  background: black;
  text-align: center;
  padding: 6px;
}
.ieee-topbar div a {
  cursor: pointer;
  color: white;
  margin-right: 40px;
  font-size: 14px;
}
</style>
