<template>
  <div class="container">
    <h1>Yeni Kategori</h1>

    <b-form-group label="İsim">
      <b-input v-model="newBlogCategory.name" size="lg"></b-input>
    </b-form-group>
    <b-form-group label="Açıklama">
      <b-textarea v-model="newBlogCategory.description"></b-textarea>
    </b-form-group>
    <b-form-group label="Görsel linki">
      <b-input v-model="newBlogCategory.photo" size="lg"></b-input>
    </b-form-group>
    <b-form-group label="Kategori Rengi">
      <input v-model="newBlogCategory.color" type="color" />
    </b-form-group>
    <b-form-group>
      <b-button
        v-if="$route.name === 'AddCategory'"
        @click="createBlogCategory"
        variant="success"
        :disabled="loading"
      >
        <b-spinner small v-if="loading"></b-spinner>
        <span>Ekle</span>
      </b-button>
      <b-button
        v-else-if="$route.name === 'EditCategory'"
        @click="updateBlogCategory"
        variant="success"
        :disabled="loading"
      >
        <b-spinner small v-if="loading"></b-spinner>
        <span>Güncelle</span>
      </b-button>
    </b-form-group>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import router from "../router";
export default {
  data() {
    return {
      newBlogCategory: {
        name: null,
        description: null,
        color: null,
        photo: null
      },
      loading: false
    };
  },
  computed: {
    ...mapState(["category"])
  },
  async created() {
    await this.getCategory(this.$route.params.slug);
    this.newBlogCategory = { ...this.category };
  },
  methods: {
    ...mapActions(["createCategory", "getCategory", "updateCategory"]),
    async createBlogCategory() {
      this.loading = true;
      await this.createCategory(this.newBlogCategory);
      this.loading = false;
    },
    async updateBlogCategory() {
      this.loading = true;
      await this.updateCategory(this.newBlogCategory);
      this.loading = false;
      router.push("/ytornavida/kategoriler");
    }
  }
};
</script>
<style>
.ck p {
  margin-bottom: 0 !important;
}
</style>
