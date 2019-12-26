<template>
  <v-dialog v-model="modal.model" fullscreen hide-overlay transition="dialog-bottom-transition">
    <v-card>
      <v-toolbar flat :color="$vuetify.theme.dark ? '' : ''">
        <v-btn v-if="select.id == ''" icon @click="modal.model = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-btn v-else icon @click="select.id = ''">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <v-toolbar-title>{{select.id ? 'Pilih Gambar' : 'Pilih Folder'}}</v-toolbar-title>
      </v-toolbar>
      <v-list subheader v-if="select.id == ''">
        <v-subheader>List Folder</v-subheader>
        <v-container fluid>
          <v-list-item
            v-for="item in select.folder"
            :key="item.id"
            @click="fetchImage(item.id); select.id = item.id"
            class="pa-2"
          >
            <v-list-item-avatar>
              <v-icon class="grey lighten-1 white--text">mdi-folder</v-icon>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>{{item.nama_folder}}</v-list-item-title>
            </v-list-item-content>

            <v-list-item-action>
              <v-tooltip left>
                <template v-slot:activator="{ on }">
                  <v-icon v-on="on" color="grey lighten-1">mdi-information</v-icon>
                </template>
                <span>Folder yang berisi foto dari {{item.nama_folder}}</span>
              </v-tooltip>
            </v-list-item-action>
          </v-list-item>
        </v-container>
      </v-list>
      <v-container fluid v-else>
        <v-row>
          <v-col v-for="(item,index) in items" :key="index" cols="2">
            <v-skeleton-loader transition="scale-transition" type="image">
              <img
                :src="item.file_nama"
                alt="lorem"
                class="image"
                height="100%"
                width="100%"
                style="cursor:pointer"
                @click="sendId(item)"
              />
            </v-skeleton-loader>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-dialog>
</template>
<script>
import store from "../store/index";
export default {
  data() {
    return {
      select: {
        folder: "",
        id: "",
        logo: ""
      },
      items: []
    };
  },
  computed: {
    modal() {
      return store.getters.getGaleri;
    }
  },
  mounted() {
    this.fetchFolder();
  },
  methods: {
    fetchFolder() {
      axios
        .get("folder")
        .then(response => {
          this.select.folder = response.data.folder;
        })
        .catch(error => {
          this.alert.model = true;
          this.alert.text = "Terjadi Kesalahan";
        });
    },
    fetchImage(id) {
      this.items = [];
      axios
        .get("foto-system/folder", { params: { id } })
        .then(response => {
          this.items = response.data.foto;
        })
        .catch(error => {
          this.alert.model = true;
          this.alert.text = "Terjadi Kesalahan";
        });
    },
    sendId(item) {
      this.$emit("id", item);
      store.commit("setGaleriModel", false);
    }
  }
};
</script>