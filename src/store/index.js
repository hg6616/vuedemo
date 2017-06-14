import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import cart from './modules/cart'
import products from './modules/products'
import mutations from './mutations'
//import createLogger from '../../../src/plugins/logger'
import * as types from './mutation-types'
import { Toast } from 'mint-ui'
Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'
//定义初始化state
const state = {
  index: {
    msg: 'hello'
  },
  pc: {
    msg: 'world'
  },
  zdata: {
    stories: []
  },
  news: '<div>loading</div>',
  car: '',
  dlrCode: 'H2901',//todo
  sucCode: 'R200',//调用成功的编码
  mytitle: '',//智通车商  标题 todo
  // types,
  //记得给state赋值初始值,不然getter中不会自动变化 
  SEND_AUTH_CODE: null,
  GET_CAR_BRAND: null,
  GET_CAR_SERIES: null,
  GET_CAR_SERIES_PIC: null,
  GET_CAR_TYPE_CONFIG: null,
  GET_USER_INFO: null,
  GET_MSG_COUNT: null,
  GET_MSG: null,
  UPDATE_MSG_READ_STATUS: null,
  ADD_VEHICLE_CLUE: null,
  GET_VEHICLE_CLUE: null,
  BIND_CAR_OWNER: null,
  ADD_SERVICE_CLUE: null,
  GET_SERVICE_CLUE: null,
  GET_INSURANCE_TYPE: null,
  ADD_INSURANCE_CLUE: null,
  GET_RENEWAL_INSURANCE_QUERY_PRICE: null,
  GET_COUPON: null,
  TAKE_COUPON: null,
  GET_COUPON_TAKING_RECORD: null,
  GET_DLR: null,
  CANCEL_VEHICLE_APPOINTMENT: null,
  CANCEL_SERVICE_APPOINTMENT: null,
  GET_EVENT: null,
  GET_EVENT_DETAIL: null,
  GET_MSG_DETAIL: null,
  GET_RECORD: null,
  GET_CLUE_RECORD: null,
  JOIN_EVENT: null,
  GET_EVENT_COMMENT: null,

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
