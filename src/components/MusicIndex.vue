<template>
    <v-container class="mt-2 mx-auto">
        <v-row>
            <v-col cols="3">
                <PlayLists />
            </v-col>
            <v-col>
                <TableVue 
                  :items="paginatedSongs"
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
import TableVue from "@/components/table/Index.vue";
import PlayLists from "@/components/PlayLists.vue";
import MusicList from "@/assets/list.json";

export default {
    components: {
        TableVue,
        PlayLists,
    },
    created() {
        window.addEventListener("scroll", () => {
            if(this.currentPage >= this.totalPages) return;
            if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 100)
                this.currentPage++;
        })
    },
    data() {
        return {
            songs: MusicList,
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
        items: {
            handler() {
                this.currentPage = 0;
            }
        }
    }
}
</script>

<style scoped>
</style>