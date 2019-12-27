<template>
  <app>
    <v-row>
      <v-col cols="8">
        <span class="title pl-2">Merchant Operasional</span>
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
      <template v-slot:item.hari_id="{ item }">
        {{
        item.nama_hari
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
        <v-card-title class="title">
          Apakah anda yakin ingin hapus data Merchant Operasional
          ini?
        </v-card-title>

        <v-card-text>
          <v-row>
            <v-col cols="1" class="align-self-center pl-1">
              <v-icon large class>mdi-alert-circle</v-icon>
            </v-col>
            <v-col cols="11">
              Data yang telah di hapus akan terhapus secara permanen, apakah
              anda yakin ingin menghapus data Merchant Operasional ini?
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
            @click="destroyMerchantOperasional()"
          >Hapus</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialog.form.model" persistent width="750">
      <v-card>
        <v-card-title primary-title>
          <v-icon class="pr-2">{{ icon_form }}</v-icon>Input Data Merchant Operasional
          <v-spacer></v-spacer>
          <v-btn text @click="dialog.form.model = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-container>
          <v-card-text>
            <v-combobox
              v-model="form.hari_id"
              :items="select.hari"
              label="Nama hari *"
              item-value="id"
              item-text="nama_hari"
              :return-object="false"
              clearable
            >
              <template v-slot:selection="data">{{filterDataHari(data.item)}}</template>
            </v-combobox>
            <v-text-field v-model="form.jam_buka" label="Jam Buka *" hint="Contoh : Dipointer"></v-text-field>
            <v-text-field v-model="form.jam_tutup" label="Jam Tutup *" hint="Contoh : Dipointer"></v-text-field>
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
                ? updateNewMerchantOperasional()
                : createNewMerchantOperasional()
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
                ? updateMerchantOperasional()
                : createMerchantOperasional()
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
        hari_id: "",
        merchant_id: "",
        jam_buka: "",
        jam_tutup: "",
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
            text: "Hari",
            value: "hari_id",
            align: "left"
          },
          {
            text: "Jam Buka",
            value: "jam_buka",
            align: "left"
          },
          {
            text: "Jam Tutup",
            value: "jam_tutup",
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
      },
      select: {
        hari: ""
      }
    };
  },
  watch: {
    "table.options"(newValue, oldValue) {
      this.fetchMerchantOperasional();
    },
    search(newValue) {
      this.table.options.page = 1;
      this.fetchMerchantOperasional(newValue);
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
    this.fetchHari();
  },
  methods: {
    fetchMerchantOperasional() {
      this.loading.table = true;
      const data = {
        page: this.table.options.page,
        size: this.table.options.itemsPerPage,
        field:
          this.table.options.sortBy[0] == null
            ? "hari_id"
            : this.table.options.sortBy[0],
        sortBy: this.table.options.sortDesc[0] ? "desc" : "asc",
        search: this.search,
        merchant_id: this.$route.params.id
      };

      const params = data;
      this.axios
        .get("merchant/operasional", { params })
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
    fetchHari() {
      this.axios
        .get("get/hari")
        .then(response => {
          this.select.hari = response.data.hari;
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.loading.table = false;
        });
    },
    addItem() {
      this.form.isEdit = false;
      this.dialog.form.model = true;
      this.form.hari_id = "";
      this.form.merchant_id = "";
      this.form.jam_buka = "";
      this.form.jam_tutup = "";
    },
    editItem(item) {
      this.dialog.form.model = true;
      this.form.isEdit = true;
      this.form.hari_id = item.hari_id;
      this.form.merchant_id = item.merchant_id;
      this.form.jam_buka = item.jam_buka;
      this.form.jam_tutup = item.jam_tutup;
    },
    destroyItem(item) {
      this.dialog.alert.model = true;
      this.form.hari_id = item.hari_id;
      this.form.merchant_id = item.merchant_id;
    },
    updateMerchantOperasional() {
      this.dialog.form.loading = true;
      this.form.merchant_id = this.$route.params.id;
      const params = this.form;
      this.axios
        .post("merchant/operasional/update", params)
        .then(response => {
          this.table.items = response.data;
          this.table.options.page = 1;
          this.dialog.form.model = false;
          this.fetchMerchantOperasional();
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
    createMerchantOperasional() {
      this.form.merchant_id = this.$route.params.id;
      const params = this.form;
      this.axios
        .post("merchant/operasional/create", params)
        .then(response => {
          this.table.items = response.data;
          this.dialog.form.model = false;
          this.table.options.page = 1;
          this.fetchMerchantOperasional();
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
    updateNewMerchantOperasional() {
      this.dialog.form.loading = true;
      this.form.merchant_id = this.$route.params.id;
      const params = this.form;
      this.axios
        .post("merchant/operasional/update", params)
        .then(response => {
          this.table.items = response.data;
          this.table.options.page = 1;
          this.alert.model = true;
          this.alert.text = "Data Berhasil Di Edit";
          this.fetchMerchantOperasional();
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
    createNewMerchantOperasional() {
      this.dialog.form.loading = true;
      this.form.merchant_id = this.$route.params.id;
      const params = this.form;
      this.axios
        .post("merchant/operasional/create", params)
        .then(response => {
          this.table.items = response.data;
          this.table.options.page = 1;
          this.alert.model = true;
          this.alert.text = "Data Berhasil Di Tambah";
          this.fetchMerchantOperasional();
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
    destroyMerchantOperasional() {
      this.dialog.alert.loading = true;
      const hari_id = this.form.hari_id;
      const merchant_id = this.$route.params.id;
      this.axios
        .post("merchant/operasional/destroy", { id, merchant_id })
        .then(response => {
          this.table.items = response.data;
          this.table.options.page = 1;
          this.alert.model = true;
          this.alert.text = "Data Berhasil Di Hapus";
          this.fetchMerchantOperasional();
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
    filterDataHari(item) {
      const hari = this.select.hari;
      if (hari.length > 0) {
        return hari.find(f => {
          return f.id === item;
        }).nama_hari;
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
