<template>
    <v-container class="mt-2 mx-auto">
        <v-row>
            <v-col cols="3">
                <PlayLists addingEnabled @setActivePlaylists="set_active_playlists" />
            </v-col>
            <v-col>
                <MusicTable
                  :songs="paginatedSongs"
                  :sortBy="sortBy"
                  :sortDir="sortDir"
                >
                  <template v-if="activePlaylists.length > 0" #add_title="{ song }">
                    <a class="add-song-plus" @click="add_song(song, $event.target)">
                        <font-awesome-icon icon="fa-solid fa-plus"></font-awesome-icon>
                    </a>
                  </template>
                  <template #custom_column="{ song }">
                    <a @click="delete_song(song)">
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
import MusicList from "@/assets/list.json";
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
        })
    },
    mounted() {
        this.emitter.on("change-sort", this.changeSort);
    },
    data() {
        return {
            songs: MusicList,
            sortBy: "",
            sortDir: "asc",
            pageSize: 50,
            currentPage: 0,
            activePlaylists: [],
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
        set_active_playlists(activePlaylists) {
            this.activePlaylists = activePlaylists;
        },
        add_song(song, target) {
            target.classList.add("flash");
            setTimeout(() => {
                target.classList.remove("flash");
            }, 1000);
            this.activePlaylists.forEach((playlist, index) => this.activePlaylists[index].songs.push(song));
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
        }
    }
}
</script>

<style scoped>
  .add-song-plus {
    cursor: pointer;
  }
  .flash {
    animation: flash 1s 1 ease;
  }
  @keyframes flash {
    from { color: blue; }
    to { color: inherit; }
  }
</style>