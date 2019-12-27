<template>
  <app>
    <v-row>
      <v-col cols="8">
        <span class="title pl-2">Kelurahan</span>
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
      <template v-slot:item.kecamatan_id="{ item }">
        {{
        item.kecamatan.nama_kecamatan
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
        <v-card-title class="title">Apakah anda yakin ingin hapus data Kelurahan ini?</v-card-title>

        <v-card-text>
          <v-row>
            <v-col cols="1" class="align-self-center pl-1">
              <v-icon large class>mdi-alert-circle</v-icon>
            </v-col>
            <v-col cols="11">
              Data yang telah di hapus akan terhapus secara permanen, apakah
              anda yakin ingin menghapus data Kelurahan ini?
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
            @click="destroyKelurahan()"
          >Hapus</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialog.form.model" persistent width="750">
      <v-card>
        <v-card-title primary-title>
          <v-icon class="pr-2">{{ icon_form }}</v-icon>Input Data Kelurahan
          <v-spacer></v-spacer>
          <v-btn text @click="dialog.form.model = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-container>
          <v-card-text>
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
                <v-text-field
                  v-model="form.id"
                  label="Id *"
                  hint="Contoh : 3273061003"
                  :prefix="form.isEdit == true ? '' : form.provinsi_id && !form.kabupaten_id && !form.kecamatan_id ? form.provinsi_id : form.provinsi_id && form.kabupaten_id && !form.kecamatan_id ? form.kabupaten_id : form.provinsi_id && form.kabupaten_id && form.kecamatan_id ? form.kecamatan_id :  ''"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="form.nama_kelurahan"
                  label="Nama Kelurahan *"
                  hint="Contoh : Pajajaran"
                ></v-text-field>
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
            @click="form.isEdit ? updateNewKelurahan() : createNewKelurahan()"
          >
            <v-icon>mdi-content-save</v-icon>Simpan Baru
          </v-btn>
          <v-btn
            style="text-transform:none"
            color="primary"
            :loading="dialog.form.loading"
            :disabled="dialog.form.loading"
            text
            @click="form.isEdit ? updateKelurahan() : createKelurahan()"
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
        provinsi_id: "",
        kabupaten_id: "",
        kecamatan_id: "",
        nama_kelurahan: "",
        isEdit: false,
        first: false
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
            text: "id",
            align: "left",
            sortable: false,
            value: "id"
          },
          {
            text: "Kecamatan",
            value: "kecamatan_id",
            align: "left"
          },
          {
            text: "Nama Kelurahan",
            value: "nama_kelurahan",
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
        kabupaten: false
      },
      select: {
        provinsi: "",
        kabupaten: "",
        kecamatan: ""
      }
    };
  },
  watch: {
    "table.options"(newValue, oldValue) {
      this.fetchKelurahan();
    },
    search(newValue) {
      this.table.options.page = 1;
      this.fetchKelurahan(newValue);
    },
    "form.provinsi_id"(newValue, oldValue) {
      if (!this.form.first) {
        this.form.id = "";
      }
      this.form.kabupaten_id = "";
      this.form.kecamatan_id = "";
      this.fetchSelectKabupaten(newValue);
    },
    "form.kabupaten_id"(newValue, oldValue) {
      if (!this.form.first) {
        this.form.id = "";
      }
      this.form.kecamatan_id = "";
      this.fetchSelectKecamatan(newValue);
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
    fetchKelurahan() {
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
        .get("kelurahan", { params })
        .then(response => {
          this.table.items = response.data.kelurahan;
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
      this.axios
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
      this.form.kabupaten_id = this.form.id.substring(0, 4);
      this.select.kabupaten = [];
      this.loading.kabupaten = true;
      const data = {
        provinsi_id
      };
      const params = data;
      this.axios
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
      this.form.kecamatan_id = this.form.id.substring(0, 6);
      this.select.kecamatan = [];
      this.loading.kecamatan = true;
      const data = {
        kabupaten_id
      };
      const params = data;
      this.axios
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
    addItem() {
      this.form.isEdit = false;
      this.dialog.form.model = true;
      this.form.id = "";
      this.form.provinsi_id = "";
      this.form.kabupaten_id = "";
      this.form.kecamatan_id = "";
      this.form.nama_kelurahan = "";
    },
    editItem(item) {
      this.dialog.form.model = true;
      this.form.isEdit = true;
      this.form.first = true;
      this.form.id = item.id;
      this.form.provinsi_id = item.id.substring(0, 2);
      this.form.kabupaten_id = item.id.substring(0, 4);
      this.form.kecamatan_id = item.kecamatan_id;
      this.form.nama_kelurahan = item.nama_kelurahan;
    },
    destroyItem(item) {
      this.dialog.alert.model = true;
      this.form.id = item.id;
    },
    updateKelurahan() {
      this.dialog.form.loading = true;
      const params = this.form;
      this.axios
        .post("kelurahan/update", params)
        .then(response => {
          this.table.items = response.data;
          this.table.options.page = 1;
          this.dialog.form.model = false;
          this.fetchKelurahan();
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
    createKelurahan() {
      const params = this.form;
      this.axios
        .post("kelurahan/create", params)
        .then(response => {
          this.table.items = response.data;
          this.dialog.form.model = false;
          this.table.options.page = 1;
          this.fetchKelurahan();
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
    updateNewKelurahan() {
      this.dialog.form.loading = true;
      const params = this.form;
      this.axios
        .post("kelurahan/update", params)
        .then(response => {
          this.table.items = response.data;
          this.table.options.page = 1;
          this.alert.model = true;
          this.alert.text = "Data Berhasil Di Edit";
          this.fetchKelurahan();
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
    createNewKelurahan() {
      this.dialog.form.loading = true;
      const params = this.form;
      this.axios
        .post("kelurahan/create", params)
        .then(response => {
          this.table.items = response.data;
          this.table.options.page = 1;
          this.alert.model = true;
          this.alert.text = "Data Berhasil Di Tambah";
          this.fetchKelurahan();
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
    destroyKelurahan() {
      this.dialog.alert.loading = true;
      const id = this.form.id;
      this.axios
        .post("kelurahan/destroy", { id })
        .then(response => {
          this.table.items = response.data;
          this.table.options.page = 1;
          this.alert.model = true;
          this.alert.text = "Data Berhasil Di Hapus";
          this.fetchKelurahan();
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
    }
  }
};
</script>

<style lang="scss" scoped></style>
