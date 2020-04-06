<template>
  <v-card>
    <v-card-title>
      Musics
      <v-spacer></v-spacer>
      <v-text-field
        v-model="musicSearch"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table dense :headers="headersMusic" :items="songs" :search="musicSearch">
      <template v-slot:item.actions="{ item }">
        <v-container class="pa-0">
          <v-row >
            <v-col>
              <v-icon
                @click="addOrRemoveFromFavorite(item)"
                :color="isFavorite(item) ? 'orange darken-2' : ''"
              >mdi-star</v-icon>
            </v-col>
            <v-col>
              <v-icon @click="addMusicToPlaylists(item)">mdi-plus</v-icon>
            </v-col>
            <v-col>
              <ButtonPlayOnList v-bind:audio="item"/>
            </v-col>

          </v-row>
        </v-container>
      </template>
    </v-data-table>
    <PlaylistsDialogSelection ref="playlistDialogSelection" />
  </v-card>
</template>

<script>
import PlayerMixin from "@/common/player_mixin.js";
import defaultMusic from "@/assets/data.json";
import FavoriteMixin from "@/common/favorite_mixin.js";
import PlaylistsDialogSelection from "@/components/PlaylistsDialogSelection.vue";
import ButtonPlayOnList from '@/components/ButtonPlayOnList.vue';

export default {
  name: "musics",
  mixins: [FavoriteMixin, PlayerMixin],
  components: {
    PlaylistsDialogSelection,
    ButtonPlayOnList
  },
  data() {
    return {
      id: 0,
      musicSearch: "",
      headersMusic: [
        { text: "Artist", value: "artist" },
        { text: "Title", value: "title" },
        { text: "Album", value: "album" },
        { text: "Genre", value: "genre" },
        { text: "Actions", value: "actions", sortable: false }
      ],
      songs: defaultMusic
    };
  },
  computed: {},
  methods: {
    addMusicToPlaylists(music) {
      this.id = 1;
      this.$store.dispatch("selectMusic", music);
      this.$refs.playlistDialogSelection.open();
    }
  }
};
</script>

<style scoped>
.pulse {
  width: 23px;
  height: 23px;
  border-radius: 50%;
  background: #05fce7;
  box-shadow: 0 0 0 rgba(8, 29, 219, 0.904);
  animation: pulse 0.5s infinite;
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(6, 226, 255, 0.3);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(6, 226, 255, 0.3);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(6, 226, 255, 0.3);
  }
}
</style>