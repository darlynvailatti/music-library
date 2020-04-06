<template>
  <v-row class="justify-center">
    <v-container class="d-inline-flex mt-n7">
      <v-col cols="5" class="mt-10 mb-n12 ml-n3">
        <v-row justify="start">
          <div class="overline">{{ getAudioDescription }}</div>
        </v-row>
      </v-col>
      <v-col cols="1" class="d-inline-flex">
        <v-btn style="z-index: 0" class="mt-2 mr-1" @click="previous()" small dark fab>
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>

        <v-btn
          v-if="isPlaying"
          class="mb-6 pulse"
          style="z-index: 1"
          @click="isAllowToPause ? pause() : null"
          dark :fab="true">
          <v-icon>mdi-pause</v-icon>
        </v-btn>

        <v-btn
          v-if="!isPlaying"
          class="mb-6"
          style="z-index: 1"
          @click="isAllowToPlay ? play() : showMessagePlayerNotReadyToPlay()"
          dark :fab="true">
          <v-icon>mdi-play</v-icon>
        </v-btn>


        <v-btn style="z-index: 0" class="mt-2 ml-1" @click="next()" small dark fab>
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </v-col>

      <v-col cols="1"></v-col>
    </v-container>
    <v-container class="justify-center mt-n12">
      <v-row class="mt-0">
        <v-col>
          <v-row>
            <v-col cols="1" align="center" justify="start" class="mt-n7">
              <v-row justify="start">
                <div class="overline">{{ getFormattedCurrentTime }}</div>
              </v-row>
            </v-col>
            <v-col cols="10" class="mb-n8 mt-n9">
              <v-slider
                v-if="isNoneAudio"
                :disabled="true"
                ref="slider"
                :value="0"
                min="0"
                :max="100"
              ></v-slider>
              <v-slider
                v-if="!isNoneAudio"
                ref="slider"
                :value="getCurrentTime"
                min="0"
                :max="getDuration"
              ></v-slider>
            </v-col>
            <v-col cols="1" align="center" justify="start" class="mt-n7">
              <v-row justify="end">
                <div class="overline">{{ getFormattedDuration }}</div>
              </v-row>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-row>
</template>

<script>
import PlayerMixin from "@/common/player_mixin.js";

export default {
  mixins: [PlayerMixin],
  components: {},
  computed: {

    getButtonPlayPauseIcon(){
      if(this.isPlaying)
        return 'mdi-pause';
      
      return 'mdi-play';
    }

  },
  methods: {},
  created() {
    console.log(this);
  }
};
</script>

<style scoped>
.pulse {
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