<template>
  <b-avatar :src="src" :size="size + 'px'" class=" blog-avatar"> </b-avatar>
</template>
<script>
export default {
  props: {
    src: String,
    size: Number
  }
};
</script>
<style>
.blog-avatar img {
  width: 100% !important;
  height: 100% !important;
  margin: 0 !important;
  object-fit: cover;
}
.b-avatar-img {
  margin: 0 !important;
}
</style>
