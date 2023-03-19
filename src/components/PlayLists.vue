<template>
    <v-list>
      <p class="playlist-title">Playlists</p>
      <router-link to="/">All songs</router-link>
      <p class="no-playlist" v-if="!playlists.length">You have no playlist yet.</p>
      <template v-else v-for="playlist in playlists" :key="playlist.slug">
        <router-link :to="playlist.slug">
          <v-list-item>
            <span>
              <font-awesome-icon icon="fa-solid fa-book"></font-awesome-icon>
            </span>
            {{ playlist.name }}
          </v-list-item>
        </router-link>
      </template>
      <div>
        <v-form @submit.prevent="addPlaylist">
          <v-container class="d-flex">
            <v-text-field class="mr-2" v-model="newPlaylist" placeholder="New playlist"></v-text-field>
            <v-btn :ripple="false" variant="tonal" type="submit">
              <font-awesome-icon icon="fa-solid fa-plus"></font-awesome-icon>
              Add
            </v-btn>
          </v-container>
        </v-form>
      </div>
    </v-list>
</template>

<script>
import { toRaw } from "vue"; 
import localforage from "localforage";
import slugify from "slugify";

export default {
  name: "PlayLists",
  created() {
    localforage.getItem("playlists")
    .then(playlists => {
      if(playlists)
        this.playlists = playlists;
      else 
        this.playlists = [];
    })
    .catch(err => console.log(err));
  },
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
  watch: {
    playlists: {
      async handler(playlists) {
        await localforage.setItem("playlists", toRaw(playlists));
      },
      deep: true,
    },
  },
}
</script>

<style scoped>
  a {
    color: rgb(100, 160, 130);
    text-decoration: none;
  }
  a::after {
    content: "\02192";
    color: rgb(100, 160, 130);
    margin-left: 5px;
    transition: margin 0.15s ease;
  }
  a:hover::after {
    margin-left: 10px;
  }
  .v-container {
    gap: 10px;
  }
  .v-btn {
    font-size: 0.7rem;
    background-color: rgb(57, 230, 160);
    color: #fff;
    font-weight: bold;
    padding: 0;
  }
  .v-btn:active {
    transform: scale(0.98);
  }
  .v-text-field >>> input {
    padding: 0.5rem;
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