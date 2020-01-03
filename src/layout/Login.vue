<template>
  <v-app id="inspire">
    <div class="form-body">
      <div class="website-logo">
        <!-- <div class="logo"> -->
        <span>Kadin</span>
        <!-- <img class="logo-size" src="images/logo-light.svg" alt /> -->
        <!-- </div> -->
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
                <h3 style="text-align:center" class="pb-1">Selamat Datang di Aplikasi Kami!</h3>
                <p
                  style="text-align:center"
                >Silahkan masukan alamat email dan kata sandi untuk melanjutkan ke halaman berikutnya</p>
              </div>

              <form>
                <input class="form-control" type="text" placeholder="Alamat Email" />
                <input
                  class="form-control"
                  type="password"
                  placeholder="Kata Sandi"
                  v-on:keyup.enter="$router.push('/')"
                />
              </form>
              <div class="form-button">
                <v-btn color="primary" text block @click="$router.push('/')">Masuk</v-btn>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </v-app>
</template>

<style scoped>
@import "/css/iofrm-style.css";
@import "/css/iofrm-theme4.css";
</style>