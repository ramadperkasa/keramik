<template>
  <v-app>
    <perfect-scrollbar>
      <v-navigation-drawer v-model="model" floating :mini-variant.sync="mini" clipped app overflow>
        <v-list>
          <v-list-item-group>
            <v-list-item disabled>
              <v-list-item-avatar>
                <v-img src="https://cdn.vuetifyjs.com/images/john.png"></v-img>
              </v-list-item-avatar>
            </v-list-item>
            <v-list-item
              :color="!$vuetify.theme.dark ? 'primary' : ''"
              link
              @click="open ? (open = false) : (open = true)"
            >
              <v-list-item-content v-if="!mini">
                <v-list-item-title class="title">Rama Dwiyantara</v-list-item-title>
                <v-list-item-subtitle>Programmer</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-icon>{{ !open ? "mdi-menu-down" : "mdi-menu-up" }}</v-icon>
              </v-list-item-action>
            </v-list-item>
          </v-list-item-group>
          <v-list shaped dense v-if="open">
            <v-list-item-group :color="!$vuetify.theme.dark ? 'primary' : ''" sub-group>
              <template v-if="open">
                <v-list-item
                  v-for="(item, index) in menuProfile"
                  :key="index"
                  dense
                  @click="push(item.action)"
                  :class="
                    $route.path == item.action
                      ? 'v-list-item--active v-list-item--link'
                      : ''
                  "
                >
                  <v-list-item-action></v-list-item-action>
                  <v-list-item-content>
                    <v-list-item-title>{{ item.text }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </template>
            </v-list-item-group>
          </v-list>
        </v-list>
        <v-divider></v-divider>
        <v-list shaped dense>
          <v-list-item-group :color="!$vuetify.theme.dark ? 'primary' : ''">
            <template v-for="(item, index) in items">
              <v-subheader :key="index" v-if="item.sub">
                {{
                item.text
                }}
              </v-subheader>
              <v-list-item
                @click="push(item.action)"
                v-if="!item.children && !item.sub"
                :key="item.action + index"
                :class="
                  $route.path == item.action
                    ? 'v-list-item--active v-list-item--link'
                    : ''
                "
              >
                <v-list-item-action>
                  <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>{{ item.text }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-group
                :prepend-icon="item.icon"
                :key="item.action + index"
                v-else-if="!item.sub"
                :color="!$vuetify.theme.dark ? 'primary' : ''"
              >
                <template v-slot:activator>
                  <v-list-item-content>
                    <v-list-item-title>{{ item.text }}</v-list-item-title>
                  </v-list-item-content>
                </template>
                <v-list-item-group>
                  <v-list-item
                    v-for="(child, i) in item.children"
                    :key="i"
                    @click="push(child.action)"
                    :class="
                      $route.path == child.action
                        ? 'v-list-item--active v-list-item--link'
                        : ''
                    "
                  >
                    <v-list-item-action>
                      <v-icon></v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                      <v-list-item-title>{{ child.text }}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
              </v-list-group>
            </template>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
    </perfect-scrollbar>
    <v-app-bar
      :style="
        $vuetify.theme.dark
          ? 'border-bottom:1px solid rgba(255, 255, 255, 0.12)'
          : 'border-bottom:1px solid #eaeaea'
      "
      flat
      clipped-left
      app
    >
      <v-app-bar-nav-icon @click.stop="mini = !mini" />
      <v-toolbar-title style="width: 300px" class="ml-0 pl-4">
        <span class="hidden-sm-and-down">Kadin</span>
      </v-toolbar-title>

      <v-text-field
        v-on:keyup.enter="searchData()"
        v-model="search"
        solo
        flat
        hide-details
        label="Cari Data"
        style="background-color:rgba(0, 0, 0, 0.16)"
        prepend-inner-icon="mdi-magnify"
      />

      <v-spacer />

      <v-btn icon>
        <v-icon
          @click="
            $vuetify.theme.dark
              ? ($vuetify.theme.dark = false)
              : ($vuetify.theme.dark = true)
          "
        >
          {{
          $vuetify.theme.dark ? "mdi-brightness-4" : "mdi-brightness-5"
          }}
        </v-icon>
      </v-btn>
    </v-app-bar>

    <v-content
      :style="
        $vuetify.theme.dark
          ? 'background-color:#424242'
          : 'background-color:#ffffff'
      "
    >
      <v-card flat>
        <slot></slot>
      </v-card>
    </v-content>

    <!-- <v-footer
      inset
      app
      :style="$vuetify.theme.dark ? 'background-color:#424242;border-top:1px solid rgba(255, 255, 255, 0.12)' : 'background-color:#ffffff;border-top:1px solid #eaeaea'"
    >
      <span class="px-4">&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>-->
  </v-app>
</template>
<script>
import { data } from "../data/sidebar";
import { PerfectScrollbar } from "vue2-perfect-scrollbar";
import store from "../store/index";

export default {
  data() {
    return data();
  },

  mounted() {
    var notification = {
      title: "Portugal vs. Denmark",
      body: "5 to 1",
      icon: "firebase-logo.png",
      click_action: "http://localhost:8081"
    };

    var data = {
      notification: notification,
      to:
        "d5T4kXA8uRAONYxiTy2gH-:APA91bHzLjPVJslRvFjhVRBVrxvCvke-5k_Ac_NWaB7qYPWh2QMTTR6MhNJRyMouT87VBqmAm3VZCjJlrbbh_6qfVr8DZ4YUNX54jpQDpuhcPQjXnPmgNF-2m-Sn8U_63QS86OkRFE-E"
    };

    this.axios
      .post("https://fcm.googleapis.com/fcm/send", data, {
        headers: {
          Authorization:
            "key=AAAAwfyJdVY:APA91bEpesQYHA2EqzAWP9w5leLP-SBk8vzAIu0YT4WlEmc4o1BMUwHJpR6AB2XFTKdvHxt7MWQE7mtS_qrwmSls57vjP6rkYx0eFQgIsZxqmfzSXmrxtAe7ftvmn2qQNc7V8A_skg2e",
          "Content-Type": "application/json"
        }
      })
      .then(response => {});
  },

  components: {
    PerfectScrollbar
  },
  methods: {
    searchData() {
      store.commit("setSearch", this.search);
    },
    push(link) {
      store.commit("setSearch", "");
      this.$router.push(link);
    }
  }
};
</script>
<style src="vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css" />
