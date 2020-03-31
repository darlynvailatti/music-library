import Vue from 'vue'
import Vuex from 'vuex'

import musicStoreModule from '@/store/modules/music_store_module.js';
import favoriteStoreModule from '@/store/modules/favorites_store_module.js';
import playlistsStoreModule from '@/store/modules/playlists_store_module.js';

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        favoriteStoreModule,
        musicStoreModule,
        playlistsStoreModule
    }
})