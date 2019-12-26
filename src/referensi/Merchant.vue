<template>
  <app>
    <v-row>
      <v-col cols="8">
        <span class="title pl-2">Merchant</span>
      </v-col>
      <v-spacer></v-spacer>
      <div class="pr-4 align-self-center">
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" text color="primary" class="mr-3" @click="addItem()">
              <v-icon>mdi-plus</v-icon>Baru
            </v-btn>
          </template>
          <span>Tambah Data</span>
        </v-tooltip>
      </div>
    </v-row>
    <v-divider></v-divider>
    <v-data-table
      flat
      :headers="table.headers"
      :items="table.items.data"
      :options.sync="table.options"
      :server-items-length="table.items.total"
      :loading="loading.table"
      :footer-props="{
        itemsPerPageOptions: pagination
      }"
    >
      <template v-slot:item.no="{ item }">
        {{
        table.items.data.indexOf(item) + table.items.from
        }}
      </template>
      <template v-slot:item.status="{ item }">
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-icon v-on="on" v-if="item.status == 0">mdi-progress-clock</v-icon>
          </template>
          <span>Pending</span>
        </v-tooltip>
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-icon v-on="on" v-if="item.status == 1">mdi-emoticon-excited-outline</v-icon>
          </template>
          <span>Aktif</span>
        </v-tooltip>
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-icon v-on="on" v-if="item.status == 2">mdi-emoticon-sad-outline</v-icon>
          </template>
          <span>Tidak Aktif</span>
        </v-tooltip>
      </template>
      <template v-slot:item.action="{ item }">
        <v-tooltip left>
          <template v-slot:activator="{ on }">
            <v-icon
              v-on="on"
              class="mr-2"
              @click="dialog.menu.model = true;dialog.menu.id = item.id"
            >mdi-dots-vertical</v-icon>
          </template>
          <span color="primary">Lainnya</span>
        </v-tooltip>
      </template>
    </v-data-table>

    <v-dialog v-model="dialog.alert.model" max-width="500">
      <v-card>
        <v-card-title class="title">Apakah anda yakin ingin hapus data Merchant ini?</v-card-title>

        <v-card-text>
          <v-row>
            <v-col cols="1" class="align-self-center pl-1">
              <v-icon large class>mdi-alert-circle</v-icon>
            </v-col>
            <v-col cols="11">
              Data yang telah di hapus akan terhapus secara permanen, apakah
              anda yakin ingin menghapus data Merchant ini?
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            :loading="dialog.alert.loading"
            :disabled="dialog.alert.loading"
            text
            @click="dialog.alert.model = false"
          >Batal</v-btn>
          <v-btn
            color="primary"
            :loading="dialog.alert.loading"
            :disabled="dialog.alert.loading"
            text
            @click="destroyMerchant()"
          >Hapus</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog
      persistent
      transition="dialog-bottom-transition"
      v-model="dialog.form.model"
      width="1000"
    >
      <v-stepper alt-labels class="elevation-0" v-model="steps">
        <v-stepper-header class="elevation-0">
          <v-stepper-step editable class="text-center" step="1">
            <span class="text-center">Select campaign settings</span>
          </v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step editable step="2">
            <span class="text-center">Create an ad group</span>
          </v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step editable step="3">
            <span class="text-center">Create an ad</span>
          </v-stepper-step>
        </v-stepper-header>
        <v-divider></v-divider>
        <v-stepper-content step="1">
          <v-card flat class="mb-4">
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="form.nama_merchant"
                  label="Nama Merchant *"
                  hint="Contoh : Dipointer"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="form.jenis_merchant_id"
                  label="Jenis Merchant *"
                  hint="Contoh : Dipointer"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="form.logo_merchant"
                  label="Logo Merchant *"
                  hint="Contoh : Dipointer"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="form.cover_merchant"
                  label="Cover Merchant *"
                  hint="Contoh : Dipointer"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  v-model="form.deskripsi_merchant"
                  label="Deskripsi Merchant *"
                  hint="Contoh : Dipointer"
                ></v-textarea>
              </v-col>
            </v-row>

            <div class="mt-3">
              <v-row class="mr-3">
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="dialog.form.model = false">
                  <v-icon>mdi-close</v-icon>Tutup
                </v-btn>
                <v-btn color="primary" @click="steps++">
                  <v-icon>mdi-arrow-right</v-icon>Lanjut
                </v-btn>
              </v-row>
            </div>
          </v-card>
        </v-stepper-content>
        <v-stepper-content step="2">
          <v-card flat class="mb-4">
            <v-row>
              <v-col cols="6">
                <v-combobox
                  v-model="form.provinsi_id"
                  :items="select.provinsi"
                  item-value="id"
                  label="Nama Provinsi *"
                  :return-object="false"
                  item-text="nama_provinsi"
                  clearable
                >
                  <template v-slot:selection="data">{{filterDataProvinsi(data.item)}}</template>
                </v-combobox>
              </v-col>
              <v-col cols="6">
                <v-combobox
                  v-model="form.kabupaten_id"
                  :items="select.kabupaten ? select.kabupaten : []"
                  item-value="id"
                  label="Nama Kabupaten *"
                  :return-object="false"
                  item-text="nama_kabupaten"
                  :loading="loading.kabupaten"
                  :disabled="!form.provinsi_id"
                  clearable
                >
                  <template v-slot:selection="data">{{filterDataKabupaten(data.item)}}</template>
                </v-combobox>
              </v-col>
              <v-col cols="6">
                <v-combobox
                  v-model="form.kecamatan_id"
                  :items="select.kecamatan ? select.kecamatan : []"
                  item-value="id"
                  label="Nama Kecamatan *"
                  :return-object="false"
                  item-text="nama_kecamatan"
                  :loading="loading.kecamatan"
                  :disabled="!form.kabupaten_id"
                  clearable
                >
                  <template v-slot:selection="data">{{filterDataKecamatan(data.item)}}</template>
                </v-combobox>
              </v-col>
              <v-col cols="6">
                <v-combobox
                  v-model="form.kelurahan_id"
                  :items="select.kelurahan ? select.kelurahan : []"
                  item-value="id"
                  label="Nama Kelurahan *"
                  :return-object="false"
                  item-text="nama_kelurahan"
                  :loading="loading.kelurahan"
                  :disabled="!form.kabupaten_id"
                  clearable
                >
                  <template v-slot:selection="data">{{filterDataKelurahan(data.item)}}</template>
                </v-combobox>
              </v-col>
              <v-col cols="6">
                <v-text-field v-model="form.latitude" label="Latitude *" hint="Contoh : -6.9376191"></v-text-field>
              </v-col>
              <v-col cols="5">
                <v-text-field
                  v-model="form.longitude"
                  label="Longitude *"
                  hint="Contoh : 107.6246156"
                ></v-text-field>
              </v-col>
              <v-col cols="1">
                <v-btn large primary icon>
                  <v-tooltip top>
                    <template v-slot:activator="{ on }">
                      <v-icon @click="dialog.maps.model = true" v-on="on">mdi-magnify</v-icon>
                    </template>
                    <span>Lihat di Map</span>
                  </v-tooltip>
                </v-btn>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  v-model="form.alamat"
                  label="Alamat *"
                  hint="Contoh : Jalan Pelajar pejuang 45"
                ></v-textarea>
              </v-col>
            </v-row>
            <div class="mt-3">
              <v-row class="mr-3">
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="steps--">
                  <v-icon>mdi-arrow-left</v-icon>Kembali
                </v-btn>
                <v-btn color="primary" @click="steps++">
                  <v-icon>mdi-arrow-right</v-icon>Lanjut
                </v-btn>
              </v-row>
            </div>
          </v-card>
        </v-stepper-content>
        <v-stepper-content step="3">
          <v-card flat class="mb-4">
            <v-text-field
              v-model="form.email_contact"
              label="Email Contact *"
              hint="Contoh : Dipointer"
            ></v-text-field>
            <v-text-field
              v-model="form.email_notifikasi"
              label="Email Notifikasi *"
              hint="Contoh : Dipointer"
            ></v-text-field>
            <v-text-field v-model="form.zoom" label="Zoom *" hint="Contoh : Dipointer"></v-text-field>
            <v-text-field v-model="form.website" label="Website *" hint="Contoh : Dipointer"></v-text-field>
            <v-text-field v-model="form.status" label="Status *" hint="Contoh : Dipointer"></v-text-field>
            <div class="mt-3">
              <v-row class="mr-3">
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="steps--">
                  <v-icon>mdi-arrow-left</v-icon>Kembali
                </v-btn>
                <v-btn color="primary" @click>Submit</v-btn>
              </v-row>
            </div>
          </v-card>
        </v-stepper-content>
      </v-stepper>
    </v-dialog>
    <v-dialog transition="dialog-bottom-transition" v-model="dialog.maps.model" width="1000">
      <iframe
        :src="'https://www.google.co.id/maps?q=' + form.latitude + ',' + form.longitude + '&z=16&output=embed'"
        width="100%"
        height="650"
        frameborder="0"
        style="border:0"
        allowfullscreen
      ></iframe>
    </v-dialog>
    <v-dialog fullscreen hide-overlay v-model="dialog.profile.model">
      <v-card>
        <v-card-title primary-title>
          <v-icon class="pr-2">mdi-account-outline</v-icon>Detail Merchant
          <v-spacer></v-spacer>
          <v-btn text @click="dialog.profile.model = false;dialog.profile.address = ''">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-container>
          <v-card-text>
            <p class="display-1 text-center" v-if="dialog.profile.address == false">Detail Merchant</p>
            <p class="display-1 text-center" v-else>
              <v-btn icon>
                <v-icon large @click="dialog.profile.address=''">mdi-arrow-left</v-icon>
              </v-btn>Detail Alamat
            </p>
            <p
              class="subtitle text-center"
              v-if="dialog.profile.address == false"
            >Info dasar, seperti nama dan foto, yang digunakan untuk aplikasi ini</p>
            <p class="subtitle text-center" v-else>Halaman Ini menunjukan lokasi keberadaan di maps</p>

            <v-card class="mx-auto" width="75%" outlined v-if="dialog.profile.address == false">
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
                  <v-list-item-title>Logo Merchant</v-list-item-title>
                </v-list-item-content>
                <v-list-item-content>
                  <v-list-item-subtitle>
                    Logo Merchant untuk mempersonifikasi akun
                    merchant
                  </v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-avatar>
                  <v-img
                    :src="select.profile.logo_merchant ? select.profile.logo_merchant : 'https://image.flaticon.com/icons/png/512/747/747376.png'"
                  ></v-img>
                </v-list-item-avatar>
              </v-list-item>
              <v-divider></v-divider>
              <v-list-item
                @click="select.profile.cover_merchant ? action(select.profile.cover_merchant) : ''"
              >
                <v-list-item-content>
                  <v-list-item-title>Cover Merchant</v-list-item-title>
                </v-list-item-content>
                <v-list-item-content>
                  <v-list-item-subtitle>
                    Cover Merchant untuk mempersonifikasi akun
                    merchant
                  </v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-avatar v-if="!select.profile.cover_merchant">
                  <v-img src="https://image.flaticon.com/icons/png/512/747/747376.png"></v-img>
                </v-list-item-avatar>
                <v-list-item-action @click="action(select.profile.cover_merchant)" v-else>
                  <v-btn icon>
                    <v-icon color="grey lighten-1">mdi-chevron-right</v-icon>
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
              <v-divider></v-divider>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Nama</v-list-item-title>
                </v-list-item-content>
                <v-list-item-content>
                  <v-list-item-subtitle>{{select.profile.nama_merchant}}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-divider></v-divider>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Email Kontak</v-list-item-title>
                </v-list-item-content>
                <v-list-item-content>
                  <v-list-item-subtitle>{{select.profile.email_contact}}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-divider></v-divider>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Email Notifikasi</v-list-item-title>
                </v-list-item-content>
                <v-list-item-content>
                  <v-list-item-subtitle>{{select.profile.email_notifikasi}}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-divider></v-divider>
              <v-list-item @click="dialog.profile.address = true">
                <v-list-item-content>
                  <v-list-item-title>Alamat</v-list-item-title>
                </v-list-item-content>
                <v-list-item-content>
                  <v-list-item-subtitle
                    style="white-space:normal !important"
                  >{{select.profile.alamat}}</v-list-item-subtitle>
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
                  <v-list-item-title>Website</v-list-item-title>
                </v-list-item-content>
                <v-list-item-content>
                  <v-list-item-subtitle>{{select.profile.website}}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-divider></v-divider>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Jenis Merchant</v-list-item-title>
                </v-list-item-content>
                <v-list-item-content>
                  <v-list-item-subtitle>{{select.profile.jenis_merchant_id}}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-divider></v-divider>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Status</v-list-item-title>
                </v-list-item-content>
                <v-list-item-content>
                  <v-list-item-subtitle>{{select.profile.status == 0 ? 'Pending' : select.profile.status == 1 ? 'Aktif' : 'Tidak Aktif' }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-divider></v-divider>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Deskripsi</v-list-item-title>
                </v-list-item-content>
                <v-list-item-content>
                  <v-list-item-subtitle>{{select.profile.deskripsi_merchant}}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-card>
            <v-card class="mx-auto" width="75%" outlined v-else>
              <iframe
                :src="'https://www.google.co.id/maps?q=' + select.profile.latitude + ',' + select.profile.longitude + '&z=16&output=embed'"
                width="100%"
                height="650"
                frameborder="0"
                style="border:0"
                allowfullscreen
              ></iframe>
            </v-card>
          </v-card-text>
        </v-container>
      </v-card>
    </v-dialog>
    <v-snackbar v-model="alert.model" bottom left :timeout="3000">
      {{ alert.text }}
      <v-btn color="primary" text @click="alert.model = false">Tutup</v-btn>
    </v-snackbar>
    <v-bottom-sheet v-model="dialog.menu.model">
      <v-list>
        <v-subheader>Dialog Menu</v-subheader>
        <v-list-item @click="dialog.menu.model = false;dialogEditItem(dialog.menu.id)">
          <v-list-item-avatar>
            <v-icon size="32px" tile>mdi-pencil-outline</v-icon>
          </v-list-item-avatar>
          <v-list-item-title>Edit Data Merchant</v-list-item-title>
        </v-list-item>
        <v-list-item @click="dialog.menu.model = false;dialogDestroyItem(dialog.menu.id)">
          <v-list-item-avatar>
            <v-icon size="32px" tile>mdi-trash-can-outline</v-icon>
          </v-list-item-avatar>
          <v-list-item-title>Hapus Data Merchant</v-list-item-title>
        </v-list-item>
        <v-list-item
          @click="dialog.menu.model = false;$router.push('/merchant/produk/'+dialog.menu.id)"
        >
          <v-list-item-avatar>
            <v-icon size="32px" tile>mdi-cart-outline</v-icon>
          </v-list-item-avatar>
          <v-list-item-title>Lihat Data Produk</v-list-item-title>
        </v-list-item>
        <v-list-item
          @click="dialog.menu.model = false;$router.push('/merchant/kontak/'+dialog.menu.id)"
        >
          <v-list-item-avatar>
            <v-icon size="32px" tile>mdi-contacts</v-icon>
          </v-list-item-avatar>
          <v-list-item-title>Lihat Data Kontak</v-list-item-title>
        </v-list-item>
        <v-list-item
          @click="dialog.menu.model = false;$router.push('/merchant/operasional/'+dialog.menu.id)"
        >
          <v-list-item-avatar>
            <v-icon size="32px" tile>mdi-door-open</v-icon>
          </v-list-item-avatar>
          <v-list-item-title>Lihat Jam Operasional</v-list-item-title>
        </v-list-item>
        <v-list-item
          @click="dialog.menu.model = false;$router.push('/merchant/legalitas/'+dialog.menu.id)"
        >
          <v-list-item-avatar>
            <v-icon size="32px" tile>mdi-file-document-outline</v-icon>
          </v-list-item-avatar>
          <v-list-item-title>Lihat Data Legalitas</v-list-item-title>
        </v-list-item>
        <v-list-item
          @click="dialog.menu.model = false;$router.push('/merchant/rekening/'+dialog.menu.id)"
        >
          <v-list-item-avatar>
            <v-icon size="32px" tile>mdi-credit-card-outline</v-icon>
          </v-list-item-avatar>
          <v-list-item-title>Lihat Data Rekening</v-list-item-title>
        </v-list-item>
        <v-list-item
          @click="dialog.menu.model = false;$router.push('/merchant/medsos/'+dialog.menu.id)"
        >
          <v-list-item-avatar>
            <v-icon size="32px" tile>mdi-facebook</v-icon>
          </v-list-item-avatar>
          <v-list-item-title>Lihat Data Media Sosial</v-list-item-title>
        </v-list-item>
        <v-list-item @click="dialog.menu.model = false;dialogProfile(dialog.menu.id)">
          <v-list-item-avatar>
            <v-icon size="32px" tile>mdi-eye-outline</v-icon>
          </v-list-item-avatar>
          <v-list-item-title>Lihat Data merchant</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-bottom-sheet>
  </app>
</template>

<script>
import store from "../store/index";
export default {
  data() {
    return {
      dialog: {
        form: {
          model: false,
          loading: false
        },
        alert: {
          model: false,
          loading: false
        },
        maps: {
          model: false,
          loading: false
        },
        menu: {
          model: false,
          loading: false,
          id: ""
        },
        profile: {
          model: false,
          loading: false,
          address: false
        }
      },
      form: {
        id: "",
        mitra_id: "",
        nama_merchant: "",
        jenis_merchant_id: "",
        alamat: "",
        provinsi_id: "",
        kabupaten_id: "",
        kecamatan_id: "",
        kelurahan_id: "",
        deskripsi_merchant: "",
        logo_merchant: "",
        cover_merchant: "",
        email_contact: "",
        email_notifikasi: "",
        latitude: "",
        longitude: "",
        zoom: "",
        website: "",
        status: "",
        isEdit: false
      },
      table: {
        options: {},
        headers: [
          {
            text: "#",
            align: "left",
            width: 15,
            sortable: false,
            value: "no"
          },
          {
            text: "Nama Merchant",
            value: "nama_merchant",
            align: "left"
          },
          {
            text: "Jenis Merchant",
            value: "jenis_merchant_id",
            align: "left"
          },
          {
            text: "Email",
            value: "email_contact",
            align: "left"
          },
          {
            text: "Website",
            value: "website",
            align: "left"
          },
          {
            text: "Status",
            value: "status",
            align: "left"
          },
          {
            text: "Action",
            value: "action",
            sortable: false,
            width: "10%"
          }
        ],
        items: []
      },
      alert: {
        model: false,
        text: ""
      },
      loading: {
        table: false,
        provinsi: false,
        kecamatan: false,
        kabupaten: false,
        kelurahan: false
      },
      select: {
        provinsi: "",
        kabupaten: "",
        kecamatan: "",
        kelurahan: "",
        profile: []
      },
      steps: 1
    };
  },
  watch: {
    "table.options"(newValue, oldValue) {
      this.fetchMerchant();
    },
    search(newValue) {
      this.table.options.page = 1;
      this.fetchMerchant(newValue);
    },
    "form.provinsi_id"(newValue, oldValue) {
      this.form.kabupaten_id = "";
      this.form.kecamatan_id = "";
      this.form.kelurahan_id = "";
      this.fetchSelectKabupaten(newValue);
    },
    "form.kabupaten_id"(newValue, oldValue) {
      this.form.kecamatan_id = "";
      this.form.kelurahan_id = "";
      this.fetchSelectKecamatan(newValue);
    },
    "form.kecamatan_id"(newValue, oldValue) {
      this.form.kelurahan_id = "";
      this.fetchSelectKelurahan(newValue);
    }
  },
  computed: {
    search() {
      return store.getters.getSearch;
    },
    pagination() {
      return store.getters.getPagination;
    },
    icon_form() {
      return store.getters.getFormIcon;
    }
  },
  mounted() {
    this.fetchSelectProvinsi();
  },
  methods: {
    fetchMerchant() {
      this.loading.table = true;
      const data = {
        page: this.table.options.page,
        size: this.table.options.itemsPerPage,
        field:
          this.table.options.sortBy[0] == null
            ? "id"
            : this.table.options.sortBy[0],
        sortBy: this.table.options.sortDesc[0] ? "desc" : "asc",
        search: this.search
      };

      const params = data;
      axios
        .get("merchant", { params })
        .then(response => {
          this.table.items = response.data.merchant;
        })
        .catch(error => {
          this.alert.model = true;
          this.alert.text = "Terjadi Kesalahan";
        })
        .finally(() => {
          this.loading.table = false;
        });
    },
    fetchSelectProvinsi() {
      axios
        .get("wilayah-administrasi/provinsi")
        .then(response => {
          this.select.provinsi = response.data.provinsi;
        })
        .catch(error => {
          this.alert.model = true;
          this.alert.text = "Terjadi Kesalahan";
        });
    },
    fetchSelectKabupaten(provinsi_id) {
      this.form.kabupaten_id = this.form.kelurahan_id.substring(0, 4);
      this.select.kabupaten = [];
      this.loading.kabupaten = true;
      const data = {
        provinsi_id
      };
      const params = data;
      axios
        .get("wilayah-administrasi/kabupaten", { params })
        .then(response => {
          this.select.kabupaten = response.data.kabupaten;
        })
        .catch(error => {
          this.alert.model = true;
          this.alert.text = "Terjadi Kesalahan";
        })
        .finally(() => {
          this.loading.kabupaten = false;
        });
    },
    fetchSelectKecamatan(kabupaten_id) {
      this.form.kecamatan_id = this.form.kelurahan_id.substring(0, 6);
      this.select.kecamatan = [];
      this.loading.kecamatan = true;
      const data = {
        kabupaten_id
      };
      const params = data;
      axios
        .get("wilayah-administrasi/kecamatan", { params })
        .then(response => {
          this.select.kecamatan = response.data.kecamatan;
        })
        .catch(error => {
          this.alert.model = true;
          this.alert.text = "Terjadi Kesalahan";
        })
        .finally(() => {
          this.loading.kecamatan = false;
          this.form.first = false;
        });
    },
    fetchSelectKelurahan(kecamatan_id) {
      this.select.kelurahan = [];
      this.loading.kelurahan = true;
      const data = {
        kecamatan_id
      };
      const params = data;
      axios
        .get("wilayah-administrasi/kelurahan", { params })
        .then(response => {
          this.select.kelurahan = response.data.kelurahan;
        })
        .catch(error => {
          this.alert.model = true;
          this.alert.text = "Terjadi Kesalahan";
        })
        .finally(() => {
          this.loading.kelurahan = false;
          this.form.first = false;
        });
    },
    addItem() {
      this.form.isEdit = false;
      this.dialog.form.model = true;
      this.form.id = "";
      this.form.mitra_id = "";
      this.form.nama_merchant = "";
      this.form.jenis_merchant_id = "";
      this.form.alamat = "";
      this.form.provinsi_id = "";
      this.form.kabupaten_id = "";
      this.form.kecamatan_id = "";
      this.form.kelurahan_id = "";
      this.form.deskripsi_merchant = "";
      this.form.logo_merchant = "";
      this.form.cover_merchant = "";
      this.form.email_contact = "";
      this.form.email_notifikasi = "";
      this.form.latitude = "";
      this.form.longitude = "";
      this.form.zoom = "";
      this.form.website = "";
      this.form.status = "";
    },
    editItem(item) {
      this.dialog.form.model = true;
      this.form.isEdit = true;
      this.form.id = item.id;
      this.form.mitra_id = item.mitra_id;
      this.form.nama_merchant = item.nama_merchant;
      this.form.jenis_merchant_id = item.jenis_merchant_id;
      this.form.alamat = item.alamat;
      this.form.provinsi_id = item.provinsi_id;
      this.form.kabupaten_id = item.kabupaten_id;
      this.form.kecamatan_id = item.kecamatan_id;
      this.form.kelurahan_id = item.kelurahan_id;
      this.form.deskripsi_merchant = item.deskripsi_merchant;
      this.form.logo_merchant = item.logo_merchant;
      this.form.cover_merchant = item.cover_merchant;
      this.form.email_contact = item.email_contact;
      this.form.email_notifikasi = item.email_notifikasi;
      this.form.latitude = item.latitude;
      this.form.longitude = item.longitude;
      this.form.zoom = item.zoom;
      this.form.website = item.website;
      this.form.status = item.status;
    },
    destroyItem(item) {
      this.dialog.alert.model = true;
      this.form.id = item.id;
    },
    updateMerchant() {
      this.dialog.form.loading = true;
      const params = this.form;
      axios
        .post("merchant/update", params)
        .then(response => {
          this.table.items = response.data;
          this.table.options.page = 1;
          this.dialog.form.model = false;
          this.fetchMerchant();
          this.alert.model = true;
          this.alert.text = "Data Berhasil Di Edit";
        })
        .catch(error => {
          this.alert.model = true;
          this.alert.text = "Terjadi Kesalahan";
        })
        .finally(() => {
          this.dialog.form.loading = false;
        });
    },
    createMerchant() {
      const params = this.form;
      axios
        .post("merchant/create", params)
        .then(response => {
          this.table.items = response.data;
          this.dialog.form.model = false;
          this.table.options.page = 1;
          this.fetchMerchant();
          this.alert.model = true;
          this.alert.text = "Data Berhasil Di Tambah";
        })
        .catch(error => {
          this.alert.model = true;
          this.alert.text = "Terjadi Kesalahan";
        })
        .finally(() => {
          this.dialog.form.loading = false;
        });
    },
    updateNewMerchant() {
      this.dialog.form.loading = true;
      const params = this.form;
      axios
        .post("merchant/update", params)
        .then(response => {
          this.table.items = response.data;
          this.table.options.page = 1;
          this.alert.model = true;
          this.alert.text = "Data Berhasil Di Edit";
          this.fetchMerchant();
          this.addItem();
        })
        .catch(error => {
          this.alert.model = true;
          this.alert.text = "Terjadi Kesalahan";
        })
        .finally(() => {
          this.dialog.form.loading = false;
        });
    },
    createNewMerchant() {
      this.dialog.form.loading = true;
      const params = this.form;
      axios
        .post("merchant/create", params)
        .then(response => {
          this.table.items = response.data;
          this.table.options.page = 1;
          this.alert.model = true;
          this.alert.text = "Data Berhasil Di Tambah";
          this.fetchMerchant();
          this.addItem();
        })
        .catch(error => {
          this.alert.model = true;
          this.alert.text = "Terjadi Kesalahan";
        })
        .finally(() => {
          this.dialog.form.loading = false;
        });
    },
    destroyMerchant() {
      this.dialog.alert.loading = true;
      const id = this.form.id;
      axios
        .post("merchant/destroy", { id })
        .then(response => {
          this.table.items = response.data;
          this.table.options.page = 1;
          this.alert.model = true;
          this.alert.text = "Data Berhasil Di Hapus";
          this.fetchMerchant();
        })
        .catch(error => {
          this.alert.model = true;
          this.alert.text = "Terjadi Kesalahan";
        })
        .finally(() => {
          this.dialog.alert.loading = false;
          this.dialog.alert.model = false;
        });
    },
    filterDataProvinsi(item) {
      return this.select.provinsi.find(filter => {
        return filter.id === item;
      }).nama_provinsi;
    },
    filterDataKabupaten(item) {
      const kabupaten = this.select.kabupaten;
      if (kabupaten.length > 0) {
        return kabupaten.find(f => {
          return f.id === item;
        }).nama_kabupaten;
      }
    },
    filterDataKecamatan(item) {
      const kecamatan = this.select.kecamatan;
      if (kecamatan.length > 0) {
        return kecamatan.find(f => {
          return f.id === item;
        }).nama_kecamatan;
      }
    },
    filterDataKelurahan(item) {
      const kelurahan = this.select.kelurahan;
      if (kelurahan.length > 0) {
        return kelurahan.find(f => {
          return f.id === item;
        }).nama_kelurahan;
      }
    },
    dialogProfile(item) {
      this.select.profile = [];
      axios
        .get("merchant/detail", {
          params: {
            id: item
          }
        })
        .then(response => {
          this.select.profile = response.data.data;
          this.dialog.profile.model = true;
        })
        .catch(error => {
          this.alert.model = true;
          this.alert.text = "Terjadi Kesalahan";
        });
    },
    action(item) {
      window.open(item, "_blank");
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
