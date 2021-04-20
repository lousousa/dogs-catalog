<template>
    <div class='home-wrapper'>
        <List ref='list'/>
        <v-container class='mt-2'>
            <v-row align='center'>
                <v-col cols='6'><SelectBreed/></v-col>
                <v-col cols='3'></v-col>
                <v-col cols='3'><ToggleFavorites/></v-col>
            </v-row>
        </v-container>
    </div>
</template>

<style lang="scss" scoped>
    .home-wrapper{ width: 100%; max-width: 800px; margin: 4rem auto; }
</style>

<script>
    import List from './Home/List'
    import ToggleFavorites from './Home/ToggleFavorites'
    import SelectBreed from './Home/SelectBreed'
    import configs from '@/configs'
    export default {
        name: 'Home',
        components: { List, ToggleFavorites, SelectBreed },
        mounted () {
            this.getList()
        },
        watch: {
            favorites (list) {
                if (! list.length) this.viewFavorites = false
            }
        },
        data () {
            return {
                list: null,
                favorites: [],
                viewFavorites: false
            }
        },
        methods: {
            favoriteExists (param) { return this.favorites.find(p => p === param) },
            getList () {
                fetch(`${ configs.apiBaseUrl }/breeds/list/all`)
                    .then(response => response.json())
                    .then(data => {
                        if (data.status === 'success') {
                            this.list = data.message

                            Object.keys(this.list).forEach(key => {

                                if (this.list[key].length) {
                                    this.list[key].forEach(subBreed => {
                                        this.$refs.list.dataTable.items.push({
                                            breed: `${ subBreed[0].toUpperCase() }${ subBreed.substr(1) } ${ key[0].toUpperCase() }${ key.substr(1) }`,
                                            param: `${ key }/${ subBreed }`
                                        })

                                    })
                                } else {
                                    this.$refs.list.dataTable.items.push({
                                        breed: `${ key[0].toUpperCase() }${ key.substr(1) }`,
                                        param: key
                                    })
                                }
                                this.$refs.list.dataTable.items.sort((a, b) => a.breed > b.breed ? 1 : -1)

                            })

                        }
                    })
            },
        }
    }
</script>