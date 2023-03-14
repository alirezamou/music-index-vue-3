<template>
    <div>
        <FontAwesomeIcon icon="fa-solid fa-chevron-up"/>
    </div>
    <v-table>
        <thead>
            <tr>
                <th>
                    <button @click="changeSort('artist')">
                        Artist
                        <font-awesome-icon 
                          class="chevron-icon" 
                          :icon="(sortBy === 'artist' ? (sortDir === 'asc' ? 'fa-solid fa-chevron-down' : 'fa-solid fa-chevron-up') : '')"/>
                    </button>
                </th>
                <th>
                    <button @click="changeSort('title')">
                        Title
                        <font-awesome-icon 
                          class="chevron-icon" 
                          :icon="(sortBy === 'title' ? (sortDir === 'asc' ? 'fa-solid fa-chevron-down' : 'fa-solid fa-chevron-up') : '')"/>
                          />
                    </button>
                </th>
                <th>
                    <button @click="changeSort('album')">
                        Album
                        <font-awesome-icon 
                          class="chevron-icon"
                          :icon="(sortBy === 'album' ? (sortDir === 'asc' ? 'fa-solid fa-chevron-down' : 'fa-solid fa-chevron-up') : '')"/>
                          />
                    </button>
                </th>
                <th>
                    <button @click="changeSort('genre')">
                        Genre
                        <font-awesome-icon 
                          class="chevron-icon"
                          :icon="(sortBy === 'genre' ? (sortDir === 'asc' ? 'fa-solid fa-chevron-down' : 'fa-solid fa-chevron-up') : '')"/>
                          />
                    </button>
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(song, index) in sortedSongs" :key="index">
                <td style="width: 30%;" v-text="song.artist" />
                <td style="width: 30%;" v-text="song.title" />
                <td style="width: 20%;" v-text="song.album" />
                <td style="width: 20%;" v-text="song.genre" />
            </tr>
        </tbody>
    </v-table>
</template>

<script>
import { orderBy } from "lodash";
import MusicList from "@/assets/list.json";

export default {
    data() {
        return {
            songs: MusicList,
            sortBy: "title",
            sortDir: "desc"
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
td {
  word-break: break-word;
}

th {
  font-weight: bold;
}

.chevron-icon {
    margin-left: 10px;
}

</style>