import MusicPlayer from '@/store/modules/impl/player.js';
import { Player } from '@/constants/Player.js';

const musicPlayerStoreModule = {
    state: {
        player: new MusicPlayer(),
        currentTime: 0,
        duration: 0,
    },
    mutations: {

        [Player.methods.ADD_TO_PLAYER_AND_PLAY](state, payload){
            console.log('Start fetch...');
            state.player.addToPlayerAndPlay(payload.audio);
            console.log('End fetch...');
        },

        [Player.methods.PLAY](state) {
            state.player.play();
        },

        [Player.methods.PAUSE](state) {
            state.player.pause();
        },

        [Player.methods.RESET](state) {
            state.player.reset();
        },

        [Player.methods.PREVIOUS](state) {
            state.player.previous();
        },

        [Player.methods.NEXT](state) {
            state.player.next();
        },

        [Player.methods.SET_ENDED_EVENT_LISTENER](state, callBack) {
            state.player.setEndedEventListener(callBack);
        },

        [Player.methods.SET_UPDATE_TIME_EVENT_LISTENER](state, callBack) {
            state.player.setUpdateTimeEventListener(callBack);
        },

        [Player.methods.UPDATE_CURRENT_TIME](state){
            state.currentTime = state.player.getCurrentTime();
        },

        [Player.methods.UPDATE_DURATION](state){
            state.duration = state.player.getDuration();
        },
    },

    actions: {

        [Player.methods.ADD_TO_PLAYER_AND_PLAY](context, payload){
            context.commit(Player.methods.ADD_TO_PLAYER_AND_PLAY, payload);
            context.commit(Player.methods.UPDATE_DURATION);
        },

        [Player.methods.PLAY](context) {
            console.log('Playing!');
            context.commit(Player.methods.PLAY);
        },

        [Player.methods.PAUSE](context) {
            console.log('Pausing!');
            context.commit(Player.methods.PAUSE);
        },

        [Player.methods.RESET](context) {
            console.log('Reseting!');
            context.commit(Player.methods.RESET);
        },

        [Player.methods.PREVIOUS](context) {
            console.log('Previousing');
            context.commit(Player.methods.PREVIOUS);
            context.commit(Player.methods.UPDATE_DURATION);
            context.commit(Player.methods.UPDATE_CURRENT_TIME);
        },

        [Player.methods.NEXT](context) {
            console.log('Next');
            context.commit(Player.methods.NEXT);
            context.commit(Player.methods.UPDATE_DURATION);
            context.commit(Player.methods.UPDATE_CURRENT_TIME);
        },

        [Player.methods.SET_ENDED_EVENT_LISTENER](context, callBack) {
            context.commit(Player.methods.SET_ENDED_EVENT_LISTENER, callBack);
        },

        [Player.methods.SET_UPDATE_TIME_EVENT_LISTENER](context, callBack) {
            context.commit(Player.methods.SET_UPDATE_TIME_EVENT_LISTENER, callBack);
        },

        [Player.methods.UPDATE_CURRENT_TIME](context){
            context.commit(Player.methods.UPDATE_CURRENT_TIME);
        },

        [Player.methods.UPDATE_DURATION](context){
            context.commit(Player.methods.UPDATE_DURATION);
        },

    },

    getters: {
        [Player.getters.IS_ALLOW_TO_PLAY]: (state) => {
            return state.player.canPlay();
        },

        [Player.getters.IS_ALLOW_TO_RESET]: (state) => {
            return state.player.canReset();
        },

        [Player.getters.IS_ALLOW_TO_PAUSE]: (state) => {
            return state.player.canPause();
        },

        [Player.getters.GET_CURRENT_AUDIO]: (state) => {
            return state.player.currentAudio;
        },

        [Player.getters.IS_PLAYING]: (state) => {
            return state.player.isPlaying();
        },

        [Player.getters.IS_PAUSED]: (state) => {
            return state.player.isPaused();
        },

        [Player.getters.IS_LOADING]: (state) => {
            return state.player.isLoading();
        },

        [Player.getters.IS_NONE_AUDIO]: (state) => {
            return state.player.isNoneAudio();
        },

        [Player.getters.IS_PLAYING_THIS_AUDIO]: (state) => (audio) => {
            return state.player.isPlayingThisAudio(audio);
        },

        [Player.getters.IS_CURRENT_AUDIO]: (state) => (audio) => {
            return state.player.isCurrentAudio(audio);
        },

        [Player.getters.GET_PLAYED]: (state) => {
            return state.player.getPlayed();
        },

        [Player.getters.GET_DURATION]: (state) =>{
            return state.duration;
        },

        [Player.getters.GET_CURRENT_TIME]: (state) =>{
            return state.currentTime;
        }

    }
}

export default musicPlayerStoreModule;