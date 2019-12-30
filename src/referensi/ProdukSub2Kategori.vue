<template>
  <app>
    <v-row>
      <v-col cols="8">
        <span class="title pl-2">Sub Kategori 2</span>
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
        <v-card-title class="title">
          Apakah anda yakin ingin hapus data Sub Kategori 2
          ini?
        </v-card-title>

        <v-card-text>
          <v-row>
            <v-col cols="1" class="align-self-center pl-1">
              <v-icon large class>mdi-alert-circle</v-icon>
            </v-col>
            <v-col cols="11">
              Data yang telah di hapus akan terhapus secara permanen, apakah
              anda yakin ingin menghapus data Sub Kategori 2 ini?
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
            @click="destroyProdukSub2Kategori()"
          >Hapus</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialog.form.model" persistent width="750">
      <v-card>
        <v-card-title primary-title>
          <v-icon class="pr-2">{{ icon_form }}</v-icon>Input Data Sub Kategori 2
          <v-spacer></v-spacer>
          <v-btn text @click="dialog.form.model = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-container>
          <v-card-text>
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
            <v-text-field v-model="form.nama" label="Nama *" hint="Contoh : Dipointer"></v-text-field>
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
                ? updateNewProdukSub2Kategori()
                : createNewProdukSub2Kategori()
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
              form.isEdit
                ? updateProdukSub2Kategori()
                : createProdukSub2Kategori()
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
        produk_kategori_id: "",
        produk_subkategori_id1: "",
        nama: "",
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
            text: "Produk Sub1 Kategori Id",
            value: "produk_sub1_kategori_id",
            align: "left"
          },
          {
            text: "Nama",
            value: "nama",
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
      select: {
        kategori1: [],
        kategori2: []
      },
      loading: {
        table: false,
        kategori1: false,
        kategori2: false
      }
    };
  },
  watch: {
    "table.options"(newValue, oldValue) {
      this.fetchProdukSub2Kategori();
    },
    search(newValue) {
      this.table.options.page = 1;
      this.fetchProdukSub2Kategori(newValue);
    },
    "form.produk_kategori_id"(newValue) {
      this.form.produk_subkategori_id1 = "";
      this.form.produk_subkategori_id2 = "";
      this.fetchProdukKategori2(newValue);
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
    this.fetchProdukKategori();
  },
  methods: {
    fetchProdukSub2Kategori() {
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
      this.axios
        .get("produk/subkategori2", { params })
        .then(response => {
          this.table.items = response.data.produk_kategori;
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
    addItem() {
      this.form.isEdit = false;
      this.dialog.form.model = true;
      this.form.id = "";
      this.form.produk_sub1_kategori_id = "";
      this.form.nama = "";
    },
    editItem(item) {
      this.dialog.form.model = true;
      this.form.isEdit = true;
      this.form.id = item.id;
      this.form.produk_sub1_kategori_id = item.produk_sub1_kategori_id;
      this.form.nama = item.nama;
    },
    destroyItem(item) {
      this.dialog.alert.model = true;
      this.form.id = item.id;
    },
    updateProdukSub2Kategori() {
      this.dialog.form.loading = true;
      const params = this.form;
      this.axios
        .post("produk/subkategori2/update", params)
        .then(response => {
          this.table.items = response.data;
          this.table.options.page = 1;
          this.dialog.form.model = false;
          this.fetchProdukSub2Kategori();
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
    createProdukSub2Kategori() {
      const params = this.form;
      this.axios
        .post("produk/subkategori2/create", params)
        .then(response => {
          this.table.items = response.data;
          this.dialog.form.model = false;
          this.table.options.page = 1;
          this.fetchProdukSub2Kategori();
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
    updateNewProdukSub2Kategori() {
      this.dialog.form.loading = true;
      const params = this.form;
      this.axios
        .post("produk/subkategori2/update", params)
        .then(response => {
          this.table.items = response.data;
          this.table.options.page = 1;
          this.alert.model = true;
          this.alert.text = "Data Berhasil Di Edit";
          this.fetchProdukSub2Kategori();
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
    createNewProdukSub2Kategori() {
      this.dialog.form.loading = true;
      const params = this.form;
      this.axios
        .post("produk/subkategori2/create", params)
        .then(response => {
          this.table.items = response.data;
          this.table.options.page = 1;
          this.alert.model = true;
          this.alert.text = "Data Berhasil Di Tambah";
          this.fetchProdukSub2Kategori();
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
    destroyProdukSub2Kategori() {
      this.dialog.alert.loading = true;
      const id = this.form.id;
      this.axios
        .post("produk/subkategori2/destroy", { id })
        .then(response => {
          this.table.items = response.data;
          this.table.options.page = 1;
          this.alert.model = true;
          this.alert.text = "Data Berhasil Di Hapus";
          this.fetchProdukSub2Kategori();
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
    }
  }
};
</script>

<style lang="scss" scoped></style>
