<template>
    <v-list>
      <p class="playlists-heading">Playlists</p>
      <router-link to="/" class="link-arrow">All songs</router-link>
      <p class="no-playlist" v-if="!playlists.length">You have no playlist yet.</p>

      <template v-else v-for="(playlist, index) in playlists" :key="playlist.slug">
        <v-list-item class="playlist">
          <router-link :to="playlist.slug">
            <span class="playlist__icon">
              <font-awesome-icon icon="fa-solid fa-book"></font-awesome-icon>
            </span>
            <span class="playlist__title">
              {{ playlist.name }}
            </span>
          </router-link>
          <template v-if="addingEnabled">
            <div v-if="!playlist.adding" class="toggle-adding-songs">
              <a @click="addSongs(index)" title="Add songs">
                <font-awesome-icon icon="fa-solid fa-plus"></font-awesome-icon>
              </a>
            </div>
            <div v-else class="toggle-adding-songs" >
              <a @click="addSongs(index)" title="Disable adding songs">
                <font-awesome-icon icon="fa-solid fa-check-square"></font-awesome-icon>
              </a>
            </div>
          </template>
        </v-list-item>
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

    this.playlists.forEach(playlist => playlist.adding = false);
  },
  props: {
    addingEnabled: {
      type: Boolean,
      default: false,
      required: false,
    },
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
            adding: false,
            songs: [],
        });
        this.newPlaylist = "";
    },
    addSongs(index) {
      this.playlists[index].adding = !this.playlists[index].adding;

      this.$emit("setActivePlaylists", this.playlists.filter(playlist => playlist.adding === true));
    }
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
  .link-arrow::after {
    content: "\02192";
    color: rgb(100, 160, 130);
    margin-left: 5px;
    transition: margin 0.15s ease;
  }
  .link-arrow:hover::after {
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
  .playlists-heading {
    background-color: rgb(57, 200, 160);
    color: #fff;
    font-weight: bold;
    padding: 0.5rem 1rem;
    border-radius: 2px;
    margin-bottom: 10px;
  }
  .playlist__icon {
    margin-right: 0.8rem;
  }
  .playlist__title {
    color: #222;
  }
  .no-playlist {
    margin-top: 10px;
    padding: 0.5rem 1rem;
    color: #555;
  }
  .v-list-item >>> .v-list-item__content {
    display: flex;
    justify-content: space-between;
  }
  .toggle-adding-songs {
    cursor: pointer;
    background-color: #eee;
    border-radius: 100%;
    padding: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .toggle-adding-songs a {
    width: 100%;
    cursor: pointer;
  }

</style>