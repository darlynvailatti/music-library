

const musicStoreModule = {

    state: {
        playlists: []
    },

    mutations: {
        createNewPlaylist(state, playlist) {
            let newPlaylist = {
                id: Math.floor(Math.random() * 1000),
                descricao: playlist.descricao,
                musics: []
            }

            state.playlists.push(newPlaylist);
            console.log(state.playlists);
        },

        updatePlaylist(state, playlist) {
            console.log(`editing playlist: ${playlist.descricao}`);
            let playlists = state.playlists.filter(p => p.id != playlist.id);

            console.log('antes de atualizar: ' + playlists);

            playlists.push(playlist);

            console.log(playlists);
            state.playlists = playlists;
        },

        deletePlaylist(state, playlist) {
            state.playlists = state.playlists.filter(p => p.id != playlist.id);
        },

        addMusicToPlaylist(state, payload) {

            let music = payload.music;
            let idPlaylist = payload.idPlayslist;

            if (music == null || idPlaylist == null) {
                throw "Para inserir em uma playlist é obrigatório música e playlist";
            }

            let playList = state.playlists.filter(p => p.id === idPlaylist);
            if (playList == null)
                throw `Não identificou playlist ${idPlaylist}`;

            playList.push(music);
        }
    },

    actions: {
        confirmPlaylist(context, playlist) {
            try {
                console.log(`Confirm playlist: ${playlist.id}`);
                if (playlist.id == null) {
                    console.log("new playlist");
                    context.commit('createNewPlaylist', playlist);
                } else {
                    console.log("update playlist");
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
        }
    },

    getters: {
        getPlaylists: (state) => {
            return state.playlists;
        }
    }

}

export default musicStoreModule;