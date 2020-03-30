<template>
    <v-card>
        <Playlists />
    </v-card>
</template>

<script>
import Playlists from '@/components/Playlists.vue';

export default {
    name: "playlistsPage",
    components: {
        Playlists
    },
    data(){
        return {};
    }
}
</script>

<style scoped>

</style>