<template>
  <app>
    <v-row>
      <v-col cols="8">
        <span class="title pl-2">OrderJual</span>
      </v-col>
      <v-spacer></v-spacer>
      <div class="pr-4 align-self-center">
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn
              v-on="on"
              text
              color="primary"
              class="mr-3"
              @click="addItem()"
            >
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
      <template v-slot:item.no="{ item }">{{
        table.items.data.indexOf(item) + table.items.from
      }}</template>
      <template v-slot:item.action="{ item }">
        <v-tooltip left>
          <template v-slot:activator="{ on }">
            <v-icon v-on="on" small class="mr-2" @click="editItem(item)"
              >mdi-pencil</v-icon
            >
          </template>
          <span color="primary">Edit</span>
        </v-tooltip>
        <v-tooltip right>
          <template v-slot:activator="{ on }">
            <v-icon v-on="on" small @click="destroyItem(item)"
              >mdi-delete</v-icon
            >
          </template>
          <span>Hapus</span>
        </v-tooltip>
      </template>
    </v-data-table>

    <v-dialog v-model="dialog.alert.model" max-width="500">
      <v-card>
        <v-card-title class="title"
          >Apakah anda yakin ingin hapus data OrderJual ini?</v-card-title
        >

        <v-card-text>
          <v-row>
            <v-col cols="1" class="align-self-center pl-1">
              <v-icon large class>mdi-alert-circle</v-icon>
            </v-col>
            <v-col cols="11"
              >Data yang telah di hapus akan terhapus secara permanen, apakah
              anda yakin ingin menghapus data OrderJual ini?</v-col
            >
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
            >Batal</v-btn
          >
          <v-btn
            color="primary"
            :loading="dialog.alert.loading"
            :disabled="dialog.alert.loading"
            text
            @click="destroyOrderJual()"
            >Hapus</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialog.form.model" persistent width="750">
      <v-card>
        <v-card-title primary-title>
          <v-icon class="pr-2">{{ icon_form }}</v-icon
          >Input Data OrderJual
          <v-spacer></v-spacer>
          <v-btn text @click="dialog.form.model = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-container>
          <v-card-text>
            <v-text-field
              v-model="form.id"
              label="Id *"
              hint="Contoh : Dipointer"
            ></v-text-field>
            <v-text-field
              v-model="form.tgl_transaksi"
              label="Tgl Transaksi *"
              hint="Contoh : Dipointer"
            ></v-text-field>
            <v-text-field
              v-model="form.konsumen_id"
              label="Konsumen Id *"
              hint="Contoh : Dipointer"
            ></v-text-field>
            <v-text-field
              v-model="form.pengiriman_alamat"
              label="Pengiriman Alamat *"
              hint="Contoh : Dipointer"
            ></v-text-field>
            <v-text-field
              v-model="form.pengiriman_provinsi_id"
              label="Pengiriman Provinsi Id *"
              hint="Contoh : Dipointer"
            ></v-text-field>
            <v-text-field
              v-model="form.pengiriman_kabupaten_id"
              label="Pengiriman Kabupaten Id *"
              hint="Contoh : Dipointer"
            ></v-text-field>
            <v-text-field
              v-model="form.pengiriman_kecamatan_id"
              label="Pengiriman Kecamatan Id *"
              hint="Contoh : Dipointer"
            ></v-text-field>
            <v-text-field
              v-model="form.pengiriman_kelurahan_id"
              label="Pengiriman Kelurahan Id *"
              hint="Contoh : Dipointer"
            ></v-text-field>
            <v-text-field
              v-model="form.metode_pengiriman_id"
              label="Metode Pengiriman Id *"
              hint="Contoh : Dipointer"
            ></v-text-field>
            <v-text-field
              v-model="form.metode_pembayaran_id"
              label="Metode Pembayaran Id *"
              hint="Contoh : Dipointer"
            ></v-text-field>
            <v-text-field
              v-model="form.cashback_nomimal"
              label="Cashback Nomimal *"
              hint="Contoh : Dipointer"
            ></v-text-field>
            <v-text-field
              v-model="form.cashback_persentase"
              label="Cashback Persentase *"
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
            @click="form.isEdit ? updateNewOrderJual() : createNewOrderJual()"
          >
            <v-icon>mdi-content-save</v-icon>Simpan Baru
          </v-btn>
          <v-btn
            style="text-transform:none"
            color="primary"
            :loading="dialog.form.loading"
            :disabled="dialog.form.loading"
            text
            @click="form.isEdit ? updateOrderJual() : createOrderJual()"
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
        tgl_transaksi: "",
        konsumen_id: "",
        pengiriman_alamat: "",
        pengiriman_provinsi_id: "",
        pengiriman_kabupaten_id: "",
        pengiriman_kecamatan_id: "",
        pengiriman_kelurahan_id: "",
        metode_pengiriman_id: "",
        metode_pembayaran_id: "",
        cashback_nomimal: "",
        cashback_persentase: "",
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
            text: "Id",
            value: "id",
            align: "left"
          },
          {
            text: "Tgl Transaksi",
            value: "tgl_transaksi",
            align: "left"
          },
          {
            text: "Konsumen Id",
            value: "konsumen_id",
            align: "left"
          },
          {
            text: "Pengiriman Alamat",
            value: "pengiriman_alamat",
            align: "left"
          },
          {
            text: "Pengiriman Provinsi Id",
            value: "pengiriman_provinsi_id",
            align: "left"
          },
          {
            text: "Pengiriman Kabupaten Id",
            value: "pengiriman_kabupaten_id",
            align: "left"
          },
          {
            text: "Pengiriman Kecamatan Id",
            value: "pengiriman_kecamatan_id",
            align: "left"
          },
          {
            text: "Pengiriman Kelurahan Id",
            value: "pengiriman_kelurahan_id",
            align: "left"
          },
          {
            text: "Metode Pengiriman Id",
            value: "metode_pengiriman_id",
            align: "left"
          },
          {
            text: "Metode Pembayaran Id",
            value: "metode_pembayaran_id",
            align: "left"
          },
          {
            text: "Cashback Nomimal",
            value: "cashback_nomimal",
            align: "left"
          },
          {
            text: "Cashback Persentase",
            value: "cashback_persentase",
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
      this.fetchOrderJual();
    },
    search(newValue) {
      this.table.options.page = 1;
      this.fetchOrderJual(newValue);
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
    fetchOrderJual() {
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
        .get("orderjual", { params })
        .then(response => {
          this.table.items = response.data.orderjual;
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
      this.form.tgl_transaksi = "";
      this.form.konsumen_id = "";
      this.form.pengiriman_alamat = "";
      this.form.pengiriman_provinsi_id = "";
      this.form.pengiriman_kabupaten_id = "";
      this.form.pengiriman_kecamatan_id = "";
      this.form.pengiriman_kelurahan_id = "";
      this.form.metode_pengiriman_id = "";
      this.form.metode_pembayaran_id = "";
      this.form.cashback_nomimal = "";
      this.form.cashback_persentase = "";
    },
    editItem(item) {
      this.dialog.form.model = true;
      this.form.isEdit = true;
      this.form.id = item.id;
      this.form.tgl_transaksi = item.tgl_transaksi;
      this.form.konsumen_id = item.konsumen_id;
      this.form.pengiriman_alamat = item.pengiriman_alamat;
      this.form.pengiriman_provinsi_id = item.pengiriman_provinsi_id;
      this.form.pengiriman_kabupaten_id = item.pengiriman_kabupaten_id;
      this.form.pengiriman_kecamatan_id = item.pengiriman_kecamatan_id;
      this.form.pengiriman_kelurahan_id = item.pengiriman_kelurahan_id;
      this.form.metode_pengiriman_id = item.metode_pengiriman_id;
      this.form.metode_pembayaran_id = item.metode_pembayaran_id;
      this.form.cashback_nomimal = item.cashback_nomimal;
      this.form.cashback_persentase = item.cashback_persentase;
    },
    destroyItem(item) {
      this.dialog.alert.model = true;
      this.form.id = item.id;
    },
    updateOrderJual() {
      this.dialog.form.loading = true;
      const params = this.form;
      axios
        .post("orderjual/update", params)
        .then(response => {
          this.table.items = response.data;
          this.table.options.page = 1;
          this.dialog.form.model = false;
          this.fetchOrderJual();
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
    createOrderJual() {
      const params = this.form;
      axios
        .post("orderjual/create", params)
        .then(response => {
          this.table.items = response.data;
          this.dialog.form.model = false;
          this.table.options.page = 1;
          this.fetchOrderJual();
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
    updateNewOrderJual() {
      this.dialog.form.loading = true;
      const params = this.form;
      axios
        .post("orderjual/update", params)
        .then(response => {
          this.table.items = response.data;
          this.table.options.page = 1;
          this.alert.model = true;
          this.alert.text = "Data Berhasil Di Edit";
          this.fetchOrderJual();
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
    createNewOrderJual() {
      this.dialog.form.loading = true;
      const params = this.form;
      axios
        .post("orderjual/create", params)
        .then(response => {
          this.table.items = response.data;
          this.table.options.page = 1;
          this.alert.model = true;
          this.alert.text = "Data Berhasil Di Tambah";
          this.fetchOrderJual();
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
    destroyOrderJual() {
      this.dialog.alert.loading = true;
      const id = this.form.id;
      axios
        .post("orderjual/destroy", {id})
        .then(response => {
          this.table.items = response.data;
          this.table.options.page = 1;
          this.alert.model = true;
          this.alert.text = "Data Berhasil Di Hapus";
          this.fetchOrderJual();
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
