<template>
    <div v-if="!items.length">Nothing to show.</div>
    <v-table dense="compact" v-else>
    <TableHead 
        :keys="columns" 
        :sortBy="sortBy" 
        :sortDir="sortDir"
        @changeSort="(column) => $emit('changeSort', column)"
    />
    <TableBody :items="items" :columns="columns" />
</v-table>
</template>

<script>
import TableHead from "@/components/table/TableHead.vue";
import TableBody from "@/components/table/TableBody.vue";

export default {
    name: "TableVue",
    components: {
        TableHead,
        TableBody
    },
    props: {
        items: {
            type: Array,
            default: () => [],
            required: true,
        },
        columns: {
            type: Array,
            default: () => [],
            required: true
        },
        sortBy: {
            type: String,
            defualt: () => "",
            required: true,
        },
        sortDir: {
            type: String,
            defualt: () => "asc",
            required: true,
        },
    },
}
</script>