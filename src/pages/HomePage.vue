<template>

    <div>
      <v-row no-gutters>
        <v-col>
          <Musics />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-tabs>
            <v-tab ripple>Playlists</v-tab>
            <v-tab ripple>Favoritos</v-tab>
            <v-tab-item>
              <v-card flat>
                <v-card>
                  
                  <v-list-item three-line>
                    <v-list-item-content>
                      <Playlists />
                    </v-list-item-content>
                  </v-list-item>

                  <v-card-actions>
                  </v-card-actions>
                </v-card>
              </v-card>
            </v-tab-item>
            <v-tab-item>
              <v-card flat>
                <Favorites />
              </v-card>
            </v-tab-item>
          </v-tabs>
        </v-col>
      </v-row>
    </div>

</template>

<script>
import Playlists from "@/components/Playlists.vue";
import Musics from "@/components/Musics.vue";
import Favorites from "@/components/Favorites.vue";

export default {
  name: "home",
  components: {
    Musics,
    Playlists,
    Favorites
  },
  data() {
    return {};
  }
};
</script>

<style scoped>
</style>