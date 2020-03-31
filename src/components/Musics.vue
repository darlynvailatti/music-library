<template>
  <v-card>
    <v-data-table :headers="headersMusic" :items="songs">
      <template v-slot:item.actions="{ item }">
        <v-container>
          <v-icon
            class="mr-2"
            @click="addOrRemoveFromFavorite(item)"
            :color="isFavorite(item) ? 'orange darken-2' : ''"
          >mdi-star</v-icon>
          <v-icon
            class="mr-2"
            @click="addMusicToPlaylists(item)">mdi-plus</v-icon>
        </v-container>
      </template>
    </v-data-table>
    
    <PlaylistsDialogSelection           
        ref="playlistDialogSelection"/>

  </v-card>
</template>

<script>
import defaultMusic from "@/assets/data.json";
import FavoriteMixin from "@/common/favorite_mixin.js";
import PlaylistsDialogSelection from "@/components/PlaylistsDialogSelection.vue";

import { mapGetters } from "vuex";

export default {
  name: "musics",
  mixins: [FavoriteMixin],
  components: {
    PlaylistsDialogSelection
  },
  data() {
    return {
      headersMusic: [
        { text: "Artist", value: "artist" },
        { text: "Title", value: "title" },
        { text: "Album", value: "album" },
        { text: "Genre", value: "genre" },
        { text: "Actions", value: "actions" }
      ],
      songs: defaultMusic
    };
  },
  computed:{
     ...mapGetters(['getSelectedMusic']),
  },
  methods: {
    addMusicToPlaylists(music){
      this.$store.dispatch('selectMusic', music);
      this.$refs.playlistDialogSelection.open();
      
    },
  
  }
};
</script>

<style scoped>
</style>