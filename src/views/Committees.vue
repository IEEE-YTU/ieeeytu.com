<template>
  <div>
    <div
      class="site-blocks-cover overlay"
      style="background-image: url(https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&ixid=eyJhcHBfaWQiOjEyMDd9&ixlib=rb-1.2.1&q=80&w=1950); height:50vh !important;min-height:0"
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
                  <!-- {{ variables.our_committees[language] }} -->
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
    <section
      class="site-section bg-light"
      id="contact-section"
      data-aos="fade"
      style="padding-bottom:0"
    >
      <div class="container pb-5">
        <h4>{{ variables.our_committees[language] }}</h4>
        <a
          :href="'/komite/' + committee.slug"
          v-for="(committee, index) in committees"
          :key="index"
        >
          <div class="committee-card">
            <img
              v-if="committee.logo"
              :src="require('@/assets/logolar/' + committee.logo)"
              alt=""
            />
            <div v-else style="width:50px;"></div>
            <h1>
              {{ language === "tr" ? committee.name : committee.name_en }}
            </h1>
            <!-- <div class="unit-4">
              <center>
                <div class="unit-4-icon">
                  <img
                    :src="require('@/assets/logolar/' + committee.logo)"
                    alt="Free Website Template by Free-Template.co"
                    class="img-fluid w-25 mb-4 rounded-circle"
                  />
                </div>
                <div>
                  <h3 style="color:#4f4f4f !important">
                    {{ language === 'tr' ? committee.name : committee.name_en }}
                  </h3>
                </div>
              </center>
            </div> -->
          </div>
        </a>
      </div>
    </section>
  </div>
</template>

<script>
import variables from "../assets/variables.json";
import committees from "../assets/committees.json";

export default {
  data() {
    return {
      variables,
      committees
    };
  },
  computed: {
    language() {
      return this.$ls.get("language");
    }
  }
};
</script>

<style>
.committee-card {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  border: 1px solid rgb(214, 214, 214);
  padding: 8px;
  border-radius: 8px;
  transition: 200ms;
  background: rgb(241, 241, 241);
  min-height: 70px;
}
.committee-card:hover {
  background: #fff;
}
.committee-card img {
  border-radius: 123123px;
  width: 50px;
  border: 1px solid #ccc;
}
.committee-card h1 {
  color: #666;
  font-size: 18px;
  margin-left: 12px;
}
</style>
