<template>
    <TableVue 
        :items="songs"
        :columns="columns"
        :sortBy="sortBy"
        :sortDir="sortDir"
        @changeSort="(column) => $emit('changeSort', column)"
    />
</template>

<script>
import TableVue from "@/components/table/Index.vue";

export default {  
    name: "MusicTable",
    components: {
        TableVue,
    },
    props: {
        songs: {
            type: Array,
            default: () => [],
            required: true,
        },
        columns: {
            typs: Array,
            default: () => [],
            required: true,
        },
        sortBy: {
            type: String,
            default: () => "",
        },
        sortDir: {
            type: String,
            default: () => "asc",
        }
    }
}
</script>

<style>
    
</style>