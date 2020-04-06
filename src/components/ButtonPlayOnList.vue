<template>
  <div>
    <v-icon
      v-if="!isLoadingCurrentAudio"
      :class="(isPlayingCurrentAudio ? 'pulse' : '')"
      :small="isPlayingCurrentAudio"
      @click=" isPlayingCurrentAudio ? pause() : addToPlayerAndPlay(audio)"
    >{{ getIcon }}</v-icon>

    <spring-spinner class="ma-0 pa-0" v-else :animation-duration="1000" :size="25" color="#05fce7" />
  </div>
</template>

<script>
import PlayerMixin from "@/common/player_mixin.js";
import { SpringSpinner } from "epic-spinners";

export default {
  props: ["audio"],
  mixins: [PlayerMixin],
  components: {
    SpringSpinner
  },
  data() {
    return {};
  },
  computed: {
    isPlayingCurrentAudio() {
      return this.isPlayingThisAudio(this.audio);
    },

    isLoadingCurrentAudio() {
      return this.isCurrentAudio(this.audio) && this.isLoading;
    },

    getIcon() {
      if (this.isPlayingCurrentAudio) {
        return "mdi-pause";
      }
      return "mdi-play";
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