<template>
  <div class="container mb-5 mt-5" style="max-width:500px">
    <a href="https://social.ieeeytu.com" target="_blank">
      <h1
        style="font-weight:600;color:#78bcff;font-family:Nunito;text-align:center"
      >
        Social
      </h1>
    </a>
    <span style="color:red">
      {{ errorMsg }}
    </span>
    <b-form-group label="E-mail adresi">
      <b-input v-model="loginData.email"></b-input>
    </b-form-group>
    <b-form-group label="Parola">
      <b-input v-model="loginData.password" type="password"></b-input>
      <b-link href="https://social.ieeeytu.com/login">Parolamı unuttum</b-link>
    </b-form-group>
    <center>
      <b-form-group>
        <b-button @click="_signIn">Giriş Yap</b-button>
      </b-form-group>
      <div>
        Hala bir hesabın yoksa
        <b-link href="https://social.ieeeytu.com/signup"> Kayıt ol</b-link>!
      </div>
    </center>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      errorMsg: null,
      loginData: {
        email: null,
        password: null
      }
    };
  },
  computed: {
    ...mapGetters(["isAuth"])
  },
  created() {
    if (this.isAuth) {
      window.location.href = "/ytornavida";
    }
  },
  methods: {
    ...mapActions(["signIn"]),
    async _signIn() {
      try {
        await this.signIn({ ...this.loginData });
        window.location.href = "/ytornavida";
      } catch (error) {
        if (error.status === 401) {
          this.errorMsg = "Email veya parola yanlış!";
        }
      }
    }
  }
};
</script>
