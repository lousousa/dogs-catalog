<template>
    <div class='pa-2'>
        
        <v-card v-if='$parent.list'>

            <v-data-table id='mainDatatable'
                :headers='dataTable.headers'
                :items='dataTable.getItems()'
                :page.sync="pagination.page"
                :items-per-page='pagination.itemsPerPage'
                hide-default-header
                hide-default-footer
                :search="search"
                @page-count="pagination.count = $event"
                class='elevation-1'
                dense>

                <template v-slot:body="{ items }">
                    <tbody v-if='items.length'>
                        <tr v-for='item, key in items' :key='key'>
                            <td style='cursor:pointer' @click='favorite(item)'>
                                <v-icon class='mr-4' color="orange darken-2">
                                    {{ favorites.find(p => p === item.param) ? 'mdi-star' : 'mdi-star-outline' }}
                                </v-icon>
                                <span>{{ item.subBreed }}</span>
                            </td>
                        </tr>
                        <tr></tr>
                    </tbody>
                    <div v-else>
                        <p class='text-center my-8'>No data available</p>
                    </div>
                </template>

            </v-data-table>

            <v-pagination v-model="pagination.page" :length="pagination.count" circle></v-pagination>

        </v-card>

    </div>
</template>

<style lang="scss" scoped>
    #mainDatatable {
        min-height: 35.5vh;
        @media all and (max-width:640px) {
            min-height: 40.5vh
        }
    }
</style>

<script>
    export default {
        name: 'List',
        watch: {
            favorites (list) {
                if (! list.length) this.$parent.viewFavorites = false
            }
        },
        data () {

            let parent = this.$parent
            let store = this.$store

            return {
                search: '',
                dataTable: {
                    headers: [ { text: 'Sub-Breeds', value: 'breed' } ],
                    items: [],
                    getItems () {
                        let result = this.items
                        if (parent.viewFavorites) result = result.filter(i => store.state.favorites.includes(i.param))
                        if (parent.filterByBreed) result = result.filter(i => i.breed === parent.filterByBreed)
                        return result
                    }
                },
                pagination: {
                    page: 1,
                    count: 0,
                    itemsPerPage: 10
                },
                favorites: store.state.favorites
            }
        },
        methods: {
            favorite (item) {
                if (this.favorites.find(p => p === item.param)) {
                    this.$store.commit('removeFavorite', item.param)
                } else {
                    this.$store.commit('addFavorite', item.param)
                }
                this.favorites = this.$store.state.favorites
            }
        }
    }
</script>