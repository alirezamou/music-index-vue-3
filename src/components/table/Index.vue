<template>
    <div v-if="!items.length">Nothing to show.</div>
    <v-table dense="compact" v-else>
    <TableHead 
        :keys="columns" 
        :sortBy="sortBy" 
        :sortDir="sortDir"
    />
    <TableBody :items="items" :columns="columns">
        <template #add_title="{ song }">
            <slot name="add_title" :song="song"></slot>
        </template>
        <template #custom_column="{ song }">
            <slot name="custom_column" :song="song"></slot>
        </template>
    </TableBody>
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