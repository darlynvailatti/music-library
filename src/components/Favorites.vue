<template>
  <v-card>
    <v-data-table dense :headers="headersFavorites" :items="getFavoriteMusic">
      <template v-slot:item.actions="{ item }">
        <v-container class="pa-0">
          <v-row>
            <v-col>
              <v-icon
                class="mr-2"
                @click="addOrRemoveFromFavorite(item)"
                :color="isFavorite(item) ? 'orange darken-2' : ''"
              >mdi-star</v-icon>
            </v-col>
            <v-col>
              <ButtonPlayOnList v-bind:audio="item" />
            </v-col>
          </v-row>
        </v-container>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import FavoriteMixin from "@/common/favorite_mixin.js";
import ButtonPlayOnList from "@/components/ButtonPlayOnList.vue";

export default {
  name: "favorites",
  mixins: [FavoriteMixin],
  components: {
    ButtonPlayOnList
  }
};
</script>

<style scoped>
</style>