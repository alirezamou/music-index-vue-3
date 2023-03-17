<template>
    <v-list>
      <p>Playlists</p>
      <template v-for="playlist in playlists" :key="playlist.slug">
        <v-list-item>
          <span>
            <font-awesome-icon icon="fa-solid fa-book"></font-awesome-icon>
          </span>
          {{ playlist.name }}
        </v-list-item>
      </template>
      <div>
        <v-form class="overflow-hidden" @submit.prevent="addPlaylist">
          <v-container class="d-flex align-center">
                <v-text-field v-model="newPlaylist"></v-text-field>
                <v-btn variant="tonal" type="submit">
                  <font-awesome-icon icon="fa-solid fa-plus"></font-awesome-icon>
                  Add
                </v-btn>
          </v-container>
        </v-form>
      </div>
    </v-list>
</template>

<script>
import slugify from "slugify";

export default {
  name: "PlayLists",
  data() {
    return {
        newPlaylist: "",
        playlists: [
          {
            name: "playlist 1",
            slug: "playlist-1",
            songs: ['song 1', 'song 2']
          },
          {
            name: "playlist 2",
            slug: "playlist-2",
            songs: ['song 3', 'song 4']
          }
        ],
    };
  },
  methods: {
    addPlaylist() {
        if(!this.newPlaylist)
          return;
        this.playlists.push({
            name: this.newPlaylist,
            slug: slugify(this.newPlaylist),
            songs: [],
        });
        this.newPlaylist = "";
    },
  },
}
</script>

<style scoped>
  .v-btn {
    font-size: 0.7rem;
  }
  .v-container {
    gap: 10px;
  }
</style>