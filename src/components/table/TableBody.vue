<template>
    <tbody>
        <tr v-for="(item, index) in items" :key="index">
            <td v-for="(column, columnKey) in columns" :key="columnKey">
                <slot name="add_title" v-if="column === 'title'" :song="item"></slot>
                <slot name="custom_column" v-if="column === 'custom-column'" :song="item"></slot>
                {{ item[column] }}
            </td>
        </tr>
    </tbody>
</template>

<script>
export default {
    name: "TableBody",
    props: {
        items: {
            type: Array,
            default: () => [],
            required: true,
        },
        columns: {
            type: Array,
            default: () => [],
            required: true,
        },
    }    
}
</script>

<style scoped>
td {
  word-break: break-word;
  width: 20%;
}
</style>