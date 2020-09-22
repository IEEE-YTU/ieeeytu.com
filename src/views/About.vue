<template>
  <div>
    <div
      class="site-blocks-cover "
      style="
      height:64px !important;min-height:0 ; background:#ddd"
      data-aos="fade"
      id="home-section"
    ></div>
    <div class="site-section" style="padding-bottom:0 !important" id="next">
      <div class="container">
        <div class="row">
          <div class="col-lg-5 mb-5" data-aos="fade-up" data-aos-delay="">
            <figure class="circle-bg">
              <img
                :src="require('@/assets/misyon-vizyon-logo.png')"
                alt="Free Website Template by Free-Template.co"
                class="img-fluid"
              />
            </figure>
          </div>
          <div class="col-lg-7 ml-auto" data-aos="fade-up" data-aos-delay="100">
            <div class="mb-4">
              <h3 class="h3 mb-4 text-black">
                {{ variables.our_vision[language] }}
              </h3>
              <p>
                {{ variables.vision_title[language] }}
              </p>
            </div>

            <div class="mb-4">
              <ul class="list-unstyled ul-check success">
                <li>
                  {{ variables.vision1[language] }}
                </li>
                <li>{{ variables.vision2[language] }}</li>
                <li>{{ variables.vision3[language] }}</li>
                <li>{{ variables.vision4[language] }}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="site-section" style="padding-top:100px" id="next">
      <div class="container">
        <div class="row">
          <div class="col-lg-7 ml-auto" data-aos="fade-up" data-aos-delay="100">
            <div class="mb-4">
              <h3 class="h3 mb-4 text-black">
                {{ variables.our_mission[language] }}
              </h3>
              <p>{{ variables.mission_title[language] }}</p>
              <p>{{ variables.mission1[language] }}</p>
            </div>
          </div>
          <div class="col-lg-5 mb-5" data-aos="fade-up" data-aos-delay="">
            <figure class="circle-bg">
              <img
                :src="require('@/assets/misyon-vizyon.jpeg')"
                alt="Free Website Template by Free-Template.co"
                class="img-fluid"
              />
            </figure>
          </div>
        </div>
        <div class="row">
          <div class="col" data-aos="fade-up" data-aos-delay="100">
            <p>{{ variables.mission2[language] }}</p>
            <p>{{ variables.mission3[language] }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import variables from "../assets/variables.json";

export default {
  data() {
    return {
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
