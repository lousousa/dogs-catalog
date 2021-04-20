<template>
    <div class='py-4' v-if='$parent.favorites.length'>
        <v-btn elevation="2" @click='viewFavorites()'>{{ $parent.viewFavorites ? 'List all' : 'View favorites' }}</v-btn>
    </div>
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