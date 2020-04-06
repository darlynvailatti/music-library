import Vue from 'vue'
import VueRouter from 'vue-router';

import config from '@/config/config.json';

import HomePage from '@/pages/HomePage.vue';
import PlaylistsPage from '@/pages/PlaylistsPage.vue';
import FavoritesPage from '@/pages/FavoritesPage.vue';
import MusicsPage from '@/pages/MusicsPage.vue';

Vue.use(VueRouter);

let components = [
    HomePage, PlaylistsPage, FavoritesPage, MusicsPage
];

let routes = [];

config.menuItems.forEach((itemMenu) =>{
    routes.push({
        path: itemMenu.routePath,
        name: itemMenu.page,
        component: components.find((component) => component.name === itemMenu.page)
    });
});

const vueRouter = new VueRouter({routes,  mode: 'history', base: "music-library"});

export default vueRouter;
