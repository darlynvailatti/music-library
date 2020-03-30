<template>
<div>
  <v-data-table :headers="headersMusic" :items="songs" class="elevation-5">
    <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="addOrRemoveFromFavorite(item)"
        :color="isFavorite(item) ? 'orange darken-2' : ''"
      >mdi-star</v-icon>
    </template>
  </v-data-table>
</div>
</template>

<script>
import defaultMusic from "@/assets/data.json";
import  FavoriteMixin from '@/common/favorite_mixin.js';

export default {
  name: "musics",
  mixins: [FavoriteMixin],
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
  }
};
</script>

<style scoped>
</style>