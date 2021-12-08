<template>
  <v-app>
    <toolbar title="Mon titre" />
    <v-main>
      <router-view class="router"></router-view>
    </v-main>
  </v-app>
</template>

<script>
import i18n from "@/plugins/i18n";
import { mapState } from "vuex";
import Toolbar from "@/components/Toolbar";

export default {
  name: "App",
  components: {
    Toolbar
  },

  data: () => ({
    //
  }),
  beforeCreate: function () {
    if (sessionStorage.getItem("lang")) {
      i18n.locale = sessionStorage.getItem("lang");
    } else {
      i18n.locale = (navigator.language || navigator.userLanguage).substring(
        0,
        2
      );
    }
  },

  computed: {
    ...mapState(["colorToolbar", "colorToolbarText", "nameToolbar"]),
  },
};
</script>
