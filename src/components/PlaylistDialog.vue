<template>
  <v-dialog v-model="dialog" width="500">
    <template v-slot:activator="{ on }" v-if="buttonActivatorEnabled">
      <v-btn color="red lighten-2" dark v-on="on">{{ buttonActivatorLabel }}</v-btn>
    </template>

    <v-card>
      <v-card-title class="headline grey lighten-2" primary-title>Playlist</v-card-title>
      <v-container>
        <v-form ref="form" v-model="valid">
          <v-text-field label="Descrição" v-model="playlist.descricao" required></v-text-field>
        </v-form>
      </v-container>

      <v-divider></v-divider>

      <v-card-actions>
        <v-btn color="primary" text @click="cancelar()">Cancelar</v-btn>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="confirmar()">Confirmar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState } from "vuex";

export default {
  props: ["buttonActivatorLabel", "buttonActivatorEnabled"],
  data() {
    return {
      valid: true,
      dialog: false,
      playlist: {
        id: null,
        descricao: ""
      }
    };
  },
  computed: {
    ...mapState(["playlists"])
  },
  methods: {
    cancelar() {
      this.dialog = false;
    },
    confirmar() {
      let playlistToConfirm = {};
      Object.assign(playlistToConfirm, this.playlist);
      this.$store.dispatch("confirmPlaylist", playlistToConfirm);
      this.dialog = false;
      this.playlist.descricao = "";
    },
    showDialog(playlist) {
      this.dialog = true;
      this.playlist = playlist;
    }
  }
};
</script>

<style scoped>
</style>