import { createRouter, createWebHistory } from "vue-router";
import MusicIndex from "@/components/MusicIndex.vue";
import PlayList from "@/components/PlayList.vue";

const routes = [
  {
    name: "musicIndex",
    path: "/",
    component: MusicIndex,
  },
  {
    name: "playList",
    path: "/playlist/:slug",
    component: PlayList,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
