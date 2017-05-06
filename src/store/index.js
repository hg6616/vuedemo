import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import cart from './modules/cart'
import products from './modules/products'
import mutations from './mutations'
//import createLogger from '../../../src/plugins/logger'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'
//定义初始化state
const state = {
  index: {
    msg: 'hello'
  },
  pc: {
    msg: 'world'
  }
};
export default new Vuex.Store({
  actions,
  getters,
  modules: {
    cart,
    products
  },
  strict: debug,
  state, mutations
  //  plugins: debug ? [createLogger()] : []
})
