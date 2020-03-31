

const musicStoreModule = {
    state: {
        selectedMusic: null,
    },

    mutations: {
        selectMusic(state, music){
            state.selectedMusic = music;
        }
    },

    actions: {
        selectMusic(context, music){

            context.commit('selectMusic', music);
        }

    },

    getters: {
        getSelectedMusic: (state) => {
            return state.selectedMusic;
        }
    }
    

}

export default musicStoreModule;