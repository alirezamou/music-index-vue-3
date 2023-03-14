<template>
    <thead>
        <tr>
            <template v-for="(value, index) in keys" :key="index">
                <th>
                    <a @click="changeSort(value)" :class="value === sortBy && 'active'">
                        {{ value }}
                        <font-awesome-icon
                          v-if="value === sortBy"
                          class="sort-icon"
                          :icon="getIconName(value)"
                        />
                    </a>
                </th>
            </template>
        </tr>
    </thead>
</template>
<script>
export default {
    name: "TableHead",
    props: {
        keys: {
            type: Array,
            default: () => [],
            required: true
        },
        sortBy: {
            type: String,
            default: () => "",
            required: true,
        },
        sortDir: {
            type: String,
            default: () => "",
            required: true,
        },
    },
    methods: {
        changeSort(column) {
            this.$emit("changeSort", column)
        },
        getIconName(column) {
            if(column === this.sortBy)
              if(this.sortDir === "asc")
                return 'fa-solid fa-chevron-down';
              else 
                return 'fa-solid fa-chevron-up';
            return "";
        }
    },
}
</script>
<style scoped>
    .sort-icon {
        margin-left: 10px;
    }
    th a {
        display: block;
        cursor: pointer;
    }
    .active {
        font-weight: bolder;
    }
</style>