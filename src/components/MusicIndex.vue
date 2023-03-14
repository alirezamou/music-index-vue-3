<template>
    <div>
        <TableVue :items="songs" :columns="columns" />
    </div>
</template>

<script>
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
        };
    },
}
</script>

<style scoped>
</style>