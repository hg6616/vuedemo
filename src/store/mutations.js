import * as types from './mutation-types'
import { Indicator } from 'mint-ui';


String.prototype.replaceAll = function (s1, s2) {
  return this.replace(new RegExp(s1, "gm"), s2);
}
//在这里更改state,只能是同步的方式
export default {
  //方括号表示用字符串给function起名字
  [types.CHANGE](state, { msg }) {
    state.index.msg = msg
  },
  [types.GET_ZHIHU](state, { data }) {
    for (let x in data.stories) {
      var d = data.stories[x].images;
      for (let y in d) {
        d[y] = ' /resource?url=' + d[y];
      }
    }
    state.zdata = data;
    console.log(data)
    Indicator.close();
  },
  [types.GET_NEWS](state, { data }) {
    //  console.log(data)

    data.body = data.body.replaceAll('src=\"', 'src=\"/resource?url=');
    data.css[0] = '/resource?url=' + data.css[0];
    state.news = data;
  },
  [types.SEND_AUTH_CODE](state, data) { state.SEND_AUTH_CODE = data; },
  [types.GET_CAR_BRAND](state, data) { state.GET_CAR_BRAND = data; },
  [types.GET_CAR_SERIES](state, data) { state.GET_CAR_SERIES = data; },
  [types.GET_CAR_SERIES_PIC](state, data) { state.GET_CAR_SERIES_PIC = data; },
  [types.GET_CAR_TYPE_CONFIG](state, data) { state.GET_CAR_TYPE_CONFIG = data; },
  [types.GET_USER_INFO](state, data) { state.GET_USER_INFO = data; },
  [types.GET_MSG_COUNT](state, data) { state.GET_MSG_COUNT = data; },
  [types.GET_MSG](state, data) { state.GET_MSG = data; },
  [types.UPDATE_MSG_READ_STATUS](state, data) { state.UPDATE_MSG_READ_STATUS = data; },
  [types.ADD_VEHICLE_CLUE](state, data) { state.ADD_VEHICLE_CLUE = data; },
  [types.GET_VEHICLE_CLUE](state, data) { state.GET_VEHICLE_CLUE = data; },
  [types.BIND_CAR_OWNER](state, data) { state.BIND_CAR_OWNER = data; },
  [types.ADD_SERVICE_CLUE](state, data) { state.ADD_SERVICE_CLUE = data; },
  [types.GET_SERVICE_CLUE](state, data) { state.GET_SERVICE_CLUE = data; },
  [types.GET_INSURANCE_TYPE](state, data) { state.GET_INSURANCE_TYPE = data; },
  [types.ADD_INSURANCE_CLUE](state, data) { state.ADD_INSURANCE_CLUE = data; },
  [types.GET_RENEWAL_INSURANCE_QUERY_PRICE](state, data) { state.GET_RENEWAL_INSURANCE_QUERY_PRICE = data; },
  [types.GET_COUPON](state, data) { state.GET_COUPON = data; },
  [types.TAKE_COUPON](state, data) { state.TAKE_COUPON = data; },
  [types.GET_COUPON_TAKING_RECORD](state, data) { state.GET_COUPON_TAKING_RECORD = data; },
  [types.GET_DLR](state, data) { state.GET_DLR = data; },
  [types.CANCEL_VEHICLE_APPOINTMENT](state, data) { state.CANCEL_VEHICLE_APPOINTMENT = data; },
  [types.CANCEL_SERVICE_APPOINTMENT](state, data) { state.CANCEL_SERVICE_APPOINTMENT = data; },
  [types.GET_EVENT](state, data) { state.GET_EVENT = data; debugger},

}
