<template>
  <v-row justify="center" class="mt-n8">
    <v-container class="d-inline-flex justify-center">
      <v-btn
        class="mt-2 mr-1"
        @click=" isAllowToPlay ? play() : isAllowToPause ? pause() : null"
        small
        dark
        fab
      >
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>

      <v-btn
        class="mb-6"
        @click=" isAllowToPlay ? play() : isAllowToPause ? pause() : null"
        dark
        fab
      >
        <v-icon>{{ isAllowToPlay ? 'mdi-play' : isAllowToPause ? 'mdi-pause' : '' }}</v-icon>
      </v-btn>

      <v-btn
        class="mt-2 ml-1"
        @click=" isAllowToPlay ? play() : isAllowToPause ? pause() : null"
        small
        dark
        fab
      >
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
    </v-container>
    <v-container class="justify-center mt-n10">
      <v-row class="mt-0">
        <v-col cols="1" class=" mt-n9">
          <swapping-squares-spinner 
            v-if="isPlaying"
            :animation-duration="1000" :size="40" color="black" />
        </v-col>
        <v-col>
          <v-row justify="center" class="mt-n4">
            <div class="overline">
              {{
              getCurrentAudio != null ?
              `${getCurrentAudio.title} - ${getCurrentAudio.artist}` :
              '...'
              }}
            </div>
          </v-row>
          <v-progress-linear></v-progress-linear>
        </v-col>
        <v-col cols="1"></v-col>
      </v-row>
    </v-container>
  </v-row>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import { SwappingSquaresSpinner } from "epic-spinners";

export default {
  data() {
    return {};
  },
  components: {
    SwappingSquaresSpinner
  },
  computed: {
    ...mapGetters([
      "isPlaying",
      "isAllowToPlay",
      "isAllowToPause",
      "getCurrentState",
      "getCurrentAudio",
      "getPlayer"
    ]),
    ...mapState(["player"])
  },
  methods: {
    play() {
      this.$store.dispatch("play", { audio: this.getCurrentAudio });
    },

    pause() {
      this.$store.dispatch("pause");
    }
  }
};
</script>

<style scoped>
.slide-right {
  width: 100%;
  overflow: hidden;
  margin-left: 400px;
  max-width: 500px;
}

.slide-right {
  margin-left: -500px;
  animation: 2s slide-right;
  animation-delay: 2s;
}

@keyframes slide-right {
  from {
    margin-left: 50%;
  }

  to {
    margin-left: 0%;
  }
}
</style>