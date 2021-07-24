<template>
  <div>
    <div
      class="site-blocks-cover overlay"
      style="background-image: url(https://images.pexels.com/photos/207896/pexels-photo-207896.jpeg); height:60vh !important;min-height:0"
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
                  {{ variables.meet_team[language] }}
                </h1>
                <p class="mb-5 desc" data-aos="fade-up" data-aos-delay="100">
                  {{ variables.best[language] }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <section class="site-section border-bottom" id="team-section">
      <div class="container">
        <div class="row mb-5 justify-content-center">
          <div class="col-md-8 text-center">
            <h4
              style="font-size:1.4rem"
              class="section-title mb-3"
              data-aos="fade-up"
              data-aos-delay=""
            >
              {{ variables.directors[language] }}
            </h4>
          </div>
        </div>

        <div class="row justify-content-center">
          <div
            class="col-md-3 col-lg-3 mb-4"
            data-aos="fade-up"
            data-aos-delay=""
          >
            <team-member :member="team.yk[0]" />
          </div>
        </div>

        <div class="row justify-content-center">
          <div
            v-for="(member, index) in team.yk.filter((x, i) => i !== 0)"
            :key="index"
            class="col-md-3 col-lg-3 mb-4"
            data-aos="fade-up"
            data-aos-delay=""
          >
            <team-member :member="member" />
          </div>
        </div>
        <hr />
        <div class="row mb-5 justify-content-center">
          <div class="col-md-8 text-center">
            <h4
              style="font-size:1.4rem"
              class="section-title mb-3"
              data-aos="fade-up"
              data-aos-delay=""
            >
              {{ variables.administrative[language] }}
            </h4>
          </div>
        </div>
        <div class="row">
          <div
            v-for="(member, index) in team.ik"
            :key="index"
            class="col-md-3 col-lg-3 mb-4"
            data-aos="fade-up"
            data-aos-delay=""
          >
            <team-member :member="member" />
          </div>
        </div>
        <hr />
        <div class="row mb-5 justify-content-center ">
          <div class="col-md-8 text-center">
            <h4
              style="font-size:1.4rem"
              class="section-title mb-3"
              data-aos="fade-up"
              data-aos-delay=""
            >
              {{ variables.supervisory[language] }}
            </h4>
          </div>
        </div>
        <div class="row justify-content-center">
          <div
            class="col-md-3 col-lg-3 mb-4"
            data-aos="fade-up"
            data-aos-delay=""
          >
            <team-member :member="team.dk[0]" />
          </div>
        </div>
        <div class="row justify-content-center ">
          <div
            v-for="(member, index) in team.dk.filter((x, i) => i !== 0)"
            :key="index"
            class="col-md-3 col-lg-3 mb-4"
            data-aos="fade-up"
            data-aos-delay=""
          >
            <team-member :member="member" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import team from "../assets/team.json";
import TeamMember from "../components/TeamMember";
import variables from "../assets/variables.json";
export default {
  components: { TeamMember },
  data() {
    return {
      team,
      variables
    };
  },
  computed: {
    language() {
      return this.$ls.get("language");
    }
  }
};
</script>
