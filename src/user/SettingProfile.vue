<template>
  <app>
    <v-container>
      <p class="display-1 text-center">Setting Profile</p>
      <p
        class="subtitle text-center"
      >Info dasar, seperti nama dan foto, yang Anda gunakan untuk aplikasi ini</p>

      <v-card class="mx-auto" width="75%" outlined>
        <v-list-item three-line>
          <v-list-item-content>
            <v-list-item-title class="headline mb-1">Profil</v-list-item-title>
            <v-list-item-subtitle>
              Greyhound divisely hello coldly
              fonwderfully
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Foto Profil</v-list-item-title>
          </v-list-item-content>
          <v-list-item-content>
            <v-list-item-subtitle>
              Foto profil untuk mempersonifikasi akun
              anda
            </v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-avatar>
            <v-img src="https://cdn.vuetifyjs.com/images/john.png"></v-img>
          </v-list-item-avatar>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Nama</v-list-item-title>
          </v-list-item-content>
          <v-list-item-content>
            <v-list-item-subtitle>Rama Dwiyantara Perkasa</v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-btn icon>
              <v-icon color="grey lighten-1">mdi-chevron-right</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Email</v-list-item-title>
          </v-list-item-content>
          <v-list-item-content>
            <v-list-item-subtitle>ramadwiyantara1@gmail.com</v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-action>
            <v-btn icon>
              <v-icon color="grey lighten-1">mdi-chevron-right</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Alamat</v-list-item-title>
          </v-list-item-content>
          <v-list-item-content>
            <v-list-item-subtitle>Jalan Citepus II no 10 b</v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-action>
            <v-btn icon>
              <v-icon color="grey lighten-1">mdi-chevron-right</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Jenis Kelamin</v-list-item-title>
          </v-list-item-content>
          <v-list-item-content>
            <v-list-item-subtitle>Laki laki</v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-action>
            <v-btn icon>
              <v-icon color="grey lighten-1">mdi-chevron-right</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Lahir</v-list-item-title>
          </v-list-item-content>
          <v-list-item-content>
            <v-list-item-subtitle>Bandung, 03 November 2000</v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-action>
            <v-btn icon>
              <v-icon color="grey lighten-1">mdi-chevron-right</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-card>
    </v-container>
  </app>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped></style>
