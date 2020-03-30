<template>
  <div>

      <v-data-table :headers="headersPlaylist" :items="getPlaylists">
        <template v-slot:item.acoes="{ item }">
          <v-icon small class="mr-2" @click="editPlaylist(item)">mdi-pencil</v-icon>
          <v-icon small class="mr-2" @click="deletePlaylist(item)">mdi-delete</v-icon>
        </template>
      </v-data-table>

      <PlaylistDialog ref="dialog" />

  </div>
</template>

<script>
import { mapGetters } from "vuex";
import PlaylistDialog from "@/components/PlaylistDialog.vue";

export default {
  name: "playlists",
  components: {
    PlaylistDialog
  },
  data() {
    return {
      headersPlaylist: [
        { text: "Descrição", value: "descricao" },
        { text: "Ações", value: "acoes" }
      ]
    };
  },
  computed: {
    ...mapGetters(["getPlaylists"])
  },
  methods: {
    deletePlaylist(playlist) {
      this.$store.dispatch("deletePlaylist", playlist);
    },
    editPlaylist(playlist) {
      this.$refs.dialog.showDialog(playlist);
    }
  }
};
</script>

<style scoped>
</style>