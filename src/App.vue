<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app clipped>
      <v-list dense>
        <v-list-item link :to="item.routePath" v-for="item in items" :key="item.name">
          <v-list-item-action>
            <v-icon>mdi-view-dashboard</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.label }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app clipped-left >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>{{applicationName}}</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-content>

    <v-footer app>
      <span>&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
import config from "@/config/config.json";

export default {
  created() {
  
    this.applicationName = config.name;
    config.menuItems.forEach(menuItem => {
      this.items.push({
        label: menuItem.label,
        routePath: menuItem.routePath
      });
    });
  },
  data() {
    return {
      applicationName: "",
      items: [],
      drawer: false
    };
  }
};
</script>
