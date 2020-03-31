<template>
  <v-dialog v-model="dialog">
    <v-card>
      <v-card-title
        class="headline grey lighten-2"
        primary-title>Add {{ selectedMusicTitle }} to ...</v-card-title>

      <v-divider></v-divider>

      <v-container class="ma-1">

        <v-data-table
            v-model="selectedPlaylists"
            :headers="playlistDataTableHeaders"
            :items="getPlaylists"
            item-key="id"
            :items-per-page="5"
            show-select
            class="elevation-1"
          >
        </v-data-table>
      </v-container>

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
  data() {
    return {
      selectedPlaylists: [],
      selectedMusicTitle: "",
      dialog: false,
      playlistDataTableHeaders: [
        { text: "Description", value: "descricao" },
      ]
    };
  },

  beforeUpdate() {
    if (this.getSelectedMusic)
      this.selectedMusicTitle = this.getSelectedMusic.title;
  },

  computed: {
    ...mapGetters(["getSelectedMusic", "getPlaylists"])
  },
  methods: {
    open() {
      this.dialog = true;
    },
    close() {
      this.dialog = false;
    },

    confirmar() {
      try {

        if(this.selectedPlaylists == null || this.selectedPlaylists.length === 0){
          throw "Nenhuma playlist selecionada";
        }

        let idsPlaylists = this.selectedPlaylists.flatMap((p) => p.id);
        this.$store.dispatch("addMusicToPlaylist", {
          playlists: idsPlaylists,
          music: this.getSelectedMusic
        });
        
        this.$toast.open({
          message: `Adicionou ${this.getSelectedMusic.title} na(s) playlis(s) selecionadas`,
          type: "success",
          duration: 5000
        });
        this.selectedPlaylists = [];
        this.close();
      } catch (error) {
        this.$toast.open({
          message: `${error}`,
          type: "error",
          duration: 5000
        });
      }
    },

    cancelar() {
      this.dialog = false;
    }
  }
};
</script>

<style scoped>
</style>