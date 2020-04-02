<template>
  <v-card>
    <v-data-table dense :headers="headersFavorites" :items="getFavoriteMusic">
      <template v-slot:item.actions="{ item }">
        <v-icon
          class="mr-2"
          @click="addOrRemoveFromFavorite(item)"
          :color="isFavorite(item) ? 'orange darken-2' : ''"
        >mdi-star</v-icon>
        <v-icon @click="playMusic(item)">
          mdi-play
        </v-icon>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import FavoriteMixin from "@/common/favorite_mixin.js";

export default {
  name: "favorites",
  mixins: [FavoriteMixin],
};
</script>

<style scoped>
</style>