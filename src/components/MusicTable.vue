<template>
    <TableVue 
        :items="songs"
        :columns="columns"
        :sortBy="sortBy"
        :sortDir="sortDir"
    >
      <template #add_title="{ song }">
        <slot name="add_title" :song="song"></slot>
      </template>
    </TableVue>
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