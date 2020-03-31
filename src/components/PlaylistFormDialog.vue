<template>
  <v-dialog v-model="dialog" width="500">
    <template v-slot:activator="{ on }" v-if="buttonActivatorEnabled">
      <v-btn color="red lighten-2" dark v-on="on">{{ buttonActivatorLabel }}</v-btn>
    </template>

    <v-card>
      <v-tabs>
        <v-tab ripple>Playlist</v-tab>
        <v-tab ripple>Musics</v-tab>
        <v-tab-item>
          <v-flex>
            <v-container fluid>
              <v-form ref="form" v-model="valid">
                <v-text-field label="Descrição" v-model="playlist.descricao" required></v-text-field>
              </v-form>
            </v-container>
          </v-flex>
        </v-tab-item>
        <v-tab-item>
          <v-card flat>
           
              <v-data-table :headers="musicDataTableHeaders" :items="playlist.musics">
                <template v-slot:item.actions="{ item }">
                  <v-container>
                    <v-icon class="mr-2" @click="removeMusicFromPlaylist(item)">mdi-plus</v-icon>
                  </v-container>
                </template>
              </v-data-table>
          
          </v-card>
        </v-tab-item>
      </v-tabs>

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
import { mapGetters } from "vuex";

export default {
  props: ["buttonActivatorLabel", "buttonActivatorEnabled"],
  data() {
    return {
      valid: true,
      dialog: false,
      playlist: this.defaultPlaylist(),
      musicDataTableHeaders: [
        { text: "Artist", value: "artist" },
        { text: "Title", value: "title" }
      ]
    };
  },
  computed: {
    ...mapGetters(["getPlaylists"])
  },
  methods: {
    removeMusicFromPlaylist() {},
    cancelar() {
      this.dialog = false;
    },
    confirmar() {
      let playlistToConfirm = {};
      Object.assign(playlistToConfirm, this.playlist);
      this.$store.dispatch("confirmPlaylist", playlistToConfirm);
      this.dialog = false;
      this.playlist = this.defaultPlaylist();
    },
    showDialog(playlist) {
      this.dialog = true;
      this.playlist = playlist;
    },
    defaultPlaylist() {
      return {
        id: null,
        descricao: ""
      };
    }
  }
};
</script>

<style scoped>
</style>