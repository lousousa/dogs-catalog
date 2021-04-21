<template>
    <v-select v-model='selected'
        :items='items'
        hide-details
        label="Filter by breed"
        @input="$parent.filterByBreed = selected">
    </v-select>
</template>

<script>
    export default {
        data () {
            return {
                selected: null,
                items: [ { text: '- List all -', value: null } ]
            }
        }
    }
</script>