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
      <template v-slot:item.action="{ item }">
        <v-tooltip left>
          <template v-slot:activator="{ on }">
            <v-icon v-on="on" small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
          </template>
          <span color="primary">Edit</span>
        </v-tooltip>
        <v-tooltip right>
          <template v-slot:activator="{ on }">
            <v-icon v-on="on" small @click="destroyItem(item)">mdi-delete</v-icon>
          </template>
          <span>Hapus</span>
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
            <v-text-field
              v-model="form.merchant_id"
              label="Merchant Id *"
              hint="Contoh : Dipointer"
            ></v-text-field>
            <v-text-field
              v-model="form.nama_produk"
              label="Nama Produk *"
              hint="Contoh : Dipointer"
            ></v-text-field>
            <v-text-field
              v-model="form.produk_kategori_id"
              label="Produk Kategori Id *"
              hint="Contoh : Dipointer"
            ></v-text-field>
            <v-text-field
              v-model="form.deskripsi_produk"
              label="Deskripsi Produk *"
              hint="Contoh : Dipointer"
            ></v-text-field>
            <v-text-field
              v-model="form.kode_produk_barang"
              label="Kode Produk Barang *"
              hint="Contoh : Dipointer"
            ></v-text-field>
            <v-text-field
              v-model="form.berat_produk"
              label="Berat Produk *"
              hint="Contoh : Dipointer"
            ></v-text-field>
            <v-text-field v-model="form.kondisi" label="Kondisi *" hint="Contoh : Dipointer"></v-text-field>
            <v-text-field
              v-model="form.status_produk"
              label="Status Produk *"
              hint="Contoh : Dipointer"
            ></v-text-field>
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
        }
      },
      form: {
        id: "",
        merchant_id: "",
        nama_produk: "",
        produk_kategori_id: "",
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
            text: "Kode Barang",
            value: "kode_produk_barang",
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
        items: []
      },
      alert: {
        model: false,
        text: ""
      },
      loading: {
        table: false
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
      this.axios
        .post("merchant/produk/destroy", { id })
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
    }
  }
};
</script>

<style lang="scss" scoped></style>
