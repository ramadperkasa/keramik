<template>
  <app>
    <v-row>
      <v-col cols="8">
        <span class="title pl-2">Merchant Produk</span>
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
      <template v-slot:item.foto="{ item }">
        <v-carousel show-arrows-on-hover hide-delimiters height="75">
          <v-carousel-item
            v-for="(item, i) in item.produk_image"
            :key="i"
            reverse-transition="fade-transition"
            transition="fade-transition"
          >
            <v-img
              :src="item.file_nama"
              style="cursor:pointer"
              @click="blank(item.file_nama)"
              contain
              aspect-ratio="1"
              width="75"
            />
          </v-carousel-item>
        </v-carousel>
      </template>
      <template v-slot:item.no="{ item }">
        {{
        table.items.data.indexOf(item) + table.items.from
        }}
      </template>
      <template v-slot:item.produk_kategori_id="{ item }">
        {{
        item.nama_kategori
        }}
      </template>
      <template v-slot:item.status_produk="{ item }">
        {{
        item.status_produk == '0' ? 'Aktif' : 'Tidak Aktif'
        }}
      </template>
      <template v-slot:item.kondisi="{ item }">
        {{
        item.kondisi == '0' ? 'Baru' : 'Bekas'
        }}
      </template>
      <template v-slot:item.berat_produk="{ item }">
        {{
        item.berat_produk+'g'
        }}
      </template>
      <template v-slot:item.action="{ item }">
        <v-tooltip left>
          <template v-slot:activator="{ on }">
            <v-icon
              v-on="on"
              class="mr-2"
              @click="dialog.menu.model = true;dialog.menu.id = item"
            >mdi-dots-vertical</v-icon>
          </template>
          <span color="primary">Lainnya</span>
        </v-tooltip>
      </template>
    </v-data-table>

    <v-dialog v-model="dialog.alert.model" max-width="500">
      <v-card>
        <v-card-title class="title">Apakah anda yakin ingin hapus data Merchant Produk ini?</v-card-title>

        <v-card-text>
          <v-row>
            <v-col cols="1" class="align-self-center pl-1">
              <v-icon large class>mdi-alert-circle</v-icon>
            </v-col>
            <v-col cols="11">
              Data yang telah di hapus akan terhapus secara permanen, apakah
              anda yakin ingin menghapus data Merchant Produk ini?
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
            @click="destroyMerchantProduk()"
          >Hapus</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialog.form.model" persistent width="750">
      <v-card>
        <v-card-title primary-title>
          <v-icon class="pr-2">{{ icon_form }}</v-icon>Input Data Merchant Produk
          <v-spacer></v-spacer>
          <v-btn text @click="dialog.form.model = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-container>
          <v-card-text>
            <v-row>
              <v-col cols="12">
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
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="form.kode_produk_barang"
                  label="Kode Produk Barang *"
                  hint="Contoh : Dipointer"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="form.nama_produk"
                  label="Nama Produk *"
                  hint="Contoh : Dipointer"
                ></v-text-field>
              </v-col>

              <v-col cols="6">
                <v-combobox
                  v-model="form.produk_kategori_id"
                  :items="select.kategori1"
                  item-value="id"
                  label="Kategori *"
                  :return-object="false"
                  item-text="nama_produk_kategori"
                  clearable
                >
                  <template v-slot:selection="data">{{filterDataKategori(data.item)}}</template>
                </v-combobox>
              </v-col>
              <v-col cols="6">
                <v-combobox
                  v-model="form.produk_subkategori_id1"
                  :items="select.kategori2 ? select.kategori2 : []"
                  item-value="id"
                  label="Subkategori 1 *"
                  :return-object="false"
                  item-text="nama"
                  :loading="loading.kategori2"
                  :disabled="!form.produk_kategori_id"
                  clearable
                >
                  <template v-slot:selection="data">{{filterDataSubkategori1(data.item)}}</template>
                </v-combobox>
              </v-col>
              <v-col cols="6">
                <v-combobox
                  v-model="form.produk_subkategori_id2"
                  :items="select.kategori3 ? select.kategori3 : []"
                  item-value="id"
                  label="Subkategori 2 *"
                  :return-object="false"
                  item-text="nama"
                  :loading="loading.kategori3"
                  :disabled="!form.produk_subkategori_id1"
                  clearable
                >
                  <template v-slot:selection="data">{{filterDataSubkategori2(data.item)}}</template>
                </v-combobox>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="form.berat_produk"
                  label="Berat Produk *"
                  suffix="g"
                  hint="Contoh : Dipointer"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-select v-model="form.kondisi" label="Kondisi" :items="select.kondisi"></v-select>
              </v-col>
              <v-col cols="6">
                <v-select
                  v-model="form.status_produk"
                  label="Status Produk *"
                  :items="select.status"
                ></v-select>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  v-model="form.deskripsi_produk"
                  label="Deskripsi Produk *"
                  hint="Contoh : Dipointer"
                ></v-textarea>
              </v-col>
            </v-row>
          </v-card-text>
          <small>*Isian yang harus di isi</small>
        </v-container>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            style="text-transform:none"
            color="primary"
            :loading="dialog.form.loading"
            :disabled="dialog.form.loading"
            text
            @click="
              form.isEdit
                ? updateNewMerchantProduk()
                : createNewMerchantProduk()
            "
          >
            <v-icon>mdi-content-save</v-icon>Simpan Baru
          </v-btn>
          <v-btn
            style="text-transform:none"
            color="primary"
            :loading="dialog.form.loading"
            :disabled="dialog.form.loading"
            text
            @click="
              form.isEdit ? updateMerchantProduk() : createMerchantProduk()
            "
          >
            <v-icon>mdi-content-save-move</v-icon>Simpan
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-snackbar v-model="alert.model" bottom left :timeout="3000">
      {{ alert.text }}
      <v-btn color="primary" text @click="alert.model = false">Tutup</v-btn>
    </v-snackbar>

    <v-bottom-sheet v-model="dialog.menu.model">
      <v-list>
        <v-subheader>Dialog Menu</v-subheader>
        <v-list-item @click="dialog.menu.model = false;editItem(dialog.menu.id.id)">
          <v-list-item-avatar>
            <v-icon size="32px" tile>mdi-pencil-outline</v-icon>
          </v-list-item-avatar>
          <v-list-item-title>Edit Data Produk</v-list-item-title>
        </v-list-item>
        <v-list-item @click="dialog.menu.model = false;destroyItem(dialog.menu.id.id)">
          <v-list-item-avatar>
            <v-icon size="32px" tile>mdi-trash-can-outline</v-icon>
          </v-list-item-avatar>
          <v-list-item-title>Hapus Data Produk</v-list-item-title>
        </v-list-item>
        <v-list-item @click="dialog.menu.model = false;dialog.profile.model = true;">
          <v-list-item-avatar>
            <v-icon size="32px" tile>mdi-eye-outline</v-icon>
          </v-list-item-avatar>
          <v-list-item-title>Lihat Data Produk</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-bottom-sheet>
    <v-dialog fullscreen hide-overlay v-model="dialog.profile.model">
      <v-card>
        <v-card-title primary-title>
          <v-icon class="pr-2">mdi-information-outline</v-icon>Detail Produk
          <v-spacer></v-spacer>
          <v-btn text @click="dialog.profile.model = false;dialog.profile.variant = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-container v-if="!dialog.profile.variant">
          <v-card-text>
            <p class="display-1 text-center">Detail Produk</p>
            <p
              class="subtitle text-center"
            >Info dasar, seperti nama dan foto, yang digunakan untuk aplikasi ini</p>

            <v-card class="mx-auto" width="75%" outlined>
              <v-list-item three-line>
                <v-list-item-content>
                  <v-list-item-title class="headline mb-1">Detail Produk</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Foto Produk</v-list-item-title>
                </v-list-item-content>
                <v-list-item-content>
                  <v-list-item-subtitle>Foto produk, yang akan di tampilkan di user</v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-avatar>
                  <v-carousel show-arrows-on-hover hide-delimiters height="75">
                    <v-carousel-item
                      v-for="(item, i) in dialog.menu.id.produk_image"
                      :key="i"
                      reverse-transition="fade-transition"
                      transition="fade-transition"
                    >
                      <v-img
                        :src="item.file_nama"
                        style="cursor:pointer"
                        @click="blank(item.file_nama)"
                        contain
                        aspect-ratio="1"
                        width="175"
                      />
                    </v-carousel-item>
                  </v-carousel>
                </v-list-item-avatar>
              </v-list-item>
              <v-divider></v-divider>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Kode Produk</v-list-item-title>
                </v-list-item-content>
                <v-list-item-content>
                  <v-list-item-subtitle
                    style="white-space:normal"
                  >{{dialog.menu.id.kode_produk_barang}}</v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-avatar></v-list-item-avatar>
              </v-list-item>
              <v-divider></v-divider>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Nama Produk</v-list-item-title>
                </v-list-item-content>
                <v-list-item-content>
                  <v-list-item-subtitle style="white-space:normal">{{dialog.menu.id.nama_produk}}</v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-avatar></v-list-item-avatar>
              </v-list-item>
              <v-divider></v-divider>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Kategori Produk</v-list-item-title>
                </v-list-item-content>
                <v-list-item-content>
                  <v-list-item-subtitle
                    style="white-space:normal"
                  >{{dialog.menu.id.kategori ? dialog.menu.id.kategori.nama : ''}}</v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-avatar></v-list-item-avatar>
              </v-list-item>
              <v-divider></v-divider>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Berat Produk</v-list-item-title>
                </v-list-item-content>
                <v-list-item-content>
                  <v-list-item-subtitle
                    style="white-space:normal"
                  >{{dialog.menu.id.berat_produk+'g'}}</v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-avatar></v-list-item-avatar>
              </v-list-item>
              <v-divider></v-divider>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Kondisi Produk</v-list-item-title>
                </v-list-item-content>
                <v-list-item-content>
                  <v-list-item-subtitle
                    style="white-space:normal"
                  >{{dialog.menu.id.kondisi == '0' ? 'Baru' : 'Bekas'}}</v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-avatar></v-list-item-avatar>
              </v-list-item>
              <v-divider></v-divider>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Status Produk</v-list-item-title>
                </v-list-item-content>
                <v-list-item-content>
                  <v-list-item-subtitle
                    style="white-space:normal"
                  >{{dialog.menu.id.status_produk == '0' ? 'Aktif' : 'Tidak Aktif'}}</v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-avatar></v-list-item-avatar>
              </v-list-item>

              <v-divider></v-divider>
              <v-list-item @click="dialog.profile.variant = true">
                <v-list-item-content>
                  <v-list-item-title>Variant</v-list-item-title>
                </v-list-item-content>
                <v-list-item-content>
                  <v-list-item-subtitle style="white-space:normal">Varian di produk produk anda</v-list-item-subtitle>
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
                  <v-list-item-title>Deskripsi</v-list-item-title>
                </v-list-item-content>
                <v-list-item-content>
                  <v-list-item-subtitle
                    style="white-space:normal"
                  >{{dialog.menu.id.deskripsi_produk}}</v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-avatar></v-list-item-avatar>
              </v-list-item>
            </v-card>
          </v-card-text>
        </v-container>
        <v-card-text v-else>
          <p class="display-1 text-center pa-3">
            <v-btn icon>
              <v-icon large @click="dialog.profile.variant=false">mdi-arrow-left</v-icon>
            </v-btn>
            <span class="pl-3">Detail Variant</span>
          </p>
          <v-data-table
            flat
            :headers="table.variant"
            :items="dialog.menu.id.produk_variant"
            width="100%"
            hide-default-footer
          >
            <template v-slot:item.nama="{ item }">
              {{
              item.merchant_variant.nama_variant
              }}
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-dialog>
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
        menu: {
          model: false,
          loading: false,
          id: ""
        },
        profile: {
          model: false,
          loading: false,
          variant: false
        }
      },
      form: {
        id: "",
        merchant_id: "",
        nama_produk: "",
        produk_kategori_id: "",
        produk_subkategori_id1: "",
        produk_subkategori_id2: "",
        deskripsi_produk: "",
        kode_produk_barang: "",
        berat_produk: "",
        kondisi: "",
        status_produk: "",
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
            text: "Kode Barang",
            value: "kode_produk_barang",
            align: "left"
          },
          {
            text: "Foto",
            value: "foto",
            align: "left"
          },
          {
            text: "Nama",
            value: "nama_produk",
            align: "left"
          },
          {
            text: "Kategori",
            value: "produk_kategori_id",
            align: "left"
          },
          {
            text: "Berat",
            value: "berat_produk",
            align: "left"
          },
          {
            text: "Kondisi",
            value: "kondisi",
            align: "left"
          },
          {
            text: "Status",
            value: "status_produk",
            align: "left"
          },
          {
            text: "Action",
            value: "action",
            sortable: false,
            width: "10%"
          }
        ],
        variant: [
          { text: "Nama Variant", value: "nama", align: "left" },
          { text: "Harga", value: "harga", align: "left" },
          { text: "Stok", value: "stok", align: "left" },
          { text: "Stok Minimum", value: "stok_minimum", align: "left" }
        ],
        items: []
      },
      alert: {
        model: false,
        text: ""
      },
      select: {
        kondisi: [
          {
            value: "0",
            text: "Baru"
          },
          {
            value: "1",
            text: "Bekas"
          }
        ],
        status: [
          {
            value: "0",
            text: "Aktif"
          },
          {
            value: "1",
            text: "Tidak Aktif"
          }
        ],
        kategori1: [],
        kategori2: [],
        kategori3: [],
        profile: {}
      },
      loading: {
        table: false,
        kategori1: false,
        kategori2: false,
        kategori3: false
      }
    };
  },
  watch: {
    "table.options"(newValue, oldValue) {
      this.fetchMerchantProduk();
    },
    search(newValue) {
      this.table.options.page = 1;
      this.fetchMerchantProduk(newValue);
    },
    "form.produk_kategori_id"(newValue) {
      this.form.produk_subkategori_id1 = "";
      this.form.produk_subkategori_id2 = "";
      this.fetchProdukKategori2(newValue);
    },
    "form.produk_subkategori_id1"(newValue) {
      console.log(newValue);
      this.form.produk_subkategori_id2 = "";
      this.fetchProdukKategori3(newValue);
    }
  },
  mounted() {
    this.fetchProdukKategori();
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
  methods: {
    fetchMerchantProduk() {
      this.loading.table = true;
      const data = {
        page: this.table.options.page,
        size: this.table.options.itemsPerPage,
        field:
          this.table.options.sortBy[0] == null
            ? "id"
            : this.table.options.sortBy[0],
        sortBy: this.table.options.sortDesc[0] ? "desc" : "asc",
        search: this.search,
        merchant_id: this.$route.params.id
      };
      const params = data;
      this.axios
        .get("merchant/produk", { params })
        .then(response => {
          this.table.items = response.data.data;
        })
        .catch(error => {
          this.alert.model = true;
          this.alert.text = "Terjadi Kesalahan";
        })
        .finally(() => {
          this.loading.table = false;
        });
    },
    fetchProdukKategori() {
      this.axios
        .get("get/produk/kategori")
        .then(response => {
          this.select.kategori1 = response.data.kategori;
        })
        .catch(error => {
          this.alert.model = true;
          this.alert.text = "Terjadi Kesalahan";
        });
    },
    fetchProdukKategori2(produk_kategori_id) {
      this.form.produk_kategori_id2 = this.form.produk_kategori_id3;
      this.select.kategori2 = [];
      this.loading.kategori2 = true;
      const data = {
        produk_kategori_id
      };
      const params = data;
      this.axios
        .get("get/produk/subkategori1", { params })
        .then(response => {
          this.select.kategori2 = response.data.kategori;
        })
        .catch(error => {
          this.alert.model = true;
          this.alert.text = "Terjadi Kesalahan";
        })
        .finally(() => {
          this.loading.kategori2 = false;
        });
    },
    fetchProdukKategori3(produk_sub1_kategori_id) {
      this.form.produk_kategori_id3 = this.form.produk_kategori_id3;
      this.select.kategori3 = [];
      this.loading.kategori3 = true;
      const data = {
        produk_sub1_kategori_id
      };
      const params = data;
      this.axios
        .get("get/produk/subkategori2", { params })
        .then(response => {
          this.select.kategori3 = response.data.kategori;
        })
        .catch(error => {
          this.alert.model = true;
          this.alert.text = "Terjadi Kesalahan";
        })
        .finally(() => {
          this.loading.kategori3 = false;
        });
    },
    addItem() {
      this.form.isEdit = false;
      this.dialog.form.model = true;
      this.form.id = "";
      this.form.merchant_id = "";
      this.form.nama_produk = "";
      this.form.produk_kategori_id = "";
      this.form.deskripsi_produk = "";
      this.form.kode_produk_barang = "";
      this.form.berat_produk = "";
      this.form.kondisi = "";
      this.form.status_produk = "";
    },
    editItem(item) {
      this.dialog.form.model = true;
      this.form.isEdit = true;
      this.form.id = item.id;
      this.form.merchant_id = item.merchant_id;
      this.form.nama_produk = item.nama_produk;
      this.form.produk_kategori_id = item.produk_kategori_id;
      this.form.deskripsi_produk = item.deskripsi_produk;
      this.form.kode_produk_barang = item.kode_produk_barang;
      this.form.berat_produk = item.berat_produk;
      this.form.kondisi = item.kondisi;
      this.form.status_produk = item.status_produk;
    },
    destroyItem(item) {
      this.dialog.alert.model = true;
      this.form.id = item.id;
    },
    updateMerchantProduk() {
      this.dialog.form.loading = true;
      this.form.merchant_id = this.$route.params.id;
      const params = this.form;
      this.axios
        .post("merchant/produk/update", params)
        .then(response => {
          this.table.items = response.data;
          this.table.options.page = 1;
          this.dialog.form.model = false;
          this.fetchMerchantProduk();
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
    createMerchantProduk() {
      this.form.merchant_id = this.$route.params.id;
      const params = this.form;
      this.axios
        .post("merchant/produk/create", params)
        .then(response => {
          this.table.items = response.data;
          this.dialog.form.model = false;
          this.table.options.page = 1;
          this.fetchMerchantProduk();
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
    updateNewMerchantProduk() {
      this.dialog.form.loading = true;
      this.form.merchant_id = this.$route.params.id;
      const params = this.form;
      this.axios
        .post("merchant/produk/update", params)
        .then(response => {
          this.table.items = response.data;
          this.table.options.page = 1;
          this.alert.model = true;
          this.alert.text = "Data Berhasil Di Edit";
          this.fetchMerchantProduk();
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
    createNewMerchantProduk() {
      this.dialog.form.loading = true;
      this.form.merchant_id = this.$route.params.id;
      const params = this.form;
      this.axios
        .post("merchant/produk/create", params)
        .then(response => {
          this.table.items = response.data;
          this.table.options.page = 1;
          this.alert.model = true;
          this.alert.text = "Data Berhasil Di Tambah";
          this.fetchMerchantProduk();
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
    destroyMerchantProduk() {
      this.dialog.alert.loading = true;
      const id = this.form.id;
      const merchant_id = this.$route.params.id;
      this.axios
        .post("merchant/produk/destroy", { id, merchant_id })
        .then(response => {
          this.table.items = response.data;
          this.table.options.page = 1;
          this.alert.model = true;
          this.alert.text = "Data Berhasil Di Hapus";
          this.fetchMerchantProduk();
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
    blank(item) {
      window.open(item, "_blank");
    },
    dialogProfile(item) {
      this.menu.id = [];
      this.axios
        .get("merchant/produk/detail", {
          params: {
            id: item
          }
        })
        .then(response => {
          this.menu.id = response.data.data;
          this.dialog.profile.model = true;
        })
        .catch(error => {
          this.alert.model = true;
          this.alert.text = "Terjadi Kesalahan";
        });
    },
    filterDataKategori(item) {
      const kategori1 = this.select.kategori1;
      if (kategori1.length > 0) {
        return kategori1.find(f => {
          return f.id === item;
        }).nama_produk_kategori;
      }
    },
    filterDataSubkategori1(item) {
      const kategori2 = this.select.kategori2;
      if (kategori2.length > 0) {
        return kategori2.find(f => {
          return f.id === item;
        }).nama;
      }
    },
    filterDataSubkategori2(item) {
      const kategori3 = this.select.kategori3;
      if (kategori3.length > 0) {
        return kategori3.find(f => {
          return f.id === item;
        }).nama;
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
