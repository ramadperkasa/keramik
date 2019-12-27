<template>
  <app>
    <v-row>
      <v-col cols="8">
        <span class="title pl-2">Bank Image</span>
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
      <template v-slot:item.file_nama="{ item }">
        <v-img :src="item.file_nama" contain aspect-ratio="1" width="40" />
      </template>
      <template v-slot:item.folder_id="{ item }">{{item.folder.nama_folder}}</template>
      <template v-slot:item.action="{ item }">
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
        <v-card-title class="title">Apakah anda yakin ingin hapus data Foto ini?</v-card-title>

        <v-card-text>
          <v-row>
            <v-col cols="1" class="align-self-center pl-1">
              <v-icon large class>mdi-alert-circle</v-icon>
            </v-col>
            <v-col cols="11">
              Data yang telah di hapus akan terhapus secara permanen, apakah
              anda yakin ingin menghapus data Foto ini?
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
            @click="destroyFoto()"
          >Hapus</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialog.form.model" persistent width="750">
      <v-card>
        <v-card-title primary-title>
          <v-icon class="pr-2">{{ icon_form }}</v-icon>Input Data Foto
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
                <v-combobox
                  v-model="form.folder_id"
                  :items="select.folder"
                  item-text="nama_folder"
                  item-value="id"
                  label="Nama Folder *"
                  clearable
                  :return-object="false"
                >
                  <template v-slot:selection="data">{{filterDataFolder(data.item)}}</template>
                </v-combobox>
              </v-col>
              <v-col class="align-self-center" cols="3">
                <input type="file" @change="onFileChange" v-if="!form.file_nama" />
                <v-img
                  v-else
                  @click="removeImage"
                  style="cursor : pointer"
                  width="100"
                  :src="form.file_nama"
                />
              </v-col>
              <v-col cols="8" class="ml-5">
                <v-text-field
                  v-model="form.nama_file"
                  label="Nama File *"
                  hint="Contoh : Foto Saya"
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
            @click="createNewFoto()"
          >
            <v-icon>mdi-content-save</v-icon>Simpan Baru
          </v-btn>
          <v-btn
            style="text-transform:none"
            color="primary"
            :loading="dialog.form.loading"
            :disabled="dialog.form.loading"
            text
            @click="createFoto()"
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
        folder_id: "",
        file_nama: "",
        nama_file: "",
        file_type: "",
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
            text: "Foto",
            value: "file_nama",
            align: "left",
            sortable: false
          },
          {
            text: "Nama",
            value: "nama_file",
            align: "left"
          },
          {
            text: "Folder",
            value: "folder_id",
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
      select: {
        folder: []
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
      this.fetchFotoSystem();
    },
    search(newValue) {
      this.table.options.page = 1;
      this.fetchFotoSystem(newValue);
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
    this.fetchFolder();
  },
  methods: {
    fetchFotoSystem() {
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
        .get("foto-system", { params })
        .then(response => {
          this.table.items = response.data.foto;
        })
        .catch(error => {
          this.alert.model = true;
          this.alert.text = "Terjadi Kesalahan";
        })
        .finally(() => {
          this.loading.table = false;
        });
    },
    fetchFolder() {
      this.axios
        .get("folder")
        .then(response => {
          this.select.folder = response.data.folder;
        })
        .catch(error => {
          this.alert.model = true;
          this.alert.text = "Terjadi Kesalahan";
        });
    },
    onFileChange(e) {
      const files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.createImage(files[0]);
    },
    createImage(file) {
      const image = new Image();
      const reader = new FileReader();
      const vm = this;

      reader.onload = e => {
        vm.form.file_nama = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    removeImage() {
      this.form.file_nama = "";
    },
    addItem() {
      this.form.isEdit = false;
      this.dialog.form.model = true;
      this.form.id = "";
      this.form.nama_file = "";
      this.form.file_nama = "";
    },
    destroyItem(item) {
      this.dialog.alert.model = true;
      this.form.id = item.id;
    },
    createFoto() {
      const params = this.form;
      this.axios
        .post("foto-system/create", params)
        .then(response => {
          this.table.items = response.data;
          this.dialog.form.model = false;
          this.table.options.page = 1;
          this.fetchFotoSystem();
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
    createNewFoto() {
      this.dialog.form.loading = true;
      const params = this.form;
      this.axios
        .post("foto-system/create", params)
        .then(response => {
          this.table.items = response.data;
          this.table.options.page = 1;
          this.alert.model = true;
          this.alert.text = "Data Berhasil Di Tambah";
          this.fetchFotoSystem();
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
    destroyFoto() {
      this.dialog.alert.loading = true;
      const id = this.form.id;
      this.axios
        .post("foto-system/destroy", { id })
        .then(response => {
          this.table.items = response.data;
          this.table.options.page = 1;
          this.alert.model = true;
          this.alert.text = "Data Berhasil Di Hapus";
          this.fetchFotoSystem();
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
    filterDataFolder(item) {
      const folder = this.select.folder;
      if (folder.length > 0) {
        return folder.find(f => {
          return f.id === item;
        }).nama_folder;
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
