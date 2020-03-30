

const favoriteStoreModule = {
    state: {
        favoriteMusic: [],
    },
    mutations: {

        addOrRemoveFromFavorite(state, payload) {
            let existingFavorite = state.favoriteMusic.filter(f => f.id == payload.music.id);

            if (existingFavorite.length > 0) {
                state.favoriteMusic = state.favoriteMusic.filter(f => f.id != payload.music.id);
            } else {
                state.favoriteMusic.push(payload.music);
            }
        },

        
    },

    actions: {
        addOrRemoveFromFavorite(context, music) {
            try {
                context.commit('addOrRemoveFromFavorite', music);
            } catch (error) {
                throw `Ocorreu um erro ao adicionar ou remover dos favoritos: ${error}`;
            }
        },
    },
    getters: {
        isFavorite: (state) => (music) => {
            return state.favoriteMusic.filter(f => f.id === music.id).length > 0;
        },

        getFavoriteMusic: (state) => {
            return state.favoriteMusic;
        }
    }
}

export default favoriteStoreModule;