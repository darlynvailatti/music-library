

const favoriteStoreModule = {


    state: {
        playlists: [],
        selectedPlaylists: []
    },

    mutations: {

        selectPlaylist(state, playlist) {
            state.selectedPlaylists.push(playlist)
        },

        createNewPlaylist(state, playlist) {
            let newPlaylist = {
                id: Math.floor(Math.random() * 1000),
                descricao: playlist.descricao,
                musics: []
            }

            state.playlists.push(newPlaylist);

        },

        updatePlaylist(state, playlist) {
            let playlists = state.playlists.filter(p => p.id != playlist.id);
            playlists.push(playlist);
            state.playlists = playlists;
        },

        deletePlaylist(state, playlist) {
            state.playlists = state.playlists.filter(p => p.id != playlist.id);
        },

        addMusicToPlaylist(state, payload) {
            let music = payload.music;
            let idsPlaylists = payload.playlists;

            if (music == null || idsPlaylists == null) {
                throw "Para inserir em uma playlist é obrigatório música e uma ou mais playlist";
            }

            idsPlaylists.forEach((idPlaylist) => {
                state.playlists.forEach((p) => {
                    if (p.id === idPlaylist) {
                        p.musics == null ? [] : p.musics.push(music); 
                    }
                });
            });
        }

    },

    actions: {

        addMusicToPlaylist(context, payload) {
            context.commit("addMusicToPlaylist", payload);
        },

        confirmPlaylist(context, playlist) {
            try {
                if (playlist.id == null) {
                    context.commit('createNewPlaylist', playlist);
                } else {
                    context.commit('updatePlaylist', playlist);
                }
            } catch (error) {
                throw `Ocorreu um erro ao confirmar playlist ${error}`;
            }

        },

        deletePlaylist(context, playlist) {
            try {
                context.commit('deletePlaylist', playlist);
            } catch (error) {
                throw `Ocorreu um erro ao eliminar a playlist ${playlist.id}: ${error}`;
            }
        },


        selectPlaylist(context, playlist) {
            context.commmit('selectPlaylist', playlist);
        }

    },

    getters: {
        getPlaylists: (state) => {
            return state.playlists;
        },
        getSelectedPlaylists: (state) => {
            return state.selectedPlaylists;
        }
    }

}

export default favoriteStoreModule;