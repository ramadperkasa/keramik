<template>
  <app>
    <v-row>
      <v-col cols="8">
        <span class="title pl-2">Merchant Legalitas</span>
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
      <template v-slot:item.jenis_legalitas_id="{ item }">
        {{
        item.nama_legalitas
        }}
      </template>
      <template v-slot:item.foto_id="{ item }">
        <v-img
          :src="item.foto"
          contain
          aspect-ratio="1"
          width="40"
          @click="blank(item.foto)"
          style="cursor:pointer"
        />
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
          Apakah anda yakin ingin hapus data Merchant Legalitas
          ini?
        </v-card-title>

        <v-card-text>
          <v-row>
            <v-col cols="1" class="align-self-center pl-1">
              <v-icon large class>mdi-alert-circle</v-icon>
            </v-col>
            <v-col cols="11">
              Data yang telah di hapus akan terhapus secara permanen, apakah
              anda yakin ingin menghapus data Merchant Legalitas ini?
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
            @click="destroyMerchantLegalitas()"
          >Hapus</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialog.form.model" persistent width="750">
      <v-card>
        <v-card-title primary-title>
          <v-icon class="pr-2">{{ icon_form }}</v-icon>Input Data Merchant Legalitas
          <v-spacer></v-spacer>
          <v-btn text @click="dialog.form.model = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-container>
          <v-card-text>
            <v-row>
              <v-col cols="3" class="align-self-center d-flex justify-center">
                <div v-if="form.foto_id == ''">
                  <v-btn color="primary" outlined @click="setGaleriModel()">
                    <v-icon>mdi-image</v-icon>Pilih Foto
                  </v-btn>
                  <c-galeri
                    @id="f => { return this.form.foto_id = f.id,  this.form.file_nama = f.file_nama}"
                  ></c-galeri>
                </div>
                <div v-else>
                  <img
                    :src="form.file_nama"
                    aspect-ratio="1"
                    width="40"
                    style="cursor:pointer"
                    @click="form.foto_id = ''"
                  />
                </div>
              </v-col>
              <v-col cols="9">
                <v-combobox
                  v-model="form.jenis_legalitas_id"
                  :items="select.legalitas"
                  label="Nama Legalitas *"
                  item-value="id"
                  item-text="nama_jenis"
                  :return-object="false"
                  clearable
                >
                  <template v-slot:selection="data">{{filterDataLegalitas(data.item)}}</template>
                </v-combobox>
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="form.nomor" label="Nomor *" hint="Contoh : Dipointer"></v-text-field>
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
                ? updateNewMerchantLegalitas()
                : createNewMerchantLegalitas()
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
                ? updateMerchantLegalitas()
                : createMerchantLegalitas()
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
        jenis_legalitas_id: "",
        nomor: "",
        foto_id: "",
        file_nama: "",
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
            text: "Nomor",
            value: "nomor",
            align: "left"
          },
          {
            text: "Foto Id",
            value: "foto_id",
            align: "left"
          },
          {
            text: "Jenis Legalitas Id",
            value: "jenis_legalitas_id",
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
        legalitas: ""
      }
    };
  },
  watch: {
    "table.options"(newValue, oldValue) {
      this.fetchMerchantLegalitas();
    },
    search(newValue) {
      this.table.options.page = 1;
      this.fetchMerchantLegalitas(newValue);
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
    this.fetchLegalitas();
  },
  methods: {
    fetchMerchantLegalitas() {
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
        .get("merchant/legalitas", { params })
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
    fetchLegalitas() {
      this.axios
        .get("get/legalitas")
        .then(response => {
          this.select.legalitas = response.data.legalitas;
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
      this.form.id = "";
      this.form.merchant_id = "";
      this.form.jenis_legalitas_id = "";
      this.form.nomor = "";
      this.form.foto_id = "";
    },
    editItem(item) {
      this.dialog.form.model = true;
      this.form.isEdit = true;
      this.form.id = item.id;
      this.form.merchant_id = item.merchant_id;
      this.form.jenis_legalitas_id = item.jenis_legalitas_id;
      this.form.nomor = item.nomor;
      this.form.foto_id = item.foto_id;
    },
    destroyItem(item) {
      this.dialog.alert.model = true;
      this.form.id = item.id;
      this.form.merchant_id = item.merchant_id;
    },
    updateMerchantLegalitas() {
      this.dialog.form.loading = true;
      const params = this.form;
      this.axios
        .post("merchant/legalitas/update", params)
        .then(response => {
          this.table.items = response.data;
          this.table.options.page = 1;
          this.dialog.form.model = false;
          this.fetchMerchantLegalitas();
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
    createMerchantLegalitas() {
      this.form.merchant_id = this.$route.params.id;
      const params = this.form;
      this.axios
        .post("merchant/legalitas/create", params)
        .then(response => {
          this.table.items = response.data;
          this.dialog.form.model = false;
          this.table.options.page = 1;
          this.fetchMerchantLegalitas();
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
    updateNewMerchantLegalitas() {
      this.dialog.form.loading = true;
      this.form.merchant_id = this.$route.params.id;
      const params = this.form;
      this.axios
        .post("merchant/legalitas/update", params)
        .then(response => {
          this.table.items = response.data;
          this.table.options.page = 1;
          this.alert.model = true;
          this.alert.text = "Data Berhasil Di Edit";
          this.fetchMerchantLegalitas();
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
    createNewMerchantLegalitas() {
      this.dialog.form.loading = true;
      this.form.merchant_id = this.$route.params.id;
      const params = this.form;
      this.axios
        .post("merchant/legalitas/create", params)
        .then(response => {
          this.table.items = response.data;
          this.table.options.page = 1;
          this.alert.model = true;
          this.alert.text = "Data Berhasil Di Tambah";
          this.fetchMerchantLegalitas();
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
    destroyMerchantLegalitas() {
      this.dialog.alert.loading = true;
      const id = this.form.id;
      const merchant_id = this.$route.params.id;
      this.axios
        .post("merchant/legalitas/destroy", {
          id,
          merchant_id
        })
        .then(response => {
          this.table.items = response.data;
          this.table.options.page = 1;
          this.alert.model = true;
          this.alert.text = "Data Berhasil Di Hapus";
          this.fetchMerchantLegalitas();
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
    filterDataLegalitas(item) {
      const legalitas = this.select.legalitas;
      if (legalitas.length > 0) {
        return legalitas.find(f => {
          return f.id === item;
        }).nama_jenis;
      }
    },
    setGaleriModel() {
      store.commit("setGaleriModel", true);
    }
  }
};
</script>

<style lang="scss" scoped></style>
