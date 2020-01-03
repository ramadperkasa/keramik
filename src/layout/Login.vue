<template>
  <v-app id="inspire">
    <div class="form-body">
      <div class="website-logo">
        <div class="logo">
          <!-- <span>Kadin</span> -->
          <img class="logo-size" src="images/logo-light.svg" alt />
        </div>
      </div>
      <div class="row">
        <div class="img-holder">
          <div class="bg"></div>
          <div class="info-holder">
            <img src="images/graphic1.svg" alt />
          </div>
        </div>
        <div class="form-holder">
          <div class="form-content">
            <div class="form-items">
              <div class="pb-5">
                <h3 style="text-align:center" class="pb-1">Selamat Datang di E-Warung!</h3>
                <p
                  style="text-align:center"
                >Silahkan masukan nama pengguna dan kata sandi untuk melanjutkan ke halaman berikutnya</p>
              </div>

              <form>
                <input class="form-control" type="text" placeholder="Nama Pengguna" />
                <input
                  class="form-control"
                  type="password"
                  placeholder="Kata Sandi"
                  v-on:keyup.enter="login()"
                />
              </form>
              <div class="form-button">
                <v-btn color="primary" text block @click="login()">Masuk</v-btn>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </v-app>
</template>

<script>
import { setToken } from "../auth";

export default {
  data() {
    return {
      data: {
        username: "",
        password: "",
        grant_type: "password",
        client_id: process.env.VUE_APP_PASSPORT_CLIENT_ID,
        client_secret: process.env.VUE_APP_PASSPORT_CLIENT_SECRET
      }
    };
  },

  methods: {
    login() {
      this.axios.defaults.baseURL = "http://dev.dipointer.com:8007";

      this.axios
        .post(process.env.VUE_APP_ROUTE_ADMIN_LOGIN, this.data)
        .then(response => {
          setToken(
            response.data.access_token,
            response.data.expires_in + Date.now()
          );
          // this.axios.defaults.headers.common["Authorization"] =
          //   "Bearer " + response.data.access_token;
          this.$router.push("/");
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>

<style scoped>
@import "/css/iofrm-style.css";
@import "/css/iofrm-theme4.css";
</style>