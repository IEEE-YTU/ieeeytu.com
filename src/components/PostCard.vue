<template>
  <div
    @click="goPost"
    :style="setBackground(post.photo)"
    :class="['post-card', ...className]"
  >
    <div>
      <span
        class="tag"
        :style="{ borderColor: cat.color, backgroundColor: cat.color + '66' }"
        v-for="(cat, index) in post.blogCategoryId"
        :key="index"
      >
        {{ cat.name }}
      </span>
      <h1>
        {{ post.title }}
      </h1>
      <span>
        {{ $dateConverter(post.date, false) }}
      </span>
    </div>
  </div>
</template>
<script>
export default {
  props: ["post", "className"],
  methods: {
    setBackground(url) {
      return {
        backgroundImage: `linear-gradient(transparent, rgb(0,0,0,.7) ,rgb(0,0,0,.7)), url(${url}) `
      };
    },
    goPost() {
      this.$router.push("/ytornavida/post/" + this.post.slug);
    }
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Poppins:100,100italic,200,200italic,300,300italic,regular,italic,500,500italic,600,600italic,700,700italic,800,800italic,900,900italic");
.post-card {
  background-position: center center;
  background-size: cover;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 6px 26px 20px;
  justify-content: center;
  cursor: pointer;
  align-items: flex-start;
  transition: 200ms;
}

@media only screen and (max-width: 600px) {
  .post-card h1,
  .post-card span {
    font-size: 14px !important;
  }
}
.post-card > div > span {
  color: rgba(255, 255, 255, 0.845);
}
.post-card > div {
  transition: 200ms;
  opacity: 0;
}
.post-card:hover div {
  opacity: 0.85;
}

.post-card h1 {
  color: rgba(255, 255, 255, 0.896);
  margin: 0;
  padding: 0;
  font-size: 24px;
  transition: 200ms;
  font-weight: 700;
}
.post-card span {
  transition: 200ms;
}
.tag {
  background: rgb(216, 151, 76, 0.12);
  border: 1px solid rgb(216, 151, 76);
  font-family: Poppins;

  padding: 2px 6px;
  margin: 0 2px;
  font-weight: 500;
  text-transform: uppercase;
}
</style>
