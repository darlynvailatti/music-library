<template>
  <v-app scroll>
    <v-navigation-drawer v-model="drawer" app clipped>
      <v-list dense>
        <v-list-item link :to="item.routePath" v-for="item in items" :key="item.name">
          <v-list-item-action>
            <v-icon>mdi-{{item.icon}}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.label }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app clipped-left>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>{{applicationName}}</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <v-container fluid class="ma-0">
        <router-view></router-view>
      </v-container>
    </v-content>

    <v-app-bar app bottom clipped-left elevation="5">
      <PlayerFooter />  
    </v-app-bar>
  </v-app>
</template>

<script>
import config from "@/config/config.json";
import PlayerFooter from '@/components/PlayerFooter.vue';

export default {
  components: {
    PlayerFooter,
  },
  created() {
    this.applicationName = config.name;
    config.menuItems.forEach(menuItem => {
      this.items.push({
        label: menuItem.label,
        routePath: menuItem.routePath,
        icon: menuItem.icon
      });
    });
  },
  data() {
    return {
      applicationName: "",
      items: [],
      drawer: false
    };
  },

};
</script>
