<template>
  <div>
    <div
      class="site-blocks-cover "
      style=" height:64px !important;min-height:0;background:#ddd"
      data-aos="fade"
      id="home-section"
    >
      <div class="container h-100" style="min-height:0 !important">
        <div
          class="row align-items-center justify-content-center h-100"
          style="min-height:0 !important"
        >
          <div
            class="col-md-10 mt-lg-5 text-center "
            style="height:0 !important"
          >
            <div class="single-text owl-carousel">
              <div class="">
                <h1 class="text-uppercase" data-aos="fade-up">
                  <!-- Ekimibizle Tanışın -->
                </h1>
                <p class="mb-5 desc" data-aos="fade-up" data-aos-delay="100">
                  <!-- Dünyanın En İyi Ekibi -->
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <section class="site-section" id="about-section">
      <div class="container">
        <div class="row">
          <div
            v-if="committee.image"
            class="col-lg-5 mb-5"
            data-aos="fade-up"
            data-aos-delay=""
          >
            <figure class="circle-bg">
              <img
                :src="committee.image"
                alt="Free Website Template by Free-Template.co"
                class="img-fluid"
              />
            </figure>
          </div>
          <div
            class="ml-auto"
            :class="{
              'col-lg-7': committee.image,
              'col-lg-12': !committee.image
            }"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <div class="row">
              <div class="col-12 mb-4" data-aos="fade-up" data-aos-delay="">
                <div class="unit-4 d-flex">
                  <div>
                    <h3>{{ committee.name }}</h3>
                    <p
                      v-html="
                        language === 'tr'
                          ? committee.description
                          : committee.description_en
                      "
                    ></p>
                    <p class="mb-0" v-if="committee.socialLink">
                      <a :href="committee.socialLink" target="_blank">{{
                        variables.browser_events[language]
                      }}</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row justify-content-end">
            <div class="col-md-7 ml-3 col-lg-7 col-sm-12 col-xs-12 col-xxs-12">
              <div class="row justify-content-end">
                <div
                  class="col-6 mb-4"
                  data-aos="fade-up"
                  data-aos-delay=""
                  v-for="(member, index) in teamMembers"
                  :key="index"
                >
                  <team-member :member="member" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import committees from "../assets/committees.json";
import team from "../assets/team.json";
import variables from "../assets/variables.json";
import TeamMember from "../components/TeamMember";

export default {
  components: { TeamMember },
  data() {
    return {
      committees,
      team,
      variables,
      slug: null
    };
  },
  computed: {
    committee() {
      return this.committees.filter(x => x.slug === this.slug)[0];
    },
    teamMembers() {
      return this.team.ik.filter(x => this.committee.team.includes(x.id));
    },
    language() {
      return this.$ls.get("language");
    }
  },
  created() {
    this.slug = this.$route.params.slug;
  }
};
</script>
