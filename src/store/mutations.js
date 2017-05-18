import * as types from './mutation-types'
import { Indicator } from 'mint-ui';


String.prototype.replaceAll = function (s1, s2) {
  return this.replace(new RegExp(s1, "gm"), s2);
}
//在这里更改state,只能是同步的方式
function commonMutation(state, data, type) {
  console.log('mutation')
 // debugger
  state[type] = data;
}
export default {
  //方括号表示用字符串给function起名字
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
  [types.SEND_AUTH_CODE](state, data) { commonMutation(state, data, types.SEND_AUTH_CODE) },
  [types.GET_CAR_BRAND](state, data) { commonMutation(state, data, types.GET_CAR_BRAND) },
  [types.GET_CAR_SERIES](state, data) { commonMutation(state, data, types.GET_CAR_SERIES) },
  [types.GET_CAR_SERIES_PIC](state, data) { commonMutation(state, data, types.GET_CAR_SERIES_PIC) },
  [types.GET_CAR_TYPE_CONFIG](state, data) { commonMutation(state, data, types.GET_CAR_TYPE_CONFIG) },
  [types.GET_USER_INFO](state, data) { commonMutation(state, data, types.GET_USER_INFO) },
  [types.GET_MSG_COUNT](state, data) { commonMutation(state, data, types.GET_MSG_COUNT) },
  [types.GET_MSG](state, data) { commonMutation(state, data, types.GET_MSG) },
  [types.UPDATE_MSG_READ_STATUS](state, data) { commonMutation(state, data, types.UPDATE_MSG_READ_STATUS) },
  [types.ADD_VEHICLE_CLUE](state, data) { commonMutation(state, data, types.ADD_VEHICLE_CLUE) },
  [types.GET_VEHICLE_CLUE](state, data) { commonMutation(state, data, types.GET_VEHICLE_CLUE) },
  [types.BIND_CAR_OWNER](state, data) { commonMutation(state, data, types.BIND_CAR_OWNER) },
  [types.ADD_SERVICE_CLUE](state, data) { commonMutation(state, data, types.ADD_SERVICE_CLUE) },
  [types.GET_SERVICE_CLUE](state, data) { commonMutation(state, data, types.GET_SERVICE_CLUE) },
  [types.GET_INSURANCE_TYPE](state, data) { commonMutation(state, data, types.GET_INSURANCE_TYPE) },
  [types.ADD_INSURANCE_CLUE](state, data) { commonMutation(state, data, types.ADD_INSURANCE_CLUE) },
  [types.GET_RENEWAL_INSURANCE_QUERY_PRICE](state, data) { commonMutation(state, data, types.GET_RENEWAL_INSURANCE_QUERY_PRICE) },
  [types.GET_COUPON](state, data) { commonMutation(state, data, types.GET_COUPON) },
  [types.TAKE_COUPON](state, data) { commonMutation(state, data, types.TAKE_COUPON) },
  [types.GET_COUPON_TAKING_RECORD](state, data) { commonMutation(state, data, types.GET_COUPON_TAKING_RECORD) },
  [types.GET_DLR](state, data) { commonMutation(state, data, types.GET_DLR) },
  [types.CANCEL_VEHICLE_APPOINTMENT](state, data) { commonMutation(state, data, types.CANCEL_VEHICLE_APPOINTMENT) },
  [types.CANCEL_SERVICE_APPOINTMENT](state, data) { commonMutation(state, data, types.CANCEL_SERVICE_APPOINTMENT) },
  [types.GET_EVENT](state, data) { commonMutation(state, data, types.GET_EVENT) },
  [types.CHANGE_TITLE](state, title) { state.mytitle=title },


}
