<template>
  <div>
    <div class="blog-site-wrap">
      <blog-toolbar />
      <div style="min-height: 100vh">
        <router-view></router-view>
      </div>
      <div class="site-footer">
        <div class="container">
          <div class="row mb-5">
            <div class="col-md-4">
              <h3 class="footer-heading mb-4">Yıldız Tornavida</h3>
              <p>
                Yıldız Tornavida kulübün yayın organıdır. 'Gün gelir, lazım
                olur.' sloganlı dergi popüler bilim, teknoloji ve kültür
                konseptindedir. İçeriğini kulüp haberleri, röportajlar ve kulüp
                üyelerinin yazdıkları araştırma yazıları oluşturmaktadır. Yıldız
                Tornavida dergisi Basın-Yayın komitesi tarafından
                çıkarılmaktadır.
              </p>
            </div>
            <div class="col-md-3 ml-auto">
              <!-- <h3 class="footer-heading mb-4">Navigation</h3> -->
              <ul class="list-unstyled float-left mr-5"></ul>
            </div>
            <div class="col-md-4">
              <div>
                <h3 class="footer-heading mb-4">Bize ulaşın!</h3>
                <p>
                  <a target="_blank" href="https://www.twitter.com/ieeeytu"
                    ><span class="icon-twitter p-2"></span
                  ></a>
                  <a target="_blank" href="https://www.instagram.com/ieeeytu"
                    ><span class="icon-instagram p-2"></span
                  ></a>
                  <a
                    target="_blank"
                    href="https://www.linkedin.com/company/ytu-ieee-student-branch/"
                    ><span class="icon-linkedin p-2"></span
                  ></a>
                  <a target="_blank" href="mailto:iletisim@ieeeytu.com"
                    ><span class="icon-envelope p-2"></span
                  ></a>
                </p>
              </div>
            </div>
          </div>
          <!-- <div class="row"> -->
          <!-- <div class="col-12 text-center"> -->
          <!-- <p> -->
          <!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. -->
          <!-- Copyright &copy; -->
          <!-- <script>
                  document.write(new Date().getFullYear());
                </script> -->
          <!-- All rights reserved | This template is made with -->
          <!-- <i class="icon-heart text-danger" aria-hidden="true"></i> by -->
          <!-- <a href="https://colorlib.com/" target="_blank">Colorlib</a> -->
          <!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. -->
          <!-- </p> -->
          <!-- </div> -->
          <!-- </div> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import "../public/fonts/icomoon/style.css";
import "../public/css/bootstrap.min.css";
import "../public/css/magnific-popup.css";
import "../public/css/jquery-ui.css";
import "../public/css/owl.carousel.min.css";
import "../public/css/owl.theme.default.min.css";
import "../public/css/bootstrap-datepicker.css";
import "../public/fonts/flaticon/font/flaticon.css";
import "../public/css/aos.css";

import "../public/css/blogStyle.css";

import { mapActions, mapGetters } from "vuex";
import BlogToolbar from "./components/BlogToolbar";
export default {
  components: { BlogToolbar },
  data() {
    return {
      loginData: {
        email: null,
        password: null,
      },
      errorMsg: null,
    };
  },
  computed: {
    ...mapGetters(["isAuth", "user", "role"]),
  },
  methods: {
    ...mapActions(["signIn"]),
    async _signIn() {
      try {
        await this.signIn({ ...this.loginData });
      } catch (error) {
        if (error.status === 401) {
          this.errorMsg = "Email veya parola yanlış!";
        }
      }
    },
  },
  async created() {
    document.title = "Yıldız Tornavida";
  },
};
</script>
<style>
.blog-logo {
  height: 80px;
  position: absolute;
  left: 20px;
  top: -24px;
}
.blog-sidebar {
  list-style: none;
  padding: 0;
  margin: 0;
}
.blog-sidebar li {
  margin: 15px 5px;
  font-size: 20px;
}
.blog-sidebar li a {
  color: black !important;
}
.navbar-shadow {
  box-shadow: 0px 0px 30px rgb(0, 0, 0, 0.1);
}
.container {
  overflow-x: hidden;
}
</style>
