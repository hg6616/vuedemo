/**
 * Mocking client-server processing
 * 约定此文件只负责请求数据,并把数据原封不动返回给action的callback
 * 在action中的callback中处理返回数据
 */
//import fetchData from '../utils/fetch'
import axios from 'axios';
import * as types from '../store/mutation-types';
const debug = process.env.NODE_ENV !== 'production';
const readLocalMockData = true;//是否读取本地json,true:后台nodejs读取本地json文件,false时后台转发调用真实的服务 开发时该参数才有效
//公共的api处理方法
var commonApi = (url, param, cb) => {
  return getData(param, { url })
    .then(res => {
      if (res) {
        cb(res.data);
      }
    })
  // .catch((err) => {
  //   console.log('cm api err');
  //   throw err;
  // });
}
//参数转换
var getParam = (param) => {
  //  var postData = 'params= {"dlrCode": "H2901"}';
  var res = 'params=' + JSON.stringify(param.data);
  if (readLocalMockData) {
    res += '&local=' + JSON.stringify({ obj: param.type })
  }
  return res;
}
//公共的请求数据方法
function getData(param, cfg) {
  console.log('请求参数:')
  console.log(param);
  //默认配置
  var defaultCfg = {
    method: 'post',
    data: getParam(param)
  }
  //覆盖默认配置
  for (let x in cfg) {
    defaultCfg[x] = cfg[x];
  }
  //调试模式下是调用webpack的后台
  if (debug) {
    defaultCfg.url = '/mock'
    defaultCfg.data += '&url=' + cfg.url;
  }
  return axios(defaultCfg)
    .then(res => {
      switch (res.status) {
        case 200:
           //throw new Error(300, "error111")
          console.log('请求结果:')
          console.log(res);
          return res;
          break;
      }
    })
    // .catch((err) => {
    //   console.log('axios err')
    //   console.log(err);
    //   throw err;
    // });
}
export default {

  getZhihuData(param, cb) {
    var url = '/api/goods';
    url = '/api/zhihu';
    // url = '/news/latest'; 
    axios({
      method: 'get',
      url: url,
    })
      .then(function (response) {
        console.log(response);
        cb(response);
      });
  },
  getNews(param, cb) {
    var url = '/api/news2/' + param.param;
    axios({
      method: 'get',
      url
    }).then(res => {
      cb(res);
    })
  },
 [types.SEND_AUTH_CODE](param, cb) {return  commonApi('/serv/base/phone/v1/validcode',param, cb); },
 [types.GET_CAR_BRAND](param, cb) {return  commonApi('/serv/base/car/brand/v1/list',param, cb); },
 [types.GET_CAR_SERIES](param, cb) {return  commonApi('/serv/base/car/series/v1/list',param, cb); },
 [types.GET_CAR_SERIES_PIC](param, cb) {return  commonApi('/serv/base/car/series/v1/images',param, cb); },
 [types.GET_CAR_TYPE_CONFIG](param, cb) {return  commonApi('/serv/base/car/typeconfig/v1/list',param, cb); },
 [types.GET_USER_INFO](param, cb) {return  commonApi('/serv/base/fan/v1/curr/info',param, cb); },
 [types.GET_MSG_COUNT](param, cb) {return  commonApi('/serv/wechat/message/v1/count',param, cb); },
 [types.GET_MSG](param, cb) {return  commonApi('/serv/wechat/message/v1/records',param, cb); },
 [types.UPDATE_MSG_READ_STATUS](param, cb) {return  commonApi('/serv/wechat/message/v1/read',param, cb); },
 [types.ADD_VEHICLE_CLUE](param, cb) {return  commonApi('/serv/ve/clue/v1/leave',param, cb); },
 [types.GET_VEHICLE_CLUE](param, cb) {return  commonApi('/serv/ve/clue/v1/records',param, cb); },
 [types.BIND_CAR_OWNER](param, cb) {return  commonApi('/serv/se/carowner/v1/authen',param, cb); },
 [types.ADD_SERVICE_CLUE](param, cb) {return  commonApi('/serv/se/clue/v1/leave',param, cb); },
 [types.GET_SERVICE_CLUE](param, cb) {return  commonApi('/serv/se/clue/v1/records',param, cb); },
 [types.GET_INSURANCE_TYPE](param, cb) {return  commonApi('/serv/ai/clue/v1/insurances',param, cb); },
 [types.ADD_INSURANCE_CLUE](param, cb) {return  commonApi('/serv/ai/clue/v1/leave',param, cb); },
 [types.GET_RENEWAL_INSURANCE_QUERY_PRICE](param, cb) {return  commonApi('/serv/ai/clue/v1/records',param, cb); },
 [types.GET_COUPON](param, cb) {return  commonApi('/serv/coupon/card/v1/list',param, cb); },
 [types.TAKE_COUPON](param, cb) {return  commonApi('/serv/coupon/card/v1/receive',param, cb); },
 [types.GET_COUPON_TAKING_RECORD](param, cb) {return  commonApi('/serv/coupon/card/v1/records',param, cb); },
 [types.GET_DLR](param, cb) {return  commonApi('/serv/base/org/v1/curr',param, cb); },
 [types.CANCEL_VEHICLE_APPOINTMENT](param, cb) {return  commonApi('/serv/ve/clue/v1/cancel',param, cb); },
 [types.CANCEL_SERVICE_APPOINTMENT](param, cb) {return  commonApi('/serv/se/clue/v1/cancel',param, cb); },
 [types.GET_EVENT](param, cb) {return  commonApi('/serv/sale/activity/v1/list',param, cb); },

}