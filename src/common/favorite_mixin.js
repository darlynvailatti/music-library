import { mapGetters } from "vuex";

const FavoriteMixin = {

    data() {
        return {

            headersFavorites: [
                { text: "Artist", value: "artist" },
                { text: "Title", value: "title" },
                { text: "Album", value: "album" },
                { text: "Genre", value: "genre" },
                { text: "Actions", value: "actions" }
            ],

        }
    },

    computed: {
        ...mapGetters(["isFavorite","getFavoriteMusic"])
    },

    methods: {
        addOrRemoveFromFavorite(music) {
            try {
                console.log(this.$store);
                this.$store.dispatch("addOrRemoveFromFavorite", { music });

                let toastMessage = "Favoritou!";
                if (!this.isFavorite(music)) {
                    toastMessage = "Desfavoritou!";
                }
                this.$toast.open({
                    message: toastMessage,
                    type: "success",
                    duration: 5000
                });
            } catch (error) {
                this.$toast.open({
                    message: `${error}`,
                    type: "error",
                    duration: 5000
                });
            }
        }
    }
}

export default FavoriteMixin;
