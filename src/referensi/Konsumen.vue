<template>
  <app>
    <v-row>
      <v-col cols="8">
        <span class="title pl-2">Konsumen</span>
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
      <template v-slot:item.jk="{ item }">
        {{
        item.jk == 'L' ? 'Laki Laki' : 'Perempuan'
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
        <v-card-title class="title">Apakah anda yakin ingin hapus data Konsumen ini?</v-card-title>

        <v-card-text>
          <v-row>
            <v-col cols="1" class="align-self-center pl-1">
              <v-icon large class>mdi-alert-circle</v-icon>
            </v-col>
            <v-col cols="11">
              Data yang telah di hapus akan terhapus secara permanen, apakah
              anda yakin ingin menghapus data Konsumen ini?
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
            @click="destroyKonsumen()"
          >Hapus</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialog.form.model" persistent width="750">
      <v-card>
        <v-card-title primary-title>
          <v-icon class="pr-2">{{ icon_form }}</v-icon>Input Data Konsumen
          <v-spacer></v-spacer>
          <v-btn text @click="dialog.form.model = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-container>
          <v-card-text>
            <v-text-field v-model="form.nama" label="Nama *" hint="Contoh : Dipointer"></v-text-field>
            <v-text-field v-model="form.email" label="Email *" hint="Contoh : Dipointer"></v-text-field>
            <v-text-field v-model="form.no_telp" label="No Telp *" hint="Contoh : Dipointer"></v-text-field>
            <v-text-field v-model="form.profil" label="Profil *" hint="Contoh : Dipointer"></v-text-field>
            <v-text-field v-model="form.alamat" label="Alamat *" hint="Contoh : Dipointer"></v-text-field>
            <v-text-field
              v-model="form.provinsi_id"
              label="Provinsi Id *"
              hint="Contoh : Dipointer"
            ></v-text-field>
            <v-text-field
              v-model="form.kabupaten_id"
              label="Kabupaten Id *"
              hint="Contoh : Dipointer"
            ></v-text-field>
            <v-text-field
              v-model="form.kecamatan_id"
              label="Kecamatan Id *"
              hint="Contoh : Dipointer"
            ></v-text-field>
            <v-text-field
              v-model="form.kelurahan_id"
              label="Kelurahan Id *"
              hint="Contoh : Dipointer"
            ></v-text-field>
            <v-text-field v-model="form.kode_pos" label="Kode Pos *" hint="Contoh : Dipointer"></v-text-field>
            <v-text-field v-model="form.jk" label="Jk *" hint="Contoh : Dipointer"></v-text-field>
            <v-text-field
              v-model="form.lahir_tanggal"
              label="Lahir Tanggal *"
              hint="Contoh : Dipointer"
            ></v-text-field>
            <v-text-field
              v-model="form.lahir_tempat"
              label="Lahir Tempat *"
              hint="Contoh : Dipointer"
            ></v-text-field>
            <v-text-field v-model="form.agama_id" label="Agama Id *" hint="Contoh : Dipointer"></v-text-field>
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
            @click="form.isEdit ? updateNewKonsumen() : createNewKonsumen()"
          >
            <v-icon>mdi-content-save</v-icon>Simpan Baru
          </v-btn>
          <v-btn
            style="text-transform:none"
            color="primary"
            :loading="dialog.form.loading"
            :disabled="dialog.form.loading"
            text
            @click="form.isEdit ? updateKonsumen() : createKonsumen()"
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
        nama: "",
        email: "",
        no_telp: "",
        profil: "",
        alamat: "",
        provinsi_id: "",
        kabupaten_id: "",
        kecamatan_id: "",
        kelurahan_id: "",
        kode_pos: "",
        jk: "",
        lahir_tanggal: "",
        lahir_tempat: "",
        agama_id: "",
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
            value: "nama",
            align: "left"
          },
          {
            text: "Email",
            value: "email",
            align: "left"
          },
          {
            text: "No Telp",
            value: "no_telp",
            align: "left"
          },
          {
            text: "Jenis Kelamin",
            value: "jk",
            align: "left"
          },
          {
            text: "Tanggal Lahir",
            value: "lahir_tanggal",
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
      this.fetchKonsumen();
    },
    search(newValue) {
      this.table.options.page = 1;
      this.fetchKonsumen(newValue);
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
    fetchKonsumen() {
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
        .get("konsumen", { params })
        .then(response => {
          this.table.items = response.data.konsumen;
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
      this.form.nama = "";
      this.form.email = "";
      this.form.no_telp = "";
      this.form.profil = "";
      this.form.alamat = "";
      this.form.provinsi_id = "";
      this.form.kabupaten_id = "";
      this.form.kecamatan_id = "";
      this.form.kelurahan_id = "";
      this.form.kode_pos = "";
      this.form.jk = "";
      this.form.lahir_tanggal = "";
      this.form.lahir_tempat = "";
      this.form.agama_id = "";
    },
    editItem(item) {
      this.dialog.form.model = true;
      this.form.isEdit = true;
      this.form.id = item.id;
      this.form.nama = item.nama;
      this.form.email = item.email;
      this.form.no_telp = item.no_telp;
      this.form.profil = item.profil;
      this.form.alamat = item.alamat;
      this.form.provinsi_id = item.provinsi_id;
      this.form.kabupaten_id = item.kabupaten_id;
      this.form.kecamatan_id = item.kecamatan_id;
      this.form.kelurahan_id = item.kelurahan_id;
      this.form.kode_pos = item.kode_pos;
      this.form.jk = item.jk;
      this.form.lahir_tanggal = item.lahir_tanggal;
      this.form.lahir_tempat = item.lahir_tempat;
      this.form.agama_id = item.agama_id;
    },
    destroyItem(item) {
      this.dialog.alert.model = true;
      this.form.id = item.id;
    },
    updateKonsumen() {
      this.dialog.form.loading = true;
      const params = this.form;
      this.axios
        .post("konsumen/update", params)
        .then(response => {
          this.table.items = response.data;
          this.table.options.page = 1;
          this.dialog.form.model = false;
          this.fetchKonsumen();
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
    createKonsumen() {
      const params = this.form;
      this.axios
        .post("konsumen/create", params)
        .then(response => {
          this.table.items = response.data;
          this.dialog.form.model = false;
          this.table.options.page = 1;
          this.fetchKonsumen();
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
    updateNewKonsumen() {
      this.dialog.form.loading = true;
      const params = this.form;
      this.axios
        .post("konsumen/update", params)
        .then(response => {
          this.table.items = response.data;
          this.table.options.page = 1;
          this.alert.model = true;
          this.alert.text = "Data Berhasil Di Edit";
          this.fetchKonsumen();
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
    createNewKonsumen() {
      this.dialog.form.loading = true;
      const params = this.form;
      this.axios
        .post("konsumen/create", params)
        .then(response => {
          this.table.items = response.data;
          this.table.options.page = 1;
          this.alert.model = true;
          this.alert.text = "Data Berhasil Di Tambah";
          this.fetchKonsumen();
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
    destroyKonsumen() {
      this.dialog.alert.loading = true;
      const id = this.form.id;
      this.axios
        .post("konsumen/destroy", { id })
        .then(response => {
          this.table.items = response.data;
          this.table.options.page = 1;
          this.alert.model = true;
          this.alert.text = "Data Berhasil Di Hapus";
          this.fetchKonsumen();
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
