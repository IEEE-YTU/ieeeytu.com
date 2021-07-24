<template>
  <div>
    <div
      class="site-blocks-cover overlay"
      style="background-image: url(https://i.hizliresim.com/cdxcro.jpeg)"
      data-aos="fade"
      id="home-section"
    >
      <div class="container">
        <div class="row align-items-center justify-content-center">
          <div class="col-md-10 mt-lg-5 text-center">
            <div class="single-text owl-carousel">
              <div class="slide">
                <h1 class="text-uppercase" data-aos="fade-up">
                  20. YIL ÖZEL ONLINE FOTOĞRAF SERGİSİ
                </h1>
                <p class="mb-5 desc" data-aos="fade-up" data-aos-delay="100">
                  Dünden bugüne IEEE YTÜ !
                </p>
                <div data-aos="fade-up" data-aos-delay="100">
                  <a href="/galeri" class="btn btn-primary mr-2 mb-2">
                    {{ variables.gogallery[language] }}
                  </a>
                </div>
              </div>
              <div class="slide">
                <h1 class="text-uppercase" data-aos="fade-up">
                  YILDIZ TORNAVİDA AÇILDI 🥳
                </h1>
                <p class="mb-5 desc" data-aos="fade-up" data-aos-delay="100">
                  Sen de Yıldız Tornavida'yı keşfet!
                </p>
                <div data-aos="fade-up" data-aos-delay="100">
                  <a href="/ytornavida" class="btn btn-primary mr-2 mb-2">
                    {{ variables.explore[language] }}
                  </a>
                </div>
              </div>
              <div class="slide">
                <h1 class="text-uppercase" data-aos="fade-up">IEEE YTU</h1>
                <p class="mb-5 desc" data-aos="fade-up" data-aos-delay="100">
                  {{ variables.slogan[language] }}
                </p>
                <div data-aos="fade-up" data-aos-delay="100">
                  <a href="#about-section" class="btn btn-primary mr-2 mb-2">{{
                    variables.explore[language]
                  }}</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <a href="#about-section" class="mouse smoothscroll">
        <span class="mouse-icon">
          <span class="mouse-wheel"></span>
        </span>
      </a>
    </div>
    <div class="site-section cta-big-image" id="about-section">
      <div class="container">
        <div class="row mb-5 justify-content-center">
          <div class="col-md-8 text-center">
            <h2 class="section-title mb-3" data-aos="fade-up" data-aos-delay="">
              {{ variables.about[language] }}
            </h2>
          </div>
        </div>
        <div class="row">
          <div class="col ml-auto" data-aos="fade-up" data-aos-delay="100">
            <h3 class="text-black mb-4" style="text-align: center">
              {{ variables.slogan[language] }}
            </h3>

            <p class="lead" data-aos="fade-up" data-aos-delay="100">
              {{ variables.mainpage1[language] }}
            </p>
            <p class="lead" data-aos="fade-up" data-aos-delay="100">
              {{ variables.mainpage2[language] }}
            </p>
            <p class="lead" data-aos="fade-up" data-aos-delay="100">
              {{ variables.mainpage3[language] }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <section class="site-section">
      <div class="container">
        <div class="row mb-5 justify-content-center">
          <div class="col-md-7 text-center">
            <h2 class="section-title mb-3" data-aos="fade-up" data-aos-delay="">
              {{ variables.events[language] }}
            </h2>
          </div>
        </div>

        <div class="row align-items-lg-center">
          <div class="col-lg-6 mb-5" data-aos="fade-up" data-aos-delay="">
            <div class="owl-carousel slide-one-item-alt">
              <img
                v-for="(event, index) in events"
                :key="index"
                :src="require('@/assets/eventphotos/' + event.photo)"
                class="img-fluid"
                style="height: 350px !important; object-fit: cover"
              />
            </div>
            <div class="custom-direction">
              <a href="#" class="custom-prev"
                ><span><span class="icon-keyboard_backspace"></span></span></a
              ><a href="#" class="custom-next"
                ><span><span class="icon-keyboard_backspace"></span></span
              ></a>
            </div>
          </div>
          <div class="col-lg-5 ml-auto" data-aos="fade-up" data-aos-delay="100">
            <div class="owl-carousel slide-one-item-alt-text">
              <div v-for="(event, index) in events" :key="index">
                <h2 class="section-title mb-3">
                  {{ language === "tr" ? event.title : event.title_en }}
                </h2>
                <p>
                  {{
                    language === "tr" ? event.description : event.description_en
                  }}
                </p>

                <p>
                  <a
                    :href="'/komite/' + event.slug"
                    class="btn btn-primary mr-2 mb-2"
                    >{{ variables.more_info[language] }}</a
                  >
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- <section
      class="site-section testimonial-wrap"
      id="testimonials-section"
      data-aos="fade"
    >
      <div class="container">
        <div class="row mb-5">
          <div class="col-12 text-center">
            <h2 class="section-title mb-3">Sektörden Yorumlar</h2>
          </div>
        </div>
      </div>
      <div class="slide-one-item home-slider owl-carousel">
        <div v-for="(comment, index) in comments" :key="index">
          <div class="testimonial">
            <blockquote class="mb-5">
              <p>
                {{ comment.text }}
              </p>
            </blockquote>
            <figure
              class="mb-4 d-flex align-items-center justify-content-center"
            >
              <div>
                <img
                  src="../../public/images/person_2.jpg"
                  alt="Image"
                  class="w-50 img-fluid mb-3"
                />
              </div>
              <p>{{ comment.fullName }}</p>
            </figure>
          </div>
        </div>
      </div>
    </section> -->
    <section class="site-section border-bottom bg-light" id="services-section">
      <div class="container">
        <div class="row mb-5">
          <div class="col-12 text-center" data-aos="fade">
            <h2 class="section-title mb-3">
              {{ variables.our_committees[language] }}
            </h2>
          </div>
        </div>
        <div class="row align-items-stretch">
          <div
            class="col-md-6 col-lg-4 mb-4 mb-lg-4"
            data-aos="fade-up"
            :data-aos-delay="committee.delay"
            v-for="(committee, index) in committees.filter((x) => x.logo)"
            :key="index"
          >
            <a :href="'/komite/' + committee.slug">
              <div class="unit-4">
                <center>
                  <div class="unit-4-icon">
                    <img
                      :src="require('@/assets/logolar/' + committee.logo)"
                      alt="Free Website Template by Free-Template.co"
                      class="img-fluid w-25 mb-4 rounded-circle"
                    />
                  </div>
                  <div>
                    <h3 style="color: #4f4f4f !important">
                      {{
                        language === "tr" ? committee.name : committee.name_en
                      }}
                    </h3>
                    <!-- <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Ratione animi tempora sint hic quod!
                </p> -->
                  </div>
                </center>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>

    <section
      style="background-color: #dfdfdfcc !important"
      v-for="(item, index) in sponsors"
      :key="index"
      class="site-section border-bottom pb-5 pt-5"
      id="services-section"
    >
      <div class="container">
        <div class="row mb-5">
          <div class="col-12 text-center" data-aos="fade">
            <h2 class="section-title mb-3">
              {{ item.title[language] }}
            </h2>
          </div>
        </div>
        <div class="row justify-content-center align-content-center">
          <div
            v-for="(item2, index2) in item.sponsors"
            :key="index2 + 'i'"
            class="col-3 col-sm-2 sponsor-card"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <a :href="item2.link" target="_blank">
              <img
                style="width: 100%"
                :src="item2.logo"
                :alt="item2.name"
                @error="imageError"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import committees from "../assets/committees.json";
import variables from "../assets/variables.json";
import events from "../assets/events.json";
import sponsors from "../assets/sponsors.json";
export default {
  data() {
    return {
      committees,
      variables,
      events,
      sponsors,
      comments: [
        {
          text: `"Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Voluptates exercitationem ut totam distinctio magnam quisquam,
                unde iure. Labore!."`,
          fullName: "John Smith",
        },
        {
          text: `"Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Maxime eligendi odio nihil officia quasi nostrum, ipsa est?
                Culpa, ullam dolorem!"`,
          fullName: "Rafet Topçu",
        },
        {
          text: `"Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Nihil veniam tempora beatae animi in sapiente quos maiores ex
                aut."`,
          fullName: "İrem Ekser",
        },
      ],
    };
  },
  methods: {
    imageError(e) {
      e.target.parentNode.innerHTML = "<span>" + e.target.alt + "</span>";
    },
  },
  computed: {
    language() {
      return this.$ls.get("language");
    },
  },
};
</script>
<style>
.sponsor-card {
  background: rgb(255, 255, 255, 0.3);
  margin: 4px;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.082);
  transition: 300ms;
}
.sponsor-card:hover {
  background: rgb(255, 255, 255, 0.4);
}
.sponsor-card a {
  height: 100%;
  display: inline-flex;
  width: 100%;
}
.sponsor-card img {
  object-fit: contain;
}
.sponsor-card span {
  color: rgb(44, 44, 44);
  text-align: center;
  font-size: 15px;
  word-wrap: break-word;
  text-transform: uppercase;
  font-weight: 900;
  display: block;
  margin: auto 0;
  width: 100%;
}
.sponsor-card span:hover {
  text-decoration: underline;
}
</style>
