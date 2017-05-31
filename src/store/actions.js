import * as types from './mutation-types'
import api from '../api/api'
import { Indicator, Toast } from 'mint-ui';
//在action中更改mutation ,可以异步  在vue文件中通过this.$store.dispatch({		type:'changemsg',		msg:'bad'	});来调用

export const getzhihu = ({ commit }, param) => {
  //  console.log('action getzhihu')
  api.getZhihuData(param, data => {
    commit(types.GET_ZHIHU, data);
  });
}

export const getNews = ({ commit }, param) => {
  api.getNews(param, data => {
    //  console.log(data)
    commit(types.GET_NEWS, data);
  });
}
var commonAction = (commit, param, type, field) => {
  // console.log(param);
  Indicator.open();
  param.type = type;
  return new Promise((resolve, reject) => {
    // setTimeout(() => {
    api[types[type]](param, data => {
      // debugger;
      Indicator.close();
      if (field == undefined) {
        field = 'result'//默认使用result字段
      }
      var d = data[field];
      if (field == '') {//为空就返回整个data
        d = data;
      }
      commit(types[type], d);
      if (resolve) {
        resolve();
      }

    }).catch(err => {
      Indicator.close();
      console.log('cm action err');
      console.log(err);
      reject();
      if (reject) {
        reject();
      }
    });
    //  }, 1000) 
  })
}

export const SEND_AUTH_CODE = ({ commit }, param) => { return commonAction(commit, param, types.SEND_AUTH_CODE); }
export const GET_CAR_BRAND = ({ commit }, param) => { return commonAction(commit, param, types.GET_CAR_BRAND); }
export const GET_CAR_SERIES = ({ commit }, param) => { return commonAction(commit, param, types.GET_CAR_SERIES); }
export const GET_CAR_SERIES_PIC = ({ commit }, param) => { return commonAction(commit, param, types.GET_CAR_SERIES_PIC); }
export const GET_CAR_TYPE_CONFIG = ({ commit }, param) => { return commonAction(commit, param, types.GET_CAR_TYPE_CONFIG); }
export const GET_USER_INFO = ({ commit }, param) => { return commonAction(commit, param, types.GET_USER_INFO); }
export const GET_MSG_COUNT = ({ commit }, param) => { return commonAction(commit, param, types.GET_MSG_COUNT); }
export const GET_MSG = ({ commit }, param) => { return commonAction(commit, param, types.GET_MSG); }
export const UPDATE_MSG_READ_STATUS = ({ commit }, param) => { return commonAction(commit, param, types.UPDATE_MSG_READ_STATUS); }
export const ADD_VEHICLE_CLUE = ({ commit }, param) => { return commonAction(commit, param, types.ADD_VEHICLE_CLUE); }
export const GET_VEHICLE_CLUE = ({ commit }, param) => { return commonAction(commit, param, types.GET_VEHICLE_CLUE); }
export const BIND_CAR_OWNER = ({ commit }, param) => { return commonAction(commit, param, types.BIND_CAR_OWNER, ''); }
export const ADD_SERVICE_CLUE = ({ commit }, param) => { return commonAction(commit, param, types.ADD_SERVICE_CLUE); }
export const GET_SERVICE_CLUE = ({ commit }, param) => { return commonAction(commit, param, types.GET_SERVICE_CLUE); }
export const GET_INSURANCE_TYPE = ({ commit }, param) => { return commonAction(commit, param, types.GET_INSURANCE_TYPE); }
export const ADD_INSURANCE_CLUE = ({ commit }, param) => { return commonAction(commit, param, types.ADD_INSURANCE_CLUE); }
export const GET_RENEWAL_INSURANCE_QUERY_PRICE = ({ commit }, param) => { return commonAction(commit, param, types.GET_RENEWAL_INSURANCE_QUERY_PRICE); }
export const GET_COUPON = ({ commit }, param) => { return commonAction(commit, param, types.GET_COUPON); }
export const TAKE_COUPON = ({ commit }, param) => { return commonAction(commit, param, types.TAKE_COUPON); }
export const GET_COUPON_TAKING_RECORD = ({ commit }, param) => { return commonAction(commit, param, types.GET_COUPON_TAKING_RECORD); }
export const GET_DLR = ({ commit }, param) => { return commonAction(commit, param, types.GET_DLR); }
export const CANCEL_VEHICLE_APPOINTMENT = ({ commit }, param) => { return commonAction(commit, param, types.CANCEL_VEHICLE_APPOINTMENT); }
export const CANCEL_SERVICE_APPOINTMENT = ({ commit }, param) => { return commonAction(commit, param, types.CANCEL_SERVICE_APPOINTMENT); }
export const GET_EVENT = ({ commit }, param) => { return commonAction(commit, param, types.GET_EVENT); }
export const GET_EVENT_DETAIL = ( { commit }, param) => { return commonAction(commit,param,types.GET_EVENT_DETAIL);}
export const GET_MSG_DETAIL = ({ commit }, param) => { return commonAction(commit, param, types.GET_MSG_DETAIL); }

