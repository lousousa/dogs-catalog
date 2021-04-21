<template>
    <div id='homeWrapper'>
        <div class='text-center py-16' v-show='! list'>
            <v-progress-circular indeterminate color="primary"></v-progress-circular>
        </div>
        <div v-show='list'>
                
            <v-container class='mb-4'>
                <v-row align='end'>
                    <v-col cols='12' md='4' class='text-center text-md-left'>
                        <h2>
                            <img class='img-logo' src='@/assets/img/logo.png'/>
                            <span>Dogs Catalog</span>
                        </h2>
                    </v-col>
                    <v-col cols='12' md='4'>
                        <SelectBreed ref='selectBreed'/>
                    </v-col>
                    <v-col cols='12' md='4'>
                        <v-text-field v-if='$refs.list'
                            v-model="$refs.list.search"
                            append-icon="mdi-magnify"
                            label="Search"
                            single-line
                            hide-details>
                        </v-text-field>
                    </v-col>
                </v-row>
            </v-container>

            <List ref='list'/>
            <div class='text-right mt-4 pa-2'>
                <ToggleFavorites/>
            </div>
            
        </div>

    </div>
</template>

<style lang="scss" scoped>
    #homeWrapper {
        width: 100%;
        max-width: 800px;
        margin: .6em auto;
        @media all and (min-width: 640px) {
            margin-top: 2rem;
        }
        .img-logo {
            width: 1.5em;
            height: 1.5em;
            vertical-align: bottom;
            margin-right: .6em;
        }
    }
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
        data () {
            return {
                list: null,
                viewFavorites: false,
                filterByBreed: null
            }
        },
        methods: {
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
                                            subBreed: `${ subBreed[0].toUpperCase() }${ subBreed.substr(1) } ${ key[0].toUpperCase() }${ key.substr(1) }`,
                                            breed: key,
                                            param: `${ key }/${ subBreed }`
                                        })

                                    })
                                } else {
                                    this.$refs.list.dataTable.items.push({
                                        subBreed: `${ key[0].toUpperCase() }${ key.substr(1) }`,
                                        breed: key,
                                        param: key
                                    })
                                }
                                this.$refs.selectBreed.items.push({ text: `${ key[0].toUpperCase() }${ key.substr(1) }`, value: key })

                            })
                            this.$refs.list.dataTable.items.sort((a, b) => a.subBreed > b.subBreed ? 1 : -1)

                        }
                    })
            },
        }
    }
</script>