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

            <v-data-table
                :headers='dataTable.headers'
                :items='dataTable.items'
                :page.sync="pagination.page"
                :items-per-page='pagination.itemsPerPage'
                hide-default-footer
                :search="search"
                @page-count="pagination.count = $event"
                class='elevation-1'>
            </v-data-table>

            <v-pagination
                v-model="pagination.page"
                :length="pagination.count"
                circle>
            </v-pagination>

        </v-card>

    </div>
</template>

<script>
    import configs from '@/configs'
    export default {
        name: 'List',
        created () {
            this.getList()
        },
        data () {
            return {
                search: '',
                dataTable: {
                    headers: [ { text: 'Breeds', value: 'breed' } ],
                    items: []
                },
                pagination: {
                    page: 1,
                    count: 0,
                    itemsPerPage: 10
                }
            }
        },
        methods: {
            getList () {
                fetch(`${ configs.apiBaseUrl }/breeds/list/all`)
                    .then(response => response.json())
                    .then(data => {
                        if (data.status === 'success') {
                            this.$parent.list = data.message

                            Object.keys(this.$parent.list).forEach(key => {

                                if (this.$parent.list[key].length) {
                                    this.$parent.list[key].forEach(subBreed => {
                                        this.dataTable.items.push({
                                            breed: `${ subBreed[0].toUpperCase() }${ subBreed.substr(1) } ${ key[0].toUpperCase() }${ key.substr(1) }`,
                                            param: `${ key }/${ subBreed }`
                                        })

                                    })
                                } else {
                                    this.dataTable.items.push({
                                        breed: `${ key[0].toUpperCase() }${ key.substr(1) }`,
                                        param: key
                                    })
                                }
                                this.dataTable.items.sort((a, b) => a.breed > b.breed ? 1 : -1)

                            })

                        }
                    })
            }
        }
    }
</script>