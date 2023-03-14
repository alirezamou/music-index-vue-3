<template>
    <div v-if="!items.length">Nothing to show.</div>
    <v-table dense="compact" v-else>
    <TableHead 
        :keys="columns" 
        :sortBy="sortBy" 
        :sortDir="sortDir"
        @changeSort="changeSort"
    />
    <TableBody :items="sortedItems" :columns="columns" />
</v-table>
</template>

<script>
import { orderBy } from "lodash";
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
    },
    data() {
        return {
            sortBy: "",
            sortDir: "asc",
        };
    },
    methods: {
        changeSort(column) {
            if(this.sortBy === column && this.sortDir === "asc") {
                this.sortDir = "desc";
            } else {
                this.sortDir = "asc";
            }
            this.sortBy = column;
        }
    },
    computed: {
        sortedItems() {
            if(this.sortBy === "") return this.items;
            return orderBy(this.items, this.sortBy, this.sortDir);
        }
    }
}
</script>