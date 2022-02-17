import Vue from 'vue'
import Vuex from 'vuex'
import Login from './Module/login'
import Master from './Module/master'
import Advertisement from './Module/advertisement'
import Global from './Module/global'
import Products from './Module/products'
import Dishes from './Module/dishes'
import Customers from './Module/customers'
import Chefs from './Module/chefs'
import Sellers from './Module/sellers'
import Regions from './Module/regions'
import createPersistedState from 'vuex-persistedstate'
import Error from './Module/error'
import Orders from './Module/orders'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [
    createPersistedState({
      storage: window.sessionStorage
    })
  ],
  state: { },
  getters: {  },
  mutations: { },
  actions: {  },
  modules: {
    Login,
    Customers,
    Chefs,
    Sellers,
    Master,
    Advertisement,
    Global,
    Products,
    Dishes,
    Regions,
    Error,
    Orders
  }
})
