<template>
  <v-container class="ml-1">
    <v-row>
      <PlaylistFormDialog
        ref="dialog"/>
      <v-btn
        class="mt-7" absolute dark fab top small @click="newPlaylist()">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-row>

    <v-row class="mt-4">
      <v-card class="ml-3">
        <v-data-table dense :headers="headersPlaylist" :items="getPlaylists">
          <template v-slot:item.acoes="{ item }">
            <v-icon small class="mr-2" @click="editPlaylist(item)">mdi-pencil</v-icon>
            <v-icon small class="mr-2" @click="deletePlaylist(item)">mdi-delete</v-icon>
          </template>
        </v-data-table>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import PlaylistFormDialog from "@/components/PlaylistFormDialog.vue";

export default {
  name: "playlists",
  components: {
    PlaylistFormDialog
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
    newPlaylist(){
      this.$refs.dialog.newPlaylist();
    },
    deletePlaylist(playlist) {
      this.$store.dispatch("deletePlaylist", playlist);
    },
    editPlaylist(playlist) {
      this.$refs.dialog.editPlaylist(playlist);
    },

  }
};
</script>

<style scoped>
</style>