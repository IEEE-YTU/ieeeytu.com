<template>
  <div>
    <div
      class="site-blocks-cover overlay"
      style="background-image: url(https://i.ibb.co/8zpVzR3/contact.jpg); height:50vh !important;min-height:0"
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
    <section
      class="site-section bg-light"
      id="contact-section"
      data-aos="fade"
      style="padding-bottom:0"
    >
      <div class="container">
        <div class="row mb-5">
          <div class="col-12 text-center">
            <h2 class="section-title mb-3">
              {{ variables.contact_us[language] }}
            </h2>
          </div>
        </div>
        <div class="row mb-5">
          <div class="col-md-6 text-center">
            <p class="mb-4">
              <span class="icon-room d-block h2 text-primary"></span>
              <span>{{
                language === "tr" ? contact.address : contact.address_en
              }}</span>
            </p>
          </div>
          <div class="col-md-6 text-center">
            <p class="mb-0">
              <span class="icon-mail_outline d-block h2 text-primary"></span>
              <a :href="'mailto:' + contact.email">{{ contact.email }}</a>
            </p>
          </div>
        </div>
      </div>
      <div style="width: 100%">
        <iframe
          width="100%"
          height="400"
          frameborder="0"
          scrolling="no"
          marginheight="0"
          marginwidth="0"
          src="https://maps.google.com/maps?width=100%25&amp;height=400&amp;hl=en&amp;q=Y%C4%B1ld%C4%B1z%20Teknik%20%C3%9Cniversitesi%20Davutpa%C5%9Fa%20Kamp%C3%BCs%C3%BC%20Elektrik%20Elektronik%20Fak%C3%BCltesi%20B%20blok%20zemin%20kat%20IEEE%20kul%C3%BCp%20odas%C4%B1,%203422%20Eseler%20/%20%C4%B0stanbul%20T%C3%BCrkiye+(IEEE%20YT%C3%9C)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
        ></iframe>
      </div>
    </section>
  </div>
</template>

<script>
import contact from "../assets/contact.json";
import variables from "../assets/variables.json";

export default {
  data() {
    return {
      contact,
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
