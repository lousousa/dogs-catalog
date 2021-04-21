import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import store from '@/store'
import vuetify from './plugins/vuetify'

Vue.use(Vuex)
const vuexInstance = new Vuex.Store(store)

Vue.config.productionTip = false

new Vue({
  vuetify,
  store: vuexInstance,
  render: h => h(App)
}).$mount('#app')