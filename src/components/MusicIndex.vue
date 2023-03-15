<template>
    <div>
        <TableVue 
          :items="sortedSongs"
          :columns="columns"
          :sortBy="sortBy"
          :sortDir="sortDir"
          @changeSort="changeSort"
        />
    </div>
</template>

<script>
import { orderBy } from "lodash";
import TableVue from "@/components/table/Index.vue";
import MusicList from "@/assets/list.json";

export default {
    components: {
        TableVue
    },
    data() {
        return {
            songs: MusicList,
            columns: ["artist", "title", "genre", "album"],
            sortBy: "",
            sortDir: "asc",
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
        }
    }
}
</script>

<style scoped>
</style>