<template>
  <div class="team-member">
    <figure>
      <ul class="social">
        <li v-if="member.email" v-b-tooltip.hover :title="member.email">
          <a :href="'mailto:' + member.email"
            ><span class="icon-mail_outline" target="_blank"></span
          ></a>
        </li>
        <li v-if="member.facebook">
          <a href="#"><span class="icon-facebook" target="_blank"></span></a>
        </li>
        <li v-if="member.twitter">
          <a :href="'https://www.twitter.com/' + member.twitter"
            ><span class="icon-twitter" target="_blank"></span
          ></a>
        </li>
        <li v-if="member.linkedin">
          <a :href="'https://www.linkedin.com/in/' + member.linkedin"
            ><span class="icon-linkedin" target="_blank"></span
          ></a>
        </li>
        <li v-if="member.instagram">
          <a
            :href="'https://www.instagram.com/' + member.instagram"
            target="_blank"
            ><span class="icon-instagram"></span
          ></a>
        </li>
        <li v-if="member.social">
          <a
            style="font-family:Nunito;font-weight:700"
            target="_blank"
            :href="'https://social.ieeeytu.com/profile/' + member.social"
            >S</a
          >
        </li>
      </ul>
      <img
        style="height:280px;width:100% !important;object-fit:cover"
        :src="require('@/assets/teamphotos/' + member.image)"
        alt="Image"
        class="img-fluid"
      />
    </figure>
    <div class="p-3">
      <h3>{{ member.fullName }}</h3>
      <span class="position">{{
        lang === "tr" ? member.title : member.title_en
      }}</span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    member: { type: Object, default: null }
  },
  computed: {
    lang() {
      return this.$ls.get("language");
    }
  }
};
</script>
