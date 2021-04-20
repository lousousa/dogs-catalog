<template>
    <div class='home-wrapper'>
        <List ref='list'/>
        <BtnFavorites/>
    </div>
</template>

<style lang="scss" scoped>
    .home-wrapper{ width: 100%; max-width: 800px; margin: auto; }
</style>

<script>
    import List from './Home/List'
    import BtnFavorites from './Home/BtnFavorites'
    export default {
        name: 'Home',
        components: { List, BtnFavorites },
        data () {
            return {
                list: null,
                favorites: []
            }
        },
        methods: {
            favoriteExists (param) { return this.favorites.find(p => p === param) }
        }
    }
</script>