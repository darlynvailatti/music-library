<template>
  <v-container class="ml-1">
    <v-row>
      <PlaylistFormDialog
        ref="dialog"
        button-activator-label="Nova"
        v-bind:button-activator-enabled="true"
      />
    </v-row>

    <v-row class="mt-4">
      <v-card>
        <v-data-table :headers="headersPlaylist" :items="getPlaylists">
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