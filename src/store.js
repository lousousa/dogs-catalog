import VuexPersist from 'vuex-persist'
const vuexLocalStorage = new VuexPersist({
    key: 'vuex', storage: window.localStorage
})

export default {
    state: {
        favorites: [],
    },
    mutations: {
        addFavorite (state, payload) {
            state.favorites.push(payload)
        },
        removeFavorite (state, payload) {
            state.favorites = state.favorites.filter(f => f !== payload)
        }
    },
    getters: {
        favorites: state => {
            return state.favorites
        }
    },
    plugins: [ vuexLocalStorage.plugin ]
}