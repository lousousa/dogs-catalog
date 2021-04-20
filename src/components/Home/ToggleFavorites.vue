<template>
    <v-btn v-if='$parent.favorites.length'
        color="primary"
        elevation="2"
        block
        @click='viewFavorites()'>
            {{ $parent.viewFavorites ? 'View all' : 'View favorites' }}
    </v-btn>
</template>

<script>
    export default {
        methods: {
            viewFavorites () {
                this.$parent.viewFavorites = ! this.$parent.viewFavorites
                this.$parent.$refs.list.pagination.page = 1
            }
        }
    }
</script>