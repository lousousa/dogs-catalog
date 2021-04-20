<template>
    <div>
        
        <v-card v-if='$parent.list'>

            <v-card-title>
                Dogs Catalog
                <v-spacer></v-spacer>
                <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Search"
                    single-line
                    hide-details>
                </v-text-field>
            </v-card-title>

            <v-data-table style='min-height:35vh'
                :headers='dataTable.headers'
                :items='dataTable.getItems()'
                :page.sync="pagination.page"
                :items-per-page='pagination.itemsPerPage'
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
                                    {{ $parent.favoriteExists(item.param) ? 'mdi-star' : 'mdi-star-outline' }}
                                </v-icon>
                                <span>{{ item.breed }}</span>
                            </td>
                        </tr>
                        <tr></tr>
                    </tbody>
                    <div v-else>
                        <p class='text-center my-8'>No records found.</p>
                    </div>
                </template>

            </v-data-table>

            <v-pagination v-model="pagination.page" :length="pagination.count" circle></v-pagination>

        </v-card>

    </div>
</template>

<script>
    export default {
        name: 'List',
        data () {

            let parent = this.$parent

            return {
                search: '',
                dataTable: {
                    headers: [ { text: 'Breeds', value: 'breed' } ],
                    items: [],
                    getItems () {
                        return parent.viewFavorites ? this.items.filter(i => parent.favorites.includes(i.param)) : this.items
                    }
                },
                pagination: {
                    page: 1,
                    count: 0,
                    itemsPerPage: 10
                }
            }
        },
        methods: {
            favorite (item) {
                if (this.$parent.favoriteExists(item.param)) {
                    this.$parent.favorites = this.$parent.favorites.filter(p => p !== item.param)
                } else {
                    this.$parent.favorites.push(item.param)
                }
            }
        }
    }
</script>