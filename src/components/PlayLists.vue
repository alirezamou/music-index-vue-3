<template>
    <v-list>
      <p class="playlist-title">Playlists</p>
      <p class="no-playlist" v-if="!playlists.length">You have no playlist yet.</p>
      <template v-else v-for="playlist in playlists" :key="playlist.slug">
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
                <v-text-field v-model="newPlaylist" placeholder="New playlist"></v-text-field>
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
        playlists: [],
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
    background-color: rgb(57, 230, 160);
    color: #fff;
    font-weight: bold;
  }
  .v-container {
    gap: 10px;
  }
  .playlist-title {
    background-color: rgb(57, 200, 160);
    color: #fff;
    font-weight: bold;
    padding: 0.5rem 1rem;
    border-radius: 2px;
    margin-bottom: 10px;
  }
  .no-playlist {
    margin-top: 10px;
    padding: 0.5rem 1rem;
    color: #555;
  }
</style>