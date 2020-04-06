import { mapGetters, mapState } from "vuex";
import { Player } from "@/constants/Player.js";
import prettyMilliseconds from 'pretty-ms';


const PlayerMixin = {

    data() {
        return {

        }
    },

    computed: {
        ...mapState(['currentTime', 'duration']),
        ...mapGetters([
            Player.getters.IS_PLAYING,
            Player.getters.IS_NONE_AUDIO,
            Player.getters.IS_PAUSED,
            Player.getters.IS_LOADING,
            Player.getters.IS_ALLOW_TO_PLAY,
            Player.getters.IS_ALLOW_TO_PAUSE,
            Player.getters.IS_ALLOW_TO_RESET,
            Player.getters.GET_CURRENT_AUDIO,
            Player.getters.IS_PLAYING_THIS_AUDIO,
            Player.getters.IS_CURRENT_AUDIO,
            Player.getters.GET_DURATION,
            Player.getters.GET_CURRENT_TIME,
        ]),
        getAudioDescription() {
            return this.getCurrentAudio != null ?
                `${this.getCurrentAudio.title} - ${this.getCurrentAudio.artist}` : `...`;
        },
        getFormattedCurrentTime() {
            if(this.getCurrentTime != null)
                return prettyMilliseconds(this.getCurrentTime,{colonNotation: true} );
        },
        getFormattedDuration(){
            if(this.getDuration)
                return prettyMilliseconds(this.getDuration,{colonNotation: true} );
        }
    },

    methods: {

        endedCallBack() {
            this.reset();
        },

        updateTimeCallBack() {
            this.$store.dispatch(Player.methods.UPDATE_DURATION);
            this.$store.dispatch(Player.methods.UPDATE_CURRENT_TIME);
        },

        addToPlayerAndPlay(audio) {
            let audioPayload = {
                id: audio.id,
                title: audio.title,
                artist: audio.artist,
                audioSource: audio.audioSource
            };

            console.log(Player.methods.ADD_TO_PLAYER_AND_PLAY);
            this.$store.dispatch(
                Player.methods.ADD_TO_PLAYER_AND_PLAY,
                { audio: audioPayload }
            );

        },

        play() {
            this.$store.dispatch(Player.methods.PLAY);
        },

        next() {
            this.$store.dispatch(Player.methods.NEXT);
        },

        previous() {
            this.$store.dispatch(Player.methods.PREVIOUS);
        },

        showMessagePlayerNotReadyToPlay() {
            if (this.isNoneAudio) {
                this.$toast.open({
                    message: `Player is empty! add some music in the playlist`,
                    type: "info",
                    duration: 5000
                });
                return;
            }
        },

        pause() {
            this.$store.dispatch(Player.methods.PAUSE);
        },

        reset() {
            this.$store.dispatch(Player.methods.RESET);
        }
    },

    created() {
        this.$store.dispatch(Player.methods.SET_ENDED_EVENT_LISTENER, this.endedCallBack);
        this.$store.dispatch(Player.methods.SET_UPDATE_TIME_EVENT_LISTENER, this.updateTimeCallBack);
    }
}

export default PlayerMixin;

