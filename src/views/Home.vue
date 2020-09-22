<template>
  <div>
    <div
      class="site-blocks-cover overlay"
      style="background-image: url(https://images.unsplash.com/photo-1491308056676-205b7c9a7dc1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1953&q=80);"
      data-aos="fade"
      id="home-section"
    >
      <div class="container">
        <div class="row align-items-center justify-content-center">
          <div class="col-md-10 mt-lg-5 text-center">
            <div class="single-text owl-carousel">
              <div class="slide">
                <h1 class="text-uppercase" data-aos="fade-up">
                  IEEE YTU
                </h1>
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
            <h3 class="text-black mb-4" style="text-align:center">
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
                style="height:350px !important; object-fit:cover"
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
            v-for="(committee, index) in committees.filter(x => x.logo)"
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
                    <h3 style="color:#4f4f4f !important">
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
  </div>
</template>
<script>
import committees from "../assets/committees.json";
import variables from "../assets/variables.json";
export default {
  data() {
    return {
      committees,
      variables,
      comments: [
        {
          text: `"Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Voluptates exercitationem ut totam distinctio magnam quisquam,
                unde iure. Labore!."`,
          fullName: "John Smith"
        },
        {
          text: `"Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Maxime eligendi odio nihil officia quasi nostrum, ipsa est?
                Culpa, ullam dolorem!"`,
          fullName: "Rafet Topçu"
        },
        {
          text: `"Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Nihil veniam tempora beatae animi in sapiente quos maiores ex
                aut."`,
          fullName: "İrem Ekser"
        }
      ],
      events: [
        {
          title: "RLC GÜNLERİ",
          title_en: "RLC DAYS",
          slug: "rlc-gunleri",
          photo: "rlc-gunleri.jpg",
          description:
            "RLC Günleri, Türkiye’de sanayi-öğrenci-akademisyen iş birliğine olanak sağlayan ‘Sektörün En Bilinen Öğrenci Etkinliği’dir.",
          description_en:
            "The RLC Days is a career event which we started in 2005 under the name of “Electronics Days” with the slogan “You Cannot Become An Engineer By Just Entering The Lessons”; has spread to a large mass in the fields of Electricity, Electronics, Energy, Automation and Lighting."
        },
        {
          title: "İLTEK GÜNLERİ",
          title_en: "ILTEK DAYS",
          slug: "iltek-gunleri",
          photo: "iltek-gunleri.jpg",
          description:
            "İLTEK (İletişim ve Bilişim Teknolojileri) Günleri; iletişim, bilişim, elektronik, mekatronik ve telekominikasyon başta olmak üzere tüm teknoloji konularını mercek altına almaktadır.",
          description_en:
            "As IEEE YTU Student Club, “You Cannot Become An Engineer By Just Entering The Lessons!” We have been organizing ILTEK Days since 2006 on this road we set off with the slogan. İLTEK (Communication and Information Technologies) Days; It focuses on all technology issues, especially communication, informatics, electronics, mechatronics and telecommunication."
        },
        {
          title: "BioForm",
          title_en: "BioForm",
          slug: "emb-komitesi",
          photo: "bioform.png",
          description:
            "Bioform ile başta biyomühendislik, biyoloji, tıp mühendisliği, biyomekatronik sistemler mühendisliği, biyomedikal mühendisliği ile doku mühendisliği, genetik mühendisliği, moleküler biyoloji ve genetik bölümleri yanında tüm mühendislik alanlarında öğrenim gören öğrencileri sektör ile buluşturuyoruz. Bizim en büyük amacımız mühendislik ve sağlık alanıyla ortaklaşa multidisipliner çalışmalar ortaya koyabilmektir.",
          description_en:
            "With Bioform, we bring together students who study in bioengineering, biology, medical engineering, biomechatronic systems engineering, biomedical engineering, tissue engineering, genetic engineering, molecular biology and genetics as well as all engineering fields. Our greatest goal is to be able to carry out multidisciplinary studies jointly with engineering and healthcare."
        },
        {
          title: "Yıldızlı Projeler Yarışması",
          title_en: "Yıldızlı Projeler Yarışması",
          slug: "yildizli-projeler-yarismasi",
          photo: "yildizli-projeler-yarismasi.jpg",
          description:
            "2009’dan bu yana Yıldızlı Projeler Yarışması, öğrencilerin projelerinin hayata geçmesi konusunda onlara destek olarak bu projelerin ürüne dönüşmesinde rol oynayan, üniversite-sanayi işbirliğini somutlaştıran, genç ve pratik beyinlerin rekabet ettiği bir yarışmadır. ",
          description_en:
            "Since 2009,Yıldızlı Projeler Yarışması is a competition that supports students in the realization of their projects, embodies the university-industry cooperation, and which young and practical minds compete. Yıldızlı Projeler Yarışması consists of two categories: student and start-up. Each category will compete within itself because support for more than one project is provided."
        },
        {
          title: "Kutup Yıldızı",
          title_en: "Kutup Yıldızı",
          slug: "basin-yayin-komitesi",
          photo: "kutup-yildizi.jpg",
          description:
            "Kutup Yıldızı, iş, sanat, spor ve bilim dünyasının önde gelen isimlerinin katıldığı 4 temel oturumu bulunan, “Geleceğine Yön Ver!” sloganı ile yola çıkarak öğrencileri hayatlarıyla etkileyecek ve onları harekete geçirecek isimlerin katıldığı sosyal bir etkinliktir. Kutup Yıldızı etkinliğini Basın-Yayın komitesi düzenlemektedir.",
          description_en:
            "The Kutup Yıldızı event is a social event that was held at the beginning of the year to increase the motivation of club members and to inspire them; has 4 main sessions attended by leading names from business, art, sports and science worlds, will impress students with their lives by starting out with the slogan 'Shape Your Future!’ and attended by people who will mobilize them. Kutup Yıldızı is arranged by the Media-Publications Committee"
        }
      ]
    };
  },
  computed: {
    language() {
      return this.$ls.get("language");
    }
  }
};
</script>
