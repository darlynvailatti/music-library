import MusicPlayer from '@/store/modules/impl/player.js';

const musicPlayerStoreModule = {
    state: {
        player: new MusicPlayer()
    },
    mutations: {
        play(state, payload) {
            console.log(payload);
            let audio = payload.audio;
            state.player.play(audio);
        },

        pause(state) {
            state.player.pause();
        },

        reset(state) {
            state.player.reset();
        },

        previous(state) {
            state.player.previously();
        },

        next(state) {
            state.player.next();
        }
    },

    actions: {

        play(context, payload) {
            context.commit('play',payload);
        },

        pause(context) {
            console.log('Pausing!');
            context.commit('pause');
        },

        reset(context) {
            console.log('Reseting!');
            context.commit('reset');
        },

        previous(context) {
            console.log('Previousing');
            context.commit('previous');
        },

        next(context) {
            console.log('Next');
            context.commit('next');
        }

    },
    getters: {
        isAllowToPlay: (state) => {
            return state.player.canPlay();
        },

        isAllowToReset: (state) => {
            return state.player.canReset();
        },

        isAllowToPause: (state) => {
            return state.player.canPause();
        },

        getCurrentAudio: (state) => {
            return state.player.currentAudio;
        },

        getCurrentState: (state) => {
            console.log(state);
            return state.player.getCurrentState;
        },

        getPlayer: (state) => {
            return state.player;
        },

        isPlaying: (state) => {
            return state.player.isPlaying();
        },

        isPlayingThisAudio: (state) => (audio) => {
            if(audio == null) return false;
            return state.player.isPlayingThisAudio(audio);
        }
    }
}



export default musicPlayerStoreModule;