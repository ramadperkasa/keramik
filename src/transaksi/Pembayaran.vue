<template>
  <app>
    <v-row>
      <v-col cols="8">
        <span class="title pl-2">Pembayaran</span>
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
          >Apakah anda yakin ingin hapus data Pembayaran ini?</v-card-title
        >

        <v-card-text>
          <v-row>
            <v-col cols="1" class="align-self-center pl-1">
              <v-icon large class>mdi-alert-circle</v-icon>
            </v-col>
            <v-col cols="11"
              >Data yang telah di hapus akan terhapus secara permanen, apakah
              anda yakin ingin menghapus data Pembayaran ini?</v-col
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
            @click="destroyPembayaran()"
            >Hapus</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialog.form.model" persistent width="750">
      <v-card>
        <v-card-title primary-title>
          <v-icon class="pr-2">{{ icon_form }}</v-icon
          >Input Data Pembayaran
          <v-spacer></v-spacer>
          <v-btn text @click="dialog.form.model = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-container>
          <v-card-text>
            <v-text-field
              v-model="form.order_jual_id"
              label="Order Jual Id *"
              hint="Contoh : Dipointer"
            ></v-text-field>
            <v-text-field
              v-model="form.tgl_pembayaran"
              label="Tgl Pembayaran *"
              hint="Contoh : Dipointer"
            ></v-text-field>
            <v-text-field
              v-model="form.jumlah_pembayaran"
              label="Jumlah Pembayaran *"
              hint="Contoh : Dipointer"
            ></v-text-field>
            <v-text-field
              v-model="form.rekening_nomor"
              label="Rekening Nomor *"
              hint="Contoh : Dipointer"
            ></v-text-field>
            <v-text-field
              v-model="form.rekening_nama"
              label="Rekening Nama *"
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
            @click="form.isEdit ? updateNewPembayaran() : createNewPembayaran()"
          >
            <v-icon>mdi-content-save</v-icon>Simpan Baru
          </v-btn>
          <v-btn
            style="text-transform:none"
            color="primary"
            :loading="dialog.form.loading"
            :disabled="dialog.form.loading"
            text
            @click="form.isEdit ? updatePembayaran() : createPembayaran()"
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
        order_jual_id: "",
        tgl_pembayaran: "",
        jumlah_pembayaran: "",
        rekening_nomor: "",
        rekening_nama: "",
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
            text: "Order Jual Id",
            value: "order_jual_id",
            align: "left"
          },
          {
            text: "Tgl Pembayaran",
            value: "tgl_pembayaran",
            align: "left"
          },
          {
            text: "Jumlah Pembayaran",
            value: "jumlah_pembayaran",
            align: "left"
          },
          {
            text: "Rekening Nomor",
            value: "rekening_nomor",
            align: "left"
          },
          {
            text: "Rekening Nama",
            value: "rekening_nama",
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
      this.fetchPembayaran();
    },
    search(newValue) {
      this.table.options.page = 1;
      this.fetchPembayaran(newValue);
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
    fetchPembayaran() {
      this.loading.table = true;
      const data = {
        page: this.table.options.page,
        size: this.table.options.itemsPerPage,
        field:
          this.table.options.sortBy[0] == null
            ? "order_jual_id"
            : this.table.options.sortBy[0],
        sortBy: this.table.options.sortDesc[0] ? "desc" : "asc",
        search: this.search
      };

      const params = data;
      axios
        .get("pembayaran", { params })
        .then(response => {
          this.table.items = response.data.pembayaran;
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
      this.form.order_jual_id = "";
      this.form.tgl_pembayaran = "";
      this.form.jumlah_pembayaran = "";
      this.form.rekening_nomor = "";
      this.form.rekening_nama = "";
    },
    editItem(item) {
      this.dialog.form.model = true;
      this.form.isEdit = true;
      this.form.order_jual_id = item.order_jual_id;
      this.form.tgl_pembayaran = item.tgl_pembayaran;
      this.form.jumlah_pembayaran = item.jumlah_pembayaran;
      this.form.rekening_nomor = item.rekening_nomor;
      this.form.rekening_nama = item.rekening_nama;
    },
    destroyItem(item) {
      this.dialog.alert.model = true;
      this.form.order_jual_id = item.order_jual_id;
    },
    updatePembayaran() {
      this.dialog.form.loading = true;
      const params = this.form;
      axios
        .post("pembayaran/update", params)
        .then(response => {
          this.table.items = response.data;
          this.table.options.page = 1;
          this.dialog.form.model = false;
          this.fetchPembayaran();
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
    createPembayaran() {
      const params = this.form;
      axios
        .post("pembayaran/create", params)
        .then(response => {
          this.table.items = response.data;
          this.dialog.form.model = false;
          this.table.options.page = 1;
          this.fetchPembayaran();
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
    updateNewPembayaran() {
      this.dialog.form.loading = true;
      const params = this.form;
      axios
        .post("pembayaran/update", params)
        .then(response => {
          this.table.items = response.data;
          this.table.options.page = 1;
          this.alert.model = true;
          this.alert.text = "Data Berhasil Di Edit";
          this.fetchPembayaran();
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
    createNewPembayaran() {
      this.dialog.form.loading = true;
      const params = this.form;
      axios
        .post("pembayaran/create", params)
        .then(response => {
          this.table.items = response.data;
          this.table.options.page = 1;
          this.alert.model = true;
          this.alert.text = "Data Berhasil Di Tambah";
          this.fetchPembayaran();
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
    destroyPembayaran() {
      this.dialog.alert.loading = true;
      const order_jual_id = this.form.order_jual_id;
      axios
        .post("pembayaran/destroy", {id})
        .then(response => {
          this.table.items = response.data;
          this.table.options.page = 1;
          this.alert.model = true;
          this.alert.text = "Data Berhasil Di Hapus";
          this.fetchPembayaran();
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
