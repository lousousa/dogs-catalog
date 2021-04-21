<template>
    <v-btn color="primary"
        :disabled='! $parent.favorites.length'
        elevation="2"
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