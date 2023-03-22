<template>
    <v-container class="mt-2 mx-auto">
        <v-row>
            <v-col cols="3">
                <PlayLists :selectedPlaylistSlug="selectedPlaylistSlug" @setPlaylist="set_playlist" />
            </v-col>
            <v-col>
                <MusicTable
                  :songs="paginatedSongs"
                  :sortBy="sortBy"
                  :sortDir="sortDir"
                >
                <template #custom_column="{ song }">
                    <a class="delete-button" @click="delete_song(song)">
                        <font-awesome-icon icon="fa-solid fa-trash"></font-awesome-icon>
                    </a>
                  </template>
                </MusicTable>
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
    mounted() {
        this.emitter.on("change-sort", this.changeSort);
    },
    data() {
        return {
            selectedPlaylist: {},
            selectedPlaylistSlug: this.$route.params.slug,
            songs: [],
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
        delete_song(song) {
            this.selectedPlaylist.songs.splice(this.selectedPlaylist.songs.indexOf(song), 1);
        }
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
        songs: {
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

.delete-button {
    cursor: pointer;
    color: red;
    background-color: #eee;
    display: inline-block;
    width: 30px;
    height: 30px;
    position: relative;
    border-radius: 50%;
}

.delete-button svg {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}

</style>