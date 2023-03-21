<template>
    <v-container class="mt-2 mx-auto">
        <v-row>
            <v-col cols="3">
                <PlayLists :selectedPlaylistSlug="selectedPlaylistSlug" @setPlaylist="set_playlist" />
            </v-col>
            <v-col>
                <MusicTable
                  :songs="paginatedSongs"
                  :columns="columns"
                  :sortBy="sortBy"
                  :sortDir="sortDir"
                  @changeSort="changeSort"
                />
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { orderBy } from "lodash";
import paginate from "@/utils/paginate";
import PlayLists from "@/components/PlayLists.vue";
import MusicTable from "@/components/MusicTable.vue";

export default {
    components: {
        MusicTable,
        PlayLists,
    },
    created() {
        window.addEventListener("scroll", () => {
            if(this.currentPage >= this.totalPages) return;
            if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 100)
                this.currentPage++;
        });
    },
    data() {
        return {
            selectedPlaylist: {},
            selectedPlaylistSlug: this.$route.params.slug,
            songs: [],
            columns: ["artist", "title", "genre", "album"],
            sortBy: "",
            sortDir: "asc",
            pageSize: 50,
            currentPage: 0,
        };
    },
    methods: {
        changeSort(column) {
            if(this.sortBy === column && this.sortDir === "asc") {
                this.sortDir = "desc";
            } else {
                this.sortDir = "asc";
            }
            this.sortBy = column;
        },
        set_playlist(playlist) {
            this.selectedPlaylist = playlist;
            this.songs = playlist.songs;
        },
        // beforeRouteUpdate(to, from, next) {
        //     this.selectedPlaylistSlug = to.params.slug;

        //     next();
        // }
    },
    computed: {
        sortedSongs() {
            if(this.sortBy === "") return this.songs;
            return orderBy(this.songs, this.sortBy, this.sortDir);
        },
        paginatedSongs() {
            return paginate(this.sortedSongs, this.pageSize, this.currentPage, true);
        },
        totalPages() {
            return Math.ceil(this.songs.length / this.pageSize);
        }
    },
    watch: {
        items: {
            handler() {
                this.currentPage = 0;
            }
        },
        $route: {
            handler() {
                this.selectedPlaylistSlug = this.$route.params.slug;
            }
        }
    }
}
</script>

<style scoped>
</style>