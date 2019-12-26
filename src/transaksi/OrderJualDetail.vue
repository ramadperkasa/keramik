<template>
  <app>
    <v-row>
      <v-col cols="8">
        <span class="title pl-2">OrderJualDetail</span>
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
          >Apakah anda yakin ingin hapus data OrderJualDetail ini?</v-card-title
        >

        <v-card-text>
          <v-row>
            <v-col cols="1" class="align-self-center pl-1">
              <v-icon large class>mdi-alert-circle</v-icon>
            </v-col>
            <v-col cols="11"
              >Data yang telah di hapus akan terhapus secara permanen, apakah
              anda yakin ingin menghapus data OrderJualDetail ini?</v-col
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
            @click="destroyOrderJualDetail()"
            >Hapus</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialog.form.model" persistent width="750">
      <v-card>
        <v-card-title primary-title>
          <v-icon class="pr-2">{{ icon_form }}</v-icon
          >Input Data OrderJualDetail
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
              v-model="form.order_jual_id"
              label="Order Jual Id *"
              hint="Contoh : Dipointer"
            ></v-text-field>
            <v-text-field
              v-model="form.merchant_produk_id"
              label="Merchant Produk Id *"
              hint="Contoh : Dipointer"
            ></v-text-field>
            <v-text-field
              v-model="form.variant_id"
              label="Variant Id *"
              hint="Contoh : Dipointer"
            ></v-text-field>
            <v-text-field
              v-model="form.harga"
              label="Harga *"
              hint="Contoh : Dipointer"
            ></v-text-field>
            <v-text-field
              v-model="form.jumlah"
              label="Jumlah *"
              hint="Contoh : Dipointer"
            ></v-text-field>
            <v-text-field
              v-model="form.discount"
              label="Discount *"
              hint="Contoh : Dipointer"
            ></v-text-field>
            <v-text-field
              v-model="form.catatan"
              label="Catatan *"
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
                ? updateNewOrderJualDetail()
                : createNewOrderJualDetail()
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
              form.isEdit ? updateOrderJualDetail() : createOrderJualDetail()
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
        order_jual_id: "",
        merchant_produk_id: "",
        variant_id: "",
        harga: "",
        jumlah: "",
        discount: "",
        catatan: "",
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
            text: "Order Jual Id",
            value: "order_jual_id",
            align: "left"
          },
          {
            text: "Merchant Produk Id",
            value: "merchant_produk_id",
            align: "left"
          },
          {
            text: "Variant Id",
            value: "variant_id",
            align: "left"
          },
          {
            text: "Harga",
            value: "harga",
            align: "left"
          },
          {
            text: "Jumlah",
            value: "jumlah",
            align: "left"
          },
          {
            text: "Discount",
            value: "discount",
            align: "left"
          },
          {
            text: "Catatan",
            value: "catatan",
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
      this.fetchOrderJualDetail();
    },
    search(newValue) {
      this.table.options.page = 1;
      this.fetchOrderJualDetail(newValue);
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
    fetchOrderJualDetail() {
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
        .get("orderjualdetail", { params })
        .then(response => {
          this.table.items = response.data.orderjualdetail;
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
      this.form.order_jual_id = "";
      this.form.merchant_produk_id = "";
      this.form.variant_id = "";
      this.form.harga = "";
      this.form.jumlah = "";
      this.form.discount = "";
      this.form.catatan = "";
    },
    editItem(item) {
      this.dialog.form.model = true;
      this.form.isEdit = true;
      this.form.id = item.id;
      this.form.order_jual_id = item.order_jual_id;
      this.form.merchant_produk_id = item.merchant_produk_id;
      this.form.variant_id = item.variant_id;
      this.form.harga = item.harga;
      this.form.jumlah = item.jumlah;
      this.form.discount = item.discount;
      this.form.catatan = item.catatan;
    },
    destroyItem(item) {
      this.dialog.alert.model = true;
      this.form.id = item.id;
      this.form.order_jual_id = item.order_jual_id;
    },
    updateOrderJualDetail() {
      this.dialog.form.loading = true;
      const params = this.form;
      axios
        .post("orderjualdetail/update", params)
        .then(response => {
          this.table.items = response.data;
          this.table.options.page = 1;
          this.dialog.form.model = false;
          this.fetchOrderJualDetail();
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
    createOrderJualDetail() {
      const params = this.form;
      axios
        .post("orderjualdetail/create", params)
        .then(response => {
          this.table.items = response.data;
          this.dialog.form.model = false;
          this.table.options.page = 1;
          this.fetchOrderJualDetail();
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
    updateNewOrderJualDetail() {
      this.dialog.form.loading = true;
      const params = this.form;
      axios
        .post("orderjualdetail/update", params)
        .then(response => {
          this.table.items = response.data;
          this.table.options.page = 1;
          this.alert.model = true;
          this.alert.text = "Data Berhasil Di Edit";
          this.fetchOrderJualDetail();
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
    createNewOrderJualDetail() {
      this.dialog.form.loading = true;
      const params = this.form;
      axios
        .post("orderjualdetail/create", params)
        .then(response => {
          this.table.items = response.data;
          this.table.options.page = 1;
          this.alert.model = true;
          this.alert.text = "Data Berhasil Di Tambah";
          this.fetchOrderJualDetail();
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
    destroyOrderJualDetail() {
      this.dialog.alert.loading = true;
      const id = this.form.id;
      const order_jual_id = this.form.order_jual_id;
      axios
        .post("orderjualdetail/destroy", {id})
        .then(response => {
          this.table.items = response.data;
          this.table.options.page = 1;
          this.alert.model = true;
          this.alert.text = "Data Berhasil Di Hapus";
          this.fetchOrderJualDetail();
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
